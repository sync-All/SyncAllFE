import React, { useState } from 'react';
import Modal from 'react-modal';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Paperclip, Trash2, Send } from 'lucide-react';

Modal.setAppElement('#root');

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  recipient,
}) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle file attachments
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Send email via API endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/send-user-email`;

      const formData = new FormData();
      formData.append('userEmail', recipient);
      formData.append('subject', subject);
      formData.append('content', content);
      files.forEach((file) => {
        formData.append('attachments', file);
      });

      const config = {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      const response = await axios.post(apiUrl, formData, config);
      toast.success(response.data || 'Mail sent successfully');
      // Reset form fields
      setSubject('');
      setContent('');
      setFiles([]);
      onClose();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          'Error sending email'
      );
    } finally {
      setLoading(false);
    }
  };

  // Quill modules and formats configuration for rich text editing
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="border rounded-lg bg-white shadow-xl max-w-2xl mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-gray-800 text-white flex justify-between items-center px-4 py-2 rounded-t-lg">
        <h2 className="text-lg">New Email</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          {/* Recipient Field */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 min-w-fit">Mail to:</label>
            <input
              type="email"
              value={recipient}
              readOnly
              className="w-full p-2 text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* Subject Field */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 min-w-fit">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 text-sm text-gray-800 border rounded"
            />
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Write your email..."
              className="h-64"
            />
          </div>

          {/* Attachments List */}
          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Attachments:</p>
              <div className="space-y-1">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File Upload and Send Button */}
          <div className="flex items-center justify-between  pt-10">
            <div className="flex items-center gap-4">
              <label className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Paperclip className="w-5 h-5" />
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EmailModal;
