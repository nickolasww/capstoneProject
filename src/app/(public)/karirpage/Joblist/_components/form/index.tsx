import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobApplicationSchema, type TJobApplicationFormData } from './schema';
import { useJobApplicationMutation } from '../../_hooks/use-job-application-mutation';
import { Spinner } from '@/app/loading';
import { getAccessToken } from '@/libs/localstorage';

interface JobApplicationFormProps {
  jobPositionId: string | number;
  onSubmitSuccess?: () => void;
  onAuthRequired?: () => void;
}

export const JobApplicationForm = ({
  jobPositionId,
  onSubmitSuccess,
  onAuthRequired,
}: JobApplicationFormProps) => {
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TJobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onBlur',
  });

  const { mutate, isPending } = useJobApplicationMutation({
    onSuccess: () => {
      reset();
      setSelectedFileName('');
      setSubmitError('');
      onSubmitSuccess?.();
    },
    onAuthRequired: () => {
      setSubmitError('');
      onAuthRequired?.();
    },
    onError: (error) => {
      setSubmitError(error.message || 'Terjadi kesalahan saat mengirim formulir');
    },
  });

  const onSubmit = (data: TJobApplicationFormData) => {
    // Check authentication before submitting
    const token = getAccessToken();
    if (!token) {
      onAuthRequired?.();
      return;
    }
    
    setSubmitError('');
    mutate({
      ...data,
      job_position_id: jobPositionId,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      // Set the file in the form state properly
      setValue('file', file, { shouldValidate: true });
    } else {
      setSelectedFileName('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-8 bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl"
    >
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Depan
        </label>
        <input
          {...register('first_name')}
          type="text"
          placeholder="Masukkan nama depan Anda"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Belakang
        </label>
        <input
          {...register('last_name')}
          type="text"
          placeholder="Masukkan nama belakang Anda"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
        />
        {errors.last_name && (
          <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alamat Email
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Telp
          </label>
          <input
            {...register('phone_number')}
            type="tel"
            placeholder="08xxxxxxxx"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400"
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alamat
        </label>
        <textarea
          {...register('address')}
          placeholder="Masukkan alamat lengkap Anda"
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 resize-none"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CV/Resume
        </label>
        <div className="relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className={`w-full px-4 py-3 rounded-lg border-2 border-dashed flex items-center justify-between bg-white transition-colors ${
            errors.file ? 'border-red-400 hover:border-red-500' : 'border-gray-300 hover:border-green-500'
          }`}>
            <span className={`${
              errors.file ? 'text-red-600' : 'text-gray-600'
            }`}>
              {selectedFileName || 'Pilih file PDF atau DOC/DOCX'}
            </span>
            <span className="text-gray-400 text-sm">Max 5MB</span>
          </div>
        </div>
        {errors.file && (
          <p className="text-red-500 text-sm mt-1">⚠️ {errors.file.message}</p>
        )}
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm font-medium">⚠️ {submitError}</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-12 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isPending ? (
            <>
              <Spinner size="small" color="#ffffff" />
              <span>Mengirim...</span>
            </>
          ) : (
            'Kirim'
          )}
        </button>
      </div>
    </form>
  );
};
