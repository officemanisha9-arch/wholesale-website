import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  Search,
  Camera,
  ShoppingCart,
  MessageSquare,
  FileText,
  User,
  Globe,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Building2,
  PackageCheck,
  Flame,
  ChevronRight,
  Menu,
  X,
  Clock,
  Layers,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const {
    country,
    currencyConfig,
    activeDeliveryHub,
    setLocationMapModalOpen,
    language,
    cartCount,
    conversations,
    searchQuery,
    setSearchQuery,
    searchTab,
    setSearchTab,
    setCurrencyModalOpen,
    setImageSearchModalOpen,
    currentUser,
    setAuthModalOpen,
    logoutUser
  } = useApp();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [activeCategoryHover, setActiveCategoryHover] = useState(CATEGORIES[0].id);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTab === 'ai-mode') {
      navigate({ to: '/ai-sourcing' });
    } else if (searchTab === 'manufacturers') {
      navigate({ to: '/manufacturers', search: { q: searchQuery } as any });
    } else {
      navigate({ to: '/products', search: { q: searchQuery } as any });
    }
  };

  const currentHoveredCategory = CATEGORIES.find(c => c.id === activeCategoryHover) || CATEGORIES[0];

  return (
    <header style={{ width: '100%', zIndex: 1000, position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-color)', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)' }}>
      
      {/* 1. TOP UTILITY BAR (Clean, Minimalist, Glass Accent) */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', fontSize: '11.5px', color: '#64748b', padding: '5px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Left Region, Delivery Hub & Trust */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Map Delivery Location Trigger */}
            <button
              onClick={() => setLocationMapModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#ff6600',
                fontWeight: 700,
                background: '#fff5eb',
                border: '1px solid #fed7aa',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '11px',
                transition: 'all 0.2s ease'
              }}
              title="Change Delivery Port & Location Map"
            >
              <MapPin size={12} />
              <span>Deliver to: {activeDeliveryHub.flag} {activeDeliveryHub.city} ({activeDeliveryHub.portCode.includes('-') ? activeDeliveryHub.portCode.split('-')[1] : activeDeliveryHub.portCode})</span>
              <ChevronDown size={11} color="#ff6600" />
            </button>

            <button
              onClick={() => setCurrencyModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#334155', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', background: 'transparent' }}
            >
              <span>{currencyConfig.code} ({currencyConfig.symbol})</span>
              <ChevronDown size={12} color="#94a3b8" />
            </button>

            <span style={{ color: '#cbd5e1' }}>|</span>

            <Link
              to="/buyer-central"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700 }}
            >
              <span className="pulse-dot" />
              <span>Trade Assurance Escrow</span>
            </Link>
          </div>

          {/* Right Buyer Shortcuts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <Link to="/rfq" style={{ color: '#475569', fontWeight: 600, transition: 'color 0.15s ease' }}>
              Submit RFQ
            </Link>
            <Link to="/ai-sourcing" style={{ color: '#ff6600', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} />
              <span>Accio AI Sourcing</span>
            </Link>
            <Link to="/orders" style={{ color: '#475569', fontWeight: 600 }}>
              Order Tracking
            </Link>
            <Link to="/buyer-central" style={{ color: '#475569', fontWeight: 600 }}>
              Buyer Central
            </Link>
            <Link to="/sell" style={{ color: '#ff6600', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', background: '#fff5eb', padding: '2px 8px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
              <Building2 size={12} />
              <span>Seller Workbench</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION & SEARCH BAR */}
      <div style={{ padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px' }}>
          
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: 'none', padding: '6px' }}
              className="mobile-menu-btn"
            >
              <Menu size={22} color="#0f172a" />
            </button>

            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center' }}>
                <span>Alibaba</span>
                <span style={{ color: '#0f172a' }}>.com</span>
              </div>
              <span style={{ fontSize: '10px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', padding: '2px 7px', borderRadius: '6px', fontWeight: 800, letterSpacing: '0.6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                BUYER HUB
              </span>
            </Link>
          </div>

          {/* Center Search Bar */}
          <div style={{ flex: 1, maxWidth: '680px' }}>
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid #ff6600',
                borderRadius: '30px',
                background: '#ffffff',
                boxShadow: '0 2px 12px rgba(255, 102, 0, 0.08)',
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                overflow: 'hidden'
              }}
            >
              {/* Search Type Dropdown */}
              <select
                value={searchTab}
                onChange={(e) => setSearchTab(e.target.value as any)}
                style={{
                  padding: '11px 16px',
                  border: 'none',
                  borderRight: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#334155',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="products">Products</option>
                <option value="manufacturers">Manufacturers</option>
                <option value="ai-mode">Accio AI</option>
              </select>

              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, verified factories, OEM/ODM keywords..."
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  border: 'none',
                  fontSize: '13.5px',
                  outline: 'none',
                  color: '#0f172a',
                  background: 'transparent'
                }}
              />

              {/* Camera Search Button */}
              <button
                type="button"
                onClick={() => setImageSearchModalOpen(true)}
                title="Search by Image"
                style={{
                  padding: '0 14px',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff6600')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                <Camera size={18} />
              </button>

              {/* Search Submit Button */}
              <button
                type="submit"
                style={{
                  background: 'var(--ali-orange-gradient)',
                  color: '#ffffff',
                  padding: '10px 24px',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '2px',
                  borderRadius: '26px'
                }}
              >
                <Search size={15} />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Right Buyer Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* Messages */}
            <Link
              to="/messages"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#334155',
                position: 'relative',
                fontSize: '11px',
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: '10px',
                transition: 'background 0.15s ease, color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ position: 'relative' }}>
                <MessageSquare size={19} />
                {unreadMessagesCount > 0 && (
                  <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#ef4444', color: '#fff', fontSize: '10px', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)' }}>
                    {unreadMessagesCount}
                  </span>
                )}
              </div>
              <span style={{ marginTop: '2px' }}>Messages</span>
            </Link>

            {/* Orders */}
            <Link
              to="/orders"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#334155',
                fontSize: '11px',
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: '10px',
                transition: 'background 0.15s ease, color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <FileText size={19} />
              <span style={{ marginTop: '2px' }}>Orders</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#334155',
                position: 'relative',
                fontSize: '11px',
                fontWeight: 600,
                padding: '6px 10px',
                borderRadius: '10px',
                transition: 'background 0.15s ease, color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ position: 'relative' }}>
                <ShoppingCart size={19} />
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: 'var(--ali-orange-gradient)', color: '#fff', fontSize: '10px', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--ali-orange-glow)' }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span style={{ marginTop: '2px' }}>Cart</span>
            </Link>

            {/* User Account / Profile */}
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              {currentUser ? (
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#ffffff',
                    padding: '5px 12px 5px 6px',
                    borderRadius: '24px',
                    border: '1px solid #e2e8f0',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <img
                    src={currentUser.avatar}
                    alt=""
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ textAlign: 'left', fontSize: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }} className="truncate">
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span className="pulse-dot" style={{ width: '5px', height: '5px' }} /> Verified Buyer
                    </div>
                  </div>
                  <ChevronDown size={12} color="#94a3b8" />
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: '8px 18px', fontSize: '13px' }}
                >
                  Sign In
                </button>
              )}

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && currentUser && (
                <div
                  style={{
                    position: 'absolute',
                    top: '115%',
                    right: 0,
                    width: '240px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid #e2e8f0',
                    padding: '12px',
                    zIndex: 1000
                  }}
                >
                  <div style={{ paddingBottom: '10px', borderBottom: '1px solid #f1f5f9', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{currentUser.companyName}</div>
                    <div style={{ fontSize: '11px', color: '#059669', fontWeight: 700, marginTop: '2px' }}>
                      🛡️ Trade Assurance Member
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '13px' }}>
                    <Link
                      to="/account"
                      onClick={() => setIsUserDropdownOpen(false)}
                      style={{ padding: '8px 10px', borderRadius: '6px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <User size={15} color="#ff6600" /> My Sourcing Account
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setIsUserDropdownOpen(false)}
                      style={{ padding: '8px 10px', borderRadius: '6px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <FileText size={15} color="#ff6600" /> Orders &amp; Contracts
                    </Link>

                    <Link
                      to="/rfq"
                      onClick={() => setIsUserDropdownOpen(false)}
                      style={{ padding: '8px 10px', borderRadius: '6px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <Layers size={15} color="#ff6600" /> RFQ Sourcing Quotes
                    </Link>

                    <Link
                      to="/sell"
                      onClick={() => setIsUserDropdownOpen(false)}
                      style={{ padding: '8px 10px', borderRadius: '6px', color: '#ff6600', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', background: '#fff5eb' }}
                    >
                      <Building2 size={15} color="#ff6600" /> Factory Seller Workbench
                    </Link>
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '8px', paddingTop: '8px' }}>
                    <button
                      onClick={() => {
                        logoutUser();
                        setIsUserDropdownOpen(false);
                      }}
                      style={{ width: '100%', textAlign: 'left', padding: '8px 10px', color: '#ef4444', fontSize: '13px', fontWeight: 600 }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. CATEGORY & BUYER NAVIGATION ROW */}
      <div style={{ borderTop: '1px solid #f1f5f9', background: '#ffffff', padding: '8px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* All Categories Dropdown Trigger */}
          <div ref={categoryMenuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: isCategoryMenuOpen ? '#ff6600' : '#0f172a',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700
              }}
            >
              <Menu size={16} />
              <span>All Categories</span>
              <ChevronDown size={14} />
            </button>

            {/* Mega Category Drawer */}
            {isCategoryMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  left: 0,
                  width: '640px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}
              >
                {/* Left Category List */}
                <div style={{ width: '240px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '10px 0', maxHeight: '420px', overflowY: 'auto' }}>
                  {CATEGORIES.map(cat => (
                    <div
                      key={cat.id}
                      onMouseEnter={() => setActiveCategoryHover(cat.id)}
                      onClick={() => {
                        setIsCategoryMenuOpen(false);
                        navigate({ to: '/products', search: { category: cat.id } as any });
                      }}
                      style={{
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                        fontWeight: activeCategoryHover === cat.id ? 700 : 500,
                        color: activeCategoryHover === cat.id ? '#ff6600' : '#334155',
                        background: activeCategoryHover === cat.id ? '#ffffff' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>
                          {cat.id === 'apparel' ? '👕' : cat.id === 'electronics' ? '📱' : cat.id === 'machinery' ? '⚙️' : cat.id === 'home-kitchen' ? '🏠' : cat.id === 'beauty-care' ? '💄' : cat.id === 'sports-outdoors' ? '⚽' : cat.id === 'auto-parts' ? '🚗' : '📦'}
                        </span>
                        <span>{cat.name}</span>
                      </div>
                      <ChevronRight size={14} color="#cbd5e1" />
                    </div>
                  ))}
                </div>

                {/* Right Subcategories */}
                <div style={{ flex: 1, padding: '20px', maxHeight: '420px', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>
                      {currentHoveredCategory.id === 'apparel' ? '👕' : currentHoveredCategory.id === 'electronics' ? '📱' : currentHoveredCategory.id === 'machinery' ? '⚙️' : currentHoveredCategory.id === 'home-kitchen' ? '🏠' : currentHoveredCategory.id === 'beauty-care' ? '💄' : currentHoveredCategory.id === 'sports-outdoors' ? '⚽' : currentHoveredCategory.id === 'auto-parts' ? '🚗' : '📦'}
                    </span>
                    <strong style={{ fontSize: '15px', color: '#0f172a' }}>{currentHoveredCategory.name}</strong>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {currentHoveredCategory.subcategories.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => {
                          setIsCategoryMenuOpen(false);
                          navigate({ to: '/products', search: { category: currentHoveredCategory.id } as any });
                        }}
                        style={{
                          fontSize: '12px',
                          color: '#475569',
                          padding: '6px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fff5eb';
                          e.currentTarget.style.color = '#ff6600';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#475569';
                        }}
                      >
                        • {sub.name}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <Link
                      to="/products"
                      search={{ category: currentHoveredCategory.id } as any}
                      onClick={() => setIsCategoryMenuOpen(false)}
                      style={{ fontSize: '12px', color: '#ff6600', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span>Explore all {currentHoveredCategory.name} products</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Buyer Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Link
              to="/products"
              search={{ rtsOnly: true } as any}
              style={{
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '20px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#eff6ff';
                e.currentTarget.style.color = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <PackageCheck size={14} color="#2563eb" />
              <span>Ready to Ship</span>
            </Link>

            <Link
              to="/manufacturers"
              style={{
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '20px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fff7ed';
                e.currentTarget.style.color = '#c2410c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <Building2 size={14} color="#c2410c" />
              <span>Verified Factories</span>
            </Link>

            <Link
              to="/buyer-central"
              style={{
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '20px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0fdf4';
                e.currentTarget.style.color = '#047857';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <ShieldCheck size={14} color="#059669" />
              <span>Trade Assurance Hub</span>
            </Link>

            <Link
              to="/rfq"
              style={{
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '20px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fffbeb';
                e.currentTarget.style.color = '#b45309';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <FileText size={14} color="#d97706" />
              <span>Request for Quotation</span>
            </Link>

            <Link
              to="/ai-sourcing"
              style={{
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                borderRadius: '20px',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#faf5ff';
                e.currentTarget.style.color = '#7e22ce';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <Sparkles size={14} color="#9333ea" />
              <span>Accio AI Sourcing</span>
            </Link>

            <Link
              to="/products"
              search={{ usStock: true } as any}
              style={{
                color: '#be185d',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '20px',
                background: '#fdf2f8',
                border: '1px solid #fbcfe8',
                transition: 'all 0.15s ease'
              }}
            >
              🇺🇸 US Warehouse Stock
            </Link>
          </div>

          {/* Buyer Central CTA */}
          <div>
            <Link
              to="/buyer-central"
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#059669',
                background: '#ecfdf5',
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid #a7f3d0',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 1px 2px rgba(5, 150, 105, 0.1)'
              }}
            >
              <ShieldCheck size={13} />
              <span>Buyer Protection Guarantee</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
