# Documentación PWA — S4 Base

Este documento especifica la estructura base de la Progressive Web App (PWA) para la aplicación de repartidores.

## 1. Manifiesto de la Aplicación (`manifest.json`)

El manifiesto es clave para que la aplicación sea instalable y se comporte como una aplicación nativa.

```json
{
  "short_name": "Yega Reparto",
  "name": "Yega Repartidores",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

## 2. Estructura y Service Worker

- **Punto de Entrada:** `index.html` será el punto de entrada principal.
- **Service Worker:** Se registrará un Service Worker para gestionar el cacheo de assets y la lógica de red.
- **Cacheo de Assets:** El Service Worker cacheará los assets estáticos (JS, CSS, imágenes) para acelerar las cargas y permitir el acceso básico sin conexión (la estructura de la app).

## 3. Funcionalidad Offline — Alcance S4 vs. S5

- **Fase S4 (Actual):**
  - La PWA será "instalable" en el dispositivo del repartidor.
  - Se cachearán los elementos estáticos de la UI para que la aplicación cargue incluso con conectividad limitada.
  - **No habrá lógica de negocio offline completa.** Las acciones (aceptar, entregar) aún requerirán una conexión activa para ser procesadas en tiempo real.

- **Fase S5 (Futura):**
  - Se implementará la lógica de negocio offline completa, como se describe en `repartidor-plan.md`.
  - Esto incluye la cola de acciones y la sincronización con el servidor al recuperar la conexión.
  - El objetivo es garantizar que el repartidor pueda completar un ciclo de entrega completo sin conexión.
