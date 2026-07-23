import React, { useState } from 'react';

interface CircuitCallProps {
  isConnected: boolean;
  isLoading: boolean;
  txHash: string | null;
  disclosedResult: boolean | null;
  error: string | null;
  onCallCircuit: (minThreshold: bigint, secretValue: bigint) => void;
}

export const CircuitCall: React.FC<CircuitCallProps> = ({
  isConnected,
  isLoading,
  txHash,
  disclosedResult,
  error,
  onCallCircuit
}) => {
  const [minThreshold, setMinThreshold] = useState<string>('700');
  const [secretValue, setSecretValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!minThreshold || !secretValue) return;

    try {
      const thresholdBig = BigInt(minThreshold);
      const secretBig = BigInt(secretValue);
      onCallCircuit(thresholdBig, secretBig);
      
      // Clear the private witness input from UI memory immediately after trigger
      setSecretValue('');
    } catch (err) {
      alert('Please enter valid integers for threshold and secret score.');
    }
  };

  if (!isConnected) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px dashed rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '32px',
        textAlign: 'center',
        color: '#9ca3af',
        maxWidth: '480px',
        margin: '0 auto'
      }}>
        🔌 Connect your Lace wallet above to unlock contract circuit features.
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '480px',
      margin: '0 auto',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600', color: '#60a5fa' }}>
        Run ZK-SNARK Privacy Proof
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Public Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', color: '#d1d5db', marginBottom: '6px', fontWeight: '500' }}>
            Public Threshold Score (min_threshold)
          </label>
          <input
            type="number"
            value={minThreshold}
            onChange={(e) => setMinThreshold(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. 700"
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        {/* Private Input (Witness) */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', color: '#d1d5db', marginBottom: '6px', fontWeight: '500' }}>
            Private Score (secret_value)
          </label>
          <input
            type="password"
            value={secretValue}
            onChange={(e) => setSecretValue(e.target.value)}
            disabled={isLoading}
            placeholder="Enter private value (e.g. 780)"
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '10px 12px',
              color: '#ffffff',
              fontSize: '14px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
          <span style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginTop: '6px', fontStyle: 'italic' }}>
            🛡️ Proved without revealing your input
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading || !minThreshold || !secretValue}
          style={{
            width: '100%',
            background: '#10b981',
            color: '#ffffff',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: (isLoading || !minThreshold || !secretValue) ? 'not-allowed' : 'pointer',
            opacity: (isLoading || !minThreshold || !secretValue) ? 0.6 : 1,
            transition: 'background 0.2s',
            outline: 'none',
            marginBottom: '16px'
          }}
          onMouseOver={(e) => {
            if (!isLoading && minThreshold && secretValue) e.currentTarget.style.background = '#059669';
          }}
          onMouseOut={(e) => {
            if (!isLoading && minThreshold && secretValue) e.currentTarget.style.background = '#10b981';
          }}
        >
          {isLoading ? 'Generating Proof locally in browser...' : 'Generate Proof & Submit'}
        </button>
      </form>

      {/* Proving / Verification Status Display */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTop: '3px solid #60a5fa',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 12px auto'
          }} />
          <p style={{ margin: '0', fontSize: '13px', color: '#9ca3af' }}>
            Encrypting inputs and generating zero-knowledge proof locally...
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {txHash && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.05)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          borderRadius: '8px',
          padding: '16px',
          marginTop: '16px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#34d399', fontWeight: '600' }}>
            ✓ Verification Confirmed!
          </h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#d1d5db', lineHeight: '1.4' }}>
            On-chain counter updated. The network verified that your private score met the threshold.
          </p>
          
          <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
            <strong>Disclosed Status:</strong>{' '}
            <span style={{ color: disclosedResult ? '#34d399' : '#f87171', fontWeight: 'bold' }}>
              {disclosedResult ? 'PASSED (>= threshold)' : 'FAILED (< threshold)'}
            </span>
          </div>

          <div style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            background: 'rgba(0,0,0,0.2)',
            padding: '8px',
            borderRadius: '4px',
            wordBreak: 'break-all',
            color: '#a7f3d0'
          }}>
            Tx Hash: {txHash}
          </div>
        </div>
      )}

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#f87171',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          marginTop: '16px'
        }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
};
