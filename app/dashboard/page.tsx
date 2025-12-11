"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const DashboardPage = () => {
    const router = useRouter();
    return (
        <div className="flex w-full min-h-screen items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600">Welcome to your dashboard!</p>
                <Button className="mt-4" onClick={() => router.push("/login")}>Back to login</Button>
            </div>
        </div>
    );
}

export default DashboardPage;
