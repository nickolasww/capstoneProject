import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, Input } from 'antd';
const { TextArea } = Input;
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobApplicationSchema, type TJobApplicationFormData } from './schema';
import { useJobApplicationMutation } from '../../_hooks/use-job-application-mutation';
import { Spinner } from '@/app/loading';
import { getAccessToken } from '@/libs/localstorage';
import { Controller } from 'react-hook-form';

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
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');
  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<TJobApplicationFormData>({
    resolver: zodResolver(jobApplicationSchema),
    mode: 'onBlur',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      file: undefined as unknown as File, // file memang harus File, biarkan undefined
    },
  });

  const { mutate, isPending } = useJobApplicationMutation({
    onSuccess: () => {
      reset();
      setSelectedFileName('');
      setSubmitError('');
      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        navigate('/karirpage/lamaran-terdaftar');
      }
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-[#f2f8ee] rounded-xl shadow-md border border-gray-300 w-full mx-auto max-w-full xl:max-w-400"
      style={{ minWidth: 0 }}
    >
      {/* Grid for 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Nama Depan</label>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Masukkan nama depan Anda"
                autoSize={{ minRows: 1, maxRows: 2 }}
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm"
              />
            )}
          />
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
          )}
          
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Nama Belakang</label>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="Masukkan nama belakang Anda"
                autoSize={{ minRows: 1, maxRows: 2 }}
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm"
              />
            )}
          />
          {errors.last_name && (
            <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Alamat Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="email@example.com"
                autoSize={{ minRows: 1, maxRows: 2 }}
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* Phone Number */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Nomor Telp</label>
          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                placeholder="08xxxxxxxx"
                autoSize={{ minRows: 1, maxRows: 2 }}
                className="w-full rounded-md border  border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm"
              />
            )}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">Alamat</label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
        <TextArea
          {...field}
          placeholder="Masukkan alamat lengkap Anda"
          autoSize={{ minRows: 4, maxRows: 6 }}
          className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 placeholder-gray-400 resize-none shadow-sm"
        />
        )}
        />
        {errors.address && (
          <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* File Upload - CV/Resume with Ant Design Dragger */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-1">CV/Resume</label>
        <Upload.Dragger
          name="file"
          multiple={false}
          accept=".pdf"
          beforeUpload={file => {
            setValue('file', file, { shouldValidate: true });
            setSelectedFileName(file.name);
            return false; // Prevent auto upload
          }}
          showUploadList={false}
        >
          <div className="flex flex-col items-center justify-center min-h-55">
            <p className="ant-upload-drag-icon text-4xl text-green-400"><InboxOutlined /></p>
            <p className="ant-upload-text text-base">Klik atau drag file ke area ini untuk upload</p>
            <p className="ant-upload-hint text-xs text-gray-400">Hanya PDF. Max 5MB</p>
            <span className="block mt-2 text-sm text-gray-600">{selectedFileName || ''}</span>
          </div>
        </Upload.Dragger>
        {errors.file && (
          <p className="text-red-500 text-xs mt-1">⚠️ {errors.file.message}</p>
        )}
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-red-700 text-xs font-medium">⚠️ {submitError}</p>
        </div>
      )}

      {/* Submit Button Centered */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="px-10 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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
