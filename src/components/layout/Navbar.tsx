import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  Package,
  PackageCheck,
  Flame,
  ChevronRight,
  Menu,
  X,
  Clock,
  Layers,
  MapPin,
  Boxes,
  Compass,
  Lock,
  ArrowRight
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
    <header style={{ width: '100%', zIndex: 1000, position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-color)', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)' }}>
      
      {/* 1. TOP UTILITY BAR (Swiss Clean, Minimalist Trust & Region) */}
      <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9', fontSize: '12px', color: '#64748b', padding: '6px 0' }}>
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
                color: '#ff5500',
                fontWeight: 700,
                background: '#fff5eb',
                border: '1px solid #fed7aa',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '11.5px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              title="Change Delivery Port & Location Map"
            >
              <MapPin size={12} style={{ flexShrink: 0 }} />
              <span className="truncate" style={{ maxWidth: '180px' }}>
                Deliver to: {activeDeliveryHub.flag} {activeDeliveryHub.city} ({activeDeliveryHub.portCode.includes('-') ? activeDeliveryHub.portCode.split('-')[1] : activeDeliveryHub.portCode})
              </span>
              <ChevronDown size={11} color="#ff5500" style={{ flexShrink: 0 }} />
            </button>

            <button
              onClick={() => setCurrencyModalOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#334155', fontWeight: 600, padding: '3px 8px', borderRadius: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <span>{currencyConfig.code} ({currencyConfig.symbol})</span>
              <ChevronDown size={12} color="#94a3b8" />
            </button>

            <span className="hidden-mobile" style={{ color: '#cbd5e1' }}>|</span>

            <Link
              to="/buyer-central"
              className="hidden-mobile"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700 }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              <span>SourceGrid Citibank Escrow</span>
            </Link>
          </div>

          {/* Right Buyer Shortcuts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }} className="hidden-mobile">
            <Link to="/rfq" style={{ color: '#475569', fontWeight: 600, transition: 'color 0.15s ease' }}>
              Submit RFQ
            </Link>
            <Link to="/ai-sourcing" style={{ color: '#6366f1', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} />
              <span>GridAI Sourcing</span>
            </Link>
            <Link to="/orders" style={{ color: '#475569', fontWeight: 600 }}>
              Order Tracking
            </Link>
            <Link to="/buyer-central" style={{ color: '#475569', fontWeight: 600 }}>
              Buyer Central
            </Link>
            <Link to="/sell" style={{ color: '#ff5500', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', background: '#fff5eb', padding: '2px 10px', borderRadius: '12px', border: '1px solid #fed7aa' }}>
              <Building2 size={12} />
              <span>Supplier Hub</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION & SEARCH BAR */}
      <div style={{ padding: '12px 0' }}>
        <div className="container nav-main-container">
          
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: 'none', padding: '6px', background: 'transparent', border: 'none' }}
              className="mobile-menu-btn"
            >
              <Menu size={22} color="#0f172a" />
            </button>

            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(15, 23, 42, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Boxes size={20} color="#ff5500" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.5px', lineHeight: '1' }}>
                  SOURCE<span style={{ color: '#ff5500' }}>GRID</span>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#64748b', letterSpacing: '0.8px', textTransform: 'uppercase', marginTop: '1px' }}>
                  AI Wholesale Network
                </span>
              </div>
            </Link>
          </div>

          {/* Center Search Bar */}
          <div className="nav-search-container" style={{ flex: 1, maxWidth: '680px' }}>
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1.5px solid #e2e8f0',
                borderRadius: '30px',
                background: '#f8fafc',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all 0.2s ease',
                overflow: 'hidden'
              }}
              onFocusCapture={(e) => {
                e.currentTarget.style.borderColor = '#ff5500';
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 85, 0, 0.15)';
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              }}
            >
              {/* Search Type Dropdown */}
              <select
                value={searchTab}
                onChange={(e) => setSearchTab(e.target.value as any)}
                style={{
                  padding: '10px 14px',
                  border: 'none',
                  borderRight: '1px solid #e2e8f0',
                  background: 'transparent',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#334155',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="products">Products</option>
                <option value="manufacturers">Factories</option>
                <option value="ai-mode">GridAI</option>
              </select>

              {/* Text Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 5,000,000+ wholesale products, low MOQs, audited plants..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: 'none',
                  fontSize: '13.5px',
                  outline: 'none',
                  color: '#0f172a',
                  background: 'transparent',
                  fontWeight: 500
                }}
              />

              {/* Camera Search Button */}
              <button
                type="button"
                onClick={() => setImageSearchModalOpen(true)}
                title="Search by Image / CAD"
                style={{
                  padding: '0 12px',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff5500')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
              >
                <Camera size={18} />
              </button>

              {/* Search Submit Button */}
              <button
                type="submit"
                className="btn-primary"
                style={{
                  padding: '8px 20px',
                  fontSize: '13px',
                  margin: '3px',
                  boxShadow: 'none'
                }}
              >
                <Search size={14} />
                <span>Search</span>
              </button>
            </form>
          </div>

          {/* Right Buyer Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            
            {/* Messages */}
            <Link
              to="/messages"
              className="hidden-mobile"
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
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
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
              className="hidden-mobile"
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
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
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
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ position: 'relative' }}>
                <ShoppingCart size={19} />
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#ff5500', color: '#fff', fontSize: '10px', fontWeight: 800, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(255, 85, 0, 0.4)' }}>
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden-mobile" style={{ marginTop: '2px' }}>Cart</span>
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
                    padding: '4px 10px 4px 6px',
                    borderRadius: '24px',
                    border: '1px solid #e2e8f0',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'all 0.15s ease',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={currentUser.avatar}
                    alt=""
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div className="hidden-mobile" style={{ textAlign: 'left', fontSize: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#0f172a' }} className="truncate">
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: '10px', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} /> Verified Buyer
                    </div>
                  </div>
                  <ChevronDown className="hidden-mobile" size={12} color="#94a3b8" />
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
                    borderRadius: '14px',
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
                      🛡️ SourceGrid Escrow Protected
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
                      <User size={15} color="#ff5500" /> Sourcing Account
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setIsUserDropdownOpen(false)}
                      style={{ padding: '8px 10px', borderRadius: '6px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <FileText size={15} color="#ff5500" /> Orders &amp; Contracts
                    </Link>

                    <Link
                      to="/rfq"
                      onClick={() => setIsUserDropdownOpen(false)}
                      style={{ padding: '8px 10px', borderRadius: '6px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <Layers size={15} color="#ff5500" /> RFQ Sourcing Quotes
                    </Link>

                    <Link
                      to="/sell"
                      onClick={() => setIsUserDropdownOpen(false)}
                      style={{ padding: '8px 10px', borderRadius: '6px', color: '#ff5500', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', background: '#fff5eb' }}
                    >
                      <Building2 size={15} color="#ff5500" /> Supplier Workbench
                    </Link>
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '8px', paddingTop: '8px' }}>
                    <button
                      onClick={() => {
                        logoutUser();
                        setIsUserDropdownOpen(false);
                      }}
                      style={{ width: '100%', textAlign: 'left', padding: '8px 10px', color: '#ef4444', fontSize: '13px', fontWeight: 600, background: 'transparent', border: 'none', cursor: 'pointer' }}
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
      <div className="hidden-mobile" style={{ borderTop: '1px solid #f1f5f9', background: '#ffffff', padding: '6px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          
          {/* All Categories Dropdown Trigger */}
          <div ref={categoryMenuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: isCategoryMenuOpen ? '#ff5500' : '#0f172a',
                color: '#ffffff',
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Menu size={15} />
              <span>All Categories</span>
              <ChevronDown size={13} />
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
                  borderRadius: '16px',
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
                        color: activeCategoryHover === cat.id ? '#ff5500' : '#334155',
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
                          e.currentTarget.style.color = '#ff5500';
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
                      style={{ fontSize: '12px', color: '#ff5500', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, overflowX: 'auto', whiteSpace: 'nowrap' }}>
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
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#ff5500';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <PackageCheck size={14} color="#ff5500" />
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
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#ff5500';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <Building2 size={14} color="#0f172a" />
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
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#059669';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <ShieldCheck size={14} color="#059669" />
              <span>Buyer Protection</span>
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
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#ff5500';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <FileText size={14} color="#d97706" />
              <span>Instant RFQ</span>
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
                e.currentTarget.style.background = '#f1f5f9';
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#1e293b';
              }}
            >
              <Sparkles size={14} color="#6366f1" />
              <span>GridAI Sourcing</span>
            </Link>

            <Link
              to="/products"
              search={{ usStock: true } as any}
              style={{
                color: '#be185d',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '20px',
                background: '#fdf2f8',
                border: '1px solid #fbcfe8',
                transition: 'all 0.15s ease'
              }}
            >
              🇺🇸 US Domestic Stock
            </Link>
          </div>

          {/* Buyer Protection CTA */}
          <div className="hidden-mobile">
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
                gap: '5px'
              }}
            >
              <ShieldCheck size={13} />
              <span>$500k Escrow Guarantee</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. MOBILE NAVIGATION DRAWER (Slide-out menu rendered via Portal)      */}
      {/* ===================================================================== */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="mobile-drawer-backdrop"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="mobile-drawer-panel">
            
            {/* Header */}
            <div
              style={{
                padding: '16px 18px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#ffffff',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                flexShrink: 0,
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Boxes size={18} color="#ff5500" />
                </div>
                <div style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.3px' }}>
                  SOURCE<span style={{ color: '#ff5500' }}>GRID</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div
              style={{
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {/* User Profile / Auth */}
              {currentUser ? (
                <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <img src={currentUser.avatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '13px' }} className="truncate">
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#059669', fontWeight: 700 }} className="truncate">
                        🛡️ Verified Buyer Account
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
                    <Link
                      to="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ fontSize: '11.5px', fontWeight: 700, color: '#334155', background: '#ffffff', padding: '6px 8px', borderRadius: '6px', textAlign: 'center', border: '1px solid #cbd5e1', textDecoration: 'none' }}
                      className="truncate"
                    >
                      My Orders
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logoutUser();
                        setIsMobileMenuOpen(false);
                      }}
                      style={{ fontSize: '11.5px', fontWeight: 700, color: '#ef4444', background: '#ffffff', padding: '6px 8px', borderRadius: '6px', textAlign: 'center', border: '1px solid #cbd5e1', cursor: 'pointer' }}
                      className="truncate"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '10px', boxSizing: 'border-box' }}
                >
                  <User size={15} />
                  <span>Sign In to SourceGrid</span>
                </button>
              )}

              {/* Mobile Search Input */}
              <form
                onSubmit={(e) => {
                  handleSearchSubmit(e);
                  setIsMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#f8fafc',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '6px 10px',
                  gap: '6px',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <Search size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, factories..."
                  style={{ flex: 1, minWidth: 0, border: 'none', background: 'transparent', outline: 'none', fontSize: '12.5px', color: '#0f172a' }}
                />
                <button
                  type="submit"
                  style={{ background: '#ff5500', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, flexShrink: 0, cursor: 'pointer' }}
                >
                  Go
                </button>
              </form>

              {/* Main Navigation Links */}
              <div style={{ width: '100%' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Sourcing Hubs
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {[
                    { label: 'Wholesale Catalog', to: '/products', icon: Package, color: '#ff5500', badge: '5M+ SKUs' },
                    { label: 'Ready to Ship (RTS)', to: '/products', search: { rtsOnly: true }, icon: PackageCheck, color: '#10b981', badge: '3-5 Days' },
                    { label: 'Verified Manufacturers', to: '/manufacturers', icon: Building2, color: '#0284c7', badge: 'Audited' },
                    { label: 'GridAI Sourcing Studio', to: '/ai-sourcing', icon: Sparkles, color: '#6366f1', badge: 'AI BoM' },
                    { label: 'Request for Quotation', to: '/rfq', icon: FileText, color: '#d97706', badge: 'Fast Bids' },
                    { label: 'Citibank Escrow Protection', to: '/buyer-central', icon: ShieldCheck, color: '#059669', badge: '$500k' },
                    { label: 'US Domestic Stock', to: '/products', search: { usStock: true }, icon: Globe, color: '#be185d', badge: 'USA' },
                    { label: 'Supplier Workbench', to: '/sell', icon: Flame, color: '#ea580c', badge: 'Sell' }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={idx}
                        to={item.to}
                        search={item.search as any}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          color: '#1e293b',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          transition: 'all 0.15s ease',
                          textDecoration: 'none',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1, paddingRight: '6px' }}>
                          <Icon size={16} color={item.color} style={{ flexShrink: 0 }} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '6px', background: '#f1f5f9', color: '#64748b', flexShrink: 0 }}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Categories Grid */}
              <div style={{ width: '100%' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Product Categories
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '6px', width: '100%' }}>
                  {CATEGORIES.slice(0, 8).map(c => {
                    const shortName = 
                      c.id === 'apparel' ? 'Apparel' :
                      c.id === 'electronics' ? 'Electronics' :
                      c.id === 'machinery' ? 'Machinery' :
                      c.id === 'home-kitchen' ? 'Home & Living' :
                      c.id === 'beauty-care' ? 'Beauty & Care' :
                      c.id === 'sports-outdoors' ? 'Sports' :
                      c.id === 'auto-parts' ? 'Auto Parts' :
                      'Packaging';
                    return (
                      <Link
                        key={c.id}
                        to="/products"
                        search={{ category: c.id } as any}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          padding: '7px 8px',
                          background: '#f8fafc',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          color: '#334155',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          minWidth: 0,
                          textDecoration: 'none',
                          boxSizing: 'border-box'
                        }}
                      >
                        <span style={{ flexShrink: 0 }}>
                          {c.id === 'apparel' ? '👕' : c.id === 'electronics' ? '📱' : c.id === 'machinery' ? '⚙️' : c.id === 'home-kitchen' ? '🏠' : c.id === 'beauty-care' ? '💄' : c.id === 'sports-outdoors' ? '⚽' : c.id === 'auto-parts' ? '🚗' : '📦'}
                        </span>
                        <span className="truncate" style={{ minWidth: 0, flex: 1 }}>{shortName}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Region & Hub Switcher */}
              <div style={{ paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setLocationMapModalOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 10px',
                    background: '#fff5eb',
                    border: '1px solid #fed7aa',
                    borderRadius: '8px',
                    color: '#ff5500',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px', minWidth: 0 }}>
                    <MapPin size={13} style={{ flexShrink: 0 }} />
                    <span className="truncate">Ship to: {activeDeliveryHub.flag} {activeDeliveryHub.city}</span>
                  </span>
                  <ChevronRight size={13} style={{ flexShrink: 0 }} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCurrencyModalOpen(true);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '8px 10px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxSizing: 'border-box'
                  }}
                >
                  <span className="truncate">Currency: {currencyConfig.code} ({currencyConfig.symbol})</span>
                  <ChevronRight size={13} style={{ flexShrink: 0 }} />
                </button>
              </div>

            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
};
