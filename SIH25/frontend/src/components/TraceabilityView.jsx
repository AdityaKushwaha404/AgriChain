import React, { useState, useEffect } from 'react';
import { getBatch } from '../api';
import QRCodeDisplay from './QRCodeDisplay.js';

function TraceabilityView({ initialBatchId }) {
  const [batchId, setBatchId] = useState(initialBatchId || '');
  const [batch, setBatch] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBatch = async (targetBatchId) => {
    setError(null);
    setLoading(true);
    setBatch(null);
    try {
      const res = await getBatch(targetBatchId);
      setBatch(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = (e) => {
    e.preventDefault();
    if (!batchId) return;
    fetchBatch(batchId);
  };

  useEffect(() => {
    if (initialBatchId) {
      fetchBatch(initialBatchId);
    }
  }, [initialBatchId]);

  return (
    <div>
      {!initialBatchId && (
        <form onSubmit={handleFetch} className="form-grid two items-end mb-4">
          <div className="form-field col-span-2">
            <label className="form-label">Batch ID</label>
            <input className="form-input" value={batchId} onChange={e => setBatchId(e.target.value)} placeholder="Enter Batch ID" required />
          </div>
          <div className="form-actions">
            <button type="submit" className="form-button" disabled={loading}>{loading ? 'Loading...' : 'Show Traceability'}</button>
          </div>
        </form>
      )}
      {error && <div className="result-error mb-3">{error}</div>}
      {loading && <div className="text-xs text-gray-500">Fetching batch data...</div>}
      {batch && (
        <div className="space-y-5 mt-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Batch: {batch.batchId}</h3>
            <QRCodeDisplay value={window.location.origin + '/?batchId=' + encodeURIComponent(batch.batchId)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <Info label="Origin" value={batch.originGeo} />
            <Info label="Product" value={batch.productType} />
            <Info label="Status" value={batch.status} />
            <Info label="Quantity" value={batch.quantity?.toString?.()} />
            <Info label="Producer" value={batch.producer} className="sm:col-span-2" />
          </div>
          <SectionList title="Transfers" items={batch.transfers} render={t => (
            <span><b>From:</b> {t.from} <b>To:</b> {t.to} <b>At:</b> {t.timestamp?.toString?.()} <b>Note:</b> {t.noteCID}</span>
          )} />
          <SectionList title="Quality Events" items={batch.qualityEvents} render={q => (
            <span><b>Inspector:</b> {q.inspector} <b>Passed:</b> {q.passed ? 'Yes' : 'No'} <b>At:</b> {q.timestamp?.toString?.()} <b>Notes:</b> {q.notes}</span>
          )} />
          <SectionList title="Prices" items={batch.prices} render={p => (
            <span><b>Setter:</b> {p.setter} <b>Price:</b> {p.priceWei?.toString?.()} <b>At:</b> {p.timestamp?.toString?.()} <b>Note:</b> {p.noteCID}</span>
          )} />
        </div>
      )}
    </div>
  );
}

const Info = ({ label, value, className='' }) => (
  <div className={`rounded-lg border border-gray-200 bg-white px-3 py-2 ${className}`}>
    <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</div>
    <div className="text-xs text-gray-800 truncate" title={value}>{value || '—'}</div>
  </div>
);

const SectionList = ({ title, items = [], render }) => {
  if (!items || !items.length) return null;
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
      <ol className="space-y-2 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg p-3 max-h-56 overflow-auto">
        {items.map((it, idx) => (
          <li key={idx} className="leading-relaxed">
            {render(it)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TraceabilityView;
