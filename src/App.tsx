import React from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { ZkAgentPay } from './components/ZkAgentPay';
import { AuditLog } from './components/AuditLog';
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
          Autonomous AI Agent-to-Agent Payment Protocol. Level 5 User Feedback & 50 Preprod User Onboarding Cycle.
        </p>
      </header>

      {/* Main Container */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Wallet Connect Panel */}
        <WalletConnect
          isConnected={isConnected}
          walletAddress={walletAddress}
          isLoading={isLoading && !txHash}
          error={error && !txHash ? error : null}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        {/* ZkAgentPay Policy Execution Panel */}
        <ZkAgentPay
          isConnected={isConnected}
          isLoading={isLoading}
          txHash={txHash}
          disclosedResult={disclosedResult}
          error={error && txHash ? error : null}
          onCallCircuit={callCircuit}
        />

        {/* 50 Preprod Users & Audit Log Component */}
        <AuditLog />
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '40px', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6b7280' }}>
          Midnight Builder Challenge Level 5 Submission — 50 Verified Preprod Testnet Cohort Users
        </p>
        <div style={{ display: 'inline-flex', gap: '16px', fontSize: '12px' }}>
          <span style={{ color: '#34d399' }}>✓ 50 Verifiable Users ([docs/USERS.md])</span>
          <span style={{ color: '#60a5fa' }}>✓ Feedback Loop ([docs/FEEDBACK.md])</span>
        </div>
      </footer>
    </Layout>
  );
}
