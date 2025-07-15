export default function Footer() {
  return (
    <footer className="bg-gray-800 mt-10">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} AuraHub. All rights reserved.
        <div className="mt-2">
          <p>Built with ❤️‍🔥 by Dev</p>
        </div>
      </div>
    </footer>
  );
}
