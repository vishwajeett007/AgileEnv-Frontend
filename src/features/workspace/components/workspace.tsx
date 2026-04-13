import Link from 'next/link';
import { Clock, Link as LinkIcon, Filter } from 'lucide-react';

export function Workspace({ workspaceId }: { workspaceId: string }) {
    console.log("workspaceId in Workspace component:", workspaceId);
    const issues = [
        { id: 1, title: 'Fix login bug', description: 'Users are unable to log in with correct credentials.', status: 'In Progress', LastUpdate: 'today' },
        { id: 2, title: 'Update user profile page', description: 'Redesign the user profile page for better UX.', status: 'In Progress', LastUpdate: 'today' },
        { id: 3, title: 'Implement search functionality', description: 'Add search functionality to the dashboard.', status: 'Under Review', LastUpdate: 'yesterday' },
    ];
    
    const activityFeed = [
        { id: 1, workspaceMemberName: 'John Doe', activity: 'commented on issue #123', timestamp: '2 hours ago' },
        { id: 2, workspaceMemberName: 'Jane Smith', activity: 'updated the status of issue #456 to "In Progress"', timestamp: '4 hours ago' },
        { id: 3, workspaceMemberName: 'Michael Brown', activity: 'created a new issue #789', timestamp: '1 day ago' },
        { id: 4, workspaceMemberName: 'John Doe', activity: 'commented on issue #13', timestamp: '2 days ago' },
        { id: 5, workspaceMemberName: 'Jane Smith', activity: 'updated the status of issue #456 to "In Progress"', timestamp: '4 days ago' },
        { id: 6, workspaceMemberName: 'Michael Brown', activity: 'created a new issue #78', timestamp: '6 days ago' }
    ];
    const projects = [
        { id: 1, name: 'Mobile App Rebrand', phase: 'UI Implementation and asset delivery.', status: 'In Progress' },
        { id: 2, name: 'Website Redesign', phase: 'Planning and wireframing.', status: 'Planning' },
        { id: 3, name: 'API Development', phase: 'Paused due to resource constraints.', status: 'Paused' },
    ];
    
    return (
        <div className='flex justify-center items-center'>
            <div className='w-full max-w-6xl h-[calc(100vh-61px)] flex flex-col md:flex-row justify-around gap-6 p-5'>
                <div className='flex flex-col max-w-4xl'>
                    <div className='pb-10'>
                        <ul className='flex font-bold list-none gap-5 pb-3 border-b'>
                            <li>Dashboard</li>
                            <li>My Issues</li>
                            <li>Projects</li>
                            <li>Views</li>
                        </ul>
                    </div>
                    {/* Recent Projects */}
                    <div className='flex justify-between pr-3'>
                        <h2 className='text-xl font-bold'>Recent Projects</h2>
                        <Link href={`/workspace/${workspaceId}/project/1`} className='text-blue-500 hover:underline'>
                            <LinkIcon className='inline mr-2' />
                            View All
                        </Link>
                    </div>
                    <div className='flex flex-col sm:flex-row pt-4 pb-10 gap-3'>
                        {projects.map((project) => (
                            <Link key={project.id} href={`/workspace/${workspaceId}/project/${project.id}`} className='flex flex-col border rounded-md p-4 bg-gray-100 gap-2 hover:bg-gray-200 transition cursor-pointer hover:scale-105'>
                                <h2 className='font-medium pb-1'>{project.name}</h2>
                                <p className='text-sm text-gray-500'>Phase: {project.phase}</p>
                                <div>
                                <span className='w-full mx-auto bg-gray-300 p-1 text-xs rounded-xs'>{project.status}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                        
                    {/* Assigned Issues */}
                    <div className='flex justify-between pr-3'>
                      <h2 className='text-xl font-bold'>Assigned to Me</h2>
                        <button className='flex gap-2 p-1 bg-gray-200/60 rounded-xs px-2 '><Filter/>Filter</button>
                    </div>
                    <div className='border rounded-md mt-5 bg-gray-100'>
                        {issues.map((issue) => (
                            <div key={issue.id} className='flex items-center justify-between gap-4 p-2 border-b'>
                                <div className='flex items-center gap-3 p-1'>
                                    <div className='w-3 h-3 bg-blue-500 rounded-full'></div>

                                    <div>
                                        <h3 className='font-bold'>{issue.title}</h3>
                                        <p className='text-sm text-gray-500'>{issue.description}</p>
                                    </div>
                                </div>

                                <div className='flex justify-center align-center gap-4'>
                                    <div className='bg-gray-300 p-0.5 text-xs'>{issue.status}</div>
                                    <p className='text-xs text-gray-500 pt-1'><Clock className='inline mr-1 w-4 h-4' />{issue.LastUpdate}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Activity Feed */}
                <div className='w-full max-w-75 flex flex-col '>
                    <h1 className='text-xl font-bold'>Activity</h1>
                    <ul className='mt-4 h-75 max-h-87.5 overflow-y-auto'>
                        {activityFeed.map((activity) => (
                            <li key={activity.id} className='flex relative'>
                                <div className='flex flex-col items-center pr-2'>
                                    <div className='w-4 h-4 border-2 rounded-sm bg-white z-10'></div>
                                    <div className='flex-1 w-px bg-gray-300'></div>
                                </div>

                                <div className='pb-6'>
                                    <p className='font-normal'>
                                        <span className='font-bold'>{activity.workspaceMemberName}</span>: {activity.activity}
                                    </p>
                                    <p className='text-xs text-gray-500'>{activity.timestamp}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* performance */}
                    <div className='flex flex-col p-5 mx-5 mt-4 bg-gray-100'>
                        <h1 className='text-sm font-extrabold pb-4'>Weekly Performance</h1>

                        <div className='flex flex-col justify-start align-center'>
                        <p className='text-md font-bold leading:0.5'>Closed Issues:</p>
                        <div className='flex justify-between'>
                            <p className='font-extrabold text-3xl'>12</p>
                            <div className='flex flex-col items-end'>
                                +15%
                                <p className='text-xs text-gray-500'>Vs Last Week</p>
                            </div>
                        </div>
                        </div>
                        <div>
                            <div className='flex justify-between items-center pt-4'>
                            <p>Progress</p>
                            <p>75%</p>
                            </div>
                            <div className='w-full h-2 bg-gray-300 rounded-full my-2'>
                                <div className='h-full bg-green-500 rounded-full' style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <p className='flex text-xs'>You're significantly ahead of your team average this sprint.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspace