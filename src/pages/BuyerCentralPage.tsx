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
  Shield
} from 'lucide-react';

export const BuyerCentralPage: React.FC = () => {
  return (
    <div style={{ padding: '28px 0 70px 0', background: 'var(--bg-app)', minHeight: '100vh' }}>
      <div className="container">
        {/* Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
            borderRadius: '24px',
            padding: '44px 48px',
            color: '#ffffff',
            marginBottom: '36px',
            boxShadow: '0 20px 40px -15px rgba(6, 78, 59, 0.4)',
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
              background: 'radial-gradient(circle, rgba(167, 243, 208, 0.25) 0%, rgba(167, 243, 208, 0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ecfdf5',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '999px',
                marginBottom: '14px',
                letterSpacing: '0.4px',
                textTransform: 'uppercase',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <ShieldCheck size={14} />
              <span>Alibaba.com Buyer Central</span>
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
              Source with Confidence: The Complete Trade Assurance Guide
            </h1>

            <p style={{ fontSize: '15px', color: '#a7f3d0', lineHeight: '24px', marginBottom: '28px' }}>
              Every transaction completed through Alibaba.com is covered by our end-to-end buyer protection program, protecting your capital from factory deposit to final warehouse delivery.
            </p>

            <Link
              to="/products"
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '14px', background: '#ffffff', color: '#064e3b', borderRadius: '12px', fontWeight: 800, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
            >
              <span>Explore Trade Assurance Showroom</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid-cols-4-responsive" style={{ marginBottom: '40px', gap: '18px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              1. Payment Escrow
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '20px', margin: 0 }}>
              Your funds are held in secure escrow by Citibank. Suppliers only receive payment after you inspect and accept the shipment.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fff7ed', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <RotateCcw size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              2. Money-Back Guarantee
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '20px', margin: 0 }}>
              If product quality deviates from the contract or samples, Alibaba guarantees a 100% refund.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Clock size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              3. On-Time Dispatch
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '20px', margin: 0 }}>
              Suppliers must ship within the agreed contract date. If delayed, you receive an automated 10% cash compensation.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: '18px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-xs)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <Headphones size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              4. 30-Day Claims Team
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '20px', margin: 0 }}>
              Access our specialized international trade dispute team within 30 days of receiving your bulk goods.
            </p>
          </div>
        </div>

        {/* Step-by-step How Sourcing Works */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '36px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '28px', textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
            How Sourcing on Alibaba.com Works in 4 Simple Steps
          </h2>

          <div className="grid-cols-4-responsive" style={{ gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ff6600', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 4px 12px rgba(255, 102, 0, 0.25)' }}>
                1
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
                Search &amp; Match
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '18px', margin: 0 }}>
                Use our search engine, Accio AI, or post an RFQ to match verified OEM manufacturers.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ff6600', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 4px 12px rgba(255, 102, 0, 0.25)' }}>
                2
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
                Sample &amp; Negotiate
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '18px', margin: 0 }}>
                Order pre-production evaluation samples and finalize pricing with live messenger.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#ff6600', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 4px 12px rgba(255, 102, 0, 0.25)' }}>
                3
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
                Contract &amp; Escrow
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '18px', margin: 0 }}>
                Sign digital Trade Assurance contract and lock funds safely in escrow.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#059669', color: '#fff', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px auto', boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)' }}>
                4
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}>
                Inspect &amp; Deliver
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '18px', margin: 0 }}>
                Monitor production, receive DDP customs cleared delivery, and release payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

