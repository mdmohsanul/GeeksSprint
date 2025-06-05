import {z} from "zod"


// This schema validates the user input for signing up
export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email").trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["manager", "engineer"], {
      errorMap: () => ({ message: "Role is required" }),
    }),
    skills: z.array(z.string()).optional(),
    seniority: z.enum(["junior", "mid", "senior"], {
      errorMap: () => ({ message: "Seniority is required" }),
    }),
    maxCapacity: z.coerce.number().min(50, "Capacity must be at least 50"),
    department: z.string().min(1, "Department is required"),
  })
  .refine(
    (data) =>
      data?.role !== "engineer" || (data.skills && data.skills.length > 0),
    {
      message: "Skills are required for engineers",
      path: ["skills"],
    }
  );

export type SignupData = z.infer<typeof signupSchema>;

// This schema validates the user input for logging in
export const loginSchema = z.object({
  email: z.string().email("Invalid email").trim(),
  password: z.string().min(6, "Enter Valid Password"),
});

export type LoginData = z.infer<typeof loginSchema>;

// This schema validates the create assignmnet form input

export const assignmentSchema = z.object({
  engineerId: z.string().min(1, "Engineer is required"),
  projectId: z.string().min(1, "Project is required"),
  role: z.string().min(1, "Role is required"),
  allocationPercentage: z
    .number({ invalid_type_error: "Allocation must be a number" })
    .min(1)
    .max(100),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type AssignmentFormData = z.infer<typeof assignmentSchema>;

// Project form validation schema
export const projectSchema = z.object({
  name: z.string().min(3, "Project name is required"),
  description: z.string().min(10, "Description is required"),
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  requiredSkills: z.string().nonempty("Enter at least one skill"), // comma separated
  teamSize: z.number().min(1, "Team size must be at least 1"),
  status: z.enum(["active", "completed", "planning"]),
  managerId: z.string().optional(), // manager ID will be set from the auth store
});

export type ProjectFormData = z.infer<typeof projectSchema>;
