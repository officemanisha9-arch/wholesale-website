import React, { useState, useMemo } from 'react';
import { Award, Building2, ShieldCheck, CheckCircle2, MessageSquare, Send, Video, Sparkles, Filter, Search } from 'lucide-react';
import { SUPPLIERS } from '../data/suppliers';
import { useApp } from '../context/AppContext';

export const ManufacturersPage: React.FC = () => {
  const { startChatWithSupplier, setContactSupplierData } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOem, setFilterOem] = useState(false);
  const [filterCleanRoom, setFilterCleanRoom] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const filteredSuppliers = useMemo(() => {
    return SUPPLIERS.filter(sup => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = sup.name.toLowerCase().includes(q);
        const matchCity = sup.city.toLowerCase().includes(q);
        const matchCaps = sup.customizationCapabilities.some(c => c.toLowerCase().includes(q));
        if (!matchName && !matchCity && !matchCaps) return false;
      }
      if (filterOem && !sup.oemOdm) return false;
      if (filterCleanRoom && !sup.cleanRoom) return false;
      if (selectedCountry !== 'all' && sup.countryCode !== selectedCountry) return false;
      return true;
    });
  }, [SUPPLIERS, searchQuery, filterOem, filterCleanRoom, selectedCountry]);

  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            borderRadius: '16px',
            padding: '36px 40px',
            color: '#ffffff',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(90deg, #fa6400, #ff8c00)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '12px',
                marginBottom: '10px'
              }}
            >
              <Award size={12} />
              <span>VERIFIED FACTORY SHOWROOM</span>
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
              Direct OEM &amp; ODM Super-Manufacturer Directory
            </h1>

            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '22px' }}>
              Bypass intermediaries. Partner directly with audited manufacturing facilities holding verified ISO9001, CE, BSCI, and OEKO-TEX compliance reports.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '18px 24px',
            border: '1px solid #e5e7eb',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Search input */}
          <div style={{ position: 'relative', width: '320px' }}>
            <Search size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by factory name or capability..."
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Capability Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filterOem}
                onChange={e => setFilterOem(e.target.checked)}
                style={{ accentColor: '#ff6a00' }}
              />
              <span style={{ fontWeight: 600, color: '#333' }}>OEM / ODM Customization</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filterCleanRoom}
                onChange={e => setFilterCleanRoom(e.target.checked)}
                style={{ accentColor: '#ff6a00' }}
              />
              <span style={{ fontWeight: 600, color: '#333' }}>Clean Room / Dust-Free</span>
            </label>

            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                fontSize: '13px',
                background: '#fff',
                outline: 'none'
              }}
            >
              <option value="all">All Manufacturing Countries</option>
              <option value="CN">China (Shenzhen, Guangzhou, Ningbo)</option>
              <option value="TR">Türkiye (Istanbul, Bursa)</option>
              <option value="VN">Vietnam (Hanoi)</option>
              <option value="DE">Germany (Munich)</option>
            </select>
          </div>
        </div>

        {/* Suppliers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredSuppliers.map(sup => (
            <div
              key={sup.id}
              id={sup.id}
              className="factory-card-grid"
              style={{
                background: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e5e7eb',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#fa6400')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
            >
              {/* Left Video / Factory Photo */}
              <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '170px' }}>
                <img
                  src={sup.bannerImage}
                  alt={sup.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Video size={12} />
                  <span>360° VR Live Audit</span>
                </div>
              </div>

              {/* Middle Profile & Credentials */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Title & Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '20px' }}>{sup.flag}</span>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111' }}>
                      {sup.name}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span className="badge-verified">{sup.years} YRS Gold Supplier</span>
                    <span className="badge-trade-assurance">🛡️ Trade Assurance</span>
                    {sup.oemOdm && <span className="badge-rts">OEM/ODM Certified</span>}
                    {sup.cleanRoom && <span className="badge-us-stock">ISO Clean Room</span>}
                  </div>

                  {/* Production Capacity Highlights */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      background: '#f9fafb',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '12px',
                      marginBottom: '12px'
                    }}
                  >
                    <div>
                      <div style={{ color: '#666', fontSize: '11px' }}>Facility Size:</div>
                      <div style={{ fontWeight: 700, color: '#111' }}>{sup.floorSpace}</div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '11px' }}>Full-time Staff:</div>
                      <div style={{ fontWeight: 700, color: '#111' }}>{sup.employees}</div>
                    </div>
                    <div>
                      <div style={{ color: '#666', fontSize: '11px' }}>Annual Revenue:</div>
                      <div style={{ fontWeight: 700, color: '#111' }}>{sup.annualOutput}</div>
                    </div>
                  </div>

                  {/* Customization capabilities */}
                  <div style={{ fontSize: '12px', color: '#555' }}>
                    <strong style={{ color: '#222' }}>Customization: </strong>
                    {sup.customizationCapabilities.join(' • ')}
                  </div>
                </div>

                {/* Certifications row */}
                <div style={{ display: 'flex', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {sup.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: '#eff6ff',
                        color: '#1e40af',
                        fontSize: '10px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '4px'
                      }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Performance Stats & Actions */}
              <div
                className="factory-card-actions"
                style={{
                  borderLeft: '1px solid #f0f0f0',
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ textAlign: 'right', marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', color: '#666' }}>Response Rate</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>
                      {sup.responseRate}
                    </div>
                    <div style={{ fontSize: '11px', color: '#888' }}>Avg response: {sup.responseTime}</div>
                  </div>

                  <div style={{ fontSize: '11px', color: '#666', textAlign: 'right', marginBottom: '16px' }}>
                    <strong>Main Export Markets:</strong>
                    <div>{sup.mainMarkets[0]}</div>
                    <div>{sup.mainMarkets[1]}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => setContactSupplierData({ supplier: sup })}
                    className="btn-primary"
                    style={{ width: '100%', padding: '9px 0', fontSize: '13px' }}
                  >
                    <Send size={14} />
                    <span>Send Custom RFQ</span>
                  </button>
                  <button
                    onClick={() => startChatWithSupplier(sup.id, undefined, `Hello! We are inquiring about your OEM manufacturing capacity.`)}
                    className="btn-secondary"
                    style={{ width: '100%', padding: '9px 0', fontSize: '13px' }}
                  >
                    <MessageSquare size={14} />
                    <span>Live Factory Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
