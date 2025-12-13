"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/auth";

export const RegisterForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setLoading(true);
        try {
            const res = await register(values);

            if (res.success && res.email) {
                router.push(`/verify-email?email=${res.email}`);
            } else {
                console.error(res.error || "Registration failed");
            }
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/login"
            showSocial
        >
            <div className="mb-4 text-center text-sm text-gray-500">
                Already have an account? <Link href="/login" className="text-blue-600 hover:underline">log in</Link>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-900">Username</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="abc" // From design
                                        className="h-10 border-0 bg-gray-100"
                                        disabled={loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-900">Email Id</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your email"
                                        type="email"
                                        className="h-10 border-0 bg-gray-100"
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
                            <FormItem className="space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-900">Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your password"
                                            type={showPassword ? "text" : "password"}
                                            className="h-10 border-0 bg-gray-100 pr-10"
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Confirm Password Field */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel className="text-sm font-medium text-gray-900">Confirm Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Re-enter your password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="h-10 border-0 bg-gray-100 pr-10"
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center space-x-2 pt-1">
                        <Checkbox id="terms" className="h-4 w-4" required />
                        <label
                            htmlFor="terms"
                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                        >
                            I have read and agree with the
                        </label>
                        <Link href="#" className="underline text-xs font-medium text-blue-500">terms and conditions</Link>
                    </div>

                    <Button type="submit" className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-10 text-sm mt-2">
                        Sign up
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
