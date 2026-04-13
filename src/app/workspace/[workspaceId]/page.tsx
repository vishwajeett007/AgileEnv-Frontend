import Workspace from "@/features/workspace/components/workspace";

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  return <Workspace workspaceId={workspaceId} />;
}