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
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrencyModalOpen, country, currency } = useApp();

  return (
    <footer style={{ background: '#ffffff', borderTop: '1px solid var(--border-color)', marginTop: '64px' }}>
      {/* 1. TRADE ASSURANCE PILLARS TOP BANNER */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '40px 0' }}>
        <div className="container">
          <div className="grid-cols-4-responsive" style={{ gap: '28px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(5, 150, 105, 0.15)'
                }}
              >
                <ShieldCheck size={26} color="#059669" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  Safe &amp; Easy Payments
                </h4>
                <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '18px' }}>
                  Payments held in escrow and released only when you confirm receipt and inspect quality.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #fff5eb 0%, #ffedd5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(255, 102, 0, 0.15)'
                }}
              >
                <RotateCcw size={26} color="#ff6600" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  Money-Back Policy
                </h4>
                <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '18px' }}>
                  Claim a full or partial refund if products differ from specifications or arrive damaged.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.15)'
                }}
              >
                <Clock size={26} color="#2563eb" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  Guaranteed On-Time Dispatch
                </h4>
                <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '18px' }}>
                  Receive a 10% cash compensation if dispatch is delayed beyond the agreed timeline.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(124, 58, 237, 0.15)'
                }}
              >
                <Headphones size={26} color="#7c3aed" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                  After-Sales Protections
                </h4>
                <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '18px' }}>
                  Dedicated 24/7 arbitration team with 30-day extended claims for wholesale buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 5-COLUMN LINK DIRECTORY */}
      <div style={{ padding: '52px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
          <div className="footer-links-grid" style={{ fontSize: '13px' }}>
            {/* Col 1 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Customer Services
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748b' }}>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Help Center &amp; FAQs</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Report Abuse &amp; Violations</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Open a Dispute Case</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Trade Policies &amp; Rules</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Submit Sourcing Feedback</Link></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                About Alibaba.com
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748b' }}>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>About Alibaba.com</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Alibaba Group Overview</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Sourcing Blog &amp; Insights</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Investor Relations</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Legal Notice &amp; Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Source on Alibaba.com
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748b' }}>
                <li><Link to="/products" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>All Product Categories</Link></li>
                <li><Link to="/rfq" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Request for Quotation (RFQ)</Link></li>
                <li><Link to="/products" search={{ rts: true } as any} style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Ready to Ship (RTS)</Link></li>
                <li><Link to="/manufacturers" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Verified Factory Directory</Link></li>
                <li><Link to="/ai-sourcing" style={{ color: '#ff6600', fontWeight: 700 }}>Accio AI Sourcing Agent</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Sell on Alibaba.com
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748b' }}>
                <li><Link to="/sell" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Gold Supplier Membership</Link></li>
                <li><Link to="/sell" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Verified Supplier Audits</Link></li>
                <li><Link to="/sell" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Seller Learning Academy</Link></li>
                <li><Link to="/sell" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Partner Program</Link></li>
                <li><Link to="/sell" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Download Supplier Mobile App</Link></li>
              </ul>
            </div>

            {/* Col 5 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Trade Services
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#64748b' }}>
                <li><Link to="/buyer-central" style={{ color: '#059669', fontWeight: 700 }}>Trade Assurance Protection</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Alibaba Verified Logistics</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Production QA Inspection</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>Letter of Credit Services</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#475569' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6600'} onMouseLeave={e => e.currentTarget.style.color = '#475569'}>US / EU Tax Exemption</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. APP DOWNLOAD & REGIONAL FOOTER BAR */}
      <div style={{ padding: '24px 0', background: '#f8fafc', fontSize: '12.5px', color: '#64748b' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>Alibaba Apps:</span>
            <span
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '5px 12px',
                borderRadius: '8px',
                fontWeight: 600,
                color: '#334155',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              📱 App Store
            </span>
            <span
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '5px 12px',
                borderRadius: '8px',
                fontWeight: 600,
                color: '#334155',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              🤖 Google Play
            </span>
            <span
              style={{
                background: '#fff5eb',
                border: '1px solid #fed7aa',
                padding: '5px 12px',
                borderRadius: '8px',
                fontWeight: 700,
                color: '#ff6600'
              }}
            >
              🔍 Alibaba Lens Extension
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
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '7px 16px',
                borderRadius: '24px',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#0f172a',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <Globe size={15} color="#ff6600" />
              <span>Location: {country.name} ({country.flag})</span>
              <span>• Currency: {currency}</span>
              <span style={{ color: '#ff6600', fontWeight: 700 }}>Change</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. ECOSYSTEM & COPYRIGHT */}
      <div style={{ background: '#0b0f19', color: '#94a3b8', padding: '28px 0', fontSize: '11.5px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <span>Alibaba Group</span>
            <span>|</span>
            <span>AliExpress</span>
            <span>|</span>
            <span>1688.com</span>
            <span>|</span>
            <span>Taobao</span>
            <span>|</span>
            <span>Tmall</span>
            <span>|</span>
            <span>Lazada</span>
            <span>|</span>
            <span>Daraz</span>
            <span>|</span>
            <span>Alibaba Cloud</span>
            <span>|</span>
            <span>DingTalk</span>
          </div>
          <div style={{ color: '#64748b', lineHeight: '18px' }}>
            © 1999-2026 Alibaba.com. All rights reserved. Intellectual Property Protection - Privacy Policy - Terms of Use - User Information Legal Enquiry Guide.
          </div>
        </div>
      </div>
    </footer>
  );
};
