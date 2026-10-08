import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import {
  MessageSquare,
  Send,
  Building2,
  Paperclip,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  Search,
  ChevronRight,
  Smile,
  FileText,
  ExternalLink,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';

export const MessagesPage: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    formatPrice,
    addToCart,
    showToast,
    currentUser
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText);
    setInputText('');
  };

  const handleQuickNegotiate = (text: string) => {
    if (!activeConv) return;
    sendMessage(activeConv.id, text);
  };

  const filteredConversations = conversations.filter(c =>
    c.supplier.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{ padding: '24px 0 60px 0', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>
            <Link to="/" style={{ color: '#64748b' }}>Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Supplier Trade Messenger</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', marginBottom: '2px' }}>
                Supplier Trade Messenger &amp; Inquiries
              </h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Direct real-time negotiations with verified Gold Supplier factory representatives.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#059669', background: '#ecfdf5', padding: '6px 14px', borderRadius: '20px', border: '1px solid #a7f3d0' }}>
              <ShieldCheck size={16} />
              <span style={{ fontWeight: 700 }}>Trade Assurance Quotations Protected</span>
            </div>
          </div>
        </div>

        {/* Messenger Container */}
        <div className="messenger-layout">
          
          {/* Left Conversations Sidebar */}
          <div
            style={{
              borderRight: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              minHeight: 0
            }}
          >
            {/* Sidebar Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                Supplier Chats ({conversations.length})
              </div>

              {/* Search Filter */}
              <div style={{ position: 'relative' }}>
                <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '9px' }} />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder="Search supplier..."
                  style={{
                    width: '100%',
                    padding: '6px 10px 6px 30px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12px',
                    background: '#f8fafc',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Conversation List */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filteredConversations.map(conv => {
                const isSelected = activeConv?.id === conv.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    style={{
                      padding: '14px 16px',
                      cursor: 'pointer',
                      background: isSelected ? '#fff5eb' : '#ffffff',
                      borderLeft: isSelected ? '3px solid #ff6600' : '3px solid transparent',
                      borderBottom: '1px solid #f1f5f9',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img
                        src={conv.supplier.avatar}
                        alt={conv.supplier.name}
                        style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-1px',
                          right: '-1px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#10b981',
                          border: '2px solid #fff'
                        }}
                      />
                    </div>

                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <span style={{ fontSize: '13px', fontWeight: isSelected ? 800 : 600, color: '#0f172a' }} className="truncate">
                          {conv.supplier.name}
                        </span>
                        <span style={{ fontSize: '10px', color: '#94a3b8', flexShrink: 0, marginLeft: '4px' }}>
                          {conv.lastTimestamp}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }} className="truncate">
                        {conv.lastMessage}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Main Active Chat Window */}
          {activeConv ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                minHeight: 0,
                background: '#ffffff',
                overflow: 'hidden'
              }}
            >
              {/* Chat Header */}
              <div
                style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#ffffff',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={activeConv.supplier.avatar}
                    alt={activeConv.supplier.name}
                    style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                        {activeConv.supplier.name}
                      </span>
                      <span className="badge-verified">{activeConv.supplier.years} YRS</span>
                      <span className="badge-trade-assurance">Trade Assurance</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
                      <span>Online • Response time: {activeConv.supplier.responseTime} • {activeConv.supplier.city} ({activeConv.supplier.flag})</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to="/manufacturers"
                    className="btn-secondary"
                    style={{ padding: '5px 12px', fontSize: '11px' }}
                  >
                    <Building2 size={13} />
                    <span>Factory Profile</span>
                  </Link>

                  <Link
                    to="/rfq"
                    className="btn-secondary"
                    style={{ padding: '5px 12px', fontSize: '11px', borderColor: '#ff6600', color: '#ff6600' }}
                  >
                    <FileText size={13} />
                    <span>Request Quotation</span>
                  </Link>
                </div>
              </div>

              {/* Scrollable Message Feed Area */}
              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  background: '#f8fafc'
                }}
              >
                {activeConv.messages.map(msg => {
                  const isBuyer = msg.senderId === 'buyer';
                  return (
                    <div
                      key={msg.id}
                      style={{
                        display: 'flex',
                        justifyContent: isBuyer ? 'flex-end' : 'flex-start',
                        gap: '10px'
                      }}
                    >
                      {!isBuyer && (
                        <img
                          src={msg.avatar}
                          alt=""
                          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginTop: '2px' }}
                        />
                      )}

                      <div style={{ maxWidth: '75%' }}>
                        <div
                          style={{
                            padding: '12px 16px',
                            borderRadius: isBuyer ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                            background: isBuyer ? '#ff6600' : '#ffffff',
                            color: isBuyer ? '#ffffff' : '#0f172a',
                            fontSize: '13px',
                            lineHeight: '20px',
                            boxShadow: 'var(--shadow-xs)',
                            border: isBuyer ? 'none' : '1px solid #e2e8f0'
                          }}
                        >
                          {msg.text}

                          {/* Official Quotation Offer Card in chat */}
                          {msg.isQuoteOffer && msg.quoteDetails && (
                            <div
                              style={{
                                marginTop: '12px',
                                padding: '14px',
                                background: '#fff9f4',
                                border: '1.5px solid #fed7aa',
                                borderRadius: '10px',
                                color: '#0f172a'
                              }}
                            >
                              <div style={{ fontSize: '11px', color: '#c2410c', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <ShieldCheck size={14} color="#059669" />
                                <span>OFFICIAL SUPPLIER TRADE ASSURANCE QUOTATION OFFER</span>
                              </div>
                              <div style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span>Quantity: <strong>{msg.quoteDetails.qty} pcs</strong></span>
                                <span>Unit Price: <strong style={{ color: '#ff6600' }}>{formatPrice(msg.quoteDetails.unitPrice)}</strong></span>
                              </div>
                              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '12px' }}>
                                <span>Air Freight DDP: <strong>{formatPrice(msg.quoteDetails.shippingCost)}</strong> ({msg.quoteDetails.leadTime})</span>
                              </div>
                              <button
                                onClick={() => {
                                  addToCart(PRODUCTS[0], msg.quoteDetails!.qty, undefined, {
                                    notes: 'Direct negotiation quotation accepted from messenger'
                                  });
                                  showToast('Quotation Added to Cart', `Added ${msg.quoteDetails!.qty} pcs at wholesale price to your cart.`, 'success');
                                }}
                                className="btn-primary"
                                style={{ width: '100%', padding: '8px 0', fontSize: '13px' }}
                              >
                                Accept Quote &amp; Add to Cart
                              </button>
                            </div>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: '10px',
                            color: '#94a3b8',
                            marginTop: '4px',
                            textAlign: isBuyer ? 'right' : 'left'
                          }}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Negotiation Prompt Chips */}
              <div
                style={{
                  padding: '8px 16px',
                  background: '#ffffff',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  gap: '6px',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, alignSelf: 'center' }}>
                  Quick Inquiries:
                </span>
                {[
                  'Can you send me a paid evaluation sample?',
                  'Can you offer a volume discount for 1000 units?',
                  'What is the DDP air shipping transit time?',
                  'Please share your factory ISO9001 and CE audit report'
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickNegotiate(chip)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '16px',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      fontSize: '11px',
                      color: '#334155',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#ff6600';
                      e.currentTarget.style.color = '#ff6600';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.color = '#334155';
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Rigid Sticky Bottom Input Form */}
              <form
                onSubmit={handleSend}
                style={{
                  padding: '12px 16px',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  background: '#ffffff',
                  flexShrink: 0
                }}
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Type your negotiation message, specifications, or inquiry..."
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: '24px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0, flexShrink: 0 }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', height: '100%' }}>
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
