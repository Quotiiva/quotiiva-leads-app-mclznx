
export interface SalesProfessional {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dealership: string;
  createdAt: Date;
}

export interface Lead {
  id: string;
  salesProfessionalId: string;
  marketingRepFirstName: string;
  marketingRepLastName: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleVin: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleMileage: string;
  customerConsent: boolean;
  images: string[];
  createdAt: Date;
  status: 'pending' | 'processed' | 'paid';
  referralFee: number;
}

export interface LeadStats {
  totalLeads: number;
  weeklyLeads: number;
  monthlyLeads: number;
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
}
