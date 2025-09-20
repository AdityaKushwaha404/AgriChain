import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TransparencyPage from './pages/TransparencyPage';
import BatchMLAnalytics from './components/BatchMLAnalytics';
import MLAnalytics from './components/MLAnalytics';
import RoleManager from './components/RoleManager';
import BatchForm from './components/BatchForm';
import BatchDetails from './components/BatchDetails';
import TransferForm from './components/TransferForm';
import TraceabilityView from './components/TraceabilityView.jsx';
import QRCodeDisplay from './components/QRCodeDisplay';
import PriceQualityForm from './components/PriceQualityForm';


function Dashboard() {
  const [qrBatchId, setQrBatchId] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const batchId = params.get('batchId');
    if (batchId) setQrBatchId(batchId);
  }, []);
  return (
    <div>
      <h1>AgriTrace Supply Chain Transparency</h1>
      <p>Welcome to the blockchain-based agricultural produce traceability platform.</p>
      {!qrBatchId && <>
        <BatchForm />
        <BatchDetails />
        <TransferForm />
        <PriceQualityForm />
        <RoleManager />
        <MLAnalytics />
        <BatchMLAnalytics />
      </>}
      <TraceabilityView initialBatchId={qrBatchId} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/transparency" element={<TransparencyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
