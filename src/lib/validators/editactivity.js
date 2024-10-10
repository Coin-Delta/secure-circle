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

export const EditAffairSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  editorValue: z
    .string()
    .min(1, 'Context is required')
    .refine(value => value.replace(/<[^>]*>/g, '').trim().length > 0, {
      message: 'Details is required',
    }),
  images: z
    .array(z.union([z.instanceof(File), z.string()]))
    .nonempty({ message: 'Image is required' })
    .refine(validateImageSize, {
      message: 'Each image must be less than 3MB.',
    }),
});
export const EditJobsSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  company: z.string().min(1, { message: 'Company is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  minSalary: z.string().min(1, { message: 'Min Salary is required.' }),
  maxSalary: z.string().min(1, { message: 'Max Salary is required.' }),
  vacancy: z.string().min(1, { message: 'Vacancy is required.' }),
  imageUrl: z
    .array(z.union([z.instanceof(File), z.string()]))
    .nonempty({ message: 'Image is required' })
    .refine(validateImageSize, {
      message: 'Each image must be less than 3MB.',
    }),
  lastAppliedDate: z
    .string()
    .min(1, { message: 'Last applied date is required.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format YYYY-MM-DD'), // Example date validation
  applyForJob: z.object({
    moreInfo: z
      .string()
      .min(1, 'More information is required')
      .refine(value => value.replace(/<[^>]*>/g, '').trim().length > 0, {
        message: 'More information cannot be empty',
      }),
    link: z
      .string()
      .url({ message: 'Must be a valid URL.' })
      .min(1, { message: 'Apply for job link is required.' }),
  }),
  downloadAdmitCard: z.object({
    moreInfo: z
      .string()
      .min(1, 'More information is required')
      .refine(value => value.replace(/<[^>]*>/g, '').trim().length > 0, {
        message: 'More information cannot be empty',
      }),
    link: z
      .string()
      .url({ message: 'Must be a valid URL.' })
      .min(1, { message: 'Download admit card link is required.' }),
  }),
});
