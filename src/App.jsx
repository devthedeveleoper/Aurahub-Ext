import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
