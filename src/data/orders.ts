
import { Order } from '../types';

// Generate 30 mock orders for the demo
export const generateOrders = (): Order[] => {
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const orders: Order[] = [];
  
  for (let i = 1; i <= 30; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomItems = Math.floor(Math.random() * 5) + 1;
    const randomAmount = +(Math.random() * 500 + 10).toFixed(2);
    
    orders.push({
      id: `order-${i}`,
      orderNumber: `ORD-${10000 + i}`,
      customerName: `Customer ${i}`,
      amount: randomAmount,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: randomStatus,
      items: randomItems,
      address: `${Math.floor(Math.random() * 1000) + 1} Main St, City ${i}, Country`
    });
  }
  
  return orders;
};

// Mock orders data
export const mockOrders = generateOrders();
