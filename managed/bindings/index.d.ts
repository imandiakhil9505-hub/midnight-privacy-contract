export interface LedgerState {
  total_payments_executed: bigint;
  total_sponsored_gas: bigint;
}

export interface PrivateWitnessContext {
  secret_spending_balance: () => bigint;
}

export class ZkagentpayContract {
  state: LedgerState;
  witness: PrivateWitnessContext;

  constructor(witness: PrivateWitnessContext);
  initialize(): Promise<void>;
  validate_payment_limit(paymentAmount: bigint, maxLimit: bigint): Promise<{ disclosedResult: boolean }>;
}