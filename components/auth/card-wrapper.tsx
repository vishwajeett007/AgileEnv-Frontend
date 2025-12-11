"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Social } from "@/components/auth/social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: CardWrapperProps) => {
    return (
        <Card className="w-full max-w-md border-none shadow-none gap-0">
            <CardHeader>
                <div className="flex w-full flex-col items-center justify-center gap-y-4">
                    <h1 className="text-3xl font-semibold text-black">{headerLabel}</h1>
                </div>
            </CardHeader>
            <CardContent className="mb-4">{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
        </Card>
    );
};
