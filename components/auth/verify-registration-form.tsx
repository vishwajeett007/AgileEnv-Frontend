"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyRegistration, resendRegistrationOtp } from "@/actions/auth";
import { useEffect, useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useThrottle } from "@/hooks/use-throttle";

export const VerifyRegistrationForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

    const onVerify = async () => {
        const otpCode = otp.join("");
        if (otpCode.length !== 6 || !email) return;

        setLoading(true);
        try {
            const data = await verifyRegistration(email, otpCode);

            if (data.success) {
                setSuccess(true);
                toast.success("Verification successful");
            } else {
                console.error(data.error || "Verification failed");
                toast.error(data.error || "Verification failed");
            }
        } catch (error) {
            console.error("Error verifying otp", error);
            toast.error("Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const onResend = async () => {
        if (timer > 0 || !email) return;
        setTimer(30);

        try {
            const res = await resendRegistrationOtp(email);
            if (res.success) {
                toast.success("OTP Resent");
            } else {
                console.error(res.error || "Failed to resend OTP");
                toast.error(res.error || "Failed to resend OTP");
            }
        } catch (error: any) {
            console.error("Error resending otp", error);
            toast.error(error || "Failed to resend OTP");
        }
    };

    const throttledVerify = useThrottle(onVerify, 2000);
    const throttledResend = useThrottle(onResend, 2000);

    if (success) {
        return (

            <Card className="w-full max-w-md border-none shadow-none">
                <CardContent className="flex w-full flex-col items-center justify-center space-y-6 pt-6 ">
                    <CheckCircle className="h-16 w-16 text-[#0057E5]" />
                    <h1 className="text-2xl font-semibold text-black">Account Created</h1>
                    <p className="text-sm text-center text-gray-600">
                        Your account has been successfully created.
                    </p>
                    <Link href="/login" className="w-full">
                        <Button className="w-full bg-[#0057E5] hover:bg-[#0046b8] text-white h-12 text-md font-medium">
                            Back to login
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        )
    }
    return (
        <Card className="w-full max-w-md border-none shadow-none">
            <CardHeader className="flex flex-col items-center justify-center space-y-2 p-0 pb-10">
                <h1 className="text-3xl font-semibold text-black">Verify Account</h1>
                <p className="text-sm text-center text-gray-600">
                    Please enter the OTP sent to <span className="text-[#0057E5] underline">{email || "your email"}</span>
                </p>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex w-full flex-col gap-6">
                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-2">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={data}
                                ref={(el) => { inputRefs.current[index] = el }}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                disabled={loading}
                                className="h-12 w-12 rounded-lg bg-gray-100 text-center text-xl font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#0057E5]"
                            />
                        ))}
                    </div>

                    <Button
                        className="w-full bg-[#0057E5] text-lg font-medium hover:bg-[#0046b8]"
                        size="lg"
                        onClick={throttledVerify}
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Enter OTP"}
                    </Button>


                    <Button
                        variant="outline"
                        className="w-full border-blue-200 text-[#0057E5] hover:bg-blue-50"
                        size="lg"
                        onClick={throttledResend}
                        disabled={loading || timer > 0}
                    >
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
