'use client';
// checker
// import { Title, Text } from '@tremor/react';
import { Title, Text } from '@tremor/react';
import { Button } from '../atom/button';
import { SignedOut, SignedIn, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import ChatInput from './chat/ChatInput';
import ChatSidebar from './../../../components/thread/chat-thread';
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="absolute top-4 right-4 z-50">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <SignedIn>
        <ChatInput />
        <ChatSidebar />
      </SignedIn>
      <SignedOut>
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="space-y-2">
            <Title className="text-center">Welcome to ChatAI</Title>
            <Text className="text-center">Your AI-powered conversation assistant</Text>
          </div>
          <div className="space-y-4">
            <SignInButton mode="modal">
              <Button className="w-full py-3">
                <span>Sign In</span>
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary" className="w-full py-3">
                <span>Sign Up</span>
              </Button>
            </SignUpButton>
          </div>
          <Text className="text-sm text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </div>
      </SignedOut>
    </div>
  );
}
