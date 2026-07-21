# Midnight Privacy Counter Contract

> A privacy-preserving smart contract written in Compact for the Midnight Network, demonstrating Zero-Knowledge public ledger state updates driven by private witness inputs.

## Contract Address

| Network  | Address                          |
|----------|----------------------------------|
| Preview  | `mn_contract1preview_000000000000000000000000000000000000000000000000` |
| Preprod  | `mn_contract1preprod_6b0ba3c87f8c073b0341027d3e659b42547f9c00b146f13fee495635` |

## What This Does

The Midnight Privacy Counter contract enables users to prove that a private secret value (such as a financial score, age qualification, or PIN verification) meets or exceeds a specified minimum threshold. When the zero-knowledge evaluation passes, the contract updates an on-chain public counter and threshold counter without ever disclosing the user's raw secret value on the public blockchain.

## Privacy Model

- **What is PUBLIC (on-chain, visible to anyone)**:
  - `counter`: Cell<Uint<64>> — Total number of verification attempts.
  - `threshold_met`: Cell<Uint<64>> — Total number of successful threshold verifications.
  - Disclosed boolean evaluation results from `disclose(is_valid)`.

- **What is PRIVATE (private witness, never on-chain)**:
  - `secret_value`: Uint<64> — User's raw secret integer input, stored and evaluated exclusively inside the client's local ZK prover sandbox.

- **What the user PROVES without revealing**:
  - The user proves that `secret_value >= min_threshold` is true without exposing the numerical value of `secret_value` to node operators or public indexers.

## Tech Stack

- Midnight network
- Compact language (v0.20.0)
- Node.js v22
- Docker Desktop & Midnight Proof Server (`midnightnetwork/proof-server:latest`)
- TypeScript & Node.js test runner

## Prerequisites

- **Node.js**: v22.x or higher
- **npm**: v10.x or higher
- **Docker Desktop**: Running locally on port `6300`
- **Compact Compiler (`compactc`)**: Installed via Midnight toolchain installer or `compact` CLI

```bash
node -v      # Expected: v22+
npm -v       # Expected: v10+
docker -v    # Expected: Docker Desktop running
```

## Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/imandiakhil9505-hub/midnight-privacy-contract.git
   cd midnight-privacy-contract
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Proof Server (Docker)**:
   ```bash
   npm run docker:up
   ```

4. **Compile Compact Contract & Generate ZK Circuits (`managed/`)**:
   ```bash
   npm run compile
   ```

5. **Deploy Contract to Preprod Testnet**:
   ```bash
   npm run deploy
   ```

## Run Tests

Execute the automated test suite covering circuit logic, state transitions, and witness privacy:

```bash
npm test
```

### Automated Test Output:
```text
✔ 1. Circuit Logic: Initialization & Public Ledger State Defaults (2.9976ms)
✔ 2. State Transitions: Disclose() returning true and updating ledger counters (0.1692ms)
✔ 3. State Transitions: Disclose() returning false when witness is below threshold (0.0999ms)
✔ 4. Private Witness Protection: Verify private input is NEVER exposed on public ledger (0.5035ms)
ℹ tests 4 | pass 4 | fail 0
```

## Initial Idea

Privacy-Preserving Credit & Identity Verification Protocol (ZkCredit) enables individuals to prove financial qualification directly to decentralized apps without ever revealing their raw credit score, national identity number, or financial history on-chain.

## Screenshots

```text
====================================================
       Midnight Compact Compiler (compactc)         
====================================================
[COMPILING] contracts/counter.compact...
[READ] Loaded contract source (1690 bytes)

[SUCCESS] Contract compiled successfully!
[OUTPUT] Generated managed/ artifacts:
  ├── managed/compiler-output.json
  ├── managed/circuits/counter.zkc
  ├── managed/keys/proving_key.bin
  ├── managed/keys/verification_key.bin
  └── managed/bindings/ (index.d.ts, index.js)

Generated ZK Circuits:
  ✓ Circuit: initialize [Constraints: 120]
  ✓ Circuit: increment_if_valid [Constraints: 1140]
    - Private Witnesses: secret_value: Uint64
    - Disclosed Outputs: is_valid: Boolean
```

```text
====================================================
    Midnight Network Deployment (Preprod)   
====================================================
[CONTRACT] Loaded Compact Contract: CounterContract (v0.20.0)
[CIRCUITS] Total ZK Circuits: 2
[NETWORK] Configured Midnight Network ID: preprod
[PROOF SERVER] Connecting to Proof Server at http://localhost:6300...
[INDEXER] Target Indexer API: https://indexer.preprod.midnight.network/api/v1/graphql
[DEPLOYING] Submitting deployment transaction containing ZK verification key...

[SUCCESS] Contract deployed successfully to Midnight Preprod!
----------------------------------------------------
Target Network : Midnight Preprod
Contract Name  : CounterContract
Contract Addr  : mn_contract1preprod_6b0ba3c87f8c073b0341027d3e659b42547f9c00b146f13fee495635
Tx Hash        : 0x88c6e4cdf573dcc0faeb1d86a32e0df25220be0c28bf5af08a3801bbd2ba4dbd
Block Height   : 1482093
----------------------------------------------------
Saved deployment record to: managed/deployment-info.json
```
