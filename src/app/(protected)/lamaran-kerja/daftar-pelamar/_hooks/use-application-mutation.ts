import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateJobApplication } from '@/api/dashboard/lamaran-kerja/daftar-pelamar';
import type { TApplicationRequest } from '@/api/dashboard/lamaran-kerja/daftar-pelamar/type';

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TApplicationRequest> }) =>
      updateJobApplication({ id }, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-applications'] });
    },
  });
};

