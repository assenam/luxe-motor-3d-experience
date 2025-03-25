
import { formatCurrency, formatMileage, Vehicle } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ShieldCheck, Clock3, Calendar, Gauge, Fuel, Palette, LayoutGrid } from 'lucide-react';

interface VehicleDetailProps {
  vehicle: Vehicle;
}

const VehicleDetail = ({ vehicle }: VehicleDetailProps) => {
  return (
    <div className="py-12">
      <div className="container-luxe">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-3 bg-secondary/50">
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="features">Équipements</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="animate-fade-in">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="luxury-card p-5 flex flex-col items-center">
                      <Calendar className="text-luxe-gold mb-2" size={24} />
                      <span className="text-sm text-luxe-lightgray">Année</span>
                      <span className="font-medium">{vehicle.year}</span>
                    </div>
                    <div className="luxury-card p-5 flex flex-col items-center">
                      <Gauge className="text-luxe-gold mb-2" size={24} />
                      <span className="text-sm text-luxe-lightgray">Kilométrage</span>
                      <span className="font-medium">{formatMileage(vehicle.mileage)}</span>
                    </div>
                    <div className="luxury-card p-5 flex flex-col items-center">
                      <Fuel className="text-luxe-gold mb-2" size={24} />
                      <span className="text-sm text-luxe-lightgray">Moteur</span>
                      <span className="font-medium text-center text-sm">{vehicle.engineType}</span>
                    </div>
                    <div className="luxury-card p-5 flex flex-col items-center">
                      <LayoutGrid className="text-luxe-gold mb-2" size={24} />
                      <span className="text-sm text-luxe-lightgray">Transmission</span>
                      <span className="font-medium">{vehicle.transmission}</span>
                    </div>
                    <div className="luxury-card p-5 flex flex-col items-center">
                      <Palette className="text-luxe-gold mb-2" size={24} />
                      <span className="text-sm text-luxe-lightgray">Extérieur</span>
                      <span className="font-medium">{vehicle.exteriorColor}</span>
                    </div>
                    <div className="luxury-card p-5 flex flex-col items-center">
                      <Palette className="text-luxe-gold mb-2" size={24} />
                      <span className="text-sm text-luxe-lightgray">Intérieur</span>
                      <span className="font-medium">{vehicle.interiorColor}</span>
                    </div>
                  </div>
                  <div className="luxury-card p-6">
                    <h3 className="text-xl font-playfair font-semibold mb-3">Description</h3>
                    <p className="leading-relaxed text-luxe-black">{vehicle.description}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="animate-fade-in">
                <div className="luxury-card p-6">
                  <h3 className="text-xl font-playfair font-semibold mb-6">Équipements & Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          <Check size={18} className="text-luxe-gold" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="animate-fade-in">
                <div className="luxury-card p-6">
                  <div className="flex items-center mb-6">
                    <ShieldCheck size={24} className="text-luxe-gold mr-3" />
                    <h3 className="text-xl font-playfair font-semibold">Historique & Certification</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <p className="leading-relaxed">
                      Tous nos véhicules passent par un processus d'inspection rigoureux en 150 points et sont accompagnés d'un historique complet. Ce véhicule a été entretenu régulièrement avec un carnet d'entretien à jour.
                    </p>
                    
                    <div className="flex items-center py-3 border-b border-gray-200">
                      <Clock3 size={18} className="text-luxe-gold mr-3" />
                      <div>
                        <p className="font-medium">Dernier entretien: 12/01/2023</p>
                        <p className="text-sm text-luxe-lightgray">
                          Révision complète - {vehicle.brand} Service Center
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center py-3 border-b border-gray-200">
                      <Clock3 size={18} className="text-luxe-gold mr-3" />
                      <div>
                        <p className="font-medium">Entretien: 06/06/2022</p>
                        <p className="text-sm text-luxe-lightgray">
                          Maintenance programmée - {vehicle.brand} Service Center
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center py-3">
                      <Clock3 size={18} className="text-luxe-gold mr-3" />
                      <div>
                        <p className="font-medium">Livraison: 15/03/2021</p>
                        <p className="text-sm text-luxe-lightgray">
                          Première mise en circulation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:w-1/2">
            <div className="luxury-card p-6 mb-8">
              <h3 className="text-2xl font-playfair font-semibold mb-2">
                {formatCurrency(vehicle.price)}
              </h3>
              <p className="text-luxe-lightgray mb-6">Prix final, incluant service et garantie</p>
              
              <div className="space-y-4">
                <button className="premium-button w-full bg-luxe-gold hover:bg-luxe-gold/90 text-black">
                  Achetez maintenant
                </button>
                <button className="premium-button w-full bg-white border border-luxe-black hover:bg-secondary text-luxe-black">
                  Demander plus d'Informations
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium mb-4">Options de Financement</h4>
                <div className="luxury-card p-4 mb-3 bg-secondary/50">
                  <p className="font-medium mb-1">Mensualité estimée</p>
                  <p className="text-2xl font-playfair font-semibold gold-accent">1 450 €<span className="text-sm text-luxe-black font-normal">/mois</span></p>
                  <p className="text-xs text-luxe-lightgray mt-1">Basé sur un apport de 30% et 48 mensualités</p>
                </div>
                <p className="text-sm text-luxe-lightgray">
                  Contactez notre équipe de conseillers financiers pour une offre personnalisée
                </p>
              </div>
            </div>
            
            <div className="luxury-card p-6">
              <div className="flex items-center mb-4">
                <ShieldCheck size={20} className="text-luxe-gold mr-2" />
                <h3 className="font-medium">Garantie LuxeMotor</h3>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <Check size={16} className="text-luxe-gold mr-2 mt-1 flex-shrink-0" />
                  <span>Garantie 24 mois incluse</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-luxe-gold mr-2 mt-1 flex-shrink-0" />
                  <span>Assistance 24/7 dans toute l'Europe</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-luxe-gold mr-2 mt-1 flex-shrink-0" />
                  <span>Véhicule contrôlé sur 150 points</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-luxe-gold mr-2 mt-1 flex-shrink-0" />
                  <span>Service de livraison Conciergerie disponible</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-luxe-gold mr-2 mt-1 flex-shrink-0" />
                  <span>Satisfait ou Remboursé pendant 14 jours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
