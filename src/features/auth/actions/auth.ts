
import * as z from "zod";
import { RegisterSchema, LoginSchema, ResetSchema, VerifySchema, ResetCompleteSchema } from "@/features/auth/schemas";

const API_URL = process.env.NEXT_PUBLIC_API_URL1 || process.env.NEXT_PUBLIC_API_URL;

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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Invalid credentials!" };
            } catch {
                return { error: "Invalid credentials!" };
            }
        }

        const data = await response.json();
        return { success: "Login successful!", data };
    } catch (error) {
        return { error, message: "Something went wrong!" };
    }
};

export const refreshAuthToken = async (refreshToken: string) => {
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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Failed to refresh token" };
            } catch (error) {
                return { error, message: "Failed to refresh token" };
            }
        }

        const data = await response.json();

        const newRefreshToken = data.refresh || data.refresh_token;
        const newAccessToken = data.access || data.access_token;

        return { success: "Token refreshed", accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
        return { error, message: "Something went wrong during refresh" };
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
        const response = await fetch(`${API_URL}register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Registration failed!" };
            } catch {
                return { error: "Registration failed!" };
            }
        }

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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Failed to send reset email!" };
            } catch {
                return { error: "Failed to send reset email!" };
            }
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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Verification failed!" };
            } catch {
                return { error: "Verification failed!" };
            }
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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Failed to resend OTP!" };
            } catch {
                return { error: "Failed to resend OTP!" };
            }
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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Failed to Verify OTP!" };
            } catch {
                return { error: "Failed to Verify OTP!" };
            }
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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Failed to Verify OTP!" };
            } catch {
                return { error: "Failed to Verify OTP!" };
            }
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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Failed to Redirect!" };
            } catch {
                return { error: "Failed to Redirect!" };
            }
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
        return {
            success: "Logged In!",
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            user: data.user,
        };
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
            try {
                const errorData = await response.json();
                return { error: errorData.error || errorData.message || errorData.detail || "Failed to Redirect!" };
            } catch {
                return { error: "Failed to Redirect!" };
            }
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
        return {
            success: "Logged In!",
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            user: data.user,
        };
    }
    catch (error) {
        return { error: "Something went wrong!" };
    }
}