
import { VerifyOtpForm } from "@/components/auth/verify-otp-form";
import { Suspense } from "react";

const VerifyOtpPage = () => {
    return (
        <div className="flex w-full items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyOtpForm />
            </Suspense>
        </div>
    );
}

export default VerifyOtpPage;
