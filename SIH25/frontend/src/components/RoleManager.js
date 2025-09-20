import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/roles';

function RoleManager() {
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('FARMER_ROLE');
  const [result, setResult] = useState(null);
  const [checkAddress, setCheckAddress] = useState('');
  const [checkRole, setCheckRole] = useState('FARMER_ROLE');
  const [hasRole, setHasRole] = useState(null);

  const handleGrant = async () => {
    try {
      const res = await axios.post(`${API}/grant`, { role, address });
      setResult(`Granted ${role} to ${address}. Tx: ${res.data.txHash}`);
    } catch (err) {
      setResult(err.response?.data?.error || err.message);
    }
  };

  const handleRevoke = async () => {
    try {
      const res = await axios.post(`${API}/revoke`, { role, address });
      setResult(`Revoked ${role} from ${address}. Tx: ${res.data.txHash}`);
    } catch (err) {
      setResult(err.response?.data?.error || err.message);
    }
  };

  const handleCheck = async () => {
    try {
      const res = await axios.get(`${API}/has`, { params: { role: checkRole, address: checkAddress } });
      setHasRole(res.data.hasRole);
    } catch (err) {
      setHasRole('Error');
    }
  };

  return (
    <div>
      <h3 className="form-section-title">Role Management (Admin)</h3>
      <div className="space-y-6">
        <div className="form-grid two">
          <div className="form-field col-span-2">
            <label className="form-label">Grant / Revoke Role</label>
            <input className="form-input" value={address} onChange={e => setAddress(e.target.value)} placeholder="0x Address" />
          </div>
          <div className="form-field">
            <label className="form-label">Role</label>
            <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
              <option value="FARMER_ROLE">FARMER_ROLE</option>
              <option value="INSPECTOR_ROLE">INSPECTOR_ROLE</option>
              <option value="DISTRIBUTOR_ROLE">DISTRIBUTOR_ROLE</option>
              <option value="RETAILER_ROLE">RETAILER_ROLE</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="form-button" onClick={handleGrant}>Grant</button>
            <button type="button" className="form-button secondary" onClick={handleRevoke}>Revoke</button>
          </div>
        </div>
        {result && <div className="text-xs font-medium text-gray-700">{result}</div>}
        <div className="divider" />
        <div className="form-grid two">
          <div className="form-field col-span-2">
            <label className="form-label">Check Address</label>
            <input className="form-input" value={checkAddress} onChange={e => setCheckAddress(e.target.value)} placeholder="0x Address" />
          </div>
          <div className="form-field">
            <label className="form-label">Role</label>
            <select className="form-select" value={checkRole} onChange={e => setCheckRole(e.target.value)}>
              <option value="FARMER_ROLE">FARMER_ROLE</option>
              <option value="INSPECTOR_ROLE">INSPECTOR_ROLE</option>
              <option value="DISTRIBUTOR_ROLE">DISTRIBUTOR_ROLE</option>
              <option value="RETAILER_ROLE">RETAILER_ROLE</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="form-button" onClick={handleCheck}>Check Role</button>
            {hasRole !== null && (
              <span className={`text-xs font-semibold ${hasRole === true ? 'text-emerald-600' : hasRole === false ? 'text-red-600' : 'text-gray-500'}`}>{hasRole === true ? 'Has Role' : hasRole === false ? 'No Role' : hasRole}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleManager;
