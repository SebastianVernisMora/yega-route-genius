import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import DeliveryRoute from '@/components/DeliveryRoute';
import Registration from '@/components/Registration';
import VehicleDocuments from '@/components/VehicleDocuments';
import DriverProfile from '@/components/DriverProfile';
import Earnings from '@/components/Earnings';

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
  const [currentView, setCurrentView] = useState<'registration' | 'dashboard' | 'delivery' | 'documents' | 'profile' | 'earnings'>('registration');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleAcceptOrder = (order: Order) => {
    setSelectedOrder(order);
    setCurrentView('delivery');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedOrder(null);
  };

  const handleCompleteRegistration = () => {
    setCurrentView('dashboard');
  };

  const handleNavigateToDocuments = () => {
    setCurrentView('documents');
  };

  const handleNavigateToProfile = () => {
    setCurrentView('profile');
  };

  const handleNavigateToEarnings = () => {
    setCurrentView('earnings');
  };

  const handleBackToMain = () => {
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'registration':
        return (
          <Registration 
            onComplete={handleCompleteRegistration}
            onBack={() => setCurrentView('registration')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard 
            onAcceptOrder={handleAcceptOrder}
            onNavigateToDocuments={handleNavigateToDocuments}
            onNavigateToProfile={handleNavigateToProfile}
            onNavigateToEarnings={handleNavigateToEarnings}
          />
        );
      case 'delivery':
        return selectedOrder && (
          <DeliveryRoute 
            order={selectedOrder} 
            onBack={handleBackToDashboard} 
          />
        );
      case 'documents':
        return <VehicleDocuments onBack={handleBackToMain} />;
      case 'profile':
        return <DriverProfile onBack={handleBackToMain} />;
      case 'earnings':
        return <Earnings onBack={handleBackToMain} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentView()}
    </div>
  );
};

export default Index;
