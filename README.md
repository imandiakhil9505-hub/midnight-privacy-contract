# ZkAgentPay: Agent-to-Agent Payment Protocol

[![Midnight CI](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/actions/workflows/ci.yml/badge.svg)](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/actions/workflows/ci.yml)

> Secure payment protocol and platform enabling autonomous AI agents to transact under zero-knowledge policy controls, spending limits, and an auditable ledger.

## Live Demo

[https://midnight-privacy-contract-imandiakh.vercel.app](https://midnight-privacy-contract-imandiakh.vercel.app)

## Contract Address

| Network  | Address                              |
|----------|--------------------------------------|
| Preprod  | `mn_contract1preprod_0f740c8727639c1bad83038fcfff9c23ae313adedbd5bc3fcbd0990d` |

## What This Product Does

ZkAgentPay is a secure payment protocol and platform designed to enable autonomous AI agents to transact with each other under policy controls, spending limits, and a complete audit ledger. It targets builders of agentic ecosystems and SaaS service providers selling compute or data assets to machines.

As AI agents begin to purchase compute resources, data, and API keys autonomously, there is no safe standard for machine-to-machine payments. Letting agents execute financial operations without strict policy controls creates extreme risks of runaway spend, account drain, and zero audit accountability.

Midnight solves this by utilizing zero-knowledge contracts (Compact) and private witness inputs. Agents run local browser provers to verify that their transaction remains within daily limits and policy boundaries. Only the cryptographic proof of validity is submitted on-chain, keeping the transacting agent's private balance and identity shielded from public ledgers.

## Privacy Model

- **What is PUBLIC (on-chain, anyone can see)**:
  - `total_payments_executed`: Cell<Uint<64>> — Total count of verified agent transactions.
  - `total_sponsored_gas`: Cell<Uint<64>> — Total sponsored gas actions on ledger.
  - Disclosed boolean evaluation results from `disclose(is_valid)`.

- **What is PRIVATE (private witness, never on-chain)**:
  - `secret_spending_balance`: Uint<64> — Secret daily spending balance of the agent, evaluated exclusively inside the client's browser local ZK prover sandbox.

- **What the user PROVES without revealing**:
  - Proves that the payment amount plus their private daily spending balance does not exceed the public limit policy (`balance + amount <= max_limit`), without exposing their actual spending balance.

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

[https://x.com/zkagentpay](https://x.com/zkagentpay)
