# Midnight Privacy Counter App

[![Midnight CI](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/actions/workflows/ci.yml/badge.svg)](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/actions/workflows/ci.yml)

> A privacy-preserving smart contract and React/Vite dApp for the Midnight Network, demonstrating zero-knowledge verification driven by private user witnesses.

## Live Demo

[https://midnight-privacy-contract-imandiakh.vercel.app](https://midnight-privacy-contract-imandiakh.vercel.app)

## Contract Address

| Network  | Address                          |
|----------|----------------------------------|
| Preprod  | `mn_contract1preprod_6b0ba3c87f8c073b0341027d3e659b42547f9c00b146f13fee495635` |

## What This Does

This dApp integrates the Midnight.js SDK and Lace Wallet Connector API to allow users to verify credentials privately in the browser. Users connect their Lace wallet, enter a public threshold and their private secret score, and generate a ZK proof locally. The proof is submitted on-chain to confirm eligibility without disclosing the secret score.

## Privacy Model

- **PUBLIC**:
  - `counter`: Cell<Uint<64>> — Total number of verification attempts.
  - `threshold_met`: Cell<Uint<64>> — Total number of successful threshold verifications.
  - Disclosed boolean evaluation results from `disclose(is_valid)`.

- **PRIVATE**:
  - `secret_value`: Uint<64> — User's raw secret score, evaluated exclusively inside the client's browser local ZK prover sandbox.

- **PROVED without revealing**:
  - Proves that their private `secret_value` meets or exceeds `min_threshold` without exposing the numerical value of `secret_value` to node operators or public indexers.

## Privacy Claim

An on-chain observer (inspecting the Midnight ledger or Preprod explorer) can only see:
1. That a transaction was submitted by a wallet.
2. The public counter updated and the disclosed boolean outcome (true/false).
3. The cryptographic verification key hash.

An observer **cannot see**:
1. The user's private `secret_value` score.
2. The user's private PIN/entropy inputs.
3. Any linking info connecting the private inputs to the wallet identity.

## Tech Stack

- Midnight network
- Compact language (v0.20.0)
- Midnight.js SDK (`@midnight-ntwrk/midnight-js-network-provider`, `@midnight-ntwrk/dapp-connector-api`)
- React/Vite (v6)
- Lace wallet extension (configured for Preprod testnet)

## Prerequisites

- **Lace wallet installed** in your browser (configured for Preprod Network)
- **Node.js v22** or higher installed locally
- **Docker Desktop** running (required for local proof server verification)

## Setup & Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/imandiakhil9505-hub/midnight-privacy-contract.git
   cd midnight-privacy-contract
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Proof Server**:
   ```bash
   npm run docker:up
   ```

4. **Compile ZK Circuits**:
   ```bash
   npm run compile
   ```

5. **Start Frontend Dev Server**:
   ```bash
   npm run dev
   ```
   Open your browser to: [http://localhost:3000](http://localhost:3000)

6. **Build Project**:
   ```bash
   npm run build
   ```

## Run Tests

To execute the smart contract unit and privacy verification test suite locally:

```bash
npm test
```

## CI/CD

This repository is integrated with **GitHub Actions CI/CD** workflow. On every push or pull request to the `main` branch, the pipeline:
1. Sets up the Node.js v22 runner environment.
2. Installs dependencies clean from `package-lock.json`.
3. Runs contract compilation (`npm run compile`) to verify Compact syntax and output ZK circuits.
4. Executes the test suite (`npm test`) asserting state transition validity and private input safety.
5. Performs production Vite compilation (`npm run build`) to guarantee zero compile errors in the frontend build.

## Product Proposal

See [PROPOSAL.md](file:///C:/Users/lenovo/OneDrive/Desktop/midnight-project/PROPOSAL.md) in the root of the project directory.

## Demo Video

Watch the Level 2 DApp demonstration video on YouTube:  
👉 **[Watch the Level 2 Demo Video](https://youtu.be/o3QgMhD1a_o?si=omJyOB_qS213xwQW)**
