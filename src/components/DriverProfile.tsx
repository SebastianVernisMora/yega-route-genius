import { useState } from 'react';
import { ArrowLeft, Star, TrendingUp, Award, Gift, Target, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface DriverProfileProps {
  onBack: () => void;
}

const DriverProfile = ({ onBack }: DriverProfileProps) => {
  const [profile] = useState({
    name: "Juan Carlos García",
    rating: 4.8,
    totalDeliveries: 1247,
    monthlyDeliveries: 89,
    successRate: 98.5,
    currentLevel: "Oro",
    nextLevel: "Platino",
    levelProgress: 75,
    pointsToNext: 125
  });

  const [bonuses] = useState([
    {
      id: 1,
      title: "Bono por calificación",
      description: "Mantén tu calificación arriba de 4.7",
      amount: "+$5 por entrega",
      status: "active",
      icon: Star
    },
    {
      id: 2,
      title: "Bono de puntualidad",
      description: "Entrega antes del tiempo estimado",
      amount: "+$3 por entrega",
      status: "active",
      icon: Target
    },
    {
      id: 3,
      title: "Bono de fin de semana",
      description: "Trabaja sábados y domingos",
      amount: "+15% extra",
      status: "available",
      icon: Gift
    },
    {
      id: 4,
      title: "Bono de horas pico",
      description: "Actívate durante horarios de alta demanda",
      amount: "+$8 por entrega",
      status: "locked",
      icon: TrendingUp
    }
  ]);

  const [achievements] = useState([
    { title: "100 entregas", completed: true },
    { title: "500 entregas", completed: true },
    { title: "1000 entregas", completed: true },
    { title: "Calificación 4.5+", completed: true },
    { title: "Sin cancelaciones", completed: false },
    { title: "Entregador del mes", completed: false }
  ]);

  const getBonusStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border-success/30';
      case 'available': return 'bg-warning/20 text-warning border-warning/30';
      default: return 'bg-inactive/20 text-muted-foreground border-inactive/30';
    }
  };

  const getBonusStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'available': return 'Disponible';
      default: return 'Bloqueado';
    }
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
            <h1 className="text-lg font-semibold text-foreground">Mi Perfil</h1>
            <p className="text-sm text-muted-foreground">Estadísticas y logros</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Overview */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-success/10 border-primary/20">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-success rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="font-medium text-foreground">{profile.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {profile.totalDeliveries} entregas
                </span>
              </div>
            </div>
            <Badge className="bg-warning/20 text-warning border-warning/30">
              {profile.currentLevel}
            </Badge>
          </div>

          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progreso a {profile.nextLevel}</span>
              <span className="text-foreground font-medium">
                {profile.pointsToNext} puntos restantes
              </span>
            </div>
            <Progress value={profile.levelProgress} className="h-2" />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-surface border-border text-center">
            <p className="text-2xl font-bold text-primary">{profile.monthlyDeliveries}</p>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </Card>
          <Card className="p-4 bg-surface border-border text-center">
            <p className="text-2xl font-bold text-success">{profile.successRate}%</p>
            <p className="text-xs text-muted-foreground">Tasa de éxito</p>
          </Card>
        </div>

        {/* Active Bonuses */}
        <Card className="p-4 bg-surface border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <Gift className="w-5 h-5 mr-2 text-primary" />
            Bonos Disponibles
          </h3>
          <div className="space-y-3">
            {bonuses.map((bonus) => {
              const Icon = bonus.icon;
              return (
                <div key={bonus.id} className="flex items-start space-x-3 p-3 bg-surface-elevated rounded-lg">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground">{bonus.title}</h4>
                      <Badge className={getBonusStatusColor(bonus.status)}>
                        {getBonusStatusText(bonus.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{bonus.description}</p>
                    <p className="text-sm font-medium text-success">{bonus.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-4 bg-surface border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-primary" />
            Logros
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  achievement.completed
                    ? 'bg-success/10 border-success/20'
                    : 'bg-surface-elevated border-border'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-success' : 'bg-inactive'
                  }`}>
                    {achievement.completed && (
                      <Award className="w-3 h-3 text-success-foreground" />
                    )}
                  </div>
                  <span className={`text-sm font-medium ${
                    achievement.completed ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {achievement.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Tips */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h3 className="font-medium text-foreground mb-2">
            💡 Consejos para mejorar tus ganancias:
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Mantén una calificación alta para acceder a mejores bonos</li>
            <li>• Trabaja durante horas pico para maximizar tus ingresos</li>
            <li>• Completa entregas rápidamente para obtener bonos de puntualidad</li>
            <li>• Evita cancelaciones para mantener tu tasa de éxito</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DriverProfile;