import React from 'react';
import { Filter, RotateCcw, ShieldCheck, Award, Zap, PackageCheck } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  maxMoq?: number;
  verifiedOnly: boolean;
  tradeAssuranceOnly: boolean;
  readyToShipOnly: boolean;
  usStockOnly: boolean;
  country?: string;
}

export interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults
}) => {
  return (
    <aside
      style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1px solid #e2e8f0',
        padding: '22px',
        boxShadow: 'var(--shadow-xs)',
        display: 'flex',
        flexDirection: 'column',
        gap: '22px'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '14px',
          borderBottom: '1px solid #f1f5f9'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="#ff6600" />
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Filters</span>
          <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
            {totalResults}
          </span>
        </div>
        <button
          onClick={onReset}
          style={{
            fontSize: '11.5px',
            color: '#ff6600',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '6px',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#fff5eb'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <RotateCcw size={11} />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Supplier Credentials */}
      <div>
        <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Supplier Credentials
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#334155' }}>
            <input
              type="checkbox"
              checked={filters.tradeAssuranceOnly}
              onChange={e => onFilterChange({ ...filters, tradeAssuranceOnly: e.target.checked })}
              style={{ width: '16px', height: '16px', accentColor: '#059669', cursor: 'pointer' }}
            />
            <span className="badge-trade-assurance" style={{ padding: '3px 9px' }}>
              <ShieldCheck size={12} /> Trade Assurance
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#334155' }}>
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={e => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
              style={{ width: '16px', height: '16px', accentColor: '#ff6600', cursor: 'pointer' }}
            />
            <span className="badge-verified" style={{ padding: '3px 9px' }}>
              <Award size={12} /> Verified Factory
            </span>
          </label>
        </div>
      </div>

      {/* 2. Product Services */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Sourcing Channels
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#334155' }}>
            <input
              type="checkbox"
              checked={filters.readyToShipOnly}
              onChange={e => onFilterChange({ ...filters, readyToShipOnly: e.target.checked })}
              style={{ width: '16px', height: '16px', accentColor: '#2563eb', cursor: 'pointer' }}
            />
            <span className="badge-rts" style={{ padding: '3px 9px' }}>Ready to Ship (RTS)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#334155' }}>
            <input
              type="checkbox"
              checked={filters.usStockOnly}
              onChange={e => onFilterChange({ ...filters, usStockOnly: e.target.checked })}
              style={{ width: '16px', height: '16px', accentColor: '#db2777', cursor: 'pointer' }}
            />
            <span className="badge-us-stock" style={{ padding: '3px 9px' }}>US Warehouse Stock</span>
          </label>
        </div>
      </div>

      {/* 3. Categories */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Category
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '200px', overflowY: 'auto' }}>
          <div
            onClick={() => onFilterChange({ ...filters, category: undefined })}
            style={{
              padding: '7px 10px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: !filters.category ? 700 : 500,
              color: !filters.category ? '#ff6600' : '#334155',
              background: !filters.category ? '#fff5eb' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            All Categories
          </div>
          {CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => onFilterChange({ ...filters, category: cat.id })}
              style={{
                padding: '7px 10px',
                borderRadius: '8px',
                fontSize: '12.5px',
                fontWeight: filters.category === cat.id ? 700 : 500,
                color: filters.category === cat.id ? '#ff6600' : '#334155',
                background: filters.category === cat.id ? '#fff5eb' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.id === 'apparel' ? '👕' : cat.id === 'electronics' ? '📱' : cat.id === 'machinery' ? '⚙️' : cat.id === 'home-kitchen' ? '🏠' : cat.id === 'beauty-care' ? '💄' : cat.id === 'sports-outdoors' ? '⚽' : cat.id === 'auto-parts' ? '🚗' : '📦'} {cat.name}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Min Order Quantity (MOQ) */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Max Min. Order (MOQ)
        </h4>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[10, 50, 100, 500].map(moq => (
            <button
              key={moq}
              type="button"
              onClick={() => onFilterChange({ ...filters, maxMoq: filters.maxMoq === moq ? undefined : moq })}
              style={{
                flex: 1,
                padding: '6px 0',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontWeight: 700,
                border: filters.maxMoq === moq ? '1px solid #ff6600' : '1px solid #e2e8f0',
                background: filters.maxMoq === moq ? '#fff5eb' : '#f8fafc',
                color: filters.maxMoq === moq ? '#ff6600' : '#475569',
                transition: 'all 0.15s ease'
              }}
            >
              ≤ {moq}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Price Range */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
        <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Price Range (USD)
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="number"
            placeholder="Min $"
            value={filters.minPrice || ''}
            onChange={e => onFilterChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '12.5px',
              outline: 'none'
            }}
          />
          <span style={{ color: '#94a3b8' }}>-</span>
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxPrice || ''}
            onChange={e => onFilterChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '12.5px',
              outline: 'none'
            }}
          />
        </div>
      </div>
    </aside>
  );
};
