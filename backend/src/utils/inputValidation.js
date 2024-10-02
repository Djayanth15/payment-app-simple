import { z } from "zod";

const userSchema = z.object({
  email: z.string().trim().email({ message: "Invalid Email address" }),
  password: z
    .string()
    .trim()
    .min(5, { message: "Must be 5 or more characters long" }),
  firstName: z
    .string()
    .trim()
    .min(1)
    .max(20, { message: "Must be 20 or less characters long" }),
  lastName: z
    .string()
    .trim()
    .min(1)
    .max(20, { message: "Must be 20 or less characters long" }),
});

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid Email address" }),
  password: z
    .string()
    .trim()
    .min(5, { message: "Password must be 5 or more characters long" }),
});

const updateUserSchema = userSchema.partial().omit({ email: true });

const transferSchema = z.object({
  to: z.string({ message: "Invalid receiver userId" }),
  amount: z.number().min(0, { message: "Min transfer more than 0" }),
});

export { userSchema, loginSchema, updateUserSchema, transferSchema };
