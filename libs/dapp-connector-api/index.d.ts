export class DAppConnectorAPI {
  constructor();
}
export class LaceConnector {
  constructor();
}
export interface CardanoApi {
  enable(): Promise<any>;
  isEnabled(): Promise<boolean>;
}
export interface LaceApi {
  apiVersion: string;
  name: string;
  icon: string;
  enable(): Promise<any>;
  isEnabled(): Promise<boolean>;
}
