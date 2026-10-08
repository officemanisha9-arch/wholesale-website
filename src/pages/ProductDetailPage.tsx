import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from '@tanstack/react-router';
import {
  ShieldCheck,
  Truck,
  Heart,
  MessageSquare,
  ShoppingCart,
  Zap,
  CheckCircle2,
  Award,
  Globe,
  Star,
  ChevronRight,
  Send,
  Building2,
  Clock,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import { Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const params = (useParams({ strict: false }) || {}) as any;
  const navigate = useNavigate();
  const productId = params.productId || 'prod-1';

  const {
    formatPrice,
    addToCart,
    isProductFavorited,
    toggleFavoriteProduct,
    startChatWithSupplier,
    setContactSupplierData,
    country,
    showToast
  } = useApp();

  const product: Product = PRODUCTS.find((p: Product) => p.id === productId) || PRODUCTS[0];
  const isFavorited = isProductFavorited(product.id);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Variant state
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );

  // Customization state
  const [customLogo, setCustomLogo] = useState(false);
  const [customPackaging, setCustomPackaging] = useState(false);
  const [customNotes, setCustomNotes] = useState('');

  // Quantity state
  const [quantity, setQuantity] = useState(product.moq);

  // Shipping method state
  const [shippingMethod, setShippingMethod] = useState<'air_express' | 'sea_freight_ddp' | 'standard'>('air_express');

  // Active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'company' | 'reviews' | 'faqs'>('overview');

  // Tiered price calculation
  const currentTierPrice = useMemo(() => {
    const sorted = [...product.priceTiers].sort((a, b) => b.minQty - a.minQty);
    for (const t of sorted) {
      if (quantity >= t.minQty) return t.price;
    }
    return product.priceTiers[0]?.price || 0;
  }, [product, quantity]);

  const itemsSubtotal = currentTierPrice * quantity;

  // Shipping cost calculation
  const calculatedShippingCost = useMemo(() => {
    let baseRate = 0.8;
    if (shippingMethod === 'sea_freight_ddp') baseRate = 0.3;
    if (shippingMethod === 'standard') baseRate = 0.55;
    return Math.max(25, quantity * baseRate);
  }, [quantity, shippingMethod]);

  const estimatedDeliveryDays = shippingMethod === 'air_express' ? 5 : shippingMethod === 'standard' ? 12 : 25;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariantId, {
      customLogo,
      customPackaging,
      notes: customNotes || undefined
    });
  };

  const handleStartOrder = () => {
    addToCart(product, quantity, selectedVariantId, {
      customLogo,
      customPackaging,
      notes: customNotes || undefined
    });
    navigate({ to: '/checkout' });
  };

  const handleRequestSample = () => {
    addToCart(product, 1, selectedVariantId, {
      notes: 'Official wholesale evaluation sample request'
    });
    showToast('Sample Added to Cart', `Wholesale sample for ${product.title.substring(0, 30)}... added at sample price.`, 'success');
  };

  const relatedProducts = PRODUCTS.filter((p: Product) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 4);

  return (
    <div style={{ padding: '24px 0 64px 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#64748b', marginBottom: '20px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#64748b', fontWeight: 500 }}>Home</Link>
          <ChevronRight size={13} />
          <Link to="/products" style={{ color: '#64748b', fontWeight: 500 }}>Showroom</Link>
          <ChevronRight size={13} />
          <Link to="/products" search={{ category: product.categoryId } as any} style={{ color: '#64748b', fontWeight: 500 }}>
            {product.categoryName}
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: '#0f172a', fontWeight: 600 }} className="truncate">
            {product.title}
          </span>
        </div>

        {/* TOP MAIN SECTION (Gallery + Product Configurator + Supplier Sidebar) */}
        <div
          className="pdp-main-grid"
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            padding: '28px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* 1. LEFT GALLERY */}
          <div>
            {/* Main Stage Image */}
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#f8fafc',
                position: 'relative',
                marginBottom: '16px',
                border: '1px solid #e2e8f0'
              }}
            >
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Badges Over Image */}
              <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {product.alibabaGuaranteed && (
                  <span className="badge-guaranteed">⭐ Alibaba Guaranteed</span>
                )}
                {product.readyToShip && <span className="badge-rts">⚡ Ready to Ship</span>}
                {product.usLocalStock && <span className="badge-us-stock">🇺🇸 US Local Stock</span>}
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavoriteProduct(product.id)}
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  zIndex: 2,
                  transition: 'transform 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Heart size={18} color={isFavorited ? '#e11d48' : '#64748b'} fill={isFavorited ? '#e11d48' : 'none'} />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: selectedImageIndex === idx ? '2px solid #ff6600' : '1px solid #e2e8f0',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* 2. MIDDLE PRODUCT DETAILS & CONFIGURATOR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Title */}
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: '30px', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
                {product.title}
              </h1>

              {/* Rating & Transaction Stats */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12.5px', color: '#64748b', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700 }}>
                  <Star size={14} fill="#f59e0b" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span style={{ color: '#2563eb', fontWeight: 600 }}>{product.reviewsCount} verified reviews</span>
                <span>•</span>
                <span>{product.ordersCount.toLocaleString()} {product.unit}s exported</span>
              </div>
            </div>

            {/* Tiered Price Table */}
            <div
              style={{
                background: 'linear-gradient(135deg, #fffbf7 0%, #fff7ed 100%)',
                border: '1.5px solid #fed7aa',
                borderRadius: '14px',
                padding: '16px 20px'
              }}
            >
              <div style={{ fontSize: '11px', color: '#9a3412', fontWeight: 800, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Volume Tier Pricing (USD):
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${product.priceTiers.length}, 1fr)`,
                  gap: '12px'
                }}
              >
                {product.priceTiers.map((tier: any, idx: number) => {
                  const isCurrentActive = quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty);
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '10px',
                        background: isCurrentActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                        borderRadius: '10px',
                        border: isCurrentActive ? '2px solid #ff6600' : '1px solid transparent',
                        boxShadow: isCurrentActive ? '0 4px 12px rgba(255, 102, 0, 0.15)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>
                        {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} ${product.unit}` : `≥ ${tier.minQty} ${product.unit}`}
                      </div>
                      <div style={{ fontSize: '19px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                        {formatPrice(tier.price)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants.length > 0 && (
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                  Select Variations / Style:
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.variants.map((v: any) => {
                    const isSelected = selectedVariantId === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid #ff6600' : '1px solid #cbd5e1',
                          background: isSelected ? '#fff5eb' : '#ffffff',
                          color: isSelected ? '#ff6600' : '#334155',
                          fontSize: '12.5px',
                          fontWeight: isSelected ? 700 : 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {v.color && (
                          <span
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              background: v.color,
                              border: '1px solid #cbd5e1'
                            }}
                          />
                        )}
                        <span>{v.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Customization Options */}
            <div style={{ background: '#f8fafc', padding: '14px 18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                Factory Customization Capabilities:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                {product.customLogoMoq && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={customLogo}
                      onChange={e => setCustomLogo(e.target.checked)}
                      style={{ accentColor: '#ff6600', width: '15px', height: '15px' }}
                    />
                    <span>Custom Logo Engraving / Silk Screen (MOQ ≥ {product.customLogoMoq} {product.unit}s)</span>
                  </label>
                )}
                {product.customPackagingMoq && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={customPackaging}
                      onChange={e => setCustomPackaging(e.target.checked)}
                      style={{ accentColor: '#ff6600', width: '15px', height: '15px' }}
                    />
                    <span>Custom Retail Gift Packaging (MOQ ≥ {product.customPackagingMoq} {product.unit}s)</span>
                  </label>
                )}
              </div>
            </div>

            {/* Quantity Picker & Live Volume Subtotal */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Order Quantity (Min. {product.moq} {product.unit}s):
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '10px', width: '150px', background: '#fff', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(product.moq, quantity - 10))}
                    style={{ width: '42px', height: '38px', fontSize: '18px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min={product.moq}
                    onChange={e => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                    style={{ flex: 1, border: 'none', outline: 'none', textAlign: 'center', fontWeight: 700, fontSize: '14px', color: '#0f172a' }}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 10)}
                    style={{ width: '42px', height: '38px', fontSize: '18px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>Order Subtotal:</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                  {formatPrice(itemsSubtotal)}
                </div>
                <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700 }}>
                  ({formatPrice(currentTierPrice)} / {product.unit})
                </div>
              </div>
            </div>

            {/* Shipping Method Calculator */}
            <div style={{ fontSize: '12.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>
                  Shipping to <strong style={{ color: '#0f172a' }}>{country.name} ({country.flag})</strong>:
                </span>
                <span style={{ fontWeight: 700, color: '#0f172a' }}>
                  {formatPrice(calculatedShippingCost)} ({estimatedDeliveryDays} days)
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShippingMethod('air_express')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: shippingMethod === 'air_express' ? '1.5px solid #ff6600' : '1px solid #cbd5e1',
                    background: shippingMethod === 'air_express' ? '#fff5eb' : '#fff',
                    color: shippingMethod === 'air_express' ? '#ff6600' : '#475569',
                    fontSize: '11.5px',
                    fontWeight: 700
                  }}
                >
                  ✈️ Air Express (5 Days)
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod('standard')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: shippingMethod === 'standard' ? '1.5px solid #ff6600' : '1px solid #cbd5e1',
                    background: shippingMethod === 'standard' ? '#fff5eb' : '#fff',
                    color: shippingMethod === 'standard' ? '#ff6600' : '#475569',
                    fontSize: '11.5px',
                    fontWeight: 700
                  }}
                >
                  📦 Standard (12 Days)
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod('sea_freight_ddp')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    border: shippingMethod === 'sea_freight_ddp' ? '1.5px solid #ff6600' : '1px solid #cbd5e1',
                    background: shippingMethod === 'sea_freight_ddp' ? '#fff5eb' : '#fff',
                    color: shippingMethod === 'sea_freight_ddp' ? '#ff6600' : '#475569',
                    fontSize: '11.5px',
                    fontWeight: 700
                  }}
                >
                  🚢 Sea DDP (25 Days)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
                <button
                  type="button"
                  onClick={handleStartOrder}
                  className="btn-primary"
                  style={{ padding: '13px', fontSize: '14.5px', borderRadius: '12px' }}
                >
                  <Zap size={18} />
                  <span>Start Order (Escrow)</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-secondary"
                  style={{ padding: '13px', fontSize: '14px', borderRadius: '12px' }}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Wholesale Cart</span>
                </button>
              </div>

              {/* Sample button */}
              <button
                type="button"
                onClick={handleRequestSample}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  padding: '9px',
                  borderRadius: '10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#ff6600'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#cbd5e1'}
              >
                <span>Request Paid Evaluation Sample ({formatPrice(product.samplePrice)} / pc)</span>
              </button>
            </div>
          </div>

          {/* 3. RIGHT SUPPLIER SIDEBAR */}
          <div
            className="pdp-supplier-col"
            style={{
              background: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Supplier Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <img
                  src={product.supplier.avatar}
                  alt={product.supplier.name}
                  style={{ width: '46px', height: '46px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }}>
                    {product.supplier.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                    <span>{product.supplier.flag}</span>
                    <span>{product.supplier.city}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <span className="badge-verified">{product.supplier.years} YRS Verified</span>
                <span className="badge-trade-assurance">Trade Assurance</span>
              </div>

              {/* Factory Credentials List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#475569', marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Response Rate:</span>
                  <span style={{ fontWeight: 800, color: '#059669' }}>{product.supplier.responseRate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Response Time:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.supplier.responseTime}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Floor Space:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.supplier.floorSpace}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Employees:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.supplier.employees}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Annual Export:</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{product.supplier.annualOutput}</span>
                </div>
              </div>

              {/* Certifications Badges */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Audited Certifications:
                </div>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {product.supplier.certifications.map((cert: string, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        background: '#eff6ff',
                        color: '#1d4ed8',
                        border: '1px solid #bfdbfe',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons for Supplier */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => startChatWithSupplier(product.supplierId, product.id, `Inquiring about ${product.title}`)}
                className="btn-primary"
                style={{ width: '100%', padding: '10px 0', fontSize: '13px', borderRadius: '10px' }}
              >
                <MessageSquare size={14} />
                <span>Chat with Supplier</span>
              </button>
              <button
                onClick={() => setContactSupplierData({ supplier: product.supplier, product })}
                className="btn-secondary"
                style={{ width: '100%', padding: '10px 0', fontSize: '13px', borderRadius: '10px' }}
              >
                <Send size={14} />
                <span>Send Inquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM TABS SECTION (Specs, Company Profile, Reviews, FAQs) */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            marginBottom: '40px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid #e2e8f0',
              background: '#f8fafc',
              padding: '0 20px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {[
              { id: 'overview', label: 'Product Overview & Highlights' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'company', label: 'Audited Factory Profile' },
              { id: 'reviews', label: `Buyer Reviews (${product.reviews.length})` },
              { id: 'faqs', label: 'Wholesale Trade FAQs' }
            ].map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '16px 22px',
                    fontSize: '13.5px',
                    fontWeight: isSelected ? 800 : 600,
                    color: isSelected ? '#ff6600' : '#64748b',
                    borderBottom: isSelected ? '3px solid #ff6600' : '3px solid transparent',
                    background: 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Body */}
          <div style={{ padding: '36px' }}>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>
                  Product Description &amp; Build Quality
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: '24px', marginBottom: '24px' }}>
                  {product.description}
                </p>

                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
                  Key Engineering Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {product.features.map((feat: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13.5px', color: '#334155' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                  Packaging &amp; Master Carton Dimensions
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', background: '#f8fafc', padding: '14px 18px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  {product.packagingDetails}
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}>
                  Technical Specifications Table
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                  <tbody>
                    {product.specifications.map((spec: any, idx: number) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: '1px solid #e2e8f0',
                          background: idx % 2 === 0 ? '#f8fafc' : '#ffffff'
                        }}
                      >
                        <td style={{ padding: '12px 20px', fontWeight: 700, color: '#0f172a', width: '32%' }}>
                          {spec.label}
                        </td>
                        <td style={{ padding: '12px 20px', color: '#475569' }}>
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'company' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '12px', fontFamily: 'Outfit, sans-serif' }}>
                      {product.supplier.name}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '23px', marginBottom: '20px' }}>
                      Located in {product.supplier.city}, our plant has specialized in export manufacturing for {product.supplier.years} years. Equipped with high-speed automated production lines, clean rooms, and comprehensive pre-shipment quality assurance stations.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => startChatWithSupplier(product.supplierId, product.id)}
                        className="btn-primary"
                        style={{ padding: '10px 22px', fontSize: '13px' }}
                      >
                        Request Virtual Factory Audit
                      </button>
                    </div>
                  </div>

                  <div style={{ borderRadius: '16px', overflow: 'hidden', height: '260px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                    <img
                      src={product.supplier.bannerImage}
                      alt="Factory"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '18px', fontFamily: 'Outfit, sans-serif' }}>
                  Verified Buyer Reviews &amp; Feedback
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {product.reviews.map((rev: any) => (
                    <div
                      key={rev.id}
                      style={{
                        padding: '20px',
                        background: '#f8fafc',
                        borderRadius: '14px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '18px' }}>{rev.countryFlag}</span>
                          <span style={{ fontWeight: 800, color: '#0f172a' }}>{rev.author}</span>
                          <span style={{ fontSize: '11px', color: '#059669', background: '#ecfdf5', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, border: '1px solid #a7f3d0' }}>
                            Verified Purchase
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{rev.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '3px', marginBottom: '8px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <p style={{ fontSize: '13.5px', color: '#334155', lineHeight: '21px' }}>
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '18px', fontFamily: 'Outfit, sans-serif' }}>
                  Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>
                      Q: What is the sample lead time and refund policy?
                    </div>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '20px' }}>
                      A: Samples are dispatched within {product.sampleLeadTimeDays} business days via DHL / FedEx. The sample fee is 100% credited back to your account upon placing a mass production order of ≥ 500 pieces.
                    </div>
                  </div>

                  <div style={{ padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 800, fontSize: '14px', color: '#0f172a', marginBottom: '6px' }}>
                      Q: How does Alibaba Trade Assurance protect my payment?
                    </div>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '20px' }}>
                      A: Payments are held safely in escrow by Citibank/Alibaba until you confirm receipt of goods and quality verification. If delivery is delayed or goods do not match specs, you are eligible for a 100% refund.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '18px', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
              Similar Products from Verified Factories
            </h3>
            <div className="grid-cols-4-responsive">
              {relatedProducts.map((rel: Product) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
