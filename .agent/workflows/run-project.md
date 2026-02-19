---
description: How to run the Algorand P2P Lending project (Frontend & Backend)
---

Follow these steps to get the project up and running locally.

### 1. Prerequisites
Ensure you have the Algorand LocalNet running.
```bash
algokit localnet start
```

### 2. Run Backend (Deploy Smart Contract)
Open a terminal in the root directory:
```bash
# 1. Activate the virtual environment
source venv/bin/activate

# 2. Deploy the contract to LocalNet
python contracts/deploy.py
```
> [!NOTE]
> Note the `APP ID` printed at the end of the deployment. If it's different from the one in `frontend/.env`, update it there.

### 3. Run Frontend
Open a **new** terminal in the root directory:
```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.
