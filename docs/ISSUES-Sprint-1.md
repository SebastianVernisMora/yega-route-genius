# 📌 Yega-Repartidor – Issues Sprint 1

## Issues

- [x] **Dashboard de Pedidos Disponibles (`PedidosDashboard`)**  
  Listar pedidos cercanos desde API mock. Botón “Aceptar Pedido” cambia estado a `assigned`.

- [x] **Flujo de Entrega (`RutaEntregaScreen`)**  
  Botones para “Llegué a la tienda” → “En camino” → “Entregado”. Cada acción llama a `PATCH /pedidos/:id`.
  - _Avance: Implementado, pero falta el flujo de estados intermedios (llegada a tienda, en camino)._

- [x] **Configurar PWA básica**  
  Implementar `manifest.json` y `service-worker.js` (offline real se deja para Sprint 5).
