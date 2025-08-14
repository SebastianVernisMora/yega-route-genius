# Jules — PR y Documentación (Yega-Repartidor)

- Rama: `feat/auth-integration`
- Base: `dev`
- Objetivo: Integración base de autenticación (hooks, axios, `.env`) en `AuthScreen` (login/register reales).

## Cambios principales
- `src/lib/api.ts`: cliente axios con `baseURL` desde `VITE_API_BASE_URL`.
- `src/hooks/useAuth.ts`: `react-query` (login/register) + toasts de error.
- `src/components/AuthScreen.tsx`: reemplaza simulación por llamadas reales (login/register) y manejo de errores.
- `.env.example`: agrega `VITE_API_BASE_URL`.

## Acciones para Jules
- Crear PR: "Auth Integration (base): hooks + axios + env" → base `dev`.
- Incluir en el cuerpo del PR:
  - Resumen de cambios (lista anterior).
  - Configuración: `cp .env.example .env` y definir `VITE_API_BASE_URL`.
  - Pruebas: `npm ci && npm run build`; probar login/register y navegación.
  - Checklist: env configurado, build sin errores, navegación OK, sin warnings ESLint/TS.
- Riesgos: dependencia de `/auth/login` y `/auth/register`, y CORS del API.

## Compare para PR
- https://github.com/SebastianVernisMora/Yega-Repartidor/compare/dev...feat/auth-integration?expand=1

## Footer sugerido
AI-Usage: gemini=0, codex=1, jules=1, blackbox=0

