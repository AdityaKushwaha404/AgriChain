import React, { useState } from 'react';
import { createBatch } from '../api';

function BatchForm() {
  const [form, setForm] = useState({
    batchId: '',
    originGeo: '',
    productType: '',
    quantity: '',
    metadataCID: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createBatch({ ...form, quantity: Number(form.quantity) });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.response?.data?.error || err.message });
    }
  };

  return (
    <div>
      <h3 className="form-section-title">Create Produce Batch</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-grid two">
          <div className="form-field">
            <label className="form-label">Batch ID</label>
            <input className="form-input" name="batchId" placeholder="e.g. BATCH-1001" value={form.batchId} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label className="form-label">Origin (Geo)</label>
            <input className="form-input" name="originGeo" placeholder="State / Region" value={form.originGeo} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label className="form-label">Product Type</label>
            <input className="form-input" name="productType" placeholder="Commodity name" value={form.productType} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label className="form-label">Quantity</label>
            <input className="form-input" name="quantity" placeholder="e.g. 500" type="number" value={form.quantity} onChange={handleChange} required />
          </div>
          <div className="form-field col-span-2">
            <label className="form-label">Metadata CID</label>
            <input className="form-input" name="metadataCID" placeholder="Optional IPFS CID" value={form.metadataCID} onChange={handleChange} />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button">Create Batch</button>
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

export default BatchForm;
