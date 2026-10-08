import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FileText, Send, Sparkles, ShieldCheck, CheckCircle2, UploadCloud } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const QuickRFQWidget: React.FC = () => {
  const navigate = useNavigate();
  const { submitRFQ, country } = useApp();

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [quantity, setQuantity] = useState('1000');
  const [unit, setUnit] = useState('pieces');
  const [targetPrice, setTargetPrice] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = submitRFQ({
      title: productName,
      category,
      quantity: parseInt(quantity) || 1000,
      unit,
      targetPrice: targetPrice ? parseFloat(targetPrice) : undefined,
      sourcingType: 'Customized Product',
      destinationCountry: country.name,
      tradeTerms: 'DDP',
      paymentTerms: 'Trade Assurance',
      details: details || `Looking for high quality manufacturer for ${productName}. Please quote FOB and DDP prices with sample lead time.`
    });

    navigate({ to: '/rfq' });
  };

  return (
    <section style={{ marginBottom: '40px' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #fff7ed 0%, #fff 100%)',
            borderRadius: '16px',
            border: '1.5px solid #fed7aa',
            padding: '32px 40px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="quick-rfq-grid">
            {/* Left explanation */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ff6a00',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  marginBottom: '12px'
                }}
              >
                <FileText size={12} />
                <span>EASY SOURCING RFQ</span>
              </div>

              <h2
                style={{
                  fontSize: '26px',
                  fontWeight: 800,
                  color: '#111',
                  lineHeight: '1.3',
                  marginBottom: '10px',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                One Request, Multiple Verified Supplier Quotations
              </h2>

              <p style={{ fontSize: '13px', color: '#666', lineHeight: '20px', marginBottom: '20px' }}>
                Post your detailed product specifications in under 1 minute. Our intelligent supplier match engine distributes your RFQ to audited Gold Suppliers who return official price quotes within 24 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: '#333' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#ff6a00" />
                  <span>Receive average of 5+ custom supplier quotes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#ff6a00" />
                  <span>Compare FOB, CIF &amp; DDP door-to-door shipping options</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#ff6a00" />
                  <span>All finalized contracts backed by Trade Assurance</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <form
              onSubmit={handleSubmit}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #e5e7eb',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Product Name / Keyword:
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="e.g. 100% Organic Cotton French Terry Hoodie Blank"
                  required
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                    Category:
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#fff'
                    }}
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                    Quantity &amp; Unit:
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      placeholder="1000"
                      required
                      style={{
                        flex: 1,
                        padding: '9px 12px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                    <select
                      value={unit}
                      onChange={e => setUnit(e.target.value)}
                      style={{
                        width: '90px',
                        padding: '9px 8px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '12px',
                        outline: 'none',
                        background: '#fff'
                      }}
                    >
                      <option value="pieces">Pieces</option>
                      <option value="sets">Sets</option>
                      <option value="boxes">Boxes</option>
                      <option value="kg">Kilograms</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#333', marginBottom: '4px' }}>
                  Target Unit Price (Optional USD):
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={targetPrice}
                  onChange={e => setTargetPrice(e.target.value)}
                  placeholder="e.g. $8.50"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '11px 0', fontSize: '14px' }}
              >
                <Send size={15} />
                <span>Submit RFQ &amp; Get Free Quotes</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
