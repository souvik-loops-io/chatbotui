export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ padding: '2rem' }}>
      {/* Add chat-specific navigation or sidebar here if needed */}
      {children}
    </section>
  );
}
