# Plan de Go-Live — S5 Hardening

Este documento describe el plan de despliegue (Go-Live) para la fase "S5 Hardening".

## 1. Planificación

- **Fecha y Hora de Despliegue**: Por definir (ventana de bajo tráfico, ej. martes 3:00 AM UTC).
- **Responsables**: Equipo de DevOps (ejecución), Equipo de Desarrollo (soporte).
- **Comunicación**: Canal de Slack `#deployments` para notificaciones en tiempo real.

## 2. Pasos de Despliegue (Runbook)

El despliegue se realizará servicio por servicio para minimizar el impacto.

| Orden | Servicio         | Acción                                                              | Verificación                                     |
|-------|------------------|---------------------------------------------------------------------|--------------------------------------------------|
| 1     | **Base de Datos**  | Aplicar migraciones de schema (`db-migrate up`)                     | `SELECT version FROM migrations` coincide con la esperada. |
| 2     | **API de Auth**    | Desplegar nueva versión (ej. `v2.1.0`) en entorno de producción.      | `curl -s /health` retorna `{"status": "ok"}`.    |
| 3     | **API de Catálogo**| Desplegar nueva versión en producción.                              | `curl -s /health` retorna `{"status": "ok"}`.    |
| 4     | **API de Pedidos** | Desplegar nueva versión en producción.                              | `curl -s /health` retorna `{"status": "ok"}`.    |
| 5     | **Frontend App**   | Invalidar caché de CDN y desplegar nuevo build.                     | Cargar el sitio en un navegador y verificar la versión en el footer. |

## 3. Smoke Tests Post-Despliegue

Una vez completado el despliegue, se ejecutarán las siguientes pruebas de humo para validar la funcionalidad crítica.

- **[ ] Registro de Usuario**: Crear una nueva cuenta de usuario.
- **[ ] Login**: Iniciar sesión con un usuario existente.
- **[ ] Búsqueda de Producto**: Realizar una búsqueda en el catálogo.
- **[ ] Crear Pedido**: Completar un flujo de compra de principio a fin.
- **[ ] Verificar Estado de Pedido**: Consultar el estado de un pedido existente.

## 4. Plan de Rollback

En caso de un fallo crítico durante o después del despliegue, se activará el siguiente plan de rollback.

| Condición de Fallo                                | Acción Inmediata                                             | Pasos de Rollback                                           |
|---------------------------------------------------|--------------------------------------------------------------|-------------------------------------------------------------|
| Tasa de error > 5% en cualquier API por > 5 min. | Pausar el despliegue y notificar en `#deployments`.          | 1. Revertir el despliegue del servicio fallido a la versión anterior. |
|                                                   |                                                              | 2. Si aplica, ejecutar migraciones de BBDD inversas.        |
| Fallo en Smoke Tests                              | No permitir tráfico al nuevo entorno.                        | 3. Monitorear métricas para confirmar la estabilidad.         |

## 5. Monitoreo Post-Go-Live

El equipo de DevOps y Desarrollo monitoreará activamente los siguientes indicadores durante las primeras **24–48 horas**.

- **Dashboards de Métricas**: Grafana/Datadog (latencia, tasa de errores, uso de CPU/memoria).
- **Logs Centralizados**: Splunk/ELK (búsqueda de anomalías y errores).
- **Alertas**: PagerDuty/Opsgenie para cualquier alerta crítica.

El despliegue se considerará exitoso si no se reportan incidentes mayores en 48 horas.
