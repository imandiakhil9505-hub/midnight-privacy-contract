export interface LedgerState {
  recovery_counter: bigint;
  gas_sponsored_counter: bigint;
}

export interface PrivateWitnessContext {
  secret_identity_key: () => bigint;
}

export class ZkusabilityContract {
  state: LedgerState;
  witness: PrivateWitnessContext;

  constructor(witness: PrivateWitnessContext);
  initialize(): Promise<void>;
  validate_identity_gate(minThreshold: bigint): Promise<{ disclosedResult: boolean }>;
}