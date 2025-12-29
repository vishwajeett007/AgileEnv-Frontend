"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useRef } from "react";
import { googleCallback, githubCallback } from "@/features/auth/actions/auth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const CallbackContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const provider = searchParams.get("provider");
    const called = useRef(false);

    useEffect(() => {
        const handleCallback = async () => {
            if (called.current) return;
            called.current = true;
            console.log("Callback Params:", { code, state, provider });

            if (!code || !state) {
                console.error("Missing code or state");
                toast.error("Missing authentication data");
                return;
            }

            if (!provider) {
                console.error("Missing provider parameter. Check your OAuth redirect URI.");
                toast.error("Missing provider parameter. Please contact support.");
                return;
            }

            toast.loading(`Authenticating with ${provider}...`, { id: "auth-toast" });

            const res = await (provider === "google" ? googleCallback(code, state) : githubCallback(code, state));

            if (res.success) {
                toast.success("Successfully logged in!", { id: "auth-toast" });
                router.push("/dashboard");
            } else {
                console.error("Callback failed", res.error);
                toast.error(res.error || "Authentication failed", { id: "auth-toast" });
            }
        };

        handleCallback();
    }, [code, state, router, provider]);

    if (!code || !state) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">Invalid callback URL. Missing code or state.</p>
                <Button onClick={() => router.push("/login")} className="cursor-pointer text-blue-500 hover:underline">
                    Back to Login
                </Button>
            </div>
        )
    }

    if (!provider) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">Configuration Error: Missing 'provider' parameter.</p>
                <p className="text-sm text-gray-500">The callback URL is missing ?provider=google or ?provider=github</p>
                <Button onClick={() => router.push("/login")} className="cursor-pointer text-blue-500 hover:underline">
                    Back to Login
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p>Completing secure sign in...</p>
        </div>
    );
};

export default function Callback() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center">Loading...</div>}>
            <CallbackContent />
        </Suspense>
    );
}
