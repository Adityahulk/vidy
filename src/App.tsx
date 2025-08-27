import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LongToShortService from './pages/LongToShortService';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <Services />
            <Features />
            <Testimonials />
            <About />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/services/long-to-short-clips" element={<LongToShortService />} />
      </Routes>
    </div>
  );
}

export default App;