
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center py-4 border-b">
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step <= currentStep 
                ? 'bg-luxe-gold text-black' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step}
            </div>
            {step < totalSteps && (
              <div className={`w-4 h-0.5 ${
                step < currentStep ? 'bg-luxe-gold' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
