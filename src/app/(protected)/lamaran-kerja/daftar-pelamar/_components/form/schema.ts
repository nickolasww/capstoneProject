import { z } from 'zod';

export type TabType = 'pendaftar' | 'pembekasan' | 'interview' | 'diterima' | 'ditolak';

export interface Application {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  position: string;
  applyDate: string;
  status: TabType;
  interviewDate?: string;
  interviewTime?: string;
}

// Zod Schema
export const editProgressSchema = z.object({
  name: z.string(),
  position: z.string(),
  status: z.enum(['pendaftar', 'pembekasan', 'interview', 'diterima', 'ditolak']),
  interviewDate: z.any().optional(),
  interviewTime: z.any().optional(),
}).refine((data) => {
  // Jika status adalah interview, maka interviewDate dan interviewTime wajib diisi
  if (data.status === 'interview') {
    return data.interviewDate && data.interviewTime;
  }
  return true;
}, {
  message: 'Tanggal dan waktu interview wajib diisi untuk tahap interview',
  path: ['interviewDate'],
});

export type EditProgressFormData = z.infer<typeof editProgressSchema>;
