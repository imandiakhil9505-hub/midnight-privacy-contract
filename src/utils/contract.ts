import { ZkagentpayContract } from '../../managed/bindings';

/**
 * ZkAgentPay SDK Contract Interaction Helper
 */
export function getZkagentpayContract(secretValue: bigint): ZkagentpayContract {
  const witness = {
    secret_spending_balance: () => secretValue
  };
  return new ZkagentpayContract(witness);
}
