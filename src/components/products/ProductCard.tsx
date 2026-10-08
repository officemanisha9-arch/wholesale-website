import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Heart, MessageSquare, ShieldCheck, Eye, Zap, Building2, Star, ShoppingCart, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const navigate = useNavigate();
  const {
    formatPrice,
    isProductFavorited,
    toggleFavoriteProduct,
    setQuickViewProduct,
    startChatWithSupplier,
    setContactSupplierData,
    addToCart,
    showToast
  } = useApp();

  const isFavorited = isProductFavorited(product.id);
  const minPrice = Math.min(...product.priceTiers.map(t => t.price));
  const maxPrice = Math.max(...product.priceTiers.map(t => t.price));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.moq);
    showToast('Added to Cart', `Added ${product.moq} ${product.unit} to your sourcing cart.`, 'success');
  };

  if (layout === 'list') {
    return (
      <div
        className="product-card"
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '18px',
          gap: '24px',
          borderRadius: '18px',
          background: '#ffffff'
        }}
      >
        {/* Image */}
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            background: '#f8fafc'
          }}
        >
          <img
            src={product.images[0]}
            alt={product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={() => toggleFavoriteProduct(product.id)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Heart size={16} color={isFavorited ? '#e11d48' : '#64748b'} fill={isFavorited ? '#e11d48' : 'none'} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
              {product.readyToShip && <span className="badge-rts">Ready to Ship</span>}
              {product.supplier.tradeAssurance && <span className="badge-trade-assurance">Trade Assurance</span>}
              {product.usLocalStock && <span className="badge-us-stock">US Stock</span>}
            </div>

            <Link
              to="/product/$productId"
              params={{ productId: product.id }}
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: '22px',
                marginBottom: '10px',
                display: 'block'
              }}
            >
              {product.title}
            </Link>

            {/* Price & MOQ */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                {minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`}
              </span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>/{product.unit}</span>
              <span style={{ fontSize: '12.5px', color: '#334155', fontWeight: 700, marginLeft: '16px', background: '#f1f5f9', padding: '3px 10px', borderRadius: '12px' }}>
                MOQ: {product.moq} {product.unit}s
              </span>
            </div>

            {/* Supplier Info */}
            <div style={{ fontSize: '12.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={14} color="#94a3b8" />
              <span style={{ fontWeight: 600, color: '#334155' }}>{product.supplier.name}</span>
              <span>• {product.supplier.country}</span>
              <span className="badge-verified" style={{ fontSize: '10px' }}>{product.supplier.years} YRS</span>
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <Link
              to="/product/$productId"
              params={{ productId: product.id }}
              className="btn-primary"
              style={{ padding: '9px 22px', fontSize: '13px' }}
            >
              Start Order
            </Link>

            <button
              onClick={() => startChatWithSupplier(product.supplier.id, product.id)}
              className="btn-secondary"
              style={{ padding: '9px 18px', fontSize: '13px' }}
            >
              <MessageSquare size={14} />
              <span>Contact Supplier</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout (Default)
  return (
    <div className="product-card">
      {/* Image Thumbnail Container */}
      <div className="product-card-img-wrapper">
        <Link to="/product/$productId" params={{ productId: product.id }}>
          <img src={product.images[0]} alt={product.title} />
        </Link>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavoriteProduct(product.id);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 5,
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Heart size={15} color={isFavorited ? '#e11d48' : '#64748b'} fill={isFavorited ? '#e11d48' : 'none'} />
        </button>

        {/* Quick Specs Overlay Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuickViewProduct(product);
          }}
          className="quick-view-btn"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            right: '10px',
            background: 'rgba(15, 23, 42, 0.88)',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '7px 0',
            fontSize: '11.5px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <Eye size={13} />
          <span>Quick Specs</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Badges */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {product.readyToShip && <span className="badge-rts" style={{ fontSize: '10px', padding: '2px 7px' }}>Ready to Ship</span>}
            {product.supplier.tradeAssurance && <span className="badge-trade-assurance" style={{ fontSize: '10px', padding: '2px 7px' }}>Trade Assurance</span>}
          </div>

          {/* Title */}
          <Link
            to="/product/$productId"
            params={{ productId: product.id }}
            style={{
              fontSize: '13.5px',
              fontWeight: 600,
              color: '#0f172a',
              lineHeight: '19px',
              marginBottom: '10px',
              display: 'block'
            }}
            className="line-clamp-2"
          >
            {product.title}
          </Link>

          {/* Wholesale Pricing */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '19px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
              {minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`}
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}> /{product.unit}</span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#475569', fontWeight: 600, marginTop: '2px' }}>
              Min. Order: <strong style={{ color: '#0f172a' }}>{product.moq} {product.unit}s</strong>
            </div>
          </div>
        </div>

        {/* Supplier Snippet & Action */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '10px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className="truncate" style={{ maxWidth: '140px', fontWeight: 500 }}>{product.supplier.name}</span>
            <span className="badge-verified" style={{ fontSize: '9.5px', padding: '2px 6px' }}>{product.supplier.years} YRS</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px' }}>
            <button
              onClick={() => startChatWithSupplier(product.supplier.id, product.id)}
              className="btn-secondary"
              style={{ padding: '7px 12px', fontSize: '12px', borderRadius: '10px', width: '100%' }}
            >
              <MessageSquare size={13} />
              <span>Contact</span>
            </button>

            <button
              onClick={handleQuickAdd}
              title="Add MOQ to Cart"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: '#fff5eb',
                border: '1px solid #fed7aa',
                color: '#ff6600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ff6600';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff5eb';
                e.currentTarget.style.color = '#ff6600';
              }}
            >
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
