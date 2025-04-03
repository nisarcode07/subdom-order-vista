
import { useState } from 'react';
import { Order } from '../types';

export function useOrdersTable(initialOrders: Order[]) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });
  
  const ordersPerPage = 10;
  
  // Sort orders
  const sortedOrders = [...orders].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) {
      return 0;
    }
    
    const key = sortConfig.key;
    
    if (a[key] < b[key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  
  // Handle sorting
  const requestSort = (key: keyof Order) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      return setSortConfig({ key: null, direction: null });
    }
    
    setSortConfig({ key, direction });
  };
  
  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return {
    currentOrders,
    totalPages,
    currentPage,
    sortConfig,
    requestSort,
    paginate,
  };
}
