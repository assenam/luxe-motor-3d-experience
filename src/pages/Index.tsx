
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HighlightsSection from '@/components/HighlightsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactUsSection from '@/components/ContactUsSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow page-top-padding">
        <HeroSection />
        <HighlightsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ContactUsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
