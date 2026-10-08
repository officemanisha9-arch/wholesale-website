import React, { useState, useMemo } from 'react';
import { useSearch, Link } from '@tanstack/react-router';
import { LayoutGrid, List, ChevronRight, Search, Filter, X, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { FilterSidebar, FilterState } from '../components/products/FilterSidebar';
import { ProductCard } from '../components/products/ProductCard';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const ProductListingPage: React.FC = () => {
  const routerSearch = (useSearch({ strict: false }) || {}) as any;
  const { searchQuery, setSearchQuery } = useApp();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'best_match' | 'price_asc' | 'price_desc' | 'orders_desc' | 'rating_desc'>('best_match');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    category: routerSearch.category as string | undefined,
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    maxMoq: undefined as number | undefined,
    verifiedOnly: false,
    tradeAssuranceOnly: false,
    readyToShipOnly: Boolean(routerSearch.rtsOnly || routerSearch.rts),
    usStockOnly: Boolean(routerSearch.usStock),
    country: undefined as string | undefined
  });

  const queryTerm = routerSearch.q || searchQuery || '';

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((prod: Product) => {
      // Keyword search
      if (queryTerm) {
        const q = queryTerm.toLowerCase();
        const matchTitle = prod.title.toLowerCase().includes(q);
        const matchCat = prod.categoryName.toLowerCase().includes(q);
        const matchTags = prod.tags.some(t => t.toLowerCase().includes(q));
        const matchSupplier = prod.supplier.name.toLowerCase().includes(q);
        if (!matchTitle && !matchCat && !matchTags && !matchSupplier) {
          return false;
        }
      }

      // Category
      if (filters.category && prod.categoryId !== filters.category) {
        return false;
      }

      // Verified
      if (filters.verifiedOnly && !prod.supplier.verified) {
        return false;
      }

      // Trade Assurance
      if (filters.tradeAssuranceOnly && !prod.supplier.tradeAssurance) {
        return false;
      }

      // RTS
      if (filters.readyToShipOnly && !prod.readyToShip) {
        return false;
      }

      // US Stock
      if (filters.usStockOnly && !prod.usLocalStock) {
        return false;
      }

      // MOQ
      if (filters.maxMoq && prod.moq > filters.maxMoq) {
        return false;
      }

      // Price
      const minP = Math.min(...prod.priceTiers.map(t => t.price));
      if (filters.minPrice && minP < filters.minPrice) return false;
      if (filters.maxPrice && minP > filters.maxPrice) return false;

      return true;
    }).sort((a: Product, b: Product) => {
      if (sortBy === 'price_asc') {
        const aMin = Math.min(...a.priceTiers.map(t => t.price));
        const bMin = Math.min(...b.priceTiers.map(t => t.price));
        return aMin - bMin;
      }
      if (sortBy === 'price_desc') {
        const aMin = Math.min(...a.priceTiers.map(t => t.price));
        const bMin = Math.min(...b.priceTiers.map(t => t.price));
        return bMin - aMin;
      }
      if (sortBy === 'orders_desc') {
        return b.ordersCount - a.ordersCount;
      }
      if (sortBy === 'rating_desc') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [queryTerm, filters, sortBy]);

  const handleResetFilters = () => {
    setFilters({
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      maxMoq: undefined,
      verifiedOnly: false,
      tradeAssuranceOnly: false,
      readyToShipOnly: false,
      usStockOnly: false,
      country: undefined
    });
    setSearchQuery('');
  };

  const activeCategoryObj = CATEGORIES.find(c => c.id === filters.category);

  return (
    <div style={{ padding: '24px 0 60px 0', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Breadcrumb Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '8px', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#64748b' }}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Wholesale Products</span>
            {activeCategoryObj && (
              <>
                <ChevronRight size={12} />
                <span style={{ color: '#ff6600', fontWeight: 700 }}>{activeCategoryObj.name}</span>
              </>
            )}
            {queryTerm && (
              <>
                <ChevronRight size={12} />
                <span style={{ color: '#ff6600', fontWeight: 700 }}>"{queryTerm}"</span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                {activeCategoryObj ? activeCategoryObj.name : queryTerm ? `Results for "${queryTerm}"` : 'Global B2B Wholesale Showroom'}
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Verified factory-direct pricing with Trade Assurance payment protection.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="btn-secondary"
              style={{ display: 'none', padding: '8px 14px', fontSize: '13px' }}
            >
              <Filter size={14} />
              <span>Filters ({filteredProducts.length})</span>
            </button>
          </div>
        </div>

        {/* Main Grid Layout (Sidebar + Products) */}
        <div className="showroom-layout">
          
          {/* Left Filter Sidebar */}
          <div>
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </div>

          {/* Right Product Grid Column */}
          <div>
            {/* Top Toolbar */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                boxShadow: 'var(--shadow-xs)',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                Showing <strong>{filteredProducts.length}</strong> matching wholesale items
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Sort dropdown */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <span style={{ color: '#64748b' }}>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      background: '#fff',
                      fontSize: '13px',
                      color: '#0f172a',
                      fontWeight: 600,
                      outline: 'none'
                    }}
                  >
                    <option value="best_match">Best Match</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="orders_desc">Highest Orders Volume</option>
                    <option value="rating_desc">Top Supplier Rating</option>
                  </select>
                </div>

                {/* Grid / List layout switcher */}
                <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '6px', padding: '2px' }}>
                  <button
                    onClick={() => setLayout('grid')}
                    style={{
                      padding: '5px 8px',
                      borderRadius: '4px',
                      background: layout === 'grid' ? '#ffffff' : 'transparent',
                      color: layout === 'grid' ? '#ff6600' : '#64748b',
                      boxShadow: layout === 'grid' ? 'var(--shadow-xs)' : 'none'
                    }}
                    title="Grid Layout"
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    style={{
                      padding: '5px 8px',
                      borderRadius: '4px',
                      background: layout === 'list' ? '#ffffff' : 'transparent',
                      color: layout === 'list' ? '#ff6600' : '#64748b',
                      boxShadow: layout === 'list' ? 'var(--shadow-xs)' : 'none'
                    }}
                    title="List Layout"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid / Empty State */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '60px 24px',
                  textAlign: 'center',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#fff5eb',
                    color: '#ff6600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}
                >
                  <Search size={28} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  No Products Found
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '420px', margin: '0 auto 20px auto', lineHeight: '20px' }}>
                  We couldn't find items matching your filter criteria. Try clearing filters or submit a custom RFQ to our verified factory pool.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button onClick={handleResetFilters} className="btn-primary" style={{ padding: '10px 22px' }}>
                    Reset Filters
                  </button>
                  <Link to="/rfq" className="btn-secondary" style={{ padding: '10px 20px' }}>
                    Post Custom RFQ
                  </Link>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fill, minmax(220px, 1fr))' : '1fr',
                  gap: '16px'
                }}
              >
                {filteredProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} layout={layout} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
