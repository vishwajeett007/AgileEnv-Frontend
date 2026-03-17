"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/features/auth/schemas";
import { toast } from "sonner";
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
import { CardWrapper } from "@/features/auth/components/card-wrapper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/features/auth/actions/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const ForgotPasswordForm = () => {
    const router = useRouter();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: (res, variables) => {
            if (res.success) {
                Cookies.set("otpAllowedForget", "true", { expires: 1 / 48 });
                router.push(`/verify-otp?email=${variables.email}`);
            } else {
                const errorMessage = typeof res?.error === "string" ? res.error : "Failed to send reset email";
                toast.error(errorMessage);
            }
        },
        onError: (error) => {
            toast.error("Error sending reset email");
            console.error("Error sending reset email", error);
        }
    });

    const onSubmit = async (values: z.infer<typeof ResetSchema>) => {
        forgotPasswordMutation.mutate(values);
    };
    // const throttledSubmit = useThrottle(onSubmit, 2000);
    return (
        <CardWrapper
            headerLabel="Forgot Password"
        >
            <div className="mb-4 text-center text-sm text-gray-600">
                Please enter your registered email to receive a verification code.
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                            disabled={form.formState.isSubmitting || forgotPasswordMutation.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit"
                        className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md font-medium"
                        disabled={form.formState.isSubmitting || forgotPasswordMutation.isPending}
                    >
                        {form.formState.isSubmitting || forgotPasswordMutation.isPending ? "Sending..." : "Send"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
