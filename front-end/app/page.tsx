"use client";

import React, { useState } from "react";
import { PageHeader } from "./components/PageHeader";
import { FileUpload } from "./components/FileUpload";
import { ErrorMessage } from "./components/ErrorMessage";
import { ActionButtons } from "./components/ActionButtons";
import { ResultsModal } from "./components/ResultsModal";
import { PreviewModal } from "./components/PreviewModal";
import { analyzeCelebrities } from "./services/api";
import { CelebritiesData } from "./types/celebrity";
import { validateFile } from "./utils/fileValidation";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [celebritiesData, setCelebritiesData] =
    useState<CelebritiesData | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      return setError("Please select an image file.");
    }

    setError(null);
    setIsLoading(true);

    const content = await analyzeCelebrities(file);

    setIsLoading(false);

    if (content instanceof Error) {
      setError(content.message);
      return;
    }

    setCelebritiesData(content);
    setShowResultsModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    console.log("Selected file:", selectedFile);

    if (!selectedFile) {
      return;
    }

    // cleanup existing object url & states
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(null);
    setPreviewUrl(null);
    setError(null);

    const validation = validateFile(selectedFile);
    if (!validation.isValid) {
      setError(validation.error || "Invalid file");
      return;
    }

    // update object url & states
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleFileInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Reset input value to allow selecting the same file again
    e.currentTarget.value = "";
  };

  const handlePreviewClick = () => {
    setShowPreviewModal(true);
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    setCelebritiesData(null);
  };

  const handleResultsModalClose = () => {
    setShowResultsModal(false);
  };

  const handlePreviewModalClose = () => {
    setShowPreviewModal(false);
  };

  return (
    <div className="container">
      <div className="card">
        <PageHeader />

        <form onSubmit={handleSubmit} className="upload-form">
          <FileUpload
            file={file}
            previewUrl={previewUrl}
            isLoading={isLoading}
            onFileChange={handleFileChange}
            onFileInputClick={handleFileInputClick}
            onPreviewClick={handlePreviewClick}
          />

          {error && <ErrorMessage message={error} />}

          <ActionButtons
            isLoading={isLoading}
            hasFile={!!file}
            onReset={handleReset}
          />
        </form>
      </div>

      {showResultsModal && celebritiesData && (
        <ResultsModal
          data={celebritiesData}
          onClose={handleResultsModalClose}
        />
      )}

      {showPreviewModal && previewUrl && file && (
        <PreviewModal
          imageUrl={previewUrl}
          fileName={file.name}
          onClose={handlePreviewModalClose}
        />
      )}
    </div>
  );
}
