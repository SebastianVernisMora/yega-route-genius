import { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import DeliveryRoute from '@/components/DeliveryRoute';
import Registration from '@/components/Registration';
import VehicleDocuments from '@/components/VehicleDocuments';
import DriverProfile from '@/components/DriverProfile';
import Earnings from '@/components/Earnings';
import SplashScreen from '@/components/SplashScreen';
import AuthScreen from '@/components/AuthScreen';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
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

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const renderCurrentView = () => {
    if (!isAuthenticated) {
      return <AuthScreen onAuthenticated={handleAuthenticated} />;
    }

    if (showSplash) {
      return <SplashScreen onComplete={handleSplashComplete} />;
    }

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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      {/* Phone mockup container */}
      <div className="relative">
        {/* Phone frame */}
        <div className="w-[375px] h-[812px] bg-black rounded-[45px] p-2 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-background rounded-[35px] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[25px] bg-black rounded-b-2xl z-10"></div>
            {/* App content */}
            <div className="w-full h-full overflow-y-auto">
              {renderCurrentView()}
            </div>
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Index;
