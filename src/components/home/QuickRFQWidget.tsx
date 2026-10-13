import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FileText, Send, Sparkles, ShieldCheck, CheckCircle2, UploadCloud, ArrowRight } from 'lucide-react';
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
    <section style={{ marginBottom: '48px' }}>
      <div className="container">
        <div className="quick-rfq-card">
          {/* Subtle Ambient Watermark */}
          <div
            style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 85, 0, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div className="quick-rfq-grid">
            {/* Left explanation */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(135deg, #ff5500 0%, #ea580c 100%)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '14px',
                  boxShadow: '0 4px 12px rgba(255, 85, 0, 0.3)'
                }}
              >
                <FileText size={12} />
                <span>INSTANT 1-CLICK RFQ</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(22px, 5vw, 30px)',
                  fontWeight: 900,
                  color: '#0f172a',
                  lineHeight: '1.25',
                  marginBottom: '12px',
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                One Sourcing Request, Multiple Verified Factory Bids
              </h2>

              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '22px', marginBottom: '24px' }}>
                Post your target product specifications in under 60 seconds. Our intelligent matching engine distributes your RFQ directly to audited Gold Suppliers who return official price quotes in &lt; 1 hour.
              </p>

              <div className="quick-rfq-benefits">
                <div className="quick-rfq-benefit-item">
                  <CheckCircle2 size={16} className="quick-rfq-benefit-icon" />
                  <span>Receive an average of 5+ custom factory quotes with BoM breakdown</span>
                </div>
                <div className="quick-rfq-benefit-item">
                  <CheckCircle2 size={16} className="quick-rfq-benefit-icon" />
                  <span>Compare FOB, CIF &amp; DDP door-to-door freight rates to {country.name} {country.flag}</span>
                </div>
                <div className="quick-rfq-benefit-item">
                  <CheckCircle2 size={16} className="quick-rfq-benefit-icon" />
                  <span>All contracts 100% protected by Citibank Escrow</span>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <form
              onSubmit={handleSubmit}
              className="quick-rfq-form"
            >
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Product Keyword / Target Item:
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  placeholder="e.g. 100% Organic Cotton French Terry Hoodie Blank"
                  required
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13.5px',
                    outline: 'none',
                    transition: 'border-color 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#ff5500')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                />
              </div>

              <div className="quick-rfq-row-2col">
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                    Category:
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      padding: '11px 12px',
                      borderRadius: '12px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none',
                      background: '#fff',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
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
                  <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      placeholder="1000"
                      required
                      style={{
                        flex: 1,
                        minWidth: 0,
                        width: '100%',
                        padding: '11px 12px',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#ff5500')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                    />
                    <select
                      value={unit}
                      onChange={e => setUnit(e.target.value)}
                      style={{
                        width: '88px',
                        flexShrink: 0,
                        minWidth: 0,
                        padding: '11px 8px',
                        borderRadius: '12px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '12px',
                        outline: 'none',
                        background: '#fff',
                        cursor: 'pointer',
                        boxSizing: 'border-box'
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
                    maxWidth: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#ff5500')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#cbd5e1')}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '13px 12px',
                  fontSize: '13.5px',
                  borderRadius: '12px',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  boxSizing: 'border-box'
                }}
              >
                <Send size={15} style={{ flexShrink: 0 }} />
                <span>Submit RFQ &amp; Get 3 Verified Quotes</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
