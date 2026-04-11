import WorkspaceHeader from "@/features/workspace/components/workspace-header";
export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <header><WorkspaceHeader/></header>
    <main>
      {children}
    </main>
    </>
  );
}
