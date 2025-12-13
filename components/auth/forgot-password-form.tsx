"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas";
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
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/actions/auth";
import { useThrottle } from "@/hooks/use-throttle";

export const ForgotPasswordForm = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
        setLoading(true);
        try {
            const res = await forgotPassword(values);

            if (res.success) {
                router.push(`/verify-otp?email=${values.email}`);
            } else {
                console.error(res.error || "Failed to send reset email");
            }
        } catch (error) {
            console.error("Error sending reset email", error);
        } finally {
            setLoading(false);
        }
    };
    const throttledSubmit = useThrottle(onSubmit, 2000);
    return (
        <CardWrapper
            headerLabel="Forgot Password"
            backButtonLabel="Back to login"
            backButtonHref="/login"
        >
            <div className="mb-4 text-center text-sm text-gray-600">
                Please enter your registered email to receive a verification code.
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(throttledSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900">Email Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your email"
                                            type="email"
                                            className="h-12 border-0 bg-gray-100"
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit"
                        className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md font-medium"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send"}
                    </Button>
                </form>
                <Button type="button"
                    className="w-full bg-gray-200 text-gray-900 border border-gray-400 focus:ring focus:ring-8 hover:bg-black hover:text-white mt-4 h-12 text-md font-medium"
                    onClick={() => router.push("/login")}
                >
                    Back to login
                </Button>
            </Form>
        </CardWrapper>
    );
};
