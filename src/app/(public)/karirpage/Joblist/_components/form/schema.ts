import { z } from 'zod';

export const jobApplicationSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(5, 'Nama depan minimal 5 karakter')
    .max(100, 'Nama depan maksimal 100 karakter'),
  last_name: z
    .string()
    .trim()
    .min(5, 'Nama belakang minimal 5 karakter')
    .max(100, 'Nama belakang maksimal 100 karakter'),
  email: z
    .string()
    .trim()
    .min(1, 'Email tidak boleh kosong')
    .refine((val) => z.email().safeParse(val).success, {
    error: "Format email tidak valid",
  }),
  phone_number: z
    .string()
    .trim()
    .min(1, 'Nomor telepon tidak boleh kosong')
    .regex(/^(\+62|0)[0-9]{9,12}$/, 'Format nomor telepon tidak valid')
    .refine(
      (phone) => phone.length === 12,
      'Nomor telepon harus 12 karakter'
    ),
  address: z
    .string()
    .trim()
    .min(1, 'Alamat tidak boleh kosong')
    .min(5, 'Alamat minimal 5 karakter')
    .max(500, 'Alamat maksimal 500 karakter'),
  file: z
    .instanceof(File, { message: 'File harus dipilih' })
    .refine(
      (file) => file.size > 0,
      'File tidak boleh kosong'
    )
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      'Ukuran file tidak boleh lebih dari 2MB'
    )
    .refine(
      (file) => {
        const fileName = file.name.toLowerCase();
        const isPdfMime = file.type === "application/pdf";
        const isPdfExtension = fileName.endsWith(".pdf");
        return isPdfMime || isPdfExtension;
      },
      "File harus berformat PDF"
    ),
});

export type TJobApplicationFormData = z.infer<typeof jobApplicationSchema>;
