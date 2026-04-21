import WorkspaceHeader from "@/features/workspace/components/workspace-header";
export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <header><WorkspaceHeader/></header>
    <main className="overflow-auto h-[calc(100vh-120px)] sm:h-full">
      {children}
    </main>
    </>
  );
}
