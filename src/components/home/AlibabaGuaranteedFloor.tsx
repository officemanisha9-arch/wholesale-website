import React from 'react';
import { Link } from '@tanstack/react-router';
import { ShieldCheck, Truck, Check, ArrowRight, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { ProductCard } from '../products/ProductCard';
import { PRODUCTS } from '../../data/products';

export const AlibabaGuaranteedFloor: React.FC = () => {
  const guaranteedProducts = PRODUCTS.filter(p => p.alibabaGuaranteed).slice(0, 4);

  return (
    <section style={{ marginBottom: '40px' }}>
      <div className="container">
        {/* Header with Guarantee Value Props */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)',
            borderRadius: '20px 20px 0 0',
            padding: '24px 32px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            border: '1px solid #1e293b',
            borderBottom: 'none'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#0f172a',
                  fontWeight: 900,
                  fontSize: '11px',
                  padding: '3px 9px',
                  borderRadius: '6px',
                  letterSpacing: '0.6px',
                  boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)'
                }}
              >
                ALIBABA GUARANTEED
              </span>
              <h3 style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.01em' }}>
                Hassle-Free Sourcing with Fixed Prices &amp; Guaranteed Delivery
              </h3>
            </div>
            <div style={{ display: 'flex', gap: '20px', fontSize: '12.5px', color: '#cbd5e1', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Check size={14} color="#10b981" /> Fixed Price with Freight Included
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} color="#10b981" /> On-Time Dispatch or 10% Claim
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <RefreshCw size={14} color="#10b981" /> Free 30-Day Money Back Returns
              </span>
            </div>
          </div>

          <Link
            to="/products"
            style={{
              color: '#fbbf24',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(251, 191, 36, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(251, 191, 36, 0.1)';
            }}
          >
            <span>View All Guaranteed Items</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product Cards Container */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '0 0 20px 20px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            borderTop: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div className="grid-cols-4-responsive">
            {guaranteedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
