"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
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
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";

export const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setLoading(true);
        try {
            const data = await login(values);

            if (data?.data) {
                localStorage.setItem("access_token", data.data.access_token);
                localStorage.setItem("refresh_token", data.data.refresh_token);
                router.push("/dashboard");
            } else {
                console.error(data?.error || "Login failed");
            }
        } catch (error) {
            console.error("Error logging in", error);
        } finally {
            setLoading(false);
        }
    };

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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-medium text-gray-900">Username or Email Id</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your email"
                                            // type="email" // Allow username
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
                                <FormItem>
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
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" className="border-gray-400"
                                onCheckedChange={(checked) => console.log(checked)}
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link href="/forgot-password" className="text-sm font-medium text-gray-500 hover:text-gray-800 underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md font-medium">
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
