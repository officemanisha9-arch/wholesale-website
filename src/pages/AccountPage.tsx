import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  User,
  Building2,
  Package,
  Heart,
  FileText,
  ShieldCheck,
  Award,
  ChevronRight,
  ExternalLink,
  Store
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { SUPPLIERS } from '../data/suppliers';
import { ProductCard } from '../components/products/ProductCard';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    orders,
    rfqs,
    favoriteProductIds,
    favoriteSupplierIds,
    formatPrice
  } = useApp();

  const savedProducts = PRODUCTS.filter(p => favoriteProductIds.includes(p.id));
  const savedSuppliers = SUPPLIERS.filter(s => favoriteSupplierIds.includes(s.id));

  return (
    <div style={{ padding: '28px 0 70px 0', background: 'var(--bg-app)', minHeight: '100vh' }}>
      <div className="container">
        {/* User Profile Header Card */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            border: '1px solid var(--border-color)',
            padding: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-sm)',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                style={{ width: '76px', height: '76px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff6600', boxShadow: '0 4px 14px rgba(255, 102, 0, 0.25)' }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  background: '#059669',
                  color: '#fff',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px'
                }}
              >
                ✓
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
                  {currentUser?.name || 'Alexander Wright'}
                </h1>
                <span className="badge-guaranteed" style={{ borderRadius: '999px', padding: '3px 10px', fontSize: '11px' }}>
                  VIP PRO BUYER TIER 2
                </span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {currentUser?.companyName} • Member since 2021 • Country: <strong>{currentUser?.country}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', textAlign: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'var(--bg-app)', padding: '14px 22px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>{orders.length}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Orders</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '14px 22px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#2563eb', fontFamily: 'Outfit, sans-serif' }}>{rfqs.length}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Submitted RFQs</div>
            </div>
            <div style={{ background: 'var(--bg-app)', padding: '14px 22px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#e11d48', fontFamily: 'Outfit, sans-serif' }}>{savedProducts.length}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Saved Favorites</div>
            </div>
          </div>
        </div>

        {/* Quick Links / Dashboard Grid */}
        <div className="grid-cols-3-responsive" style={{ marginBottom: '36px', gap: '18px' }}>
          <Link
            to="/orders"
            style={{
              background: 'var(--bg-card)',
              borderRadius: '18px',
              border: '1px solid var(--border-color)',
              padding: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#ff6600';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff5eb', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={22} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>Orders &amp; Shipments</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Manage and track your active Trade Assurance orders</div>
              </div>
            </div>
            <ChevronRight size={18} color="#94a3b8" />
          </Link>

          <Link
            to="/rfq"
            style={{
              background: 'var(--bg-card)',
              borderRadius: '18px',
              border: '1px solid var(--border-color)',
              padding: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#2563eb';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={22} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>My Sourcing RFQs</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Review supplier quotation proposals</div>
              </div>
            </div>
            <ChevronRight size={18} color="#94a3b8" />
          </Link>

          <Link
            to="/messages"
            style={{
              background: 'var(--bg-card)',
              borderRadius: '18px',
              border: '1px solid var(--border-color)',
              padding: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-xs)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#059669';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={22} />
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>Supplier Messenger</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Chat and negotiate wholesale terms</div>
              </div>
            </div>
            <ChevronRight size={18} color="#94a3b8" />
          </Link>
        </div>

        {/* Favorite Products Showcase */}
        {savedProducts.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}>
              My Saved &amp; Favorite Wholesale Products ({savedProducts.length})
            </h2>
            <div className="product-grid-floor">
              {savedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* Followed Suppliers Showcase */}
        {savedSuppliers.length > 0 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}>
              Followed Verified OEM Manufacturers ({savedSuppliers.length})
            </h2>
            <div className="grid-cols-2-responsive" style={{ gap: '16px' }}>
              {savedSuppliers.map(sup => (
                <div
                  key={sup.id}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '16px',
                    border: '1px solid var(--border-color)',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-xs)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={sup.avatar}
                      alt={sup.name}
                      style={{ width: '50px', height: '50px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '14px', fontFamily: 'Outfit, sans-serif' }}>{sup.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{sup.city} • {sup.years} Yrs Verified Gold Supplier</div>
                    </div>
                  </div>

                  <Link to="/messages" className="btn-secondary" style={{ padding: '7px 16px', fontSize: '12px', borderRadius: '8px' }}>
                    Chat Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

