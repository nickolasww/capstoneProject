import type { TApplicationStatus } from '@/api/dashboard/lamaran-kerja/daftar-pelamar/type';

export const APPLICATION_STATUS_LABELS: Record<TApplicationStatus, string> = {
  submitted: 'Semua Pendaftar',
  short_listed: 'Tahap Interview',
  hired: 'Diterima',
  rejected: 'Ditolak',
};

export const APPLICATION_STATUS_COLORS: Record<TApplicationStatus, string> = {
  submitted: 'bg-blue-100 text-blue-700',
  short_listed: 'bg-yellow-100 text-yellow-700',
  hired: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatSalary = (salary: string): string => {
  return salary.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
