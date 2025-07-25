import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import DeliveryRoute from '@/components/DeliveryRoute';

interface Order {
  id: string;
  earnings: string;
  storeName: string;
  storeDistance: string;
  deliveryZone: string;
  totalDistance: string;
  estimatedTime: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'delivery'>('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleAcceptOrder = (order: Order) => {
    setSelectedOrder(order);
    setCurrentView('delivery');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'dashboard' ? (
        <Dashboard onAcceptOrder={handleAcceptOrder} />
      ) : (
        selectedOrder && (
          <DeliveryRoute 
            order={selectedOrder} 
            onBack={handleBackToDashboard} 
          />
        )
      )}
    </div>
  );
};

export default Index;
