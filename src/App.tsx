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
import VideoGenerationService from './pages/VideoGenerationService';
import DubbingService from './pages/DubbingService';
import LipSyncService from './pages/LipSyncService';
import AutoEditingService from './pages/AutoEditingService';
import CustomSolutionsService from './pages/CustomSolutionsService';

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
        <Route path="/services/ai-video-generation" element={<VideoGenerationService />} />
        <Route path="/services/ai-video-dubbing" element={<DubbingService />} />
        <Route path="/services/ai-lip-syncing" element={<LipSyncService />} />
        <Route path="/services/automated-editing" element={<AutoEditingService />} />
        <Route path="/services/custom-solutions" element={<CustomSolutionsService />} />
      </Routes>
    </div>
  );
}

export default App;