import * as z from "zod";

// Profile Photo Validation Schema
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export const ProfilePhotoSchema = z.object({
  image: z
    .instanceof(File, { message: "Please select a valid profile photo" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Image must be less than 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please select a valid image type (JPEG, PNG, GIF, WEBP, SVG)",
    })
    .optional(),
});

// Profile Name Validation Schema
export const ProfileNameSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

// Role Selection Validation Schema
const VALID_ROLES = [
  "Project Manager",
  "O/A Tester",
  "Senior Manager",
  "Operations",
  "Developer",
  "UI/UX Designer",
  "Product Designer",
  "Other",
] as const;

export const RoleSelectionSchema = z.object({
  role: z
    .enum(VALID_ROLES, { message: "Please select a valid role" })
    .optional(),
});

// Validation Schema for Work Preferences
const VALID_WORK_PREFERENCE = [
  "Plan and manage sprints",
  "Team Collaborate",
  "Track tasks and issues",
  "Reports and insights",
  "Bug tracking",
  "Roadmap planning",
] as const;

export const WorkPreferenceSchema = z.object({
  workPreference: z
    .enum(VALID_WORK_PREFERENCE, {
      message: "Please select a valid work preference",
    })
    .optional(),
});

// Combined Validation Schema for the entire profile setup
export const FullProfileSchema = z.object({
  ...ProfilePhotoSchema.shape,
  ...ProfileNameSchema.shape,
  ...RoleSelectionSchema.shape,
  ...WorkPreferenceSchema.shape,
});

//Project Workspace Validation Schema

export const WorkspaceDetailSchema = z.object({
  workspace_name: z
    .string()
    .min(3, { message: "Workspace name must be at least 3 characters" })
    .max(50, { message: "Workspace name must be less than 50 characters" })
    .trim()
    .regex(/^[A-Za-z0-9\s._-]+$/, {
    message: "Workspace name cannot contain emoji or special characters",
  }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(200, { message: "Description must be less than 200 characters" })
    .trim(),
   
  workspace_code: z
    .string()
    .length(8, { message: "Code must be exactly 8 characters" })
    .regex(/^(?=(?:.*[A-Z]){2})(?=(?:.*[a-z]){2})(?=(?:.*\d){4})/, {
      message: "Code must have 2 uppercase, 2 lowercase, and 4 numbers",
    }),
});

export const InviteMembersSchema = z.object({
  emails: z
    .array(z.string().email("Invalid email address"))
    .max(10, "You can invite up to 10 members at a time")
    .refine(
      (emails) => new Set(emails).size === emails.length,
      "Duplicate emails are not allowed",
    )
    .optional()
    .default([]),
});

export type ProfilePhotoInput = z.infer<typeof ProfilePhotoSchema>;
export type ProfileNameInput = z.infer<typeof ProfileNameSchema>;
export type RoleSelectionInput = z.infer<typeof RoleSelectionSchema>;
export type WorkPreferenceInput = z.infer<typeof WorkPreferenceSchema>;
export type FullProfileInput = z.infer<typeof FullProfileSchema>;
export type WorkspaceDetailInput = z.infer<typeof WorkspaceDetailSchema>;
export type InviteMembersInput = z.infer<typeof InviteMembersSchema>;
