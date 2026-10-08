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
        style={{ width: '840px', padding: '24px', overflow: 'hidden' }}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            color: '#666',
            background: '#f3f4f6',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        <div className="grid-cols-2-responsive" style={{ gap: '28px' }}>
          {/* Left Images Gallery */}
          <div>
            <div
              style={{
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#f8fafc',
                marginBottom: '12px'
              }}
            >
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid #ff6a00' : '1px solid #e5e7eb',
                    padding: 0
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
                padding: '12px',
                background: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span>{quickViewProduct.supplier.flag}</span>
                <span style={{ fontWeight: 700, color: '#111' }}>{quickViewProduct.supplier.name}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', color: '#666', fontSize: '11px' }}>
                <span className="badge-verified">{quickViewProduct.supplier.years} YRS</span>
                <span>Response: {quickViewProduct.supplier.responseRate}</span>
                <span style={{ color: '#0d824d', fontWeight: 600 }}>🛡️ Trade Assurance</span>
              </div>
            </div>
          </div>

          {/* Right Product Details & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Badges */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                {quickViewProduct.alibabaGuaranteed && (
                  <span className="badge-guaranteed">⭐ Alibaba Guaranteed</span>
                )}
                {quickViewProduct.readyToShip && <span className="badge-rts">⚡ Ready to Ship</span>}
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#111', lineHeight: '22px', marginBottom: '14px' }}>
                {quickViewProduct.title}
              </h2>

              {/* Tiered Price Table */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${quickViewProduct.priceTiers.length}, 1fr)`,
                  gap: '8px',
                  background: '#fff8f2',
                  border: '1px solid #fed7aa',
                  borderRadius: '8px',
                  padding: '10px',
                  marginBottom: '16px'
                }}
              >
                {quickViewProduct.priceTiers.map((tier, idx) => (
                  <div key={idx} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} ${quickViewProduct.unit}` : `≥ ${tier.minQty} ${quickViewProduct.unit}`}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#ff6a00' }}>
                      {formatPrice(tier.price)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Variants Selector */}
              {quickViewProduct.variants.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
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
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: isSelected ? '1.5px solid #ff6a00' : '1px solid #d1d5db',
                            background: isSelected ? '#fff3e8' : '#fff',
                            color: isSelected ? '#ff6a00' : '#333',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                    Quantity (Min. {quickViewProduct.moq} {quickViewProduct.unit}):
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', width: '130px' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(quickViewProduct.moq, quantity - 10))}
                      style={{ width: '36px', height: '34px', fontSize: '16px', fontWeight: 700, color: '#555' }}
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
                        fontSize: '14px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 10)}
                      style={{ width: '36px', height: '34px', fontSize: '16px', fontWeight: 700, color: '#555' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#666' }}>Subtotal:</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#ff6a00' }}>
                    {formatPrice(totalCalculated)}
                  </div>
                </div>
              </div>

              {/* Custom Logo Checkbox */}
              {quickViewProduct.customLogoMoq && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#333', cursor: 'pointer', marginBottom: '16px' }}>
                  <input
                    type="checkbox"
                    checked={customLogo}
                    onChange={e => setCustomLogo(e.target.checked)}
                    style={{ accentColor: '#ff6a00', width: '15px', height: '15px' }}
                  />
                  <span>Request Custom Logo Engraving / Printing (MOQ ≥ {quickViewProduct.customLogoMoq})</span>
                </label>
              )}
            </div>

            {/* Action Buttons */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <button
                  type="button"
                  onClick={handleStartOrder}
                  className="btn-primary"
                  style={{ width: '100%', padding: '10px', fontSize: '14px' }}
                >
                  <Zap size={16} />
                  <span>Start Order (Trade Assurance)</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '10px', fontSize: '14px' }}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Wholesale Cart</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={() => {
                    setContactSupplierData({ supplier: quickViewProduct.supplier, product: quickViewProduct });
                    setQuickViewProduct(null);
                  }}
                  style={{ fontSize: '12px', color: '#ff6a00', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <MessageSquare size={13} />
                  <span>Contact Supplier for Custom Quotation</span>
                </button>

                <Link
                  to="/product/$productId"
                  params={{ productId: quickViewProduct.id }}
                  onClick={() => setQuickViewProduct(null)}
                  style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}
                >
                  Full Product Specifications →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
