import { Link } from 'react-router-dom';
import Plus from '../../../../assets/images/plus.svg';
import Download from '../../../../assets/images/download.svg';
import Upload from '../../../../assets/images/file upload states.svg';
import FileType from '../../../../assets/images/filetype.svg';
import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { toast } from 'react-toastify';
import axios, { AxiosProgressEvent } from 'axios';
import UploadCompletionModal from './UploadCompletionModal';

interface UploadProgressProps {
  progress: number;
  fileName: string;
  status: string;
}

export interface TrackData {
  releaseType: string;
  releaseTitle: string;
  mainArtist: string;
  featuredArtist: string;
  trackTitle: string;
  upc: string;
  isrc: string;
  trackLink: string;
  genre: string;
  subGenre: string;
  claimBasis: string;
  copyrightName: string;
  copyrightYear: string;
  audioLang: string;
  message?: string;
  err_type?: string;
  // ... other fields
}

// Types for the upload response
interface UploadResponse {
  failedCount: number;
  successCount: number;
  duplicateData: TrackData[];
  invalidSpotifyLink: TrackData[];
}

interface UploadStats {
  fileName: string;
  fileSize: string;
  totalTracks: number;
  failedUploads: number;
  successfulUploads: number;
  errors: {
    duplicates: TrackData[];
    invalidLinks: TrackData[];
  };
}

// interface ResponseData {
//   message: string;
// }

const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  fileName,
  status,
}) => {
  return (
    <div className="border-2 border-dashed border-green-200 rounded-lg p-8 max-w-md mx-auto">
      <div className="flex flex-col items-center gap-4">
        {/* CSV Icon */}
        <div className="w-16 h-16 bg-white shadow-sm rounded-lg flex items-center justify-center">
          <img src={FileType} alt="" />
          <div className="absolute mt-8 text-xs font-medium text-green-600">
            CSV
          </div>
        </div>

        {/* Progress percentage */}
        <div className="text-xl font-medium text-gray-700">{progress}%</div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Upload status text */}
        <div className="text-center">
          <div className="font-medium text-gray-700">{status}</div>
          <div className="text-sm text-gray-500">{fileName}</div>
        </div>
      </div>
    </div>
  );
};

const BulkUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [showCompletionModal, setShowCompletionModal] = useState(false);
 const [uploadStats, setUploadStats] = useState<UploadStats>({
   fileName: '',
   fileSize: '',
   totalTracks: 0,
   failedUploads: 0,
   successfulUploads: 0,
   errors: {
     duplicates: [],
     invalidLinks: [],
   },
 });

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        if (rejection.errors[0]?.code === 'file-invalid-type') {
          toast.error('Please upload a CSV file only');
        } else if (rejection.errors[0]?.code === 'file-too-large') {
          toast.error('File is too large. Maximum size is 100MB');
        } else {
          toast.error('Invalid file. Please try again');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);

        const token = localStorage.getItem('token');
        const urlVar = import.meta.env.VITE_APP_API_URL;
        const apiUrl = `${urlVar}/trackBulkUpload`;

        const formData = new FormData();
        formData.append('bulkUpload', uploadedFile);

        const config = {
          headers: {
            Authorization: `${token}`,
          },
          responseType: 'text' as const,
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const uploadPercentage = progressEvent.total
              ? (progressEvent.loaded / progressEvent.total) * 50
              : 0;
            setUploadProgress(Math.round(uploadPercentage));
            setUploadStatus('Uploading file...');
          },
        };

        setIsUploading(true);
        setUploadProgress(0);
        setUploadStatus('Preparing upload...');

        try {
          const response = await axios.post(apiUrl, formData, config);
          console.log('Raw response:', response.data);

          if (!response.data) {
            throw new Error('No response data received');
          }

          const events = response.data.split('\n\n');
          console.log('Split events:', events);

          for (const event of events) {
            if (!event.trim()) continue;

            try {
              console.log('Processing event:', event);
              const lines = event.split('\n');

              // Handle both typed events and direct data events
              if (event.startsWith('event:')) {
                // Event with type (like 'total' and 'done')
                const eventType = lines[0].replace('event: ', '');
                const dataLine = lines[1].replace('data: ', '');
                const data = JSON.parse(dataLine);

                switch (eventType) {
                  case 'total': {
                    setUploadStatus(`Processing ${data.rowCount} rows...`);
                    break;
                  }
                  case 'done': {
                    const data = JSON.parse(dataLine) as UploadResponse;
                    setUploadProgress(100);
                    setUploadStatus('Upload complete!');
                    setShowCompletionModal(true);
                    setUploadStats({
                      fileName: uploadedFile.name,
                      fileSize: `${(uploadedFile.size / (1024 * 1024)).toFixed(
                        1
                      )}mb`,
                      totalTracks: data.failedCount + data.successCount,
                      failedUploads: data.failedCount,
                      successfulUploads: data.successCount,
                      errors: {
                        duplicates: data.duplicateData,
                        invalidLinks: data.invalidSpotifyLink,
                      },
                    });
                    break;
                  }
                }
              } else if (event.startsWith('data:')) {
                // Progress update events
                const data = JSON.parse(event.replace('data: ', ''));
                if (data.parsedRows && data.rowCount) {
                  const progressPercentage =
                    (data.parsedRows / data.rowCount) * 50 + 50;
                  setUploadProgress(Math.round(progressPercentage));
                  setUploadStatus(
                    `Processed ${data.parsedRows} of ${data.rowCount} rows`
                  );
                }
              }
            } catch (parseError) {
              console.error('Error processing event:', parseError);
              console.error('Problematic event:', event);
            }
          }
        } catch (error: unknown) {
          console.error('Upload error:', error);
          toast.error('An error occurred during upload. Please try again.');
          setIsUploading(false);
          setUploadProgress(0);
          setUploadStatus('');
        }
      }
    },
    [
      setFile,
      setUploadProgress,
      setUploadStatus,
      setShowCompletionModal,
      setUploadStats,
    ]
  ); // Include all state setters used
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false,
  });
  const instructions = [
    'Download the CSV Template: Start by downloading the pre-formatted CSV file to ensure compatibility with our system.',
    'Fill in Track Details: Populate the CSV file with your track details. Required fields include: Track Name, ISRC Code, Spotify Link',
    'Check for Duplicates: Avoid adding duplicate track names or Spotify links, as this may cause upload errors.',
    'Upload Your CSV File: Drag and drop your completed CSV file into the upload area or click to select your file (max size: 100MB).',
    'Review Errors (if any): After uploading, review any errors that may appear. Suggested actions will be provided for each error type.',
  ];
  return (
    <div className="lg:mx-8 ml-5">
      <div className="flex justify-between">
        <div>
          <span className="flex gap-2">
            <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
              Bulk Track Upload
            </h2>
            <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
              Track Details
            </p>
          </span>
          <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
            Upload multiple tracks at once to save time
          </p>
        </div>
        <Link
          to="/dashboard/upload"
          className="border-none rounded-[8px] bg-yellow py-2.5 px-4 flex items-center gap-2 w-fit"
        >
          <img src={Plus} alt="Plus" />
          <p>Single Upload</p>
        </Link>
      </div>
      <div className="mt-4 border border-t-[#D7DCE0] w-full"></div>
      <div className=" mx-auto mt-[46px] space-y-6">
        <div className="flex justify-between items-start gap-8">
          {/* Left side - Upload area */}
          <div className="max-w-[509px] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  className="text-[#1671D9] hover:text-blue-700 font-medium font-inter"
                >
                  Download CSV Template
                </a>
                <img src={Download} alt="" />
              </div>
            </div>

            <div className="text-sm py-2 px-3 border border-[#EFA705] rounded-[8px] bg-[#FFFAEF] text-[#EFA705] font-inter ">
              Download template if you do not have one, then upload it here when
              you're done filling
            </div>
            {isUploading ? (
              <UploadProgress
                progress={uploadProgress}
                fileName={file?.name || 'Bulk Uploaded Track.csv'}
                status={uploadStatus}
              />
            ) : (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed border-[#D0D5DD] rounded-[16px] p-8 text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <img src={Upload} alt="" />
                  </div>
                  <div>
                    <span className="text-[#005EF6] font-inter font-semibold">
                      Click to upload
                    </span>
                    <span className="text-[#475367] font-inter">
                      {' '}
                      or drag and drop
                    </span>
                  </div>
                  <div className="text-[12px] font-inter  text-[#98A2B3]">
                    CSV only (max. 100MB)
                  </div>
                </div>
              </div>
            )}
            {file && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
                File selected: {file.name}
              </div>
            )}
          </div>

          {/* Right side - Instructions */}
          <div className=" max-w-[425px] border border-[#D0D5DD] bg-[#F9F9F9] rounded-lg p-6 font-inter text-black">
            <h3 className="font-medium text-[16px] mb-4">
              Instructions for Bulk Track Upload
            </h3>
            <ol className="space-y-3">
              {instructions.map((instruction, index) => (
                <li key={index} className="flex gap-2 text-black">
                  <span className="">{index + 1}.</span>
                  <span className="">{instruction}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 text-[14px] italic font-medium">
              <strong>Tip:</strong> To reduce errors, ensure that each track has
              a unique ISRC code and valid Spotify link.
            </div>
          </div>
        </div>
      </div>
      <UploadCompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        stats={uploadStats}
        onProceed={() => {
          // Handle proceed action
          setShowCompletionModal(false);
        }}
      />
    </div>
  );
};

export default BulkUpload;
