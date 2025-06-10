import express from 'express';
import db from '../db.js';

const router = express.Router();

// Create inventory record
router.post('/', async (req, res) => {
  const { sku, warehouse_id, quantity } = req.body;

  try {
    await db('inventory_master').insert({
      sku,
      warehouse_id,
      quantity
    });
    res.status(201).json({ message: 'Inventory added' });
  } catch (err) {
    res.status(500).json({ error: 'Insert failed', details: err.message });
  }
});

// Update inventory
router.patch('/', async (req, res) => {
  const { sku, warehouse_id, quantity_delta } = req.body;

  try {
    const updated = await db('inventory_master')
      .where({ sku, warehouse_id })
      .increment('quantity', quantity_delta)
      .update('last_updated', db.fn.now());

    if (updated === 0) {
      return res.status(404).json({ error: 'Inventory not found' });
    }

    res.json({ message: 'Inventory updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed', details: err.message });
  }
});

// Get inventory
router.get('/:sku/:warehouse_id', async (req, res) => {
  const { sku, warehouse_id } = req.params;

  try {
    const record = await db('inventory_master')
      .where({ sku, warehouse_id })
      .first();

    if (!record) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', details: err.message });
  }
});

export default router;
