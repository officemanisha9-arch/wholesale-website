import React, { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Building2,
  CheckCircle2,
  Truck,
  ArrowRight,
  FileCheck,
  AlertCircle,
  MapPin,
  Plus,
  Tag,
  Check,
  DollarSign,
  Clock,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Package,
  Copy,
  Shield,
  Layers,
  Navigation,
  Anchor,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartSupplierGroups,
    cartCount,
    cartTotal,
    formatPrice,
    createOrderFromCart,
    currentUser,
    country,
    currencyConfig,
    activeDeliveryHub,
    setLocationMapModalOpen,
    detectCurrentLocation,
    showToast
  } = useApp();

  // Active step tracking
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Address State with corporate hubs
  const savedAddresses = [
    {
      id: 'addr-1',
      title: 'Global Headquarters & Primary Receiving Hub',
      tag: 'DEFAULT CORPORATE HUB',
      fullName: currentUser?.name || 'Alexander Wright',
      company: currentUser?.companyName || 'Apex Global Logistics Inc.',
      street: '750 Battery Street, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
      country: country.name,
      phone: '+1 (415) 890-3412',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'West Coast 3PL Distribution Hub',
      tag: 'RECEIVING DOCK #14',
      fullName: 'David Vance (Receiving Manager)',
      company: 'Apex Logistics Distribution West',
      street: '18500 S Western Ave, Dock #14',
      city: 'Torrance',
      state: 'CA',
      zipCode: '90504',
      country: country.name,
      phone: '+1 (310) 555-0198',
      isDefault: false
    }
  ];

  const [selectedAddressId, setSelectedAddressId] = useState<string>(savedAddresses[0].id);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [fullName, setFullName] = useState(currentUser?.name || 'Alexander Wright');
  const [companyName, setCompanyName] = useState(currentUser?.companyName || 'Apex Global Logistics Inc.');
  const [street, setStreet] = useState('750 Battery Street, Suite 400');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zipCode, setZipCode] = useState('94111');
  const [phone, setPhone] = useState('+1 (415) 890-3412');

  const handleDetectGps = async () => {
    setIsDetectingGps(true);
    try {
      const hub = await detectCurrentLocation();
      if (hub) {
        setIsAddingNewAddress(true);
        setCity(hub.city);
        if (hub.state) setState(hub.state);
        if (hub.postalCode) setZipCode(hub.postalCode);
        setStreet(hub.formattedAddress ? hub.formattedAddress.split(',')[0] : `Receiving Facility, ${hub.name}`);
        showToast('Real GPS Address Populated', `📍 ${hub.city}, ${hub.country}`, 'success');
      }
    } finally {
      setIsDetectingGps(false);
    }
  };

  // Step 2: Quality Inspection & Terms
  const [selectedPsiPartner, setSelectedPsiPartner] = useState<'bureau_veritas' | 'tuv' | 'sgs' | 'standard'>('bureau_veritas');
  const [poNumber, setPoNumber] = useState('PO-2026-US-8924');
  const [inspectionNotes, setInspectionNotes] = useState('100% Pre-Shipment Inspection (PSI) required with optical verification before container loading.');

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'wire_transfer' | 'pay_later' | 'paypal'>('credit_card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9021');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [cardName, setCardName] = useState(currentUser?.name ? currentUser.name.toUpperCase() : 'ALEXANDER WRIGHT');

  // Terms and Submission
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Voucher
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(50);
  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const [appliedVoucherLabel, setAppliedVoucherLabel] = useState('GLOBAL-SOURCING-50');

  const presetVouchers = [
    { code: 'ALIBABA100', discount: 100, label: 'VIP $100 Off' },
    { code: 'VIPGLOBAL', discount: 75, label: '$75 Sourcing Off' },
    { code: 'EXPO2026', discount: 50, label: '$50 Expo Off' }
  ];

  const handleApplyPreset = (code: string, discount: number) => {
    setCouponCode(code);
    setAppliedDiscount(discount);
    setIsCouponApplied(true);
    setAppliedVoucherLabel(code);
    showToast('Voucher Applied', `Successfully applied ${code} for $${discount}.00 discount!`, 'success');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'ALIBABA100' || clean === 'GLOBAL100') {
      setAppliedDiscount(100);
      setIsCouponApplied(true);
      setAppliedVoucherLabel(clean);
      showToast('VIP Voucher Applied', 'Successfully applied $100.00 Global Sourcing Discount!', 'success');
    } else {
      setAppliedDiscount(50);
      setIsCouponApplied(true);
      setAppliedVoucherLabel(clean);
      showToast('Coupon Applied', `Code "${clean}" applied with $50.00 volume savings.`, 'info');
    }
  };

  if (cartSupplierGroups.length === 0) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: '24px',
              padding: '60px 32px',
              maxWidth: '520px',
              margin: '0 auto',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: '#fff5eb',
                color: '#ff6600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}
            >
              <Package size={38} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'Outfit, sans-serif' }}>
              No Pending Checkout Items
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '24px' }}>
              Your wholesale order contract queue is empty. Browse verified OEM manufacturers from the showroom.
            </p>
            <Link to="/products" className="btn-primary" style={{ padding: '12px 28px', borderRadius: '12px' }}>
              Browse Wholesale Showroom
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const itemsSubtotal = cartSupplierGroups.reduce((a, g) => a + g.subtotal, 0);
  const shippingSubtotal = cartSupplierGroups.reduce((a, g) => a + g.shippingTotal, 0);
  const finalTotalAmount = Math.max(0, itemsSubtotal + shippingSubtotal - (isCouponApplied ? appliedDiscount : 0));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      showToast('Agreement Required', 'Please accept the Trade Assurance Escrow Agreement to proceed.', 'warning');
      return;
    }

    setIsProcessing(true);

    const activeAddr = savedAddresses.find(a => a.id === selectedAddressId) || {
      fullName,
      street,
      city,
      state,
      zipCode,
      country: country.name,
      phone
    };

    setTimeout(() => {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 }
      });

      const order = createOrderFromCart(
        {
          fullName: activeAddr.fullName,
          street: activeAddr.street,
          city: activeAddr.city,
          state: activeAddr.state,
          zipCode: activeAddr.zipCode,
          country: activeAddr.country,
          phone: activeAddr.phone
        },
        paymentMethod === 'credit_card'
          ? 'Credit Card (Citibank Escrow Secured)'
          : paymentMethod === 'wire_transfer'
          ? 'International T/T Wire (Citibank Escrow)'
          : paymentMethod === 'pay_later'
          ? 'Alibaba Pay Later (Net 60 Financing)'
          : 'PayPal Commercial Verified'
      );

      setIsProcessing(false);
      showToast('Contract Finalized!', `Trade Assurance Order #${order.orderNumber} successfully registered and escrow funded.`, 'success');
      navigate({ to: '/orders' });
    }, 1200);
  };

  return (
    <div style={{ padding: '28px 0 70px 0', background: 'var(--bg-app)', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge-trade-assurance">
                <ShieldCheck size={13} /> Trade Assurance Escrow
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                🔒 256-Bit SSL Encrypted
              </span>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Purchase Order &amp; Trade Assurance Checkout
            </h1>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '12px', boxShadow: 'var(--shadow-xs)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Destination: </span>
            <strong style={{ color: 'var(--text-primary)' }}>{country.flag} {country.name}</strong> • <strong>{currencyConfig.code}</strong> ({currencyConfig.symbol})
          </div>
        </div>

        {/* Step Navigation Pill Bar */}
        <div className="checkout-step-nav" style={{ marginBottom: '24px' }}>
          <div
            className={`checkout-step-item ${currentStep === 1 ? 'active' : 'completed'}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentStep(1)}
          >
            <div className={`checkout-step-badge ${currentStep === 1 ? 'active' : 'completed'}`}>
              {currentStep > 1 ? <Check size={14} /> : '1'}
            </div>
            <span>1. Delivery Destination</span>
          </div>

          <ChevronRight size={14} color="#cbd5e1" />

          <div
            className={`checkout-step-item ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentStep(2)}
          >
            <div className={`checkout-step-badge ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'inactive'}`}>
              {currentStep > 2 ? <Check size={14} /> : '2'}
            </div>
            <span>2. PSI Inspection &amp; PO</span>
          </div>

          <ChevronRight size={14} color="#cbd5e1" />

          <div
            className={`checkout-step-item ${currentStep === 3 ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentStep(3)}
          >
            <div className={`checkout-step-badge ${currentStep === 3 ? 'active' : 'inactive'}`}>
              3
            </div>
            <span>3. Escrow Payment</span>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handlePlaceOrder}>
          <div className="checkout-layout-grid">
            
            {/* Left Column: 3 Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* STEP 1: DELIVERY DESTINATION */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: currentStep === 1 ? '2px solid #ff6600' : '1px solid var(--border-color)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff5eb', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>
                      1
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                      Delivery Receiving Facility &amp; Port
                    </h3>
                  </div>

                  {/* Actions: Map, GPS & Custom Add */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => setLocationMapModalOpen(true)}
                      style={{
                        fontSize: '12px',
                        color: '#ff6600',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#fff5eb',
                        border: '1px solid #fed7aa',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                      title="Open Interactive Map Port Selector"
                    >
                      <Globe size={13} />
                      <span>Choose on Map</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDetectGps}
                      disabled={isDetectingGps}
                      style={{
                        fontSize: '12px',
                        color: '#2563eb',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                      title="Auto-detect using device GPS coordinates"
                    >
                      <Navigation size={13} className={isDetectingGps ? 'pulse-glow' : ''} />
                      <span>{isDetectingGps ? 'Detecting...' : 'Current GPS'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAddingNewAddress(!isAddingNewAddress)}
                      style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <Plus size={14} />
                      <span>{isAddingNewAddress ? 'Saved Hubs' : 'Custom Address'}</span>
                    </button>
                  </div>
                </div>

                {/* ACTIVE LOGISTICS PORT & MAP PREVIEW STRIP */}
                <div
                  style={{
                    background: 'var(--bg-app)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ff6600', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Anchor size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{activeDeliveryHub.flag}</span>
                        <span>{activeDeliveryHub.name}</span>
                        <span style={{ fontSize: '10px', background: '#0f172a', color: '#fff', padding: '1px 6px', borderRadius: '4px' }}>
                          {activeDeliveryHub.portCode}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        📍 {activeDeliveryHub.city}, {activeDeliveryHub.country} • Air: <strong>{activeDeliveryHub.airTransitDays}</strong> | Ocean: <strong>{activeDeliveryHub.oceanTransitDays}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLocationMapModalOpen(true)}
                    style={{ fontSize: '12px', color: '#ff6600', fontWeight: 700, background: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    Change Port on Map →
                  </button>
                </div>

                {!isAddingNewAddress ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {savedAddresses.map(addr => {
                      const isSelected = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => {
                            setSelectedAddressId(addr.id);
                            setCurrentStep(1);
                          }}
                          className={`checkout-card-option ${isSelected ? 'selected' : ''}`}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                              <input
                                type="radio"
                                name="selectedAddress"
                                checked={isSelected}
                                onChange={() => setSelectedAddressId(addr.id)}
                                style={{ accentColor: '#ff6600', marginTop: '3px' }}
                              />
                              <div>
                                <div style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '2px' }}>
                                  {addr.title}
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                  {addr.fullName} • {addr.company}
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                  📍 {addr.street}, {addr.city}, {addr.state} {addr.zipCode}, {addr.country} • Tel: {addr.phone}
                                </div>
                              </div>
                            </div>

                            {isSelected && (
                              <span style={{ color: '#ff6600', fontSize: '12px', fontWeight: 800 }}>
                                ✓ Selected
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="grid-cols-2-responsive" style={{ gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          Contact Full Name:
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          Direct Phone:
                        </label>
                        <input
                          type="text"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        Street Address &amp; Dock #:
                      </label>
                      <input
                        type="text"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>

                    <div className="grid-cols-3-responsive" style={{ gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          City:
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={e => setCity(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          State:
                        </label>
                        <input
                          type="text"
                          value={state}
                          onChange={e => setState(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                          Postal Code:
                        </label>
                        <input
                          type="text"
                          value={zipCode}
                          onChange={e => setZipCode(e.target.value)}
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 2: PSI & COMPLIANCE */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: currentStep === 2 ? '2px solid #ff6600' : '1px solid var(--border-color)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff5eb', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>
                    2
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                    Pre-Shipment Inspection (PSI) &amp; PO Reference
                  </h3>
                </div>

                <div className="grid-cols-2-responsive" style={{ gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Buyer Purchase Order (PO) #:
                    </label>
                    <input
                      type="text"
                      value={poNumber}
                      onChange={e => setPoNumber(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      Trade Terms:
                    </label>
                    <input
                      type="text"
                      value="DDP (Delivered Duty Paid - All Tariffs Included)"
                      readOnly
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px', background: 'var(--bg-app)', color: 'var(--text-secondary)', fontWeight: 600 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    Factory Production Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={inspectionNotes}
                    onChange={e => setInspectionNotes(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '13px', outline: 'none', background: 'var(--bg-app)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>

              {/* STEP 3: PAYMENT METHOD */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: currentStep === 3 ? '2px solid #ff6600' : '1px solid var(--border-color)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fff5eb', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px' }}>
                    3
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                    Trade Assurance Escrow Payment Rail
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  
                  {/* Credit Card */}
                  <div
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`checkout-card-option ${paymentMethod === 'credit_card' ? 'selected' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        style={{ accentColor: '#ff6600' }}
                      />
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Credit / Debit Card</strong>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Visa, MasterCard, Amex • Instant production authorization</div>
                        </div>
                        <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                          INSTANT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* International Wire Transfer */}
                  <div
                    onClick={() => setPaymentMethod('wire_transfer')}
                    className={`checkout-card-option ${paymentMethod === 'wire_transfer' ? 'selected' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'wire_transfer'}
                        onChange={() => setPaymentMethod('wire_transfer')}
                        style={{ accentColor: '#ff6600' }}
                      />
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>International Wire Transfer (T/T via Citibank Escrow)</strong>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Recommended for large orders &gt; $5,000</div>
                        </div>
                        <span style={{ fontSize: '10px', background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                          CITIBANK ESCROW
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pay Later */}
                  <div
                    onClick={() => setPaymentMethod('pay_later')}
                    className={`checkout-card-option ${paymentMethod === 'pay_later' ? 'selected' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="radio"
                        name="payMethod"
                        checked={paymentMethod === 'pay_later'}
                        onChange={() => setPaymentMethod('pay_later')}
                        style={{ accentColor: '#ff6600' }}
                      />
                      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Alibaba Pay Later (Net 60 Business Credit)</strong>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pay 60 days post-dispatch • Available credit: $42,500.00</div>
                        </div>
                        <span style={{ fontSize: '10px', background: '#fdf2f8', color: '#be185d', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                          0% APR NET 60
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Summary */}
            <div style={{ position: 'sticky', top: '24px' }}>
              <div
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '20px',
                  border: '1px solid var(--border-color)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-md)',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                    Contract Summary
                  </h3>
                  <span style={{ fontSize: '11px', background: '#fff5eb', color: '#ff6600', padding: '3px 10px', borderRadius: '999px', fontWeight: 800 }}>
                    {cartSupplierGroups.length} Factory Dispatch
                  </span>
                </div>

                {/* Voucher preset chips */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {presetVouchers.map(v => (
                      <button
                        key={v.code}
                        type="button"
                        onClick={() => handleApplyPreset(v.code, v.discount)}
                        className="voucher-chip-btn"
                        style={{
                          background: couponCode === v.code ? '#fff5eb' : 'var(--bg-app)',
                          borderColor: couponCode === v.code ? '#ff6600' : 'var(--border-color)',
                          color: couponCode === v.code ? '#ff6600' : 'var(--text-secondary)',
                          borderRadius: '8px',
                          padding: '4px 10px'
                        }}
                      >
                        <Sparkles size={11} color="#ff6600" />
                        <span>{v.label}</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      placeholder="Voucher Code: ALIBABA100"
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '12px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '12px', borderRadius: '8px' }}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '14px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Wholesale Subtotal ({cartCount} units):</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(itemsSubtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Door Freight (DDP):</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatPrice(shippingSubtotal)}</span>
                  </div>
                  {isCouponApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 700 }}>
                      <span>VIP Voucher Discount:</span>
                      <span>-{formatPrice(appliedDiscount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontSize: '12px' }}>
                    <span>Trade Assurance Escrow:</span>
                    <span style={{ fontWeight: 800 }}>FREE ($0.00)</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid var(--border-color)', paddingTop: '14px', marginTop: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>Total Escrow Value:</span>
                    <span style={{ fontSize: '24px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                      {formatPrice(finalTotalAmount)}
                    </span>
                  </div>
                </div>

                {/* Agreement */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '16px', lineHeight: '18px' }}>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={e => setAcceptTerms(e.target.checked)}
                    style={{ accentColor: '#ff6600', marginTop: '2px' }}
                  />
                  <span>
                    I accept the <strong>Trade Assurance Escrow Agreement</strong> and supplier on-time dispatch guarantee.
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px 0',
                    fontSize: '15px',
                    fontWeight: 800,
                    borderRadius: '12px'
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Lock size={16} />
                      <span>Locking Citibank Escrow...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Confirm &amp; Fund Escrow</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="trade-guarantee-box" style={{ borderRadius: '16px' }}>
                <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: '#065f46', fontSize: '12px' }}>
                  <ShieldCheck size={16} color="#059669" />
                  <span>Buyer Protection Guaranteed</span>
                </div>
                <div style={{ fontSize: '11px', color: '#047857', lineHeight: '18px' }}>
                  • 100% money back if goods not as agreed<br />
                  • 10% refund on late supplier shipments
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
