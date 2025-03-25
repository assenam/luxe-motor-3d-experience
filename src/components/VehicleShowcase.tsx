
import { useState, useEffect, useRef } from 'react';
import { Vehicle } from '@/lib/data';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface VehicleShowcaseProps {
  vehicle: Vehicle;
}

const VehicleShowcase = ({ vehicle }: VehicleShowcaseProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const rotateIntervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  // For a real implementation, this would use an actual 3D model with three.js
  // For now, we'll simulate rotation with multiple images
  useEffect(() => {
    if (autoRotate) {
      rotateIntervalRef.current = window.setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
      }, 2000);
    } else if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
    }
    
    return () => {
      if (rotateIntervalRef.current) {
        clearInterval(rotateIntervalRef.current);
      }
    };
  }, [autoRotate, vehicle.images.length]);
  
  const handleMouseDown = () => {
    setIsRotating(true);
    setAutoRotate(false);
  };
  
  const handleMouseUp = () => {
    setIsRotating(false);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRotating || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const containerWidth = rect.width;
    
    // Calculate which image to show based on mouse position
    const imageIndex = Math.floor((x / containerWidth) * vehicle.images.length);
    setCurrentImageIndex(Math.min(imageIndex, vehicle.images.length - 1));
  };
  
  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };
  
  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.5));
  };
  
  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 1));
  };
  
  return (
    <div className="relative h-[600px] bg-gradient-to-b from-luxe-marble to-white">
      <div 
        ref={containerRef}
        className="relative h-full cursor-grab overflow-hidden" 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {/* This would be a 3D model in a real implementation */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
          style={{ transform: `scale(${zoom})` }}
        >
          {vehicle.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${vehicle.brand} ${vehicle.model} view ${index}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col space-y-3">
          <button 
            onClick={toggleAutoRotate}
            className={`p-3 rounded-full backdrop-blur-sm ${
              autoRotate 
                ? 'bg-luxe-gold text-white' 
                : 'bg-white/80 text-luxe-black hover:bg-white'
            } transition-colors shadow-md`}
          >
            <RotateCw size={20} />
          </button>
          <button 
            onClick={zoomIn}
            className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-luxe-black hover:bg-white transition-colors shadow-md"
          >
            <ZoomIn size={20} />
          </button>
          <button 
            onClick={zoomOut}
            className="p-3 rounded-full bg-white/80 backdrop-blur-sm text-luxe-black hover:bg-white transition-colors shadow-md"
          >
            <ZoomOut size={20} />
          </button>
        </div>
        
        {/* Instructions */}
        <div className="absolute top-6 left-6 px-4 py-3 bg-white/80 backdrop-blur-sm rounded text-sm">
          Cliquez et faites glisser pour pivoter le véhicule
        </div>
      </div>
    </div>
  );
};

export default VehicleShowcase;
