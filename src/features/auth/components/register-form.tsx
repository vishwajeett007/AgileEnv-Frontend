"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/features/auth/schemas";
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
import { register } from "@/features/auth/actions/auth";
import { toast } from "sonner";
import { useThrottle } from "@/hooks/use-throttle";

export const RegisterForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
                localStorage.setItem("otpAllowed", "true");
                toast.success("Check your email for verification");
                router.push(`/verify-email?email=${res.email}`);
            } else {
                const errorMessage = typeof res?.error === "string" ? res.error : "Registration failed";
                console.error(errorMessage);
                toast.error(errorMessage);
            }
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setLoading(false);
        }
    };

    const throttledSubmit = useThrottle(onSubmit, 2000);


    return (
        <CardWrapper
            headerLabel="Create an account"
            showSocial
        >
            <div className="mb-4 text-center text-base text-gray-500">
                Already have an account? <Link href="/login" className="text-blue-600 underline">log in</Link>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(throttledSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="space-y-0.8">
                                <FormLabel className="text-sm font-medium text-gray-900">Username</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="abc"
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
                            <FormItem className="space-y-0.8">
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
                            <FormItem className="space-y-0.8">
                                <FormLabel className="text-sm font-medium text-gray-900">Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Enter your password"
                                            type={showPassword ? "text" : "password"}
                                            className="h-10 border-0 bg-gray-100 pr-10"
                                            disabled={loading}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                        />
                                    </FormControl>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    {isPasswordFocused && (
                                        <div className="absolute z-10 w-full mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl text-sm text-gray-600 top-full left-0 animate-in fade-in zoom-in-95 duration-200">
                                            {/* Tooltip Arrow */}
                                            <div className="absolute -top-2 left-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>

                                            <h4 className="font-semibold mb-2 text-gray-900">Password Requirements</h4>
                                            <ul className="list-disc pl-5 space-y-1 text-xs">
                                                <li>Password must contain 6 characters</li>
                                                <li>Include at least one uppercase letter (A-Z).</li>
                                                <li>Include at least one number (0-9).</li>
                                                <li>Include at least one special character.</li>
                                            </ul>
                                        </div>
                                    )}
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
                            <FormItem className="space-y-0.8">
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

                    <Button type="submit"
                        className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-10 text-sm mt-2"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
