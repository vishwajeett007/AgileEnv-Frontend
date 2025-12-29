import { VerifyRegistrationForm } from "@/features/auth/components/verify-registration-form";
import { Suspense } from "react";

const VerifyEmailPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyRegistrationForm />
        </Suspense>
    );
}

export default VerifyEmailPage;
