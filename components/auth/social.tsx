"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Social = () => {
    return (
        <div className="flex w-1/2 sm:px-1 items-center gap-2">
            <Button
                size="lg"
                className="w-full gap-1 border border-blue-500 bg-white text-[#0057E5] hover:bg-slate-50 flex"
                variant="outline"
                onClick={() => { }}
            >
                <Image
                    src="/Images/GoogleLogo.svg"
                    alt="Google"
                    width={20}
                    height={20}
                />
                <span className="text-xs sm:inline">Sign Up With Google</span>
            </Button>
            <Button
                size="lg"
                className="w-full gap-1 border border-blue-500 bg-white text-[#0057E5] hover:bg-slate-50 flex"
                variant="outline"
                onClick={() => { }}
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
