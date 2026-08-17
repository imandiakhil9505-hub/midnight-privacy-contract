# How to Use ZkUsability

This guide explains how to run and use the **ZkUsability** application to privately verify your credentials or perform secure social recovery checks.

## What You Need

1. **Cardano Lace Wallet Extension**: Make sure you have the Lace wallet browser extension installed and configured for the **Preprod Network**.
2. **Node.js v22 or v24**: Ensure you have Node.js installed locally on your system.
3. **Docker Desktop**: Required to run the local proof server context that generates ZK-SNARK proofs.

---

## Step-by-Step Guide

1. **Open the DApp**: Navigate to the live demo URL in your browser: [https://midnight-privacy-contract-imandiakh.vercel.app](https://midnight-privacy-contract-imandiakh.vercel.app).
2. **Connect Wallet**: Click the **"Connect Lace Wallet"** button. If you have the Lace extension installed, it will prompt you to connect. If not, it will automatically connect you to a simulated network wallet.
3. **Set Threshold**: Under the **"Public Threshold Score"** input field, type in the threshold target required by the platform (e.g. `700`).
4. **Enter Private Key**: In the **"Private Identity Key"** field, type your secret credential or identity hash (e.g. `850`). This field is password-masked, ensuring that your secret key is never visible to observers looking at your screen.
5. **Verify privately**: Click the green **"Generate Proof & Submit"** button. The local browser prover will generate a ZK proof, compile constraints, and submit it on-chain.
6. **Confirmation**: Once confirmed, you will see a transaction hash and a disclosed validation status (Verified or Rejected).

---

## What Gets Proved (and What Stays Private)

* **What gets PROVED**:
  - The contract proves that the private key value you typed satisfies `secret_identity_key >= min_threshold`.
* **What stays PRIVATE**:
  - Your raw numerical **`secret_identity_key`** never leaves your browser, never goes on-chain, and is completely hidden from public ledgers, node operators, and validators.

---

## Troubleshooting

* **Lace wallet shows "Network Mismatch"**: Open your Lace Wallet settings and ensure your active network is switched to **Preprod Testnet**.
* **ZK Proof generation fails or hangs**: Make sure your local Docker proof server is running on port `6300` (`docker run -p 6300:6300 midnightnetwork/proof-server`).
