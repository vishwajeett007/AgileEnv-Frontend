"use client"

import WorkspaceSidebar from "@/features/workspace/components/WorkspaceSidebar"
import WorkspaceNavbar from "@/features/workspace/components/WorkspaceNavbar"

export default function WorkspaceLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            <WorkspaceSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <WorkspaceNavbar />
                <main className="flex-1 overflow-auto bg-[#FAFBFC]">
                    {children}
                </main>
            </div>
        </div>
    )
}
