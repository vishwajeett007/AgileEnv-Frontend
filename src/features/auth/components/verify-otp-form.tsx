"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { forgotPassword, resetPassword } from "@/features/auth/actions/auth";
import { toast } from "sonner";
import { useThrottle } from "../../../shared/hooks/use-throttle";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

export const VerifyOtpForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [timer, setTimer] = useState(30);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        if (pastedData.every(char => !isNaN(Number(char)))) {
            const newOtp = [...otp];
            pastedData.forEach((val, i) => {
                if (i < 6) newOtp[i] = val;
            });
            setOtp(newOtp);
            inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
        }
    };

    const verifyMutation = useMutation({
        mutationFn: (otpCode: string) => resetPassword({ email: email as string, otp: otpCode }),
        onSuccess: (res) => {
            if (res.success || res.data?.reset_token) {
                toast.success("OTP verified successfully");
                router.push(`/reset-password?token=${res.data.reset_token}`)
            } else {
                console.error(res.error || "Verification Failed!");
                toast.error(res.error || "Verification Failed!");
            }
        },
        onError: (error) => {
            console.error("Error verifying OTP", error);
            toast.error("An error occurred during verification.");
        }
    });

    const resendMutation = useMutation({
        mutationFn: () => forgotPassword({ email: email as string }),
        onSuccess: (res) => {
            if (!res.success) {
                console.error(res.error || "Failed to resend OTP");
                toast.error(res.error || "Failed to resend OTP");
            } else {
                toast.success("OTP resent successfully");
            }
        },
        onError: (error) => {
            console.error("Error resending OTP", error);
            toast.error("Something went wrong");
        }
    });

    const handleResend = async () => {
        if (timer > 0 || !email) return;
        setTimer(30);
        resendMutation.mutate();
    };

    const handleVerify = async () => {
        const otpCode = otp.join("");
        if (otpCode.length < 6 || !email) return;
        verifyMutation.mutate(otpCode);
    };

    const throttledVerify = useThrottle(handleVerify, 2000);
    const throttledResend = useThrottle(handleResend, 2000);


    return (
        <Card className="w-full max-w-md border-none shadow-none">
            <CardHeader className="flex flex-col items-center justify-center space-y-2 p-0 pb-10">
                <h1 className="text-3xl font-semibold text-black">Verify With OTP</h1>
                <p className="text-sm text-center text-gray-600">
                    Please enter the OTP sent to <span className="text-[#0057E5] underline">{email || "abc@xyz.com"}</span>
                </p>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex w-full flex-col gap-6">
                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-2">
                        {otp.map((data, index) => (
                            <Input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={data}
                                ref={(el) => { inputRefs.current[index] = el }}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="h-12 w-12 rounded-lg bg-gray-200 text-center text-xl font-semibold text-gray-900 outline-1 outline-blue-500 outline-solid focus:ring-2 focus:ring-[#0057E5]"
                            />
                        ))}
                    </div>

                    <Button
                        className="w-full bg-[#0057E5] text-lg font-medium hover:bg-[#0046b8]"
                        size="lg"
                        onClick={throttledVerify}
                        disabled={otp.join("").length < 6 || verifyMutation.isPending || resendMutation.isPending}
                    >
                        {verifyMutation.isPending ? "Verifying..." : "Enter OTP"}
                    </Button>


                    <Button
                        variant="outline"
                        className="w-full border-blue-200 text-[#0057E5] hover:bg-blue-50"
                        size="lg"
                        onClick={throttledResend}
                        disabled={timer > 0 || verifyMutation.isPending || resendMutation.isPending}
                    >
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
