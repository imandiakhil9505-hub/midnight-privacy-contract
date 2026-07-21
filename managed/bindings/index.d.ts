export interface LedgerState {
  counter: bigint;
  threshold_met: bigint;
}

export interface PrivateWitnessContext {
  secret_value: () => bigint;
}

export class CounterContract {
  state: LedgerState;
  witness: PrivateWitnessContext;

  constructor(witness: PrivateWitnessContext);
  initialize(): Promise<void>;
  increment_if_valid(minThreshold: bigint): Promise<{ disclosedResult: boolean }>;
}