# Documento de Handoff: App Repartidor

## 1. Resumen de Alto Nivel

Este documento describe el trabajo completado y las tareas pendientes para la **App Repartidor**.

El estado inicial del proyecto era una **maqueta de UI bien desarrollada sin integración con el backend**. Los componentes principales del frontend (`Dashboard.tsx`, `DeliveryRoute.tsx`) se construyeron con datos de prueba y estado local del lado del cliente.

La tarea principal de este sprint fue conectar este frontend a las APIs del backend definidas en `docs/repartidor-plan.md`.

## 2. Tarea Central: Integración de API y Estado Global

La prioridad fue reemplazar todos los datos de prueba y la lógica de estado local con datos en vivo de la API. Esto implicó el uso de `@tanstack/react-query` para las llamadas a la API y `zustand` para la gestión del estado global.

## 3. Roadmap de Tareas

A continuación se presenta un checklist del trabajo realizado y las tareas pendientes.

### 3.1. Dashboard (`src/components/Dashboard.tsx`)
- [x] **Obtener Órdenes Asignables**: Reemplazar el array `mockOrders` con un hook `useQuery` para obtener datos del endpoint `GET /api/v1/deliveries/assignable`.
- [x] **Actualizar Modelo de Datos**: La interfaz `Order` fue actualizada para coincidir con la estructura JSON de la API.
- [x] **Implementar Actualizaciones en Tiempo Real**: Se implementó un mecanismo de sondeo (`refetchInterval`) para buscar nuevos pedidos periódicamente.
- [ ] **Estado del Repartidor**: El estado "Conectado" / "Desconectado" sigue siendo local. Se requiere un endpoint en el backend para sincronizar este estado.

### 3.2. Flujo de Entrega (`src/components/DeliveryRoute.tsx`)
- [x] **Implementar Mutación "Take"**: La acción de aceptar un pedido ahora dispara un `useMutation` que envía un `POST` a `/api/v1/deliveries/{deliveryId}/take`.
- [x] **Implementar Mutación "Deliver"**: La acción de entregar un pedido ahora dispara un `useMutation` que envía un `POST` a `/api/v1/deliveries/{deliveryId}/deliver`.
- [x] **Sincronización de Estado**: La máquina de estados local fue reemplazada por el estado real del pedido proveniente del backend.

### 3.3. Estado Global y Navegación
- [x] **Estado Centralizado**: Se implementó `zustand` para gestionar de forma centralizada el estado de la aplicación (orden activa, vista actual, autenticación), eliminando el *prop drilling*.
- [x] **Enrutamiento**: El componente `Index.tsx` ahora maneja la lógica de navegación basándose en el store de `zustand`.

### 3.4. Soporte Offline
- [x] **Implementar Caché Offline**: Se configuró `@tanstack/react-query` para persistir la caché de datos en `localStorage`, permitiendo que la aplicación funcione sin conexión.
- [x] **Implementar Cola de Mutaciones y Sincronización**: Las acciones realizadas offline (aceptar/entregar pedido) se encolan automáticamente y se sincronizan al recuperar la conexión, gracias a las funcionalidades de `react-query`.

### 3.5. General
- [x] **Autenticación**: Se integró el `AuthScreen.tsx` con un flujo de autenticación simulado, gestionando un token a través del store de `zustand`.
- [ ] **Manejo de Errores**: Se implementó un manejo de errores básico para las llamadas a la API. Se necesita refinar para cubrir todos los casos (errores de red, 4xx, 5xx, 409 Conflict).
- [x] **Variables de Entorno**: La URL base de la API se configuró a través de variables de entorno en un archivo `.env`.

Este handoff proporciona una visión clara del estado actual de la aplicación. El próximo desarrollador debería enfocarse en las tareas pendientes restantes.