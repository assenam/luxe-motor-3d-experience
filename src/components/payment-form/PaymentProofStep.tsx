
import React from 'react';
import { ArrowLeft, ArrowRight, Upload, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepProps } from './types';

interface PaymentProofStepProps extends Pick<StepProps, 'selectedFile' | 'onNext' | 'onPrevious' | 'onFileChange' | 'customerInfo'> {}

const PaymentProofStep = ({ selectedFile, onNext, onPrevious, onFileChange, customerInfo }: PaymentProofStepProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-playfair font-semibold text-center mb-4">Preuve de paiement</h2>
        
        <div className="mb-4">
          <label htmlFor="paymentProof" className="block font-medium mb-2 text-sm">
            Téléchargez votre preuve de paiement (optionnel)
          </label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50">
            <Upload className="mx-auto h-6 w-6 text-gray-400 mb-2" />
            <div className="space-y-1">
              <p className="text-gray-600 text-xs">
                Formats acceptés : PDF, JPG, PNG
              </p>
              <p className="text-xs text-gray-500">
                Cliquez ou glissez votre fichier ici
              </p>
              {selectedFile && (
                <p className="text-green-600 font-medium mt-2 flex items-center justify-center text-xs">
                  <Check size={14} className="mr-1" />
                  {selectedFile.name}
                </p>
              )}
            </div>
            <input
              id="paymentProof"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={onFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
          <div className="flex items-start">
            <Mail className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-xs text-blue-700">
              <p className="font-medium mb-1">Alternative :</p>
              <p>Vous pouvez aussi envoyer votre preuve de paiement par email à :</p>
              <p className="font-medium">contact@autogermanyexport.com</p>
              <p className="mt-1">En précisant votre nom : {customerInfo?.firstName} {customerInfo?.lastName}</p>
            </div>
          </div>
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
          Continuer
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default PaymentProofStep;
