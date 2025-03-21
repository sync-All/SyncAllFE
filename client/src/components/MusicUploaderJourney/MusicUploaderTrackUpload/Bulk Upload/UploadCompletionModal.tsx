import FileType from '../../../../assets/images/filetype.svg';
import TotalTracks from '../../../../assets/images/totaltracks.svg';
import FailedUploads from '../../../../assets/images/failed-uploads.svg';
import SuccessfulUploads from '../../../../assets/images/successful-uploads.svg';
import { Track } from '../../../../Context/DashboardDataProvider';
import { Link } from 'react-router-dom';

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

interface UploadCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  bulkUploadResult: BulkUploadResultProps | null;
}

const UploadCompletionModal: React.FC<UploadCompletionModalProps> = ({
  isOpen,
  onClose,
  onProceed,
  bulkUploadResult,
}) => {
 

 

  if (!isOpen) return null;

  const uploadStatusData = [
    {
      icon: FileType,
      label: bulkUploadResult?.fileName,
      value: bulkUploadResult?.fileSize,
    },
    {
      icon: TotalTracks,
      label: 'Total Tracks',
      value: bulkUploadResult?.totalTracks,
    },
    {
      label: 'Failed Uploads',
      value: bulkUploadResult?.failedUploads,
      icon: FailedUploads,
    },
    {
      label: 'Successful Uploads',
      value: bulkUploadResult?.successfulUploads,
      icon: SuccessfulUploads,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-inter z-50">
      <div className="bg-white rounded-[10px] p-20 h-[561px] max-w-[715px] w-full mx-4 relative">
        <div className="flex justify-center items-center ">
          <h2 className="text-black2 text-[40px] font-Utile-bold tracking-[-1.6px]">
            Upload Completed
          </h2>
          <button
            onClick={onClose}
            className="text-black font-bold absolute right-[56px] top-[56px]"
          >
            <span className="sr-only">Close</span>✕
          </button>
        </div>

        <div className="mt-20">
          {/* Upload Stats */}
          <div className="grid grid-cols-2 gap-20">
            {uploadStatusData.map((status, index) => (
              <div key={index} className="flex items-center gap-4">
                <div>
                  <img src={status.icon} alt="" />
                </div>
                <div>
                  <div className="text-sm text-[#1D2739] font-inter font-semibold">
                    {status.label}
                  </div>
                  <div className="text-[#98A2B3] font-normal font-inter text-[12px] mt-2.5 leading-[17.4px]">
                    {status.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-20"> <button
             
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
             <Link to={`/dashboard/bulk-upload/resolve-errors/${bulkUploadResult?.errors.bulkError_id}`}>
           
              Resolve errors
            </Link></button>
            <button
              onClick={onProceed}
              className="px-4 py-2 bg-[#0B1B2B] text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCompletionModal;