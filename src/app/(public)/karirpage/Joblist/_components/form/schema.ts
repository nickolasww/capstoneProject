import { z } from 'zod';

export const jobApplicationSchema = z.object({
  first_name: z
    .string()
    .min(2, 'Nama depan minimal 2 karakter')
    .max(100, 'Nama depan maksimal 100 karakter'),
  last_name: z
    .string()
    .min(5, 'Nama belakang minimal 5 karakter')
    .max(100, 'Nama belakang maksimal 100 karakter'),
  email: z
    .string()
    .min(1, 'Email tidak boleh kosong')
    .refine((val) => z.email().safeParse(val).success, {
    error: "Format email tidak valid",
  }),
  phone_number: z
    .string()
    .min(1, 'Nomor telepon tidak boleh kosong')
    .regex(/^(\+62|0)[0-9]{9,12}$/, 'Format nomor telepon tidak valid')
    .refine(
      (phone) => phone.length === 15,
      'Nomor telepon harus 15 karakter'
    ),
  address: z
    .string()
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
      (file) => file.size <= 5 * 1024 * 1024,
      'Ukuran file tidak boleh lebih dari 5MB'
    )
    .refine(
      (file) => {
        const validMimeTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-word',
          'application/x-msword',
        ];
        const validExtensions = ['.pdf', '.doc', '.docx'];
        const fileName = file.name.toLowerCase();
        
        // Check by MIME type
        if (validMimeTypes.includes(file.type)) {
          return true;
        }
        
        // Fallback: check by file extension
        return validExtensions.some((ext) => fileName.endsWith(ext));
      },
      'Format file harus PDF atau DOC/DOCX'
    ),
});

export type TJobApplicationFormData = z.infer<typeof jobApplicationSchema>;
