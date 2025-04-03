
import React from 'react';
import { CompanyConfig } from '../types';
import { cn } from '@/lib/utils';

interface CompanyHeaderProps {
  company: CompanyConfig;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ company }) => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b animate-fade-in">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 relative overflow-hidden rounded-md flex items-center justify-center">
            <img
              src={company.logo}
              alt={`${company.name} logo`}
              className="h-full w-full object-contain"
              onError={(e) => {
                // Fallback to placeholder if logo fails to load
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{company.name}</h1>
            <p className="text-sm text-muted-foreground">Order Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-2">
            <button
              style={{ backgroundColor: company.primaryColor }}
              className={cn(
                "text-white px-4 py-2 rounded-md text-sm font-medium transition-all",
                "hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50",
                `focus:ring-[${company.primaryColor}]`
              )}
            >
              + New Order
            </button>
          </div>
          
          <button className="border rounded-full p-2 hover:bg-muted/50">
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default CompanyHeader;
