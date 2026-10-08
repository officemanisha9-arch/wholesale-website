import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { X, ShieldCheck, ShoppingCart, MessageSquare, Check, Truck, Zap, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const navigate = useNavigate();
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    startChatWithSupplier,
    setContactSupplierData
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    quickViewProduct?.variants[0]?.id
  );
  const [quantity, setQuantity] = useState(quickViewProduct?.moq || 10);
  const [customLogo, setCustomLogo] = useState(false);

  if (!quickViewProduct) return null;

  const currentTierPrice = (() => {
    const sorted = [...quickViewProduct.priceTiers].sort((a, b) => b.minQty - a.minQty);
    for (const t of sorted) {
      if (quantity >= t.minQty) return t.price;
    }
    return quickViewProduct.priceTiers[0]?.price || 0;
  })();

  const totalCalculated = currentTierPrice * quantity;

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
        style={{ width: '860px', padding: '28px', overflow: 'hidden', borderRadius: '22px' }}
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
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
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
        >
          <X size={18} />
        </button>

        <div className="grid-cols-2-responsive" style={{ gap: '32px' }}>
          {/* Left Images Gallery */}
          <div>
            <div
              style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#f8fafc',
                marginBottom: '14px',
                border: '1px solid #e2e8f0'
              }}
            >
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid #ff6600' : '1px solid #e2e8f0',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>

            {/* Supplier mini badge */}
            <div
              style={{
                marginTop: '20px',
                padding: '14px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '12.5px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px' }}>{quickViewProduct.supplier.flag}</span>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{quickViewProduct.supplier.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', color: '#64748b', fontSize: '11.5px', flexWrap: 'wrap' }}>
                <span className="badge-verified">{quickViewProduct.supplier.years} YRS</span>
                <span>Response: {quickViewProduct.supplier.responseRate}</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>🛡️ Trade Assurance</span>
              </div>
            </div>
          </div>

          {/* Right Product Details & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Badges */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                {quickViewProduct.alibabaGuaranteed && (
                  <span className="badge-guaranteed">⭐ Alibaba Guaranteed</span>
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
                  gridTemplateColumns: `repeat(${quickViewProduct.priceTiers.length}, 1fr)`,
                  gap: '8px',
                  background: '#fff8f2',
                  border: '1.5px solid #fed7aa',
                  borderRadius: '12px',
                  padding: '12px',
                  marginBottom: '16px'
                }}
              >
                {quickViewProduct.priceTiers.map((tier, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                      {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} ${quickViewProduct.unit}` : `≥ ${tier.minQty} ${quickViewProduct.unit}`}
                    </div>
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                      {formatPrice(tier.price)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Variants Selector */}
              {quickViewProduct.variants.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
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
                            padding: '6px 14px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid #ff6600' : '1px solid #cbd5e1',
                            background: isSelected ? '#fff5eb' : '#fff',
                            color: isSelected ? '#ff6600' : '#334155',
                            fontSize: '12px',
                            fontWeight: isSelected ? 700 : 500
                          }}
                        >
                          {v.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Picker */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    Quantity (Min. {quickViewProduct.moq} {quickViewProduct.unit}s):
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #cbd5e1', borderRadius: '8px', width: '130px', overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(quickViewProduct.moq, quantity - 10))}
                      style={{ width: '36px', height: '34px', fontSize: '16px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={quickViewProduct.moq}
                      onChange={e => setQuantity(Math.max(quickViewProduct.moq, parseInt(e.target.value) || quickViewProduct.moq))}
                      style={{
                        flex: 1,
                        border: 'none',
                        outline: 'none',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '13.5px',
                        color: '#0f172a'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 10)}
                      style={{ width: '36px', height: '34px', fontSize: '16px', fontWeight: 700, color: '#475569', background: '#f8fafc' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '11.5px', color: '#64748b' }}>Subtotal:</div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                    {formatPrice(totalCalculated)}
                  </div>
                </div>
              </div>

              {/* Custom Logo Checkbox */}
              {quickViewProduct.customLogoMoq && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#334155', cursor: 'pointer', marginBottom: '16px' }}>
                  <input
                    type="checkbox"
                    checked={customLogo}
                    onChange={e => setCustomLogo(e.target.checked)}
                    style={{ accentColor: '#ff6600', width: '15px', height: '15px' }}
                  />
                  <span>Request Custom Logo Printing (MOQ ≥ {quickViewProduct.customLogoMoq})</span>
                </label>
              )}
            </div>

            {/* Action Buttons */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <button
                  type="button"
                  onClick={handleStartOrder}
                  className="btn-primary"
                  style={{ width: '100%', padding: '11px', fontSize: '13.5px', borderRadius: '10px' }}
                >
                  <Zap size={16} />
                  <span>Start Order (Escrow)</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '11px', fontSize: '13.5px', borderRadius: '10px' }}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setContactSupplierData({ supplier: quickViewProduct.supplier, product: quickViewProduct });
                    setQuickViewProduct(null);
                  }}
                  style={{ fontSize: '12px', color: '#ff6600', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <MessageSquare size={13} />
                  <span>Contact Supplier</span>
                </button>

                <Link
                  to="/product/$productId"
                  params={{ productId: quickViewProduct.id }}
                  onClick={() => setQuickViewProduct(null)}
                  style={{ fontSize: '12px', color: '#2563eb', fontWeight: 700 }}
                >
                  Full Specifications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
