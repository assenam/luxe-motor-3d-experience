
import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-age">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Ce Que Disent Nos Clients</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="luxury-card p-6 rounded-sm">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <svg className="w-6 h-6 text-age-red" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/>
                </svg>
              </div>
              <blockquote className="flex-grow mb-4 text-gray-700 italic">
                "Service exceptionnel de bout en bout. J'ai pu trouver exactement le modèle que je cherchais à un prix très compétitif."
              </blockquote>
              <div className="mt-auto">
                <p className="font-semibold">Jean Dupont</p>
                <p className="text-sm text-gray-500">Paris, France</p>
              </div>
            </div>
          </div>
          
          <div className="luxury-card p-6 rounded-sm">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <svg className="w-6 h-6 text-age-red" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/>
                </svg>
              </div>
              <blockquote className="flex-grow mb-4 text-gray-700 italic">
                "L'importation de ma BMW s'est déroulée sans aucun souci. La documentation était parfaite et le véhicule est arrivé dans l'état promis."
              </blockquote>
              <div className="mt-auto">
                <p className="font-semibold">Marie Lefebvre</p>
                <p className="text-sm text-gray-500">Bruxelles, Belgique</p>
              </div>
            </div>
          </div>
          
          <div className="luxury-card p-6 rounded-sm">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <svg className="w-6 h-6 text-age-red" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/>
                </svg>
              </div>
              <blockquote className="flex-grow mb-4 text-gray-700 italic">
                "Je recommande vivement Auto Germany Export pour leur professionnalisme et leur réactivité. Prix imbattables pour des véhicules de qualité."
              </blockquote>
              <div className="mt-auto">
                <p className="font-semibold">Pierre Martin</p>
                <p className="text-sm text-gray-500">Lyon, France</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
