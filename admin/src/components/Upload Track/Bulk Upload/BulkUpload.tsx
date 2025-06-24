import { Link } from 'react-router-dom';
import Plus from '../../../assets/images/plus.svg';
import Download from '../../../assets/images/download.svg';
import Upload from '../../../assets/images/file upload states.svg';
import FileType from '../../../assets/images/filetype.svg';
import { useCallback, useReducer } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { toast } from 'react-toastify';
import UploadCompletionModal from './UploadCompletionModal';
import ProceedBulkError from './ProceedBulkError';
import { Track } from '../../../declaration';

// Constants for event types
const EVENT_TYPES = {
  CONNECTION_CLOSED: 'Connection closed',
  TRACK_ERROR: 'trackError validation failed',
  PROCESSING: 'event: processing',
  TOTAL: 'event: total',
  WARNING_DUPLICATE: 'event: warning duplicate data',
  PROGRESS: 'parsedRows',
  DONE: 'event: done',
  ERROR: 'event: error',
} as const;

const MAX_BUFFER_SIZE = 1024 * 1024; // 1MB buffer limit
const UPLOAD_TIMEOUT = 300000; // 5 minutes timeout

interface UploadProgressProps {
  progress: number;
  fileName: string;
  status: string;
  currentRow?: number;
  totalRows?: number;
}

interface BulkUploadResultProps {
  fileName: string;
  fileSize: string;
  totalTracks: number;
  failedUploads: number;
  successfulUploads: number;
  errors: {
    bulkError_id: string;
    duplicates: Track[];
    duplicateTrackByAnother: Track[];
    invalidSpotifyLink: Track[];
  };
}

// Upload state management with useReducer
interface UploadState {
  file: File | null;
  isUploading: boolean;
  uploadProgress: number;
  uploadStatus: string;
  currentRow: number;
  totalRows: number;
  showCompletionModal: boolean;
  showConfirmProceedModal: boolean;
  bulkUploadResult: BulkUploadResultProps | null;
  retryCount: number;
}

type UploadAction =
  | { type: 'SET_FILE'; payload: File }
  | { type: 'START_UPLOAD' }
  | {
      type: 'UPDATE_PROGRESS';
      payload: {
        progress: number;
        status: string;
        currentRow?: number;
        totalRows?: number;
      };
    }
  | { type: 'UPLOAD_COMPLETE'; payload: BulkUploadResultProps }
  | { type: 'UPLOAD_ERROR'; payload: string }
  | { type: 'RESET_UPLOAD' }
  | { type: 'SHOW_COMPLETION_MODAL' }
  | { type: 'SHOW_PROCEED_MODAL' }
  | { type: 'HIDE_MODALS' }
  | { type: 'INCREMENT_RETRY' }
  | { type: 'RESET_RETRY' };

const initialState: UploadState = {
  file: null,
  isUploading: false,
  uploadProgress: 0,
  uploadStatus: '',
  currentRow: 0,
  totalRows: 0,
  showCompletionModal: false,
  showConfirmProceedModal: false,
  bulkUploadResult: null,
  retryCount: 0,
};

function uploadReducer(state: UploadState, action: UploadAction): UploadState {
  switch (action.type) {
    case 'SET_FILE':
      return { ...state, file: action.payload };
    case 'START_UPLOAD':
      return {
        ...state,
        isUploading: true,
        uploadStatus: 'Processing file...',
        uploadProgress: 0,
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        uploadProgress: action.payload.progress,
        uploadStatus: action.payload.status,
        currentRow: action.payload.currentRow || state.currentRow,
        totalRows: action.payload.totalRows || state.totalRows,
      };
    case 'UPLOAD_COMPLETE':
      return {
        ...state,
        uploadProgress: 100,
        uploadStatus: 'Upload complete!',
        bulkUploadResult: action.payload,
        showCompletionModal: true,
        isUploading: false,
      };
    case 'UPLOAD_ERROR':
      return {
        ...state,
        isUploading: false,
        uploadProgress: 0,
        uploadStatus: action.payload,
      };
    case 'RESET_UPLOAD':
      return initialState;
    case 'SHOW_COMPLETION_MODAL':
      return { ...state, showCompletionModal: true };
    case 'SHOW_PROCEED_MODAL':
      return {
        ...state,
        showCompletionModal: false,
        showConfirmProceedModal: true,
      };
    case 'HIDE_MODALS':
      return {
        ...state,
        showCompletionModal: false,
        showConfirmProceedModal: false,
      };
    case 'INCREMENT_RETRY':
      return { ...state, retryCount: state.retryCount + 1 };
    case 'RESET_RETRY':
      return { ...state, retryCount: 0 };
    default:
      return state;
  }
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
        <div className="w-16 h-16 bg-white shadow-sm rounded-lg flex items-center justify-center">
          <img src={FileType} alt="" />
        </div>

        <div className="flex items-center gap-2 text-xl font-medium text-gray-700">
          <span>{progress}%</span>
          {currentRow !== undefined && totalRows !== undefined && (
            <span className="text-gray-500 text-base">
              ({currentRow} of {totalRows})
            </span>
          )}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-center">
          <div className="font-medium text-gray-700">{status}</div>
          <div className="text-sm text-gray-500">{fileName}</div>
        </div>
      </div>
    </div>
  );
};

const BulkUpload = () => {
  const [state, dispatch] = useReducer(uploadReducer, initialState);

  const formatFileSize = useCallback((bytes: number): string => {
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${Math.round(kb)}KB`;
    } else {
      const mb = kb / 1024;
      return `${mb.toFixed(1)}MB`;
    }
  }, []);

  const handleEventData = useCallback(
    (event: string, data: any) => {
      if (event.includes(EVENT_TYPES.CONNECTION_CLOSED)) {
        console.error('Connection was closed unexpectedly.');
        toast.error('Connection was closed unexpectedly. Please try again.');
        dispatch({
          type: 'UPLOAD_ERROR',
          payload: 'Upload failed due to connection closure.',
        });
        return;
      }

      if (event.includes(EVENT_TYPES.TRACK_ERROR)) {
        toast.error(data.message);
        dispatch({
          type: 'UPDATE_PROGRESS',
          payload: {
            progress: state.uploadProgress,
            status: 'Validation failed on some rows.',
          },
        });
        resetUploadUI();
        return;
      }

      if (event.includes(EVENT_TYPES.PROCESSING)) {
        dispatch({
          type: 'UPDATE_PROGRESS',
          payload: {
            progress: state.uploadProgress,
            status: data.message || 'Processing file...',
          },
        });
        return;
      }

      if (event.includes(EVENT_TYPES.TOTAL)) {
        const totalRows = data.totalRows;
        dispatch({
          type: 'UPDATE_PROGRESS',
          payload: {
            progress: state.uploadProgress,
            status: `Total valid rows parsed: ${totalRows}`,
          },
        });
        return;
      }

      if (event.includes(EVENT_TYPES.WARNING_DUPLICATE)) {
        const warningData = data;
        dispatch({
          type: 'UPDATE_PROGRESS',
          payload: {
            progress: state.uploadProgress,
            status: `Warning: Duplicate ISRC found for row: ${warningData.parsedRows}`,
          },
        });
        return;
      }

      if (event.includes('data:') && event.includes(EVENT_TYPES.PROGRESS)) {
        const currentRow = data.parsedRows;
        const totalRows = data.rowCount;
        const percentage = Math.round((currentRow / totalRows) * 100);

        dispatch({
          type: 'UPDATE_PROGRESS',
          payload: {
            progress: percentage,
            status: `Processing ${currentRow} of ${totalRows} rows...`,
            currentRow,
            totalRows,
          },
        });
        return;
      }

      if (event.includes(EVENT_TYPES.DONE)) {
        const uploadResult: BulkUploadResultProps = {
          fileName: state.file?.name || '',
          fileSize: formatFileSize(state.file?.size || 0),
          totalTracks: (data?.failedCount ?? 0) + (data?.successCount ?? 0),
          failedUploads: data.failedCount,
          successfulUploads: data.successCount ?? 0,
          errors: {
            bulkError_id: data.errorData.uploadErrorId,
            duplicates: data.errorData.duplicateData || [],
            duplicateTrackByAnother:
              data.errorData.duplicateTrackByAnother || [],
            invalidSpotifyLink: data.errorData.invalidSpotifyLink || [],
          },
        };

        dispatch({ type: 'UPLOAD_COMPLETE', payload: uploadResult });
        dispatch({ type: 'RESET_RETRY' });
        return;
      }

      if (event.includes(EVENT_TYPES.ERROR)) {
        toast.error(`Error: ${data.message || 'An unknown error occurred'}`);
        return;
      }

      if (data.message) {
        toast.error(data.message);
      }
    },
    [state.file, state.uploadProgress, formatFileSize]
  );

  const processUploadStream = useCallback(
    async (response: Response) => {
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to get response reader');

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Prevent buffer from growing too large
          if (buffer.length > MAX_BUFFER_SIZE) {
            console.warn('Buffer size exceeded limit, truncating...');
            buffer = buffer.slice(-MAX_BUFFER_SIZE / 2);
          }

          const events = buffer.split('\n\n');

          for (let i = 0; i < events.length - 1; i++) {
            const event = events[i];
            if (!event.trim()) continue;

            try {
              const dataLine = event.split('data:')[1]?.trim();
              if (dataLine) {
                const data = JSON.parse(dataLine);
                handleEventData(event, data);
              }
            } catch (parseError) {
            
              dispatch({
                type: 'UPDATE_PROGRESS',
                payload: {
                  progress: state.uploadProgress,
                  status: event,
                },
              });
            }
          }

          buffer = events[events.length - 1];
        }
      } finally {
        reader.releaseLock();
      }
    },
    [handleEventData]
  );

  const uploadWithRetry = useCallback(
    async (uploadedFile: File) => {

      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/trackBulkUpload`;

      const formData = new FormData();
      formData.append('bulkUpload', uploadedFile);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
         
          credentials: 'include',
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        await processUploadStream(response);
      } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            toast.error('Upload timed out. Please try again.');
          } else if (state.retryCount < 3) {
            console.warn(
              `Upload attempt ${state.retryCount + 1} failed, retrying...`
            );
            dispatch({ type: 'INCREMENT_RETRY' });
            setTimeout(
              () => uploadWithRetry(uploadedFile),
              2000 * (state.retryCount + 1)
            );
            return;
          } else {
            toast.error(
              'Upload failed after multiple attempts. Please try again later.'
            );
          }
        }

        dispatch({ type: 'UPLOAD_ERROR', payload: 'Upload failed' });
      }
    },
    [state.retryCount, processUploadStream]
  );

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

      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        dispatch({ type: 'SET_FILE', payload: uploadedFile });
        dispatch({ type: 'START_UPLOAD' });
        dispatch({ type: 'RESET_RETRY' });

        await uploadWithRetry(uploadedFile);
      }
    },
    [uploadWithRetry]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false,
  });

  const handleProceed = () => {
    dispatch({ type: 'SHOW_PROCEED_MODAL' });
  };

  const resetUploadUI = () => {
    dispatch({ type: 'RESET_UPLOAD' });
  };

  const fileUrl = '/assets/testdoc.csv';
  const fileName = 'CSV Template.csv';

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
          to="/admin/upload-contents"
          className="border-none rounded-[8px] bg-yellow py-2.5 px-4 flex items-center gap-2 w-fit"
        >
          <img src={Plus} alt="Plus" />
          <p>Single Upload</p>
        </Link>
      </div>
      <div className="mt-4 border border-t-[#D7DCE0] w-full"></div>
      <div className=" mx-auto mt-[46px] space-y-6">
        <div className="flex justify-between items-start gap-8">
          <div className="max-w-[509px] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <a
                  href={fileUrl}
                  download={fileName}
                  className="text-[#1671D9] hover:text-blue-700 font-medium font-inter flex gap-2 items-center"
                  type="text/csv"
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

            {state.isUploading ? (
              <UploadProgress
                progress={state.uploadProgress}
                fileName={state.file?.name || 'Bulk Uploaded Track.csv'}
                status={state.uploadStatus}
                currentRow={state.currentRow}
                totalRows={state.totalRows}
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
        isOpen={state.showCompletionModal}
        onClose={() => {
          dispatch({ type: 'HIDE_MODALS' });
          resetUploadUI();
        }}
        onProceed={handleProceed}
        bulkUploadResult={state.bulkUploadResult}
      />
      <ProceedBulkError
        isOpen={state.showConfirmProceedModal}
        onClose={() => dispatch({ type: 'HIDE_MODALS' })}
        bulkUploadResult={state.bulkUploadResult}
        source="upload"
      />
    </div>
  );
};

export default BulkUpload;
