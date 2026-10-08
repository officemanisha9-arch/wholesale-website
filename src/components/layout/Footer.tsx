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
    <footer style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb', marginTop: '60px' }}>
      {/* 1. TRADE ASSURANCE PILLARS TOP BANNER */}
      <div style={{ background: '#f8f9fb', borderBottom: '1px solid #e5e7eb', padding: '36px 0' }}>
        <div className="container">
          <div className="grid-cols-4-responsive" style={{ gap: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#e6f7ef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={26} color="#0d824d" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
                  Safe & Easy Payments
                </h4>
                <p style={{ fontSize: '12px', color: '#666', lineHeight: '18px' }}>
                  Payments held in escrow and released only when you confirm receipt and inspect quality.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#fff3e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <RotateCcw size={26} color="#ff6a00" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
                  Money-Back Policy
                </h4>
                <p style={{ fontSize: '12px', color: '#666', lineHeight: '18px' }}>
                  Claim a full or partial refund if products differ from specifications or arrive damaged.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Clock size={26} color="#2563eb" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
                  Guaranteed On-Time Dispatch
                </h4>
                <p style={{ fontSize: '12px', color: '#666', lineHeight: '18px' }}>
                  Receive a 10% cash compensation if dispatch is delayed beyond the agreed timeline.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#f5f3ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Headphones size={26} color="#7c3aed" />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
                  After-Sales Protections
                </h4>
                <p style={{ fontSize: '12px', color: '#666', lineHeight: '18px' }}>
                  Dedicated 24/7 arbitration team with 30-day extended claims for wholesale buyers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 5-COLUMN LINK DIRECTORY */}
      <div style={{ padding: '48px 0', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container">
          <div className="footer-links-grid" style={{ fontSize: '13px' }}>
            {/* Col 1 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
                Customer Services
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '9px', color: '#666' }}>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Help Center & FAQs</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Report Abuse & Violations</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Open a Dispute Case</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Trade Policies & Rules</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Submit Sourcing Feedback</Link></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
                About Alibaba.com
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '9px', color: '#666' }}>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>About Alibaba.com</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Alibaba Group Overview</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Sourcing Blog & Insights</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Investor Relations</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Legal Notice & Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
                Source on Alibaba.com
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '9px', color: '#666' }}>
                <li><Link to="/products" style={{ color: '#555' }}>All Product Categories</Link></li>
                <li><Link to="/rfq" style={{ color: '#555' }}>Request for Quotation (RFQ)</Link></li>
                <li><Link to="/products" search={{ rts: true } as any} style={{ color: '#555' }}>Ready to Ship (RTS)</Link></li>
                <li><Link to="/manufacturers" style={{ color: '#555' }}>Verified Factory Directory</Link></li>
                <li><Link to="/ai-sourcing" style={{ color: '#ff6a00', fontWeight: 600 }}>Accio AI Sourcing Agent</Link></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
                Sell on Alibaba.com
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '9px', color: '#666' }}>
                <li><Link to="/sell" style={{ color: '#555' }}>Gold Supplier Membership</Link></li>
                <li><Link to="/sell" style={{ color: '#555' }}>Verified Supplier Audits</Link></li>
                <li><Link to="/sell" style={{ color: '#555' }}>Seller Learning Academy</Link></li>
                <li><Link to="/sell" style={{ color: '#555' }}>Partner Program</Link></li>
                <li><Link to="/sell" style={{ color: '#555' }}>Download Supplier Mobile App</Link></li>
              </ul>
            </div>

            {/* Col 5 */}
            <div>
              <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
                Trade Services
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '9px', color: '#666' }}>
                <li><Link to="/buyer-central" style={{ color: '#0d824d', fontWeight: 600 }}>Trade Assurance Protection</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Alibaba Verified Logistics</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Production QA Inspection</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>Letter of Credit Services</Link></li>
                <li><Link to="/buyer-central" style={{ color: '#555' }}>US / EU Tax Exemption</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 3. APP DOWNLOAD & REGIONAL FOOTER BAR */}
      <div style={{ padding: '24px 0', background: '#f8f9fa', fontSize: '12px', color: '#666' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontWeight: 700, color: '#333' }}>Download Alibaba Apps:</span>
            <span
              style={{
                background: '#fff',
                border: '1px solid #ddd',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 600,
                color: '#222'
              }}
            >
              📱 App Store
            </span>
            <span
              style={{
                background: '#fff',
                border: '1px solid #ddd',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 600,
                color: '#222'
              }}
            >
              🤖 Google Play
            </span>
            <span
              style={{
                background: '#fff3e8',
                border: '1px solid #fed7aa',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 600,
                color: '#ff6a00'
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
                background: '#fff',
                border: '1px solid #d1d5db',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#333'
              }}
            >
              <Globe size={14} color="#ff6a00" />
              <span>Location: {country.name} ({country.flag})</span>
              <span>• Currency: {currency}</span>
              <span style={{ color: '#ff6a00' }}>Change</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. ECOSYSTEM & COPYRIGHT */}
      <div style={{ background: '#111827', color: '#9ca3af', padding: '24px 0', fontSize: '11px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '10px' }}>
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
          <div style={{ color: '#6b7280', lineHeight: '18px' }}>
            © 1999-2026 Alibaba.com. All rights reserved. Intellectual Property Protection - Privacy Policy - Terms of Use - User Information Legal Enquiry Guide.
          </div>
        </div>
      </div>
    </footer>
  );
};
