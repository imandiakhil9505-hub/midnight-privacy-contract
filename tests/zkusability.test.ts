import { test } from 'node:test';
import assert from 'node:assert';

// Simulated Ledger State representation
interface LedgerState {
  recovery_counter: bigint;
  gas_sponsored_counter: bigint;
}

// Zkusability Smart Contract Simulation class for verification tests
class SimulatedZkusabilityContract {
  state: LedgerState;
  private secretIdentityKey: bigint;

  constructor(secretIdentityKey: bigint) {
    this.state = {
      recovery_counter: 0n,
      gas_sponsored_counter: 0n
    };
    this.secretIdentityKey = secretIdentityKey;
  }

  // Simulates ZK circuit execution validate_identity_gate(min_threshold)
  async validate_identity_gate(minThreshold: bigint): Promise<{ disclosedResult: boolean }> {
    // 1. Locally access private witness secret_identity_key
    const secret = this.secretIdentityKey;

    // 2. Perform comparison check
    const isValid = secret >= minThreshold;

    // 3. Disclose only the boolean result (public_result)
    const disclosedResult = isValid;

    if (disclosedResult) {
      // 4. Update public ledger state
      this.state.recovery_counter += 1n;
      this.state.gas_sponsored_counter += 1n;
    }

    return { disclosedResult };
  }

  // Get stringified public ledger state to verify no private witness leakage
  getPublicLedger(): string {
    return JSON.stringify(this.state, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );
  }
}

test('1. Circuit Logic: Initialization & Public Ledger State Defaults', () => {
  const contract = new SimulatedZkusabilityContract(750n);
  assert.strictEqual(contract.state.recovery_counter, 0n);
  assert.strictEqual(contract.state.gas_sponsored_counter, 0n);
});

test('2. State Transitions: validate_identity_gate() returning true and updating ledger counters', async () => {
  const contract = new SimulatedZkusabilityContract(800n);
  const result = await contract.validate_identity_gate(700n);
  
  assert.strictEqual(result.disclosedResult, true);
  assert.strictEqual(contract.state.recovery_counter, 1n);
  assert.strictEqual(contract.state.gas_sponsored_counter, 1n);
});

test('3. State Transitions: validate_identity_gate() returning false when witness is below threshold', async () => {
  const contract = new SimulatedZkusabilityContract(600n);
  const result = await contract.validate_identity_gate(700n);
  
  assert.strictEqual(result.disclosedResult, false);
  assert.strictEqual(contract.state.recovery_counter, 0n);
  assert.strictEqual(contract.state.gas_sponsored_counter, 0n);
});

test('4. Private Witness Protection: Verify private identity key is NEVER exposed on public ledger', async () => {
  const secretKey = 99999n;
  const contract = new SimulatedZkusabilityContract(secretKey);
  await contract.validate_identity_gate(500n);

  const publicLedger = contract.getPublicLedger();
  
  // Assert public ledger contains the counters but NOT the secretKey
  assert.ok(publicLedger.includes('"recovery_counter":"1"'));
  assert.ok(publicLedger.includes('"gas_sponsored_counter":"1"'));
  assert.ok(!publicLedger.includes(secretKey.toString()), 'SECURITY ALERT: Private witness leaked to public ledger state!');
});
