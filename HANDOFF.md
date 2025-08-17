# Handoff Document: Repartidor App

## 1. High-Level Summary

This document outlines the pending work for the **Repartidor App**.

The current state of the project is a **well-developed UI mock-up with zero backend integration**. The core frontend components (`Dashboard.tsx`, `DeliveryRoute.tsx`) have been built using mock data and local, client-side state.

The primary task for the next developer is to connect this frontend to the backend APIs defined in `docs/repartidor-plan.md`.

## 2. Core Task: API Integration

The immediate priority is to replace all mock data and local state logic with live data from the API. This involves using a data fetching library like `@tanstack/react-query` (which is already a dependency) to perform API calls.

## 3. Pending Tasks (Roadmap)

Here is a detailed checklist of the required work:

### 3.1. Dashboard (`src/components/Dashboard.tsx`)
- [ ] **Fetch Assignable Orders**: Replace the `mockOrders` array with a `useQuery` hook to fetch data from the `GET /api/v1/deliveries/assignable` endpoint.
- [ ] **Update Data Model**: The `Order` interface in the component must be updated to match the JSON structure defined in `docs/repartidor-plan.md`.
- [ ] **Implement Real-time Updates**: Implement a polling mechanism (e.g., using `refetchInterval` in `useQuery`) to periodically check for new orders.
- [ ] **Driver Status**: The "Conectado" / "Desconectado" status is currently local. This should be tied to a backend state if required by the API.

### 3.2. Delivery Flow (`src/components/DeliveryRoute.tsx`)
- [ ] **Implement "Take" Mutation**: The action of accepting an order from the Dashboard should trigger a `useMutation` hook that sends a `POST` request to `/api/v1/deliveries/{deliveryId}/take`.
- [ ] **Implement "Deliver" Mutation**: The `handleDelivered` function should trigger a `useMutation` hook that sends a `POST` request to `/api/v1/deliveries/{deliveryId}/deliver`. The request body must include proof of delivery as specified in the plan.
- [ ] **State Synchronization**: The component's local state machine (`currentStep`) must be driven by the actual order status from the backend, not local `useState`. The UI should update based on the successful completion of API calls.

### 3.3. Global State & Navigation
- [ ] **Centralized State**: The application currently relies on prop drilling (`onAcceptOrder`, `onBack`). Implement a more robust global state management solution (e.g., Zustand, Redux, or a simple React Context) to manage the currently active order and the user's view (e.g., `dashboard`, `delivery_route`).
- [ ] **Routing**: The main `Index.tsx` or `App.tsx` should handle the routing logic based on this global state.

### 3.4. Offline Support
- [ ] **Implement Offline Cache**: As per `docs/repartidor-plan.md`, the application must be able to function offline. Implement caching of delivery data using `localStorage` or `IndexedDB`.
- [ ] **Implement Mutation Queue**: Create a queue for actions performed while offline (e.g., marking an order as delivered).
- [ ] **Implement Sync on Reconnect**: When the network connection is restored, the application must sync the queued actions with the backend and handle any potential conflicts.

### 3.5. General
- [ ] **Authentication**: Integrate the `AuthScreen.tsx` component with an authentication provider. API calls must be authenticated, likely using a Bearer token in the request headers.
- [ ] **Error Handling**: Implement comprehensive error handling for all API calls. This includes displaying user-friendly messages for network errors, server errors (`4xx`, `5xx`), and state conflicts (`409 Conflict`).
- [ ] **Environment Variables**: Ensure the API base URL is configured through environment variables (`.env`). The file `.env.stg` exists, so this pattern should be followed.

This handoff provides a clear path to completing the application. The next developer should start with task 3.1 and work their way through the list.
