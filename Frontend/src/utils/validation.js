import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  username: z
    .string()
    .min(3, "At least 3 characters")
    .regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers & underscore only"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    code: z
      .string()
      .min(1, "Enter the code from your email")
      .regex(/^\d{6}$/, "Code must be 6 digits"),
    newPassword: z.string().min(6, "At least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "At least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const projectSchema = z.object({
  name: z.string().trim().min(1, "Project name is required"),
  description: z.string().optional(),
});

export const taskSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().optional(),
  assignedTo: z.string().optional(),
  status: z.enum(["todo", "in_progress", "done"]).optional(),
});

export const memberSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  role: z.enum(["admin", "project_admin", "member"]),
});

export const noteSchema = z.object({
  content: z.string().trim().min(1, "Note content is required"),
});
