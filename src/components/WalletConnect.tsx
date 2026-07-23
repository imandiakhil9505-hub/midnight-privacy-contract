import React from 'react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  error: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  isLoading,
  error,
  onConnect,
  onDisconnect
}) => {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '480px',
      margin: '0 auto 24px auto',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600', color: '#60a5fa' }}>
        Lace Wallet Connection
      </h2>

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#f87171',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          marginBottom: '16px'
        }}>
          ⚠️ {error}
        </div>
      )}

      {isConnected && walletAddress ? (
        <div>
          <div style={{
            background: 'rgba(96, 165, 250, 0.05)',
            border: '1px solid rgba(96, 165, 250, 0.15)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '16px'
          }}>
            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase' }}>
              Connected Address
            </p>
            <p style={{
              margin: '0',
              fontSize: '14px',
              fontWeight: '500',
              color: '#34d399',
              wordBreak: 'break-all',
              fontFamily: 'monospace'
            }}>
              {walletAddress}
            </p>
          </div>

          <button
            onClick={onDisconnect}
            style={{
              width: '100%',
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s',
              outline: 'none'
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#dc2626')}
            onMouseOut={(e) => (e.currentTarget.style.background = '#ef4444')}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#9ca3af', lineHeight: '1.5' }}>
            Connect your Lace wallet extension configured for Preprod Testnet to compile zero-knowledge circuits and submit proofs.
          </p>

          <button
            onClick={onConnect}
            disabled={isLoading}
            style={{
              width: '100%',
              background: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1,
              transition: 'background 0.2s',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              if (!isLoading) e.currentTarget.style.background = '#2563eb';
            }}
            onMouseOut={(e) => {
              if (!isLoading) e.currentTarget.style.background = '#3b82f6';
            }}
          >
            {isLoading ? 'Connecting to Lace...' : 'Connect Lace Wallet'}
          </button>
        </div>
      )}
    </div>
  );
};
