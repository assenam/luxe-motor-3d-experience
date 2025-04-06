
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactUsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-age">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Contactez-Nous</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Besoin d'Assistance?</h3>
            <p className="text-gray-600 mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions concernant nos véhicules, 
              le processus d'achat ou l'importation. N'hésitez pas à nous contacter.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-age-red mr-4 mt-1 flex-shrink-0" />
                <p className="text-gray-600">
                  KarolinenstraB 6<br />
                  96049 Bamberg, Hamburg, Germany
                </p>
              </div>
              
              <div className="flex items-center">
                <Phone className="text-age-red mr-4 flex-shrink-0" />
                <p className="text-gray-600">+39 350 999 4001</p>
              </div>
              
              <div className="flex items-center">
                <Mail className="text-age-red mr-4 flex-shrink-0" />
                <p className="text-gray-600">birgittscheslog99@gmail.com</p>
              </div>
            </div>
          </div>
          
          <div>
            <form className="space-y-6 bg-white p-8 shadow-md rounded-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-age-red/30"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-age-red/30"
                    placeholder="Votre email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-age-red/30"
                  placeholder="Sujet de votre message"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-age-red/30"
                  placeholder="Votre message"
                ></textarea>
              </div>
              
              <Button className="bg-age-red hover:bg-age-darkred text-white w-full py-6">
                Envoyer le Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
