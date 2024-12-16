// src/utils/fileDownloader.ts

interface SupportingDocData {
  type: string;
  data: number[];
}

export const downloadFile = (
  supportingDoc?: SupportingDocData,
  mimeType?: string
) => {
  if (
    !supportingDoc ||
    !supportingDoc.data ||
    supportingDoc.data.length === 0
  ) {
    console.error('Buffer data is missing or empty.');
    return;
  }

  const getFileExtension = (mimeType: string): string => {
    switch (mimeType) {
      case 'application/pdf':
        return '.pdf';
      case 'image/png':
        return '.png';
      default:
        throw new Error('Unsupported file type');
    }
  };

  try {
    const currentMimeType = mimeType || 'image/png'; // default to png if not specified
    const extension = getFileExtension(currentMimeType);
    const fileName = `support_document${extension}`;

    const blob = new Blob([Uint8Array.from(supportingDoc.data)], {
      type: currentMimeType,
    });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};
