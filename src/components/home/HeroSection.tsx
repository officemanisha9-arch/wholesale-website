import React, { useState, useEffect } from 'react';
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
  Award,
  Truck,
  Layers,
  Send,
  Flame,
  FileText,
  Boxes,
  Cpu,
  CheckCircle2,
  Clock,
  DollarSign,
  Lock,
  ChevronDown,
  Shield,
  Star,
  Activity,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';
import { SUPPLIERS } from '../../data/suppliers';
import { HeroSlider } from './HeroSlider';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { country, setImageSearchModalOpen, setContactSupplierData } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'manufacturers' | 'ai' | 'rfq'>('products');
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');

  // Interactive showcase tab state
  const [bomQty, setBomQty] = useState<number>(1000);
  const [tickerIndex, setTickerIndex] = useState<number>(0);

  // Dynamic live global trade ticker data
  const liveTickerItems = [
    { text: 'Tokyo Corp placed $48,500 order for ISO-9001 Solid-State Powerbanks', tag: 'Trade Alert', icon: Zap, color: '#ff5500' },
    { text: 'Citibank Escrow secured $124,000 shipment for Munich Automotive OEM', tag: 'Escrow Active', icon: ShieldCheck, color: '#0284c7' },
    { text: 'TÜV Rheinland verified 14 new smart CNC & injection mold plants', tag: 'Audited Plant', icon: Award, color: '#10b981' },
    { text: 'Air DDP express transit cleared in 3.4 days to North American Hubs', tag: 'DDP Logistics', icon: Truck, color: '#8b5cf6' }
  ];

  // Rotate ticker every 4.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveTickerItems.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [liveTickerItems.length]);

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
        return 'Search 200,000+ audited factories (e.g. ISO9001 CNC, solar, silicone...)';
      case 'ai':
        return 'Describe custom specs or blueprint for AI BoM costing...';
      case 'rfq':
        return 'Enter target product title & qty for 3 factory bids...';
      default:
        return 'Search 5M+ wholesale products, low MOQs, factory direct...';
    }
  };

  // Unit pricing calculator based on volume tier
  const calculateBomPrice = (qty: number) => {
    if (qty >= 5000) return { unit: 5.40, save: '56%', leadTime: '12-14 Days' };
    if (qty >= 1000) return { unit: 7.20, save: '42%', leadTime: '7-10 Days' };
    if (qty >= 500) return { unit: 9.80, save: '25%', leadTime: '5-7 Days' };
    return { unit: 14.20, save: '10%', leadTime: '3-5 Days' };
  };

  const currentPrice = calculateBomPrice(bomQty);
  const currentTicker = liveTickerItems[tickerIndex];
  const TickerIcon = currentTicker.icon;

  return (
    <section style={{ marginTop: '16px', marginBottom: '32px', position: 'relative' }}>
      <div className="container">

        {/* ========================================================================= */}
        {/* HERO MASTER STAGE: RESPONSIVE LUXURY OBSIDIAN B2B SOURCING STAGE          */}
        {/* ========================================================================= */}
        <div className="hero-stage-container">
          
          {/* Subtle Cyber Grid Lines Background Pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              opacity: 0.7,
              pointerEvents: 'none'
            }}
          />

          {/* Ambient Glow Orbs (Constrained to prevent mobile bleed) */}
          <div
            className="animate-pulse-glow"
            style={{
              position: 'absolute',
              top: '-40px',
              left: '10%',
              width: 'min(360px, 60%)',
              height: '360px',
              maxWidth: '60%',
              background: 'radial-gradient(circle, rgba(255, 102, 0, 0.2) 0%, rgba(255, 102, 0, 0) 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
          <div
            className="animate-pulse-glow"
            style={{
              position: 'absolute',
              top: '20%',
              right: '0',
              width: 'min(380px, 50%)',
              height: '380px',
              maxWidth: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0) 70%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />

          {/* ===================================================================== */}
          {/* TOP LIVE GLOBAL TRADE TICKER BAR                                      */}
          {/* ===================================================================== */}
          <div className="hero-top-ticker-bar">
            {/* Live Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '5px 12px',
                  borderRadius: '30px',
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#34d399',
                  boxShadow: '0 0 15px rgba(16, 185, 129, 0.15)'
                }}
              >
                <span className="animate-live-ping" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block', flexShrink: 0 }} />
                <span className="truncate" style={{ maxWidth: '160px' }}>SOURCEGRID GLOBAL B2B</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.25)', flexShrink: 0 }}>|</span>
                <span style={{ color: '#e2e8f0', fontWeight: 600, flexShrink: 0 }}>200k+ Plants</span>
              </div>
            </div>

            {/* Rotating Live Ticker Feed (Hidden on tight mobile screens) */}
            <div
              className="hero-ticker-middle"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(12px)',
                padding: '5px 12px',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '11.5px',
                color: '#e2e8f0'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  fontWeight: 800,
                  color: currentTicker.color,
                  textTransform: 'uppercase',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '2px 7px',
                  borderRadius: '10px'
                }}
              >
                <TickerIcon size={11} color={currentTicker.color} />
                <span>{currentTicker.tag}</span>
              </div>
              <span style={{ color: '#cbd5e1', fontWeight: 500, maxWidth: '340px' }} className="truncate">
                {currentTicker.text}
              </span>
            </div>

            {/* Destination Hub Callout */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                color: '#94a3b8',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '5px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <span>Direct DDP:</span>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>{country.name} {country.flag}</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
            </div>
          </div>

          {/* ===================================================================== */}
          {/* DYNAMIC HERO IMAGE SLIDER & B2B SOURCING SHOWCASE                     */}
          {/* ===================================================================== */}
          <HeroSlider />

          {/* ===================================================================== */}
          {/* MASTER COMMAND SEARCH OMNIBAR (CENTERED & RESPONSIVE)                 */}
          {/* ===================================================================== */}
          <div className="hero-omnibar-box">
            {/* Mode Tabs */}
            <div className="hero-omnibar-tabs">
              {[
                { id: 'products', label: 'Wholesale Catalog', icon: Package, badge: '5M+' },
                { id: 'manufacturers', label: 'Audited Factories', icon: Building2, badge: '200k' },
                { id: 'ai', label: 'GridAI Sourcing', icon: Sparkles, badge: 'AI BoM' },
                { id: 'rfq', label: 'Instant RFQ', icon: FileText, badge: '< 1h' }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '7px 14px',
                      borderRadius: '12px',
                      border: isActive ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                      background: isActive ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                      color: isActive ? '#ffffff' : '#94a3b8',
                      fontSize: '12.5px',
                      fontWeight: isActive ? 800 : 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon size={14} color={isActive ? (tab.id === 'ai' ? '#c084fc' : '#ff7a29') : '#64748b'} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span
                        style={{
                          fontSize: '9.5px',
                          background: tab.id === 'ai' ? '#6366f1' : '#ff5500',
                          color: '#fff',
                          padding: '1px 6px',
                          borderRadius: '8px',
                          fontWeight: 800
                        }}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Input Form Bar */}
            <form className="hero-omnibar-form" onSubmit={handleSearchSubmit}>
              <div className="hero-omnibar-inputs">
                {/* Category Dropdown */}
                {activeTab === 'products' && (
                  <div style={{ position: 'relative', borderRight: '1px solid rgba(255, 255, 255, 0.16)', paddingRight: '8px', flexShrink: 0 }}>
                    <select
                      value={selectedCat}
                      onChange={(e) => setSelectedCat(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#e2e8f0',
                        cursor: 'pointer',
                        padding: '6px 2px',
                        maxWidth: '120px'
                      }}
                    >
                      <option value="ALL" style={{ background: '#0f172a', color: '#fff' }}>All Categories</option>
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id} style={{ background: '#0f172a', color: '#fff' }}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Text Search Input */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={getPlaceholder()}
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      fontSize: '13.5px',
                      color: '#ffffff',
                      fontWeight: 500,
                      background: 'transparent'
                    }}
                  />
                </div>

                {/* Camera / CAD Button */}
                <button
                  type="button"
                  onClick={() => setImageSearchModalOpen(true)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: '10px',
                    padding: '7px 10px',
                    color: '#cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                  title="Search by image or CAD blueprint"
                >
                  <Camera size={15} />
                  <span className="hidden-mobile">CAD</span>
                </button>
              </div>

              {/* Action Submit Button */}
              <button
                type="submit"
                className="hero-omnibar-cta btn-primary"
                style={{
                  padding: '9px 20px',
                  fontSize: '13px',
                  borderRadius: '12px',
                  flexShrink: 0,
                  background: activeTab === 'ai'
                    ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                    : activeTab === 'rfq'
                    ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    : 'linear-gradient(135deg, #ff6600 0%, #ea580c 100%)',
                  boxShadow: activeTab === 'ai'
                    ? '0 4px 14px rgba(99, 102, 241, 0.4)'
                    : activeTab === 'rfq'
                    ? '0 4px 14px rgba(5, 150, 105, 0.4)'
                    : '0 4px 14px rgba(255, 102, 0, 0.4)'
                }}
              >
                {activeTab === 'ai' ? (
                  <>
                    <Sparkles size={14} />
                    <span>Analyze Spec</span>
                  </>
                ) : activeTab === 'rfq' ? (
                  <>
                    <Send size={14} />
                    <span>Get 3 Factory Quotes</span>
                  </>
                ) : activeTab === 'manufacturers' ? (
                  <>
                    <Building2 size={14} />
                    <span>Explore Plants</span>
                  </>
                ) : (
                  <>
                    <span>Search Catalog</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Hot Sourcing Chips */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={12} color="#ff6600" /> Hot:
            </span>
            {[
              { label: 'Smart Solar Inverters', cat: 'machinery' },
              { label: 'TWS Bluetooth 5.4', cat: 'electronics' },
              { label: 'Custom CNC Aluminum', cat: 'machinery' },
              { label: 'Organic Cotton Garments', cat: 'apparel' },
              { label: 'Domestic RTS Warehouses', rts: true }
            ].map((item, i) => (
              <Link
                key={i}
                to="/products"
                search={{ category: item.cat, rtsOnly: item.rts } as any}
                style={{
                  fontSize: '11.5px',
                  color: '#cbd5e1',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '3px 10px',
                  borderRadius: '16px',
                  fontWeight: 600,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 102, 0, 0.18)';
                  e.currentTarget.style.borderColor = '#ff6600';
                  e.currentTarget.style.color = '#ff9e58';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* ===================================================================== */}
          {/* INTERACTIVE 3-PILLAR DUAL SHOWCASE (RESPONSIVE GRID)                  */}
          {/* ===================================================================== */}
          <div className="hero-pillars-grid">
            
            {/* Pillar 1: Verified Super-Plant Showcase */}
            <div
              className="hero-pillar-card"
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                minWidth: 0,
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(255, 102, 0, 0.15)', border: '1px solid rgba(255, 102, 0, 0.3)', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Building2 size={15} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                        Audited Super-Plants
                      </h3>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>ISO9001 &amp; TÜV Verified</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '2px 7px', borderRadius: '10px', fontWeight: 700 }}>
                    Live Radar
                  </span>
                </div>

                {/* Quick supplier card preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {SUPPLIERS.slice(0, 2).map(sup => (
                    <div
                      key={sup.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        padding: '8px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        minWidth: 0,
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
                        <img src={sup.avatar} alt="" style={{ width: '30px', height: '30px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 }} />
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#ffffff' }} className="truncate">
                            {sup.name}
                          </div>
                          <div style={{ fontSize: '10.5px', color: '#94a3b8' }} className="truncate">
                            {sup.flag} {sup.city} • <span style={{ color: '#38bdf8' }}>{sup.floorSpace}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setContactSupplierData({ supplier: sup })}
                        style={{
                          background: 'rgba(255, 102, 0, 0.15)',
                          border: '1px solid rgba(255, 102, 0, 0.4)',
                          color: '#ff8a4c',
                          fontSize: '10.5px',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        RFQ
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/manufacturers"
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#ff8a4c',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span>Browse 200,000+ Verified Plants</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* Pillar 2: AI BoM Interactive Cost Estimator */}
            <div
              className="hero-pillar-card"
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                minWidth: 0,
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Cpu size={15} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                        AI BoM Tier Estimator
                      </h3>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Production volume matrix</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '2px 7px', borderRadius: '10px', fontWeight: 700, flexShrink: 0 }}>
                    Save {currentPrice.save}
                  </span>
                </div>

                {/* Quantity Pill Switcher */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '5px', marginBottom: '10px' }}>
                  {[100, 500, 1000, 5000].map(qty => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setBomQty(qty)}
                      style={{
                        padding: '5px 0',
                        borderRadius: '6px',
                        border: bomQty === qty ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.1)',
                        background: bomQty === qty ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                        color: '#fff',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        minWidth: 0,
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    >
                      {qty.toLocaleString()}
                    </button>
                  ))}
                </div>

                {/* Pricing Metrics Card */}
                <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Target Unit Price</div>
                    <div style={{ fontSize: '17px', fontWeight: 900, color: '#38bdf8', fontFamily: 'Outfit, sans-serif' }}>
                      ${currentPrice.unit.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', color: '#94a3b8' }}>Lead Time</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>
                      {currentPrice.leadTime}
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/ai-sourcing"
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#a5b4fc',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span>Launch GridAI Studio</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* Pillar 3: SourceGrid Citibank Escrow Protection */}
            <div
              className="hero-pillar-card"
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(20px)',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                minWidth: 0,
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(2, 132, 199, 0.15)', border: '1px solid rgba(2, 132, 199, 0.3)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ShieldCheck size={15} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                        SourceGrid Escrow
                      </h3>
                      <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Citibank $500k Assurance</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8', padding: '2px 7px', borderRadius: '10px', fontWeight: 700 }}>
                    Protected
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11px', color: '#cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={12} color="#10b981" />
                    <span>Funds released after inspection signoff</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={12} color="#10b981" />
                    <span>100% refund for spec mismatch</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={12} color="#10b981" />
                    <span>DDP Customs &amp; taxes prepaid</span>
                  </div>
                </div>
              </div>

              <Link
                to="/buyer-central"
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  color: '#38bdf8',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <span>Escrow Safeguards</span>
                <ChevronRight size={13} />
              </Link>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* LIVE TRUST METRICS ROW (RESPONSIVE GRID)                              */}
          {/* ===================================================================== */}
          <div className="hero-metrics-grid">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>$4.8B+</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>Protected Volume</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#38bdf8', fontFamily: 'Outfit, sans-serif' }}>200,000+</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>Audited Plants</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#10b981', fontFamily: 'Outfit, sans-serif' }}>99.4%</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>On-Time DDP</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#a855f7', fontFamily: 'Outfit, sans-serif' }}>&lt; 1 Hour</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>Quote Matching</div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* HORIZONTAL QUICK CATEGORIES MATRIX STRIP                                */}
        {/* ========================================================================= */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '10px 16px',
            marginTop: '16px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflowX: 'auto',
            gap: '10px',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box'
          }}
          className="hero-categories-strip"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, paddingRight: '12px', borderRight: '1px solid #f1f5f9' }}>
            <Layers size={16} color="#ff6600" />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>Top Sourcing:</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
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
                    gap: '5px',
                    padding: '5px 12px',
                    borderRadius: '16px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#334155',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
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
              color: '#ff5500',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
              paddingLeft: '12px',
              borderLeft: '1px solid #f1f5f9'
            }}
          >
            <span>All Sectors</span>
            <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
};
