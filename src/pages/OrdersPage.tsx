import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Package,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Download,
  AlertCircle,
  Building2,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrdersPage: React.FC = () => {
  const { orders, formatPrice, showToast } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedOrderTracking, setSelectedOrderTracking] = useState<string | null>(orders[0]?.id || null);

  const filteredOrders = orders.filter(ord => {
    if (activeFilter === 'All') return true;
    return ord.status === activeFilter;
  });

  const selectedOrder = orders.find(o => o.id === selectedOrderTracking) || orders[0];

  return (
    <div style={{ padding: '28px 0 70px 0', background: 'var(--bg-app)', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '4px' }}>
            My Wholesale Orders &amp; Shipment Tracking
          </h1>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Track production status, logistics customs clearance, and Trade Assurance escrow protection.
          </span>
        </div>

        {/* Status Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '6px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          {['All', 'In Transit', 'Waiting Dispatch', 'Delivered'].map(status => {
            const isSelected = activeFilter === status;
            return (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: isSelected ? 800 : 600,
                  background: isSelected ? '#ff6600' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {status}
              </button>
            );
          })}
        </div>

        {/* Orders Layout */}
        <div className="orders-layout-grid">
          {/* Left Orders List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {filteredOrders.map(order => (
              <div
                key={order.id}
                onClick={() => setSelectedOrderTracking(order.id)}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '18px',
                  border: selectedOrderTracking === order.id ? '2px solid #ff6600' : '1px solid var(--border-color)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Order Top Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Order No: </span>
                    <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{order.orderNumber}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '10px' }}>• {order.createdAt}</span>
                  </div>

                  <span
                    style={{
                      background: order.status === 'In Transit' ? '#eff6ff' : order.status === 'Delivered' ? '#ecfdf5' : '#fff7ed',
                      color: order.status === 'In Transit' ? '#1d4ed8' : order.status === 'Delivered' ? '#047857' : '#c2410c',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '999px'
                    }}
                  >
                    ● {order.status}
                  </span>
                </div>

                {/* Supplier Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', fontSize: '13px' }}>
                  <Building2 size={16} color="#ff6600" />
                  <strong style={{ color: 'var(--text-primary)' }}>{order.supplier.name}</strong>
                  <span className="badge-verified">{order.supplier.years} YRS</span>
                  <span className="badge-trade-assurance">🛡️ Trade Assurance</span>
                </div>

                {/* Items in order */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                  {order.items.map((item, iIdx) => (
                    <div key={iIdx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img
                        src={item.productImage}
                        alt={item.productTitle}
                        style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', background: 'var(--bg-app)', border: '1px solid var(--border-color)' }}
                      />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                          {item.productTitle}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          Qty: <strong>{item.quantity} {item.unit}</strong> • {formatPrice(item.unitPrice)} / {item.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total & Action row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Total Order Value: <strong style={{ color: '#ff6600', fontSize: '17px', fontFamily: 'Outfit, sans-serif' }}>{formatPrice(order.totalAmount)}</strong>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      showToast('Invoice Downloaded', `Official Trade Assurance Commercial Invoice for #${order.orderNumber} saved.`, 'success');
                    }}
                    style={{ fontSize: '12px', color: '#2563eb', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <Download size={13} />
                    <span>Download Invoice (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Live Shipment Tracking Timeline */}
          {selectedOrder && (
            <div
              style={{
                background: 'var(--bg-card)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                padding: '26px',
                boxShadow: 'var(--shadow-md)',
                position: 'sticky',
                top: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff5eb', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={20} />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                  Live Logistics &amp; Escrow Timeline
                </h3>
              </div>

              <div
                style={{
                  background: 'var(--bg-app)',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Carrier: </span>
                  <strong style={{ color: 'var(--text-primary)' }}>{selectedOrder.shippingCarrier}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Tracking Number: </span>
                  <strong style={{ color: '#2563eb' }}>{selectedOrder.trackingNumber}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>Estimated Delivery: </span>
                  <strong style={{ color: '#059669' }}>{selectedOrder.estimatedDeliveryDate}</strong>
                </div>
              </div>

              {/* Step-by-step Timeline */}
              <div style={{ position: 'relative', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Vertical connecting line */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    bottom: '8px',
                    left: '7px',
                    width: '2px',
                    background: 'var(--border-color)'
                  }}
                />

                {selectedOrder.timeline.map((step, sIdx) => (
                  <div key={sIdx} style={{ position: 'relative' }}>
                    {/* Circle Node */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-24px',
                        top: '2px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: step.completed ? '#059669' : 'var(--bg-card)',
                        border: step.completed ? '2px solid #059669' : '2px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '9px',
                        fontWeight: 900
                      }}
                    >
                      {step.completed && '✓'}
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: step.completed ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {step.status}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {step.description}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                        {step.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

