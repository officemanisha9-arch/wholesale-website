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
  ArrowRight
} from 'lucide-react';

export const BuyerCentralPage: React.FC = () => {
  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)',
            borderRadius: '16px',
            padding: '40px',
            color: '#ffffff',
            marginBottom: '36px',
            boxShadow: '0 10px 25px rgba(6, 78, 59, 0.3)'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '12px',
                marginBottom: '12px'
              }}
            >
              <ShieldCheck size={14} />
              <span>ALIBABA.COM BUYER CENTRAL</span>
            </div>

            <h1
              style={{
                fontSize: '34px',
                fontWeight: 800,
                lineHeight: '1.2',
                marginBottom: '12px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Source with Confidence: The Complete Trade Assurance Guide
            </h1>

            <p style={{ fontSize: '15px', color: '#a7f3d0', lineHeight: '22px', marginBottom: '24px' }}>
              Every transaction completed through Alibaba.com is covered by our end-to-end buyer protection program, protecting your money from factory deposit to final warehouse delivery.
            </p>

            <Link
              to="/products"
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '15px', background: '#ffffff', color: '#064e3b' }}
            >
              <span>Explore Trade Assurance Showroom</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid-cols-4-responsive" style={{ marginBottom: '40px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <ShieldCheck size={26} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
              1. Payment Escrow
            </h3>
            <p style={{ fontSize: '12px', color: '#666', lineHeight: '18px' }}>
              Your funds are held in secure escrow by Citibank. Suppliers only receive payment after you inspect and accept the shipment.
            </p>
          </div>

          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#fff7ed', color: '#ff6a00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <RotateCcw size={26} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
              2. Money-Back Guarantee
            </h3>
            <p style={{ fontSize: '12px', color: '#666', lineHeight: '18px' }}>
              If product quality deviates from the contract or samples, Alibaba guarantees a 100% refund.
            </p>
          </div>

          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Clock size={26} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
              3. On-Time Dispatch
            </h3>
            <p style={{ fontSize: '12px', color: '#666', lineHeight: '18px' }}>
              Suppliers must ship within the agreed contract date. If delayed, you receive an automated 10% cash compensation.
            </p>
          </div>

          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
              <Headphones size={26} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
              4. 30-Day Claims Team
            </h3>
            <p style={{ fontSize: '12px', color: '#666', lineHeight: '18px' }}>
              Access our specialized international trade dispute team within 30 days of receiving your bulk goods.
            </p>
          </div>
        </div>

        {/* Step-by-step How Sourcing Works */}
        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '36px', border: '1px solid #e5e7eb', marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111', marginBottom: '24px', textAlign: 'center', fontFamily: 'Outfit, sans-serif' }}>
            How Sourcing on Alibaba.com Works in 4 Simple Steps
          </h2>

          <div className="grid-cols-4-responsive" style={{ gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ff6a00', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                1
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>
                Search &amp; Match
              </h4>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Use our search engine, Accio AI, or post an RFQ to match verified OEM manufacturers.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ff6a00', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                2
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>
                Sample &amp; Negotiate
              </h4>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Order pre-production evaluation samples and finalize pricing with live messenger.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ff6a00', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                3
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>
                Contract &amp; Escrow
              </h4>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Sign digital Trade Assurance contract and lock funds safely in escrow.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#059669', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                4
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '6px' }}>
                Inspect &amp; Deliver
              </h4>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Monitor production, receive DDP customs cleared delivery, and release payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
