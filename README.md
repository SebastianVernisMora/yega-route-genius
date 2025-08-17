# Delivery Driver App

This project is a web-based application that simulates a mobile app for delivery drivers. It allows drivers to register, manage their profile and documents, view and accept delivery orders, see their earnings, and navigate delivery routes.

## Features

- **Authentication**: Simple authentication flow.
- **Splash Screen**: A welcome screen shown on application startup.
- **Driver Registration**: A form for new drivers to register.
- **Dashboard**: Displays a list of available delivery orders.
- **Order Details**: Shows details of a selected order, including earnings, store name, distance, and estimated time.
- **Delivery Route**: Displays the delivery route for an accepted order.
- **Vehicle Documents**: Allows drivers to manage their vehicle documents.
- **Driver Profile**: Allows drivers to view and manage their profile.
- **Earnings**: Displays the driver's earnings.

## Technologies Used

- **Vite**: A fast build tool for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript.
- **shadcn/ui**: A collection of re-usable components for React.
- **Tailwind CSS**: A utility-first CSS framework.
- **React Router**: For routing within the application.
- **React Hook Form**: For building forms.
- **TanStack Query**: For data fetching and state management.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm
  ```sh
  nvm install node
  nvm use node
  ```

### Installation

1. Clone the repo
   ```sh
   git clone <YOUR_GIT_URL>
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm run dev
   ```

## Application Structure

The application is structured as a single-page application with the following components and views:

- **`src/pages/Index.tsx`**: The main page of the application, which handles the rendering of different views based on the application state.
- **`src/components/`**: This directory contains all the React components used in the application.
  - **`AuthScreen.tsx`**: Handles user authentication.
  - **`SplashScreen.tsx`**: The initial splash screen.
  - **`Registration.tsx`**: The driver registration form.
  - **`Dashboard.tsx`**: The main dashboard with a list of available orders.
  - **`DeliveryRoute.tsx`**: Displays the delivery route for an accepted order.
  - **`VehicleDocuments.tsx`**: A view for managing vehicle documents.
  - **`DriverProfile.tsx`**: The driver's profile page.
  - **`Earnings.tsx`**: A view to check earnings.
- **`src/components/ui/`**: Contains the shadcn/ui components.

## Automatización de Sprint 1

- Tablero: Project v2 de usuario “Sprint 1 - Yega-Repartidor”.
- Issues del sprint: ver 
  - 
  - 
- Flujo de estado automático: ver .

Para listar Projects por CLI:


