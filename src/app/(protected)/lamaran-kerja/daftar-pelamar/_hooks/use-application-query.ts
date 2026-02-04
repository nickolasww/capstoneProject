import { useQuery } from '@tanstack/react-query';
import { getApplications, getDetailApplication } from '@/api/lamaran-kerja/daftar-pelamar';
import type { TFilterApplication } from '@/api/lamaran-kerja/daftar-pelamar/type';

export const useApplications = (params: TFilterApplication = {}) => {
  return useQuery({
    queryKey: ['applications', params],
    queryFn: () => getApplications(params),
  });
};

export const useApplicationDetail = (id: string) => {
  return useQuery({
    queryKey: ['application', id],
    queryFn: () => getDetailApplication({ id }),
    enabled: !!id,
  });
};
