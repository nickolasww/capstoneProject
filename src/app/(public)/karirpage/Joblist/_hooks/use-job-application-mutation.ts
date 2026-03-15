import { useMutation } from '@/app/_hooks/request/use-mutation';
import { submitJobApplication } from '@/api/karir';
import type { TJobApplicationFormData } from '../_components/form/schema';
import { getAccessToken } from '@/libs/localstorage';

interface SubmitJobApplicationData extends TJobApplicationFormData {
  job_position_id: string | number;
}

interface UseJobApplicationMutationProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onAuthRequired?: () => void;
}

export const useJobApplicationMutation = ({
  onSuccess,
  onError,
  onAuthRequired,
}: UseJobApplicationMutationProps) => {
  return useMutation({
    mutationFn: async (data: SubmitJobApplicationData) => {
      // Check if user is authenticated
      const token = getAccessToken();
      if (!token) {
        const error = new Error('User is not authenticated');
        (error as any).isAuthError = true;
        throw error;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('job_id', data.job_position_id.toString());
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('phone_number', data.phone_number);
      formData.append('address', data.address);
      formData.append('file', data.file);

      // Debug: Log FormData being sent
      console.log('[Job Application] Submitting with:');
      console.log('  job_id:', data.job_position_id);
      console.log('  first_name:', data.first_name);
      console.log('  last_name:', data.last_name);
      console.log('  email:', data.email);
      console.log('  phone_number:', data.phone_number);
      console.log('  address:', data.address);
      console.log('  file:', data.file.name);

      // Submit with authorization header (handled in submitJobApplication)
      return submitJobApplication(formData);
    },
    onSuccess: (data) => {
      console.log('Job application submitted successfully:', data);
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error('Failed to submit job application:', error);
      
      // Check if it's an authentication error
      const isAuthError = 
        error?.isAuthError || 
        error?.response?.status === 401 ||
        error?.message === 'User is not authenticated';
      
      if (isAuthError && onAuthRequired) {
        onAuthRequired();
      } else {
        onError?.(error as unknown as Error);
      }
    },
  });
};
