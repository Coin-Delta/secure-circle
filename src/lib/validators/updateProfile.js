import { z } from 'zod';

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, { message: 'Title is required.' }),
  lastName: z.string().min(1, { message: 'Title is required.' }),
  businessName: z.string().min(1, { message: 'Title is required.' }),
  walletAddress: z.string().optional(),
  files: z
    .object({
      identification: z
        .union([
          z.string(), // Accepts a string
          z.instanceof(File).optional(), // Accepts an object, can be empty
        ])
        .optional(),
      businessLicense: z
        .union([
          z.string(), // Accepts a string
          z.instanceof(File).optional(), // Accepts an object, can be empty
        ])
        .optional(),
    })
    .optional(), // Expect an array of File instances or strings
});
