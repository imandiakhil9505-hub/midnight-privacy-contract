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