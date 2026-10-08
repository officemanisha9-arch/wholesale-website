import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  ShoppingCart,
  Trash2,
  ShieldCheck,
  Building2,
  Truck,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Lock,
  ChevronRight,
  Package
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartSupplierGroups,
    cartCount,
    cartTotal,
    formatPrice,
    updateCartQuantity,
    removeFromCart,
    setSupplierShipping,
    country
  } = useApp();

  if (cartSupplierGroups.length === 0) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '60px 24px',
              maxWidth: '520px',
              margin: '0 auto',
              border: '1px solid #e2e8f0',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#fff5eb',
                color: '#ff6600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}
            >
              <ShoppingCart size={36} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              Your Sourcing Cart is Empty
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px', lineHeight: '22px' }}>
              Browse verified OEM manufacturers, order factory evaluation samples, or start high-volume production orders.
            </p>
            <Link to="/products" className="btn-primary" style={{ padding: '12px 28px' }}>
              Explore Wholesale Showroom
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '28px 0 70px 0', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>
            <Link to="/" style={{ color: '#64748b' }}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Wholesale Cart</span>
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', marginBottom: '4px' }}>
            Wholesale Sourcing Cart ({cartCount} units)
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Orders are organized by verified factory supplier with Trade Assurance escrow protection.
          </p>
        </div>

        <div className="cart-layout-grid">
          
          {/* Left Supplier Groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartSupplierGroups.map((group, gIdx) => (
              <div
                key={gIdx}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '20px',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                {/* Group Header (Supplier Info) */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #f1f5f9',
                    paddingBottom: '14px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <Building2 size={18} color="#ff6600" />
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>
                      {group.supplier.name}
                    </span>
                    <span className="badge-verified">{group.supplier.years} YRS</span>
                    <span className="badge-trade-assurance">Trade Assurance</span>
                  </div>

                  <span style={{ fontSize: '12px', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={14} /> 100% Escrow Protected
                  </span>
                </div>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {group.items.map(item => {
                    const lineTotal = item.unitPrice * item.quantity;
                    return (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                          borderBottom: '1px solid #f8fafc',
                          paddingBottom: '16px',
                          flexWrap: 'wrap'
                        }}
                      >
                        {/* Image & Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 300px' }}>
                          <img
                            src={item.product.images[0]}
                            alt=""
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '8px',
                              objectFit: 'cover',
                              border: '1px solid #e2e8f0',
                              flexShrink: 0
                            }}
                          />
                          <div>
                            <Link
                              to="/product/$productId"
                              params={{ productId: item.product.id }}
                              style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', lineHeight: '18px', display: 'block', marginBottom: '4px' }}
                            >
                              {item.product.title}
                            </Link>
                            <div style={{ fontSize: '12px', color: '#64748b' }}>
                              Tier: <strong>{formatPrice(item.unitPrice)}</strong> / {item.product.unit} (MOQ: {item.product.moq})
                            </div>
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - item.product.moq)}
                            style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '13px', fontWeight: 800, minWidth: '40px', textAlign: 'center', color: '#0f172a' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + item.product.moq)}
                            style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total & Remove */}
                        <div style={{ textAlign: 'right', minWidth: '100px' }}>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                            {formatPrice(lineTotal)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shipping Selector for Group */}
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569' }}>
                    <Truck size={15} color="#2563eb" />
                    <span>Shipping Method to <strong>{country.name}</strong>:</span>
                  </div>

                  <select
                    value={group.shippingMethod}
                    onChange={(e) => setSupplierShipping(group.supplier.id, e.target.value as any)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      color: '#0f172a',
                      fontWeight: 600,
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    <option value="air_express">Door-to-Door Air Express (4-7 days) • $120.00</option>
                    <option value="ocean_freight">Standard Ocean Freight DDP (20-30 days) • $45.00</option>
                    <option value="air_freight">Air Cargo Port-to-Port (7-10 days) • $85.00</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Right Summary Column */}
          <div style={{ position: 'sticky', top: '24px' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', fontFamily: 'Outfit, sans-serif' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#475569', marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Wholesale Subtotal ({cartCount} units):</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatPrice(cartTotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated Freight (DDP):</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>
                    {formatPrice(cartSupplierGroups.reduce((a, g) => a + g.shippingTotal, 0))}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontSize: '12px' }}>
                  <span>Trade Assurance Escrow:</span>
                  <span style={{ fontWeight: 700 }}>FREE ($0.00)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px', marginTop: '6px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Estimated Total:</span>
                  <span style={{ fontSize: '22px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                    {formatPrice(cartTotal + cartSupplierGroups.reduce((a, g) => a + g.shippingTotal, 0))}
                  </span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '14px 0',
                  fontSize: '15px',
                  fontWeight: 800,
                  marginBottom: '14px',
                  borderRadius: '10px'
                }}
              >
                <span>Proceed to Trade Assurance Checkout</span>
                <ArrowRight size={16} />
              </Link>

              <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', lineHeight: '16px' }}>
                🔒 Payment held in Citibank Escrow. Released only after you confirm goods receipt.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
