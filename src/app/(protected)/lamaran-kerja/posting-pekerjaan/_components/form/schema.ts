import { z } from "zod";
import dayjs, { type Dayjs } from "dayjs";

export const JobPostingFormSchema = z.object({
  title: z
    .string({ message: "Judul posisi wajib diisi" })
    .min(3, "Judul harus minimal 3 karakter")
    .max(200, "Judul maksimal 200 karakter"),

  slug: z
    .string({ message: "Slug wajib diisi" })
    .min(3, "Slug harus minimal 3 karakter")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug hanya boleh huruf kecil, angka, dan tanda hubung",
    ),

  department: z
    .string({ message: "Departemen wajib diisi" })
    .min(2, "Departemen harus minimal 2 karakter")
    .max(100, "Departemen maksimal 100 karakter"),

  location: z
    .string({ message: "Lokasi wajib diisi" })
    .min(2, "Lokasi harus minimal 2 karakter")
    .max(200, "Lokasi maksimal 200 karakter"),

  employment_type: z.enum(
    ["full_time", "part_time", "contract", "internship"],
    {
      message: "Tipe pekerjaan wajib dipilih",
    },
  ),

  salary: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .min(5, "Gaji harus minimal 5 karakter")
      .max(100, "Gaji maksimal 100 karakter")
      .optional(),
  ),

  requirements: z
    .string({ message: "Requirements wajib diisi" })
    .min(10, "Requirements harus minimal 10 karakter")
    .max(5000, "Requirements maksimal 5000 karakter"),

  responsibilities: z
    .string({ message: "Responsibilities wajib diisi" })
    .min(10, "Responsibilities harus minimal 10 karakter")
    .max(5000, "Responsibilities maksimal 5000 karakter"),

  closed_at: z
    .custom<Dayjs | string>((val) => {
      // Validasi bahwa nilai tidak kosong
      if (!val) return false;

      // Terima dayjs object atau string
      if (dayjs.isDayjs(val)) return true;
      if (typeof val === "string" && val.length > 0) return true;

      return false;
    }, "Tanggal penutupan wajib diisi")
    .refine((val) => {
      // Konversi ke Date untuk validasi
      let date: Date;

      if (dayjs.isDayjs(val)) {
        date = val.toDate();
      } else if (typeof val === "string") {
        date = new Date(val);
      } else {
        return false;
      }

      // Validasi tanggal harus di masa depan
      return date > new Date();
    }, "Tanggal penutupan harus di masa depan"),

  is_active: z.boolean({ message: "Status aktif wajib dipilih" }),
});

export type TJobPostingFormData = z.infer<typeof JobPostingFormSchema>;
