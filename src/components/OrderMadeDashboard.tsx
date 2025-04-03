
import React from 'react';
import { Order } from '../types';
import { useCompany } from '../hooks/useCompany';
import { useOrdersTable } from '../hooks/useOrdersTable';
import { mockOrders } from '../data/orders';
import CompanyHeader from './CompanyHeader';
import OrdersTable from './OrdersTable';
import Pagination from './Pagination';
import DomainSwitcher from './DomainSwitcher';

const OrderMadeDashboard: React.FC = () => {
  const { company, loading, allCompanies } = useCompany();
  const { 
    currentOrders, 
    totalPages, 
    currentPage, 
    sortConfig, 
    requestSort, 
    paginate 
  } = useOrdersTable(mockOrders);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle">
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Company Not Found</h1>
          <p className="mt-2">The requested company could not be found.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader company={company} />
      
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Orders</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            
            <DomainSwitcher companies={allCompanies} currentCompany={company} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <OrdersTable
            orders={currentOrders}
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
          
          <div className="border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
              primaryColor={company.primaryColor}
            />
          </div>
        </div>
      </main>
      
      <footer className="border-t mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 OrderMade. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:underline">Terms</a> · <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Support</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OrderMadeDashboard;
