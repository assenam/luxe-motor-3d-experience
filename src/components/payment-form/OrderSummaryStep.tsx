
import React from 'react';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepProps } from './types';

interface OrderSummaryStepProps extends Pick<StepProps, 'vehicle' | 'totalAmount' | 'depositAmount' | 'onNext'> {}

const OrderSummaryStep = ({ vehicle, totalAmount, depositAmount, onNext }: OrderSummaryStepProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-playfair font-semibold text-center mb-4">Résumé de votre commande</h2>
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={vehicle.mainImage || vehicle.images[0]} 
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-12 h-12 object-cover rounded" 
          />
          <div>
            <h3 className="font-semibold text-base">{vehicle.brand} {vehicle.model}</h3>
            <p className="text-gray-600 text-xs">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
          </div>
        </div>
        
        <div className="space-y-2 border-t pt-3">
          <div className="flex justify-between">
            <span className="font-medium text-sm">Montant total</span>
            <span className="font-bold text-sm">{totalAmount.toLocaleString()} €</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span className="font-medium text-sm">Acompte à payer (20%)</span>
            <span className="font-bold text-lg">{depositAmount.toLocaleString()} €</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <Button
          onClick={onNext}
          size="sm"
          className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
        >
          Suivant
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryStep;
