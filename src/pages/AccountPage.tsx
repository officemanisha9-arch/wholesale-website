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
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* User Profile Header Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            padding: '28px',
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
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
              alt={currentUser?.name}
              style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ff6a00' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#111', fontFamily: 'Outfit, sans-serif' }}>
                  {currentUser?.name || 'Alexander Wright'}
                </h1>
                <span className="badge-guaranteed">
                  VIP PRO BUYER TIER 2
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#666' }}>
                {currentUser?.companyName} • Member since 2021 • Country: {currentUser?.country}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', textAlign: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#ff6a00' }}>{orders.length}</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Active Orders</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb' }}>{rfqs.length}</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Submitted RFQs</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px 18px', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#e11d48' }}>{savedProducts.length}</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Saved Favorites</div>
            </div>
          </div>
        </div>

        {/* Quick Links / Dashboard Grid */}
        <div className="grid-cols-3-responsive" style={{ marginBottom: '36px' }}>
          <Link
            to="/orders"
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Package size={24} color="#ff6a00" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>Orders &amp; Shipments</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Manage and track your active Trade Assurance orders</div>
              </div>
            </div>
            <ChevronRight size={18} color="#999" />
          </Link>

          <Link
            to="/rfq"
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={24} color="#2563eb" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>My Sourcing RFQs</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Review supplier quotation proposals</div>
              </div>
            </div>
            <ChevronRight size={18} color="#999" />
          </Link>

          <Link
            to="/messages"
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Building2 size={24} color="#059669" />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>Supplier Messenger</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Chat and negotiate wholesale terms</div>
              </div>
            </div>
            <ChevronRight size={18} color="#999" />
          </Link>
        </div>

        {/* Favorite Products Showcase */}
        {savedProducts.length > 0 && (
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}>
              My Saved &amp; Favorite Wholesale Products ({savedProducts.length})
            </h2>
            <div className="grid-cols-4-responsive">
              {savedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* Followed Suppliers Showcase */}
        {savedSuppliers.length > 0 && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}>
              Followed Verified OEM Manufacturers ({savedSuppliers.length})
            </h2>
            <div className="grid-cols-2-responsive">
              {savedSuppliers.map(sup => (
                <div
                  key={sup.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={sup.avatar}
                      alt={sup.name}
                      style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, color: '#111', fontSize: '14px' }}>{sup.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{sup.city} • {sup.years} Yrs Verified Gold Supplier</div>
                    </div>
                  </div>

                  <Link to="/messages" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
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
