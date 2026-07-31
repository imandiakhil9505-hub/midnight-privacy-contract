# Product Proposal

## What is the product, and who uses it?
The product is a Web3 Usability Layer designed to hide blockchain complexity—providing wallet abstraction, gasless onboarding, and simple identity/social recovery—so mainstream users can adopt Web3 applications without friction. It targets consumer Web3 application developers who embed the layer, and mainstream non-crypto end-users.

- **The Problem**: Seed phrases, gas fees, and confusing browser extension wallets block mainstream adoption, resulting in onboarding drop-offs exceeding 90% for non-crypto users. Additionally, private key recovery is fragile and prone to human error.
- **Existing Solutions & Gaps**: Current wallets expose raw cryptographic primitives to users. There is no clean abstraction providing email-style login, sponsored gas, and secure social recovery in one embeddable layer.
- **Market Size**: 
  - **TAM**: $11B Web3 Infrastructure
  - **SAM**: $1.8B Onboarding/Wallet Tooling
  - **SOM**: $85M Consumer-App Integrations in 3 years

## Why Midnight specifically?
Traditional transparent blockchains expose all wallet addresses, transaction histories, recovery contacts, and asset balances publicly on-chain. This makes email-style login mappings and social recovery a severe privacy violation. 

Midnight specifically solves this by utilizing zero-knowledge contracts (Compact) and private witness inputs. It allows users to verify their login credentials, email mappings, and recovery thresholds entirely locally in the browser. Only the cryptographic proof of validity is disclosed on-chain, keeping the user's identity, private keys, and recovery network completely shielded from the public ledger.

## Data Model
| Data Point       | Type           | Disclosed To |
|------------------|----------------|--------------|
| `sponsored_gas_counter` | Public ledger  | Everyone (track total sponsored fees limit) |
| `disclosed_recovery_validity` | Disclose outcome | Everyone (boolean confirmation of match) |
| `user_secret_identifier` | Private witness | No one (hash of email/social identity) |
| `social_recovery_threshold` | Private witness | No one (recovery keys/witness details) |
| `private_witness_keys` | Private witness | No one (remains locally in browser) |

## Mainnet Feasibility
Yes, this is highly realistic to reach Mainnet by Level 6. The core identity mapping and ZK signature checks can be handled via lightweight Compact ZK circuits. Gasless onboarding can be achieved by leveraging Midnight's native fee-sponsorship mechanisms, and the wallet abstraction can be packaged as a lightweight, embeddable JavaScript library running local browser ZK provers.
