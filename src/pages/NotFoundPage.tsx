import React from 'react';
import { Link } from '@tanstack/react-router';
import { Search, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            padding: '60px 24px',
            maxWidth: '520px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              fontFamily: 'Outfit, sans-serif',
              color: '#ff6a00',
              lineHeight: '1',
              marginBottom: '12px'
            }}
          >
            404
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
            Wholesale Sourcing Page Not Found
          </h2>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px', lineHeight: '20px' }}>
            The page or product catalogue you are looking for may have been updated or moved.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <Link to="/" className="btn-primary" style={{ padding: '10px 24px' }}>
              <Home size={16} />
              <span>Back to Alibaba Home</span>
            </Link>
            <Link to="/products" className="btn-secondary" style={{ padding: '10px 20px' }}>
              <Search size={16} />
              <span>Search Showroom</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
