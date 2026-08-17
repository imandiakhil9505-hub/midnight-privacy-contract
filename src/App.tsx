import React from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { ZkRecovery } from './components/ZkRecovery';
import { Layout } from './components/Layout';

export default function App() {
  const {
    isConnected,
    walletAddress,
    isLoading,
    error,
    txHash,
    disclosedResult,
    connectWallet,
    disconnectWallet,
    callCircuit
  } = useMidnight();

  return (
    <Layout>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: '32px',
          fontWeight: '800',
          letterSpacing: '-0.025em',
          background: 'linear-gradient(to right, #60a5fa, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ZkUsability Layer DApp
        </h1>
        <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
          Level 4 Private Identity Verification & Social Recovery Gate, abstracting wallet complexity and leveraging local ZK-SNARK provers.
        </p>
      </header>

      {/* Main Container */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Wallet Connect Panel */}
        <WalletConnect
          isConnected={isConnected}
          walletAddress={walletAddress}
          isLoading={isLoading && !txHash}
          error={error && !txHash ? error : null}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        {/* ZkRecovery Panel */}
        <ZkRecovery
          isConnected={isConnected}
          isLoading={isLoading}
          txHash={txHash}
          disclosedResult={disclosedResult}
          error={error && txHash ? error : null}
          onCallCircuit={callCircuit}
        />
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '40px', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6b7280' }}>
          Midnight Builder Challenge Level 4 Submission
        </p>
        <div style={{ display: 'inline-flex', gap: '16px', fontSize: '12px' }}>
          <span style={{ color: '#34d399' }}>✓ Proved with Local ZK-SNARK Prover</span>
          <span style={{ color: '#60a5fa' }}>✓ Lace Wallet Connector API v1</span>
        </div>
      </footer>
    </Layout>
  );
}
