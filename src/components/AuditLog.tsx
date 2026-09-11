import React, { useState } from 'react';
import seedData from '../data/users.json';

interface UserRecord {
  id: number;
  walletAddress: string;
  txHash: string;
  paymentAmount: number;
  maxLimit: number;
  status: string;
  timestamp: string;
}

export const AuditLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const users: UserRecord[] = seedData as UserRecord[];

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.walletAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.txHash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '16px',
      padding: '24px',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '600', color: '#60a5fa' }}>
            50 Preprod Agent Transactions & Audit Ledger
          </h2>
          <p style={{ margin: '0', fontSize: '13px', color: '#9ca3af' }}>
            Verifiable transaction records from 50 testnet cohort agents on Midnight Preprod
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none'
            }}
          >
            <option value="ALL">All Statuses ({users.length})</option>
            <option value="VERIFIED">Verified Only</option>
            <option value="DENIED">Denied Only</option>
          </select>
          <input
            type="text"
            placeholder="Search address or hash..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              width: '200px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto', maxHeight: '360px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9ca3af' }}>
              <th style={{ padding: '10px 8px' }}>#</th>
              <th style={{ padding: '10px 8px' }}>Agent Wallet Address</th>
              <th style={{ padding: '10px 8px' }}>Payment</th>
              <th style={{ padding: '10px 8px' }}>Limit</th>
              <th style={{ padding: '10px 8px' }}>Status</th>
              <th style={{ padding: '10px 8px' }}>Tx Hash</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', color: '#e5e7eb' }}>
                <td style={{ padding: '10px 8px', color: '#9ca3af' }}>{u.id}</td>
                <td style={{ padding: '10px 8px', fontFamily: 'monospace', fontSize: '12px', color: '#93c5fd' }}>
                  {u.walletAddress.slice(0, 20)}...{u.walletAddress.slice(-6)}
                </td>
                <td style={{ padding: '10px 8px' }}>{u.paymentAmount} tDUST</td>
                <td style={{ padding: '10px 8px', color: '#9ca3af' }}>{u.maxLimit} tDUST</td>
                <td style={{ padding: '10px 8px' }}>
                  <span style={{
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: u.status === 'VERIFIED' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: u.status === 'VERIFIED' ? '#34d399' : '#f87171',
                    border: u.status === 'VERIFIED' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                  }}>
                    {u.status === 'VERIFIED' ? '✓ VERIFIED' : '✕ DENIED'}
                  </span>
                </td>
                <td style={{ padding: '10px 8px', fontFamily: 'monospace', fontSize: '11px', color: '#a7f3d0' }}>
                  {u.txHash.slice(0, 10)}...{u.txHash.slice(-6)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280', textAlign: 'right' }}>
        Showing {filteredUsers.length} of {users.length} Preprod user records
      </div>
    </div>
  );
};
