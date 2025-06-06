import express from 'express';
import dotenv from 'dotenv';
import inventoryRoutes from './routes/inventory.js';
import { register, setupMetrics } from './metrics/prometheus.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/inventory', inventoryRoutes);

// Prometheus metrics
setupMetrics(app);
// app.get('/metrics', async (req, res) => {
//   res.set('Content-Type', register.contentType);
//   res.end(await register.metrics());
// });

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Inventory Service running on port ${PORT}`);
});
