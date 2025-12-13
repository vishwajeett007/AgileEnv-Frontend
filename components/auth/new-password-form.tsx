"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { completeReset } from "@/actions/auth";
import { toast } from "sonner";
import { ResetCompleteSchema } from "@/schemas";

export const NewPasswordForm = () => {
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const form = useForm<z.infer<typeof ResetCompleteSchema>>({
        resolver: zodResolver(ResetCompleteSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            reset_token: token || "",
        },
    });

    const [loading, setLoading] = useState(false);
    const onSubmit = async (values: z.infer<typeof ResetCompleteSchema>) => {
        if (!token) {
            console.error("Missing reset token!");
            toast.error("Missing reset token!");
            return;
        }

        try {
            setLoading(true);
            const res = await completeReset(values);
            if (res.success) {
                setSuccess(true);
                toast.success("Password reset successful!");
            } else {
                toast.error(res.error || "Failed to reset password!");
            }
        } catch (error) {
            console.error("Failed to reset password", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <CardWrapper
                headerLabel=""
                backButtonLabel=""
                backButtonHref=""
            >
                <div className="flex w-full flex-col items-center justify-center space-y-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Password Changed</h1>
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-200">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-600"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                    </div>
                    <Link href="/login" className="w-full">
                        <Button className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md font-medium">
                            Back to login
                        </Button>
                    </Link>
                </div>
            </CardWrapper>
        );
    }

    return (
        <CardWrapper
            headerLabel="Reset Password"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="mb-6 text-center text-sm text-gray-600">
                Enter your new password below
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900">New Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter your new password"
                                                type={showPassword ? "text" : "password"}
                                                className="h-12 border-0 bg-gray-100 pr-10"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900">Confirm Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Re-enter your new password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                className="h-12 border-0 bg-gray-100 pr-10"
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit"
                        className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md font-medium"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Done"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
