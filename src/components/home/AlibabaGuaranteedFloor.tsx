import React from 'react';
import { Link } from '@tanstack/react-router';
import { ShieldCheck, Check, ArrowRight, Clock, Lock } from 'lucide-react';
import { ProductCard } from '../products/ProductCard';
import { PRODUCTS } from '../../data/products';

export const AlibabaGuaranteedFloor: React.FC = () => {
  const guaranteedProducts = PRODUCTS.filter(p => p.alibabaGuaranteed).slice(0, 4);

  return (
    <section style={{ marginBottom: '44px' }}>
      <div className="container">
        {/* Header with Guarantee Value Props */}
        <div className="alibaba-guarantee-header">
          <div className="alibaba-guarantee-left">
            <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gap: '8px' }}>
              <span className="alibaba-guarantee-badge">
                <ShieldCheck size={13} color="#10b981" />
                SOURCEGRID GUARANTEED
              </span>
              <h3 className="alibaba-guarantee-title">
                Fixed Pricing &amp; Guaranteed On-Time Factory Dispatch
              </h3>
            </div>
            <div className="alibaba-guarantee-features">
              <span className="alibaba-guarantee-feature-item">
                <Check size={15} className="alibaba-guarantee-feature-icon" />
                <span>Fixed Price with DDP Freight</span>
              </span>
              <span className="alibaba-guarantee-feature-item">
                <Clock size={15} className="alibaba-guarantee-feature-icon" />
                <span>On-Time Dispatch Guarantee</span>
              </span>
              <span className="alibaba-guarantee-feature-item">
                <Lock size={15} className="alibaba-guarantee-feature-icon" />
                <span>100% Citibank Escrow Refund</span>
              </span>
            </div>
          </div>

          <Link
            to="/products"
            className="alibaba-guarantee-btn"
          >
            <span>View Guaranteed Items</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Product Cards Container */}
        <div className="alibaba-guarantee-card-body">
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
