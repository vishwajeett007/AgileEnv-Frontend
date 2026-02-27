import { redirect } from 'next/navigation';

export default function ProjectPage({ params }: { params: { workspaceId: string; projectId: string } }) {
  redirect(`/workspace/${params.workspaceId}/project/${params.projectId}/board`);
}
