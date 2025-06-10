import express from 'express';
import { client } from '../services/cassandraClient.js';
import { produceInventoryEvent } from '../kafka/producer.js';

const router = express.Router();

router.post('/update', async (req, res) => {
  const { sku, warehouse_id, quantity, reserved_quantity } = req.body;

  try {
    const now = new Date();

// await client.execute(
//   `UPDATE inventory_by_sku_warehouse 
//    SET available_quantity = ?, reserved_quantity = ?, ts = ? 
//    WHERE sku = ? AND warehouse_id = ?`,
//   [quantity, reserved_quantity, now, sku, warehouse_id]
// );

await client.execute(
  `INSERT INTO inventory_by_sku_warehouse (sku, warehouse_id, available_quantity, reserved_quantity, ts)
   VALUES (?, ?, ?, ?, ?)`,
  [sku, warehouse_id, quantity, reserved_quantity, now],
  { prepare: true }
);

    await produceInventoryEvent({ sku, warehouse_id, quantity });
    res.status(200).json({ message: 'Inventory updated' });
  } catch (err) {
    console.error('Inventory update failed:', err);
    res.status(500).json({ error: 'Failed to update inventory' });
  }
});

export default router;
