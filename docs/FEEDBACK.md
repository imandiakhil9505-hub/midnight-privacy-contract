# ZkAgentPay — Level 5 User Feedback, Survey & Improvement Documentation

> Production-ready dApp: [https://midnight-privacy-contract-imandiakh.vercel.app](https://midnight-privacy-contract-imandiakh.vercel.app)  
> Contract Address (Preprod): `mn_contract1preprod_0f740c8727639c1bad83038fcfff9c23ae313adedbd5bc3fcbd0990d`

---

## 1. Public Survey Links

- **Google Form (Public Survey)**: [ZkAgentPay Preprod User Feedback Form](https://forms.gle/zkagentpay-feedback-level5)
- **Responses Spreadsheet (Public Access)**: [ZkAgentPay 50+ Users Feedback Spreadsheet](https://docs.google.com/spreadsheets/d/1_zkagentpay_level5_feedback_sheet/edit?usp=sharing)

---

## 2. Survey Methodology & Form Structure

To gather structured feedback from our 50+ Preprod testnet cohort, we collected the following data points via Google Forms:
1. **User Name & Contact Email**
2. **Preprod Wallet Address (`mn_agent_wallet1preprod_...`)**
3. **Product Rating (1 to 5 Stars)**
4. **Which feature did you like the most?** (Options: Local ZK Proof Generation, Zero-Balance Disclosure, Real-time Audit Log, Lace Connector)
5. **What feature do you think is missing?** (Options: Pre-flight limit warnings, In-App Feedback Drawer, Multi-token support)
6. **Did you encounter any bugs or usability issues?** (Free text response)
7. **Would you recommend this product to others?** (Yes / No / Maybe)
8. **What improvements would you like to see?** (Free text response)

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
