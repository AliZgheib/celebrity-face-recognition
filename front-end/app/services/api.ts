import { CelebritiesData } from "../types/celebrity";
import { convertFileToBase64 } from "../utils/fileConverter";

export const analyzeCelebrities = async (
  file: File
): Promise<Error | CelebritiesData> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return new Error("API URL is not configured.");
  }

  try {
    // Convert file to base64
    const fileBase64 = await convertFileToBase64(file);
    const base64Data = fileBase64.split("base64,")[1];

    // Make API request
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageBase64: base64Data }),
    });

    if (!response.ok) {
      const error = await response.json();

      const errorMessage = error.message || "Failed to analyze celebrities.";
      return new Error(errorMessage);
    }

    const content = await response.json();

    return content;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to analyze celebrities.";
    return new Error(errorMessage);
  }
};
