import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Truck,
  FileText,
  Sparkles,
  Building2,
  PackageCheck,
  ArrowRight,
  CheckCircle2,
  Globe,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { country } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Global Factory Direct Wholesale',
      subtitle: 'Source custom OEM/ODM products directly from verified manufacturers with Trade Assurance escrow.',
      badge: 'VERIFIED FACTORY SOURCE',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&auto=format&fit=crop&q=80',
      ctaText: 'Browse Wholesale Showroom',
      ctaLink: '/products',
      secText: 'Request Factory Quotation',
      secLink: '/rfq'
    },
    {
      title: 'Ready to Ship & US Domestic Warehouse Stock',
      subtitle: 'Fast 3-5 day domestic delivery with zero import delays and low minimum order quantities (MOQ < 10 pcs).',
      badge: 'FAST DISPATCH HUB',
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&auto=format&fit=crop&q=80',
      ctaText: 'Explore Ready to Ship',
      ctaLink: '/products?rtsOnly=true',
      secText: 'View US Stock',
      secLink: '/products?usStock=true'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div style={{ marginTop: '24px', marginBottom: '36px' }}>
      <div className="container">
        
        {/* Main Stage Grid (Left Category Sidebar + Hero Banner) */}
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '22px', alignItems: 'stretch' }}>
          
          {/* Left Category Quick Navigation */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '18px',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '15px' }}>📁</span>
                  <span>Sourcing Categories</span>
                </div>
                <span style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b', padding: '2px 7px', borderRadius: '10px', fontWeight: 700 }}>
                  TOP 8
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {CATEGORIES.slice(0, 8).map(cat => (
                  <Link
                    key={cat.id}
                    to="/products"
                    search={{ category: cat.id } as any}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      color: '#334155',
                      fontWeight: 600,
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fff5eb';
                      e.currentTarget.style.color = '#ff6600';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#334155';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '16px' }}>
                        {cat.id === 'apparel' ? '👕' : cat.id === 'electronics' ? '📱' : cat.id === 'machinery' ? '⚙️' : cat.id === 'home-kitchen' ? '🏠' : cat.id === 'beauty-care' ? '💄' : cat.id === 'sports-outdoors' ? '⚽' : cat.id === 'auto-parts' ? '🚗' : '📦'}
                      </span>
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <ChevronRight size={13} color="#cbd5e1" />
                  </Link>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <Link
                to="/products"
                style={{
                  fontSize: '12.5px',
                  color: '#ff6600',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background: '#fffbf7',
                  border: '1px solid #fed7aa'
                }}
              >
                <span>Explore all categories</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Hero Slider Banner */}
          <div className="hero-slider-stage" style={{ height: '420px', borderRadius: '20px' }}>
            {slides.map((slide, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: currentSlide === idx ? 1 : 0,
                  transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: currentSlide === idx ? 'auto' : 'none'
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, rgba(11, 15, 25, 0.92) 0%, rgba(15, 23, 42, 0.7) 50%, rgba(15, 23, 42, 0.2) 100%)'
                  }}
                />

                <div className="hero-slider-content" style={{ left: '44px', maxWidth: '560px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 102, 0, 0.25)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 102, 0, 0.7)',
                      color: '#ff9a4d',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      marginBottom: '14px',
                      letterSpacing: '0.6px',
                      boxShadow: '0 2px 10px rgba(255, 102, 0, 0.2)'
                    }}
                  >
                    <Sparkles size={13} />
                    <span>{slide.badge}</span>
                  </div>

                  <h1
                    style={{
                      fontSize: '34px',
                      fontWeight: 800,
                      lineHeight: '1.2',
                      marginBottom: '14px',
                      fontFamily: 'Outfit, sans-serif',
                      letterSpacing: '-0.02em',
                      textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    style={{
                      fontSize: '14.5px',
                      color: '#cbd5e1',
                      marginBottom: '26px',
                      lineHeight: '23px'
                    }}
                  >
                    {slide.subtitle}
                  </p>

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <Link
                      to={slide.ctaLink}
                      className="btn-primary"
                      style={{ padding: '12px 26px', fontSize: '14px' }}
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight size={16} />
                    </Link>

                    <Link
                      to={slide.secLink}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(12px)',
                        color: '#ffffff',
                        padding: '12px 22px',
                        borderRadius: '30px',
                        fontSize: '14px',
                        fontWeight: 600,
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                    >
                      <span>{slide.secText}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider Switch Dots */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '28px',
                display: 'flex',
                gap: '8px',
                zIndex: 10
              }}
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  style={{
                    width: currentSlide === i ? '28px' : '9px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentSlide === i ? '#ff6600' : 'rgba(255, 255, 255, 0.4)',
                    boxShadow: currentSlide === i ? '0 0 10px rgba(255, 102, 0, 0.6)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4 BUYER VALUE PILLARS (Clean, Crisp, Elevated) */}
        <div className="hero-quick-tiles">
          
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = '#a7f3d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(5, 150, 105, 0.15)' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '13.5px', color: '#0f172a' }}>Trade Assurance</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>100% Escrow &amp; Money-back protection</div>
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = '#fed7aa';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #fff5eb 0%, #ffedd5 100%)', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(255, 102, 0, 0.15)' }}>
              <Building2 size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '13.5px', color: '#0f172a' }}>Verified Factories</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>Inspected OEM/ODM production plants</div>
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = '#bfdbfe';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(37, 99, 235, 0.15)' }}>
              <PackageCheck size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '13.5px', color: '#0f172a' }}>Fast Sampling &amp; RTS</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>Quick factory dispatch with low MOQs</div>
            </div>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = '#fbcfe8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(219, 39, 119, 0.15)' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '13.5px', color: '#0f172a' }}>Accio AI Sourcing</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '1px' }}>Instant quote matching &amp; BoM estimates</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
