export default function Header() {
  return (
    <header className="bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">AuraHub</h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">Home</a>
          <a href="#" className="text-gray-300 hover:text-white">About</a>
          <a href="#" className="text-gray-300 hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}
