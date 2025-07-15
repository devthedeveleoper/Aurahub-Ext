import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
