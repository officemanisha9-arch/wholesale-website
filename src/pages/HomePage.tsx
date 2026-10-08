import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AccioAIBanner } from '../components/home/AccioAIBanner';
import { AlibabaGuaranteedFloor } from '../components/home/AlibabaGuaranteedFloor';
import { VerifiedManufacturersFloor } from '../components/home/VerifiedManufacturersFloor';
import { GlobalPavilionsFloor } from '../components/home/GlobalPavilionsFloor';
import { QuickRFQWidget } from '../components/home/QuickRFQWidget';
import { ProductCard } from '../components/products/ProductCard';
import { PRODUCTS } from '../data/products';
import { Link } from '@tanstack/react-router';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

export const HomePage: React.FC = () => {
  const trendingProducts = PRODUCTS.slice(0, 8);

  return (
    <div style={{ paddingBottom: '48px' }}>
      {/* 1. Hero Dynamic Slider & Quick Sourcing Floors */}
      <HeroSection />

      {/* 2. Accio Sourcing AI Flagship Banner */}
      <AccioAIBanner />

      {/* 3. Alibaba Guaranteed Floor (Fixed Price & Delivery) */}
      <AlibabaGuaranteedFloor />

      {/* 4. Trending B2B Wholesale Recommendations */}
      <section style={{ marginBottom: '44px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge-rts">
                  <TrendingUp size={12} /> TOP CURATED PICKS
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
                  Recommended for Your Business Sourcing
                </h2>
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748b' }}>
                Top-performing wholesale products curated based on global market demand, factory lead times, and verified trade volume.
              </p>
            </div>
            <Link
              to="/products"
              style={{ color: '#ff6600', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Explore All Products</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid-cols-4-responsive">
            {trendingProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Verified Manufacturers & Factory Directory */}
      <VerifiedManufacturersFloor />

      {/* 6. Quick RFQ Post Widget */}
      <QuickRFQWidget />

      {/* 7. Regional Country Pavilions */}
      <GlobalPavilionsFloor />
    </div>
  );
};
