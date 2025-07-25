import { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EarningsProps {
  onBack: () => void;
}

const Earnings = ({ onBack }: EarningsProps) => {
  const [earningsData] = useState({
    today: { gross: 325.50, commission: 48.83, net: 276.67, deliveries: 12 },
    week: { gross: 1850.25, commission: 277.54, net: 1572.71, deliveries: 67 },
    month: { gross: 7240.80, commission: 1086.12, net: 6154.68, deliveries: 254 }
  });

  const [recentPayments] = useState([
    { id: 1, date: '2024-01-22', amount: 276.67, status: 'paid', type: 'weekly' },
    { id: 2, date: '2024-01-15', amount: 1452.30, status: 'paid', type: 'weekly' },
    { id: 3, date: '2024-01-08', amount: 1823.45, status: 'paid', type: 'weekly' },
    { id: 4, date: '2024-01-01', amount: 987.20, status: 'pending', type: 'weekly' }
  ]);

  const [commissionBreakdown] = useState({
    platform: 15, // YEGA commission %
    payment: 2.5, // Payment processing
    insurance: 1.5, // Insurance coverage
    taxes: 3 // Tax withholding
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    return status === 'paid' 
      ? 'bg-success/20 text-success border-success/30'
      : 'bg-warning/20 text-warning border-warning/30';
  };

  const getStatusText = (status: string) => {
    return status === 'paid' ? 'Pagado' : 'Pendiente';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-surface border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Mis Ganancias</h1>
            <p className="text-sm text-muted-foreground">Historial y comisiones</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="today" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Hoy</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mes</TabsTrigger>
          </TabsList>

          {/* Today Tab */}
          <TabsContent value="today" className="space-y-4">
            <Card className="p-6 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-success">
                  {formatCurrency(earningsData.today.net)}
                </p>
                <p className="text-muted-foreground">Ganancia neta de hoy</p>
                <p className="text-sm text-muted-foreground">
                  {earningsData.today.deliveries} entregas completadas
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(earningsData.today.gross)}
                  </p>
                  <p className="text-xs text-muted-foreground">Ganancia bruta</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-destructive">
                    -{formatCurrency(earningsData.today.commission)}
                  </p>
                  <p className="text-xs text-muted-foreground">Comisiones</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Week Tab */}
          <TabsContent value="week" className="space-y-4">
            <Card className="p-6 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-success">
                  {formatCurrency(earningsData.week.net)}
                </p>
                <p className="text-muted-foreground">Ganancia neta de la semana</p>
                <p className="text-sm text-muted-foreground">
                  {earningsData.week.deliveries} entregas completadas
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(earningsData.week.gross)}
                  </p>
                  <p className="text-xs text-muted-foreground">Ganancia bruta</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-destructive">
                    -{formatCurrency(earningsData.week.commission)}
                  </p>
                  <p className="text-xs text-muted-foreground">Comisiones</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Month Tab */}
          <TabsContent value="month" className="space-y-4">
            <Card className="p-6 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-success">
                  {formatCurrency(earningsData.month.net)}
                </p>
                <p className="text-muted-foreground">Ganancia neta del mes</p>
                <p className="text-sm text-muted-foreground">
                  {earningsData.month.deliveries} entregas completadas
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(earningsData.month.gross)}
                  </p>
                  <p className="text-xs text-muted-foreground">Ganancia bruta</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-destructive">
                    -{formatCurrency(earningsData.month.commission)}
                  </p>
                  <p className="text-xs text-muted-foreground">Comisiones</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Commission Breakdown */}
        <Card className="p-4 bg-surface border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Desglose de Comisiones
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Comisión YEGA</span>
              <span className="font-medium text-foreground">{commissionBreakdown.platform}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Procesamiento de pagos</span>
              <span className="font-medium text-foreground">{commissionBreakdown.payment}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Seguro de entregas</span>
              <span className="font-medium text-foreground">{commissionBreakdown.insurance}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Retención de impuestos</span>
              <span className="font-medium text-foreground">{commissionBreakdown.taxes}%</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Total de descuentos</span>
                <span className="font-bold text-destructive">
                  {commissionBreakdown.platform + commissionBreakdown.payment + commissionBreakdown.insurance + commissionBreakdown.taxes}%
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Payments */}
        <Card className="p-4 bg-surface border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Pagos Recientes
          </h3>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {formatCurrency(payment.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString('es-MX')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(payment.status)}>
                    {getStatusText(payment.status)}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Export Button */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Download className="w-4 h-4 mr-2" />
          Descargar reporte mensual
        </Button>
      </div>
    </div>
  );
};

export default Earnings;