import {z} from "zod"


// This schema validates the user input for signing up
export const signupSchema = z.object({
    userName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type SignupData = z.infer<typeof signupSchema>;


// This schema validates the user input for logging in
export const loginSchema = z.object({
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Enter Valid Password"),
});

export type LoginData = z.infer<typeof loginSchema>;