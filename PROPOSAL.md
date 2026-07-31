# Product Proposal

## What is the product, and who uses it?
**ZkCredit** is a decentralized, privacy-preserving Age and Eligibility Gate protocol built on the Midnight Network. It enables users (consumers, borrowers, or customers of age-restricted platforms) to prove they satisfy required score or age thresholds (e.g., credit score >= 700, age >= 18 or 21) to any third-party verifier without exposing their raw score, age, or identity. Financial institutions, service providers, and age-gated platforms use this to verify customer eligibility securely, automatically, and privately.

## Why Midnight specifically?
Transparent blockchains (like Ethereum or Cardano) force all smart contract states, transaction arguments, and input parameters to be stored publicly on-chain. Verifying eligibility on a transparent chain would leak the user's raw private scores or force them to trust a centralized off-chain server. Midnight specifically solves this problem by using zero-knowledge circuits (Compact) and private witness inputs. The raw score/age remains local to the user's browser, and only a cryptographic proof of compliance is generated and validated on-chain.

## Data Model
| Data Point       | Type           | Disclosed To |
|------------------|----------------|--------------|
| `counter`        | Public ledger  | Everyone     |
| `threshold_met`  | Public ledger  | Everyone     |
| `min_threshold`  | Public ledger (transaction input) | Everyone |
| `secret_value`   | Private witness| No one (remains locally in browser) |
| `disclosed_result`| Disclose outcome | Everyone |

## Mainnet Feasibility
Yes, this is highly realistic for a Mainnet release by Level 6. The core Compact contract logic and ZK circuits are lightweight, robust, and compile quickly in browser proving environments. The frontend integration relies on standard Lace wallet connector APIs and requires no complex off-chain oracle networks or expensive computation, making it a highly feasible, production-ready solution.
