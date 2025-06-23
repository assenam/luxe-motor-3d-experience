
import React from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepProps } from './types';

interface CustomerInfoStepProps extends Pick<StepProps, 'customerInfo' | 'onNext' | 'onPrevious' | 'onCustomerInfoChange'> {}

const CustomerInfoStep = ({ customerInfo, onNext, onPrevious, onCustomerInfoChange }: CustomerInfoStepProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-playfair font-semibold text-center mb-4">Informations personnelles</h2>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <Label htmlFor="firstName" className="text-xs">Prénom *</Label>
            <Input
              id="firstName"
              value={customerInfo.firstName}
              onChange={(e) => onCustomerInfoChange('firstName', e.target.value)}
              className="h-8 text-xs"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-xs">Nom *</Label>
            <Input
              id="lastName"
              value={customerInfo.lastName}
              onChange={(e) => onCustomerInfoChange('lastName', e.target.value)}
              className="h-8 text-xs"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <Label htmlFor="email" className="text-xs">Email *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => onCustomerInfoChange('email', e.target.value)}
            className="h-8 text-xs"
            required
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="phone" className="text-xs">Téléphone *</Label>
          <Input
            id="phone"
            type="tel"
            value={customerInfo.phone}
            onChange={(e) => onCustomerInfoChange('phone', e.target.value)}
            className="h-8 text-xs"
            required
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="address" className="text-xs">Adresse de livraison *</Label>
          <Input
            id="address"
            value={customerInfo.address}
            onChange={(e) => onCustomerInfoChange('address', e.target.value)}
            className="h-8 text-xs"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <Label htmlFor="postalCode" className="text-xs">Code postal *</Label>
            <Input
              id="postalCode"
              value={customerInfo.postalCode}
              onChange={(e) => onCustomerInfoChange('postalCode', e.target.value)}
              className="h-8 text-xs"
              required
            />
          </div>
          <div>
            <Label htmlFor="city" className="text-xs">Ville *</Label>
            <Input
              id="city"
              value={customerInfo.city}
              onChange={(e) => onCustomerInfoChange('city', e.target.value)}
              className="h-8 text-xs"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <Label htmlFor="country" className="text-xs">Pays *</Label>
          <Input
            id="country"
            value={customerInfo.country}
            onChange={(e) => onCustomerInfoChange('country', e.target.value)}
            className="h-8 text-xs"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <Button
          onClick={onPrevious}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          <ArrowLeft size={14} className="mr-1" />
          Précédent
        </Button>
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

export default CustomerInfoStep;
