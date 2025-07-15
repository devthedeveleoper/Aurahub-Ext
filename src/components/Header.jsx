import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-950 shadow-md px-4 py-3 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-500">
        AuraHub
      </Link>
      <nav>
        <Link to="/upload" className="text-sm hover:underline text-gray-300">
          Upload
        </Link>
      </nav>
    </header>
  );
}
