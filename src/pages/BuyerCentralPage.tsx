import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  ShieldCheck,
  RotateCcw,
  Clock,
  Headphones,
  CheckCircle2,
  FileCheck,
  Truck,
  Award,
  DollarSign,
  ArrowRight,
  Shield,
  Lock,
  Boxes
} from 'lucide-react';

export const BuyerCentralPage: React.FC = () => {
  return (
    <div style={{ padding: '28px 0 70px 0', background: 'var(--bg-app)', minHeight: '100vh' }}>
      <div className="container">
        {/* Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #064e3b 100%)',
            borderRadius: '24px',
            padding: '44px 48px',
            color: '#ffffff',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '360px',
              height: '360px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ maxWidth: '700px', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ecfdf5',
                fontSize: '11.5px',
                fontWeight: 800,
                padding: '4px 14px',
                borderRadius: '999px',
                marginBottom: '14px',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <ShieldCheck size={14} />
              <span>SOURCEGRID BUYER PROTECTION HUB</span>
            </div>

            <h1
              style={{
                fontSize: '34px',
                fontWeight: 800,
                lineHeight: '1.2',
                marginBottom: '12px',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.5px'
              }}
            >
              Source with Total Security: The SourceGrid Escrow Protocol
            </h1>

            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '24px', marginBottom: '28px' }}>
              Every wholesale order placed on SOURCEGRID is protected under our Citibank Escrow infrastructure—protecting your capital from factory tooling to final port clearance and QA inspection.
            </p>

            <Link
              to="/products"
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              <span>Explore Protected Products</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid-cols-4-responsive" style={{ marginBottom: '40px', gap: '18px' }}>
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              1. Citibank Escrow
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '20px', margin: 0 }}>
              Your deposit and milestone payments are locked safely in escrow. Suppliers receive funds only after QA inspection passes.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fff5eb', color: '#ff5500', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <RotateCcw size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              2. 100% Refund Guarantee
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '20px', margin: 0 }}>
              If physical bulk goods deviate from approved golden sample specs or tolerance standards, SourceGrid issues a full refund.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Clock size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              3. On-Time Dispatch
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '20px', margin: 0 }}>
              Factories must dispatch cargo by the contract milestone date or you receive an automated 10% cash compensation.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '18px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f5f3ff', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Headphones size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              4. 24/7 Trade Arbitration
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', lineHeight: '20px', margin: 0 }}>
              Access our neutral legal arbitration panel within 30 days of receiving your cargo for immediate settlement.
            </p>
          </div>
        </div>

        {/* Step-by-step How Sourcing Works */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '28px', textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
            How Sourcing on SOURCEGRID Works in 4 Simple Steps
          </h2>

          <div className="grid-cols-4-responsive" style={{ gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ff5500', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 4px 12px rgba(255, 85, 0, 0.25)' }}>
                1
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
                Search &amp; GridAI
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '18px', margin: 0 }}>
                Use our search engine, GridAI BoM estimator, or post an RFQ to match audited OEM manufacturers.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ff5500', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 4px 12px rgba(255, 85, 0, 0.25)' }}>
                2
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
                Sample &amp; Negotiate
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '18px', margin: 0 }}>
                Order pre-production evaluation samples and finalize specifications via encrypted messenger.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ff5500', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 4px 12px rgba(255, 85, 0, 0.25)' }}>
                3
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
                Contract &amp; Escrow
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '18px', margin: 0 }}>
                Sign digital Trade Assurance contract and lock funds safely in Citibank escrow.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#059669', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)' }}>
                4
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
                Inspect &amp; Deliver
              </h4>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '18px', margin: 0 }}>
                Monitor production, receive DDP customs cleared delivery, and release final payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
