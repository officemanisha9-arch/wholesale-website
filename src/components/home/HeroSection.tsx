import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  Search,
  Camera,
  Sparkles,
  Building2,
  Package,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Globe,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  Award,
  Truck,
  Layers,
  Send,
  Flame,
  FileText,
  Boxes,
  HelpCircle,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { country, setImageSearchModalOpen, showToast, formatPrice } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'manufacturers' | 'ai' | 'rfq'>('products');
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();

    if (activeTab === 'ai') {
      navigate({
        to: '/ai-sourcing',
        search: trimmed ? ({ prompt: trimmed } as any) : undefined
      });
      return;
    }

    if (activeTab === 'rfq') {
      navigate({
        to: '/rfq',
        search: trimmed ? ({ prefill: trimmed } as any) : undefined
      });
      return;
    }

    if (activeTab === 'manufacturers') {
      navigate({
        to: '/manufacturers',
        search: trimmed ? ({ q: trimmed } as any) : undefined
      });
      return;
    }

    // Default products search
    navigate({
      to: '/products',
      search: {
        q: trimmed || undefined,
        category: selectedCat !== 'ALL' ? selectedCat : undefined
      } as any
    });
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'manufacturers':
        return 'Search 200,000+ audited factories (e.g. ISO9001 precision CNC, solar panels...)';
      case 'ai':
        return 'Describe your product spec or drop design requirement for instant BoM estimation...';
      case 'rfq':
        return 'Enter product title & quantity to receive 3 factory bids in < 1 hour...';
      default:
        return 'Search 5,000,000+ wholesale products, low MOQs, factory direct...';
    }
  };

  return (
    <section style={{ marginTop: '16px', marginBottom: '40px', position: 'relative' }}>
      <div className="container">
        
        {/* MAIN IMMERSIVE AURORA BENTO HERO CONTAINER */}
        <div
          style={{
            background: 'linear-gradient(145deg, #0b0f19 0%, #0f172a 45%, #1e1b4b 100%)',
            borderRadius: '28px',
            padding: '48px 40px 40px 40px',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
          className="hero-aurora-stage"
        >
          {/* Glowing ambient background orbs */}
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              left: '15%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 102, 0, 0.18) 0%, rgba(255, 102, 0, 0) 70%)',
              pointerEvents: 'none',
              filter: 'blur(40px)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-140px',
              right: '10%',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0) 70%)',
              pointerEvents: 'none',
              filter: 'blur(50px)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '30%',
              right: '30%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(14, 165, 233, 0) 70%)',
              pointerEvents: 'none',
              filter: 'blur(50px)'
            }}
          />

          <div style={{ position: 'relative', zIndex: 5, maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Top Live Status Beacon Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '6px 16px',
                borderRadius: '30px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fed7aa',
                marginBottom: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981', display: 'inline-block' }} />
              <span>GLOBAL B2B SOURCING NETWORK</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
              <span style={{ color: '#ffffff' }}>200,000+ Audited Factories</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
              <span style={{ color: '#38bdf8' }}>100% Citibank Escrow</span>
            </div>

            {/* Majestic Hero Headline */}
            <h1
              style={{
                fontSize: '44px',
                fontWeight: 900,
                lineHeight: '1.16',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.03em',
                marginBottom: '16px',
                color: '#ffffff',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
              }}
              className="hero-headline"
            >
              The Next Generation of <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #ff6600 0%, #fb923c 50%, #f472b6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}
              >
                Global Wholesale &amp; Custom Manufacturing
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '16px',
                color: '#cbd5e1',
                lineHeight: '26px',
                maxWidth: '720px',
                margin: '0 auto 32px auto',
                fontWeight: 400
              }}
            >
              Direct OEM/ODM factory connections, instant AI Bill of Materials costing, pre-shipment quality audits, and guaranteed DDP logistics to <strong style={{ color: '#ffffff' }}>{country.name} {country.flag}</strong>.
            </p>

            {/* UNIVERSAL MULTI-MODE SOURCING OMNIBAR */}
            <div
              style={{
                maxWidth: '840px',
                margin: '0 auto 24px auto',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(24px)',
                borderRadius: '24px',
                padding: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Omnibar Segmented Tabs */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px',
                  padding: '2px 6px',
                  overflowX: 'auto'
                }}
              >
                {[
                  { id: 'products', label: 'Wholesale Products', icon: Package },
                  { id: 'manufacturers', label: 'Audited Factories', icon: Building2 },
                  { id: 'ai', label: 'Accio AI Sourcing', icon: Sparkles },
                  { id: 'rfq', label: 'Post Instant RFQ', icon: FileText }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '7px 14px',
                        borderRadius: '16px',
                        border: 'none',
                        background: isActive ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                        color: isActive ? '#ffffff' : '#94a3b8',
                        fontSize: '12.5px',
                        fontWeight: isActive ? 800 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <Icon size={14} color={isActive ? (tab.id === 'ai' ? '#c084fc' : '#ff6600') : '#94a3b8'} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Search Input Form */}
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', borderRadius: '18px', padding: '6px 8px', boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}>
                
                {/* Category Select Dropdown */}
                {activeTab === 'products' && (
                  <div style={{ position: 'relative', borderRight: '1px solid #e2e8f0', paddingRight: '8px', marginRight: '4px' }}>
                    <select
                      value={selectedCat}
                      onChange={(e) => setSelectedCat(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#334155',
                        cursor: 'pointer',
                        padding: '8px 6px',
                        maxWidth: '150px'
                      }}
                    >
                      <option value="ALL">All Categories</option>
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Text Input */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '8px' }}>
                  <Search size={18} color="#94a3b8" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={getPlaceholder()}
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      color: '#0f172a',
                      fontWeight: 500,
                      background: 'transparent'
                    }}
                  />
                </div>

                {/* Camera / Image Search Button */}
                <button
                  type="button"
                  onClick={() => setImageSearchModalOpen(true)}
                  style={{
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '9px 12px',
                    color: '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 700,
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e2e8f0';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.color = '#475569';
                  }}
                  title="Search by image / design CAD"
                >
                  <Camera size={16} />
                  <span className="hidden-mobile">Image Search</span>
                </button>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '11px 26px',
                    fontSize: '14px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 20px rgba(255, 102, 0, 0.45)'
                  }}
                >
                  {activeTab === 'ai' ? (
                    <>
                      <Sparkles size={16} />
                      <span>Analyze Spec</span>
                    </>
                  ) : activeTab === 'rfq' ? (
                    <>
                      <Send size={15} />
                      <span>Get 3 Bids</span>
                    </>
                  ) : (
                    <>
                      <span>Search</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Trending Keyword Pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Flame size={13} color="#ff6600" /> Hot Sourcing:
              </span>
              {[
                { label: 'Smart Solar Inverters', cat: 'machinery' },
                { label: 'TWS Earbuds (Low MOQ)', cat: 'electronics' },
                { label: 'Custom CNC Aluminum', cat: 'machinery' },
                { label: 'Organic Cotton Apparel', cat: 'apparel' },
                { label: 'Fast 3-Day RTS Stock', rts: true }
              ].map((item, i) => (
                <Link
                  key={i}
                  to="/products"
                  search={{ category: item.cat, rtsOnly: item.rts } as any}
                  style={{
                    fontSize: '12px',
                    color: '#e2e8f0',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontWeight: 600,
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 102, 0, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(255, 102, 0, 0.6)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

          </div>

          {/* BENTO CARDS ROW (4 Interactive B2B Super-Cards) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '18px',
              marginTop: '44px',
              position: 'relative',
              zIndex: 5
            }}
            className="hero-bento-grid"
          >
            {/* Bento Card 1: Factory Direct OEM */}
            <Link
              to="/manufacturers"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(16px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '22px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 102, 0, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 102, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(255,102,0,0.3) 0%, rgba(255,102,0,0.1) 100%)', border: '1px solid rgba(255,102,0,0.4)', color: '#ff9a4d', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Building2 size={22} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#ff9a4d', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  OEM / ODM Production
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#ffffff', marginBottom: '8px' }}>
                  Audited Factories
                </h3>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '18px', margin: 0 }}>
                  200k+ verified manufacturing plants with live 360° VR tours and ISO inspection reports.
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#fed7aa' }}>Tour Showrooms</span>
                <ChevronRight size={14} color="#fed7aa" />
              </div>
            </Link>

            {/* Bento Card 2: Ready to Ship Hub */}
            <Link
              to="/products"
              search={{ rtsOnly: true } as any}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(16px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '22px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.1) 100%)', border: '1px solid rgba(16,185,129,0.4)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Zap size={22} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#34d399', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  3-5 Day Domestic
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#ffffff', marginBottom: '8px' }}>
                  Ready to Ship (RTS)
                </h3>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '18px', margin: 0 }}>
                  Pre-stocked items in regional warehouses with low MOQs and same-day dispatch.
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#a7f3d0' }}>Explore RTS Catalog</span>
                <ChevronRight size={14} color="#a7f3d0" />
              </div>
            </Link>

            {/* Bento Card 3: Accio AI Engine */}
            <Link
              to="/ai-sourcing"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(16px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '22px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(168, 85, 247, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(168,85,247,0.1) 100%)', border: '1px solid rgba(168,85,247,0.4)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Sparkles size={22} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#c084fc', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  AI Cost Estimator
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#ffffff', marginBottom: '8px' }}>
                  Accio AI Sourcing
                </h3>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '18px', margin: 0 }}>
                  Automated Bill of Materials (BoM) calculations &amp; 1-click supplier matching.
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#e9d5ff' }}>Launch AI Agent</span>
                <ChevronRight size={14} color="#e9d5ff" />
              </div>
            </Link>

            {/* Bento Card 4: 100% Citibank Escrow */}
            <Link
              to="/buyer-central"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(16px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '22px',
                color: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.5)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(56, 189, 248, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(56,189,248,0.3) 0%, rgba(56,189,248,0.1) 100%)', border: '1px solid rgba(56,189,248,0.4)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <ShieldCheck size={22} />
                </div>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Buyer Protection
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#ffffff', marginBottom: '8px' }}>
                  Trade Assurance
                </h3>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '18px', margin: 0 }}>
                  $500k escrow limit per order. Money released only after physical inspection passes.
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#bae6fd' }}>View Guarantees</span>
                <ChevronRight size={14} color="#bae6fd" />
              </div>
            </Link>

          </div>

        </div>

        {/* HORIZONTAL QUICK CATEGORIES CAROUSEL BAR */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '14px 20px',
            marginTop: '20px',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflowX: 'auto',
            gap: '12px'
          }}
          className="hero-categories-strip"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, paddingRight: '12px', borderRight: '1px solid #f1f5f9' }}>
            <Layers size={16} color="#ff6600" />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>Top Sourcing:</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, overflowX: 'auto' }}>
            {CATEGORIES.slice(0, 8).map(cat => {
              const getEmoji = (id: string) => {
                switch (id) {
                  case 'apparel': return '👕';
                  case 'electronics': return '📱';
                  case 'machinery': return '⚙️';
                  case 'home-kitchen': return '🏠';
                  case 'beauty-care': return '💄';
                  case 'sports-outdoors': return '⚽';
                  case 'auto-parts': return '🚗';
                  default: return '📦';
                }
              };

              return (
                <Link
                  key={cat.id}
                  to="/products"
                  search={{ category: cat.id } as any}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#334155',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fff5eb';
                    e.currentTarget.style.borderColor = '#fed7aa';
                    e.currentTarget.style.color = '#ff6600';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#334155';
                  }}
                >
                  <span>{getEmoji(cat.id)}</span>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>

          <Link
            to="/products"
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#ff6600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
              paddingLeft: '12px',
              borderLeft: '1px solid #f1f5f9'
            }}
          >
            <span>All 24+</span>
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
};
