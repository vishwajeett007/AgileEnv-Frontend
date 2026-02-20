"use client";

import WorkSpaceSetUp from "@/features/onboarding/components/onboarding-modal";
import { LogoutButton } from "@/features/auth/components/logout-button";

const DashboardPage = () => {
    
    if(!localStorage.getItem("access_token")){
        window.location.href = "/login";
    }


    return (
        <div className="flex w-full min-h-screen items-center justify-center bg-[#FAFBFC]">
            <div className="bg-white p-10 rounded-lg shadow-sm border border-[#dfe1e6] text-center max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-[#172B4D]">Dashboard</h1>
                <p className="text-[#42526E] mb-8">Welcome to your dashboard!</p>
                <div className="flex flex-col space-y-3">
                    <WorkSpaceSetUp />
                    <LogoutButton />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;

