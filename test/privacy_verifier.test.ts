import test from 'node:test';
import assert from 'node:assert/strict';

// Import compiled contract bindings from managed/
import { PrivacyVerifierContract } from '../managed/bindings/index.js';

test('Midnight Compact Contract: Initialization and Public Ledger State Defaults', async () => {
  let userSecretScore = 750n;
  let userSecretPin = 4321;

  const witness = {
    secret_score: () => userSecretScore,
    secret_pin: () => userSecretPin
  };

  const contract = new PrivacyVerifierContract(witness);
  await contract.initialize();

  assert.equal(contract.state.public_counter, 0n);
  assert.equal(contract.state.threshold_met_count, 0n);
  assert.equal(contract.state.last_verification_passed, false);
});

test('Midnight Compact Contract: Disclose() returning TRUE when witness >= threshold', async () => {
  let userSecretScore = 780n; // Secret score: 780
  let userSecretPin = 1234;

  const witness = {
    secret_score: () => userSecretScore,
    secret_pin: () => userSecretPin
  };

  const contract = new PrivacyVerifierContract(witness);
  await contract.initialize();

  // Require min_required_score = 700
  const result = await contract.verify_and_increment(700n);

  assert.equal(result.disclosedResult, true, 'Disclosed result must be true');
  assert.equal(contract.state.last_verification_passed, true);
  assert.equal(contract.state.public_counter, 1n);
  assert.equal(contract.state.threshold_met_count, 1n);

  // Assert Privacy Invariant: Ledger state must NEVER contain raw score 780
  const ledgerStringified = JSON.stringify(contract.state, (k, v) => typeof v === 'bigint' ? v.toString() : v);
  assert.ok(!ledgerStringified.includes('780'), 'Public ledger must not leak raw private witness');
});

test('Midnight Compact Contract: Disclose() returning FALSE when witness < threshold', async () => {
  let userSecretScore = 620n; // Secret score: 620
  let userSecretPin = 9999;

  const witness = {
    secret_score: () => userSecretScore,
    secret_pin: () => userSecretPin
  };

  const contract = new PrivacyVerifierContract(witness);
  await contract.initialize();

  // Require min_required_score = 700
  const result = await contract.verify_and_increment(700n);

  assert.equal(result.disclosedResult, false, 'Disclosed result must be false for score 620 < 700');
  assert.equal(contract.state.last_verification_passed, false);
  assert.equal(contract.state.public_counter, 1n);
  assert.equal(contract.state.threshold_met_count, 0n, 'Threshold count should not increment on failure');

  // Assert Privacy Invariant: Ledger state must NEVER contain raw score 620
  const ledgerStringified = JSON.stringify(contract.state, (k, v) => typeof v === 'bigint' ? v.toString() : v);
  assert.ok(!ledgerStringified.includes('620'), 'Public ledger must not leak raw private witness');
});

test('Midnight Compact Contract: Sequential verifications with varying private witnesses', async () => {
  let currentScore = 800n;
  const witness = {
    secret_score: () => currentScore,
    secret_pin: () => 1111
  };

  const contract = new PrivacyVerifierContract(witness);
  await contract.initialize();

  // Verification 1: Pass
  currentScore = 850n;
  await contract.verify_and_increment(700n);
  assert.equal(contract.state.public_counter, 1n);
  assert.equal(contract.state.threshold_met_count, 1n);

  // Verification 2: Fail
  currentScore = 550n;
  await contract.verify_and_increment(700n);
  assert.equal(contract.state.public_counter, 2n);
  assert.equal(contract.state.threshold_met_count, 1n);

  // Verification 3: Pass
  currentScore = 720n;
  await contract.verify_and_increment(700n);
  assert.equal(contract.state.public_counter, 3n);
  assert.equal(contract.state.threshold_met_count, 2n);
});
