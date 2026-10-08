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
  Send
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
    <div style={{ padding: '20px 0 60px 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#666', marginBottom: '16px' }}>
          <Link to="/" style={{ color: '#555' }}>Home</Link>
          <ChevronRight size={12} />
          <Link to="/products" style={{ color: '#555' }}>Showroom</Link>
          <ChevronRight size={12} />
          <Link to="/products" search={{ category: product.categoryId } as any} style={{ color: '#555' }}>
            {product.categoryName}
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: '#111', fontWeight: 600 }} className="truncate">
            {product.title}
          </span>
        </div>

        {/* TOP MAIN SECTION (Gallery + Product Configurator + Supplier Sidebar) */}
        <div
          className="pdp-main-grid"
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            padding: '24px',
            marginBottom: '32px',
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
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#f8fafc',
                position: 'relative',
                marginBottom: '14px',
                border: '1px solid #e5e7eb'
              }}
            >
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Badges Over Image */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 2
                }}
              >
                <Heart size={18} color={isFavorited ? '#e11d48' : '#666'} fill={isFavorited ? '#e11d48' : 'none'} />
              </button>
            </div>

            {/* Thumbnails Row */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: selectedImageIndex === idx ? '2px solid #ff6a00' : '1px solid #e5e7eb',
                    padding: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* 2. MIDDLE PRODUCT DETAILS & CONFIGURATOR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Title */}
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#111', lineHeight: '28px', marginBottom: '8px' }}>
                {product.title}
              </h1>

              {/* Rating & Transaction Stats */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#666' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ff9900', fontWeight: 700 }}>
                  <Star size={14} fill="#ff9900" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <span style={{ color: '#2563eb', fontWeight: 600 }}>{product.reviewsCount} verified reviews</span>
                <span>•</span>
                <span>{product.ordersCount.toLocaleString()} {product.unit} exported</span>
              </div>
            </div>

            {/* Tiered Price Table */}
            <div
              style={{
                background: '#fff8f2',
                border: '1.5px solid #fed7aa',
                borderRadius: '10px',
                padding: '14px 18px'
              }}
            >
              <div style={{ fontSize: '11px', color: '#8d4e1d', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' }}>
                Wholesale Tier Pricing:
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
                        padding: '8px',
                        background: isCurrentActive ? '#ffffff' : 'transparent',
                        borderRadius: '6px',
                        border: isCurrentActive ? '1.5px solid #ff6a00' : '1px solid transparent'
                      }}
                    >
                      <div style={{ fontSize: '12px', color: '#666', fontWeight: 500 }}>
                        {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} ${product.unit}` : `≥ ${tier.minQty} ${product.unit}`}
                      </div>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#ff6a00' }}>
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
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '8px' }}>
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
                          padding: '7px 14px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #ff6a00' : '1px solid #d1d5db',
                          background: isSelected ? '#fff3e8' : '#ffffff',
                          color: isSelected ? '#ff6a00' : '#333',
                          fontSize: '12px',
                          fontWeight: isSelected ? 700 : 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {v.color && (
                          <span
                            style={{
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              background: v.color,
                              border: '1px solid #ddd'
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
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
                Customization Options Available:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                {product.customLogoMoq && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={customLogo}
                      onChange={e => setCustomLogo(e.target.checked)}
                      style={{ accentColor: '#ff6a00' }}
                    />
                    <span>Custom Logo Engraving / Silk Screen (MOQ ≥ {product.customLogoMoq} {product.unit})</span>
                  </label>
                )}
                {product.customPackagingMoq && (
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={customPackaging}
                      onChange={e => setCustomPackaging(e.target.checked)}
                      style={{ accentColor: '#ff6a00' }}
                    />
                    <span>Custom Retail Gift Packaging (MOQ ≥ {product.customPackagingMoq} {product.unit})</span>
                  </label>
                )}
              </div>
            </div>

            {/* Quantity Picker & Live Volume Subtotal */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Order Quantity (Min. {product.moq} {product.unit}):
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', width: '140px' }}>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(product.moq, quantity - 10))}
                    style={{ width: '40px', height: '36px', fontSize: '18px', fontWeight: 700, color: '#555' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min={product.moq}
                    onChange={e => setQuantity(Math.max(product.moq, parseInt(e.target.value) || product.moq))}
                    style={{ flex: 1, border: 'none', outline: 'none', textAlign: 'center', fontWeight: 700, fontSize: '14px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 10)}
                    style={{ width: '40px', height: '36px', fontSize: '18px', fontWeight: 700, color: '#555' }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#666' }}>Order Subtotal:</div>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#ff6a00' }}>
                  {formatPrice(itemsSubtotal)}
                </div>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>
                  ({formatPrice(currentTierPrice)} / {product.unit})
                </div>
              </div>
            </div>

            {/* Shipping Method Calculator */}
            <div style={{ fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#666' }}>
                  Shipping to <strong style={{ color: '#111' }}>{country.name} ({country.flag})</strong>:
                </span>
                <span style={{ fontWeight: 700, color: '#111' }}>
                  {formatPrice(calculatedShippingCost)} ({estimatedDeliveryDays} days)
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShippingMethod('air_express')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '6px',
                    border: shippingMethod === 'air_express' ? '1.5px solid #ff6a00' : '1px solid #d1d5db',
                    background: shippingMethod === 'air_express' ? '#fff3e8' : '#fff',
                    color: shippingMethod === 'air_express' ? '#ff6a00' : '#4b5563',
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  ✈️ Air Express (5 Days)
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod('standard')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '6px',
                    border: shippingMethod === 'standard' ? '1.5px solid #ff6a00' : '1px solid #d1d5db',
                    background: shippingMethod === 'standard' ? '#fff3e8' : '#fff',
                    color: shippingMethod === 'standard' ? '#ff6a00' : '#4b5563',
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  📦 Standard (12 Days)
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod('sea_freight_ddp')}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: '6px',
                    border: shippingMethod === 'sea_freight_ddp' ? '1.5px solid #ff6a00' : '1px solid #d1d5db',
                    background: shippingMethod === 'sea_freight_ddp' ? '#fff3e8' : '#fff',
                    color: shippingMethod === 'sea_freight_ddp' ? '#ff6a00' : '#4b5563',
                    fontSize: '11px',
                    fontWeight: 600
                  }}
                >
                  🚢 Sea DDP (25 Days)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleStartOrder}
                  className="btn-primary"
                  style={{ padding: '12px', fontSize: '15px' }}
                >
                  <Zap size={18} />
                  <span>Start Order (Trade Assurance)</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-secondary"
                  style={{ padding: '12px', fontSize: '14px' }}
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
                  padding: '8px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>Request Paid Evaluation Sample ({formatPrice(product.samplePrice)} / pc)</span>
              </button>
            </div>
          </div>

          {/* 3. RIGHT SUPPLIER SIDEBAR */}
          <div
            className="pdp-supplier-col"
            style={{
              background: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Supplier Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <img
                  src={product.supplier.avatar}
                  alt={product.supplier.name}
                  style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>
                    {product.supplier.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{product.supplier.flag}</span>
                    <span>{product.supplier.city}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span className="badge-verified">{product.supplier.years} YRS Verified</span>
                <span className="badge-trade-assurance">Trade Assurance</span>
              </div>

              {/* Factory Credentials List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#555', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Response Rate:</span>
                  <span style={{ fontWeight: 700, color: '#059669' }}>{product.supplier.responseRate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Response Time:</span>
                  <span style={{ fontWeight: 600, color: '#111' }}>{product.supplier.responseTime}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Floor Space:</span>
                  <span style={{ fontWeight: 600, color: '#111' }}>{product.supplier.floorSpace}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Employees:</span>
                  <span style={{ fontWeight: 600, color: '#111' }}>{product.supplier.employees}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666' }}>Annual Export:</span>
                  <span style={{ fontWeight: 600, color: '#111' }}>{product.supplier.annualOutput}</span>
                </div>
              </div>

              {/* Certifications Badges */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
                  Audited Certifications:
                </div>
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {product.supplier.certifications.map((cert: string, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        background: '#e0f2fe',
                        color: '#0369a1',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px'
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
                style={{ width: '100%', padding: '9px 0', fontSize: '13px' }}
              >
                <MessageSquare size={14} />
                <span>Chat with Supplier</span>
              </button>
              <button
                onClick={() => setContactSupplierData({ supplier: product.supplier, product })}
                className="btn-secondary"
                style={{ width: '100%', padding: '9px 0', fontSize: '13px' }}
              >
                <Send size={14} />
                <span>Send Custom Inquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM TABS SECTION (Specs, Company Profile, Reviews, FAQs) */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Tab Navigation */}
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid #e5e7eb',
              background: '#f8fafc',
              padding: '0 16px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {[
              { id: 'overview', label: 'Product Overview & Features' },
              { id: 'specs', label: 'Detailed Technical Specifications' },
              { id: 'company', label: 'Verified Factory Profile & Video' },
              { id: 'reviews', label: `Buyer Reviews (${product.reviews.length})` },
              { id: 'faqs', label: 'Wholesale FAQs' }
            ].map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '16px 20px',
                    fontSize: '14px',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#ff6a00' : '#555',
                    borderBottom: isSelected ? '3px solid #ff6a00' : '3px solid transparent',
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
          <div style={{ padding: '32px' }}>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
                  Product Description
                </h3>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '24px', marginBottom: '24px' }}>
                  {product.description}
                </p>

                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '12px' }}>
                  Key Engineering Highlights
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                  {product.features.map((feat: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#333' }}>
                      <CheckCircle2 size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
                  Packaging &amp; Master Carton Dimensions
                </h4>
                <p style={{ fontSize: '13px', color: '#555', background: '#f9fafb', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  {product.packagingDetails}
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>
                  Technical Specifications Table
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <tbody>
                    {product.specifications.map((spec: any, idx: number) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: '1px solid #e5e7eb',
                          background: idx % 2 === 0 ? '#f9fafb' : '#ffffff'
                        }}
                      >
                        <td style={{ padding: '12px 18px', fontWeight: 700, color: '#333', width: '30%' }}>
                          {spec.label}
                        </td>
                        <td style={{ padding: '12px 18px', color: '#555' }}>
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '12px' }}>
                      {product.supplier.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: '22px', marginBottom: '16px' }}>
                      Located in {product.supplier.city}, our super-plant has specialized in export manufacturing for {product.supplier.years} years. Equipped with high-speed automated production lines, clean rooms, and comprehensive pre-shipment quality assurance stations.
                    </p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => startChatWithSupplier(product.supplierId, product.id)}
                        className="btn-primary"
                        style={{ padding: '8px 20px', fontSize: '13px' }}
                      >
                        Request Live Virtual Factory Audit
                      </button>
                    </div>
                  </div>

                  <div style={{ borderRadius: '12px', overflow: 'hidden', height: '240px', border: '1px solid #e5e7eb' }}>
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
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>
                  Verified Buyer Reviews &amp; Feedback
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {product.reviews.map((rev: any) => (
                    <div
                      key={rev.id}
                      style={{
                        padding: '18px',
                        background: '#f9fafb',
                        borderRadius: '10px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '16px' }}>{rev.countryFlag}</span>
                          <span style={{ fontWeight: 700, color: '#111' }}>{rev.author}</span>
                          <span style={{ fontSize: '11px', color: '#059669', background: '#ecfdf5', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                            Verified Purchase
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#888' }}>{rev.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#ff9900" color="#ff9900" />
                        ))}
                      </div>
                      <p style={{ fontSize: '13px', color: '#333', lineHeight: '20px' }}>
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>
                  Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ padding: '14px', background: '#f9fafb', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#111', marginBottom: '4px' }}>
                      Q: What is the sample lead time and refund policy?
                    </div>
                    <div style={{ fontSize: '13px', color: '#555' }}>
                      A: Samples are dispatched within {product.sampleLeadTimeDays} business days via DHL / FedEx. The sample fee is 100% credited back to your account upon placing a mass production order of ≥ 500 pieces.
                    </div>
                  </div>

                  <div style={{ padding: '14px', background: '#f9fafb', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#111', marginBottom: '4px' }}>
                      Q: How does Alibaba Trade Assurance protect my payment?
                    </div>
                    <div style={{ fontSize: '13px', color: '#555' }}>
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
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}>
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
