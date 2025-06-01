import express from 'express';
import dotenv from 'dotenv';
import warehouseRoutes from './routes/warehouses.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/warehouses', warehouseRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`✅ Warehouse Service running on port ${PORT}`);
});
