export class ZkagentpayContract {
  constructor(witness) {
    this.witness = witness;
    this.state = {
      total_payments_executed: 0n,
      total_sponsored_gas: 0n
    };
  }

  async initialize() {
    this.state.total_payments_executed = 0n;
    this.state.total_sponsored_gas = 0n;
  }

  async validate_payment_limit(paymentAmount, maxLimit) {
    const val = this.witness.secret_spending_balance();
    const isValid = (val + paymentAmount) <= maxLimit;
    // Disclose step: only boolean is disclosed to public ledger state
    this.state.total_payments_executed += 1n;
    if (isValid) {
      this.state.total_sponsored_gas += 1n;
    }
    return { disclosedResult: isValid };
  }
}