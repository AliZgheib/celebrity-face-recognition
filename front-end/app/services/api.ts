import { CelebritiesData } from "../types/celebrity";
import { convertFileToBase64 } from "../utils/fileConverter";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public body?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const analyzeCelebrities = async (file: File): Promise<CelebritiesData> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    throw new ApiError("API URL is not configured. Please check your environment variables.");
  }

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

  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new ApiError(
      `HTTP error! status: ${response.status}`,
      response.status,
      errorText
    );
  }

  const content = await response.json();
  console.log("Success response:", content);
  
  return content;
};
