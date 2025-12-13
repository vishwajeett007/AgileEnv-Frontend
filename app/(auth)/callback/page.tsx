
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { googleCallback, githubCallback } from "@/actions/auth";

const CallbackContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const provider = searchParams.get("provider");

    useEffect(() => {
        const handleCallback = async () => {
            if (code && state) {
                // console.log("Processing callback...", { code, state });
                const res = await (provider === "google" ? googleCallback(code, state) : githubCallback(code, state));
                if (res.success) {
                    router.push("/dashboard");
                } else {
                    console.error("Callback failed", res.error);
                    router.push("/login");
                }
            }
        };

        handleCallback();
    }, [code, state, router, provider]);

    return <div>Loading...</div>;
};

export default function Callback() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CallbackContent />
        </Suspense>
    );
}
