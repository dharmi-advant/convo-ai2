import { useState } from 'react';

export function useMessage() {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendMessage = () => {
    if (!message.trim()) return;
    setIsSending(true);
    setMessage(`Sending....${message}`);
    setIsSending(false);
  };
  return { message, setMessage, isSending, sendMessage };
}
