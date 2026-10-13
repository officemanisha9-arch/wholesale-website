import React from 'react';
import { Link } from '@tanstack/react-router';
import { Award, Building2, ShieldCheck, CheckCircle2, ArrowRight, Video, FileCheck, Star, MessageSquare } from 'lucide-react';
import { SUPPLIERS } from '../../data/suppliers';
import { useApp } from '../../context/AppContext';

export const VerifiedManufacturersFloor: React.FC = () => {
  const { startChatWithSupplier, setContactSupplierData } = useApp();
  const topSuppliers = SUPPLIERS.slice(0, 4);

  return (
    <section style={{ marginBottom: '44px' }}>
      <div className="container">
        {/* Floor Header */}
        <div className="section-header-responsive">
          <div className="section-header-content">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
              <span className="badge-verified">
                <Award size={13} color="#ff5500" /> VERIFIED FACTORY DIRECT
              </span>
              <h2 style={{ fontSize: 'clamp(20px, 4.5vw, 26px)', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', margin: 0, lineHeight: 1.25 }}>
                Connect with 34,000+ Inspected Super-Factories
              </h2>
            </div>
            <p style={{ fontSize: '13.5px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
              Audited on-site by world-leading inspection agencies (TÜV Rheinland, SGS, Intertek). Guaranteed capacity and verified ISO export certifications.
            </p>
          </div>

          <Link
            to="/manufacturers"
            className="section-header-link"
          >
            <span>Explore Factory Directory</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 4 Supplier Showcase Cards */}
        <div className="grid-cols-4-responsive">
          {topSuppliers.map(sup => (
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
                transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
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
              {/* Banner / Factory Video Image */}
              <div style={{ height: '130px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={sup.bannerImage}
                  alt={sup.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 800,
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
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  {/* Supplier Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <img
                      src={sup.avatar}
                      alt={sup.name}
                      style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                    />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a' }} className="truncate">
                        {sup.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '1px' }}>
                        <span>{sup.flag}</span>
                        <span>{sup.city}</span>
                        <span style={{ color: '#059669', fontWeight: 700 }}>• {sup.responseRate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Years */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span className="badge-verified" style={{ fontSize: '10px', padding: '2px 8px' }}>{sup.years} YRS Verified</span>
                    <span className="badge-trade-assurance" style={{ fontSize: '10px', padding: '2px 8px' }}>Trade Assurance</span>
                  </div>

                  {/* Production Stats Table */}
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      fontSize: '11.5px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                      marginBottom: '12px',
                      border: '1px solid #f1f5f9'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Floor Space:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{sup.floorSpace}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Staff:</span>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{sup.employees}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748b' }}>Export Ratio:</span>
                      <span style={{ fontWeight: 700, color: '#0284c7' }}>92% Global DDP</span>
                    </div>
                  </div>

                  {/* Customization Capabilities */}
                  <div style={{ fontSize: '11.5px', color: '#475569', marginBottom: '14px', lineHeight: '16px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>OEM: </span>
                    {sup.customizationCapabilities.slice(0, 2).join(', ')}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => setContactSupplierData({ supplier: sup })}
                    className="btn-primary"
                    style={{ padding: '8px 0', fontSize: '12px', borderRadius: '10px' }}
                  >
                    Send RFQ
                  </button>
                  <button
                    onClick={() => startChatWithSupplier(sup.id, undefined, `Hello! We would like to inquire about your factory's OEM capabilities.`)}
                    className="btn-secondary"
                    style={{ padding: '8px 0', fontSize: '12px', borderRadius: '10px' }}
                  >
                    <MessageSquare size={13} />
                    <span>Live Chat</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
