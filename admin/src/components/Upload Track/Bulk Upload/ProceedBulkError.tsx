import React from 'react';
import Modal from 'react-modal';
import Warning from '../../../assets/images/warning.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Track } from '../../../declaration';
// import { useUpload } from '../../../../Context/UploadContext';

interface BulkUploadResultProps {
  fileName: string;
  fileSize: string;
  totalTracks: number;
  failedUploads: number;
  successfulUploads: number;
  
  errors: {bulkError_id: string;
    duplicates: Track[];
    duplicateTrackByAnother: Track[];
    invalidSpotifyLink: Track[];
  };
}

interface ProceedBulkErrorProps {
  isOpen: boolean;
  onClose: () => void;
  errorCount?: number;
  bulkUploadResult?: BulkUploadResultProps | null;
  uploadId?: string;
  source: string;
}

const ProceedBulkError: React.FC<ProceedBulkErrorProps> = ({
  isOpen,
  onClose,
  errorCount,
  bulkUploadResult,
  source,
}) => {
  const isFromUpload = source === 'upload';
  const isFromResolve = source === 'resolve';

  const navigate = useNavigate();



  const handleErrorClick = () => {
    navigate('/dashboard/tracks', { state: { activeTab: 'Error' } });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-[200]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60"
    >
      <div className="bg-[#FFF8E7] rounded-lg p-8 max-w-lg mx-auto shadow-lg relative">
        <div className="flex flex-col items-center text-center">
          <span>
            <img src={Warning} alt="" />
            <p
              className="absolute top-[56px] right-[56px] font-bold cursor-pointer"
              onClick={onClose}
            >
              X
            </p>
          </span>{' '}
          <h2 className="text-[56px] text-[#013131] font-Utile-bold  leading-[56px] tracking-[-2.24px] mt-[28px]">
            Proceed with Errors
          </h2>
          {isFromUpload && (
            <>
              <p className="text-[24px] leading-[28px] font-Utile-regular  text-[#013131] tracking-[-0.96px] mt-[23px]">
                You have{' '}
                <span className="font-semibold">
                  {bulkUploadResult?.failedUploads}
                </span>{' '}
                unresolved errors in your upload. Proceeding without fixing
                these errors may result in incomplete or incorrect uploads. Are
                you sure you want to continue?
              </p>
              <div className="flex space-x-4 mt-[56px]">
                <Link
                  to={`/dashboard/bulk-upload/resolve-errors/${bulkUploadResult?.errors.bulkError_id}`}
                >
                  <button className="text-[#013131] rounded-[8px] border border-[#013131] py-2.5 px-4 w-[176px]">
                    Resolve Errors
                  </button>
                </Link>
                <button
                  className="bg-yellow text-[#013131] rounded-[8px] py-2.5 px-4 hover:bg-yellow-600 w-[176px] "
                  onClick={handleErrorClick}
                >
                  Proceed Anyway
                </button>
              </div>
            </>
          )}
          {isFromResolve && (
            <>
              <p className="text-[24px] leading-[28px] font-Utile-regular  text-[#013131] tracking-[-0.96px] mt-[23px]">
                You have <span className="font-semibold">{errorCount}</span>{' '}
                unresolved errors in your upload. Proceeding without fixing
                these errors may result in incomplete or incorrect uploads. Are
                you sure you want to continue?
              </p>
              <div className="flex space-x-4 mt-[56px]">
                <button className="text-[#013131] rounded-[8px] border border-[#013131] py-2.5 px-4 w-[176px]">
                  Resolve Errors
                </button>
                <button className="bg-yellow text-[#013131] rounded-[8px] py-2.5 px-4 hover:bg-yellow-600 w-[176px] ">
                  Proceed Anyway
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProceedBulkError;
