import React from "react";
import { CelebrityFace, UnrecognizedFace } from "../types/celebrity";

interface CelebritiesData {
  celebrityFaces: CelebrityFace[];
  unrecognizedFaces: UnrecognizedFace[];
}

interface ResultsModalProps {
  data: CelebritiesData;
  onClose: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  data,
  onClose,
}) => {
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        <div className="modal-actual-content">
          <div className="modal-header">
            <h2 className="modal-title">Recognition Results</h2>
          </div>

          {data.celebrityFaces.length > 0 ? (
            <div className="results-section">
              <div className="results-count">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <span>
                  Found {data.celebrityFaces.length}{" "}
                  {data.celebrityFaces.length === 1
                    ? "celebrity"
                    : "celebrities"}
                </span>
              </div>

              <ul className="celebrity-list">
                {data.celebrityFaces.map((celebrity, index) => (
                  <li
                    key={`${celebrity.Name}-${index}`}
                    className="celebrity-item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="celebrity-name">{celebrity.Name}</span>
                    {celebrity.MatchConfidence && (
                      <span className="confidence">
                        {Math.round(celebrity.MatchConfidence)}% match
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="no-results">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <p>No celebrities detected in this image.</p>
            </div>
          )}

          {data.unrecognizedFaces.length > 0 && (
            <div className="unrecognized-section">
              <p className="unrecognized-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                {data.unrecognizedFaces.length} face(s) could not be recognized
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
