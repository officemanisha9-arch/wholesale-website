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
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Layers, Flame } from 'lucide-react';

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
      <section style={{ marginBottom: '48px' }}>
        <div className="container">
          <div className="section-header-responsive">
            <div className="section-header-content">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <span className="badge-rts">
                  <Flame size={13} color="#ff5500" /> TOP CURATED WHOLESALE PICKS
                </span>
                <h2 style={{ fontSize: 'clamp(20px, 4.5vw, 26px)', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.25 }}>
                  Recommended for Your Business Sourcing
                </h2>
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                Top-performing wholesale products curated based on global market demand, factory lead times, and verified trade volume.
              </p>
            </div>
            <Link
              to="/products"
              className="section-header-link"
            >
              <span>Explore All Wholesale Items</span>
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
