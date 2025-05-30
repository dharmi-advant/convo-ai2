'use client';

import { Button } from '../../atom/button';
import { Textarea } from '../../atom/textarea';
import { RiSendPlaneFill } from '@remixicon/react';
import { useState, useRef, useEffect } from 'react';
import { LoadingDots } from '../../atom/loading-dots';
import { useUser } from '@clerk/nextjs';

export default function ChatInput() {
  const { user } = useUser();
  const [messages, setMessages] = useState([
    { sender: 'Assistant', text: 'Hello! How can I help you today?' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setInput('');
    setMessages(msgs => [...msgs, { sender: 'user', text: input }]);
    setIsLoading(true);
    // ... existing code ...
    // ... existing code ...
    try {
      const baseUrl = window.location.origin; // This will get the current URL dynamically
      console.log(baseUrl);
      const response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // ... existing code ...
          messages: [...messages, { sender: 'user', text: input }],
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(msg => [...msg, { sender: 'Assistant', text: data.response }]);
    } catch (err) {
      console.log(err);
      setMessages(msg => [
        ...msg,
        { sender: 'Assistant', text: 'Sorry, I encountered an error. Please try again!' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... existing code ...
    <div className="flex flex-col h-full fixed right-0 inset-y-0 w-[85%]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-[120px]">
        <div className="max-w-4xl mx-auto py-4 px-8 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3 ${
                msg.sender === 'user' ? 'pl-12' : 'pr-12'
              }`}
            >
              {msg.sender === 'Assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                  AI
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-gray-800 text-white rounded-br-none'
                    : 'bg-gray-800 text-white rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <img
                  src={user?.imageUrl || '/placeholder.svg?height=32&width=32'}
                  alt={user?.fullName || 'User'}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
                AI
              </div>
              <div className="px-4 py-3 rounded-2xl bg-gray-800 text-white rounded-bl-none">
                <LoadingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Container */}
      <div className="border-t border-gray-200 bg-white p-6 fixed bottom-0 w-[89%]">
        <div className="max-w-4xl mx-auto">
          <form
            className="relative"
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="relative flex items-end bg-gray-800 border border-gray-600 hover:border-gray-500 focus-within:border-gray-400 rounded-2xl shadow-lg overflow-hidden transition-all duration-200">
              <Textarea
                className="flex-1 min-h-[50px] max-h-32 resize-none border-0 bg-transparent pl-8 pr-5 py-4 focus:outline-none focus:ring-0 placeholder-gray-400 text-white text-sm leading-relaxed"
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message here..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="m-1.5 p-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white disabled:bg-gray-600 disabled:text-gray-400 rounded-xl transition-all duration-200 flex-shrink-0 hover:shadow-md"
              >
                <RiSendPlaneFill className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
