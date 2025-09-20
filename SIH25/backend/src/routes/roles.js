import express from 'express';
import contract from '../blockchain/agritrace.js';
import { ethers } from 'ethers';

const router = express.Router();

// Grant a role to an address
router.post('/grant', async (req, res) => {
  try {
    const { role, address } = req.body;
    const roleHash = ethers.keccak256(ethers.toUtf8Bytes(role));
    const tx = await contract.grantRole(roleHash, address);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Revoke a role from an address
router.post('/revoke', async (req, res) => {
  try {
    const { role, address } = req.body;
    const roleHash = ethers.keccak256(ethers.toUtf8Bytes(role));
    const tx = await contract.revokeRole(roleHash, address);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if an address has a role
router.get('/has', async (req, res) => {
  try {
    const { role, address } = req.query;
    const roleHash = ethers.keccak256(ethers.toUtf8Bytes(role));
    const hasRole = await contract.hasRole(roleHash, address);
    res.json({ hasRole });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
