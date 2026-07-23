import React from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';

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
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, #111827 0%, #030712 100%)',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: '32px',
          fontWeight: '800',
          letterSpacing: '-0.025em',
          background: 'linear-gradient(to right, #60a5fa, #34d399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Midnight Privacy Counter App
        </h1>
        <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '600px', margin: '0 auto' }}>
          Level 2 Frontend Integration demonstrating browser-based local ZK proof generation, 
          Lace Wallet connector integration, and Preprod testnet verification.
        </p>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px',
          justifyContent: 'center'
        }}>
          {/* Wallet Connect Panel */}
          <WalletConnect
            isConnected={isConnected}
            walletAddress={walletAddress}
            isLoading={isLoading && !txHash}
            error={error && !txHash ? error : null}
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
          />

          {/* Circuit call Panel */}
          <CircuitCall
            isConnected={isConnected}
            isLoading={isLoading}
            txHash={txHash}
            disclosedResult={disclosedResult}
            error={error && txHash ? error : null}
            onCallCircuit={callCircuit}
          />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', marginTop: '60px', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6b7280' }}>
          Midnight Builder Challenge Level 2 Submission
        </p>
        <div style={{ display: 'inline-flex', gap: '16px', fontSize: '12px' }}>
          <span style={{ color: '#34d399' }}>✓ Proved with Local ZK-SNARK Prover</span>
          <span style={{ color: '#60a5fa' }}>✓ Lace Wallet Connector API v1</span>
        </div>
      </footer>
    </div>
  );
}
