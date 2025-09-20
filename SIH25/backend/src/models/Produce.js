import mongoose from 'mongoose';

const produceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  quality: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: 'Harvested' },
  owner: { type: String, required: true }, // Ethereum address
  history: [
    {
      event: String,
      timestamp: { type: Date, default: Date.now },
      owner: String,
      details: String
    }
  ]
}, { timestamps: true });

export default mongoose.model('Produce', produceSchema);
