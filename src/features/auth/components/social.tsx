"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { googleRedirect, githubRedirect } from "@/features/auth/actions/auth";

export const Social = () => {
    const handleGoogleRedirect = async () => {
        const res = await googleRedirect();
        if (res.success) {
            window.location.href = res.link;
        }
    }
    const handleGithubRedirect = async () => {
        const res = await githubRedirect();
        if (res.success) {
            window.location.href = res.link;
        }
    }

    return (
        <div className="flex w-1/2 items-center gap-2">
            <Button
                size="lg"
                className="w-full gap-1 border border-blue-500 bg-white text-[#0057E5] hover:bg-slate-50 flex"
                variant="outline"
                onClick={handleGoogleRedirect}
            >
                <Image
                    src="/Images/GoogleLogo.svg"
                    alt="Google"
                    width={20}
                    height={20}
                />
                <span className="text-xs sm:text-md sm:inline">Sign Up With Google</span>
            </Button>
            <Button
                size="lg"
                className="w-full gap-1 border border-blue-500 bg-white text-[#0057E5] hover:bg-slate-50 flex"
                variant="outline"
                onClick={handleGithubRedirect}
            >
                <Image
                    src="/Images/GithubLogo.svg"
                    alt="Github"
                    width={20}
                    height={20}
                />
                <span className="text-xs sm:inline">Sign Up With Github</span>
            </Button>
        </div>
    );
};
