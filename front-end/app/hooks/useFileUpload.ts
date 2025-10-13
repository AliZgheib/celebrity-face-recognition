import { useState, useCallback } from "react";
import { validateFile } from "../utils/fileValidation";

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (!selectedFile) {
        setFile(null);
        setPreviewUrl(null);
        return;
      }

      // Validate file
      const validation = validateFile(selectedFile);
      if (!validation.isValid) {
        setError(validation.error || "Invalid file");
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

  const reset = useCallback(() => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  }, []);

  return {
    file,
    previewUrl,
    error,
    setError,
    handleFileChange,
    reset,
  };
};
