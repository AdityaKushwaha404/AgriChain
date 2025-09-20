import express from 'express';
import contract from '../blockchain/agritrace.js';

const router = express.Router();

// Record transfer
router.post('/transfer', async (req, res) => {
  try {
    const { batchId, to, noteCID } = req.body;
    const tx = await contract.recordTransfer(batchId, to, noteCID);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Record arrival
router.post('/arrival', async (req, res) => {
  try {
    const { batchId } = req.body;
    const tx = await contract.recordArrival(batchId);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post price
router.post('/price', async (req, res) => {
  try {
    const { batchId, priceWei, noteCID } = req.body;
    const tx = await contract.postPrice(batchId, priceWei, noteCID);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept price and buy
router.post('/buy', async (req, res) => {
  try {
    const { batchId, priceIndex, valueWei } = req.body;
    const tx = await contract.acceptPriceAndBuy(batchId, priceIndex, { value: valueWei });
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Record quality event
router.post('/quality', async (req, res) => {
  try {
    const { batchId, passed, reportCID, notes } = req.body;
    const tx = await contract.recordQualityEvent(batchId, passed, reportCID, notes);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
