import React from "react";

interface FileUploadProps {
  file: File | null;
  previewUrl: string | null;
  isLoading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  previewUrl,
  isLoading,
  onFileChange,
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
        <div className="preview-container">
          <img src={previewUrl} alt="Preview" className="image-preview" />
          <p className="file-name">{file?.name}</p>
        </div>
      )}

      <label htmlFor="fileID" className="file-input-label">
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          id="fileID"
          disabled={isLoading}
          onChange={onFileChange}
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
