import React from 'react';
import { Link } from '@tanstack/react-router';
import { Award, Building2, ShieldCheck, CheckCircle2, ArrowRight, Video, FileCheck } from 'lucide-react';
import { SUPPLIERS } from '../../data/suppliers';
import { useApp } from '../../context/AppContext';

export const VerifiedManufacturersFloor: React.FC = () => {
  const { startChatWithSupplier, setContactSupplierData } = useApp();
  const topSuppliers = SUPPLIERS.slice(0, 4);

  return (
    <section style={{ marginBottom: '40px' }}>
      <div className="container">
        {/* Floor Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge-verified">
                <Award size={12} /> VERIFIED FACTORY DIRECT
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
                Connect with 34,000+ Inspected Super-Factories
              </h2>
            </div>
            <p style={{ fontSize: '13.5px', color: '#64748b' }}>
              Audited on-site by world-leading inspection agencies (TUV Rheinland, SGS, Intertek). Guaranteed capacity and verified ISO export certifications.
            </p>
          </div>

          <Link
            to="/manufacturers"
            style={{
              color: '#ff6600',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
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
                borderRadius: '18px',
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
              {/* Banner / Factory Video Image */}
              <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
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
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '10.5px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Video size={11} />
                  <span>360° VR Tour</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  {/* Supplier Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <img
                      src={sup.avatar}
                      alt={sup.name}
                      style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                    />
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }} className="truncate">
                        {sup.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '1px' }}>
                        <span>{sup.flag}</span>
                        <span>{sup.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Years */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span className="badge-verified" style={{ fontSize: '10px', padding: '2px 7px' }}>{sup.years} YRS Verified</span>
                    <span className="badge-trade-assurance" style={{ fontSize: '10px', padding: '2px 7px' }}>Trade Assurance</span>
                  </div>

                  {/* Production Stats Table */}
                  <div
                    style={{
                      background: '#f8fafc',
                      borderRadius: '10px',
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
                      <span style={{ color: '#64748b' }}>Response:</span>
                      <span style={{ fontWeight: 700, color: '#059669' }}>{sup.responseRate}</span>
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
                    style={{ padding: '7px 0', fontSize: '12px', borderRadius: '10px' }}
                  >
                    Send RFQ
                  </button>
                  <button
                    onClick={() => startChatWithSupplier(sup.id, undefined, `Hello! We would like to inquire about your factory's OEM capabilities.`)}
                    className="btn-secondary"
                    style={{ padding: '7px 0', fontSize: '12px', borderRadius: '10px' }}
                  >
                    Live Chat
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
