import React, { useState } from 'react';
import Modal from 'react-modal';
import {
  Bold,
  Italic,
  Link2,
  Smile,
  Image as ImageIcon,
  Paperclip,
  Trash2,
  Send,
} from 'lucide-react';

Modal.setAppElement('#root');

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
}

// Simple Tooltip component
const Tooltip: React.FC<{
  children: React.ReactNode;
  tooltip: string;
}> = ({ children, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
};

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  recipient,
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with your email sending service
    console.log('Sending email:', { recipient, subject, body, files });
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatText = (command: 'bold' | 'italic') => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = body.substring(start, end);

    if (command === 'bold') {
      const newText =
        body.substring(0, start) + `**${selectedText}**` + body.substring(end);
      setBody(newText);
      setIsBold(!isBold);
    } else if (command === 'italic') {
      const newText =
        body.substring(0, start) + `*${selectedText}*` + body.substring(end);
      setBody(newText);
      setIsItalic(!isItalic);
    }
  };

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
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 min-w-fit">Mail to:</label>
            <input
              type="email"
              value={recipient}
              readOnly
              className="w-full p-2 text-sm text-gray-800 bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 min-w-fit">Subject:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 text-sm text-gray-800 border rounded"
            />
          </div>

          <div className="space-y-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 text-sm text-gray-800 border rounded h-64"
            />
          </div>

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

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-4">
              <Tooltip tooltip="Bold">
                <button
                  type="button"
                  onClick={() => formatText('bold')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    isBold ? 'bg-gray-200' : ''
                  }`}
                >
                  <Bold className="w-5 h-5" />
                </button>
              </Tooltip>

              <Tooltip tooltip="Italic">
                <button
                  type="button"
                  onClick={() => formatText('italic')}
                  className={`p-2 rounded hover:bg-gray-100 ${
                    isItalic ? 'bg-gray-200' : ''
                  }`}
                >
                  <Italic className="w-5 h-5" />
                </button>
              </Tooltip>

              <Tooltip tooltip="Insert Link">
                <button type="button" className="p-2 rounded hover:bg-gray-100">
                  <Link2 className="w-5 h-5" />
                </button>
              </Tooltip>

              <Tooltip tooltip="Attach Files">
                <label className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Paperclip className="w-5 h-5" />
                </label>
              </Tooltip>

              <Tooltip tooltip="Insert Image">
                <label className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <ImageIcon className="w-5 h-5" />
                </label>
              </Tooltip>

              <Tooltip tooltip="Insert Emoji">
                <button type="button" className="p-2 rounded hover:bg-gray-100">
                  <Smile className="w-5 h-5" />
                </button>
              </Tooltip>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EmailModal;
