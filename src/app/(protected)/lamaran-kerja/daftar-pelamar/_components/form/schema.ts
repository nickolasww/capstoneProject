import { z } from 'zod';
import type { TApplicationStatus, TJobApplication } from '@/api/dashboard/lamaran-kerja/daftar-pelamar/type';

export type { TApplicationStatus };
export type Application = TJobApplication;

// Zod Schema for status update
export const editProgressSchema = z.object({
  email: z.string(),
  job_title: z.string(),
  status: z.enum(['submitted', 'short_listed', 'hired', 'rejected']),
  interview_date: z.any().optional(),
  interview_time: z.any().optional(),
}).refine((data) => {
  // If status is short_listed, interview_date and interview_time are required
  if (data.status === 'short_listed') {
    return data.interview_date && data.interview_time;
  }
  return true;
}, {
  message: 'Tanggal dan waktu interview wajib diisi untuk tahap interview',
  path: ['interview_date'],
});

export type EditProgressFormData = z.infer<typeof editProgressSchema>;
