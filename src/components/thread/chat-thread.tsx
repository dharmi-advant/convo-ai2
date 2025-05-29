'use client';

import { useState } from 'react';
import { Button, Text } from '@tremor/react';
import { PlusIcon, Trash2, Edit, Settings, LogOut } from 'lucide-react';

// Mock data for demonstration
const mockThreads = [
  {
    id: 'welcome',
    title: 'Welcome to ChatAI',
    lastMessage: 'How can I help you today?',
    date: new Date(),
    isWelcome: true,
  },
  {
    id: 'thread-1',
    title: 'Project brainstorming',
    lastMessage: "Let's discuss your app ideas",
    date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: 'thread-2',
    title: 'Travel planning',
    lastMessage: 'Here are some recommendations for your trip',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: 'thread-3',
    title: 'Coding help',
    lastMessage: 'The solution to your React problem',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
];

export default function ChatSidebar() {
  const [activeThreadId, setActiveThreadId] = useState('welcome');
  const [isHovering, setIsHovering] = useState<string | null>(null);

  return (
    <div className="fixed top-0 left-0 flex flex-col h-full bg-gray-50 border-r border-gray-200 w-64">
      {/* New chat button */}
      <div className="p-4">
        <Button
          icon={PlusIcon}
          className="w-full justify-start bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
          onClick={() => {}}
        >
          New chat
        </Button>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-1">
          {mockThreads.map(thread => (
            <div
              key={thread.id}
              className="relative group"
              onMouseEnter={() => setIsHovering(thread.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div
                className={`
                  px-3 py-3 rounded-lg cursor-pointer transition-colors duration-200
                  ${activeThreadId === thread.id ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-100 text-gray-700'}
                `}
                onClick={() => setActiveThreadId(thread.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="truncate">
                    <Text className="font-medium truncate">{thread.title}</Text>
                    <Text className="text-xs truncate text-gray-500 mt-1">
                      {thread.lastMessage}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Hover actions */}
              {isHovering === thread.id && !thread.isWelcome && (
                <div className="absolute right-2 top-3 flex space-x-1 bg-white rounded-md shadow-sm border border-gray-100">
                  <Button
                    size="xs"
                    variant="light"
                    color="gray"
                    icon={Edit}
                    tooltip="Rename"
                    className="p-1 h-6 w-6"
                  />
                  <Button
                    size="xs"
                    variant="light"
                    color="gray"
                    icon={Trash2}
                    tooltip="Delete"
                    className="p-1 h-6 w-6"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="light" icon={Settings} className="w-full justify-start text-gray-700">
          Settings
        </Button>
        <Button
          variant="light"
          icon={LogOut}
          className="w-full justify-start text-gray-700"
          onClick={() => {}}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}
