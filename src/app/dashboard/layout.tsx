export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ padding: '2rem' }}>
      {/* You can add a sidebar or navbar here */}
      {children}
    </section>
  );
}
