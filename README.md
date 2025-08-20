# App de Repartidor (Yega)

Este proyecto es una aplicación web progresiva (PWA) que simula una aplicación móvil para repartidores. Permite a los conductores registrarse, gestionar su perfil y documentos, ver y aceptar pedidos de entrega, consultar sus ganancias y navegar por las rutas de entrega.

La aplicación está diseñada para ser resiliente a problemas de conectividad, permitiendo un funcionamiento offline básico y la sincronización de datos al recuperar la conexión.

## Características Principales

El núcleo de la aplicación se centra en el ciclo de vida de una entrega, gestionando los siguientes estados:

-   **Asignable (`assignable`):** Un nuevo pedido es asignado al repartidor, quien puede ver la ruta sugerida y la información del pedido antes de aceptarlo.
-   **En Proceso (`take`):** El repartidor acepta la entrega y la aplicación actualiza el estado a "En camino para recoger".
-   **En Ruta (`en route`):** El repartidor ha recogido el paquete y se dirige al cliente.
-   **Entregado (`delivered`):** El repartidor completa la entrega, con posibilidad de requerir una prueba como una foto o firma.

### Otras características incluyen:

-   **Autenticación**: Flujo de inicio de sesión simple.
-   **Registro de Conductor**: Formulario para que los nuevos repartidores se unan.
-   **Dashboard**: Muestra una lista de los pedidos de entrega disponibles.
-   **Gestión de Documentos**: Permite a los conductores gestionar los documentos de su vehículo.
-   **Perfil del Conductor**: Permite a los conductores ver y gestionar su perfil.
-   **Ganancias**: Muestra las ganancias del conductor.

## Tecnologías Utilizadas

-   **Vite**: Herramienta de compilación rápida para proyectos web modernos.
-   **React**: Biblioteca de JavaScript para construir interfaces de usuario.
-   **TypeScript**: Un superset de JavaScript con tipado estático.
-   **shadcn/ui**: Colección de componentes reutilizables para React.
-   **Tailwind CSS**: Un framework de CSS "utility-first".
-   **React Router**: Para el enrutamiento dentro de la aplicación.
-   **React Hook Form**: Para la construcción de formularios.
-   **TanStack Query**: Para la obtención de datos y la gestión del estado.

## Primeros Pasos

Para obtener una copia local y ponerla en funcionamiento, sigue estos sencillos pasos.

### Prerrequisitos

-   Node.js y npm
    ```sh
    nvm install node
    nvm use node
    ```

### Instalación

1.  Clona el repositorio
    ```sh
    git clone <TU_URL_GIT>
    ```
2.  Instala los paquetes NPM
    ```sh
    npm install
    ```
3.  Inicia el servidor de desarrollo
    ```sh
    npm run dev
    ```

## Estructura de la Aplicación

La aplicación está estructurada como una aplicación de una sola página con los siguientes componentes y vistas:

-   **`src/pages/Index.tsx`**: Actúa como el componente principal y controlador de vistas. Utiliza Zustand para gestionar el estado global de la aplicación y renderiza dinámicamente las diferentes vistas (`AuthScreen`, `Dashboard`, `DeliveryRoute`, etc.) según el estado de autenticación del usuario y la vista actual.
-   **`src/components/`**: Este directorio contiene todos los componentes de React utilizados en la aplicación.
    -   **`AuthScreen.tsx`**: Gestiona la autenticación del usuario.
    -   **`SplashScreen.tsx`**: La pantalla de bienvenida inicial.
    -   **`Registration.tsx`**: El formulario de registro del conductor.
    -   **`Dashboard.tsx`**: El panel principal con una lista de los pedidos disponibles.
    -   **`DeliveryRoute.tsx`**: Muestra la ruta de entrega de un pedido aceptado.
    -   **`VehicleDocuments.tsx`**: Una vista para gestionar los documentos del vehículo.
    -   **`DriverProfile.tsx`**: La página de perfil del conductor.
    -   **`Earnings.tsx`**: Una vista para consultar las ganancias.
-   **`src/components/ui/`**: Contiene los componentes de shadcn/ui.

## Gestión del Proyecto y Automatización

Este proyecto utiliza **GitHub Projects (v2)** para la gestión del sprint actual en el tablero “Sprint 1 - Yega-Repartidor”.

El estado de los issues se actualiza automáticamente según las acciones en los Pull Requests:
-   **PR Abierto**: El issue vinculado pasa a "In Progress".
-   **PR Fusionado (Merged)**: El issue vinculado pasa a "Done".

Para vincular un PR a un issue, utiliza palabras clave como `Closes #123` o `Fixes #123` en la descripción del PR.

## API Endpoints

El backend debe proporcionar una API REST para gestionar el ciclo de vida de las entregas. A continuación se resumen los endpoints principales:

-   `GET /api/v1/deliveries/assignable`: Obtiene la lista de órdenes asignadas al repartidor.
-   `POST /api/v1/deliveries/{deliveryId}/take`: Permite al repartidor aceptar una entrega.
-   `POST /api/v1/deliveries/{deliveryId}/deliver`: Permite al repartidor marcar una entrega como completada.

Para más detalles, consulta el documento [`docs/repartidor-plan.md`](docs/repartidor-plan.md) y el resumen del sprint en [`docs/SPRINT-1-SUMMARY.md`](docs/SPRINT-1-SUMMARY.md).
