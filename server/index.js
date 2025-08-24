import express from 'express';

const app = express();
app.use(express.json());

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

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
