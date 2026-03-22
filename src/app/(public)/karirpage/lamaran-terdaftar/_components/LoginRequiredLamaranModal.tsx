import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface LoginRequiredLamaranModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginRequiredLamaranModal = ({ isOpen, onClose }: LoginRequiredLamaranModalProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 animate-fadeIn relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Tutup modal"
        >
          <span className="text-2xl">×</span>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <ExclamationCircleOutlined className="text-yellow-500 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          List Lamaran Tidak Bisa Dilihat
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">
          List Lamaran yang kamu daftar tidak bisa dilihat jika belum login.<br />Anda harus login terlebih dahulu.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleLogin}
            className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
