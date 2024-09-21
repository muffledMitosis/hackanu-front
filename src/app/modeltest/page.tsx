'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function ModelTest() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
    setPredictionResult(null); // Reset prediction when a new file is selected
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
			console.log(result);
      setPredictionResult(result);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Upload an Image for Asbestos Detection
      </h1>

      <div className="mb-4">
        <Input type="file" accept="image/*" onChange={handleFileInput} />
      </div>

      <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
        {isLoading ? 'Processing...' : 'Upload and Predict'}
      </Button>

      {predictionResult && (
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Prediction Result</h2>
          <p><strong>File Name:</strong> {predictionResult.filename}</p>
          <p><strong>Class Label:</strong> {predictionResult.class_label}</p>
          <p><strong>Confidence Asbestos:</strong> {predictionResult.confidence_asbestos.toFixed(2)}%</p>
          <p><strong>Confidence Non-Asbestos:</strong> {predictionResult.confidence_non_asbestos.toFixed(2)}%</p>
          <p><strong>Risk Scale:</strong> {predictionResult.risk_scale}</p>
        </div>
      )}
    </div>
  );
}