import type { TApplicationStatus } from '@/api/lamaran-kerja/daftar-pelamar/type';

export const APPLICATION_STATUS_LABELS: Record<TApplicationStatus, string> = {
  pendaftar: 'Semua Pendaftar',
  pembekasan: 'Tahap Pembekasan',
  interview: 'Tahap Interview',
  diterima: 'Diterima',
  ditolak: 'Ditolak',
};

export const APPLICATION_STATUS_COLORS: Record<TApplicationStatus, string> = {
  pendaftar: 'bg-blue-100 text-blue-700',
  pembekasan: 'bg-yellow-100 text-yellow-700',
  interview: 'bg-purple-100 text-purple-700',
  diterima: 'bg-green-100 text-green-700',
  ditolak: 'bg-red-100 text-red-700',
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
