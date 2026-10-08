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
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const trendingProducts = PRODUCTS.slice(0, 8);

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* 1. Hero Dynamic Slider & Quick Sourcing Floors */}
      <HeroSection />

      {/* 2. Accio Sourcing AI Flagship Banner */}
      <AccioAIBanner />

      {/* 3. Alibaba Guaranteed Floor (Fixed Price & Delivery) */}
      <AlibabaGuaranteedFloor />

      {/* 4. Trending B2B Wholesale Recommendations */}
      <section style={{ marginBottom: '36px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111', fontFamily: 'Outfit, sans-serif' }}>
                Recommended for Your Business Sourcing
              </h2>
              <p style={{ fontSize: '13px', color: '#666' }}>
                Top-performing wholesale items curated based on global retail trends and verified trade volume.
              </p>
            </div>
            <Link
              to="/products"
              style={{ color: '#ff6a00', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
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
