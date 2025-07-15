import React from 'react';

export default function AgeGate({ onConfirm }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Are you 18+?</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          You must be at least 18 years old to view this content.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Yes
          </button>
          <a
            href="https://http.cat/403"
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
          >
            No
          </a>
        </div>
      </div>
    </div>
  );
}


// https://cat-bounce.com/