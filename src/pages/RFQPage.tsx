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
  Award
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

    setActiveTab('my_rfqs');
  };

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* RFQ Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #2e1065 0%, #1e1b4b 60%, #0f172a 100%)',
            borderRadius: '16px',
            padding: '36px 40px',
            color: '#ffffff',
            marginBottom: '28px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(90deg, #ff6a00, #ff8c00)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '12px',
                marginBottom: '10px'
              }}
            >
              <FileText size={12} />
              <span>ALIBABA GLOBAL SOURCING RFQ HUB</span>
            </div>

            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                lineHeight: '1.25',
                marginBottom: '10px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Post Sourcing RFQ &amp; Compare Verified Factory Quotes
            </h1>

            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '22px' }}>
              Submit your bespoke custom manufacturing specifications. Verified OEM/ODM factories analyze your requirements and return detailed price breakdowns, lead times, and sample policies.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '28px',
            background: '#ffffff',
            borderRadius: '12px 12px 0 0',
            padding: '0 20px'
          }}
        >
          {[
            { id: 'create', label: 'Submit New Sourcing RFQ' },
            { id: 'my_rfqs', label: `My RFQs & Received Quotes (${rfqs.length})` },
            { id: 'feed', label: 'Public Sourcing Market Activity' }
          ].map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '16px 24px',
                  fontSize: '14px',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#ff6a00' : '#666',
                  borderBottom: isSelected ? '3px solid #ff6a00' : '3px solid transparent',
                  transition: 'all 0.15s ease'
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
              background: '#ffffff',
              borderRadius: '16px',
              padding: '36px',
              border: '1px solid #e5e7eb',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <form onSubmit={handleFormSubmit}>
              <div className="rfq-split-grid">
                {/* Left Form Fields */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '18px' }}>
                    1. Product Requirements &amp; Details
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '6px' }}>
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
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '6px' }}>
                        Product Category:
                      </label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
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
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '6px' }}>
                        Sourcing Type:
                      </label>
                      <select
                        value={sourcingType}
                        onChange={e => setSourcingType(e.target.value as any)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          fontSize: '13px',
                          outline: 'none',
                          background: '#fff'
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
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '6px' }}>
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
                            padding: '10px 8px',
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
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '6px' }}>
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
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '6px' }}>
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
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '13px',
                        lineHeight: '1.5',
                        outline: 'none'
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Right Logistics & Trade Terms */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '18px' }}>
                    2. Shipping &amp; Trade Terms
                  </h3>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '6px' }}>
                      Destination Country:
                    </label>
                    <input
                      type="text"
                      value={country.name}
                      readOnly
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        fontSize: '13px',
                        color: '#555'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '6px' }}>
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
                              borderRadius: '6px',
                              border: isSelected ? '2px solid #ff6a00' : '1px solid #d1d5db',
                              background: isSelected ? '#fff3e8' : '#fff',
                              color: isSelected ? '#ff6a00' : '#333',
                              fontWeight: isSelected ? 800 : 500,
                              fontSize: '13px'
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
                      background: '#ecfdf5',
                      border: '1.5px solid #a7f3d0',
                      borderRadius: '10px',
                      padding: '18px',
                      marginBottom: '24px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
                      <ShieldCheck size={18} />
                      <span>Alibaba Trade Assurance Guaranteed</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#047857', lineHeight: '18px' }}>
                      Every RFQ transaction finalized on Alibaba.com is covered by secure payment escrow, verified supplier on-time dispatch guarantee, and 30-day dispute protection.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '14px 0', fontSize: '16px', fontWeight: 800 }}
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
                  background: '#ffffff',
                  borderRadius: '14px',
                  border: '1px solid #e5e7eb',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* RFQ Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', borderBottom: '1px solid #f0f0f0', paddingBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span
                        style={{
                          background: rfq.status === 'Awarded' ? '#ecfdf5' : '#eff6ff',
                          color: rfq.status === 'Awarded' ? '#047857' : '#1d4ed8',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}
                      >
                        ● {rfq.status}
                      </span>
                      <span style={{ fontSize: '12px', color: '#888' }}>RFQ ID: {rfq.id}</span>
                      <span style={{ fontSize: '12px', color: '#888' }}>• Posted: {rfq.createdAt}</span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111' }}>
                      {rfq.title}
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: '#666' }}>Target Quantity:</div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#111' }}>
                      {rfq.quantity.toLocaleString()} {rfq.unit}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '13px', color: '#555', marginBottom: '18px', lineHeight: '20px' }}>
                  {rfq.details}
                </p>

                {/* Received Quotes Section */}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#111', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={16} color="#ff6a00" />
                    <span>Official Supplier Quotations Received ({rfq.quotes?.length || 0}):</span>
                  </div>

                  {rfq.quotes && rfq.quotes.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {rfq.quotes.map(quote => (
                        <div
                          key={quote.id}
                          className="factory-card-grid"
                          style={{
                            background: '#f9fafb',
                            borderRadius: '10px',
                            border: quote.status === 'Accepted' ? '2px solid #059669' : '1px solid #e5e7eb',
                            padding: '16px',
                            alignItems: 'center'
                          }}
                        >
                          {/* Supplier Info */}
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                              <span>{quote.supplier.flag}</span>
                              <strong style={{ fontSize: '13px', color: '#111' }}>{quote.supplier.name}</strong>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <span className="badge-verified">{quote.supplier.years} YRS</span>
                              <span className="badge-trade-assurance">Trade Assurance</span>
                            </div>
                          </div>

                          {/* Quotation Specs */}
                          <div>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '6px', fontSize: '12px' }}>
                              <div>
                                <span style={{ color: '#666' }}>Quoted Unit Price: </span>
                                <strong style={{ color: '#ff6a00', fontSize: '15px' }}>{formatPrice(quote.unitPrice)}</strong>
                              </div>
                              <div>
                                <span style={{ color: '#666' }}>Sample: </span>
                                <strong>{formatPrice(quote.samplePrice)}</strong>
                              </div>
                              <div>
                                <span style={{ color: '#666' }}>Lead Time: </span>
                                <strong>{quote.leadTimeDays} days</strong>
                              </div>
                            </div>
                            <p style={{ fontSize: '11px', color: '#555', fontStyle: 'italic' }}>
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
                                  borderRadius: '6px',
                                  textAlign: 'center'
                                }}
                              >
                                ✓ Quotation Accepted
                              </div>
                            ) : (
                              <button
                                onClick={() => acceptRFQQuote(rfq.id, quote.id)}
                                className="btn-primary"
                                style={{ padding: '7px 0', fontSize: '12px' }}
                              >
                                Accept &amp; Start Order
                              </button>
                            )}

                            <button
                              onClick={() => startChatWithSupplier(quote.supplierId, undefined, `Inquiring regarding your quote for RFQ #${rfq.id}: ${rfq.title}`)}
                              className="btn-secondary"
                              style={{ padding: '6px 0', fontSize: '12px' }}
                            >
                              <MessageSquare size={12} />
                              <span>Negotiate with Supplier</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', fontSize: '12px', color: '#666' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {rfqs.map(rfq => (
              <div
                key={rfq.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '16px' }}>{rfq.buyerFlag}</span>
                    <span style={{ fontWeight: 700, color: '#333', fontSize: '13px' }}>{rfq.buyerName}</span>
                    <span style={{ color: '#888', fontSize: '12px' }}>({rfq.buyerCountry})</span>
                    <span style={{ fontSize: '11px', background: '#f3f4f6', padding: '1px 6px', borderRadius: '4px' }}>
                      {rfq.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#111', marginBottom: '6px' }}>
                    {rfq.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Target: {rfq.quantity.toLocaleString()} {rfq.unit} • Terms: {rfq.tradeTerms} • {rfq.quotesReceivedCount} Quotes Submitted
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      showToast('Supplier Portal Required', 'To submit a supplier quote, sign in with a Gold Supplier account.', 'info');
                    }}
                    className="btn-primary"
                    style={{ padding: '8px 18px', fontSize: '13px' }}
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
