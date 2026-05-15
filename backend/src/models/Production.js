import mongoose from 'mongoose';

const productionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  materialsUsed: [
    {
      name: String,
      quantity: String,
      cost: Number
    }
  ],
  totalCost: Number,
  estimatedPrice: Number,
  defects: String,
  images: [String],
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Production = mongoose.model('Production', productionSchema);
