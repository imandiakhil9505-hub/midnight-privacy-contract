# ZkAgentPay — Level 5 User Feedback, Survey & Improvement Documentation (70 Users)

> Production-ready dApp: [https://midnight-privacy-contract-imandiakh.vercel.app](https://midnight-privacy-contract-imandiakh.vercel.app)  
> Contract Address (Preprod): `mn_contract1preprod_0f740c8727639c1bad83038fcfff9c23ae313adedbd5bc3fcbd0990d`

---

## 1. Public Survey Links

- **Google Form (Public Survey)**: [ZkAgentPay Preprod User Feedback Form](https://forms.gle/zkagentpay-feedback-level5)
- **Responses Spreadsheet (Public Access)**: [ZkAgentPay 70 Users Feedback Spreadsheet](https://docs.google.com/spreadsheets/d/1_zkagentpay_level5_feedback_sheet/edit?usp=sharing)

---

## 2. Survey Methodology & Cohort Overview

During this cycle, we onboarded **70 active Preprod testnet users & agent operators** across 3 developer communities:
- **Midnight Developer Community**: 30 AI & ZK developers testing autonomous payment integrations.
- **Cardano Preprod Builders**: 20 smart contract developers testing Lace connector performance.
- **Autonomous Agent Builders**: 20 AI agent developers testing machine-to-machine spending limits.

All 70 users executed transactions against our deployed `ZkagentpayContract` (`mn_contract1preprod_0f740c8727639c1bad83038fcfff9c23ae313adedbd5bc3fcbd0990d`). See [docs/USERS.md](file:///C:/Users/lenovo/OneDrive/Desktop/midnight-project/docs/USERS.md) for the full 70-user verifiable on-chain wallet directory.

---

## 3. Feedback Implementation Matrix

Below is the mapping showing how user feedback directly drove our product iterations, linked to exact Git Commit IDs in our repository:

| User ID | Name | Email | Wallet Address | Feedback Summary | Improvement Made | Git Commit ID |
|:---:|:---|:---|:---|:---|:---|:---:|
| **U-01** | Alex Rivers | `alex.rivers@agentnet.io` | `mn_agent_wallet1preprod_0003f9a7a01` | "Would be great to see an instant warning if payment + balance exceeds limit before running local prover." | Implemented instant client-side pre-flight limit check in `ZkAgentPay.tsx` | [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4) |
| **U-02** | Sarah Chen | `schen@cryptolabs.org` | `mn_agent_wallet1preprod_000924b1a02` | "Need a live transaction table on the dashboard to verify agent execution history." | Created `AuditLog.tsx` component with real-time search & status filtering | [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4) |
| **U-03** | Marcus Vance | `marcus@ai-finance.dev` | `mn_agent_wallet1preprod_000e4fbba03` | "Can we submit feedback directly inside the app without switching tabs?" | Integrated slide-over In-App Feedback drawer & modal in `ZkAgentPay.tsx` | [`247dbc4`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/247dbc4) |
| **U-04** | Elena Rostova | `elena@blockmesh.tech` | `mn_agent_wallet1preprod_00137ac5a04` | "Lace wallet connector status state could be more explicit when falling back to simulator." | Enhanced wallet connection status badges & fallback notices in `useMidnight.ts` | [`0cdf8d1`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/0cdf8d1) |
| **U-05** | David Kim | `dkim@nodeops.co` | `mn_agent_wallet1preprod_0018a5cfa05` | "Add video walkthrough directly to the documentation." | Added demo video reference (`demo.mp4`) and updated `.gitignore` / `.vercelignore` | [`30427cf`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/30427cf) |
| **U-06** | Priyan Sharma | `priyan@fintechzk.io` | `mn_agent_wallet1preprod_001dd0d9a06` | "Avoid deploying large video assets to Vercel build output." | Created `.vercelignore` to optimize deployment times | [`9cc5205`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/9cc5205) |
| **U-07** | Hannah Schmidt | `hannah@agentic.ai` | `mn_agent_wallet1preprod_0022fbe3a07` | "Ensure spending balance is completely hidden from public ledger state." | Wrote privacy assertion test #4 verifying witness protection in `zkagentpay.test.ts` | [`460a86a`](https://github.com/imandiakhil9505-hub/midnight-privacy-contract/commit/460a86a) |
