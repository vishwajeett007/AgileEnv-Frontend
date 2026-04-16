import * as z from "zod";

// Validation Schema for issue edits

export const IssueSchema = z.object({
    title: z
    .string()
    .min(3 , { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" })
    .trim()
    .regex(/^[A-Za-z0-9\s._-]+$/, {
      message: "Title cannot contain emoji or special characters",
    }),

    priority: z.enum(["low", "medium", "high"]),

    label: z.string().max(20, { message: "Label must be less than 20 characters" }).min(2, { message: "Label must be at least 2 characters" }).trim(),

    // assignees: z.array(
    //     z.object({
    //         id: z.string().uuid(),
    //         name: z.string().min(3).max(100).trim(),
    //     })
    // ).default([])

})
