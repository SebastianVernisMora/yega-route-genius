import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, MapPin, Navigation, Clock, CheckCircle, Phone, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store/useStore';

// This should be the single source of truth for the Order type
interface Order {
  id: string;
  status: 'assignable' | 'en_route' | 'at_store' | 'picked_up' | 'delivered'; // Status now comes from the API
  pickup_address: string;
  delivery_address: string;
  route: {
    distance_meters: number;
    estimated_time_seconds: number;
    polyline: string;
  };
  created_at: string;
}

interface DeliveryRouteProps {
  order: Order;
}

// TODO: Move to a dedicated api/services file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const updateDeliveryStatus = async ({ orderId, status }: { orderId: string, status: string }): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/deliveries/${orderId}/${status}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ timestamp: new Date().toISOString() }), // Add proof later
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Failed to update delivery status' }));
    throw new Error(errorBody.message);
  }
  return response.json();
};


const DeliveryRoute = ({ order }: DeliveryRouteProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { actions } = useStore();
  const { clearOrder } = actions;

  const { mutate: updateStatus, isLoading } = useMutation(updateDeliveryStatus, {
    onSuccess: (data, variables) => {
      toast({
        title: `¡Pedido ${variables.status}! `,
        description: `El estado del pedido se ha actualizado.`,
      });
      if (variables.status === 'delivered') {
        queryClient.invalidateQueries(['assignableOrders']);
        clearOrder();
      } else {
        queryClient.invalidateQueries(['delivery', order.id]);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error en la actualización",
        description: error.message || "No se pudo actualizar el estado del pedido.",
        variant: "destructive",
      });
    },
  });

  const getStepConfig = () => {
    switch (order.status) {
      case 'en_route':
        return {
          title: 'Dirígete a la tienda',
          subtitle: `Recoge el pedido en ${order.pickup_address}`,
          buttonText: 'He llegado a la tienda',
          buttonAction: () => updateStatus({ orderId: order.id, status: 'arrive' }),
          showRoute: true,
          routeColor: 'primary'
        };
      case 'at_store':
        return {
          title: 'Recoge el paquete',
          subtitle: `Confirma que tienes el pedido correcto.`,
          buttonText: 'He recogido el paquete',
          buttonAction: () => updateStatus({ orderId: order.id, status: 'pickup' }),
          showRoute: false,
          routeColor: 'primary'
        };
      case 'picked_up':
        return {
          title: 'Dirígete al cliente',
          subtitle: `Entrega el pedido en ${order.delivery_address}`,
          buttonText: 'Pedido entregado',
          buttonAction: () => updateStatus({ orderId: order.id, status: 'deliver' }),
          showRoute: true,
          routeColor: 'primary'
        };
      case 'delivered':
        return {
          title: '¡Entrega completada!',
          subtitle: 'El pedido ha sido entregado exitosamente',
          buttonText: 'Buscar nuevo pedido',
          buttonAction: clearOrder,
          showRoute: false,
          routeColor: 'success'
        };
      default:
        // Fallback for assignable or any other status
        return {
          title: 'Preparando ruta...',
          subtitle: 'Espera un momento mientras calculamos los detalles.',
          buttonText: '...',
          buttonAction: () => {},
          showRoute: false,
          routeColor: 'muted'
        };
    }
  };

  const stepConfig = getStepConfig();
  const formatDistance = (meters: number) => `${(meters / 1000).toFixed(1)} km`;
  const formatTime = (seconds: number) => `${Math.round(seconds / 60)} min`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearOrder}
            className="text-muted-foreground hover:text-foreground"
            disabled={isDelivering}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">{stepConfig.title}</h1>
            <p className="text-sm text-muted-foreground">{stepConfig.subtitle}</p>
          </div>
          <div className="text-right">
            {/* TODO: Get earnings from API */}
            <p className="text-sm font-medium text-success">$XX.XX</p>
            <p className="text-xs text-muted-foreground">Ganancia</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="h-64 bg-surface-elevated relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-elevated">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Mapa de navegación</p>
              <p className="text-xs text-muted-foreground mt-1">
                {order.status === 'en_route' || order.status === 'picked_up'
                  ? `Ruta hacia ${order.status === 'en_route' ? 'la tienda' : 'el cliente'}`
                  : 'Ubicación actual'}
              </p>
            </div>
          </div>
        </div>
        
        {stepConfig.showRoute && (
          <>
            <div className="absolute bottom-16 left-8 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
              <div className="w-2 h-2 bg-background rounded-full" />
            </div>
            <div className={`absolute bottom-16 left-14 w-32 h-0.5 bg-${stepConfig.routeColor} opacity-60`} />
            <div className={`absolute bottom-14 right-8 w-6 h-6 bg-${stepConfig.routeColor} rounded-full flex items-center justify-center border-2 border-background animate-pulse`}>
              <MapPin className="w-3 h-3 text-background" />
            </div>
          </>
        )}
      </div>

      {/* Order Details */}
      <div className="p-4">
        <Card className="p-4 bg-surface border-border mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Pedido {order.id}</h3>
              <p className="text-sm text-muted-foreground">{order.pickup_address}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{formatTime(order.route.estimated_time_seconds)}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-elevated rounded-lg p-3">
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                🏠 {order.delivery_address}
              </p>
              <p className="text-xs text-muted-foreground">
                Distancia total: {formatDistance(order.route.distance_meters)}
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={stepConfig.buttonAction}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
            {stepConfig.buttonText}
          </Button>

          {order.status !== 'delivered' && (
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 h-10 border-border bg-surface hover:bg-surface-elevated"
                disabled={isLoading}
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-10 border-border bg-surface hover:bg-surface-elevated"
                disabled={isLoading}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Mensaje
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryRoute;