import test from 'node:test';
import assert from 'node:assert/strict';

// Import compiled contract bindings from managed/
import { CounterContract } from '../managed/bindings/index.js';

test('1. Circuit Logic: Initialization & Public Ledger State Defaults', async () => {
  let userSecretValue = 500n;
  const witness = {
    secret_value: () => userSecretValue
  };

  const contract = new CounterContract(witness);
  await contract.initialize();

  assert.equal(contract.state.counter, 0n);
  assert.equal(contract.state.threshold_met, 0n);
});

test('2. State Transitions: Disclose() returning true and updating ledger counters', async () => {
  let userSecretValue = 850n; // Secret value: 850
  const witness = {
    secret_value: () => userSecretValue
  };

  const contract = new CounterContract(witness);
  await contract.initialize();

  // Test increment_if_valid with min_threshold = 700
  const result = await contract.increment_if_valid(700n);

  assert.equal(result.disclosedResult, true, 'Disclosed result must be true for 850 >= 700');
  assert.equal(contract.state.counter, 1n, 'Counter should increment by 1');
  assert.equal(contract.state.threshold_met, 1n, 'Threshold met count should increment by 1');
});

test('3. State Transitions: Disclose() returning false when witness is below threshold', async () => {
  let userSecretValue = 450n; // Secret value: 450
  const witness = {
    secret_value: () => userSecretValue
  };

  const contract = new CounterContract(witness);
  await contract.initialize();

  const result = await contract.increment_if_valid(700n);

  assert.equal(result.disclosedResult, false, 'Disclosed result must be false for 450 < 700');
  assert.equal(contract.state.counter, 1n, 'Counter should increment');
  assert.equal(contract.state.threshold_met, 0n, 'Threshold met count should NOT increment');
});

test('4. Private Witness Protection: Verify private input is NEVER exposed on public ledger', async () => {
  let userSecretValue = 999999n;
  const witness = {
    secret_value: () => userSecretValue
  };

  const contract = new CounterContract(witness);
  await contract.initialize();
  await contract.increment_if_valid(700n);

  // Stringify public ledger state
  const publicLedgerString = JSON.stringify(contract.state, (k, v) => typeof v === 'bigint' ? v.toString() : v);

  assert.ok(
    !publicLedgerString.includes('999999'),
    'PUBLIC LEDGER PRIVACY INVARIANT: Secret witness value must NEVER leak into public ledger state!'
  );
});
