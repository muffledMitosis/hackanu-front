'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCloudUploadOutline, IoCameraOutline } from "react-icons/io5";

export default function SiteInfo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Access camera stream when "useCamera" is enabled
  useEffect(() => {
    if (useCamera) {
      const getCameraStream = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
        }
      };

      getCameraStream();
    }
  }, [useCamera]);

  // Capture a picture from the video stream
  const handleSnapPicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame on canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas image to a Blob object
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
        setSelectedFile(file);
        setUseCamera(false); // Close camera after capturing
      }, 'image/jpeg', 1);
    }
  };

  // Upload the captured or selected image
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setPredictionResult(result);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the image.');
    } finally {
      setIsLoading(false);
    }
  };

  if(predictionResult)
    console.log(predictionResult.risk_assessment_plan);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upload or Snap a Picture for Asbestos Detection</h1>

      <div className="mb-4">
        <Input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
      </div>

      <div className="mb-4">
        <Button onClick={() => setUseCamera(true)}>
          <IoCameraOutline className="mr-2" /> Use Camera
        </Button>
      </div>

      {useCamera && (
        <div className="mb-4">
          <video ref={videoRef} autoPlay className="w-full h-auto border rounded-md mb-2"></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <Button onClick={handleSnapPicture}>Snap Picture</Button>
        </div>
      )}

      <Button onClick={handleUpload} disabled={!selectedFile || isLoading}>
        {isLoading ? 'Processing...' : 'Upload and Predict'}
      </Button>

      {predictionResult && (
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-2">Prediction Result</h2>
          <p><strong>File Name:</strong> {predictionResult.filename}</p>
          <p><strong>Class Label:</strong> {predictionResult.class_label}</p>
          {/* <p><strong>Confidence Asbestos:</strong> {predictionResult.confidence_asbestos.toFixed(2)}%</p> */}
          {/* <p><strong>Confidence Non-Asbestos:</strong> {predictionResult.confidence_non_asbestos.toFixed(2)}%</p> */}
          {/* <p><strong>Risk Scale:</strong> {predictionResult.risk_scale}</p> */}
        </div>
      )}

      {predictionResult && (
        <div className='mt-12'>
          <div dangerouslySetInnerHTML={{ __html: predictionResult.risk_assessment_plan }}/>
        </div>
      )}
    </div>
  );
}