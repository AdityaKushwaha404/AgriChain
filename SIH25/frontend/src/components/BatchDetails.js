import React, { useState } from 'react';
import { getBatch } from '../api';

function BatchDetails() {
  const [batchId, setBatchId] = useState('');
  const [batch, setBatch] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async (e) => {
    e.preventDefault();
    setError(null);
    setBatch(null);
    try {
      const res = await getBatch(batchId);
      setBatch(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h3 className="form-section-title">View Batch Details</h3>
      <form onSubmit={handleFetch} className="form-grid two items-end">
        <div className="form-field col-span-2">
          <label className="form-label">Batch ID</label>
            <input className="form-input" value={batchId} onChange={e => setBatchId(e.target.value)} placeholder="Enter Batch ID" required />
        </div>
        <div className="form-actions">
          <button type="submit" className="form-button">Fetch</button>
        </div>
      </form>
      {error && <div className="result-error mt-2">{error}</div>}
      {batch && (
        <div className="json-preview">
          <pre>{JSON.stringify(batch, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default BatchDetails;
