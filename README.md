# AlgoLend: Decentralized P2P Lending Platform

**RIFT 2026 Hackathon • Algorand Open Innovation Track**

AlgoLend is a fully decentralized peer-to-peer lending platform built on the Algorand blockchain. It leverages sub-second finality and negligible transaction fees to provide a seamless borrowing and lending experience.

## 🚀 Links
- **Live Demo**: [https://algolend-demo.vercel.app](https://algolend-demo.vercel.app) *(Deploy to host)*
- **Demo Video**: [LinkedIn Post URL](https://www.linkedin.com/feed/) *(Mandatory: Post and tag RIFT)*
- **App ID (LocalNet)**: `1001`
- **App ID (Testnet)**: `1010` *(Previous deployment, deploy again for new ID)*
- **Explorer**: [Algoscan Testnet](https://testnet.algoscan.app/application/1010)

## 🛠️ Tech Stack
- **Smart Contracts**: PyTeal + Beaker (Instance-based pattern)
- **Development Tool**: AlgoKit
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Animations**: Framer Motion
- **Blockchain Interaction**: `algosdk` + `@algorandfoundation/algokit-utils`

## 🏗️ Architecture
AlgoLend uses a state-of-the-art instance-based Beaker pattern.
- **Global State**: Tracks total loans, active loans, and platform fees.
- **Local State**: Stores individual loan details (amount, status, lender, due date) on the borrower's account.
- **Frontend**: Connects directly to the Algorand Testnet to sign transactions for loan requests, funding, and repayment.

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/org-p2p-lending.git
   cd org-p2p-lending
   ```

2. **Setup Smart Contract environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Deploy to Testnet**:
   Update `.env` with your mnemonic and run:
   ```bash
   python contracts/deploy.py
   ```

4. **Frontend setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 👥 Team
- **Rajesh**: Full Stack Developer & Blockchain Architect

## 📜 License
MIT
