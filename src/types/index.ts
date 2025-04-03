
// Company configuration type
export interface CompanyConfig {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor?: string;
  domain: string;
}

// Order status type
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Order type
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  date: string;
  status: OrderStatus;
  items: number;
  address: string;
}
