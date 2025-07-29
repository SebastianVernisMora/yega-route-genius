import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

const AuthScreen = ({ onAuthenticated }: AuthScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    // Simulación de login exitoso
    onAuthenticated();
  };

  const handleRegister = () => {
    // Simulación de registro exitoso
    onAuthenticated();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-secondary flex items-center justify-center relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-white/10 rounded-full animate-pulse delay-300"></div>
      <div className="absolute top-1/3 right-10 w-20 h-20 bg-white/5 rounded-full animate-pulse delay-500"></div>
      
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-6xl font-black text-white tracking-wider mb-2">
            YEGA
          </h1>
          <p className="text-white/80 text-lg">App Repartidor</p>
        </div>

        {/* Auth Card */}
        <Card className="backdrop-blur-md bg-white/10 border-white/20 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-center text-white text-xl">
              Bienvenido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary">
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger value="register" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary">
                  Registrarse
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-white text-primary hover:bg-white/90 hover-scale"
                >
                  Iniciar Sesión
                </Button>
                <p className="text-center text-white/60 text-sm">
                  ¿Olvidaste tu contraseña?
                </p>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <Button 
                  onClick={handleRegister}
                  className="w-full bg-white text-primary hover:bg-white/90 hover-scale"
                >
                  Crear Cuenta
                </Button>
                <p className="text-center text-white/60 text-xs">
                  Al registrarte aceptas nuestros términos y condiciones
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo access */}
        <div className="text-center mt-6 animate-fade-in delay-300">
          <Button 
            variant="outline" 
            onClick={onAuthenticated}
            className="text-white border-white/30 hover:bg-white/10"
          >
            Acceso Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;