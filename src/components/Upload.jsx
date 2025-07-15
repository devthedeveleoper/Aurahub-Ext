import React, { useState } from 'react';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploadURL, setUploadURL] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setStatus('Fetching upload URL...');

    try {
      const res = await fetch(`${BASE_API_URL}/api/get-upload-url`);
      const data = await res.json();

      if (!data.result?.url) {
        setStatus('Failed to get upload URL.');
        setLoading(false);
        return;
      }

      const uploadUrl = data.result.url;
      setUploadURL(uploadUrl);
      setStatus('Uploading file...');

      const formData = new FormData();
      formData.append('file1', file);

      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (uploadRes.ok) {
        setStatus('✅ Upload successful!');
      } else {
        setStatus('❌ Upload failed.');
      }
    } catch (err) {
      setStatus('❌ Error during upload.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">Upload Video</h1>

      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4 bg-gray-700 text-white p-2 rounded"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 px-4 py-2 rounded w-full transition"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {status && (
          <div className="mt-4 text-sm text-gray-300">
            <strong>Status:</strong> {status}
          </div>
        )}
      </div>
    </div>
  );
}
