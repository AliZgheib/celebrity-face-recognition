import React from "react";

export const PageHeader: React.FC = () => {
  return (
    <div className="card-header">
      <h1 className="card-title">Celebrity Face Recognition</h1>
      <p className="card-subtitle">
        Upload a photo to detect celebrities using AWS Rekognition
      </p>
    </div>
  );
};
