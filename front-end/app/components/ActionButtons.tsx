import React from "react";

interface ActionButtonsProps {
  isLoading: boolean;
  hasFile: boolean;
  onReset: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isLoading,
  hasFile,
  onReset,
}) => {
  return (
    <div className="button-group">
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading || !hasFile}
        aria-label="Analyze image"
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Analyze Image</span>
          </>
        )}
      </button>

      {hasFile && !isLoading && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
          aria-label="Reset form"
        >
          Reset
        </button>
      )}
    </div>
  );
};
