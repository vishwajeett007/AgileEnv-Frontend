"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/features/auth/store/auth-Slice";
import { clearAuthStorage } from "@/features/auth/store/authStorage";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        setIsLoggingOut(true);
        try {
            clearAuthStorage();
            dispatch(logout());
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
