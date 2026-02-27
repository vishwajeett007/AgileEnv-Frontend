export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Projects List (Coming Soon) */}
      <aside className="w-64 border-r bg-muted/40">
        <div className="p-4">
          <h2 className="font-semibold">Projects</h2>
          <p className="text-sm text-muted-foreground mt-2">Sidebar coming soon...</p>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
