"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            router.replace("/dashboard");
        } else {
            router.replace("/login");
        }
    }, [router]);

    return null;
}

