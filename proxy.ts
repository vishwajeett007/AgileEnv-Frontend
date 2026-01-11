import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const deleteAloowed = () => {
        request.cookies.delete("otpAllowed");
        request.cookies.delete("otpAllowedForget");
    }

    const isLoggedIn = request.cookies.get("access_token")?.value;
    if (pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    const token = request.cookies.get("reset_token")?.value;
    if (pathname.startsWith("/reset-password")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    const verifyToken = request.cookies.get("otpAllowed")?.value;
    if (pathname.startsWith("/verify-email")) {
        if (!verifyToken) {
            return NextResponse.redirect(new URL("/sign-up", request.url));
        }
    }

    const verifyOtp = request.cookies.get("otpAllowedForget")?.value;
    if (pathname.startsWith("/verify-otp")) {
        if (!verifyOtp) {
            return NextResponse.redirect(new URL("/forgot-password", request.url));
        }
    }

    if (!(pathname === "/verify-otp")) {
        deleteAloowed();
    }
    if (!(pathname === "/verify-email")) {
        deleteAloowed();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/reset-password", "/verify-email", "/verify-otp", "/login", "/sign-up", "/forgot-password"],
};