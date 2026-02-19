import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // Middleware cannot access localStorage.
    // Auth protection is handled client-side via Redux/localStorage.
    // This middleware only handles basic route-level redirects if needed.
    return NextResponse.next();
}

export const config = {
    matcher: ["/reset-password", "/verify-email", "/verify-otp", "/login", "/sign-up", "/forgot-password"],
};