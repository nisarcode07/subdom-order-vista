
import React, { useState } from 'react';
import { CompanyConfig } from '../types';

interface DomainSwitcherProps {
  companies: CompanyConfig[];
  currentCompany: CompanyConfig;
}

const DomainSwitcher: React.FC<DomainSwitcherProps> = ({
  companies,
  currentCompany,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const changeCompany = (domain: string) => {
    // For local development, use query params
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      window.location.href = `${window.location.origin}?company=${domain}`;
      return;
    }
    
    // For production, use subdomains
    const hostParts = window.location.hostname.split('.');
    const domain = hostParts.slice(1).join('.');
    window.location.href = `https://${domain}.${domain}`;
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted"
      >
        <span>Switch Company</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-card shadow-lg z-10">
          <div className="p-1">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => {
                  if (company.id !== currentCompany.id) {
                    changeCompany(company.domain);
                  }
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2 w-full rounded-sm px-2 py-1.5 text-sm hover:bg-muted ${
                  company.id === currentCompany.id ? 'bg-muted' : ''
                }`}
              >
                <div className="h-5 w-5 relative overflow-hidden rounded-sm flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                <span>{company.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DomainSwitcher;
