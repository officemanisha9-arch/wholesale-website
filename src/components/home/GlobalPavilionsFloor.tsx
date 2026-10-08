import React from 'react';
import { Link } from '@tanstack/react-router';
import { Globe, ArrowRight } from 'lucide-react';

export const GlobalPavilionsFloor: React.FC = () => {
  const pavilions = [
    {
      country: 'Türkiye Pavilion',
      flag: '🇹🇷',
      tagline: 'World Capital of Luxury Textiles & Towels',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80',
      category: 'Home & Textiles',
      suppliersCount: '4,200+'
    },
    {
      country: 'Vietnam Pavilion',
      flag: '🇻🇳',
      tagline: 'Eco Wood, Bamboo & Sustainable Packaging',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
      category: 'Eco Products & Crafts',
      suppliersCount: '3,800+'
    },
    {
      country: 'Germany Pavilion',
      flag: '🇩🇪',
      tagline: 'Solar Energy & Heavy Industrial Engineering',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
      category: 'Industrial & CleanTech',
      suppliersCount: '2,100+'
    },
    {
      country: 'Japan Pavilion',
      flag: '🇯🇵',
      tagline: 'Precision Tools & Clean Beauty Cosmetics',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
      category: 'Beauty & High Precision',
      suppliersCount: '1,900+'
    }
  ];

  return (
    <section style={{ marginBottom: '40px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Globe size={20} color="#ff6600" />
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
                Source by Country &amp; Regional Pavilions
              </h2>
            </div>
            <p style={{ fontSize: '13.5px', color: '#64748b' }}>
              Connect with specialized regional manufacturing clusters and direct exporter hubs.
            </p>
          </div>

          <Link
            to="/products"
            style={{ color: '#ff6600', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <span>View All Regional Pavilions</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 4 Pavilion Cards */}
        <div className="grid-cols-4-responsive">
          {pavilions.map((pav, idx) => (
            <Link
              key={idx}
              to="/products"
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                textDecoration: 'none'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              }}
            >
              <div style={{ height: '145px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={pav.image}
                  alt={pav.country}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>{pav.flag}</span>
                  <span>{pav.country}</span>
                </div>
              </div>

              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', lineHeight: '19px' }}>
                  {pav.tagline}
                </div>
                <div style={{ display: 'flex