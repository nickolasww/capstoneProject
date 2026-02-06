import { z } from 'zod';
import type { TApplicationStatus } from '@/api/lamaran-kerja/daftar-pelamar/type';

export type { TApplicationStatus };

export interface Application {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  position: string;
  apply_date: string;
  status: TApplicationStatus;
  interview_date?: string;
  interview_time?: string;
}

// Zod Schema
export const editProgressSchema = z.object({
  name: z.string(),
  position: z.string(),
  status: z.enum(['pendaftar', 'pembekasan', 'interview', 'diterima', 'ditolak']),
  interview_date: z.any().optional(),
  interview_time: z.any().optional(),
}).refine((data) => {
  // Jika status adalah interview, maka interview_date dan interview_time wajib diisi
  if (data.status === 'interview') {
    return data.interview_date && data.interview_time;
  }
  return true;
}, {
  message: 'Tanggal dan waktu interview wajib diisi untuk tahap interview',
  path: ['interview_date'],
});

export type EditProgressFormData = z.infer<typeof editProgressSchema>;
