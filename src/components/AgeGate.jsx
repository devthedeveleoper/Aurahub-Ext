import { useEffect } from 'react';

export default function AgeGate({ onConfirm }) {
  useEffect(() => {
    if (localStorage.getItem('is18plus') === 'false') {
      window.location.href = 'https://cat-bounce.com/';
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Are you 18+?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              localStorage.setItem('is18plus', 'true');
              onConfirm();
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Yes
          </button>
          <button
            onClick={() => {
              localStorage.setItem('is18plus', 'false');
              window.location.href = 'https://cat-bounce.com/';
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
