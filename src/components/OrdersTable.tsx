
import React from 'react';
import { Order, OrderStatus } from '../types';
import { cn } from '@/lib/utils';

interface OrdersTableProps {
  orders: Order[];
  sortConfig: {
    key: keyof Order | null;
    direction: 'asc' | 'desc' | null;
  };
  requestSort: (key: keyof Order) => void;
}

const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    processing: "bg-blue-100 text-blue-800 border-blue-200",
    shipped: "bg-purple-100 text-purple-800 border-purple-200",
    delivered: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-full text-xs font-medium border",
      statusStyles[status]
    )}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  sortConfig,
  requestSort,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getSortIcon = (key: keyof Order) => {
    if (sortConfig.key !== key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
          <path d="m7 15 5 5 5-5"></path>
          <path d="m7 9 5-5 5 5"></path>
        </svg>
      );
    }
    
    if (sortConfig.direction === 'asc') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 15 5 5 5-5"></path>
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 9 5-5 5 5"></path>
      </svg>
    );
  };

  return (
    <div className="w-full overflow-auto animate-fade-in">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/40">
            <th 
              className="py-3 px-4 text-left text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => requestSort('orderNumber')}
            >
              <div className="flex items-center gap-1">
                Order # {getSortIcon('orderNumber')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => requestSort('customerName')}
            >
              <div className="flex items-center gap-1">
                Customer {getSortIcon('customerName')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => requestSort('date')}
            >
              <div className="flex items-center gap-1">
                Date {getSortIcon('date')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => requestSort('amount')}
            >
              <div className="flex items-center gap-1">
                Amount {getSortIcon('amount')}
              </div>
            </th>
            <th 
              className="py-3 px-4 text-left text-sm font-medium text-muted-foreground cursor-pointer"
              onClick={() => requestSort('status')}
            >
              <div className="flex items-center gap-1">
                Status {getSortIcon('status')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-6 text-center text-muted-foreground">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <td className="py-3 px-4 text-sm font-medium">
                  {order.orderNumber}
                </td>
                <td className="py-3 px-4 text-sm">
                  {order.customerName}
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {formatDate(order.date)}
                </td>
                <td className="py-3 px-4 text-sm font-medium">
                  {formatCurrency(order.amount)}
                </td>
                <td className="py-3 px-4 text-sm">
                  <OrderStatusBadge status={order.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
