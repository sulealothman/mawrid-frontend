import React, { useState } from 'react';
import { useI18n } from '@/features/localization/hooks/useI18n';
import { SendIcon } from '../icons/ChatIcons';
import TextareaAutosize from "react-textarea-autosize";
import Button from '@/features/shared/components/Button/Button';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled = false,
}) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const { t } = useI18n();

  const handleSend = (): void => {
    if (!inputMessage.trim() || disabled) return;
    
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`font-noto-sans-arabic`}>
      <div className="max-w-4xl mx-auto p-2 md:px-6 md:py-6">
        <div className="relative flex items-end space-x-4">
          <div className={`flex flex-1 w-full p-2 pe-1.5 ps-3 input-textarea-form rounded-[40px] md:rounded-4xl gap-1 shadow ${inputMessage.split('\n').length > 1 ? 'items-end' : 'items-center'}`}>
            <TextareaAutosize
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('type_message')}
              disabled={disabled}
              className="flex-1 outline-none resize-none"
              minRows={1}
              maxRows={6}
            />
            
            <Button
              onClick={handleSend}
              disabled={!inputMessage.trim() || disabled}
              className='shrink-0 size-7 md:size-8 flex items-center justify-center shadow-none'
              variant='tertiary'
              shape='circle'
            >
              <SendIcon className="size-4 md:size-5 shrink-0 fill-midnight-950 rtl:rotate-180" viewBox="0 0 24 24" />
            </Button>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-muted text-center">
          {t('send_message_alt')}
        </div>
      </div>
    </div>
  );
};