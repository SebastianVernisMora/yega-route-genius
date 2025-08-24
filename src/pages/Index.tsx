import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store/useStore';
import PedidosDashboard from '@/components/PedidosDashboard';
import DeliveryRoute from '@/components/DeliveryRoute';
import Registration from '@/components/Registration';
import VehicleDocuments from '@/components/VehicleDocuments';
import DriverProfile from '@/components/DriverProfile';
import Earnings from '@/components/Earnings';
import SplashScreen from '@/components/SplashScreen';
import AuthScreen from '@/components/AuthScreen';

// The Order type is now managed in the store, but we might need it here for mutations
interface Order {
  id: string;
  status: 'assignable' | 'en route' | 'delivered';
  pickup_address: string;
  delivery_address: string;
  route: {
    distance_meters: number;
    estimated_time_seconds: number;
    polyline: string;
  };
  created_at: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const takeOrder = async (orderId: string): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/deliveries/${orderId}/take`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timestamp: new Date().toISOString() }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Failed to take order' }));
    throw new Error(errorData.message || 'Failed to take order');
  }
  return response.json();
};

const Index = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State is now managed by Zustand
  const { isAuthenticated, currentView, selectedOrder, actions } = useStore();
  const { setView, selectOrder, clearOrder, login } = actions;

  const { mutate: acceptOrder, isLoading: isAcceptingOrder } = useMutation({
    mutationFn: takeOrder,
    onSuccess: (data) => {
      toast({
        title: "¡Pedido aceptado!",
        description: "Dirígete al punto de recogida.",
      });
      selectOrder(data); // This now also handles setting the view
      queryClient.invalidateQueries({ queryKey: ['assignableOrders'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error al aceptar",
        description: error.message || "No se pudo aceptar el pedido.",
        variant: "destructive",
      });
    },
  });

  const renderCurrentView = () => {
    // Handle initial splash screen
    if (currentView === 'splash') {
      return <SplashScreen onComplete={() => setView(isAuthenticated ? 'dashboard' : 'auth')} />;
    }

    if (!isAuthenticated) {
      // Unauthenticated users can only see auth or registration
      switch (currentView) {
        case 'auth':
          return <AuthScreen />;
        case 'registration':
          return <Registration onComplete={() => setView('dashboard')} onBack={() => setView('auth')} />;
        default:
          return <AuthScreen />;
      }
    }

    // Authenticated users see the main app views
    switch (currentView) {
      case 'dashboard':
        return <PedidosDashboard
            onAcceptOrder={acceptOrder}
          />;
      case 'delivery':
        return selectedOrder && <DeliveryRoute order={selectedOrder} />;
      case 'documents':
        return <VehicleDocuments onBack={() => setView('dashboard')} />;
      case 'profile':
        return <DriverProfile onBack={() => setView('dashboard')} />;
      case 'earnings':
        return <Earnings onBack={() => setView('dashboard')} />;
      default:
        // Fallback to dashboard for any other authenticated state
        return <PedidosDashboard
            onAcceptOrder={acceptOrder}
          />;
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
             {isAcceptingOrder && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                <div className="bg-background p-4 rounded-lg flex items-center space-x-2">
                  <p>Aceptando pedido...</p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[134px] h-[5px] bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Index;
