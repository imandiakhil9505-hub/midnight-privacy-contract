export class CounterContract {
  constructor(witness) {
    this.witness = witness;
    this.state = {
      counter: 0n,
      threshold_met: 0n
    };
  }

  async initialize() {
    this.state.counter = 0n;
    this.state.threshold_met = 0n;
  }

  async increment_if_valid(minThreshold) {
    const val = this.witness.secret_value();
    const isValid = val >= minThreshold;
    // Disclose step: only boolean is disclosed to public ledger state
    this.state.counter += 1n;
    if (isValid) {
      this.state.threshold_met += 1n;
    }
    return { disclosedResult: isValid };
  }
}