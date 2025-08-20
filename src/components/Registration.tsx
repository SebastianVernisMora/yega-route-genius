import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft, User, Phone, Mail, MapPin, Camera, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store/useStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const registerUser = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || 'Registration failed');
  }
  return resData;
};

interface RegistrationProps {
  onComplete: () => void;
  onBack: () => void;
}

const Registration = ({ onComplete, onBack }: RegistrationProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const { toast } = useToast();
  const { actions } = useStore();
  const { login } = actions;

  const { mutate: doRegister, isLoading } = useMutation(registerUser, {
    onSuccess: (data: any) => {
      login(data.token);
      toast({
        title: "¡Registro completado!",
        description: "Tu cuenta ha sido creada exitosamente",
      });
      onComplete();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error de registro',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      doRegister(formData);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.phone && formData.email;
      case 2:
        return formData.address && formData.emergencyContact && formData.emergencyPhone;
      case 3:
        return true; // Photo verification step
      default:
        return false;
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
            <h1 className="text-lg font-semibold text-foreground">Crear Cuenta</h1>
            <p className="text-sm text-muted-foreground">Paso {step} de 3</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2 bg-surface">
        <div className="flex space-x-1">
          {[1, 2, 3].map((stepNum) => (
            <div
              key={stepNum}
              className={`h-2 flex-1 rounded-full ${
                stepNum <= step ? 'bg-primary' : 'bg-inactive'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        {step === 1 && (
          <Card className="p-6 bg-surface border-border">
            <div className="text-center mb-6">
              <User className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Información Personal
              </h2>
              <p className="text-muted-foreground">
                Ingresa tus datos básicos para crear tu perfil
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nombres</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Ej. Juan Carlos"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Ej. García López"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+52 55 1234 5678"
                />
              </div>

              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="tu.email@ejemplo.com"
                />
              </div>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-6 bg-surface border-border">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Información de Contacto
              </h2>
              <p className="text-muted-foreground">
                Datos adicionales para tu seguridad
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Dirección de casa</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Calle, número, colonia, código postal"
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Contacto de emergencia</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Nombre completo"
                />
              </div>

              <div>
                <Label htmlFor="emergencyPhone">Teléfono de emergencia</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  placeholder="+52 55 1234 5678"
                />
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-6 bg-surface border-border">
            <div className="text-center mb-6">
              <Camera className="w-12 h-12 text-primary mx-auto mb-3" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Verificación de Identidad
              </h2>
              <p className="text-muted-foreground">
                Toma una foto para verificar tu identidad
              </p>
            </div>

            <div className="space-y-4">
              <div className="h-48 bg-surface-elevated border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-2">Toca para tomar una selfie</p>
                  <Button variant="outline" size="sm">
                    Abrir cámara
                  </Button>
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-1">
                  Consejos para una buena foto:
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Asegúrate de tener buena iluminación</li>
                  <li>• Mira directamente a la cámara</li>
                  <li>• No uses lentes oscuros</li>
                  <li>• Mantén una expresión neutral</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-6 flex space-x-3">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              Anterior
            </Button>
          )}
          <Button
            onClick={handleNextStep}
            disabled={!canProceed() || isLoading}
            className={`flex-1 ${
              step === 3
                ? 'bg-success hover:bg-success/90 text-success-foreground'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : step === 3 ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Completar registro
              </>
            ) : (
              'Continuar'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
