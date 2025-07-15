import { Link } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="bg-gray-950 shadow-md px-4 py-3 text-white flex justify-between items-center transition-colors duration-300">
      <Link
        to="/"
        className="text-xl font-bold text-blue-400 hover:text-blue-500 transition-colors duration-200"
      >
        AuraHub
      </Link>
      <nav>
        <Link
          to="/upload"
          className="flex items-center gap-1 text-sm text-gray-300 hover:text-white hover:underline transition-all duration-200"
        >
          <FiUpload className="text-base" />
          Upload
        </Link>
      </nav>
    </header>
  );
}
