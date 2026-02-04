import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJobPosting, updateJobPosting, deleteJobPosting } from '@/api/lamaran-kerja/daftar-pelamar';
import type { TJobPostingRequest } from '@/api/lamaran-kerja/daftar-pelamar/type';

export const useCreateJobPosting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TJobPostingRequest) => createJobPosting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobPostings'] });
    },
  });
};

export const useUpdateJobPosting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TJobPostingRequest> }) =>
      updateJobPosting(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobPostings'] });
    },
  });
};

export const useDeleteJobPosting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobPosting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobPostings'] });
    },
  });
};
