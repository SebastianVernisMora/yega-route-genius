# Plan de QA — S5 Hardening

Este documento detalla el plan de Quality Assurance para la fase "S5 Hardening" del proyecto.

## 1. Alcance

El objetivo de esta fase es robustecer la plataforma, enfocándose en seguridad, rendimiento y estabilidad. Las pruebas se centrarán en validar las mejoras implementadas y asegurar que no se hayan introducido regresiones.

## 2. Tipos de Pruebas

### 2.1. Pruebas Funcionales

Se validará la funcionalidad crítica de la plataforma para asegurar que los flujos principales operan como se espera.

| Flujo de Usuario | Escenario                                   | Resultado Esperado                                      | Prioridad |
|------------------|---------------------------------------------|---------------------------------------------------------|-----------|
| **Catálogo**     | Navegación y búsqueda de productos (Feliz)    | Los productos se muestran y filtran correctamente.      | Alta      |
|                  | Búsqueda sin resultados (Borde)             | Se muestra un mensaje de "no hay resultados".           | Media     |
| **Pedidos**      | Creación de un nuevo pedido (Feliz)         | El pedido se crea y se notifica al usuario.             | Alta      |
|                  | Intento de pago con tarjeta rechazada (Borde) | El sistema rechaza el pago y ofrece reintentar.         | Alta      |
| **Estado**       | Cambio de estado de pedido (Enviado)      | El estado se actualiza y se notifica al cliente.        | Alta      |
|                  | Intento de cancelar pedido ya enviado (Borde) | El sistema previene la cancelación y muestra un error.  | Media     |

### 2.2. Pruebas de Seguridad

Se realizarán pruebas para validar los mecanismos de seguridad implementados.

| Área            | Prueba                                      | Herramienta/Método | Criterio de Aceptación                                     |
|-----------------|---------------------------------------------|--------------------|------------------------------------------------------------|
| **Autenticación** | Control de Acceso Basado en Roles (RBAC)    | Pruebas manuales   | Un usuario `conductor` no puede acceder a rutas de `admin`. |
| **API**         | Límite de Tasa (Rate Limiting)              | `k6` / `JMeter`    | La API bloquea IPs que exceden 100 req/minuto.             |
| **Datos**       | Inyección de SQL (SQLi)                     | `OWASP ZAP`        | No se detectan vulnerabilidades de inyección.              |

### 2.3. Pruebas de Carga

Se simulará carga para medir el rendimiento y la escalabilidad de los servicios clave.

| Servicio        | Carga Concurrente (RPS) | Duración | Criterio de Aceptación                                        |
|-----------------|-------------------------|----------|---------------------------------------------------------------|
| **Catálogo API**  | 50 / 100 / 150 RPS      | 15 min   | Latencia p95 < 200ms y tasa de error < 0.1%.                  |
| **Pedidos API**   | 50 / 100 / 150 RPS      | 15 min   | Latencia p95 < 350ms y tasa de error < 0.1%.                  |
| **Servicio Geo**  | 50 / 100 / 150 RPS      | 15 min   | Latencia p95 < 150ms y tasa de error < 0.1%.                  |

## 3. Criterios de Salida

- 100% de los casos de prueba de prioridad Alta ejecutados y pasados.
- No deben existir vulnerabilidades de seguridad críticas o altas sin resolver.
- Los objetivos de rendimiento bajo carga deben cumplirse.
