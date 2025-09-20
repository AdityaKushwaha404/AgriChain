# AgriChain - Blockchain Agricultural Traceability System

A comprehensive blockchain-based solution for agricultural supply chain traceability, featuring smart contracts, ML analytics, and a modern React frontend.

## 🚀 Live Demo

Frontend: [Your Vercel URL will appear here after deployment]

## 📁 Project Structure

```
AgriChain/
├── SIH25/
│   ├── frontend/          # React.js frontend application
│   ├── backend/           # Express.js API server
│   ├── hardhat/          # Smart contracts (Solidity)
│   └── ml-service/       # Machine learning service
├── vercel.json           # Vercel deployment configuration
└── README.md            # This file
```

## 🛠️ Technologies Used

- **Frontend:** React.js, Tailwind CSS, Web3.js, Ethers.js
- **Backend:** Node.js, Express.js, MongoDB
- **Blockchain:** Solidity, Hardhat, OpenZeppelin
- **ML Service:** Python, Flask, scikit-learn
- **Deployment:** Vercel (Frontend), MongoDB Atlas (Database)

## 🔧 Local Development

### Frontend Setup
```bash
cd SIH25/frontend
npm install
npm start
```

### Backend Setup
```bash
cd SIH25/backend
npm install
cp .env.example .env
# Configure your environment variables
npm start
```

### Smart Contracts
```bash
cd SIH25/hardhat
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub:** Code is already in your repository
2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings (see below)

### Vercel Configuration

- **Framework Preset:** Create React App
- **Root Directory:** `SIH25/frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `build`

### Environment Variables for Vercel

Add these environment variables in your Vercel project settings:

```
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_NETWORK_NAME=mainnet
REACT_APP_NETWORK_ID=1
REACT_APP_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
REACT_APP_CONTRACT_ADDRESS=your-deployed-contract-address
```

## 📋 Features

- **Blockchain Traceability:** Track products from farm to consumer
- **Smart Contracts:** Automated, transparent transactions
- **ML Analytics:** Price and quality predictions
- **QR Code Integration:** Easy product verification
- **Role-based Access:** Different permissions for stakeholders
- **Real-time Updates:** Live tracking and notifications

## 🔐 Security

- Environment variables for sensitive data
- Smart contract security best practices
- Input validation and sanitization
- CORS configuration for API security

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Developed for SIH 2025 - Smart India Hackathon

## 📞 Support

For support and questions, please open an issue in the GitHub repository.