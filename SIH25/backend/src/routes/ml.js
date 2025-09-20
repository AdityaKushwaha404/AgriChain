
import express from 'express';
import axios from 'axios';

const router = express.Router();
const ML_BASE = 'http://localhost:8000';

// Automated feature extraction for a batch
router.get('/predict-price-for-batch/:batchId', async (req, res) => {
  try {
    const batchId = req.params.batchId;
    // Fetch batch details from blockchain API
    const batchRes = await axios.get(`http://localhost:5000/api/blockchain/batch/${batchId}`);
    const batch = batchRes.data;
    // Feature extraction
    const quantity = Number(batch.quantity);
    const numTransfers = Array.isArray(batch.transfers) ? batch.transfers.length : 0;
    const prices = (batch.prices || []).map(p => Number(p.priceWei));
    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const qualityEvents = batch.qualityEvents || [];
    const lastQuality = qualityEvents.length > 0 ? (qualityEvents[qualityEvents.length - 1].passed ? 1 : 0) : 0;
    const createdAt = Number(batch.createdAt);
    const now = Math.floor(Date.now() / 1000);
    const daysSinceCreation = (now - createdAt) / 86400;
    const features = [quantity, numTransfers, avgPrice, lastQuality, daysSinceCreation];
    // Call ML service
    const mlRes = await axios.post('http://localhost:8000/predict-price', { features });
    res.json({ features, predicted_price: mlRes.data.predicted_price });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/detect-quality-anomaly-for-batch/:batchId', async (req, res) => {
  try {
    const batchId = req.params.batchId;
    // Fetch batch details from blockchain API
    const batchRes = await axios.get(`http://localhost:5000/api/blockchain/batch/${batchId}`);
    const batch = batchRes.data;
    // Feature extraction (same as above)
    const quantity = Number(batch.quantity);
    const numTransfers = Array.isArray(batch.transfers) ? batch.transfers.length : 0;
    const prices = (batch.prices || []).map(p => Number(p.priceWei));
    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const qualityEvents = batch.qualityEvents || [];
    const lastQuality = qualityEvents.length > 0 ? (qualityEvents[qualityEvents.length - 1].passed ? 1 : 0) : 0;
    const createdAt = Number(batch.createdAt);
    const now = Math.floor(Date.now() / 1000);
    const daysSinceCreation = (now - createdAt) / 86400;
    const features = [quantity, numTransfers, avgPrice, lastQuality, daysSinceCreation];
    // Call ML service
    const mlRes = await axios.post('http://localhost:8000/detect-quality-anomaly', { features });
    res.json({ features, anomaly: mlRes.data.anomaly });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Predict price
router.post('/predict-price', async (req, res) => {
  try {
    const { features } = req.body;
    const response = await axios.post(`${ML_BASE}/predict-price`, { features });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Detect quality anomaly
router.post('/detect-quality-anomaly', async (req, res) => {
  try {
    const { features } = req.body;
    const response = await axios.post(`${ML_BASE}/detect-quality-anomaly`, { features });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
