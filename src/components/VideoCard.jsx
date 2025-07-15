import React, { useEffect, useState } from 'react';

const FALLBACK_IMAGE = '/fallback.gif'; // Ensure fallback.gif is in public/
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export default function VideoCard({ video, refProp }) {
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem(`thumb_${video.linkid}`);
    if (cached) {
      setThumbnail(cached);
    } else {
      fetch(`${BASE_API_URL}/api/thumbnail?file=${video.linkid}`)
        .then((res) => res.json())
        .then((data) => {
          const url = data?.result;
          setThumbnail(url);
          localStorage.setItem(`thumb_${video.linkid}`, url);
        })
        .catch(() => setThumbnail(FALLBACK_IMAGE));
    }
  }, [video.linkid]);

  return (
    <div
      ref={refProp}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={thumbnail || FALLBACK_IMAGE}
        alt={video.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate text-gray-900 dark:text-gray-100">
          {video.name}
        </h2>
        <a
          href={video.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Watch Video
        </a>
      </div>
    </div>
  );
}
