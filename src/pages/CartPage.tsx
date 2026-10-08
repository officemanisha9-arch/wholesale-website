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
              borderRadius: '24px',
              padding: '60px 28px',
              maxWidth: '520px',
              margin: '0 auto',
              border: '1px solid #e2e8f0',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: '#fff5eb',
                color: '#ff6600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px auto',
                boxShadow: 'var(--ali-orange-glow)'
              }}
            >
              <ShoppingCart size={36} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              Your Sourcing Cart is Empty
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748b', marginBottom: '26px', lineHeight: '22px' }}>
              Browse verified OEM manufacturers, order factory evaluation samples, or start high-volume production orders.
            </p>
            <Link to="/products" className="btn-primary" style={{ padding: '12px 30px' }}>
              Explore Wholesale Showroom
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '28px 0 70px 0', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: '#64748b', marginBottom: '8px' }}>
            <Link to="/" style={{ color: '#64748b', fontWeight: 500 }}>Home</Link>
            <ChevronRight size={13} />
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Wholesale Cart</span>
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Wholesale Sourcing Cart ({cartCount} units)
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0 }}>
            Orders are organized by verified factory supplier with Trade Assurance escrow protection.
          </p>
        </div>

        <div className="cart-layout-grid">
          
          {/* Left Supplier Groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {cartSupplierGroups.map((group, gIdx) => (
              <div
                key={gIdx}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
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
                    paddingBottom: '16px',
                    marginBottom: '18px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <Building2 size={18} color="#ff6600" />
                    <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '15px' }}>
                      {group.supplier.name}
                    </span>
                    <span className="badge-verified">{group.supplier.years} YRS</span>
                    <span className="badge-trade-assurance">Trade Assurance</span>
                  </div>

                  <span style={{ fontSize: '12px', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="pulse-dot" style={{ width: '6px', height: '6px' }} />
                    <span>100% Escrow Protected</span>
                  </span>
                </div>

                {/* Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {group.items.map(item => {
                    const lineTotal = item.unitPrice * item.quantity;
                    return (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '18px',
                          borderBottom: '1px solid #f8fafc',
                          paddingBottom: '18px',
                          flexWrap: 'wrap'
                        }}
                      >
                        {/* Image & Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 300px' }}>
                          <img
                            src={item.product.images[0]}
                            alt=""
                            style={{
                              width: '68px',
                              height: '68px',
                              borderRadius: '10px',
                              objectFit: 'cover',
                              border: '1px solid #e2e8f0',
                              flexShrink: 0
                            }}
                          />
                          <div>
                            <Link
                              to="/product/$productId"
                              params={{ productId: item.product.id }}
                              style={{ fontWeight: 700, fontSize: '14.5px', color: '#0f172a', lineHeight: '20px', display: 'block', marginBottom: '4px' }}
                            >
                              {item.product.title}
                            </Link>
                            <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                              Tier: <strong style={{ color: '#0f172a' }}>{formatPrice(item.unitPrice)}</strong> / {item.product.unit} (MOQ: {item.product.moq})
                            </div>
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - item.product.moq)}
                            style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '13.5px', fontWeight: 800, minWidth: '44px', textAlign: 'center', color: '#0f172a' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + item.product.moq)}
                            style={{ width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total & Remove */}
                        <div style={{ textAlign: 'right', minWidth: '110px' }}>
                          <div style={{ fontSize: '17px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                            {formatPrice(lineTotal)}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ fontSize: '11.5px', color: '#ef4444', fontWeight: 600, marginTop: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Shipping Selector for Group */}
                <div style={{ marginTop: '18px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: '#475569' }}>
                    <Truck size={16} color="#2563eb" />
                    <span>Shipping Method to <strong>{country.name}</strong>:</span>
                  </div>

                  <select
                    value={group.shippingMethod}
                    onChange={(e) => setSupplierShipping(group.supplier.id, e.target.value as any)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12.5px',
                      color: '#0f172a',
                      fontWeight: 600,
                      outline: 'none',
                      background: '#fff',
                      cursor: 'pointer'
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
          <div style={{ position: 'sticky', top: '90px' }}>
            <div
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                padding: '26px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', marginBottom: '18px', fontFamily: 'Outfit, sans-serif' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#475569', marginBottom: '22px' }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontSize: '12.5px' }}>
                  <span>Trade Assurance Escrow:</span>
                  <span style={{ fontWeight: 800 }}>FREE ($0.00)</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginTop: '6px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Estimated Total:</span>
                  <span style={{ fontSize: '24px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
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
                  marginBottom: '16px',
                  borderRadius: '12px'
                }}
              >
                <span>Proceed to Trade Assurance Checkout</span>
                <ArrowRight size={16} />
              </Link>

              <div style={{ fontSize: '11.5px', color: '#64748b', textAlign: 'center', lineHeight: '17px' }}>
                🔒 Payment held in Citibank Escrow. Released only after you confirm goods receipt.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
