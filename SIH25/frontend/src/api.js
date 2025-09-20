import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export const createBatch = async (data) => {
  return axios.post(`${API_BASE}/blockchain/createBatch`, data);
};

export const getBatch = async (batchId) => {
  return axios.get(`${API_BASE}/blockchain/batch/${batchId}`);
};

export const recordTransfer = async (data) => {
  return axios.post(`${API_BASE}/blockchain/actions/transfer`, data);
};

export const recordArrival = async (data) => {
  return axios.post(`${API_BASE}/blockchain/actions/arrival`, data);
};

export const postPrice = async (data) => {
  return axios.post(`${API_BASE}/blockchain/actions/price`, data);
};

export const buyBatch = async (data) => {
  return axios.post(`${API_BASE}/blockchain/actions/buy`, data);
};

export const recordQuality = async (data) => {
  return axios.post(`${API_BASE}/blockchain/actions/quality`, data);
};
