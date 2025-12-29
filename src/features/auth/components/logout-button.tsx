"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { removeAuthCookie } from "@/features/auth/actions/auth";

export const LogoutButton = () => {
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
        <Button
            className="mt-4"
            onClick={handleLogout}
            disabled={isLoggingOut}
        >
            {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
    );
};
