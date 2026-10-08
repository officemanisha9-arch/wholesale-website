import React, { useState } from 'react';
import {
  X,
  User,
  Lock,
  Mail,
  Building,
  CheckCircle2,
  Briefcase,
  Store,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/categories';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, loginUser, showToast } = useApp();
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [accountType, setAccountType] = useState<'buyer' | 'supplier'>('buyer');

  const [email, setEmail] = useState('alex.wright@globalnexus.com');
  const [password, setPassword] = useState('TradeAssurance2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('Alexander Wright');
  const [companyName, setCompanyName] = useState('Nexus Global Imports LLC');
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (accountType === 'supplier') {
        loginUser('Supplier');
      } else {
        loginUser('VIP Pro Buyer');
      }
      setAuthModalOpen(false);
    }, 600);
  };

  const handleDemoLogin = (role: 'VIP Pro Buyer' | 'Verified Buyer' | 'Supplier') => {
    loginUser(role);
    setAuthModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setAuthModalOpen(false)}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          width: '520px',
          maxWidth: '94vw',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 0,
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.45)'
        }}
      >
        {/* MODAL HEADER WITH ORANGE BRAND ACCENT */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ff6600 0%, #ea580c 100%)',
            padding: '24px 28px',
            color: '#ffffff',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>
                Alibaba<span style={{ color: '#0f172a' }}>.com</span>
              </div>
              <span style={{ fontSize: '10px', background: '#0f172a', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                GLOBAL B2B
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#ffedd5', margin: 0 }}>
              {tab === 'signin' ? 'Sign in to access Trade Assurance wholesale escrow' : 'Create free account to source from 200K+ factories'}
            </p>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.2)',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '24px 28px' }}>
          
          {/* TAB SWITCHER */}
          <div
            style={{
              display: 'flex',
              background: '#f1f5f9',
              padding: '4px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}
          >
            <button
              type="button"
              onClick={() => setTab('signin')}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: tab === 'signin' ? 800 : 600,
                color: tab === 'signin' ? '#ff6600' : '#64748b',
                background: tab === 'signin' ? '#ffffff' : 'transparent',
                boxShadow: tab === 'signin' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setTab('register')}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: tab === 'register' ? 800 : 600,
                color: tab === 'register' ? '#ff6600' : '#64748b',
                background: tab === 'register' ? '#ffffff' : 'transparent',
                boxShadow: tab === 'register' ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Join Free
            </button>
          </div>

          {/* ROLE SELECTOR */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '18px' }}>
            <div
              onClick={() => setAccountType('buyer')}
              style={{
                border: accountType === 'buyer' ? '1.5px solid #ff6600' : '1px solid #e2e8f0',
                background: accountType === 'buyer' ? '#fff5eb' : '#ffffff',
                padding: '10px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Briefcase size={16} color={accountType === 'buyer' ? '#ff6600' : '#64748b'} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: accountType === 'buyer' ? '#ff6600' : '#0f172a' }}>
                  Wholesale Buyer
                </div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>Import &amp; RFQs</div>
              </div>
            </div>

            <div
              onClick={() => setAccountType('supplier')}
              style={{
                border: accountType === 'supplier' ? '1.5px solid #ff6600' : '1px solid #e2e8f0',
                background: accountType === 'supplier' ? '#fff5eb' : '#ffffff',
                padding: '10px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Store size={16} color={accountType === 'supplier' ? '#ff6600' : '#64748b'} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: accountType === 'supplier' ? '#ff6600' : '#0f172a' }}>
                  Manufacturer
                </div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>Sell &amp; Quotations</div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {tab === 'register' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                    Full Contact Name:
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                    Company / Organization:
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                    <input
                      type="text"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '3px' }}>
                Business Email:
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                  Password:
                </label>
                {tab === 'signin' && (
                  <button
                    type="button"
                    onClick={() => showToast('Password Link Dispatched', 'Password reset instructions sent to ' + email, 'info')}
                    style={{ fontSize: '11px', color: '#ff6600', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 34px 8px 34px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', top: '9px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{ width: '100%', padding: '11px 0', fontSize: '14px', fontWeight: 800, marginTop: '6px' }}
            >
              <span>{isLoading ? 'Authenticating...' : tab === 'signin' ? 'Sign In to Alibaba.com' : 'Join Free as Enterprise Member'}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* ONE-CLICK DEMO LOGIN BUTTONS */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, marginBottom: '8px' }}>
              ⚡ ONE-CLICK DEMO LOGIN:
            </div>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => handleDemoLogin('VIP Pro Buyer')}
                style={{
                  background: '#fff5eb',
                  border: '1px solid #fed7aa',
                  color: '#ff6600',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '5px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                👑 VIP Buyer
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('Verified Buyer')}
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#1d4ed8',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '5px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                🛡️ Verified
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('Supplier')}
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '5px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                🏭 Gold Supplier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
