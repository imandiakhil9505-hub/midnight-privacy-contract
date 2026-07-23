# Midnight Privacy Counter App

> A privacy-preserving smart contract and React/Vite dApp for the Midnight Network, demonstrating zero-knowledge verification driven by private user witnesses.

## Live Demo

[https://midnight-privacy-contract.vercel.app](https://midnight-privacy-contract.vercel.app)

## Contract Address

| Network  | Address                          |
|----------|----------------------------------|
| Preprod  | `mn_contract1preprod_6b0ba3c87f8c073b0341027d3e659b42547f9c00b146f13fee495635` |

## What This Does

This dApp integrates the Midnight.js SDK and Lace Wallet Connector API to allow users to verify credentials privately in the browser. Users connect their Lace wallet, enter a public threshold and their private secret score, and generate a ZK proof locally. The proof is submitted on-chain to confirm eligibility without disclosing the secret score.

## Privacy Model

- **What is PUBLIC**:
  - `counter`: Cell<Uint<64>> — Total number of verification attempts.
  - `threshold_met`: Cell<Uint<64>> — Total number of successful threshold verifications.
  - Disclosed boolean evaluation results from `disclose(is_valid)`.

- **What is PRIVATE**:
  - `secret_value`: Uint<64> — User's raw secret score, evaluated exclusively inside the client's browser local ZK prover sandbox.

- **What the user PROVES without revealing**:
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

## Run Locally

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

## Demo Video

[PLACEHOLDER — Click here to view Level 2 demo walk-through video]
