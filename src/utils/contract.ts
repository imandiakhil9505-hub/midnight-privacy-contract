import { ZkusabilityContract } from '../../managed/bindings';

/**
 * ZkUsability SDK Contract Interaction Helper
 */
export function getZkusabilityContract(secretValue: bigint): ZkusabilityContract {
  const witness = {
    secret_identity_key: () => secretValue
  };
  return new ZkusabilityContract(witness);
}
