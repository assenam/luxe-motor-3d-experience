
import { useState } from 'react';
import { Vehicle, getAllVehicleImages, getImagesByCategory } from '@/lib/data';
import { ChevronLeft, ChevronRight, X, Grid, Car, Home, Cog, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VehicleGalleryProps {
  vehicle: Vehicle;
  className?: string;
}

type GalleryCategory = 'all' | 'exterior' | 'interior' | 'engine' | 'details';

const VehicleGallery = ({ vehicle, className = '' }: VehicleGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');

  const getCurrentImages = () => {
    if (activeCategory === 'all') {
      return getAllVehicleImages(vehicle);
    }
    if (activeCategory === 'exterior' || activeCategory === 'interior' || activeCategory === 'engine' || activeCategory === 'details') {
      return getImagesByCategory(vehicle, activeCategory);
    }
    return [];
  };

  const currentImages = getCurrentImages();

  const categories = [
    { key: 'all' as const, label: 'Toutes', icon: Grid },
    { key: 'exterior' as const, label: 'Extérieur', icon: Car },
    { key: 'interior' as const, label: 'Intérieur', icon: Home },
    { key: 'engine' as const, label: 'Moteur', icon: Cog },
    { key: 'details' as const, label: 'Détails', icon: Eye },
  ];

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleCategoryChange = (category: GalleryCategory) => {
    setActiveCategory(category);
    setSelectedImageIndex(0);
  };

  if (currentImages.length === 0) {
    return (
      <div className={`${className} text-center py-8`}>
        <p className="text-gray-500">Aucune image disponible pour ce véhicule</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeCategory === key ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(key)}
            className="flex items-center gap-2"
          >
            <Icon size={16} />
            {label}
          </Button>
        ))}
      </div>

      {/* Main Image */}
      <div className="mb-4">
        <img
          src={currentImages[selectedImageIndex]}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="w-full h-80 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => openModal(selectedImageIndex)}
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {currentImages.map((image, index) => (
          <div
            key={index}
            className={`relative cursor-pointer rounded overflow-hidden ${
              index === selectedImageIndex ? 'ring-2 ring-luxe-gold' : ''
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <img
              src={image}
              alt={`${vehicle.brand} ${vehicle.model} ${index + 1}`}
              className="w-full h-16 object-cover hover:opacity-80 transition-opacity"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft size={32} />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight size={32} />
            </button>

            <img
              src={currentImages[selectedImageIndex]}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImageIndex + 1} / {currentImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleGallery;
