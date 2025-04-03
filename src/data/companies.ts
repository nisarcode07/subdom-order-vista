
import { CompanyConfig } from '../types';

// This would typically come from an API or database
export const companies: CompanyConfig[] = [
  {
    id: 'daraz',
    name: 'Daraz',
    logo: '/logos/daraz.png', 
    primaryColor: '#F85606',
    secondaryColor: '#EB4D4B',
    domain: 'daraz'
  },
  {
    id: 'foodpanda',
    name: 'FoodPanda',
    logo: '/logos/foodpanda.png',
    primaryColor: '#D70F64',
    secondaryColor: '#F06292',
    domain: 'foodpanda'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '/logos/amazon.png',
    primaryColor: '#FF9900',
    secondaryColor: '#146EB4',
    domain: 'amazon'
  },
  {
    id: 'default',
    name: 'OrderMade',
    logo: '/logos/ordermade.png',
    primaryColor: '#3B82F6',
    secondaryColor: '#0F172A',
    domain: 'ordermade'
  }
];

// Function to get company by subdomain
export const getCompanyBySubdomain = (subdomain: string | null): CompanyConfig => {
  if (!subdomain) return companies.find(c => c.id === 'default') || companies[3];
  
  const company = companies.find(c => c.domain === subdomain);
  return company || companies.find(c => c.id === 'default') || companies[3];
};
