# ZkUsability Layer

[![Midnight CI](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/actions/workflows/ci.yml/badge.svg)](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/actions/workflows/ci.yml)

> Hiding Web3 complexity with private wallet abstraction, sponsored gas, and decentralized social recovery driven by ZK-SNARK provers.

## Live Demo

[https://midnight-privacy-contract-imandiakh.vercel.app](https://midnight-privacy-contract-imandiakh.vercel.app)

## Contract Address

| Network  | Address                              |
|----------|--------------------------------------|
| Preprod  | `mn_contract1preprod_335945b4e0eb4f3852a27ff5e0a219d35d083e55d780534597aeba0c` |

## What This Product Does

ZkUsability is a decentralized usability layer designed to abstract blockchain complexity—offering wallet abstraction, gasless onboarding, and private identity/social recovery—so mainstream users can adopt Web3 applications without friction. It targets consumer Web3 application developers who embed the layer, and mainstream non-crypto end-users.

Seed phrases, gas fees, and confusing browser extension wallets block mainstream adoption, resulting in onboarding drop-offs exceeding 90% for non-crypto users. Additionally, private key recovery is fragile and prone to human error. Current wallets expose raw cryptographic primitives to users, with no clean abstraction offering email login, sponsored gas, and secure recovery in one unified layer.

Midnight specifically solves this by utilizing zero-knowledge contracts (Compact) and private witness inputs. It allows users to verify their login credentials, email mappings, and recovery thresholds entirely locally in the browser. Only the cryptographic proof of validity is disclosed on-chain, keeping the user's identity, private keys, and recovery network completely shielded from the public ledger.

## Privacy Model

- **What is PUBLIC (on-chain, anyone can see)**:
  - `recovery_counter`: Cell<Uint<64>> — Total number of validated identity/recovery check attempts.
  - `gas_sponsored_counter`: Cell<Uint<64>> — Total number of gas-sponsored recovery actions.
  - Disclosed boolean evaluation results from `disclose(is_valid)`.

- **What is PRIVATE (private witness, never on-chain)**:
  - `secret_identity_key`: Uint<64> — Secret email/social key hash representing the user's private credentials, evaluated exclusively inside the client's browser local ZK prover sandbox.

- **What the user PROVES without revealing**:
  - Proves that their private `secret_identity_key` meets or exceeds `min_threshold` without exposing the numerical value of `secret_identity_key` to node operators, validators, or public indexers.

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

## Usage Guide

See [docs/USAGE.md](file:///C:/Users/lenovo/OneDrive/Desktop/midnight-project/docs/USAGE.md) in the project directory.

## Product X Profile

[https://x.com/zkusability](https://x.com/zkusability)
