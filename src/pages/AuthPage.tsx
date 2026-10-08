import React, { useState } from 'react';
import { Link, useNavigate, useSearch } from '@tanstack/react-router';
import {
  ShieldCheck,
  Lock,
  Mail,
  Building,
  User,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Globe,
  Briefcase,
  Store,
  Check,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginUser, showToast, country } = useApp();

  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [accountType, setAccountType] = useState<'buyer' | 'supplier'>('buyer');
  
  // Form fields
  const [email, setEmail] = useState('alex.wright@globalnexus.com');
  const [password, setPassword] = useState('TradeAssurance2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('Alexander Wright');
  const [companyName, setCompanyName] = useState('Nexus Global Imports LLC');
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [annualVolume, setAnnualVolume] = useState('$100K - $500K');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Password Strength Calculator
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms && mode === 'register') {
      showToast('Agreement Required', 'Please accept the Alibaba.com Free Membership Agreement.', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (accountType === 'supplier') {
        loginUser('Supplier');
        showToast('Supplier Account Active', `Welcome to the Global Supplier Network, ${companyName}!`, 'success');
        navigate({ to: '/sell' });
      } else {
        loginUser('VIP Pro Buyer');
        showToast('Welcome to Alibaba.com', `Signed in as ${fullName} (${companyName})`, 'success');
        navigate({ to: '/' });
      }
    }, 900);
  };

  const handleDemoLogin = (role: 'VIP Pro Buyer' | 'Verified Buyer' | 'Supplier') => {
    loginUser(role);
    if (role === 'Supplier') {
      navigate({ to: '/sell' });
    } else {
      navigate({ to: '/' });
    }
  };

  return (
    <div style={{ minHeight: '90vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)', padding: '40px 0 80px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glowing ambient orbs */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,102,0,0.15) 0%, rgba(255,102,0,0) 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0) 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 10 }}>
        
        {/* Main Grid Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            background: '#ffffff'
          }}
          className="auth-grid-responsive"
        >
          {/* LEFT HERO / TRUST SHOWCASE PANEL */}
          <div
            style={{
              background: 'linear-gradient(145deg, #ff6600 0%, #ea580c 50%, #c2410c 100%)',
              padding: '48px 36px',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.5px' }}>
                  Alibaba<span style={{ color: '#0f172a' }}>.com</span>
                </div>
                <span style={{ fontSize: '10px', background: '#0f172a', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                  GLOBAL B2B
                </span>
              </div>

              <h2 style={{ fontSize: '28px', fontWeight: 900, lineHeight: '1.25', marginBottom: '14px', fontFamily: 'Outfit, sans-serif' }}>
                {mode === 'signin'
                  ? 'Access Your Global Wholesale Sourcing Portal'
                  : 'Join 40M+ Business Importers & Verified Factories'}
              </h2>

              <p style={{ fontSize: '14px', color: '#ffedd5', lineHeight: '22px', marginBottom: '32px' }}>
                One unified business account for RFQ sourcing bids, pre-shipment inspections, multi-modal container logistics, and Trade Assurance escrow contracts.
              </p>

              {/* Value Bullet Points */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>100% Trade Assurance Escrow</strong>
                    <span style={{ fontSize: '12px', color: '#ffedd5' }}>Funds held safely in Citibank escrow until factory quality inspection passes.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>Accio AI Sourcing Engine</strong>
                    <span style={{ fontSize: '12px', color: '#ffedd5' }}>Direct AI match to 200,000+ verified ISO9001 and CE audited manufacturers.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Globe size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '14px', display: 'block' }}>DDP Door-to-Door Logistics</strong>
                    <span style={{ fontSize: '12px', color: '#ffedd5' }}>All customs duties, tariffs, and port clearances handled transparently.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial / Trust Seal */}
            <div style={{ marginTop: '40px', background: 'rgba(0, 0, 0, 0.15)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <span style={{ color: '#fef08a' }}>★★★★★</span>
                <span style={{ fontSize: '12px', fontWeight: 800 }}>Trusted by 40M+ Enterprises</span>
              </div>
              <p style={{ fontSize: '12px', color: '#ffedd5', margin: 0, fontStyle: 'italic', lineHeight: '18px' }}>
                "Alibaba Trade Assurance reduced our overseas procurement risks to zero. We import 20 containers monthly with full confidence."
              </p>
            </div>
          </div>

          {/* RIGHT INTERACTIVE FORM PANEL */}
          <div style={{ padding: '40px 44px', background: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              
              {/* Tab Switcher: Sign In vs Create Account */}
              <div
                style={{
                  display: 'flex',
                  background: '#f1f5f9',
                  padding: '4px',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: mode === 'signin' ? 800 : 600,
                    color: mode === 'signin' ? '#ff6600' : '#64748b',
                    background: mode === 'signin' ? '#ffffff' : 'transparent',
                    boxShadow: mode === 'signin' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => setMode('register')}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: mode === 'register' ? 800 : 600,
                    color: mode === 'register' ? '#ff6600' : '#64748b',
                    background: mode === 'register' ? '#ffffff' : 'transparent',
                    boxShadow: mode === 'register' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Create Free Account
                </button>
              </div>

              {/* Account Type Selector (Buyer vs Supplier) */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '8px' }}>
                  Select Your Business Profile Role:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  
                  <div
                    onClick={() => setAccountType('buyer')}
                    style={{
                      border: accountType === 'buyer' ? '2px solid #ff6600' : '1px solid #e2e8f0',
                      background: accountType === 'buyer' ? '#fff5eb' : '#ffffff',
                      padding: '12px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: accountType === 'buyer' ? '#ff6600' : '#f1f5f9', color: accountType === 'buyer' ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: accountType === 'buyer' ? '#ff6600' : '#0f172a' }}>
                        Wholesale Buyer
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        Source &amp; Import Goods
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setAccountType('supplier')}
                    style={{
                      border: accountType === 'supplier' ? '2px solid #ff6600' : '1px solid #e2e8f0',
                      background: accountType === 'supplier' ? '#fff5eb' : '#ffffff',
                      padding: '12px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: accountType === 'supplier' ? '#ff6600' : '#f1f5f9', color: accountType === 'supplier' ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Store size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: accountType === 'supplier' ? '#ff6600' : '#0f172a' }}>
                        Manufacturer
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        Sell &amp; Bid on RFQs
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUTH FORM */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Registration Extra Fields */}
                {mode === 'register' && (
                  <>
                    <div className="grid-cols-2-responsive" style={{ gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          Full Name:
                        </label>
                        <div style={{ position: 'relative' }}>
                          <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                          <input
                            type="text"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                            placeholder="Alexander Wright"
                            style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          {accountType === 'buyer' ? 'Company Name:' : 'Factory / Plant Name:'}
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Building size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                          <input
                            type="text"
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}
                            required
                            placeholder={accountType === 'buyer' ? 'Nexus Global Imports LLC' : 'Apex Smart Electronics Co.'}
                            style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid-cols-2-responsive" style={{ gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          Primary Industry:
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={e => setSelectedCategory(e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                        >
                          {CATEGORIES.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                          {accountType === 'buyer' ? 'Annual Sourcing Budget:' : 'Annual Export Capacity:'}
                        </label>
                        <select
                          value={annualVolume}
                          onChange={e => setAnnualVolume(e.target.value)}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                        >
                          <option value="<$50K">&lt; $50,000 USD</option>
                          <option value="$50K - $100K">$50,000 - $100,000 USD</option>
                          <option value="$100K - $500K">$100,000 - $500,000 USD</option>
                          <option value="$500K - $2M">$500,000 - $2,000,000 USD</option>
                          <option value="$2M+">$2,000,000+ USD</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Email Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Business Work Email:
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="alex.wright@globalnexus.com"
                      style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                      Password:
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => showToast('Password Reset', 'Password recovery link dispatched to ' + email, 'info')}
                        style={{ fontSize: '11px', color: '#ff6600', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="Enter secure password"
                      style={{ width: '100%', padding: '9px 36px 9px 36px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '10px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>

                  {/* Password Strength Meter (During Registration) */}
                  {mode === 'register' && (
                    <div style={{ marginTop: '6px' }}>
                      <div style={{ display: 'flex', gap: '4px', height: '4px' }}>
                        {[1, 2, 3, 4].map(level => (
                          <div
                            key={level}
                            style={{
                              flex: 1,
                              borderRadius: '2px',
                              background: level <= strength
                                ? strength === 4 ? '#22c55e' : strength === 3 ? '#3b82f6' : '#eab308'
                                : '#e2e8f0'
                            }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', display: 'block' }}>
                        {strength >= 3 ? '✓ Strong Enterprise Password' : 'Min 8 chars with uppercase, numbers & symbols'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Terms Agreement Checkbox */}
                {mode === 'register' && (
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#475569', cursor: 'pointer', marginTop: '4px' }}>
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={e => setAgreeTerms(e.target.checked)}
                      style={{ accentColor: '#ff6600', marginTop: '2px' }}
                    />
                    <span>
                      I agree to the <strong style={{ color: '#0f172a' }}>Alibaba.com Free Membership Agreement</strong>, Privacy Policy, and Trade Assurance Escrow Terms.
                    </span>
                  </label>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    fontSize: '14px',
                    fontWeight: 800,
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(255, 102, 0, 0.3)'
                  }}
                >
                  <span>
                    {isLoading
                      ? 'Authenticating...'
                      : mode === 'signin'
                      ? accountType === 'buyer' ? 'Sign In as Buyer' : 'Sign In to Seller Workbench'
                      : accountType === 'buyer' ? 'Create Free Buyer Account' : 'Register Factory Showroom'}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            {/* ONE-CLICK TEST DEMO PROFILES */}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px', marginTop: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '10px' }}>
                ⚡ One-Click Instant Demo Login:
              </div>
              
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('VIP Pro Buyer')}
                  style={{
                    background: '#fff5eb',
                    border: '1.5px solid #fed7aa',
                    color: '#ff6600',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '6px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  👑 VIP Pro Buyer
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('Verified Buyer')}
                  style={{
                    background: '#eff6ff',
                    border: '1.5px solid #bfdbfe',
                    color: '#1d4ed8',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '6px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  🛡️ Verified Importer
                </button>

                <button
                  type="button"
                  onClick={() => handleDemoLogin('Supplier')}
                  style={{
                    background: '#f0fdf4',
                    border: '1.5px solid #bbf7d0',
                    color: '#166534',
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '6px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  🏭 Gold Supplier (Apex)
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
