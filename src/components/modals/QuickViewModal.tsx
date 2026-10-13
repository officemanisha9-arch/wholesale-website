import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { X, ShoppingCart, MessageSquare, Zap, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const navigate = useNavigate();
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    setContactSupplierData
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    quickViewProduct?.variants[0]?.id
  );
  const [quantity, setQuantity] = useState<number>(quickViewProduct?.moq || 10);
  const [customLogo, setCustomLogo] = useState(false);

  // Sync state when product opens
  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(quickViewProduct.moq || 10);
      setSelectedVariantId(quickViewProduct.variants[0]?.id);
      setActiveImageIndex(0);
      setCustomLogo(false);
    }
  }, [quickViewProduct?.id, quickViewProduct?.moq]);

  if (!quickViewProduct) return null;

  const currentTierPrice = (() => {
    const sorted = [...quickViewProduct.priceTiers].sort((a, b) => b.minQty - a.minQty);
    for (const t of sorted) {
      if (quantity >= t.minQty) return t.price;
    }
    return quickViewProduct.priceTiers[0]?.price || 0;
  })();

  const totalCalculated = currentTierPrice * quantity;

  // Safe pluralization
  const unitLabel = quickViewProduct.unit
    ? (quickViewProduct.unit.toLowerCase().endsWith('s') ? quickViewProduct.unit : `${quickViewProduct.unit}s`)
    : 'units';

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedVariantId, {
      customLogo,
      notes: customLogo ? 'Custom brand logo requested' : undefined
    });
    setQuickViewProduct(null);
  };

  const handleStartOrder = () => {
    addToCart(quickViewProduct, quantity, selectedVariantId, {
      customLogo,
      notes: customLogo ? 'Custom brand logo requested' : undefined
    });
    setQuickViewProduct(null);
    navigate({ to: '/checkout' });
  };

  return (
    <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          width: '880px',
          maxWidth: '94vw',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '28px',
          borderRadius: '24px',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            color: '#64748b',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#e2e8f0';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#64748b';
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="grid-cols-2-responsive" style={{ gap: '32px' }}>
          {/* Left: Product Images & Supplier Trust Box */}
          <div>
            <div
              style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#f8fafc',
                marginBottom: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '18px' }}>
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2.5px solid #ff6600' : '1.5px solid #e2e8f0',
                      padding: 0,
                      cursor: 'pointer',
                      background: '#fff',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Supplier mini badge */}
            <div
              style={{
                marginTop: '16px',
                padding: '14px 16px',
                background: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                fontSize: '12.5px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '18px' }}>{quickViewProduct.supplier.flag}</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{quickViewProduct.supplier.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', color: '#64748b', fontSize: '11.5px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="badge-verified">{quickViewProduct.supplier.years} YRS</span>
                <span>Response: <strong style={{ color: '#0f172a' }}>{quickViewProduct.supplier.responseRate}</strong></span>
                <span style={{ color: '#059669', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  🛡️ Trade Assurance
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Details, Tiered Pricing, Quantity, Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                {quickViewProduct.alibabaGuaranteed && (
                  <span className="badge-guaranteed">⭐ SourceGrid Guaranteed</span>
                )}
                {quickViewProduct.readyToShip && <span className="badge-rts">⚡ Ready to Ship</span>}
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', lineHeight: '24px', marginBottom: '14px', fontFamily: 'Outfit, sans-serif' }}>
                {quickViewProduct.title}
              </h2>

              {/* Tiered Price Table */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.max(quickViewProduct.priceTiers.length, 1)}, 1fr)`,
                  gap: '8px',
                  background: '#fff8f2',
                  border: '1.5px solid #fed7aa',
                  borderRadius: '14px',
                  padding: '12px 14px',
                  marginBottom: '18px'
                }}
              >
                {quickViewProduct.priceTiers.map((tier, idx) => {
                  const isCurrentActive = currentTierPrice === tier.price;
                  return (
                    <div
                      key={idx}
                      style={{
                        textAlign: 'center',
                        padding: '6px 4px',
                        borderRadius: '8px',
                        background: isCurrentActive ? '#ffffff' : 'transparent',
                        boxShadow: isCurrentActive ? '0 2px 6px rgba(255,102,0,0.15)' : 'none',
                        border: isCurrentActive ? '1.5px solid #ff6600' : '1.5px solid transparent',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '11px', color: isCurrentActive ? '#ff6600' : '#64748b', fontWeight: 700 }}>
                        {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} ${unitLabel}` : `≥ ${tier.minQty} ${unitLabel}`}
                      </div>
                      <div style={{ fontSize: '17px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif', marginTop: '2px' }}>
                        {formatPrice(tier.price)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Variants Selector */}
              {quickViewProduct.variants && quickViewProduct.variants.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                    Variation / Style:
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {quickViewProduct.variants.map(v => {
                      const isSelected = selectedVariantId === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariantId(v.id)}
                          style={{
                            padding: '7px 14px',
                            borderRadius: '9px',
                            border: isSelected ? '2px solid #ff6600' : '1px solid #cbd5e1',
                            background: isSelected ? '#fff7ed' : '#ffffff',
                            color: isSelected ? '#ea580c' : '#334155',
                            fontSize: '12px',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                          {v.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Picker & Subtotal */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '18px', background: '#f8fafc', padding: '14px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Quantity (Min. {quickViewProduct.moq} {unitLabel}):
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #cbd5e1', borderRadius: '8px', overflow: 'hidden', background: '#ffffff', width: '136px' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(quickViewProduct.moq, quantity - (quickViewProduct.moq >= 50 ? 50 : 10)))}
                      style={{
                        width: '38px',
                        height: '36px',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#475569',
                        background: '#f1f5f9',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={quickViewProduct.moq}
                      onChange={e => {
                        const val = parseInt(e.target.value);
                        setQuantity(isNaN(val) ? quickViewProduct.moq : val);
                      }}
                      onBlur={() => {
                        if (quantity < quickViewProduct.moq) {
                          setQuantity(quickViewProduct.moq);
                        }
                      }}
                      style={{
                        flex: 1,
                        width: '50px',
                        border: 'none',
                        outline: 'none',
                        textAlign: 'center',
                        fontWeight: 800,
                        fontSize: '14px',
                        color: '#0f172a',
                        background: 'transparent'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + (quickViewProduct.moq >= 50 ? 50 : 10))}
                      style={{
                        width: '38px',
                        height: '36px',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#475569',
                        background: '#f1f5f9',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Estimated Total
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                    {formatPrice(totalCalculated)}
                  </div>
                </div>
              </div>

              {/* Custom Logo Checkbox */}
              {quickViewProduct.customLogoMoq && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155', cursor: 'pointer', marginBottom: '18px' }}>
                  <input
                    type="checkbox"
                    checked={customLogo}
                    onChange={e => setCustomLogo(e.target.checked)}
                    style={{ accentColor: '#ff6600', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>Request Custom Logo Printing (MOQ ≥ {quickViewProduct.customLogoMoq} {unitLabel})</span>
                </label>
              )}
            </div>

            {/* Action Buttons */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <button
                  type="button"
                  onClick={handleStartOrder}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '13.5px', borderRadius: '10px' }}
                >
                  <Zap size={16} />
                  <span>Start Order (Escrow)</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '12px', fontSize: '13.5px', borderRadius: '10px' }}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setContactSupplierData({ supplier: quickViewProduct.supplier, product: quickViewProduct });
                    setQuickViewProduct(null);
                  }}
                  style={{
                    fontSize: '12.5px',
                    color: '#0f172a',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#f1f5f9',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#e2e8f0';
                    e.currentTarget.style.color = '#ff6600';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                >
                  <MessageSquare size={14} color="#ff6600" />
                  <span>Contact Supplier</span>
                </button>

                <Link
                  to="/product/$productId"
                  params={{ productId: quickViewProduct.id }}
                  onClick={() => setQuickViewProduct(null)}
                  style={{
                    fontSize: '12.5px',
                    color: '#2563eb',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Full Specifications</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
