import React, { useState } from 'react';
import { X, MessageSquare, Send, ShieldCheck, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactSupplierModal: React.FC = () => {
  const {
    contactSupplierData,
    setContactSupplierData,
    startChatWithSupplier,
    showToast
  } = useApp();

  const [quantity, setQuantity] = useState('500');
  const [inquiryType, setInquiryType] = useState('Get Latest Quotation');
  const [message, setMessage] = useState(
    'Hello, I am interested in placing a wholesale order. Please share your FOB / DDP pricing, sample lead time, and custom logo capabilities.'
  );

  if (!contactSupplierData) return null;

  const { supplier, product } = contactSupplierData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullText = `[Inquiry: ${inquiryType} | Target Qty: ${quantity} units]\n${message}`;
    startChatWithSupplier(supplier.id, product?.id, fullText);
    setContactSupplierData(null);
    showToast('Inquiry Sent to Supplier', `Supplier ${supplier.name} will respond within ${supplier.responseTime}.`, 'success');
  };

  return (
    <div className="modal-backdrop" onClick={() => setContactSupplierData(null)}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ width: '600px', maxWidth: '94vw', padding: '32px', borderRadius: '24px', boxShadow: 'var(--shadow-xl)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Send Inquiry to Verified Supplier
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {supplier.name} ({supplier.years} Yrs Gold Supplier)
            </div>
          </div>
          <button
            onClick={() => setContactSupplierData(null)}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-app)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Product context card if inquiries triggered from product */}
        {product && (
          <div
            style={{
              display: 'flex',
              gap: '14px',
              padding: '12px',
              background: 'var(--bg-app)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              marginBottom: '20px',
              alignItems: 'center'
            }}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ width: '52px', height: '52px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                {product.title}
              </div>
              <div style={{ fontSize: '12px', color: '#ff6600', fontWeight: 700, marginTop: '2px' }}>
                Min. Order: {product.moq} {product.unit}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Inquiry Type Pills */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Inquiry Purpose:
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Get Latest Quotation', 'Request Product Sample', 'Custom OEM/ODM Branding', 'Inquire Shipping to My Port'].map(
                type => {
                  const isSelected = inquiryType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setInquiryType(type)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        border: isSelected ? '1.5px solid #ff6600' : '1px solid var(--border-color)',
                        background: isSelected ? '#fff5eb' : 'var(--bg-app)',
                        color: isSelected ? '#ff6600' : 'var(--text-secondary)',
                        fontSize: '12px',
                        fontWeight: isSelected ? 800 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {type}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Target Quantity */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Estimated Purchase Quantity (Units):
            </label>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="e.g. 500"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                fontSize: '13px',
                outline: 'none',
                background: 'var(--bg-app)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Message textarea */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
              Detailed Requirements:
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                fontSize: '13px',
                lineHeight: '1.6',
                outline: 'none',
                resize: 'vertical',
                background: 'var(--bg-app)',
                color: 'var(--text-primary)'
              }}
              required
            />
          </div>

          {/* Trade Assurance Assurance Info */}
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(5, 150, 105, 0.08)',
              borderRadius: '12px',
              border: '1px solid rgba(5, 150, 105, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              color: '#065f46',
              marginBottom: '24px'
            }}
          >
            <ShieldCheck size={20} color="#059669" />
            <span>
              Your order communication and trade transactions are protected under Alibaba Trade Assurance.
            </span>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setContactSupplierData(null)}
              className="btn-secondary"
              style={{ padding: '8px 18px', borderRadius: '10px' }}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ padding: '8px 22px', borderRadius: '10px' }}>
              <Send size={15} />
              <span>Send Wholesale Inquiry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

