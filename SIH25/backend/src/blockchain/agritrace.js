import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PROVIDER_URL = process.env.PROVIDER_URL;

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

// Load ABI
const abiPath = path.resolve('..', 'hardhat', 'artifacts', 'contracts', 'AgriTrace.sol', 'AgriTrace.json');
const abiJson = JSON.parse(fs.readFileSync(abiPath));
const abi = abiJson.abi;

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

export default contract;
