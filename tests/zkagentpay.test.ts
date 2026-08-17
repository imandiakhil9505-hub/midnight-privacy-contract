import { test } from 'node:test';
import assert from 'node:assert';

// Simulated Ledger State representation
interface LedgerState {
  total_payments_executed: bigint;
  total_sponsored_gas: bigint;
}

// Zkagentpay Smart Contract Simulation class for verification tests
class SimulatedZkagentpayContract {
  state: LedgerState;
  private secretSpendingBalance: bigint;

  constructor(secretSpendingBalance: bigint) {
    this.state = {
      total_payments_executed: 0n,
      total_sponsored_gas: 0n
    };
    this.secretSpendingBalance = secretSpendingBalance;
  }

  // Simulates ZK circuit execution validate_payment_limit(payment_amount, max_limit)
  async validate_payment_limit(paymentAmount: bigint, maxLimit: bigint): Promise<{ disclosedResult: boolean }> {
    // 1. Locally access private witness secret_spending_balance
    const balance = this.secretSpendingBalance;

    // 2. Perform comparison check: balance + paymentAmount <= maxLimit
    const isValid = (balance + paymentAmount) <= maxLimit;

    // 3. Disclose only the boolean result (public_result)
    const disclosedResult = isValid;

    if (disclosedResult) {
      // 4. Update public ledger state
      this.state.total_payments_executed += 1n;
      this.state.total_sponsored_gas += 1n;
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
  const contract = new SimulatedZkagentpayContract(300n);
  assert.strictEqual(contract.state.total_payments_executed, 0n);
  assert.strictEqual(contract.state.total_sponsored_gas, 0n);
});

test('2. State Transitions: validate_payment_limit() returning true and updating ledger counters', async () => {
  const contract = new SimulatedZkagentpayContract(400n);
  const result = await contract.validate_payment_limit(100n, 600n);
  
  assert.strictEqual(result.disclosedResult, true);
  assert.strictEqual(contract.state.total_payments_executed, 1n);
  assert.strictEqual(contract.state.total_sponsored_gas, 1n);
});

test('3. State Transitions: validate_payment_limit() returning false when witness+amount exceeds limit', async () => {
  const contract = new SimulatedZkagentpayContract(500n);
  const result = await contract.validate_payment_limit(200n, 600n);
  
  assert.strictEqual(result.disclosedResult, false);
  assert.strictEqual(contract.state.total_payments_executed, 0n);
  assert.strictEqual(contract.state.total_sponsored_gas, 0n);
});

test('4. Private Witness Protection: Verify private spending balance is NEVER exposed on public ledger', async () => {
  const secretBalance = 99999n;
  const contract = new SimulatedZkagentpayContract(secretBalance);
  await contract.validate_payment_limit(10n, 1000000n);

  const publicLedger = contract.getPublicLedger();
  
  // Assert public ledger contains the counters but NOT the secretBalance
  assert.ok(publicLedger.includes('"total_payments_executed":"1"'));
  assert.ok(publicLedger.includes('"total_sponsored_gas":"1"'));
  assert.ok(!publicLedger.includes(secretBalance.toString()), 'SECURITY ALERT: Private witness leaked to public ledger state!');
});
