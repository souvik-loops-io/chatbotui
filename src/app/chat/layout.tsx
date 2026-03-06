import ChatPage from "./page";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Add chat-specific navigation or sidebar here if needed */}
      <ChatPage />
    </section>
  );
}
