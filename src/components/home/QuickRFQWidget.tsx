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
    <section style={{ marginBottom: '44px' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #fffbf7 100%)',
            borderRadius: '20px',
            border: '1px solid #fed7aa',
            padding: '36px 44px',
            boxShadow: 'var(--shadow-md), 0 8px 30px rgba(255, 102, 0, 0.06)',
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
                  background: 'var(--ali-orange-gradient)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '14px',
                  boxShadow: 'var(--ali-orange-glow)'
                }}
              >
                <FileText size={12} />
                <span>EASY SOURCING RFQ</span>
              </div>

              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#0f172a',
                  lineHeight: '1.25',
                  marginBottom: '12px',
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                One Request, Multiple Verified Supplier Quotations
              </h2>

              <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '22px', marginBottom: '22px' }}>
                Post your product specifications in under 1 minute. Our intelligent supplier match engine distributes your RFQ to audited Gold Suppliers who return official price quotes within 24 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#ff6600" />
                  <span>Receive an average of 5+ custom supplier quotes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#ff6600" />
                  <span>Compare FOB, CIF &amp; DDP door-to-door shipping rates</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#ff6600" />
                  <span>All finalized contracts backed by Trade Assurance Escrow</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <form
              onSubmit={handleSubmit}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #e2e8f0',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Product Keyword / Requirements:
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="e.g. 100% Organic Cotton French Terry Hoodie Blank"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Category:
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#fff',
                      cursor: 'pointer'
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
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
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
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                    <select
                      value={unit}
                      onChange={e => setUnit(e.target.value)}
                      style={{
                        width: '95px',
                        padding: '10px 8px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '12px',
                        outline: 'none',
                        background: '#fff',
                        cursor: 'pointer'
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
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
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '12px 0', fontSize: '14px', borderRadius: '12px' }}
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
