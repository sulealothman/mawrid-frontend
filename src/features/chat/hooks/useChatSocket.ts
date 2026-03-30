import { useCallback, useEffect, useRef, useState } from 'react';

export default function useChatSocket({
  session,
  onDelta,
  onCancelled,
  onDone,
  onError,
}: UseChatSocketParams) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const onDeltaRef = useRef(onDelta);
  const onCancelledRef = useRef(onCancelled);
  const onDoneRef = useRef(onDone);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onDeltaRef.current = onDelta;
  }, [onDelta]);

  useEffect(() => {
    onCancelledRef.current = onCancelled;
  }, [onCancelled]);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    if (!session?.ws_url || !session?.token) return;

    const socketUrl = `${session.ws_url}?token=${encodeURIComponent(session.token)}`;
    const ws = new WebSocket(socketUrl);

    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'ready':
          case 'ack':
          case 'status':
          case 'sources':
            break;

          case 'delta':
            onDeltaRef.current?.(data.request_id, data.content ?? '');
            break;

          case 'done':
            onDoneRef.current?.(data.request_id, data.data ?? null);
            break;

          case 'cancelled':
            onCancelledRef.current?.(data.request_id, data.data ?? null);
            break;

          case 'error':
            onErrorRef.current?.(
              data.request_id ?? null,
              data.data ?? null,
              data.message ?? 'Unknown error'
            );
            break;

          default:
            break;
        }
      } catch {
        onErrorRef.current?.(null, null, 'Invalid socket message');
      }
    };

    ws.onerror = () => {
      setIsConnected(false);
      onErrorRef.current?.(null, null, 'WebSocket connection error');
    };

    ws.onclose = () => {
      setIsConnected(false);

      if (wsRef.current === ws) {
        wsRef.current = null;
      }
    };

    return () => {
      if (wsRef.current === ws) {
        wsRef.current = null;
      }

      setIsConnected(false);

      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, [session?.ws_url, session?.token]);

  const waitUntilConnected = useCallback((timeoutMs = 5000) => {
    return new Promise<void>((resolve, reject) => {
      const startedAt = Date.now();

      const check = () => {
        const ws = wsRef.current;

        if (ws && ws.readyState === WebSocket.OPEN) {
          resolve();
          return;
        }

        if (Date.now() - startedAt >= timeoutMs) {
          reject(new Error('WebSocket connection timeout'));
          return;
        }

        setTimeout(check, 50);
      };

      check();
    });
  }, []);

  const sendMessage = useCallback((payload: SendWsMessageParams) => {
    const ws = wsRef.current;

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      throw new Error('Socket is not connected');
    }

    ws.send(
      JSON.stringify({
        type: 'message.send',
        request_id: payload.requestId,
        chat_id: payload.chatId,
        kb_id: payload.kbId,
        message: payload.message,
        messages: payload.messages,
      })
    );
  }, []);

  const cancelMessage = useCallback((requestId: string) => {
    const ws = wsRef.current;

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      throw new Error('Socket is not connected');
    }

    ws.send(
      JSON.stringify({
        type: 'message.cancel',
        request_id: requestId,
      })
    );
  }, []);

  return {
    isConnected,
    sendMessage,
    cancelMessage,
    waitUntilConnected,
  };
}