import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, location, capacity } = req.body;
  const warehouse_id = uuidv4();

  try {
    await db('warehouses').insert({ warehouse_id, name, location, capacity});
    res.status(201).json({ warehouse_id, name, location });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create warehouse', details: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const warehouses = await db('warehouses').select();
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch warehouses', details: err.message });
  }
});

export default router;
