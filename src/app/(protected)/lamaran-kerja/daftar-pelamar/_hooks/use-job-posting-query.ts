import { useQuery } from '@tanstack/react-query';
import { getJobPostings, getDetailJobPosting } from '@/api/lamaran-kerja/daftar-pelamar';
import type { TFilterJobPosting } from '@/api/lamaran-kerja/daftar-pelamar/type';

export const useJobPostings = (params: TFilterJobPosting = {}) => {
  return useQuery({
    queryKey: ['jobPostings', params],
    queryFn: () => getJobPostings(params),
  });
};

export const useJobPostingDetail = (id: string) => {
  return useQuery({
    queryKey: ['jobPosting', id],
    queryFn: () => getDetailJobPosting({ id }),
    enabled: !!id,
  });
};
