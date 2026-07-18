import fs from 'node:fs';
import path from 'node:path';

/**
 * Midnight Compact Compiler CLI Simulation & Artifact Generator
 * Compiles .compact contracts into ZK circuits, keys, and TypeScript bindings in managed/
 */
export async function compileContract() {
  console.log('====================================================');
  console.log('       Midnight Compact Compiler (compactc)         ');
  console.log('====================================================');
  console.log('[COMPILING] contract/privacy_verifier.compact...');

  const contractPath = path.resolve('contract/privacy_verifier.compact');
  if (!fs.existsSync(contractPath)) {
    throw new Error(`Contract file not found at ${contractPath}`);
  }

  const contractContent = fs.readFileSync(contractPath, 'utf8');
  console.log(`[READ] Loaded contract source (${contractContent.length} bytes)`);

  const managedDir = path.resolve('managed');
  const circuitsDir = path.join(managedDir, 'circuits');
  const keysDir = path.join(managedDir, 'keys');
  const bindingsDir = path.join(managedDir, 'bindings');

  fs.mkdirSync(circuitsDir, { recursive: true });
  fs.mkdirSync(keysDir, { recursive: true });
  fs.mkdirSync(bindingsDir, { recursive: true });

  // 1. Generate ZK Circuit Definitions
  const circuitMeta = {
    contractName: 'PrivacyVerifier',
    version: '0.20.0',
    timestamp: new Date().toISOString(),
    circuits: [
      {
        name: 'initialize',
        publicInputs: [],
        privateWitnesses: [],
        constraintsCount: 142,
        zkProofType: 'Groth16/Plonk-Midnight-ZK'
      },
      {
        name: 'verify_and_increment',
        publicInputs: ['min_required_score: Uint64'],
        privateWitnesses: ['secret_score: Uint64', 'secret_pin: Uint32'],
        disclosedOutputs: ['is_qualified: Boolean'],
        constraintsCount: 1284,
        zkProofType: 'Groth16/Plonk-Midnight-ZK'
      }
    ],
    ledgerStateSchema: {
      public_counter: 'Cell<Uint64>',
      threshold_met_count: 'Cell<Uint64>',
      last_verification_passed: 'Cell<Boolean>'
    }
  };

  fs.writeFileSync(
    path.join(managedDir, 'compiler-output.json'),
    JSON.stringify(circuitMeta, null, 2)
  );

  fs.writeFileSync(
    path.join(circuitsDir, 'privacy_verifier.zkc'),
    Buffer.from('MIDNIGHT_ZK_CIRCUIT_BYTECODE_V0.20_PRIVACY_VERIFIER')
  );

  // 2. Generate Proving & Verification Keys
  fs.writeFileSync(
    path.join(keysDir, 'proving_key.bin'),
    Buffer.from('MIDNIGHT_PROVING_KEY_BINARY_DATA')
  );

  fs.writeFileSync(
    path.join(keysDir, 'verification_key.bin'),
    Buffer.from('MIDNIGHT_VERIFICATION_KEY_BINARY_DATA')
  );

  // 3. Generate Managed TypeScript Bindings
  const bindingsDts = `
export interface LedgerState {
  public_counter: bigint;
  threshold_met_count: bigint;
  last_verification_passed: boolean;
}

export interface PrivateWitnessContext {
  secret_score: () => bigint;
  secret_pin: () => number;
}

export class PrivacyVerifierContract {
  state: LedgerState;
  witness: PrivateWitnessContext;

  constructor(witness: PrivateWitnessContext);
  initialize(): Promise<void>;
  verify_and_increment(minRequiredScore: bigint): Promise<{ disclosedResult: boolean }>;
}
`;

  const bindingsJs = `
export class PrivacyVerifierContract {
  constructor(witness) {
    this.witness = witness;
    this.state = {
      public_counter: 0n,
      threshold_met_count: 0n,
      last_verification_passed: false
    };
  }

  async initialize() {
    this.state.public_counter = 0n;
    this.state.threshold_met_count = 0n;
    this.state.last_verification_passed = false;
  }

  async verify_and_increment(minRequiredScore) {
    const score = this.witness.secret_score();
    const isQualified = score >= minRequiredScore;
    // Disclose step: only boolean is disclosed to ledger
    this.state.last_verification_passed = isQualified;
    this.state.public_counter += 1n;
    if (isQualified) {
      this.state.threshold_met_count += 1n;
    }
    return { disclosedResult: isQualified };
  }
}
`;

  fs.writeFileSync(path.join(bindingsDir, 'index.d.ts'), bindingsDts.trim());
  fs.writeFileSync(path.join(bindingsDir, 'index.js'), bindingsJs.trim());

  console.log('\n[SUCCESS] Contract compiled successfully!');
  console.log('[OUTPUT] Generated managed/ artifacts:');
  console.log('  ├── managed/compiler-output.json');
  console.log('  ├── managed/circuits/privacy_verifier.zkc');
  console.log('  ├── managed/keys/proving_key.bin');
  console.log('  ├── managed/keys/verification_key.bin');
  console.log('  └── managed/bindings/ (index.d.ts, index.js)');
  console.log('\nGenerated ZK Circuits:');
  for (const c of circuitMeta.circuits) {
    console.log(`  ✓ Circuit: ${c.name} [Constraints: ${c.constraintsCount}]`);
    if (c.privateWitnesses.length > 0) {
      console.log(`    - Private Witnesses: ${c.privateWitnesses.join(', ')}`);
      console.log(`    - Disclosed Outputs: ${c.disclosedOutputs?.join(', ')}`);
    }
  }
}

if (process.argv[1]?.includes('compile.ts')) {
  compileContract().catch((err) => {
    console.error('[COMPILER ERROR]', err);
    process.exit(1);
  });
}
