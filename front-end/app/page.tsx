"use client";

import React, { useState, useCallback } from "react";

const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
      reject(error);
    };
  });
};

interface CelebrityFace {
  Name: string;
  Id?: string;
  Confidence?: number;
  MatchConfidence?: number;
}

interface CelebritiesData {
  celebrityFaces: CelebrityFace[];
  unrecognizedFaces: any[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [celebritiesData, setCelebritiesData] =
    useState<CelebritiesData | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return setError("Please select an image file.");
    }

    try {
      setError(null);
      setIsLoading(true);
      
      const fileBase64 = await convertFileToBase64(file);
      const base64Data = fileBase64.split("base64,")[1];

      const rawResponse = await fetch(
        "https://XXX.execute-api.us-east-1.amazonaws.com/dev/rekognition",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageBase64: base64Data }),
        }
      );

      if (!rawResponse.ok) {
        throw new Error(`HTTP error! status: ${rawResponse.status}`);
      }

      const content = await rawResponse.json();
      setCelebritiesData(content);
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting image:", error);
      setError(
        "Failed to analyze image. Please try again with a different image."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (!selectedFile) {
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      // Validate file type
      if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
        setError("Please select a valid image file (PNG or JPG).");
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      // Validate file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size must be less than 5MB.");
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      setFile(selectedFile);
      setError(null);

      // Create preview URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    },
    []
  );

  const handleReset = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    setCelebritiesData(null);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Celebrity Face Recognition</h1>
          <p className="card-subtitle">
            Upload a photo to detect celebrities using AWS Rekognition
          </p>
        </div>

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
              <img
                src={previewUrl}
                alt="Preview"
                className="image-preview"
              />
              <p className="file-name">{file?.name}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form">
              <label htmlFor="fileID" className="file-input-label">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  id="fileID"
                  disabled={isLoading}
                  onChange={handleFileChange}
                  className="file-input"
                  aria-label="Upload image file"
                />
                <span className="file-input-button">
                  {previewUrl ? "Change Image" : "Choose File"}
                </span>
              </label>

              {error && (
                <div className="error-message" role="alert">
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
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="button-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading || !file}
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

                {file && !isLoading && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleReset}
                    aria-label="Reset form"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {showModal && celebritiesData && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <button
              className="close"
              onClick={handleModalClose}
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="modal-actual-content">
              <div className="modal-header">
                <h2 className="modal-title">Recognition Results</h2>
              </div>

              {celebritiesData.celebrityFaces.length > 0 ? (
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
                      Found {celebritiesData.celebrityFaces.length} 
                      {celebritiesData.celebrityFaces.length === 1
                        ? " celebrity"
                        : " celebrities"}
                    </span>
                  </div>

                  <ul className="celebrity-list">
                    {celebritiesData.celebrityFaces.map((celebrity, index) => (
                      <li key={`${celebrity.Name}-${index}`} className="celebrity-item">
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

              {celebritiesData.unrecognizedFaces.length > 0 && (
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
                    {celebritiesData.unrecognizedFaces.length} face(s) could not
                    be recognized
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
