import { useState } from 'react';
import { ArrowLeft, FileText, Calendar, CheckCircle, Upload, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface VehicleDocumentsProps {
  onBack: () => void;
}

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  expiryDate?: string;
}

const VehicleDocuments = ({ onBack }: VehicleDocumentsProps) => {
  const [documents] = useState<Document[]>([
    {
      id: 'license',
      name: 'Licencia de conducir',
      description: 'Licencia vigente para motocicleta o automóvil',
      required: true,
      status: 'verified',
      expiryDate: '2025-12-15'
    },
    {
      id: 'vehicle_registration',
      name: 'Tarjeta de circulación',
      description: 'Documento que acredita la propiedad del vehículo',
      required: true,
      status: 'uploaded'
    },
    {
      id: 'insurance',
      name: 'Póliza de seguro',
      description: 'Seguro vigente del vehículo',
      required: true,
      status: 'pending',
      expiryDate: '2024-08-30'
    },
    {
      id: 'verification',
      name: 'Verificación vehicular',
      description: 'Comprobante de verificación ambiental',
      required: false,
      status: 'verified',
      expiryDate: '2025-03-20'
    }
  ]);

  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-success/20 text-success border-success/30';
      case 'uploaded': return 'bg-warning/20 text-warning border-warning/30';
      case 'rejected': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-inactive/20 text-muted-foreground border-inactive/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Verificado';
      case 'uploaded': return 'En revisión';
      case 'rejected': return 'Rechazado';
      default: return 'Pendiente';
    }
  };

  const handleUploadDocument = (documentId: string) => {
    toast({
      title: "Documento subido",
      description: "Tu documento está siendo revisado",
    });
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
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
            <h1 className="text-lg font-semibold text-foreground">Documentos del Vehículo</h1>
            <p className="text-sm text-muted-foreground">Gestiona tus documentos</p>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="p-4 bg-surface">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-success">2</p>
            <p className="text-xs text-muted-foreground">Verificados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">1</p>
            <p className="text-xs text-muted-foreground">En revisión</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">1</p>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-4 bg-surface border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-foreground">{doc.name}</h3>
                    {doc.required && (
                      <Badge variant="outline" className="text-xs">
                        Requerido
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {doc.description}
                  </p>
                  
                  {doc.expiryDate && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className={`text-xs ${
                        isExpired(doc.expiryDate) 
                          ? 'text-destructive' 
                          : isExpiringSoon(doc.expiryDate)
                          ? 'text-warning'
                          : 'text-muted-foreground'
                      }`}>
                        Vence: {new Date(doc.expiryDate).toLocaleDateString('es-MX')}
                      </span>
                      {(isExpired(doc.expiryDate) || isExpiringSoon(doc.expiryDate)) && (
                        <AlertCircle className="w-3 h-3 text-warning" />
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <Badge className={getStatusColor(doc.status)}>
                {doc.status === 'verified' && <CheckCircle className="w-3 h-3 mr-1" />}
                {getStatusText(doc.status)}
              </Badge>
            </div>

            <div className="flex space-x-2">
              {doc.status === 'pending' && (
                <Button
                  onClick={() => handleUploadDocument(doc.id)}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Subir documento
                </Button>
              )}
              
              {doc.status === 'rejected' && (
                <Button
                  onClick={() => handleUploadDocument(doc.id)}
                  size="sm"
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Volver a subir
                </Button>
              )}
              
              {(doc.status === 'uploaded' || doc.status === 'verified') && (
                <Button
                  onClick={() => handleUploadDocument(doc.id)}
                  size="sm"
                  variant="outline"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Actualizar
                </Button>
              )}
            </div>

            {isExpired(doc.expiryDate) && (
              <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive font-medium">
                  ⚠️ Documento vencido
                </p>
                <p className="text-xs text-destructive/80">
                  Debes renovar este documento para continuar trabajando
                </p>
              </div>
            )}
            
            {isExpiringSoon(doc.expiryDate) && !isExpired(doc.expiryDate) && (
              <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm text-warning font-medium">
                  ⏰ Documento próximo a vencer
                </p>
                <p className="text-xs text-warning/80">
                  Renueva tu documento antes de que expire
                </p>
              </div>
            )}
          </Card>
        ))}

        {/* Upload Tips */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h3 className="font-medium text-foreground mb-2">
            Consejos para subir documentos:
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Asegúrate de que la imagen sea clara y legible</li>
            <li>• Sube el documento completo, sin cortes</li>
            <li>• Formatos aceptados: JPG, PNG, PDF</li>
            <li>• Tamaño máximo: 5MB por archivo</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default VehicleDocuments;