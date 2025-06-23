
import { CustomerInfo } from './types';

export const validateCustomerInfo = (customerInfo: CustomerInfo): boolean => {
  const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'postalCode', 'city'];
  return required.every(field => customerInfo[field as keyof CustomerInfo].trim() !== '');
};

export const generateTransferReference = (vehicleId: string): string => {
  return `AGE-${vehicleId}-${Date.now().toString().slice(-6)}`;
};

export const calculateDepositAmount = (totalAmount: number): number => {
  return Math.round(totalAmount * 0.2);
};
