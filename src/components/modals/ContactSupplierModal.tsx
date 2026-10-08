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
        style={{ width: '600px', padding: '28px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111' }}>
              Send Inquiry to Verified Supplier
            </h3>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
              {supplier.name} ({supplier.years} Yrs Gold Supplier)
            </div>
          </div>
          <button onClick={() => setContactSupplierData(null)} style={{ color: '#888' }}>
            <X size={20} />
          </button>
        </div>

        {/* Product context card if inquiries triggered from product */}
        {product && (
          <div
            style={{
              display: 'flex',
              gap: '12px',
              padding: '10px',
              background: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              marginBottom: '18px',
              alignItems: 'center'
            }}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#111' }} className="truncate">
                {product.title}
              </div>
              <div style={{ fontSize: '11px', color: '#ff6a00', fontWeight: 600 }}>
                Min. Order: {product.moq} {product.unit}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Inquiry Type Pills */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
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
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: isSelected ? '1.5px solid #ff6a00' : '1px solid #d1d5db',
                        background: isSelected ? '#fff3e8' : '#fff',
                        color: isSelected ? '#ff6a00' : '#4b5563',
                        fontSize: '12px',
                        fontWeight: isSelected ? 700 : 500
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
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
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
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Message textarea */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '6px' }}>
              Detailed Requirements:
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '13px',
                lineHeight: '1.5',
                outline: 'none',
                resize: 'vertical'
              }}
              required
            />
          </div>

          {/* Trade Assurance Assurance Info */}
          <div
            style={{
              padding: '10px 14px',
              background: '#e6f7ef',
              borderRadius: '8px',
              border: '1px solid #a3e0be',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: '#0d824d',
              marginBottom: '20px'
            }}
          >
            <ShieldCheck size={18} />
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
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Send size={15} />
              <span>Send Wholesale Inquiry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
