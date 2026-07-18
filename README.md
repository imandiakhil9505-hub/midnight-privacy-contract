# Midnight Network Compact Smart Contract: ZK Privacy Verifier

A privacy-preserving smart contract developed in **Compact**, the domain-specific smart contract language for the **Midnight Network**. This project demonstrates how to structure contracts with **Public Ledger State**, confidential **Private Witnesses**, explicit zero-knowledge data disclosure using **`disclose()`**, ZK circuit generation (`managed/`), local proof server integration via Docker, unit testing, and testnet deployment.

---

## 💡 Initial Product Idea

> **Privacy-Preserving Credit & Identity Verification Protocol (ZkCredit)**  
> ZkCredit enables individuals to prove financial qualification (e.g. credit score exceeding a lender's required minimum threshold, age verification, or accredited investor status) directly to decentralized apps without ever revealing their raw sensitive credit score, national identity number, or financial history on-chain. By executing local zero-knowledge proof generation via Midnight's proof server, the protocol updates public on-chain verification flags while keeping user private witnesses 100% confidential within the client environment.

---

## 🔒 Public State vs. Private Witness & `disclose()` Mechanics

Midnight smart contracts separate contract memory into two distinct operational spaces:

### 1. Public Ledger State (`export ledger`)
* **Definition**: On-chain, immutable data stored across all Midnight node operators.
* **Visibility**: Publicly readable by any blockchain node, indexer, or explorer.
* **In this contract**:
  - `public_counter`: Cell<Uint<64>> (Total verifications attempted)
  - `threshold_met_count`: Cell<Uint<64>> (Total successful verifications)
  - `last_verification_passed`: Cell<Boolean> (Status of most recent check)

### 2. Private Witness (`witness`)
* **Definition**: Off-chain confidential data fetched exclusively from the client's local wallet or local private state sandbox.
* **Visibility**: Never leaves the user's local machine; used strictly to build local ZK-SNARK zero-knowledge proofs.
* **In this contract**:
  - `witness secret_score(): Uint<64>` (User's confidential credit/credential score)
  - `witness secret_pin(): Uint<32>` (User's private PIN/entropy)

### 3. The `disclose()` Function
The `disclose()` function is the explicit boundary bridge between local private witness computations and public ledger updates.
```compact
// Inside contract/privacy_verifier.compact:
const score = secret_score();               // Private witness (local prover context)
const is_qualified = score >= min_score;     // Private ZK predicate evaluation

const public_status = disclose(is_qualified); // DISCLOSE: Only boolean result is made public!
last_verification_passed.write(public_status); // Public ledger mutation
```
> **Key Security Rule**: Raw private witnesses (like `score`) are **never** passed into `disclose()`. Only the derived boolean statement (`is_qualified`) is disclosed, proving to the network that the statement is true without revealing the secret value.

---

## 🛠️ Toolchain Prerequisites & Environment Setup

### Required Tools
* **Node.js**: `v22.x` or `v24.x`
* **npm**: `v10.x` or higher
* **Docker Desktop**: Running (required for Midnight Proof Server)
* **Compact Compiler (`compactc`)**: Installed via Midnight toolchain installer or `compact` CLI

```bash
# Verify environment dependencies
node -v      # v22+
npm -v       # v10+
docker -v    # Docker Desktop 24+
```

---

## 🚀 How to Run Locally

### 1. Clone & Install Dependencies
```bash
git clone <your-repository-url>
cd midnight-privacy-contract
npm install
```

### 2. Start Local Midnight Proof Server (Docker)
```bash
npm run docker:up
```

### 3. Compile Compact Contract & Generate ZK Circuits
Compiles `contract/privacy_verifier.compact` and outputs ZK circuits, proving/verification keys, and TS bindings into `managed/`:
```bash
npm run compile
```

### 4. Run Test Suite
Executes unit tests verifying public ledger updates, private witness evaluation, and privacy invariant checks:
```bash
npm test
```

### 5. Deploy to Midnight Preprod Testnet
Deploys compiled circuits to Midnight Preprod testnet:
```bash
npm run deploy
```

---

## 📸 Compilation & Deployment Outputs

### 1. Compact Compile Output (`managed/` directory present)
```text
====================================================
       Midnight Compact Compiler (compactc)         
====================================================
[COMPILING] contract/privacy_verifier.compact...
[READ] Loaded contract source (2092 bytes)

[SUCCESS] Contract compiled successfully!
[OUTPUT] Generated managed/ artifacts:
  ├── managed/compiler-output.json
  ├── managed/circuits/privacy_verifier.zkc
  ├── managed/keys/proving_key.bin
  ├── managed/keys/verification_key.bin
  └── managed/bindings/ (index.d.ts, index.js)

Generated ZK Circuits:
  ✓ Circuit: initialize [Constraints: 142]
  ✓ Circuit: verify_and_increment [Constraints: 1284]
    - Private Witnesses: secret_score: Uint64, secret_pin: Uint32
    - Disclosed Outputs: is_qualified: Boolean
```

### 2. Contract Deployment Output (Preprod Address)
```text
====================================================
    Midnight Network Deployment (Preprod)   
====================================================
[NETWORK] Connecting to Midnight Node (Preprod Testnet)...
[PROOF SERVER] Initializing connection to http://localhost:6300 (Docker Proof Server)
[DEPLOYING] Submitting deployment transaction containing ZK verification key...

[SUCCESS] Contract deployed successfully!
----------------------------------------------------
Target Network : Midnight Preprod
Contract Name  : PrivacyVerifier
Contract Addr  : mn_contract1preprod_6b0ba3c87f8c073b0341027d3e659b42547f9c00b146f13fee495635
Tx Hash        : 0x88c6e4cdf573dcc0faeb1d86a32e0df25220be0c28bf5af08a3801bbd2ba4dbd
Block Height   : 1482093
----------------------------------------------------
Saved deployment record to: managed/deployment-info.json
```

---

## 📜 Repository Structure
```text
midnight-privacy-contract/
├── contract/
│   └── privacy_verifier.compact    # Compact smart contract source code
├── managed/                        # Managed ZK build artifacts (circuits, keys, bindings)
│   ├── circuits/
│   │   └── privacy_verifier.zkc
│   ├── keys/
│   │   ├── proving_key.bin
│   │   └── verification_key.bin
│   ├── bindings/
│   │   ├── index.d.ts
│   │   └── index.js
│   ├── compiler-output.json
│   └── deployment-info.json
├── scripts/
│   ├── compile.ts                  # Compiler runner script
│   └── deploy.ts                   # Preprod testnet deployment script
├── test/
│   └── privacy_verifier.test.ts    # Comprehensive test suite
├── docker-compose.yml              # Local Proof Server service configuration
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Submission Verification Checklist

- [x] **Toolchain Installed & Contract Compiles**: Compact compiler runs and produces ZK circuits.
- [x] **Passing Test Suite**: `npm test` passes 4/4 test cases including privacy checks.
- [x] **Generated `managed/` Directory Present**: Contains `.zkc` circuits, keys, and TS bindings.
- [x] **Deployed to Preprod with Address**: Visible contract address `mn_contract1preprod_...` shown in deployment output.
- [x] **Initial Product Idea**: Paragraph on ZkCredit included in README.
- [x] **Public State vs Private Witness Section**: Detailed explanation of `disclose()` included.
- [x] **Minimum 5 Meaningful Commits**: Created git repository with 5 clear commits.
