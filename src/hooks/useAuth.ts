import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type LoginPayload = { email: string; password: string };
type RegisterPayload = { email: string; password: string; name?: string };

export function useAuth() {
  const { toast } = useToast();

  const login = useMutation({
    mutationFn: async (payload: LoginPayload) => (await api.post("/auth/login", payload)).data,
    onError: (e: any) =>
      toast({
        title: "Error de autenticación",
        description: e?.response?.data?.message ?? "No se pudo iniciar sesión",
        variant: "destructive",
      }),
  });

  const register = useMutation({
    mutationFn: async (payload: RegisterPayload) => (await api.post("/auth/register", payload)).data,
    onError: (e: any) =>
      toast({
        title: "Error de registro",
        description: e?.response?.data?.message ?? "No se pudo registrar",
        variant: "destructive",
      }),
  });

  return { login, register };
}

