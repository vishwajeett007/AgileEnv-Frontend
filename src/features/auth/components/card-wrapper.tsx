import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Social } from "@/features/auth/components/social";
import { ArrowLeft } from "lucide-react";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    showSocial,
}: CardWrapperProps) => {
    return (
        <Card className="w-full max-w-md border-none shadow-none p-0 gap-0">
            <ArrowLeft className="absolute top-7 left-7 bg-gray-200 rounded-full p-2 h-10 w-10 cursor-pointer" onClick={() => window.history.back()} />
            <CardHeader>
                <div className="flex w-full flex-col items-center justify-center gap-y-4">
                    <h1 className="text-3xl font-semibold text-black">{headerLabel}</h1>
                </div>
            </CardHeader>
            <CardContent className="mb-4 p-0">{children}</CardContent>
            {showSocial && (
                <CardFooter className="p-0 pr-2">
                    <Social />
                </CardFooter>
            )}
        </Card>
    );
};
