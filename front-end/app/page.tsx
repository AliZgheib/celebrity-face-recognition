"use client";

import React, { useState } from "react";
import { PageHeader } from "./components/PageHeader";
import { FileUpload } from "./components/FileUpload";
import { ErrorMessage } from "./components/ErrorMessage";
import { ActionButtons } from "./components/ActionButtons";
import { ResultsModal } from "./components/ResultsModal";
import { PreviewModal } from "./components/PreviewModal";
import { useFileUpload } from "./hooks/useFileUpload";
import { analyzeCelebrities, ApiError } from "./services/api";
import { CelebritiesData } from "./types/celebrity";

export default function Home() {
  const { file, previewUrl, error, setError, handleFileChange, reset } =
    useFileUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
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

      const content = await analyzeCelebrities(file);
      setCelebritiesData(content);
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting image:", error);
      
      if (error instanceof ApiError) {
        setError(`Failed to analyze image: ${error.message}`);
      } else {
        setError("Failed to analyze image. Please try again with a different image.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setCelebritiesData(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePreviewClick = () => {
    setShowPreviewModal(true);
  };

  const handlePreviewClose = () => {
    setShowPreviewModal(false);
  };

  return (
    <div className="container">
      <div className="card">
        <PageHeader />

        <FileUpload
          file={file}
          previewUrl={previewUrl}
          isLoading={isLoading}
          onFileChange={handleFileChange}
          onPreviewClick={handlePreviewClick}
        />

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form">
            {error && <ErrorMessage message={error} />}
            <ActionButtons
              isLoading={isLoading}
              hasFile={!!file}
              onReset={handleReset}
            />
          </div>
        </form>
      </div>

      {showModal && celebritiesData && (
        <ResultsModal data={celebritiesData} onClose={handleModalClose} />
      )}

      {showPreviewModal && previewUrl && file && (
        <PreviewModal
          imageUrl={previewUrl}
          fileName={file.name}
          onClose={handlePreviewClose}
        />
      )}
    </div>
  );
}
