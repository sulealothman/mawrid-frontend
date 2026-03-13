import { useEffect, useRef } from 'react';

export const useAutoScroll = (dependency: unknown) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (smooth = true) => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }
  };

  // Auto-scroll when dependency changes (new messages)
  useEffect(() => {
    if (scrollRef.current) {
      // Use requestAnimationFrame to ensure DOM is fully updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToBottom(true);
        });
      });
    }
  }, [dependency]);

  // Scroll to bottom on initial mount
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollToBottom(false);
      }, 100);
    }
  }, []);

  return scrollRef;
};