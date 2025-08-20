import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Clock, DollarSign, Navigation, Power, PowerOff, FileText, User, TrendingUp, Menu, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store/useStore';
import { handleApiError } from '@/lib/apiErrorHandler';

// TODO: Move to a dedicated types/interfaces file
interface Order {
  id: string;
  status: 'assignable';
  pickup_address: string;
  delivery_address: string;
  route: {
    distance_meters: number;
    estimated_time_seconds: number;
    polyline: string;
  };
  created_at: string;
}

// TODO: Move to a dedicated api/services file
// TODO: Use environment variables for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchAssignableOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/deliveries/assignable`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

interface DashboardProps {
  onAcceptOrder: (orderId: string) => void;
}

const Dashboard = ({ onAcceptOrder }: DashboardProps) => {
  const [isOnline, setIsOnline] = useState(false);
  const [todayEarnings] = useState("$0.00");
  const { toast } = useToast();
  const { actions } = useStore();
  const { setView } = actions;

  const {
    data: orders,
    isLoading,
    isError,
    error
  } = useQuery<Order[], Error>({
    queryKey: ['assignableOrders'],
    queryFn: fetchAssignableOrders,
    enabled: isOnline, // Only fetch when online
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const errorMessage = error
    ? handleApiError(error, {
        context: 'fetchAssignableOrders',
        defaultMessage:
          'No pudimos cargar los pedidos. Revisa tu conexión a internet.',
        isCritical: false,
      })
    : '';

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "Te has desconectado" : "¡Estás conectado!",
      description: isOnline ? "No recibirás nuevos pedidos" : "Ahora puedes recibir pedidos",
    });
  };

  const handleAcceptOrder = (order: Order) => {
    if (!isOnline) {
      toast({
        title: "Conecta tu estado",
        description: "Debes estar conectado para aceptar pedidos",
        variant: "destructive"
      });
      return;
    }
    onAcceptOrder(order.id);
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) return `${meters} m`;
    return `${(meters / 1000).toFixed(1)} km`;
  }

  const formatTime = (seconds: number) => {
    return `${Math.round(seconds / 60)} min`;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-success rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">Y</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">YEGA Repartidor</h1>
              <p className="text-sm text-muted-foreground">Hoy has ganado: {todayEarnings}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setView('profile')}>
              <Menu className="w-4 h-4" />
            </Button>
            <Button
              onClick={toggleOnlineStatus}
              variant={isOnline ? "default" : "secondary"}
              size="sm"
              className={`flex items-center space-x-2 ${
                isOnline 
                  ? "bg-success hover:bg-success/90 text-success-foreground" 
                  : "bg-inactive hover:bg-inactive/80 text-foreground"
              }`}
            >
              {isOnline ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
              <span className="font-medium">
                {isOnline ? "Conectado" : "Desconectado"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-48 bg-surface-elevated relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-elevated">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Mapa de pedidos disponibles</p>
              {!isOnline && (
                <p className="text-inactive text-xs mt-1">Conéctate para ver pedidos</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Mock markers */}
        {isOnline && orders && orders.length > 0 && (
          <>
            <div className="absolute top-12 left-8 w-4 h-4 bg-warning rounded-full animate-pulse border-2 border-background" />
            <div className="absolute top-20 right-12 w-4 h-4 bg-warning rounded-full animate-pulse border-2 border-background" />
            <div className="absolute bottom-16 left-16 w-4 h-4 bg-warning rounded-full animate-pulse border-2 border-background" />
          </>
        )}
      </div>

      {/* Orders Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Pedidos Disponibles
          </h2>
          <span className="text-sm text-muted-foreground">
            {isOnline ? `${orders?.length ?? 0} disponibles` : "Desconectado"}
          </span>
        </div>

        {!isOnline ? (
          <Card className="p-6 text-center bg-surface border-border">
            <PowerOff className="w-12 h-12 text-inactive mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Estás desconectado
            </h3>
            <p className="text-muted-foreground mb-4">
              Conéctate para empezar a recibir pedidos y ganar dinero
            </p>
            <Button 
              onClick={toggleOnlineStatus}
              className="bg-success hover:bg-success/90 text-success-foreground"
            >
              <Power className="w-4 h-4 mr-2" />
              Conectarse
            </Button>
          </Card>
        ) : isLoading ? (
          <div className="text-center p-6">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="mt-2 text-muted-foreground">Buscando pedidos...</p>
          </div>
        ) : isError ? (
          <Card className="p-6 text-center bg-destructive/10 border-destructive/50">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-3" />
            <h3 className="text-lg font-medium text-destructive mb-2">
              Error de conexión
            </h3>
            <p className="text-destructive/80">{errorMessage}</p>
          </Card>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card key={order.id} className="p-4 bg-surface border-border hover:bg-surface-elevated transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      {/* TODO: API should provide earnings */}
                      <p className="text-xl font-bold text-success">$XX.XX</p>
                      <p className="text-xs text-muted-foreground">Ganancia estimada</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Pedido</p>
                    <p className="text-sm font-medium text-foreground">{order.id}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Recoger en: {order.pickup_address}
                      </p>
                      {/* TODO: API should provide store distance */}
                      <p className="text-xs text-muted-foreground">X.X km</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Entregar en: {order.delivery_address}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Distancia total: {formatDistance(order.route.distance_meters)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{formatTime(order.route.estimated_time_seconds)}</span>
                  </div>
                  
                  <Button
                    onClick={() => handleAcceptOrder(order)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Aceptar pedido
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
           <Card className="p-6 text-center bg-surface border-border">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hay pedidos por ahora
            </h3>
            <p className="text-muted-foreground">
              Te notificaremos cuando haya un nuevo pedido disponible en tu zona.
            </p>
          </Card>
        )}

        {/* Quick Access Menu */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <Button
            variant="outline"
            onClick={() => setView('documents')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <FileText className="w-6 h-6 mb-2" />
            <span className="text-xs">Documentos</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setView('profile')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <User className="w-6 h-6 mb-2" />
            <span className="text-xs">Mi Perfil</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => setView('earnings')}
            className="flex flex-col items-center p-4 h-auto"
          >
            <TrendingUp className="w-6 h-6 mb-2" />
            <span className="text-xs">Ganancias</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
