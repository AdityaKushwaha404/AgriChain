import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import BatchDetails from '../components/BatchDetails.js';
import BatchForm from '../components/BatchForm.js';
import BatchMLAnalytics from '../components/BatchMLAnalytics.js';
import MLAnalytics from '../components/MLAnalytics.js';
import PriceQualityForm from '../components/PriceQualityForm.js';
import QRCodeDisplay from '../components/QRCodeDisplay.js';
import RoleManager from '../components/RoleManager.js';
import TraceabilityView from '../components/TraceabilityView.jsx';
import TransferForm from '../components/TransferForm.js';

const TransparencyPage = () => {
  const [qrBatchId, setQrBatchId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const batchId = params.get('batchId');
    if (batchId) setQrBatchId(batchId);
  }, []);

  const Card = ({ title, children }) => (
    <div className="transparency-card relative rounded-xl p-5 sm:p-6 border bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 text-green-800">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow" />
        {title}
      </h2>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-200/40 via-teal-100/40 to-yellow-50/40">
      <Navbar />
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 max-w-7xl">
        <header className="text-center mb-12 sm:mb-16 relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[620px] h-[320px] pointer-events-none" style={{background:'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)'}} />
          <h1 className="pt-20 relative text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-green-800 drop-shadow-sm">
            Supply Chain Transparency Portal
          </h1>
          <p className="relative mt-5 max-w-3xl mx-auto text-gray-700 text-base sm:text-lg leading-relaxed">
            Manage agricultural produce lifecycle with blockchain-backed traceability, role-based governance, and machine learning insights. Streamline batch creation, transfers, quality & price intelligence, and consumer trust via QR codes.
          </p>
          {qrBatchId && (
            <p className="mt-4 text-sm font-medium text-emerald-700">Showing traceability for Batch ID: <span className="font-semibold">{qrBatchId}</span></p>
          )}
        </header>

        {!qrBatchId && (
          <section className="grid lg:grid-cols-2 gap-8 xl:gap-10 items-start">
            <div className="space-y-8">
              <Card title="Create / Manage Batches">
                <BatchForm />
              </Card>
              <Card title="Transfer Produce">
                <TransferForm />
              </Card>
              <Card title="Role Management">
                <RoleManager />
              </Card>
              <Card title="Price & Quality Input">
                <PriceQualityForm />
              </Card>
            </div>
            <div className="space-y-8">
              <Card title="Existing Batches">
                <BatchDetails />
              </Card>
              <Card title="Traceability Explorer">
                <TraceabilityView initialBatchId={qrBatchId} />
              </Card>
              <Card title="Analytics Overview">
                <MLAnalytics />
              </Card>
              <Card title="Batch ML Analytics">
                <BatchMLAnalytics />
              </Card>
              <Card title="QR Code Generator">
                <QRCodeDisplay />
              </Card>
            </div>
          </section>
        )}

        {qrBatchId && (
          <section className="mt-4">
            <Card title="Traceability Explorer">
              <TraceabilityView initialBatchId={qrBatchId} />
            </Card>
          </section>
        )}
      </main>
      <Footer />
      <style>{`
        .transparency-card { box-shadow:0 2px 6px -1px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04); }
        .transparency-card:hover { box-shadow:0 4px 14px -2px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05); }
        @media (max-width: 640px) {
          .transparency-card h2 { font-size:1.05rem; }
        }
      `}</style>
    </div>
  );
};

export default TransparencyPage;
/////////done/////////