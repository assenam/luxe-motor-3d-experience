
import { Vehicle } from '@/lib/data';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface StepPaymentFormProps {
  vehicle: Vehicle;
}

export interface StepProps {
  vehicle: Vehicle;
  customerInfo: CustomerInfo;
  selectedFile: File | null;
  depositAmount: number;
  totalAmount: number;
  transferReference: string;
  onNext: () => void;
  onPrevious: () => void;
  onCustomerInfoChange: (field: keyof CustomerInfo, value: string) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}
