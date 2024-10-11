import { z } from 'zod';
const maxFileSize = 3 * 1024 * 1024; // 2MB in bytes
const validateImageSize = files => {
  return files.every(file => {
    if (file instanceof File) {
      return file.size <= maxFileSize;
    }
    return true; // If it's a string, we assume it's a URL and skip size validation
  });
};
export const EditCategorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  imageUrl: z
    .array(z.union([z.instanceof(File), z.string()]))
    .nonempty({ message: 'Image is required.' })
    .refine(validateImageSize, {
      message: 'Each image must be less than 3MB.',
    }),
});
