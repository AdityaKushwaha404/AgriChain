import React, { useState } from 'react';
import { recordTransfer } from '../api';

function TransferForm() {
  const [form, setForm] = useState({ batchId: '', to: '', noteCID: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await recordTransfer(form);
      setResult({ success: true, txHash: res.data.txHash });
    } catch (err) {
      setResult({ error: err.response?.data?.error || err.message });
    }
  };

  return (
    <div>
      <h3 className="form-section-title">Transfer Ownership</h3>
      <form onSubmit={handleSubmit} className="form-grid gap-4">
        <div className="form-field">
          <label className="form-label">Batch ID</label>
          <input className="form-input" name="batchId" placeholder="Batch ID" value={form.batchId} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label className="form-label">Recipient Address</label>
          <input className="form-input" name="to" placeholder="0x..." value={form.to} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label className="form-label">Note CID (optional)</label>
          <input className="form-input" name="noteCID" placeholder="Optional IPFS CID" value={form.noteCID} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button">Record Transfer</button>
        </div>
      </form>
      {result && (
        <div className="mt-3">
          {result.error ? <span className="result-error">{result.error}</span> : <span className="result-success">Success • Tx: {result.txHash}</span>}
        </div>
      )}
    </div>
  );
}

export default TransferForm;
