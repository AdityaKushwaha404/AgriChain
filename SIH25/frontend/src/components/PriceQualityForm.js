import React, { useState } from 'react';
import { postPrice, recordQuality } from '../api';

function PriceQualityForm() {
  const [form, setForm] = useState({ batchId: '', priceWei: '', noteCID: '', passed: '', reportCID: '', notes: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePrice = async (e) => {
    e.preventDefault();
    try {
      const res = await postPrice({ batchId: form.batchId, priceWei: form.priceWei, noteCID: form.noteCID });
      setResult({ success: true, txHash: res.data.txHash });
    } catch (err) {
      setResult({ error: err.response?.data?.error || err.message });
    }
  };

  const handleQuality = async (e) => {
    e.preventDefault();
    try {
      const res = await recordQuality({ batchId: form.batchId, passed: form.passed === 'true', reportCID: form.reportCID, notes: form.notes });
      setResult({ success: true, txHash: res.data.txHash });
    } catch (err) {
      setResult({ error: err.response?.data?.error || err.message });
    }
  };

  return (
    <div>
      <h3 className="form-section-title">Price & Quality Events</h3>
      <form onSubmit={handlePrice} className="space-y-4 mb-6">
        <div className="form-grid two">
          <div className="form-field">
            <label className="form-label">Batch ID</label>
            <input className="form-input" name="batchId" value={form.batchId} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label className="form-label">Price (Wei)</label>
            <input className="form-input" name="priceWei" value={form.priceWei} onChange={handleChange} placeholder="e.g. 1000000000000" required />
          </div>
          <div className="form-field col-span-2">
            <label className="form-label">Note CID (optional)</label>
            <input className="form-input" name="noteCID" value={form.noteCID} onChange={handleChange} placeholder="Optional IPFS CID" />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button">Add Price</button>
        </div>
      </form>
      <div className="divider" />
      <form onSubmit={handleQuality} className="space-y-4">
        <div className="form-grid two">
          <div className="form-field">
            <label className="form-label">Batch ID</label>
            <input className="form-input" name="batchId" value={form.batchId} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label className="form-label">Passed?</label>
            <select className="form-select" name="passed" value={form.passed} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-field col-span-2">
            <label className="form-label">Report CID (optional)</label>
            <input className="form-input" name="reportCID" value={form.reportCID} onChange={handleChange} />
          </div>
          <div className="form-field col-span-2">
            <label className="form-label">Notes (optional)</label>
            <input className="form-input" name="notes" value={form.notes} onChange={handleChange} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button">Add Quality Event</button>
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

export default PriceQualityForm;
