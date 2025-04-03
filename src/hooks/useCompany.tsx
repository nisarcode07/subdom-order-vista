
import { useState, useEffect } from 'react';
import { CompanyConfig } from '../types';
import { getCompanyBySubdomain, companies } from '../data/companies';

export function useCompany() {
  const [company, setCompany] = useState<CompanyConfig | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Function to extract subdomain from hostname
    const getSubdomain = (): string | null => {
      const hostname = window.location.hostname;
      
      // For local development with query param simulation
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        const params = new URLSearchParams(window.location.search);
        const companyParam = params.get('company');
        return companyParam;
      }
      
      // For production environment
      const parts = hostname.split('.');
      if (parts.length > 2) {
        return parts[0];
      }
      return null;
    };
    
    const subdomain = getSubdomain();
    const companyData = getCompanyBySubdomain(subdomain);
    setCompany(companyData);
    setLoading(false);
    
    // Update document title
    if (companyData) {
      document.title = `${companyData.name} | OrderMade`;
    }
  }, []);
  
  return { company, loading, allCompanies: companies };
}
