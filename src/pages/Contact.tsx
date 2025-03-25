
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = window.innerHeight * 0.85;
        
        if (elementTop < elementVisible) {
          element.classList.add('animated');
        }
      });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., send to an API
    console.log('Form submitted:', formData);
    
    // Show success message
    toast.success('Message envoyé avec succès. Nous vous contacterons très rapidement.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="relative py-20 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1560179304-6fc1d8749b23?q=80&w=2000)' }}>
          <div className="container-luxe text-center text-white">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-6">
              Contactez <span className="gold-accent">Nos Experts</span>
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-white/80 text-lg">
              Notre équipe de conseillers dédiés est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet.
            </p>
          </div>
        </section>
        
        <section className="section-padding bg-white">
          <div className="container-luxe">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="animate-on-scroll">
                  <h2 className="text-3xl font-playfair font-semibold mb-8">
                    Informations de <span className="gold-accent">Contact</span>
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="bg-luxe-gold/10 p-4 rounded-full mr-4">
                        <MapPin className="text-luxe-gold" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Notre Adresse</h3>
                        <p className="text-luxe-lightgray">
                          23 Avenue Montaigne<br />
                          75008 Paris, France
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-luxe-gold/10 p-4 rounded-full mr-4">
                        <Phone className="text-luxe-gold" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Téléphone</h3>
                        <p className="text-luxe-lightgray">
                          +33 (0)1 43 59 78 20
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-luxe-gold/10 p-4 rounded-full mr-4">
                        <Mail className="text-luxe-gold" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Email</h3>
                        <p className="text-luxe-lightgray">
                          contact@luxemotor.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-luxe-gold/10 p-4 rounded-full mr-4">
                        <Clock className="text-luxe-gold" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1">Horaires d'Ouverture</h3>
                        <p className="text-luxe-lightgray">
                          Lundi - Vendredi: 10h - 19h<br />
                          Samedi: 10h - 18h<br />
                          Dimanche: Sur rendez-vous uniquement
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className="animate-on-scroll glass-panel p-8 shadow-xl">
                  <h2 className="text-2xl font-playfair font-semibold mb-6">
                    Envoyez-nous un <span className="gold-accent">Message</span>
                  </h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">Téléphone</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">Sujet</label>
                        <select 
                          id="subject" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="information">Demande d'information</option>
                          <option value="appointment">Prise de rendez-vous</option>
                          <option value="testdrive">Essai véhicule</option>
                          <option value="purchase">Achat véhicule</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                        rows={5} 
                        className="w-full px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                      ></textarea>
                    </div>
                    
                    <div className="text-right">
                      <Button type="submit" className="premium-button bg-luxe-black hover:bg-luxe-gray">
                        Envoyer le Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="h-96 mt-12">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2168180992087!2d2.3003639514486307!3d48.866929907927876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4eaa80c45%3A0x1aa79e8c366494a2!2sAvenue%20Montaigne%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1711369578428!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
