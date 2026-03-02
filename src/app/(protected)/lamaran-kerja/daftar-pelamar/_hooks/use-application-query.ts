import { useQuery } from '@tanstack/react-query';
import { getJobApplications, getDetailJobApplication } from '@/api/dashboard/lamaran-kerja/daftar-pelamar';
import type { TFilterApplication } from '@/api/dashboard/lamaran-kerja/daftar-pelamar/type';

/**
 * Hook to fetch job applications with cursor-based pagination
 * @param params - Filter parameters including limit, cursor, status, job_title
 * @returns React Query result with job applications data
 */
export const useJobApplicationsQuery = (params: TFilterApplication = {}) => {
  return useQuery({
    queryKey: ['job-applications', params],
    queryFn: () => getJobApplications(params),
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Hook to fetch single job application detail
 * @param id - Application ID
 * @returns React Query result with application detail
 */
export const useJobApplicationDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['job-application', id],
    queryFn: () => getDetailJobApplication({ id }),
    enabled: !!id,
  });
};

// Legacy exports for backward compatibility
export const useApplications = useJobApplicationsQuery;
export const useApplicationDetail = useJobApplicationDetailQuery;
