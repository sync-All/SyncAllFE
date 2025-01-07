import { Link } from 'react-router-dom';
import Plus from '../../../../assets/images/plus.svg';
import Download from '../../../../assets/images/download.svg';
import Upload from '../../../../assets/images/file upload states.svg';
import FileType from '../../../../assets/images/filetype.svg';
import { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { toast } from 'react-toastify';
import UploadCompletionModal from './UploadCompletionModal';
import ProceedBulkError from './ProceedBulkError';
import { useUpload } from '../../../../Context/UploadContext';

interface UploadProgressProps {
  progress: number;
  fileName: string;
  status: string;
  currentRow?: number;
  totalRows?: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  fileName,
  status,
  currentRow,
  totalRows,
}) => {
  return (
    <div className="border-2 border-dashed border-green-200 rounded-lg p-8 max-w-md mx-auto">
      <div className="flex flex-col items-center gap-4">
        {/* CSV Icon */}
        <div className="w-16 h-16 bg-white shadow-sm rounded-lg flex items-center justify-center">
          <img src={FileType} alt="" />
        </div>

        {/* Progress percentage and fraction */}
        <div className="flex items-center gap-2 text-xl font-medium text-gray-700">
          <span>{progress}%</span>
          {currentRow !== undefined && totalRows !== undefined && (
            <span className="text-gray-500 text-base">
              ({currentRow} of {totalRows})
            </span>
          )}
        </div>

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
  const [showConfirmProceedModal, setShowConfirmProceedModal] = useState(false);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [totalRows, setTotalRows] = useState<number>(0);

  const { setUploadStats } = useUpload();

  const resetUploadUI = () => {
    setFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadStatus('');
    setCurrentRow(0);
    setTotalRows(0);
    setShowCompletionModal(false);
  };

  const handleProceed = () => {
    setShowCompletionModal(false); // Close the first modal
    setShowConfirmProceedModal(true); // Open the second modal
  };

  const fileUrl = '../../../../assets/images/CSV Template.csv';
  const fileName = 'CSV Template.csv';

  const onDrop = useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        fileRejections.forEach((rejection) => {
          rejection.errors.forEach((error) => {
            if (error.code === 'file-invalid-type') {
              toast.error('Please upload a CSV file only');
            } else if (error.code === 'file-too-large') {
              toast.error('File is too large. Maximum size is 100MB');
            } else {
              toast.error('Invalid file. Please try again');
            }
          });
        });
        return;
      }

      const formatFileSize = (bytes: number): string => {
        const kb = bytes / 1024;

        if (kb < 1024) {
          // If less than 1MB, show in KB
          return `${Math.round(kb)}KB`;
        } else {
          // If 1MB or more, show in MB
          const mb = kb / 1024;
          return `${mb.toFixed(1)}MB`;
        }
      };

      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);

        const token = localStorage.getItem('token');
        const urlVar = import.meta.env.VITE_APP_API_URL;
        const apiUrl = `${urlVar}/trackBulkUpload`;

        const formData = new FormData();
        formData.append('bulkUpload', uploadedFile);

        setIsUploading(true);
        setUploadStatus('Processing file...');

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              Authorization: `${token}`,
            },
            body: formData,
          });

          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (reader) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split('\n\n');

            for (let i = 0; i < events.length - 1; i++) {
              const event = events[i];
              if (!event.trim()) continue;

              try {
                // For processing status events
                if (event.includes('event: processing')) {
                  const dataLine = event.split('data:')[1]?.trim();
                  if (dataLine) {
                    setUploadStatus(dataLine); // Will show "Scanning and Sorting..." or "No Duplicates Found"
                  }
                }
                // For progress events with row counts
                else if (
                  event.includes('data:') &&
                  event.includes('parsedRows')
                ) {
                  const dataLine = event.split('data:')[1].trim();
                  const data = JSON.parse(dataLine);

                  if (
                    data.parsedRows !== undefined &&
                    data.rowCount !== undefined
                  ) {
                    const currentRow = data.parsedRows;
                    const totalRows = data.rowCount;

                    const percentage = (currentRow / totalRows) * 100;
                    setUploadProgress(Math.round(percentage));
                    setUploadStatus(
                      `Processing ${currentRow} of ${totalRows} rows...`
                    );
                    setCurrentRow(currentRow);
                    setTotalRows(totalRows);
                  }
                }
                // For completion event
                else if (event.includes('event: done')) {
                  const dataLine = event.split('data:')[1].trim();
                  const data = JSON.parse(dataLine);

                  setUploadProgress(100);
                  setUploadStatus('Upload complete!');

                  setShowCompletionModal(true);
                  setUploadStats({
                    fileName: uploadedFile.name,
                    fileSize: formatFileSize(uploadedFile.size),
                    totalTracks: data.failedCount + data.successCount,
                    failedUploads: data.failedCount,
                    successfulUploads: data.successCount,
                    errors: {
                      duplicates: data.duplicateData || [],
                      invalidSpotifyLink: data.invalidSpotifyLink || [],
                    },
                    
                  });

                
                }
              } catch (parseError) {
                console.error('Error processing event:', event);
              }
            }

            buffer = events[events.length - 1];
          }
        } catch (error) {
          console.error('Upload error:', error);
          toast.error('An error occurred during upload');
          setIsUploading(false);
          setUploadProgress(0);
          setUploadStatus('');
        }
      }
    },
    []
  );


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
              <div>
                <a
                  href={fileUrl}
                  download={fileName}
                  className="text-[#1671D9] hover:text-blue-700 font-medium font-inter flex gap-2 items-center"
                >
                  Download CSV Template
                  <img src={Download} alt="" />
                </a>
                
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
                currentRow={currentRow}
                totalRows={totalRows}
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
        onClose={() => {
          setShowCompletionModal(false);
          resetUploadUI();
        }}
        onProceed={handleProceed}
      />{' '}
      <ProceedBulkError
        isOpen={showConfirmProceedModal}
        onClose={() => setShowConfirmProceedModal(false)}
        source="upload"
      />
    </div>
  );
};

export default BulkUpload;
