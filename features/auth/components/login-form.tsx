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
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/actions/auth";
import { toast } from "sonner";
import { useThrottle } from "@/hooks/use-throttle";

export const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        try {
            const data = await login(values);

            if (data?.success) {
                toast.success("Login successful");
                router.push("/dashboard");
            } else {
                console.error(data?.error || "Login failed");
                toast.error(data?.error || "Login failed");
            }
        } catch (error) {
            console.error("Error logging in", error);
        } finally {
            setLoading(false);
        }
    };

    const throttledSubmit = useThrottle(onSubmit, 2000);

    return (
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/sign-up"
            showSocial
        >
            <div className="mb-6 text-center text-sm text-gray-600">
                Do not have an account? <Link href="/sign-up" className="text-[#0057E5] hover:underline">Sign up</Link>
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
                                            disabled={loading}
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
                                                disabled={loading}
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
                                            onCheckedChange={field.onChange}
                                            disabled={loading}
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
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper >
    );
};
