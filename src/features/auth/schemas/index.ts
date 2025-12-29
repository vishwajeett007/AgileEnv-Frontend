import * as z from "zod";

const noEmojiRegex = /^(?:(?!\p{Extended_Pictographic}).)*$/u;
const emojiError = "Emojis are not allowed";

export const LoginSchema = z.object({
    email: z.string().trim().min(1, {
        message: "Username or Email is required",
    }).max(40, {
        message: "Name too long (max 40)",
    }).regex(/^[a-zA-Z0-9_@.]+$/, {
        message: "Username can only contain letters, numbers and underscores",
    }).regex(/^[^0-9]/, {
        message: "Username cannot start with a number",
    }),
    password: z.string().trim().min(1, {
        message: "Password is required",
    }).regex(noEmojiRegex, emojiError),
    rememberMe: z.boolean().optional(),
});

export const RegisterSchema = z.object({
    email: z.string().trim().email({
        message: "Email is required",
    }).regex(noEmojiRegex, emojiError),
    password: z.string().trim().min(6, {
        message: "Minimum 6 characters required",
    }).regex(new RegExp(".*[A-Z].*"), "One uppercase character")
        .regex(new RegExp(".*[0-9].*"), "One number")
        .regex(new RegExp(".*[^a-zA-Z0-9].*"), "One special character")
        .regex(noEmojiRegex, emojiError),
    confirmPassword: z.string().trim().min(1, "Password confirmation is required"),
    username: z.string().trim().min(1, {
        message: "Name is required",
    }).max(40, {
        message: "Name too long (max 40)",
    }).regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers and underscores",
    }).regex(/^[^0-9]/, {
        message: "Username cannot start with a number",
    }).regex(noEmojiRegex, emojiError),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const ResetSchema = z.object({
    email: z.string().trim().email({
        message: "Email is required",
    }),
});

export const VerifySchema = z.object({
    email: z.string().trim().email({
        message: "Email is required",
    }),
    otp: z.string().trim().min(6, {
        message: "Minimum 6 characters required",
    })
})

export const ResetCompleteSchema = z.object({
    reset_token: z.string().trim().min(1, {
        message: "Reset token is required",
    }),
    password: z.string().trim().min(8, {
        message: "Minimum 8 characters required",
    }).regex(new RegExp(".*[A-Z].*"), "One uppercase character")
        .regex(new RegExp(".*[0-9].*"), "One number")
        .regex(new RegExp(".*[^a-zA-Z0-9].*"), "One special character"),
    confirmPassword: z.string().trim().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})