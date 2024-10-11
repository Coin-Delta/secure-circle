import { z } from 'zod';
export const passwordSchema = z
  .string()
  .min(1, { message: 'Password is required.' })
  .min(8, { message: 'Password must be at least 8 characters.' })
  .max(32, { message: 'Password must be less than 32 characters.' })
  .regex(/\d/, { message: 'Password must contain at least one number' })
  .regex(/[@$!%*#?&]/, {
    message: 'Password must contain at least one special character',
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  });
export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First Name is required.' }),
    lastName: z.string().min(1, { message: 'Last Name is required.' }),
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Email must be a valid email.' }),
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: 'Confirm Password is required.',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Email must be a valid email.' }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export const verfiyEmailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Email must be a valid email.' }),
});

export const setPasswordSchema = z
  .object({
    email: z.string().email({ message: 'Email must be a valid email.' }),
    otp: z
      .string()
      .min(1, { message: 'One-time password is required.' })
      .min(6, {
        message: 'Your one-time password must be 6 characters only.',
      })
      .max(6, {
        message: 'Your one-time password must be 6 characters only.',
      })
      .regex(/^\d+$/, { message: 'Your one-time password must be numeric.' }),
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: 'Confirm Password is required.',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const VerifyOtpSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});
