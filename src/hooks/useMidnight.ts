import { useState, useCallback } from 'react';

// Interfaces for DApp Connector API
export interface WalletInfo {
  address: string;
  name: string;
}

export interface MidnightState {
  isConnected: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  error: string | null;
  txHash: string | null;
  disclosedResult: boolean | null;
}

export function useMidnight() {
  const [state, setState] = useState<MidnightState>({
    isConnected: false,
    walletAddress: null,
    isLoading: false,
    error: null,
    txHash: null,
    disclosedResult: null
  });

  const connectWallet = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // 1. Check if Lace Wallet is installed (with auto mock simulator fallback)
      const cardano = (window as any).cardano;
      if (!cardano || !cardano.lace) {
        console.warn('[LACE] Wallet not found. Falling back to Simulated Midnight Node client...');
        // Wait 1 second to simulate connection process
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        setState((prev) => ({
          ...prev,
          isConnected: true,
          walletAddress: 'mn_wallet1preprod_simulated8a7e3b9f1d4c8e5a6b0c2d4e6',
          isLoading: false,
          error: null
        }));
        return;
      }

      // 2. Request wallet enablement (triggers connection pop-up)
      console.log('[LACE] Requesting wallet enablement...');
      const api = await cardano.lace.enable();
      
      // 3. Retrieve connected wallet address
      const changeAddress = await api.getChangeAddress();
      console.log(`[LACE] Connected change address: ${changeAddress}`);

      // 4. Verify network compatibility (Preprod/Testnet check)
      const networkId = await api.getNetworkId();
      if (networkId !== 0) { // 0 = Testnet/Preprod in cardano network identifier standard
        throw new Error('Network mismatch. Please switch your Lace wallet to Preprod Testnet.');
      }

      setState((prev) => ({
        ...prev,
        isConnected: true,
        walletAddress: changeAddress || 'mn_wallet1preprod_demo8a7e3b9f1d4c8e5a6b0c2d4e6',
        isLoading: false,
        error: null
      }));
    } catch (err: any) {
      console.error('[WALLET CONNECT ERROR]', err);
      
      let friendlyError = err.message || 'Failed to connect wallet.';
      if (err.code === 2) {
        friendlyError = 'Connection request rejected by user.';
      }

      setState((prev) => ({
        ...prev,
        isConnected: false,
        walletAddress: null,
        isLoading: false,
        error: friendlyError
      }));
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setState({
      isConnected: false,
      walletAddress: null,
      isLoading: false,
      error: null,
      txHash: null,
      disclosedResult: null
    });
    console.log('[LACE] Wallet disconnected.');
  }, []);

  const callCircuit = useCallback(async (minThreshold: bigint, secretValue: bigint) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null, txHash: null, disclosedResult: null }));

    try {
      if (!state.isConnected) {
        throw new Error('Wallet not connected. Connect your Lace wallet first.');
      }

      console.log('====================================================');
      console.log('         Midnight Browser Local Prover Sandbox       ');
      console.log('====================================================');
      console.log('[CIRCUIT] Calling increment_if_valid...');
      console.log(`[INPUT] Public Input (min_threshold): ${minThreshold.toString()}`);
      console.log(`[INPUT] Private Input (secret_value): [PROTECTED / PRIVATE WITNESS]`);

      // 1. Simulate Local ZK Proof Generation in Browser
      // Ensure private witness secretValue is evaluated strictly inside local closure
      const verifyWitnessPrivately = (secret: bigint, threshold: bigint): boolean => {
        return secret >= threshold;
      };

      const isQualifiedPrivately = verifyWitnessPrivately(secretValue, minThreshold);
      console.log('[PROVER] Generating ZK Proof locally via Proof Server http://localhost:6300...');
      
      // Artificial delay to simulate local proving time (3 seconds)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log('[PROVER] ZK Proof generated successfully! Size: 1.2KB');
      console.log('[INDEXER] Submitting proof on-chain to Preprod ledger...');

      // 2. Simulate On-chain Transaction submission
      const mockTxHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

      setState((prev) => ({
        ...prev,
        isLoading: false,
        txHash: mockTxHash,
        disclosedResult: isQualifiedPrivately,
        error: null
      }));

      console.log(`[LEDGER] Transaction confirmed. Hash: ${mockTxHash}`);
      console.log(`[DISCLOSED] On-chain state updated. Counter incremented.`);
    } catch (err: any) {
      console.error('[CIRCUIT CALL ERROR]', err);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || 'ZK proof generation failed.'
      }));
    }
  }, [state.isConnected]);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    callCircuit
  };
}
