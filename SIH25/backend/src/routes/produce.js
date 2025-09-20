import express from 'express';
import Produce from '../models/Produce.js';

const router = express.Router();

// Add new produce
router.post('/', async (req, res) => {
  try {
    const produce = new Produce(req.body);
    await produce.save();
    res.status(201).json(produce);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all produce
router.get('/', async (req, res) => {
  try {
    const produce = await Produce.find();
    res.json(produce);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get produce by ID
router.get('/:id', async (req, res) => {
  try {
    const produce = await Produce.findById(req.params.id);
    if (!produce) return res.status(404).json({ error: 'Not found' });
    res.json(produce);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
