export interface DeployTxData {
  contractAddress: string;
  txHash: string;
  blockHeight: number;
}

export interface DeployedContract {
  deployTxData: DeployTxData;
  compiledContract: any;
  readyState: string;
}

export function deployContract(providers: any, deployConfig: any): Promise<DeployedContract>;
