"use server";

import * as z from "zod";
import { RegisterSchema, LoginSchema, ResetSchema } from "@/schemas";
import { AuthError } from "next-auth";

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
        const response = await fetch(`${API_URL}resend-otp-registration/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            return { error: "Failed to resend OTP!" };
        }

        return { success: "OTP resent!" };
    } catch (error) {
        return { error: "Something went wrong!" };
    }
};
