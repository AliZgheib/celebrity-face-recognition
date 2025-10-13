import React from "react";

interface PreviewModalProps {
  imageUrl: string;
  fileName: string;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  imageUrl,
  fileName,
  onClose,
}) => {
  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="preview-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close preview">
          &times;
        </button>

        <div className="preview-modal-header">
          <h2 className="preview-modal-title">Image Preview</h2>
          <p className="preview-modal-filename">{fileName}</p>
        </div>

        <div className="preview-modal-body">
          <img
            src={imageUrl}
            alt="Full resolution preview"
            className="preview-modal-image"
          />
        </div>
      </div>
    </div>
  );
};
