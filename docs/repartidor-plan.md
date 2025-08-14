# Plan de Implementación — S4 Repartidor

Este documento describe el plan funcional para la aplicación del repartidor, enfocándose en el ciclo de vida de una entrega.

## 1. Ciclo de Vida y Estados de Entrega

El flujo de una entrega se modela a través de los siguientes estados, que deben ser gestionados por el frontend y validados por el backend a través de los endpoints correspondientes (`routes`, `take`, `deliver`).

- **Asignable (`assignable`):**
  - Una nueva orden de entrega ha sido asignada al repartidor.
  - La UI muestra la ruta sugerida y la información del pedido.
  - El repartidor puede aceptar (`take`) o rechazar la entrega (funcionalidad futura).

- **En Proceso (`take`):**
  - El repartidor ha aceptado la entrega.
  - La UI actualiza el estado a "En camino para recoger" o similar.
  - Se inicia el seguimiento GPS (si aplica).

- **En Ruta (`en route`):**
  - El repartidor ha recogido el paquete y se dirige al cliente.
  - La UI muestra "En ruta hacia el cliente".
  - El cliente recibe una notificación de que su pedido está en camino.

- **Entregado (`delivered`):**
  - El repartidor ha completado la entrega.
  - Se requiere una confirmación (ej. firma, foto, código).
  - La UI se actualiza y la orden se marca como completada.

## 2. Guardas de Secuencia (Sequence Guards)

Para mantener la integridad del flujo, se implementarán guardas de secuencia tanto en el frontend como en el backend. El backend será la fuente de verdad.

- **Lógica:** Una acción solo es válida si el estado actual de la orden es el esperado.
  - `take` solo es posible si el estado es `assignable`.
  - `deliver` solo es posible si el estado es `en route`.
- **Implementación Frontend:** La UI deshabilitará botones o acciones que no correspondan al estado actual para prevenir errores del usuario.
- **Implementación Backend:** La API rechazará cualquier solicitud que intente realizar una transición de estado inválida, devolviendo un error claro (ej. `409 Conflict`).

## 3. Manejo de Offline y Reconexión

Dado que los repartidores pueden tener conectividad intermitente, la aplicación debe ser resiliente.

- **Modo Offline:**
  - La aplicación debe cachear la información esencial de la entrega en curso.
  - Las acciones realizadas offline (ej. marcar como "entregado") se almacenan en una cola local (p. ej., usando `localStorage` o `IndexedDB`).
- **Reconexión:**
  - Al recuperar la conexión, la aplicación intentará sincronizar las acciones pendientes con el servidor.
  - Se debe manejar posibles conflictos. Por ejemplo, si una orden fue cancelada por el sistema mientras el repartidor estaba offline, la acción local de "entregar" debe ser invalidada y notificada al repartidor.
  - La UI debe comunicar claramente el estado de la conexión y el estado de la sincronización.
