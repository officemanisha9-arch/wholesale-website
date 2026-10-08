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
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#111', fontFamily: 'Outfit, sans-serif', marginBottom: '4px' }}>
            My Wholesale Orders &amp; Shipment Tracking
          </h1>
          <span style={{ fontSize: '13px', color: '#666' }}>
            Track production status, logistics customs clearance, and Trade Assurance escrow protection.
          </span>
        </div>

        {/* Status Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '24px',
            background: '#ffffff',
            borderRadius: '10px 10px 0 0',
            padding: '12px 16px'
          }}
        >
          {['All', 'In Transit', 'Waiting Dispatch', 'Delivered'].map(status => {
            const isSelected = activeFilter === status;
            return (
              <button
                key={status}
                onClick={() => setActiveFilter(status)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: isSelected ? 700 : 500,
                  background: isSelected ? '#ff6a00' : '#f3f4f6',
                  color: isSelected ? '#ffffff' : '#4b5563',
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
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: selectedOrderTracking === order.id ? '2px solid #ff6a00' : '1px solid #e5e7eb',
                  padding: '20px',
                  boxShadow: 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Order Top Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', paddingBottom: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#888' }}>Order No: </span>
                    <strong style={{ fontSize: '13px', color: '#111' }}>{order.orderNumber}</strong>
                    <span style={{ fontSize: '12px', color: '#888', marginLeft: '10px' }}>• {order.createdAt}</span>
                  </div>

                  <span
                    style={{
                      background: order.status === 'In Transit' ? '#eff6ff' : order.status === 'Delivered' ? '#ecfdf5' : '#fff7ed',
                      color: order.status === 'In Transit' ? '#1d4ed8' : order.status === 'Delivered' ? '#047857' : '#c2410c',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: '12px'
                    }}
                  >
                    ● {order.status}
                  </span>
                </div>

                {/* Supplier Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px' }}>
                  <Building2 size={16} color="#ff6a00" />
                  <strong style={{ color: '#111' }}>{order.supplier.name}</strong>
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
                        style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover', background: '#f8fafc' }}
                      />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }} className="truncate">
                          {item.productTitle}
                        </div>
                        <div style={{ fontSize: '11px', color: '#666' }}>
                          Qty: {item.quantity} {item.unit} • {formatPrice(item.unitPrice)} / {item.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total & Action row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f9fafb', paddingTop: '10px' }}>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Total Order Value: <strong style={{ color: '#ff6a00', fontSize: '16px' }}>{formatPrice(order.totalAmount)}</strong>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      showToast('Invoice Downloaded', `Official Trade Assurance Commercial Invoice for #${order.orderNumber} saved.`, 'success');
                    }}
                    style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
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
                background: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #fed7aa',
                padding: '24px',
                boxShadow: 'var(--shadow-md)',
                position: 'sticky',
                top: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Truck size={22} color="#ff6a00" />
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111' }}>
                  Live Logistics &amp; Escrow Timeline
                </h3>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div>
                  <span style={{ color: '#666' }}>Carrier: </span>
                  <strong style={{ color: '#111' }}>{selectedOrder.shippingCarrier}</strong>
                </div>
                <div>
                  <span style={{ color: '#666' }}>Tracking Number: </span>
                  <strong style={{ color: '#2563eb' }}>{selectedOrder.trackingNumber}</strong>
                </div>
                <div>
                  <span style={{ color: '#666' }}>Estimated Delivery: </span>
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
                    background: '#e5e7eb'
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
                        background: step.completed ? '#059669' : '#ffffff',
                        border: step.completed ? '2px solid #059669' : '2px solid #d1d5db',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '9px'
                      }}
                    >
                      {step.completed && '✓'}
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: step.completed ? '#111' : '#9ca3af' }}>
                        {step.status}
                      </div>
                      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                        {step.description}
                      </div>
                      <div style={{ fontSize: '10px', color: '#999', marginTop: '2px' }}>
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
