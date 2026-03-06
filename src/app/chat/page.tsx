"use client";
import React, { useRef, useState } from 'react';
import { useChatSdk } from '../hooks/useChatSdk';

// Dummy state and handlers
type Message = {
  id: number;
  text: string;
  role: string;
  imageUrl?: string;
  fileName?: string;
};

const ChatPage: React.FC = () => {
const { text, loading, error } = useChatSdk('What is the color of sky?');

console.log('Chat SDK Result:', { text, loading, error });
  return (
    
  <div className="flex">
    <div className="w-1/3 bg-blue-50 p-6">
      <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
      {/* Sidebar content goes here */}
      <div className="bg-white rounded shadow p-4 h-full">
    <p>This is the sidebar with additional info or actions.</p>
      </div>
    </div>

    <div className="w-2/3 bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">Main Chat Area</h2>
      {/* Main chat content goes here */}
      <div className="bg-white rounded shadow p-4 h-full">
    <p>This is the main chat area.</p>
      </div>
    </div>
  </div>
  );
}

export default ChatPage;