export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Top Scrum Timeline (Coming Soon) */}
      <div className="border-b bg-background p-3">
        <p className="text-sm text-muted-foreground">Sprint Timeline Coming Soon...</p>
      </div>
      
      {/* Project Navigation Tabs (Coming Soon) */}
      <div className="border-b">
        <nav className="flex gap-4 px-6 py-2">
          <span className="text-sm font-medium">Board</span>
          <span className="text-sm text-muted-foreground">Backlog</span>
          <span className="text-sm text-muted-foreground">Timeline</span>
          <span className="text-sm text-muted-foreground">List</span>
        </nav>
      </div>
      
      {/* Project Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
