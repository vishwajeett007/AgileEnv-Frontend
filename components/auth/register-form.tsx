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

export const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log(values);
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-gray-900">Username</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="abc" // From design
                                        className="h-12 border-0 bg-gray-100"
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
                            <FormItem>
                                <FormLabel className="text-base font-medium text-gray-900">Email Id</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter your email"
                                        type="email"
                                        className="h-12 border-0 bg-gray-100"
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
                                            placeholder="Enter your password"
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
                    {/* Note: Confirm Password is in design but not in basic schema yet. 
              Adding UI for it, but might not validate fully without schema update.
              Visual only for now. */}
                    <div className="space-y-2">
                        <FormLabel className="text-base font-medium text-gray-900">Confirm Password</FormLabel>
                        <div className="relative">
                            <Input
                                placeholder="Re-enter your password"
                                type={showConfirmPassword ? "text" : "password"}
                                className="h-12 border-0 bg-gray-100 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                        >
                            I have read and agree with the
                        </label>
                        <Link href="#" className="underline text-sm font-medium text-gray-500">terms and conditions</Link>
                    </div>

                    <Button type="submit" className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md">
                        Sign up
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
