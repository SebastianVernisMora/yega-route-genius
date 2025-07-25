import { useState } from 'react';
import { ArrowLeft, MapPin, Navigation, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  earnings: string;
  storeName: string;
  storeDistance: string;
  deliveryZone: string;
  totalDistance: string;
  estimatedTime: string;
}

interface DeliveryRouteProps {
  order: Order;
  onBack: () => void;
}

const DeliveryRoute = ({ order, onBack }: DeliveryRouteProps) => {
  const [currentStep, setCurrentStep] = useState<'to_store' | 'at_store' | 'to_customer' | 'delivered'>('to_store');
  const { toast } = useToast();

  const handleArrivedAtStore = () => {
    setCurrentStep('at_store');
    toast({
      title: "¡Has llegado a la tienda!",
      description: "Recoge el pedido y confirma cuando esté listo",
    });
  };

  const handlePickedUpOrder = () => {
    setCurrentStep('to_customer');
    toast({
      title: "Pedido recogido",
      description: "Dirígete al cliente para la entrega",
    });
  };

  const handleDelivered = () => {
    setCurrentStep('delivered');
    toast({
      title: "¡Entrega completada!",
      description: `Has ganado ${order.earnings}`,
    });
  };

  const getStepConfig = () => {
    switch (currentStep) {
      case 'to_store':
        return {
          title: 'Dirígete a la tienda',
          subtitle: 'Recoge el pedido del comercio',
          buttonText: 'He llegado a la tienda',
          buttonAction: handleArrivedAtStore,
          showRoute: true,
          routeColor: 'warning'
        };
      case 'at_store':
        return {
          title: 'En la tienda',
          subtitle: 'Recoge el pedido y verifica el contenido',
          buttonText: 'Pedido recogido',
          buttonAction: handlePickedUpOrder,
          showRoute: false,
          routeColor: 'warning'
        };
      case 'to_customer':
        return {
          title: 'Dirígete al cliente',
          subtitle: 'Entrega el pedido en la dirección indicada',
          buttonText: 'Pedido entregado',
          buttonAction: handleDelivered,
          showRoute: true,
          routeColor: 'primary'
        };
      case 'delivered':
        return {
          title: '¡Entrega completada!',
          subtitle: 'El pedido ha sido entregado exitosamente',
          buttonText: 'Buscar nuevo pedido',
          buttonAction: onBack,
          showRoute: false,
          routeColor: 'success'
        };
    }
  };

  const stepConfig = getStepConfig();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">{stepConfig.title}</h1>
            <p className="text-sm text-muted-foreground">{stepConfig.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-success">{order.earnings}</p>
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
                {currentStep === 'to_store' ? 'Ruta a la tienda' : 
                 currentStep === 'to_customer' ? 'Ruta al cliente' : 'Ubicación actual'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Mock route visualization */}
        {stepConfig.showRoute && (
          <>
            {/* Origin marker */}
            <div className="absolute bottom-16 left-8 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
              <div className="w-2 h-2 bg-background rounded-full" />
            </div>
            
            {/* Route line */}
            <div className={`absolute bottom-16 left-14 w-32 h-0.5 bg-${stepConfig.routeColor} opacity-60`} />
            
            {/* Destination marker */}
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
              <p className="text-sm text-muted-foreground">{order.storeName}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{order.estimatedTime}</span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-2 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              ['at_store', 'to_customer', 'delivered'].includes(currentStep) 
                ? 'bg-success text-success-foreground' 
                : 'bg-warning text-warning-foreground'
            }`}>
              {['at_store', 'to_customer', 'delivered'].includes(currentStep) 
                ? <CheckCircle className="w-4 h-4" /> 
                : <MapPin className="w-4 h-4" />}
            </div>
            <div className={`flex-1 h-0.5 ${
              ['to_customer', 'delivered'].includes(currentStep) ? 'bg-success' : 'bg-muted'
            }`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'delivered' 
                ? 'bg-success text-success-foreground' 
                : ['to_customer'].includes(currentStep)
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-muted text-muted-foreground'
            }`}>
              {currentStep === 'delivered' 
                ? <CheckCircle className="w-4 h-4" />
                : <MapPin className="w-4 h-4" />}
            </div>
          </div>

          {/* Current destination info */}
          <div className="bg-surface-elevated rounded-lg p-3">
            {currentStep === 'to_store' || currentStep === 'at_store' ? (
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  🏪 {order.storeName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Distancia: {order.storeDistance}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-foreground mb-1">
                  🏠 {order.deliveryZone}
                </p>
                <p className="text-xs text-muted-foreground">
                  Distancia total: {order.totalDistance}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={stepConfig.buttonAction}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-medium"
          >
            {stepConfig.buttonText}
          </Button>

          {(currentStep === 'to_customer' || currentStep === 'delivered') && (
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 h-10 border-border bg-surface hover:bg-surface-elevated"
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar
              </Button>
              <Button
                variant="outline"
                className="flex-1 h-10 border-border bg-surface hover:bg-surface-elevated"
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