import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email(),
  password: z.string().min(6),
});
export const registerSchemaAdmin = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string()
});
