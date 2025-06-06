import express from 'express';
import dotenv from 'dotenv';
import inventoryRoutes from './routes/inventory.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/inventory', inventoryRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`✅ Inventory Service running on port ${PORT}`);
});
