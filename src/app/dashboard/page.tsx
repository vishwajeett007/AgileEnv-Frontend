import WorkSpaceSetUp from "@/features/onboarding/components/onboarding-modal";
import { LogoutButton } from "@/features/auth/components/logout-button";

const DashboardPage = () => {
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600">Welcome to your dashboard!</p>
                <div className="space-x-2">
                    <LogoutButton />
                    <WorkSpaceSetUp />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
