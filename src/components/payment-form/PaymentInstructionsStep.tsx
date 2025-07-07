
import React from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepProps } from './types';

interface PaymentInstructionsStepProps extends Pick<StepProps, 'depositAmount' | 'transferReference' | 'onNext' | 'onPrevious'> {}

const PaymentInstructionsStep = ({ depositAmount, transferReference, onNext, onPrevious }: PaymentInstructionsStepProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-playfair font-semibold text-center mb-4">Instructions de paiement</h2>
        
        <div className="bg-blue-50 p-3 rounded-lg mb-3">
          <p className="text-blue-800 font-medium mb-1 text-xs">
            💳 Effectuez le virement de <strong>{depositAmount.toLocaleString()} €</strong>
          </p>
          <p className="text-blue-700 text-xs">
            Référence obligatoire : <strong>{transferReference}</strong>
          </p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">Bénéficiaire :</span>
            <span className="font-medium">Matera Marco</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">IBAN :</span>
            <span className="font-mono text-xs">IT43D3608105138269139769151</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">BIC :</span>
            <span className="font-mono">PPAYITR1XXX</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type :</span>
            <span className="font-medium">BONIFICO ISTANTANEO</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Motif :</span>
            <span className="font-medium">REGOLAMENTO DEL SERVIZIO</span>
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
          Suivant
          <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default PaymentInstructionsStep;
