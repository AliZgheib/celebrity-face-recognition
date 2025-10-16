import React from "react";

interface FileUploadProps {
  file: File | null;
  previewUrl: string | null;
  isLoading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileInputClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onPreviewClick?: () => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  previewUrl,
  isLoading,
  onFileChange,
  onFileInputClick,
  onPreviewClick,
}) => {
  return (
    <div className="drop_box">
      {!previewUrl ? (
        <>
          <div className="upload-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <h4>Upload Your Image</h4>
          <p>Supported formats: PNG, JPG (Max 5MB)</p>
        </>
      ) : (
        <div className="preview-info-container">
          <div className="file-selected-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <p className="file-name">{file?.name}</p>
          <button
            type="button"
            onClick={onPreviewClick}
            className="preview-button"
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Full Image
          </button>
        </div>
      )}

      <label htmlFor="fileID" className="file-input-label">
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          id="fileID"
          disabled={isLoading}
          onChange={onFileChange}
          onClick={onFileInputClick}
          className="file-input"
          aria-label="Upload image file"
        />
        <span className="file-input-button">
          {previewUrl ? "Change Image" : "Choose File"}
        </span>
      </label>
    </div>
  );
};
