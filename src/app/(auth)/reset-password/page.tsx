
import { Suspense } from "react";
import { NewPasswordForm } from "@/features/auth/components/new-password-form";

const ResetPasswordPage = () => {
    return (
        <div className="flex w-full items-center justify-center">
            <Suspense fallback={<div>Loading...</div>}>
                <NewPasswordForm />
            </Suspense>
        </div>
    );
}

export default ResetPasswordPage;
