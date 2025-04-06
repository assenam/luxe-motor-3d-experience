import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import ContactUs from '@/components/ContactUs';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow page-top-padding">
        <Hero />
        <Highlights />
        <WhyChooseUs />
        <Testimonials />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
