# Aplicación para Repartidores

Este proyecto es una aplicación web que simula una app móvil para repartidores. Permite a los conductores registrarse, gestionar su perfil y documentos, ver y aceptar pedidos de entrega, consultar sus ganancias y navegar por las rutas de entrega.

## Características

-   **Autenticación**: Flujo de autenticación sencillo.
-   **Pantalla de Bienvenida (Splash Screen)**: Una pantalla de bienvenida que se muestra al iniciar la aplicación.
-   **Registro de Conductor**: Un formulario para que los nuevos conductores se registren.
-   **Panel de Control (Dashboard)**: Muestra una lista de los pedidos de entrega disponibles.
-   **Detalles del Pedido**: Muestra los detalles de un pedido seleccionado, incluyendo ganancias, nombre de la tienda, distancia y tiempo estimado.
-   **Ruta de Entrega**: Muestra la ruta de entrega para un pedido aceptado.
-   **Documentos del Vehículo**: Permite a los conductores gestionar los documentos de su vehículo.
-   **Perfil del Conductor**: Permite a los conductores ver y gestionar su perfil.
-   **Ganancias**: Muestra las ganancias del conductor.

## Tecnologías Utilizadas

-   **Vite**: Una herramienta de compilación rápida para proyectos web modernos.
-   **React**: Una biblioteca de JavaScript para construir interfaces de usuario.
-   **TypeScript**: Un superconjunto tipado de JavaScript.
-   **shadcn/ui**: Una colección de componentes reutilizables para React.
-   **Tailwind CSS**: Un framework de CSS de "utility-first".
-   **React Router**: Para el enrutamiento dentro de la aplicación.
-   **React Hook Form**: Para construir formularios.
-   **TanStack Query**: Para la obtención de datos y la gestión del estado.

## Cómo Empezar

Para obtener una copia local y ponerla en marcha, sigue estos sencillos pasos.

### Prerrequisitos

-   Node.js y npm
    ```sh
    nvm install node
    nvm use node
    ```

### Instalación

1.  Clona el repositorio
    ```sh
    git clone <TU_URL_DE_GIT>
    ```
2.  Instala los paquetes de NPM
    ```sh
    npm install
    ```
3.  Inicia el servidor de desarrollo
    ```sh
    npm run dev
    ```

## Estructura de la Aplicación

La aplicación está estructurada como una aplicación de una sola página (SPA) con los siguientes componentes y vistas:

-   **`src/pages/Index.tsx`**: La página principal de la aplicación, que gestiona el renderizado de las diferentes vistas en función del estado de la aplicación.
-   **`src/components/`**: Este directorio contiene todos los componentes de React utilizados en la aplicación.
    -   **`AuthScreen.tsx`**: Gestiona la autenticación del usuario.
    -   **`SplashScreen.tsx`**: La pantalla de bienvenida inicial.
    -   **`Registration.tsx`**: El formulario de registro del conductor.
    -   **`Dashboard.tsx`**: El panel de control principal con una lista de pedidos disponibles.
    -   **`DeliveryRoute.tsx`**: Muestra la ruta de entrega para un pedido aceptado.
    -   **`VehicleDocuments.tsx`**: Una vista para gestionar los documentos del vehículo.
    -   **`DriverProfile.tsx`**: La página de perfil del conductor.
    -   **`Earnings.tsx`**: Una vista para consultar las ganancias.
-   **`src/components/ui/`**: Contiene los componentes de shadcn/ui.
