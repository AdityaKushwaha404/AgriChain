import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeDisplay({ value }) {
  if (!value) return <p className="text-xs text-gray-500">Generate or select a batch to view QR code.</p>;
  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <QRCode value={value} size={160} includeMargin={false} />
      </div>
      <div className="mt-3 text-[10px] leading-snug max-w-[260px] break-all text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
        {value}
      </div>
    </div>
  );
}

export default QRCodeDisplay;
