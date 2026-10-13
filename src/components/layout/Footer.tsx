import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  ShieldCheck,
  RotateCcw,
  Clock,
  Headphones,
  Smartphone,
  CreditCard,
  Truck,
  CheckCircle,
  Globe,
  ExternalLink,
  Lock,
  Boxes,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrencyModalOpen, country, currency } = useApp();

  return (
    <footer style={{ background: '#090e17', borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '72px', color: '#cbd5e1' }}>
      
      {/* 1. TRADE ASSURANCE PILLARS TOP BANNER */}
      <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '44px 0' }}>
        <div className="container">
          <div className="grid-cols-4-responsive" style={{ gap: '24px' }}>
            
            {/* Pillar 1 */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '20px',
                borderRadius: '18px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={24} color="#10b981" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '4px', fontFamily: 'Outfit, sans-serif' }}>
                  Citibank Escrow Security
                </h4>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '18px', margin: 0 }}>
                  Funds locked safely in neutral escrow and released only after physical QA signoff.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '20px',
                borderRadius: '18px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(255, 85, 0, 0.15)',
                  border: '1px solid rgba(255, 85, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <RotateCcw size={24} color="#ff5500" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '4px', fontFamily: 'Outfit, sans-serif' }}>
                  100% Money-Back Policy
                </h4>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '18px', margin: 0 }}>
                  Full claim refund protection if delivered cargo deviates from golden sample specs.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '20px',
                borderRadius: '18px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(2, 132, 199, 0.15)',
                  border: '1px solid rgba(2, 132, 199, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Clock size={24} color="#38bdf8" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '4px', fontFamily: 'Outfit, sans-serif' }}>
                  On-Time Dispatch Guarantee
                </h4>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '18px', margin: 0 }}>
                  Receive automatic 10% credit coupon if factory dispatch exceeds contracted timeline.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '20px',
                borderRadius: '18px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Headphones size={24} color="#818cf8" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '4px', fontFamily: 'Outfit, sans-serif' }}>
                  24/7 Global Arbitration
                </h4>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '18px', margin: 0 }}>
                  Dedicated multi-lingual trade dispute officers with rapid 48-hour case resolutions.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. MAIN 5-COLUMN LINK DIRECTORY */}
      <div style={{ padding: '56px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div className="footer-links-grid" style={{ fontSize: '13px' }}>
            
            {/* Col 1 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'Outfit, sans-serif' }}>
                Customer Support
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Buyer Help Center</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Trade Policies &amp; Rules</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Open an Escrow Claim</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Report Supplier Non-compliance</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Submit Product Feedback</Link></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'Outfit, sans-serif' }}>
                About SOURCEGRID
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Our Global Mission</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Verified Factory Standards</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Supply Chain Intelligence</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Careers &amp; Press</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Privacy &amp; Security</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'Outfit, sans-serif' }}>
                Source on SOURCEGRID
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link to="/products" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>All Wholesale Catalogs</Link></li>
                <li><Link to="/rfq" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Request for Quotation (RFQ)</Link></li>
                <li><Link to="/products" search={{ rtsOnly: true } as any} style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Ready to Ship (RTS)</Link></li>
                <li><Link to="/manufacturers" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Verified Factory Directory</Link></li>
                <li><Link to="/ai-sourcing" style={{ color: '#818cf8', fontWeight: 700 }}>GridAI Sourcing Studio</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'Outfit, sans-serif' }}>
                Supplier Hub
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link to="/sell" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Supplier Portal</Link></li>
                <li><Link to="/sell" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Verified Plant On-Site Audit</Link></li>
                <li><Link to="/sell" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Export Growth Academy</Link></li>
                <li><Link to="/sell" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Global Logistics API</Link></li>
                <li><Link to="/sell" style={{ color: '#ff5500', fontWeight: 700 }}>Become a Verified Supplier</Link></li>
              </ul>
            </div>

            {/* Col 5 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#ffffff', marginBottom: '18px', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'Outfit, sans-serif' }}>
                Trade Assurance
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link to="/buyer-central" style={{ color: '#34d399', fontWeight: 700 }}>Citibank Escrow Protocol</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>DDP Freight Guarantee</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>On-Site Quality Inspections</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Letters of Credit (L/C)</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#94a3b8' }} onMouseEnter={e => e.currentTarget.style.color = '#ff5500'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>Customs Tariffs Assistance</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* 3. APP DOWNLOAD & REGIONAL FOOTER BAR */}
      <div style={{ padding: '24px 0', background: 'rgba(0, 0, 0, 0.4)', fontSize: '12.5px', color: '#94a3b8' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          {/* Mobile Apps & Extension */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: '#ffffff' }}>SOURCEGRID Sourcing Apps:</span>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '4px 12px',
                borderRadius: '8px',
                fontWeight: 600,
                color: '#e2e8f0'
              }}
            >
              📱 iOS App
            </span>
            <span
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '4px 12px',
                borderRadius: '8px',
                fontWeight: 600,
                color: '#e2e8f0'
              }}
            >
              🤖 Android App
            </span>
            <span
              style={{
                background: 'rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                padding: '4px 12px',
                borderRadius: '8px',
                fontWeight: 700,
                color: '#a5b4fc'
              }}
            >
              ✨ GridAI CAD Extension
            </span>
          </div>

          {/* Regional Switcher button */}
          <div>
            <button
              onClick={() => setCurrencyModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                padding: '7px 16px',
                borderRadius: '24px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ff5500')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
            >
              <Globe size={15} color="#ff5500" />
              <span>Location: {country.name} ({country.flag})</span>
              <span>• Currency: {currency}</span>
              <span style={{ color: '#ff5500', fontWeight: 700 }}>Change</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. ECOSYSTEM & COPYRIGHT */}
      <div style={{ background: '#05080f', color: '#64748b', padding: '24px 0', fontSize: '12px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'linear-gradient(135deg, #ff5500 0%, #ea580c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Boxes size={13} color="#ffffff" />
            </div>
            <strong style={{ color: '#ffffff', fontSize: '13px', letterSpacing: '0.4px', fontFamily: 'Outfit, sans-serif' }}>
              SOURCEGRID GLOBAL B2B SOURCING OS
            </strong>
          </div>
          <div style={{ color: '#64748b', lineHeight: '18px' }}>
            © 2026 SOURCEGRID Inc. All rights reserved. Citibank Escrow Protected • ISO9001 Certified Exporters • TÜV Rheinland Verified Factory Standards.
          </div>
        </div>
      </div>
    </footer>
  );
};
