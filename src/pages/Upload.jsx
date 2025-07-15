import React, { useState, useRef } from 'react';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export default function UploadPage() {
  const [uploadUrl, setUploadUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState('');
  const [remainingTime, setRemainingTime] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    try {
      const res = await fetch(`${BASE_API_URL}/api/upload-url`);
      const data = await res.json();
      const url = data.result.url;

      setUploadUrl(url);
      const formData = new FormData();
      formData.append('file1', file);

      let lastLoaded = 0;
      let lastTime = Date.now();

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100;
          setUploadProgress(Math.round(percent));

          const now = Date.now();
          const timeElapsed = (now - lastTime) / 1000; // seconds
          const bytesUploaded = e.loaded - lastLoaded;

          if (timeElapsed > 0) {
            const speed = bytesUploaded / timeElapsed; // bytes/sec
            setUploadSpeed((speed / 1024).toFixed(2) + ' KB/s');

            const remainingBytes = e.total - e.loaded;
            const timeRemaining = remainingBytes / speed;
            setRemainingTime(formatTime(timeRemaining));
          }

          lastLoaded = e.loaded;
          lastTime = now;
        }
      };

      xhr.onload = () => {
        const response = JSON.parse(xhr.responseText);
        setUploadedUrl(response.result?.url || '');
      };

      xhr.onerror = () => {
        alert('Upload failed');
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      alert('Failed to get upload URL');
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}m ${sec}s`;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return (
    <div
      className="max-w-xl mx-auto mt-10 p-6 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-lg"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Upload Video</h1>

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? 'border-blue-500 bg-blue-50 dark:bg-gray-800' : 'border-gray-300'
        }`}
        onClick={() => fileInputRef.current.click()}
      >
        <p className="text-gray-700 dark:text-gray-300">Drag & drop a file here or click to upload</p>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>

      {uploadProgress > 0 && (
        <div className="mt-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Progress: {uploadProgress}% — Speed: {uploadSpeed} — Time left: {remainingTime}
          </div>
        </div>
      )}

      {uploadedUrl && (
        <div className="mt-4 text-green-600 dark:text-green-400">
          <p className="font-semibold">Upload successful!</p>
          <a href={uploadedUrl} target="_blank" rel="noreferrer" className="underline break-all">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
