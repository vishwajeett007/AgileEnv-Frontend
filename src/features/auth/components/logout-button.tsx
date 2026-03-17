"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthCookies } from "@/lib/auth-cookies";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        setIsLoggingOut(true);
        try {
            clearAuthCookies();
            queryClient.removeQueries({ queryKey: ['user'] });
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <LogOut
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={handleLogout}
        >
            {isLoggingOut ? "Logging out..." : "Logout"}
        </LogOut>
    );
};
