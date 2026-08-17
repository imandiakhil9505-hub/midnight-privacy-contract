import React from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { ZkAgentPay } from './components/ZkAgentPay';
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
          ZkAgentPay Console
        </h1>
        <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
          Autonomous AI Agent-to-Agent Payment Protocol. Secure machine transactions verified by local zero-knowledge policy check circuits.
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

        {/* ZkAgentPay Panel */}
        <ZkAgentPay
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
          <span style={{ color: '#34d399' }}>✓ Zero-Knowledge Policy Enforcement</span>
          <span style={{ color: '#60a5fa' }}>✓ Autonomous Agent SDK v1</span>
        </div>
      </footer>
    </Layout>
  );
}
