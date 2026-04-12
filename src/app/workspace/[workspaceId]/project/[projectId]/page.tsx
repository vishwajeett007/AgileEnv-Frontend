import { redirect } from 'next/navigation';

export default function ProjectPage({ params }: { params: { workspaceId: string; projectId: string } }) {
  // redirect(`/workspace/${params.workspaceId}/project/${params.projectId}/board`);
  return (
    <div className='flex justify-center items-center h-screen'>
      <h1 className='text-2xl font-bold'>Project Page for Project ID: {params.projectId}</h1>
    </div>
  );
}
