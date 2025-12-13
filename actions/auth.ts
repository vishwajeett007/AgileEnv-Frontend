"use client";

import * as z from "zod";
import { RegisterSchema, LoginSchema, ResetSchema, VerifySchema, ResetCompleteSchema } from "@/schemas";
// import { AuthError } from "next-auth";
// import { headers } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        const response = await fetch(`${API_URL}login/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: email,
                password,
            }),
        });

        if (!response.ok) {
            return { error: "Invalid credentials!" };
        }

        const data = await response.json();
        return { success: "Login successful!", data };
    } catch (error) {
        return { error: "Something went wrong!" };
    }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    // Mapping fields
    const payload = {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        password2: validatedFields.data.confirmPassword,
        username: validatedFields.data.username,
    };

    try {
        const response = await fetch(`${API_URL}register/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            return { error: "Registration failed!" };
        }

        // Return email to redirect
        return { success: "Registration successful!", email: payload.email };
    } catch (error) {
        return { error: "Something went wrong!" };
    }
};

export const forgotPassword = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid email!" };
    }

    try {
        const response = await fetch(`${API_URL}forget-password/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: validatedFields.data.email }),
        });

        if (!response.ok) {
            return { error: "Failed to send reset email!" };
        }

        return { success: "Reset email sent!" };
    } catch (error) {
        return { error: "Something went wrong!" };
    }
};

export const verifyRegistration = async (email: string, otp_code: string) => {
    try {
        const response = await fetch(`${API_URL}verify-registration/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                otp_code,
                purpose: "registration"
            }),
        });

        if (!response.ok) {
            return { error: "Verification failed!" };
        }

        const data = await response.json();
        return { success: "Verified!", data };
    } catch (error) {
        return { error: "Something went wrong!" };
    }
};

export const resendRegistrationOtp = async (email: string) => {
    try {
        const response = await fetch(`${API_URL}resend-otp-password/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                purpose: "registration"
            }),
        });

        if (!response.ok) {
            return { error: "Failed to resend OTP!" };
        }

        return { success: "OTP resent!" };
    } catch (error) {
        return { error: "Something went wrong!" };
    }
};

export const resetPassword = async (values: z.infer<typeof VerifySchema>) => {
    const validatedFields = VerifySchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" };
    }

    try {
        const response = await fetch(`${API_URL}resetpassword/`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: validatedFields.data.email,
                otp: validatedFields.data.otp,
            }),
        });
        if (!response.ok) {
            return { error: "Failed to Verify OTP!" };
        }

        const data = await response.json();
        return { success: "Verified!", data };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}

export const completeReset = async (values: z.infer<typeof ResetCompleteSchema>) => {

    const validatedFields = ResetCompleteSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid Fields!" }
    }

    try {
        const response = await fetch(`${API_URL}complete-reset/`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                reset_token: validatedFields.data.reset_token,
                password: validatedFields.data.password,
                password2: validatedFields.data.confirmPassword,
            })
        });
        if (!response.ok) {
            return { error: "Failed to Verify OTP!" };
        }
        return { success: "Verified!" };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}

export const googleRedirect = async () => {
    try {
        const response = await fetch(`${API_URL}auth/google/login/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            return { error: "Failed to Redirect!" };
        }

        const data = await response.json();
        const link = data.authorization_url;
        // window.open(link, "_blank");
        window.location.href = link;

        return { success: "Redirected!" };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}

export const googleCallback = async (code: string, state: string) => {
    try {
        const response = await fetch(`${API_URL}auth/google/callback/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                state
            })
        });
        if (!response.ok) {
            return { error: "Failed to Redirect!" };
        }

        const data = await response.json();
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const user = data.user;
        sessionStorage.setItem("access_token", accessToken);
        sessionStorage.setItem("refresh_token", refreshToken);
        sessionStorage.setItem("user", JSON.stringify(user));
        return { success: "Logged In!" };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}


export const githubRedirect = async () => {
    try {
        const response = await fetch(`${API_URL}auth/github/login/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            return { error: "Failed to Redirect!" };
        }

        const data = await response.json();
        const link = data.authorization_url;
        // window.open(link, "_blank");
        window.location.href = link;

        return { success: "Redirected!" };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}

export const githubCallback = async (code: string, state: string) => {
    try {
        const response = await fetch(`${API_URL}auth/github/callback/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            return { error: "Failed to Redirect!" };
        }

        const data = await response.json();
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const user = data.user;
        sessionStorage.setItem("access_token", accessToken);
        sessionStorage.setItem("refresh_token", refreshToken);
        sessionStorage.setItem("user", JSON.stringify(user));
        return { success: "Logged In!" };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}