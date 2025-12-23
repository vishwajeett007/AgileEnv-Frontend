"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { removeAuthCookie } from "@/features/auth/actions/auth";
import WorkSpaceSetUp from "@/features/onboarding/components/onboarding-modal";

const DashboardPage = () => {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await removeAuthCookie("access_token", "refresh_token", "user");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <>
            <div className="flex w-full min-h-screen items-center justify-center">
                <div className="bg-white p-10 rounded-lg shadow-md text-center">
                    <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                    <p className="text-gray-600">Welcome to your dashboard!</p>
                    <div className="space-x-2">
                        <Button
                            className="mt-4"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? "Logging out..." : "Logout"}
                        </Button>
                        <WorkSpaceSetUp />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardPage;
