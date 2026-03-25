import { useState } from 'react';
import { JobApplicationForm } from './form';
import { LoginRequiredModal } from './LoginRequiredModal';

interface JobApplicationModalProps {
  jobPositionId: string | number;
  jobTitle?: string;
  onSubmitSuccess?: () => void;
}

export const JobApplicationModal = ({
  jobPositionId,
  jobTitle = 'pekerjaan',
  onSubmitSuccess,
}: JobApplicationModalProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  

  return (
    <>
      <JobApplicationForm
        jobPositionId={jobPositionId}
        onSubmitSuccess={onSubmitSuccess}
        onAuthRequired={() => setShowLoginModal(true)}
      />
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        jobTitle={jobTitle}
      />
    </>
  );
};
