"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/auth-Slice";

export const LogoutButton = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        setIsLoggingOut(true);
        try {
            dispatch(logout());
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
