"use client";

import WorkSpaceSetUp from "@/features/onboarding/components/onboarding-modal";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, MoreVertical, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateWorkspaceModal from "@/features/workspace/components/CreateWorkspaceModal";

const DashboardPage = () => {
    const { workspaces } = useAppSelector((state) => state.workspace);

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F4F5F7] text-[#172B4D]">
            {/* Header */}
            <header className="bg-white border-b border-[#DFE1E6] px-8 py-4 sticky top-0 z-10 w-full shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-md text-white">
                            <LayoutGrid size={24} />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Your Workspaces</h1>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#6B778C]" />
                            <Input
                                placeholder="Search workspaces..."
                                className="pl-9 bg-[#FAFBFC] border-[#DFE1E6] focus:bg-white transition-all shadow-none"
                            />
                        </div>
                        <WorkSpaceSetUp />
                        <LogoutButton />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto w-full p-8 flex-1">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2 text-[#6B778C]">
                        <Filter size={16} />
                        <span className="text-sm font-medium">All workspaces ({workspaces.length})</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Create New Card Modal */}
                    <CreateWorkspaceModal />

                    {workspaces.map((workspace) => (
                        <Card key={workspace.id} className="border border-[#DFE1E6] rounded-xl hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden bg-white hover:-translate-y-1">
                            <CardHeader className="pb-4 relative">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold text-lg shadow-inner">
                                        {workspace.name.charAt(0)}
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6B778C]">
                                        <MoreVertical size={16} />
                                    </Button>
                                </div>
                                <CardTitle className="mt-4 text-xl font-bold truncate">{workspace.name}</CardTitle>
                                <CardDescription className="text-[#6B778C] font-medium uppercase text-[10px] tracking-wider mt-1">{workspace.role}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-end pt-0">
                                <div className="text-[11px] font-bold text-[#6B778C] mb-2">{workspace.projects.length} Projects • {workspace.issues.length} Issues</div>
                                <div className="flex -space-x-2 mb-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-7 h-7 rounded-full bg-[#EBECF0] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#42526E]">
                                            U{i}
                                        </div>
                                    ))}
                                    <div className="w-7 h-7 rounded-full bg-white border-2 border-[#DFE1E6] flex items-center justify-center text-[10px] font-bold text-[#6B778C]">
                                        +5
                                    </div>
                                </div>
                                <Link href={`/workspace/${workspace.id}`} passHref>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 rounded-lg transition-colors shadow-sm">
                                        Go to Workspace
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {workspaces.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-96 text-center animate-in fade-in duration-700">
                        <div className="w-24 h-24 bg-[#EBECF0] rounded-full flex items-center justify-center mb-6">
                            <LayoutGrid size={48} className="text-[#6B778C]" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No workspaces yet</h2>
                        <p className="text-[#6B778C] max-w-sm mb-8">Create your first workspace to start managing your projects, tasks, and teams effectively.</p>
                        <WorkSpaceSetUp />
                    </div>
                )}
            </main>
        </div>
    );
}

export default DashboardPage;

