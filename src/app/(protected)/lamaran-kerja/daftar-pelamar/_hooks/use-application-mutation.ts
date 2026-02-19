import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createApplication, updateApplication, deleteApplication } from '@/api/lamaran-kerja/daftar-pelamar';
import type { TApplicationRequest } from '@/api/lamaran-kerja/daftar-pelamar/type';

export const useCreateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TApplicationRequest) => createApplication(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TApplicationRequest> }) =>
      updateApplication({id}, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteApplication({id}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};
