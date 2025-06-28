
import React from 'react';
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepProps } from './types';

interface ConfirmationStepProps extends Pick<StepProps, 'selectedFile' | 'depositAmount' | 'onPrevious' | 'onSubmit' | 'isSubmitting'> {}

const ConfirmationStep = ({ selectedFile, depositAmount, onPrevious, onSubmit, isSubmitting }: ConfirmationStepProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-playfair font-semibold text-center mb-4">Confirmation</h2>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <span className="text-xs">Véhicule sélectionné</span>
            <Check className="text-green-600" size={16} />
          </div>
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <span className="text-xs">Informations personnelles renseignées</span>
            <Check className="text-green-600" size={16} />
          </div>
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <span className="text-xs">Instructions de paiement vues</span>
            <Check className="text-green-600" size={16} />
          </div>
          <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
            <span className="text-xs">Preuve de paiement ajoutée</span>
            {selectedFile ? <Check className="text-green-600" size={16} /> : <span className="text-green-600 text-xs">✓</span>}
          </div>
        </div>
        
        {!selectedFile && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-3">
            <div className="flex items-start">
              <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-xs text-blue-700">
                <p className="font-medium mb-1">Pas de preuve de paiement :</p>
                <p>Vous pourrez l'envoyer par email à contact@autogermanyexport.com après validation de votre commande.</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 p-2 rounded-lg mt-3">
          <p className="text-blue-800 font-medium text-xs">
            Votre commande sera traitée dès réception de votre virement de {depositAmount.toLocaleString()} €
          </p>
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
          onClick={onSubmit}
          disabled={isSubmitting}
          size="sm"
          className="bg-luxe-gold hover:bg-luxe-gold/90 text-black"
        >
          {isSubmitting ? "Validation..." : "Valider"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
