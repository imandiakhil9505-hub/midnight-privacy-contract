import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, #111827 0%, #030712 100%)',
      padding: '40px 20px',
      boxSizing: 'border-box',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#f3f4f6'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {children}
      </div>
    </div>
  );
};
