"use client";
import React, { useRef, useState } from 'react';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { MicIcon, ArrowUp, ArrowUpRight } from 'lucide-react';
import { MentorHeader } from './components/mentor-head';
import MentorMessage from './components/mentor-message';
import MentorTypingIndicator from './components/mentor-typing-indicator';
import FileUploadBubble from './components/file-upload-bubble';
import { MentorQuickActions } from './components/mentor-quick-actions';

// Dummy state and handlers
type Message = {
  id: number;
  text: string;
  role: string;
  imageUrl?: string;
  fileName?: string;
};

const ChatPage: React.FC = () => {
  // Remove local messages state, use messages from useChat
  const [inputMessage, setInputMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedImage, setUploadFile] = useState<string | null>(null);
  const [uploadedImageName, setUploadFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/completion',
    }),
  });

  console.log("Messages:", messages);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() && !uploadedImage) return;
    setIsPending(true);
    setPendingMessage(inputMessage);
    try {
      await sendMessage({ text: inputMessage });
      setInputMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
    setPendingMessage(null);
    setIsPending(false);
  };

  const handleClearChat = () => {
    // Optionally implement chat clearing if supported by useChat
    // For now, do nothing or reload page
    // location.reload();
  };

  const handleRemoveFile = () => {
    setUploadFile(null);
    setUploadFileName(null);
    setUploadedFile(null);
  };

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  const getPersonaModeDisplay = () => '';


  return (
    <div className="h-full bg-white ">
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 px-4 py-1 z-30 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <MentorHeader onClearChat={handleClearChat} />
        </div>
        <div className="max-w-4xl mx-auto flex flex-col flex-1 w-full">
          <div className="flex flex-col flex-1">
            <div className="flex-1 overflow-y-auto px-6 pb-4">
              <div className="space-y-4 py-2">
                {messages.map((message, idx) => {
                  // Try to extract text and file/image info from message.parts if available
                  let text = '';
                  let imageUrl: string | undefined = undefined;
                  let fileName: string | undefined = undefined;

                  if (Array.isArray((message as any).parts)) {
                    for (const part of (message as any).parts) {
                      if (typeof part.text === 'string') {
                        text += part.text;
                      }
                      if (typeof part.imageUrl === 'string') {
                        imageUrl = part.imageUrl;
                      }
                      if (typeof part.fileName === 'string') {
                        fileName = part.fileName;
                      }
                    }
                  }

                  return (
                    <MentorMessage
                      key={(message as any).id || idx}
                      message={{
                        id: (message as any).id || idx,
                        text,
                        role: (message as any).role,
                        imageUrl,
                        fileName,
                      }}
                      isUser={(message as any).role === "user"}
                      getPersonaModeDisplay={getPersonaModeDisplay}
                      imageUrl={imageUrl}
                      fileName={fileName}
                    />
                  );
                })}
                {isPending && <MentorTypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <form
              onSubmit={handleSendMessage}
              className={`sticky ${
                messages.length || uploadedImageName
                  ? "bottom-0"
                  : "bottom-[45%]"
              } bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 space-y-4 py-2`}
            >
              {messages.length === 0 && !uploadedImageName && (
                <p className="font-mont text-3xl font-semibold text-center mb-7">
                  What are we studying today?
                </p>
              )}
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragActive(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    if (file.type.startsWith("image/")) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setUploadFile(ev.target?.result as string);
                        setUploadFileName(file.name);
                        setUploadedFile(file);
                      };
                      reader.readAsDataURL(file);
                    } else if (file.type === "application/pdf") {
                      setUploadFile(null);
                      setUploadFileName(file.name);
                      setUploadedFile(file);
                    }
                  }
                }}
                className={`flex relative gap-3 items-center border-2 rounded-2xl border-purple-300 dark:border-purple-700 px-4 py-2 shadow-lg bg-gradient-to-r from-white via-purple-50 to-purple-100 dark:from-gray-900 dark:via-purple-950 dark:to-purple-900 transition-all duration-200 ${
                  isDragActive
                    ? "ring-2 ring-purple-500 border-purple-500 bg-purple-50 dark:bg-purple-900"
                    : ""
                }`}
              >
                <FileUploadBubble
                  uploadedFileUrl={uploadedImage || undefined}
                  fileName={uploadedImageName || undefined}
                  isUploading={isAnalyzingImage}
                  onUploadClick={() =>
                    document.getElementById("mentor-file-upload")?.click()
                  }
                  onRemoveFile={handleRemoveFile}
                />
                <input
                  id="mentor-file-upload"
                  type="file"
                  accept="image/*,application/pdf"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.type.startsWith("image/")) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setUploadFile(ev.target?.result as string);
                          setUploadFileName(file.name);
                          setUploadedFile(file);
                        };
                        reader.readAsDataURL(file);
                      } else if (file.type === "application/pdf") {
                        setUploadFile(null);
                        setUploadFileName(file.name);
                        setUploadedFile(file);
                      }
                    }
                  }}
                />
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    uploadedImage
                      ? "Describe what you need help with (optional)..."
                      : "I'm stuck on this problem... | Explain this concept... | Help me understand..."
                  }
                  disabled={isPending}
                  className="flex-1 h-12 px-4 text-base border-none outline-none bg-transparent focus:border-none focus:ring-0 focus:outline-none focus:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-purple-400 dark:placeholder:text-purple-300"
                  data-testid="input-chat-message"
                />
                <Button
                  disabled={
                    (!inputMessage.trim() && !uploadedImage) || isPending
                  }
                  data-testid="button-send-message"
                  className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 p-0 border-2 border-white dark:border-gray-900"
                >
                  {messages.length > 0 ? (
                    <ArrowUp className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </Button>
              </div>
              {/* <MentorQuickActions
                onQuickAction={handleQuickAction}
                isPending={isPending}
              /> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;