# How to Use ZkAgentPay

This guide explains how to run and use the **ZkAgentPay** application console to perform secure, privacy-preserving agent-to-agent transactions.

## What You Need

1. **Cardano Lace Wallet Extension**: Make sure your Lace browser wallet extension is configured to the **Preprod Network**.
2. **Node.js v22 or v24**: Ensure you have Node.js installed locally.
3. **Docker Desktop**: Required to spin up the local proving daemon.

---

## Step-by-Step Guide

1. **Open the DApp**: Navigate to the live demo URL: [https://midnight-privacy-contract-imandiakh.vercel.app](https://midnight-privacy-contract-imandiakh.vercel.app).
2. **Connect Agent Wallet**: Click the **"Connect Agent Wallet"** button to authenticate the transacting agent. If Lace is not present, a simulated agent endpoint is automatically initiated.
3. **Enter Payment Amount**: Under **"Payment Amount"**, enter the amount the agent wishes to spend (e.g. `50`).
4. **Enter Policy Limit**: Under **"Policy Spending Limit"**, enter the platform-mandated max daily limit (e.g. `500`).
5. **Enter Secret Balance**: In the **"Private Spending Balance"** field, input the agent's current private daily spending balance (e.g. `350`). This field is password-masked to keep the balance hidden from screen-capture.
6. **Verify and Execute**: Click the green **"Verify limit & Authorise Payment"** button. The local prover will execute the ZK policy circuit.
7. **Audit Confirmation**: Once verified, the transaction executes, returning a Preprod transaction hash and logging confirmation to the tamper-evident ledger.

---

## What Gets Proved (and What Stays Private)

* **What gets PROVED**:
  - The contract proves that: `(secret_spending_balance + payment_amount) <= max_limit` evaluates to true.
* **What stays PRIVATE**:
  - The agent's raw **`secret_spending_balance`** is kept completely private, evaluated only inside the client-side local ZK prover sandbox. It is never exposed on-chain.

---

## Troubleshooting

* **Proof generation fails or hangs**: Verify that your local Docker proof server container is active on port `6300` (`docker run -p 6300:6300 midnightnetwork/proof-server`).
