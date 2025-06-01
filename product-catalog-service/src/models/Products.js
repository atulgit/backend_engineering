import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  color: String,
  size: String
});

const ProductSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // UUID
  name: { type: String, required: true },
  brand: String,
  category: String,
  price: Number,
  variants: [VariantSchema],
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Product', ProductSchema);
