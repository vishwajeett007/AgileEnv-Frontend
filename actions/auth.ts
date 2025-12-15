"use server";

import * as z from "zod";
import { RegisterSchema, LoginSchema, ResetSchema, VerifySchema, ResetCompleteSchema } from "@/schemas";
import { cookies } from "next/headers";

const setAuthCookie = async (name: string, value: string, remember: boolean, maxAgeSeconds: number = 24 * 60 * 60) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: remember ? maxAgeSeconds : undefined,
    });
};

export const removeAuthCookie = async (name: string, name1: string, name2: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
    cookieStore.delete(name1);
    cookieStore.delete(name2);
}
// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL1;

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, rememberMe } = validatedFields.data;

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
        const remember = !!rememberMe;
        const cookieStore = await cookies();
        cookieStore.delete("otpAllowed")
        cookieStore.delete("otpAllowedForget")

        await setAuthCookie("access_token", data.access_token, remember, 60 * 60 * 24);
        await setAuthCookie("refresh_token", data.refresh_token, remember, 60 * 60 * 24 * 7);
        await setAuthCookie("user", JSON.stringify(data.user), remember, 60 * 60 * 24 * 7);

        return { success: "Login successful!", data };
    } catch (error) {
        return { error: "Something went wrong!" };
    }
};

export const refreshAuthToken = async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    const accessToken = cookieStore.get("access_token")?.value;

    if (!refreshToken) {
        return { error: "No refresh token found" };
    }

    try {
        const response = await fetch(`${API_URL}refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!response.ok) {
            return { error: "Failed to refresh token" };
        }

        const data = await response.json();

        const newRefreshToken = data.refresh || data.refresh_token;
        const newAccessToken = data.access || data.access_token;
        await setAuthCookie("refresh_token", newRefreshToken, true, 60 * 60 * 24 * 7);
        await setAuthCookie("access_token", newAccessToken, true, 60 * 60 * 24);

        return { success: "Token refreshed", accessToken: newAccessToken };
    } catch (error) {
        return { error: "Something went wrong during refresh" };
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

        const cookieStore = await cookies();
        cookieStore.set("otpAllowed", "true", { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 5 });

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

        const cookieStore = await cookies();
        cookieStore.set("otpAllowedForget", "true", { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 5 });
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
        const response = await fetch(`${API_URL}resend-otp/`, {
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
        const response = await fetch(`${API_URL}verify-reset-otp/`, {

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
        const response = await fetch(`${API_URL}auth/google/login/?platform=web`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            return { error: "Failed to Redirect!" };
        }

        const data = await response.json();
        const link = data.authorization_url;
        return { success: "Redirected!", link };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}

export const googleCallback = async (code: string, state: string) => {
    try {
        const response = await fetch(`${API_URL}auth/google/callback/?platform=web`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: code,
                state: state
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Backend API Error (${response.status}): ${errorText}`);
            return { error: `Backend Error ${response.status}: ${errorText || "Unknown error"}` };
        }

        const data = await response.json();
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const user = data.user;
        await setAuthCookie("access_token", accessToken, true, 60 * 60 * 24);
        await setAuthCookie("refresh_token", refreshToken, true, 60 * 60 * 24 * 7);
        await setAuthCookie("user", JSON.stringify(user), true, 60 * 60 * 24 * 7);

        return { success: "Logged In!", accessToken, refreshToken, user };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}


export const githubRedirect = async () => {
    try {
        const response = await fetch(`${API_URL}auth/github/login/?platform=web`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            return { error: "Failed to Redirect!" };
        }

        const data = await response.json();
        const link = data.authorization_url;
        return { success: "Redirected!", link };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}

export const githubCallback = async (code: string, state: string) => {
    try {
        const response = await fetch(`${API_URL}auth/github/callback/?platform=web`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: code,
                state: state
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Backend API Error (${response.status}): ${errorText}`);
            return { error: `Backend Error ${response.status}: ${errorText || "Unknown error"}` };
        }

        const data = await response.json();
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const user = data.user;
        await setAuthCookie("access_token", accessToken, true, 60 * 60 * 24);
        await setAuthCookie("refresh_token", refreshToken, true, 60 * 60 * 24 * 7);
        await setAuthCookie("user", JSON.stringify(user), true, 60 * 60 * 24 * 7);

        return { success: "Logged In!", accessToken, refreshToken, user };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}