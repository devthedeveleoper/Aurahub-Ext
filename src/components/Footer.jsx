export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 mt-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 text-sm text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-white">AuraHub</span>. All rights reserved.
        </p>
        <p className="text-xs sm:text-sm mt-1">
          Built with <span className="text-red-400">❤️‍🔥</span> by <span className="font-medium text-white">Dev</span>
        </p>
      </div>
    </footer>
  );
}
