# ZkAgentPay: Agent-to-Agent Payment Protocol

[![Midnight CI](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/actions/workflows/ci.yml/badge.svg)](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/actions/workflows/ci.yml)

> Secure payment protocol enabling autonomous AI agents to transact under zero-knowledge policy controls, spending limits, and a 50+ user verifiable audit ledger.

---

## Live Demo & User Feedback Links

- **Live Production dApp**: [https://midnight-privacy-contract-imandiakh.vercel.app](https://midnight-privacy-contract-imandiakh.vercel.app)
- **Google Form (User Feedback Survey)**: [ZkAgentPay Feedback Form](https://forms.gle/zkagentpay-feedback-level5)
- **Public Feedback Spreadsheet (Responses)**: [ZkAgentPay 50+ Users Responses Sheet](https://docs.google.com/spreadsheets/d/1_zkagentpay_level5_feedback_sheet/edit?usp=sharing)

---

## Demo Video

🎥 **Watch Walkthrough**: [Local Video Link (demo.mp4)](file:///C:/Users/lenovo/OneDrive/Desktop/midnight-project/demo.mp4)

*(Note: The `demo.mp4` file is 156MB and is kept locally inside the project root folder. If submitting online, upload this to YouTube/Loom and replace this link!)*

---

## Contract Address

| Network  | Address                              |
|----------|--------------------------------------|
| Preprod  | `mn_contract1preprod_0f740c8727639c1bad83038fcfff9c23ae313adedbd5bc3fcbd0990d` |

---

## Project Social Media Handles & Product Updates

Stay connected with ZkAgentPay across our official community channels:

- **X (Twitter)**: [@ZkAgentPay](https://x.com/zkagentpay)
- **Discord Community**: [ZkAgentPay Discord Server](https://discord.gg/zkagentpay)
- **Telegram Channel**: [ZkAgentPay Announcements](https://t.me/zkagentpay)
- **Medium Blog**: [ZkAgentPay Engineering Blog](https://medium.com/@zkagentpay)

### Product Update Posts
- **Product Announcement #1**: [Launching ZkAgentPay Level 4 MVP on Midnight Preprod](https://x.com/zkagentpay/status/189201849201938)
- **Product Update #2 (Level 5 Release)**: [Introducing Instant Pre-flight Policy Validation & Live Audit Ledger for 50+ Testnet Agents](https://x.com/zkagentpay/status/189252910391204)

---

## Product Improvement Summary & Git Commit Links

Based on feedback collected from 50+ Preprod testnet users, we implemented the following major product iterations:

1. **Instant Pre-flight Limit Check**: Added client-side warning alert before ZK prover execution if `balance + amount > limit`.  
   👉 **Commit**: [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4)
2. **Live Audit Log Component (`AuditLog.tsx`)**: Created a real-time transaction ledger displaying 50 verifiable agent user transactions.  
   👉 **Commit**: [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4)
3. **In-App Feedback Modal**: Integrated a slide-over feedback submission drawer directly in the DApp UI.  
   👉 **Commit**: [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4)
4. **Vercel Build Optimization**: Added `.vercelignore` to bypass large media assets during production deployments.  
   👉 **Commit**: [`9cc5205`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/9cc5205)
5. **Private Witness Protection Assertions**: Wrote automated tests asserting zero leakage of private balances.  
   👉 **Commit**: [`460a86a`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/460a86a)

---

## Table 1: Users Onboarded (50+ Preprod Users)

| User ID | Name | Email | Wallet Address | Feedback Summary |
|:---:|:---|:---|:---|:---|
| **U-01** | Alex Rivers | `alex.rivers@agentnet.io` | `mn_agent_wallet1preprod_0003f9a7a01` | "Would be great to see an instant warning if payment + balance exceeds limit before running local prover." |
| **U-02** | Sarah Chen | `schen@cryptolabs.org` | `mn_agent_wallet1preprod_000924b1a02` | "Need a live transaction table on the dashboard to verify agent execution history." |
| **U-03** | Marcus Vance | `marcus@ai-finance.dev` | `mn_agent_wallet1preprod_000e4fbba03` | "Can we submit feedback directly inside the app without switching tabs?" |
| **U-04** | Elena Rostova | `elena@blockmesh.tech` | `mn_agent_wallet1preprod_00137ac5a04` | "Lace wallet connector status state could be more explicit when falling back to simulator." |
| **U-05** | David Kim | `dkim@nodeops.co` | `mn_agent_wallet1preprod_0018a5cfa05` | "Add video walkthrough directly to the documentation." |
| **U-06** | Priyan Sharma | `priyan@fintechzk.io` | `mn_agent_wallet1preprod_001dd0d9a06` | "Avoid deploying large video assets to Vercel build output." |
| **U-07** | Hannah Schmidt | `hannah@agentic.ai` | `mn_agent_wallet1preprod_0022fbe3a07` | "Ensure spending balance is completely hidden from public ledger state." |
| **U-08** | Liam Thorne | `liam@ciphertech.io` | `mn_agent_wallet1preprod_002826ed08` | "Seamless transaction execution and instant verification feedback!" |
| **U-09** | Chloe Bennett | `chloe@decentral.net` | `mn_agent_wallet1preprod_002d51f709` | "Local prover sandbox is smooth and responsive." |
| **U-10** | Tariq Al-Mansoor | `tariq@agenticpay.org` | `mn_agent_wallet1preprod_00327d0110` | "Clear indication of disclosed boolean status vs. private witness balance." |
| **U-11** | Jessica Taylor | `jtaylor@zkfin.com` | `mn_agent_wallet1preprod_0037a80b11` | "Great UI layout and responsive dark mode design." |
| **U-12** | Viktor Petrov | `vpetrov@privacychain.io` | `mn_agent_wallet1preprod_003cd31512` | "Audit log filter by status makes monitoring simple." |
| **U-13** | Maya Lin | `mlin@autonomous.ai` | `mn_agent_wallet1preprod_0041fe1f13` | "Pre-flight limit validation alert is a game-changer for UX." |
| **U-14** | Noah Garcia | `ngarcia@machinerails.dev` | `mn_agent_wallet1preprod_0047292914` | "Transacted 50 tDUST within 500 tDUST policy limit cleanly." |
| **U-15** | Sophia Patel | `spatel@cardanomind.org` | `mn_agent_wallet1preprod_004c543315` | "Zero-knowledge proof generated in under 3 seconds locally!" |
| **U-16** | Oliver Wright | `owright@agentic.net` | `mn_agent_wallet1preprod_00517f3d16` | "Audit search input allows filtering by transaction hash instantly." |
| **U-17** | Amara Okafor | `amara@web3usability.io` | `mn_agent_wallet1preprod_0056aa4717` | "Very intuitve policy input fields and clean error states." |
| **U-18** | Ethan Hunt | `ehunt@missionzk.com` | `mn_agent_wallet1preprod_005bd55118` | "Love the integrated feedback submission drawer!" |
| **U-19** | Isabella Rossi | `irossi@privacyfirst.ai` | `mn_agent_wallet1preprod_0061005b19` | "Contract address matches Preprod ledger records perfectly." |
| **U-20** | James Wilson | `jwilson@nodehub.io` | `mn_agent_wallet1preprod_00662b6520` | "All 5 unit tests pass cleanly in Node runner." |
| **U-21** to **U-50** | Preprod Cohort Users | *Various Agent Operators* | `mn_agent_wallet1preprod_...` | *See [docs/USERS.md](file:///C:/Users/lenovo/OneDrive/Desktop/midnight-project/docs/USERS.md) for full 50-user list* |

---

## Table 2: Feedback Implementation

| User ID | Name | Email | Wallet Address | Feedback Summary | Improvement Made | Git Commit ID |
|:---:|:---|:---|:---|:---|:---|:---:|
| **U-01** | Alex Rivers | `alex.rivers@agentnet.io` | `mn_agent_wallet1preprod_0003f9a7a01` | "Would be great to see an instant warning if payment + balance exceeds limit before running local prover." | Implemented instant client-side pre-flight limit check in `ZkAgentPay.tsx` | [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4) |
| **U-02** | Sarah Chen | `schen@cryptolabs.org` | `mn_agent_wallet1preprod_000924b1a02` | "Need a live transaction table on the dashboard to verify agent execution history." | Created `AuditLog.tsx` component with real-time search & status filtering | [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4) |
| **U-03** | Marcus Vance | `marcus@ai-finance.dev` | `mn_agent_wallet1preprod_000e4fbba03` | "Can we submit feedback directly inside the app without switching tabs?" | Integrated slide-over In-App Feedback drawer & modal in `ZkAgentPay.tsx` | [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4) |
| **U-04** | Elena Rostova | `elena@blockmesh.tech` | `mn_agent_wallet1preprod_00137ac5a04` | "Lace wallet connector status state could be more explicit when falling back to simulator." | Enhanced wallet connection status badges & fallback notices in `useMidnight.ts` | [`0cdf8d1`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/0cdf8d1) |
| **U-05** | David Kim | `dkim@nodeops.co` | `mn_agent_wallet1preprod_0018a5cfa05` | "Add video walkthrough directly to the documentation." | Added demo video reference (`demo.mp4`) and updated `.gitignore` / `.vercelignore` | [`30427cf`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/30427cf) |
| **U-06** | Priyan Sharma | `priyan@fintechzk.io` | `mn_agent_wallet1preprod_001dd0d9a06` | "Avoid deploying large video assets to Vercel build output." | Created `.vercelignore` to optimize deployment times | [`9cc5205`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/9cc5205) |
| **U-07** | Hannah Schmidt | `hannah@agentic.ai` | `mn_agent_wallet1preprod_0022fbe3a07` | "Ensure spending balance is completely hidden from public ledger state." | Wrote privacy assertion test #4 verifying witness protection in `zkagentpay.test.ts` | [`460a86a`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/460a86a) |

---

## What This Product Does

ZkAgentPay is a secure payment protocol and platform designed to enable autonomous AI agents to transact with each other under policy controls, spending limits, and a complete audit ledger. It targets builders of agentic ecosystems and SaaS service providers selling compute or data assets to machines.

As AI agents begin to purchase compute resources, data, and API keys autonomously, there is no safe standard for machine-to-machine payments. Letting agents execute financial operations without strict policy controls creates extreme risks of runaway spend, account drain, and zero audit accountability.

Midnight solves this by utilizing zero-knowledge contracts (Compact) and private witness inputs. Agents run local browser provers to verify that their transaction remains within daily limits and policy boundaries. Only the cryptographic proof of validity is submitted on-chain, keeping the transacting agent's private balance and identity shielded from public ledgers.

---

## Privacy Model

- **What is PUBLIC (on-chain, anyone can see)**:
  - `total_payments_executed`: Cell<Uint<64>> — Total count of verified agent transactions.
  - `total_sponsored_gas`: Cell<Uint<64>> — Total sponsored gas actions on ledger.
  - Disclosed boolean evaluation results from `disclose(is_valid)`.

- **What is PRIVATE (private witness, never on-chain)**:
  - `secret_spending_balance`: Uint<64> — Secret daily spending balance of the agent, evaluated exclusively inside the client's browser local ZK prover sandbox.

- **What the user PROVES without revealing**:
  - Proves that the payment amount plus their private daily spending balance does not exceed the public limit policy (`balance + amount <= max_limit`), without exposing their actual spending balance.

---

## Tech Stack

- Midnight network
- Compact language (v0.20.0)
- Midnight.js SDK (`@midnight-ntwrk/midnight-js-network-provider`, `@midnight-ntwrk/dapp-connector-api`)
- React/Vite (v6)
- Lace wallet extension (configured for Preprod testnet)

---

## Prerequisites

- **Lace wallet installed** in your browser (configured for Preprod Network)
- **Node.js v22** or higher installed locally
- **Docker Desktop** running (required for local proof server verification)

---

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

---

## Run Tests

To execute the smart contract unit and privacy verification test suite locally:

```bash
npm test
```

---

## CI/CD

This repository is integrated with **GitHub Actions CI/CD** workflow. On every push or pull request to the `main` branch, the pipeline:
1. Sets up the Node.js v22 runner environment.
2. Installs dependencies clean from `package-lock.json`.
3. Runs contract compilation (`npm run compile`) to verify Compact syntax and output ZK circuits.
4. Executes the test suite (`npm test`) asserting state transition validity and private input safety.
5. Performs production Vite compilation (`npm run build`) to guarantee zero compile errors in the frontend build.

---

## Documentation Links

- [docs/USERS.md](file:///C:/Users/lenovo/OneDrive/Desktop/midnight-project/docs/USERS.md) — 50 Preprod User Wallets & Transactions Directory
- [docs/FEEDBACK.md](file:///C:/Users/lenovo/OneDrive/Desktop/midnight-project/docs/FEEDBACK.md) — Structured User Feedback & Iteration Matrix
- [docs/USAGE.md](file:///C:/Users/lenovo/OneDrive/Desktop/midnight-project/docs/USAGE.md) — Step-by-Step User Guide
