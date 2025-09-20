import React, { useState } from 'react';
import axios from 'axios';

function MLAnalytics() {
  const [features, setFeatures] = useState('');
  const [price, setPrice] = useState(null);
  const [anomaly, setAnomaly] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setError(null);
    try {
      const feats = features.split(',').map(Number);
      const res = await axios.post('http://localhost:5000/api/ml/predict-price', { features: feats });
      setPrice(res.data.predicted_price);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handleAnomaly = async () => {
    setError(null);
    try {
      const feats = features.split(',').map(Number);
      const res = await axios.post('http://localhost:5000/api/ml/detect-quality-anomaly', { features: feats });
      setAnomaly(res.data.anomaly);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{ marginTop: 30 }}>
  <h2 style={{fontSize:'1.75rem', fontWeight:800, color:'#065f46', marginBottom: '0.35rem'}}>Predictive Quality & Pricing Intelligence</h2>
  <p style={{marginTop:0, marginBottom:'1rem', maxWidth:480, fontSize:'.9rem', lineHeight:1.4, color:'#4b5563'}}>Embedded models surface classification, anomaly and pricing signals for real‑time decisioning.</p>
      <div>
        <input value={features} onChange={e => setFeatures(e.target.value)} placeholder="Comma-separated features (e.g. 0.5,1.2,0.8)" style={{ width: 300 }} />
        <button onClick={handlePredict}>Predict Price</button>
        <button onClick={handleAnomaly}>Detect Quality Anomaly</button>
      </div>
      {price !== null && <div>Predicted Price: <b>{price}</b></div>}
      {anomaly !== null && <div>Quality Anomaly: <b>{anomaly ? 'Yes' : 'No'}</b></div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default MLAnalytics;
