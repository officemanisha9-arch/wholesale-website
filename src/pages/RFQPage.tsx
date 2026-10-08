import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  FileText,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Filter,
  DollarSign,
  Package,
  Layers,
  Award,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { RFQRequirement, RFQQuote } from '../types';

export const RFQPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    rfqs,
    submitRFQ,
    acceptRFQQuote,
    formatPrice,
    country,
    startChatWithSupplier,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'create' | 'feed' | 'my_rfqs'>('create');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [sourcingType, setSourcingType] = useState<RFQRequirement['sourcingType']>('Customized Product');
  const [quantity, setQuantity] = useState('1000');
  const [unit, setUnit] = useState('pieces');
  const [targetPrice, setTargetPrice] = useState('8.50');
  const [tradeTerms, setTradeTerms] = useState<RFQRequirement['tradeTerms']>('DDP');
  const [details, setDetails] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = submitRFQ({
      title,
      category,
      sourcingType,
      quantity: parseInt(quantity) || 1000,
      unit,
      targetPrice: targetPrice ? parseFloat(targetPrice) : undefined,
      destinationCountry: country.name,
      tradeTerms,
      paymentTerms: 'Trade Assurance',
      details: details || `Looking for reliable certified manufacturer for ${title}. Need custom branding, packaging and sample before mass run.`
    });

    showToast('RFQ Published Successfully', 'Your RFQ is now dispatched to 34,000+ verified OEM manufacturers.', 'success');
    setActiveTab('my_rfqs');
  };

  return (
    <div style={{ padding: '28px 0 70px 0', background: 'var(--bg-app)', minHeight: '100vh' }}>
      <div className="container">
        {/* RFQ Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 60%, #1e293b 100%)',
            borderRadius: '24px',
            padding: '40px 44px',
            color: '#ffffff',
            marginBottom: '28px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 102, 0, 0.22) 0%, rgba(255, 102, 0, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 102, 0, 0.18)',
                color: '#ff944d',
                border: '1px solid rgba(255, 102, 0, 0.3)',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '999px',
                marginBottom: '14px',
                letterSpacing: '0.4px',
                textTransform: 'uppercase'
              }}
            >
              <FileText size={13} />
              <span>Global Sourcing RFQ Hub</span>
            </div>

            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                lineHeight: '1.25',
                marginBottom: '12px',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.5px'
              }}
            >
              Post Sourcing RFQ &amp; Compare Factory Quotes
            </h1>

            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '24px', margin: 0 }}>
              Submit your bespoke custom manufacturing specifications. Verified OEM/ODM factories analyze your requirements and return detailed price breakdowns, lead times, and sample policies.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '28px',
            background: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '6px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          {[
            { id: 'create', label: 'Submit Sourcing RFQ' },
            { id: 'my_rfqs', label: `My RFQs & Quotes (${rfqs.length})` },
            { id: 'feed', label: 'Public Market Activity' }
          ].map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 22px',
                  fontSize: '13px',
                  fontWeight: isSelected ? 800 : 600,
                  color: isSelected ? '#ff6600' : 'var(--text-secondary)',
                  background: isSelected ? '#fff5eb' : 'transparent',
                  border: isSelected ? '1px solid #fed7aa' : '1px solid transparent',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: CREATE RFQ FORM */}
        {activeTab === 'create' && (
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '20px',
              padding: '36px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <form onSubmit={handleFormSubmit}>
              <div className="rfq-split-grid">
                {/* Left Form Fields */}
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', fontFamily: 'Outfit, sans-serif' }}>
                    1. Product Requirements &amp; Details
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Product Name / Title: *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g. Custom 3-in-1 Bamboo Wireless Charging Dock Qi2 Fast Charge"
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                        Product Category:
                      </label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          fontSize: '13px',
                          outline: 'none',
                          background: 'var(--bg-app)',
                          color: 'var(--text-primary)'
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
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                        Sourcing Type:
                      </label>
                      <select
                        value={sourcingType}
                        onChange={e => setSourcingType(e.target.value as any)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          fontSize: '13px',
                          outline: 'none',
                          background: 'var(--bg-app)',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <option value="Customized Product">Customized Product (OEM/ODM)</option>
                        <option value="Non-customized Product">Non-customized / Off-the-shelf</option>
                        <option value="Total Solution">Total Turnkey Solution</option>
                      </select>
                    </div>
                  </div>

                  {/* Quantity and Target Price */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                        Estimated Quantity: *
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
                            border: '1px solid var(--border-color)',
                            fontSize: '13px',
                            outline: 'none',
                            background: 'var(--bg-app)',
                            color: 'var(--text-primary)'
                          }}
                        />
                        <select
                          value={unit}
                          onChange={e => setUnit(e.target.value)}
                          style={{
                            width: '90px',
                            padding: '10px 8px',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            fontSize: '12px',
                            outline: 'none',
                            background: 'var(--bg-app)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          <option value="pieces">Pieces</option>
                          <option value="sets">Sets</option>
                          <option value="boxes">Boxes</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                        Target Price / Unit (USD):
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={targetPrice}
                        onChange={e => setTargetPrice(e.target.value)}
                        placeholder="e.g. 7.50"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          fontSize: '13px',
                          outline: 'none',
                          background: 'var(--bg-app)',
                          color: 'var(--text-primary)'
                        }}
                      />
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Detailed Specifications &amp; Requirements:
                    </label>
                    <textarea
                      rows={5}
                      value={details}
                      onChange={e => setDetails(e.target.value)}
                      placeholder="Please specify materials, dimensions, packaging requirements, custom logo techniques, certifications (CE/RoHS), and sample deadline..."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        outline: 'none',
                        background: 'var(--bg-app)',
                        color: 'var(--text-primary)'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Right Logistics & Trade Terms */}
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '18px', fontFamily: 'Outfit, sans-serif' }}>
                    2. Shipping &amp; Trade Terms
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Destination Country:
                    </label>
                    <input
                      type="text"
                      value={country.name}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-app)',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                      Incoterms Trade Terms:
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {(['DDP', 'FOB', 'CIF', 'EXW'] as const).map(term => {
                        const isSelected = tradeTerms === term;
                        return (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setTradeTerms(term)}
                            style={{
                              padding: '10px 0',
                              borderRadius: '10px',
                              border: isSelected ? '1.5px solid #ff6600' : '1px solid var(--border-color)',
                              background: isSelected ? '#fff5eb' : 'var(--bg-app)',
                              color: isSelected ? '#ff6600' : 'var(--text-primary)',
                              fontWeight: isSelected ? 800 : 600,
                              fontSize: '13px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            {term}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Trade Assurance Safeguard Notice */}
                  <div
                    style={{
                      background: 'rgba(5, 150, 105, 0.08)',
                      border: '1.5px solid rgba(5, 150, 105, 0.25)',
                      borderRadius: '14px',
                      padding: '18px',
                      marginBottom: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 800, fontSize: '13px', marginBottom: '6px' }}>
                      <ShieldCheck size={18} />
                      <span>Alibaba Trade Assurance Guaranteed</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#065f46', lineHeight: '20px', margin: 0 }}>
                      Every RFQ transaction finalized on Alibaba.com is covered by secure payment escrow, verified supplier on-time dispatch guarantee, and 30-day dispute protection.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '14px 0', fontSize: '15px', fontWeight: 800, borderRadius: '12px' }}
                  >
                    <Send size={18} />
                    <span>Publish RFQ to 34,000+ Verified Suppliers</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MY RFQS & RECEIVED QUOTES */}
        {activeTab === 'my_rfqs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {rfqs.map(rfq => (
              <div
                key={rfq.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '18px',
                  border: '1px solid var(--border-color)',
                  padding: '26px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* RFQ Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span
                        style={{
                          background: rfq.status === 'Awarded' ? '#ecfdf5' : '#eff6ff',
                          color: rfq.status === 'Awarded' ? '#047857' : '#1d4ed8',
                          fontSize: '11px',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        ● {rfq.status}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>RFQ ID: {rfq.id}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>• Posted: {rfq.createdAt}</span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                      {rfq.title}
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Target Quantity:</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                      {rfq.quantity.toLocaleString()} {rfq.unit}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: '22px' }}>
                  {rfq.details}
                </p>

                {/* Received Quotes Section */}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={16} color="#ff6600" />
                    <span>Official Supplier Quotations Received ({rfq.quotes?.length || 0}):</span>
                  </div>

                  {rfq.quotes && rfq.quotes.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {rfq.quotes.map(quote => (
                        <div
                          key={quote.id}
                          className="factory-card-grid"
                          style={{
                            background: 'var(--bg-app)',
                            borderRadius: '14px',
                            border: quote.status === 'Accepted' ? '2px solid #059669' : '1px solid var(--border-color)',
                            padding: '18px',
                            alignItems: 'center'
                          }}
                        >
                          {/* Supplier Info */}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                              <span>{quote.supplier.flag}</span>
                              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{quote.supplier.name}</strong>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <span className="badge-verified">{quote.supplier.years} YRS</span>
                              <span className="badge-trade-assurance">Trade Assurance</span>
                            </div>
                          </div>

                          {/* Quotation Specs */}
                          <div>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '6px', fontSize: '12px' }}>
                              <div>
                                <span style={{ color: 'var(--text-secondary)' }}>Quoted Unit Price: </span>
                                <strong style={{ color: '#ff6600', fontSize: '15px', fontFamily: 'Outfit, sans-serif' }}>{formatPrice(quote.unitPrice)}</strong>
                              </div>
                              <div>
                                <span style={{ color: 'var(--text-secondary)' }}>Sample: </span>
                                <strong>{formatPrice(quote.samplePrice)}</strong>
                              </div>
                              <div>
                                <span style={{ color: 'var(--text-secondary)' }}>Lead Time: </span>
                                <strong>{quote.leadTimeDays} days</strong>
                              </div>
                            </div>
                            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
                              "{quote.notes}"
                            </p>
                          </div>

                          {/* Actions */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {quote.status === 'Accepted' ? (
                              <div
                                style={{
                                  background: '#ecfdf5',
                                  color: '#047857',
                                  fontWeight: 800,
                                  fontSize: '12px',
                                  padding: '8px',
                                  borderRadius: '8px',
                                  textAlign: 'center'
                                }}
                              >
                                ✓ Quotation Accepted
                              </div>
                            ) : (
                              <button
                                onClick={() => acceptRFQQuote(rfq.id, quote.id)}
                                className="btn-primary"
                                style={{ padding: '8px 0', fontSize: '12px', borderRadius: '8px' }}
                              >
                                Accept &amp; Start Order
                              </button>
                            )}

                            <button
                              onClick={() => startChatWithSupplier(quote.supplierId, undefined, `Inquiring regarding your quote for RFQ #${rfq.id}: ${rfq.title}`)}
                              className="btn-secondary"
                              style={{ padding: '7px 0', fontSize: '12px', borderRadius: '8px' }}
                            >
                              <MessageSquare size={12} />
                              <span>Negotiate</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '12px', fontSize: '12px', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                      Supplier quotations are currently being prepared. Verified suppliers typically respond within 12-24 hours.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: PUBLIC SOURCING FEED */}
        {activeTab === 'feed' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {rfqs.map(rfq => (
              <div
                key={rfq.id}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '16px' }}>{rfq.buyerFlag}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13px' }}>{rfq.buyerName}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>({rfq.buyerCountry})</span>
                    <span style={{ fontSize: '11px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                      {rfq.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'Outfit, sans-serif' }}>
                    {rfq.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Target: <strong>{rfq.quantity.toLocaleString()} {rfq.unit}</strong> • Terms: <strong>{rfq.tradeTerms}</strong> • {rfq.quotesReceivedCount} Quotes Submitted
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      showToast('Supplier Portal Required', 'To submit a supplier quote, sign in with a Gold Supplier account.', 'info');
                    }}
                    className="btn-primary"
                    style={{ padding: '8px 18px', fontSize: '12px', borderRadius: '8px' }}
                  >
                    Quote as Supplier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

