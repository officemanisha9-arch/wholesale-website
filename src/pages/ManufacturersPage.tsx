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
    <div style={{ padding: '28px 0 70px 0', minHeight: '100vh' }}>
      <div className="container">
        {/* Header Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #090d16 0%, #1e293b 100%)',
            borderRadius: '22px',
            padding: '40px 44px',
            color: '#ffffff',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
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
              <Award size={12} />
              <span>VERIFIED FACTORY SHOWROOM</span>
            </div>

            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                lineHeight: '1.25',
                marginBottom: '12px',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Direct OEM &amp; ODM Super-Manufacturer Directory
            </h1>

            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '22px' }}>
              Partner directly with audited manufacturing facilities holding verified ISO9001, CE, BSCI, and OEKO-TEX compliance reports with Trade Assurance payment protection.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '16px 24px',
            border: '1px solid #e2e8f0',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          {/* Search input */}
          <div style={{ position: 'relative', width: '340px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by factory name or capability..."
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '13.5px',
                outline: 'none'
              }}
            />
          </div>

          {/* Capability Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filterOem}
                onChange={e => setFilterOem(e.target.checked)}
                style={{ accentColor: '#ff6600', width: '16px', height: '16px' }}
              />
              <span style={{ fontWeight: 600, color: '#334155' }}>OEM / ODM Capabilities</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filterCleanRoom}
                onChange={e => setFilterCleanRoom(e.target.checked)}
                style={{ accentColor: '#ff6600', width: '16px', height: '16px' }}
              />
              <span style={{ fontWeight: 600, color: '#334155' }}>Clean Room Plant</span>
            </label>

            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '12.5px',
                color: '#0f172a',
                fontWeight: 600,
                outline: 'none',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Export Regions</option>
              <option value="CN">🇨🇳 China</option>
              <option value="VN">🇻🇳 Vietnam</option>
              <option value="TR">🇹🇷 Türkiye</option>
              <option value="DE">🇩🇪 Germany</option>
              <option value="JP">🇯🇵 Japan</option>
            </select>
          </div>
        </div>

        {/* 3-Column Factory Cards Grid */}
        <div className="grid-cols-3-responsive">
          {filteredSuppliers.map(sup => (
            <div
              key={sup.id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-xs)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
              }}
            >
              {/* Factory Banner Image */}
              <div style={{ height: '160px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={sup.bannerImage}
                  alt={sup.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Video size={12} />
                  <span>360° VR Tour</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  {/* Supplier Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <img
                      src={sup.avatar}
                      alt={sup.name}
                      style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                    />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }} className="truncate">
                        {sup.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <span>{sup.flag}</span>
                        <span>{sup.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span className="badge-verified">{sup.years} YRS Verified</span>
                    <span className="badge-trade-assurance">Trade Assurance</span>
                  </div>

                  {/* Production Stats Table */}
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      fontSize: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      marginBottom: '14px',
                      border: '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Floor Space:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{sup.floorSpace}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Staff Size:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{sup.employees}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Response:</span>
                      <span style={{ fontWeight: 800, color: '#059669' }}>{sup.responseRate}</span>
                    </div>
                  </div>

                  {/* Customization Capabilities */}
                  <div style={{ fontSize: '12px', color: '#475569', marginBottom: '16px', lineHeight: '18px' }}>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>OEM: </span>
                    {sup.customizationCapabilities.join(', ')}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => setContactSupplierData({ supplier: sup })}
                    className="btn-primary"
                    style={{ padding: '9px 0', fontSize: '13px', borderRadius: '10px' }}
                  >
                    Send RFQ
                  </button>
                  <button
                    onClick={() => startChatWithSupplier(sup.id, undefined, `Hello! We would like to inquire about your factory's OEM capabilities.`)}
                    className="btn-secondary"
                    style={{ padding: '9px 0', fontSize: '13px', borderRadius: '10px' }}
                  >
                    Live Chat
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
