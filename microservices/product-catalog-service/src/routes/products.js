import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Product from '../models/Products.js';
import { generateSKU } from '../utils/skuGenerator.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, brand, category, price, variants } = req.body;

    const productId = uuidv4();

    const enrichedVariants = variants.map(v => ({
      ...v,
      sku: generateSKU(brand, name, v.color, v.size)
    }));

    const product = new Product({
      _id: productId,
      name,
      brand,
      category,
      price,
      variants: enrichedVariants
    });

    await product.save();
    res.status(201).json({ product_id: productId, message: 'Product created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;
