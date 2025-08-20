import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const loginUser = async (credentials: any) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  return data;
};

const registerUser = async (userInfo: any) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
};


const AuthScreen = () => {
  const { actions } = useStore();
  const { login } = actions;
  const { toast } = useToast();

  const [email, setEmail] = useState('test@yega.dev');
  const [password, setPassword] = useState('password');
  const [name, setName] = useState('');

  const { mutate: doLogin, isLoading: isLoggingIn } = useMutation(loginUser, {
    onSuccess: (data: any) => {
      login(data.token);
      toast({ title: '¡Bienvenido!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error de inicio de sesión', description: error.message, variant: 'destructive' });
    },
  });

  const { mutate: doRegister, isLoading: isRegistering } = useMutation(registerUser, {
    onSuccess: (data: any) => {
      login(data.token);
      toast({ title: '¡Registro exitoso!' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error de registro', description: error.message, variant: 'destructive' });
    },
  });

  const handleLogin = () => {
    doLogin({ email, password });
  };

  const handleRegister = () => {
    doRegister({ name, email, password });
  };

  const isLoading = isLoggingIn || isRegistering;

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
                <TabsTrigger value="login" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary" disabled={isLoading}>
                  Iniciar Sesión
                </TabsTrigger>
                <TabsTrigger value="register" className="text-white data-[state=active]:bg-white data-[state=active]:text-primary" disabled={isLoading}>
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
                    disabled={isLoading}
                  />
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-white text-primary hover:bg-white/90 hover-scale"
                  disabled={isLoading}
                >
                  {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
                    disabled={isLoading}
                  />
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    disabled={isLoading}
                  />
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    disabled={isLoading}
                  />
                </div>
                <Button 
                  onClick={handleRegister}
                  className="w-full bg-white text-primary hover:bg-white/90 hover-scale"
                  disabled={isLoading}
                >
                  {isRegistering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
            onClick={() => login('fake-demo-token')}
            className="text-white border-white/30 hover:bg-white/10"
            disabled={isLoading}
          >
            Acceso Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
