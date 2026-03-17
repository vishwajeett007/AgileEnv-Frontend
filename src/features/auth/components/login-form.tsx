"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/features/auth/schemas";
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
import { Checkbox } from "@/components/ui/checkbox";
import { CardWrapper } from "@/features/auth/components/card-wrapper";
import { Eye, EyeOff } from "lucide-react";
import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/actions/auth";
import { toast } from "sonner";
import { useThrottle } from "../../../shared/hooks/use-throttle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAuthCookies } from "@/lib/auth-cookies";

export const LoginForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data, variables) => {
            if (data?.success) {
                toast.success("Login successful");
                setAuthCookies(
                    data.data.access_token,
                    data.data.refresh_token,
                    data.data.user,
                    variables.rememberMe
                );
                queryClient.setQueryData(['user'], data.data.user);
                router.push("/dashboard");
            } else {
                const errorMessage = typeof data?.error === "string" ? data.error : "Login failed";
                console.error(errorMessage);
                toast.error(errorMessage);
            }
        },
        onError: (error) => {
            console.error("Error logging in", error);
            toast.error("An error occurred during login.");
        }
    });

    const onSubmit = useCallback(async (values: z.infer<typeof LoginSchema>) => {
        loginMutation.mutate(values);
    }, [loginMutation]);

    const throttledSubmit = useThrottle(onSubmit, 1000);

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            showSocial
        >
            <div className="mb-6 text-center text-base text-gray-600">
                Do not have an account? <Link href="/sign-up" className="text-[#0057E5] underline">Sign up</Link>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(throttledSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem id="email-item">
                                    <FormLabel className="text-base font-medium text-gray-900">Username or Email Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your email or username"
                                            type="text" // Allow username
                                            className="h-12 border-0 bg-gray-100"
                                            disabled={form.formState.isSubmitting || loginMutation.isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem id="password-item">
                                    <FormLabel className="text-base font-medium text-gray-900">Password</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter password"
                                                type={showPassword ? "text" : "password"}
                                                className="h-12 border-0 bg-gray-100 pr-10"
                                                disabled={form.formState.isSubmitting || loginMutation.isPending}
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
                    </div>

                    <div className="flex items-center justify-between">
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <FormItem id="remember-me-item" className="flex flex-row items-center space-x-2 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            id="remember"
                                            className="border-gray-400"
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked);
                                            }}
                                            disabled={form.formState.isSubmitting || loginMutation.isPending}
                                        />
                                    </FormControl>
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 cursor-pointer"
                                    >
                                        Remember me
                                    </label>
                                </FormItem>
                            )}
                        />

                        <Link href="/forgot-password" className="text-sm font-medium text-gray-500 hover:text-gray-800 underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit"
                        className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md font-medium"
                        disabled={form.formState.isSubmitting || loginMutation.isPending}
                    >
                        {form.formState.isSubmitting || loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper >
    );
};
