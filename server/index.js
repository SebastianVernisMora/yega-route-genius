import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// --- Mock Data ---
let orders = {
  "ord_123": {
    "id": "ord_123",
    "status": "assignable",
    "pickup_address": "Av. Siempreviva 742, Springfield",
    "delivery_address": "Calle Falsa 123, Springfield",
    "route": {
      "distance_meters": 5200,
      "estimated_time_seconds": 900,
      "polyline": "encoded_polyline_string_1"
    },
    "earnings": 7.50,
    "distance_to_pickup_meters": 1250,
    "created_at": "2024-08-15T10:00:00Z"
  },
  "ord_456": {
    "id": "ord_456",
    "status": "assignable",
    "pickup_address": "Krusty Burger, Springfield",
    "delivery_address": "Planta Nuclear de Springfield",
    "route": {
      "distance_meters": 8500,
      "estimated_time_seconds": 1500,
      "polyline": "encoded_polyline_string_2"
    },
    "earnings": 12.00,
    "distance_to_pickup_meters": 3400,
    "created_at": "2024-08-15T10:05:00Z"
  },
  "ord_789": {
    "id": "ord_789",
    "status": "en route",
    "pickup_address": "Badulaque, Springfield",
    "delivery_address": "Taberna de Moe",
    "route": {
      "distance_meters": 2100,
      "estimated_time_seconds": 450,
      "polyline": "encoded_polyline_string_3"
    },
    "earnings": 5.25,
    "distance_to_pickup_meters": 800,
    "created_at": "2024-08-15T09:50:00Z"
  }
};

// --- Driver Status ---
let online = false;

app.get('/api/v1/drivers/status', (_req, res) => {
  res.json({ online });
});

app.post('/api/v1/drivers/status', (req, res) => {
  const { online: newStatus } = req.body;
  if (typeof newStatus !== 'boolean') {
    return res.status(400).json({ message: 'online must be a boolean' });
  }
  online = newStatus;
  res.json({ online });
});

// --- Delivery Endpoints ---

// GET /api/v1/deliveries/assignable
app.get('/api/v1/deliveries/assignable', (_req, res) => {
  const assignableOrders = Object.values(orders).filter(o => o.status === 'assignable');
  res.json(assignableOrders);
});

// POST /api/v1/deliveries/:deliveryId/take
app.post('/api/v1/deliveries/:deliveryId/take', (req, res) => {
  const { deliveryId } = req.params;
  const order = orders[deliveryId];

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status !== 'assignable') {
    return res.status(409).json({ message: `Order is not assignable, current status: ${order.status}` });
  }

  order.status = 'en route';
  order.updated_at = new Date().toISOString();
  res.json(order);
});

// POST /api/v1/deliveries/:deliveryId/deliver
app.post('/api/v1/deliveries/:deliveryId/deliver', (req, res) => {
  const { deliveryId } = req.params;
  const order = orders[deliveryId];

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status !== 'en route') {
    return res.status(409).json({ message: `Order is not in route, current status: ${order.status}` });
  }

  order.status = 'delivered';
  order.updated_at = new Date().toISOString();
  res.json(order);
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Mock server listening on port ${port}`);
});

export default app;
