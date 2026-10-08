import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  Store,
  Globe,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Plus,
  Package,
  FileText,
  MessageSquare,
  Building2,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Truck,
  Check,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Settings,
  Send,
  X,
  Upload,
  Calendar,
  BarChart2,
  ShoppingBag,
  Shield,
  HelpCircle,
  CheckCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { Product, Order, RFQRequirement } from '../types';

export const SellerCentralPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    supplierProfile,
    updateSupplierProfile,
    orders,
    updateOrderStatus,
    rfqs,
    submitSellerQuote,
    conversations,
    startChatWithSupplier,
    formatPrice,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'rfqs' | 'inquiries' | 'profile'>('overview');

  // Product Filter State
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('ALL');

  // Add/Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    categoryId: 'electronics',
    categoryName: 'Consumer Electronics',
    subcategoryId: 'smart-electronics',
    unit: 'pieces',
    moq: 50,
    samplePrice: 25.00,
    sampleLeadTimeDays: 5,
    fastDispatchDays: 3,
    readyToShip: true,
    usLocalStock: false,
    customLogoMoq: 100,
    customPackagingMoq: 500,
    graphicCustomizationMoq: 200,
    tier1Qty: 50,
    tier1Price: 15.00,
    tier2Qty: 200,
    tier2Price: 12.50,
    tier3Qty: 500,
    tier3Price: 10.00,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    description: 'Verified factory direct wholesale product with full Trade Assurance order protection, ISO-certified pre-shipment quality inspection, and rapid global DDP air express dispatch.'
  });

  // Quote Submission Modal State
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedRfqForQuote, setSelectedRfqForQuote] = useState<RFQRequirement | null>(null);
  const [quoteUnitPrice, setQuoteUnitPrice] = useState<number>(12.00);
  const [quoteLeadDays, setQuoteLeadDays] = useState<number>(7);
  const [quoteSamplePrice, setQuoteSamplePrice] = useState<number>(30.00);
  const [quoteNotes, setQuoteNotes] = useState('Our factory has reviewed your custom specifications and tooling requirements. We can guarantee 100% optical inspection and Trade Assurance contract terms.');

  // Order Dispatch / Status Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState<Order | null>(null);
  const [orderNewStatus, setOrderNewStatus] = useState<Order['status']>('Waiting Dispatch');
  const [orderCarrier, setOrderCarrier] = useState('DHL Global Forwarding DDP');
  const [orderTrackingNum, setOrderTrackingNum] = useState(`DHL-EXP-${Math.floor(100000000 + Math.random() * 900000000)}`);

  // Factory Profile Edit Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: supplierProfile.name,
    city: supplierProfile.city,
    floorSpace: supplierProfile.floorSpace,
    employees: supplierProfile.employees,
    annualOutput: supplierProfile.annualOutput,
    cleanRoom: supplierProfile.cleanRoom,
    oemOdm: supplierProfile.oemOdm
  });

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.categoryName.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'ALL' || p.categoryId === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Open Create Product Modal
  const handleOpenCreateProduct = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      categoryId: 'electronics',
      categoryName: 'Consumer Electronics',
      subcategoryId: 'smart-electronics',
      unit: 'pieces',
      moq: 50,
      samplePrice: 25.00,
      sampleLeadTimeDays: 5,
      fastDispatchDays: 3,
      readyToShip: true,
      usLocalStock: false,
      customLogoMoq: 100,
      customPackagingMoq: 500,
      graphicCustomizationMoq: 200,
      tier1Qty: 50,
      tier1Price: 15.00,
      tier2Qty: 200,
      tier2Price: 12.50,
      tier3Qty: 500,
      tier3Price: 10.00,
      imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      description: 'Factory direct wholesale manufacturing with ISO pre-shipment inspection and Trade Assurance contract terms.'
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({
      title: prod.title,
      categoryId: prod.categoryId,
      categoryName: prod.categoryName,
      subcategoryId: prod.subcategoryId,
      unit: prod.unit,
      moq: prod.moq,
      samplePrice: prod.samplePrice,
      sampleLeadTimeDays: prod.sampleLeadTimeDays,
      fastDispatchDays: prod.fastDispatchDays || 3,
      readyToShip: prod.readyToShip,
      usLocalStock: prod.usLocalStock,
      customLogoMoq: prod.customLogoMoq || 100,
      customPackagingMoq: prod.customPackagingMoq || 500,
      graphicCustomizationMoq: prod.graphicCustomizationMoq || 200,
      tier1Qty: prod.priceTiers[0]?.minQty || 50,
      tier1Price: prod.priceTiers[0]?.price || 15.00,
      tier2Qty: prod.priceTiers[1]?.minQty || 200,
      tier2Price: prod.priceTiers[1]?.price || 12.50,
      tier3Qty: prod.priceTiers[2]?.minQty || 500,
      tier3Price: prod.priceTiers[2]?.price || 10.00,
      imageUrl: prod.images[0] || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      description: prod.description
    });
    setIsProductModalOpen(true);
  };

  // Save Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceTiers = [
      { minQty: Number(productForm.tier1Qty), price: Number(productForm.tier1Price) },
      { minQty: Number(productForm.tier2Qty), price: Number(productForm.tier2Price) },
      { minQty: Number(productForm.tier3Qty), price: Number(productForm.tier3Price) }
    ];

    const categoryObj = CATEGORIES.find(c => c.id === productForm.categoryId);
    const categoryName = categoryObj?.name || 'Consumer Electronics';

    if (editingProductId) {
      updateProduct(editingProductId, {
        title: productForm.title,
        categoryId: productForm.categoryId,
        categoryName,
        subcategoryId: productForm.subcategoryId,
        unit: productForm.unit,
        moq: Number(productForm.moq),
        samplePrice: Number(productForm.samplePrice),
        sampleLeadTimeDays: Number(productForm.sampleLeadTimeDays),
        fastDispatchDays: Number(productForm.fastDispatchDays),
        readyToShip: productForm.readyToShip,
        usLocalStock: productForm.usLocalStock,
        customLogoMoq: Number(productForm.customLogoMoq),
        customPackagingMoq: Number(productForm.customPackagingMoq),
        graphicCustomizationMoq: Number(productForm.graphicCustomizationMoq),
        priceTiers,
        images: [productForm.imageUrl],
        description: productForm.description
      });
    } else {
      addProduct({
        title: productForm.title,
        categoryId: productForm.categoryId,
        categoryName,
        subcategoryId: productForm.subcategoryId,
        unit: productForm.unit,
        moq: Number(productForm.moq),
        samplePrice: Number(productForm.samplePrice),
        sampleLeadTimeDays: Number(productForm.sampleLeadTimeDays),
        fastDispatchDays: Number(productForm.fastDispatchDays),
        readyToShip: productForm.readyToShip,
        usLocalStock: productForm.usLocalStock,
        customLogoMoq: Number(productForm.customLogoMoq),
        customPackagingMoq: Number(productForm.customPackagingMoq),
        graphicCustomizationMoq: Number(productForm.graphicCustomizationMoq),
        priceTiers,
        images: [productForm.imageUrl],
        description: productForm.description
      });
    }

    setIsProductModalOpen(false);
  };

  // Submit RFQ Quote
  const handleOpenQuoteModal = (rfq: RFQRequirement) => {
    setSelectedRfqForQuote(rfq);
    setQuoteUnitPrice((rfq.targetPrice || 10) * 0.95);
    setQuoteNotes(`Hello ${rfq.buyerName}, we reviewed your RFQ for ${rfq.quantity} ${rfq.unit} of "${rfq.title}". Our factory has active tooling and ISO9001 quality compliance ready for production.`);
    setIsQuoteModalOpen(true);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRfqForQuote) return;

    submitSellerQuote(selectedRfqForQuote.id, {
      unitPrice: quoteUnitPrice,
      leadTimeDays: quoteLeadDays,
      samplePrice: quoteSamplePrice,
      notes: quoteNotes,
      sampleAvailable: true
    });

    setIsQuoteModalOpen(false);
  };

  // Order Dispatch Submit
  const handleOpenOrderModal = (ord: Order) => {
    setSelectedOrderForEdit(ord);
    setOrderNewStatus(ord.status);
    setOrderCarrier(ord.shippingCarrier);
    setOrderTrackingNum(ord.trackingNumber || `ALI-DDP-${Math.floor(100000000 + Math.random() * 900000000)}`);
    setIsOrderModalOpen(true);
  };

  const handleSaveOrderStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForEdit) return;

    updateOrderStatus(selectedOrderForEdit.id, orderNewStatus, orderTrackingNum, orderCarrier);
    setIsOrderModalOpen(false);
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSupplierProfile(profileForm);
    setIsProfileModalOpen(false);
  };

  return (
    <div style={{ padding: '24px 0 80px 0', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        
        {/* TOP SUPPLIER HEADER BAR */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '20px',
            padding: '28px 32px',
            color: '#ffffff',
            marginBottom: '24px',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.25)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={supplierProfile.avatar}
                alt={supplierProfile.name}
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  border: '3px solid #ff6600',
                  boxShadow: '0 4px 12px rgba(255, 102, 0, 0.3)'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  background: '#ff6600',
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 900,
                  padding: '2px 6px',
                  borderRadius: '10px'
                }}
              >
                GOLD
              </span>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '20px' }}>{supplierProfile.flag}</span>
                <h1 style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#ffffff', margin: 0 }}>
                  {supplierProfile.name}
                </h1>
                <span style={{ background: '#059669', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} /> VERIFIED FACTORY
                </span>
                <span style={{ background: '#ff6600', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                  {supplierProfile.years} YRS GOLD SUPPLIER
                </span>
              </div>

              <div style={{ fontSize: '13px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span>📍 {supplierProfile.city}, {supplierProfile.country}</span>
                <span>• Response Rate: <strong style={{ color: '#22c55e' }}>{supplierProfile.responseRate}</strong> ({supplierProfile.responseTime})</span>
                <span>• Escrow Protection: <strong style={{ color: '#38bdf8' }}>$500,000.00 Limit</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleOpenCreateProduct}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Plus size={16} />
              <span>Publish Product</span>
            </button>

            <button
              onClick={() => setIsProfileModalOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Settings size={15} />
              <span>Factory Settings</span>
            </button>

            <Link
              to="/manufacturers"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ExternalLink size={14} />
              <span>Public Showroom</span>
            </Link>
          </div>
        </div>

        {/* WORKBENCH NAVIGATION TABS */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-xs)',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'overview', label: 'Workbench Overview', icon: BarChart2, count: null },
            { id: 'products', label: 'Catalog & Products', icon: Package, count: products.length },
            { id: 'orders', label: 'Trade Assurance Orders', icon: ShoppingBag, count: orders.length },
            { id: 'rfqs', label: 'Live RFQ Sourcing Leads', icon: FileText, count: rfqs.length },
            { id: 'inquiries', label: 'Buyer Chat Inquiries', icon: MessageSquare, count: conversations.length },
            { id: 'profile', label: 'Factory Capabilities & Audit', icon: Building2, count: null }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#ff6600' : '#475569',
                  background: isActive ? '#fff5eb' : 'transparent',
                  border: isActive ? '1px solid #fed7aa' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} color={isActive ? '#ff6600' : '#64748b'} />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    style={{
                      background: isActive ? '#ff6600' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#64748b',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '10px'
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: WORKBENCH OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Top Stat Metrics */}
            <div className="grid-cols-4-responsive" style={{ gap: '16px' }}>
              
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Total Export Turnover</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  $284,500.00
                </div>
                <div style={{ fontSize: '12px', color: '#059669', marginTop: '4px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <TrendingUp size={13} /> +24.8% vs last month
                </div>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Escrow Held Balance</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  $48,250.00
                </div>
                <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '4px', fontWeight: 700 }}>
                  🔒 Releases upon customs clearance
                </div>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Active RFQ Inquiries</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  {rfqs.length} Open Leads
                </div>
                <div style={{ fontSize: '12px', color: '#ea580c', marginTop: '4px', fontWeight: 700 }}>
                  ⚡ Instant matching buyer bids
                </div>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>Store Visitors &amp; Rate</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  184.2K Views
                </div>
                <div style={{ fontSize: '12px', color: '#db2777', marginTop: '4px', fontWeight: 700 }}>
                  ★ 4.9 Rating (428 reviews)
                </div>
              </div>
            </div>

            {/* Quick Actions & Order Dispatch Funnel */}
            <div className="grid-cols-2-responsive" style={{ gap: '24px' }}>
              
              {/* Order Stages Funnel */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                    Factory Order Fulfillment Pipeline
                  </h3>
                  <button onClick={() => setActiveTab('orders')} style={{ fontSize: '12px', color: '#ff6600', fontWeight: 700 }}>
                    View All Orders →
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fef3c7' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Clock size={16} color="#d97706" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>Awaiting Escrow Confirmation</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#92400e' }}>1 Order</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#eff6ff', borderRadius: '10px', border: '1px solid #dbeafe' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Package size={16} color="#2563eb" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e40af' }}>In Production &amp; QA Inspection</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e40af' }}>2 Orders</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #dcfce7' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Truck size={16} color="#16a34a" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#166534' }}>Dispatched / Air Cargo DDP In Transit</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#166534' }}>{orders.length} Orders</span>
                  </div>
                </div>
              </div>

              {/* Latest High-Value RFQ Leads */}
              <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                    Priority Global Buyer RFQs
                  </h3>
                  <button onClick={() => setActiveTab('rfqs')} style={{ fontSize: '12px', color: '#ff6600', fontWeight: 700 }}>
                    Browse All Leads →
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {rfqs.slice(0, 3).map(rfq => (
                    <div
                      key={rfq.id}
                      style={{
                        padding: '12px 14px',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                    >
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                          <span>{rfq.buyerFlag}</span>
                          <strong style={{ fontSize: '13px', color: '#0f172a' }} className="truncate">
                            {rfq.title}
                          </strong>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          Qty: <strong>{rfq.quantity.toLocaleString()} {rfq.unit}</strong> • Target: <strong>${rfq.targetPrice}/unit</strong> • {rfq.tradeTerms}
                        </div>
                      </div>

                      <button
                        onClick={() => handleOpenQuoteModal(rfq)}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
                      >
                        Submit Bid
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Published Products Grid Preview */}
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-xs)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                    Factory Featured Catalog ({products.length} Items Live)
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                    Directly listed in Alibaba.com global wholesale showroom with OEM/ODM tiers.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleOpenCreateProduct} className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Plus size={14} /> Add New Listing
                  </button>
                  <button onClick={() => setActiveTab('products')} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                    Manage Full Catalog
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                {products.slice(0, 4).map(prod => (
                  <div
                    key={prod.id}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: '140px', background: '#f1f5f9', position: 'relative' }}>
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#059669', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                        ACTIVE
                      </span>
                    </div>
                    <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#ff6600', fontWeight: 700, marginBottom: '2px' }}>
                          {prod.categoryName}
                        </div>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px', lineHeight: '18px' }} className="truncate-2">
                          {prod.title}
                        </h4>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#ff6600', marginBottom: '4px' }}>
                          ${prod.priceTiers[0]?.price.toFixed(2)} - ${prod.priceTiers[prod.priceTiers.length - 1]?.price.toFixed(2)} <span style={{ fontSize: '11px', color: '#64748b' }}>/{prod.unit}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          MOQ: <strong>{prod.moq} {prod.unit}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px', marginTop: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="btn-secondary"
                          style={{ flex: 1, padding: '6px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                        >
                          <Edit3 size={12} /> Edit
                        </button>
                        <Link
                          to="/product/$productId"
                          params={{ productId: prod.id }}
                          className="btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          title="View Live Listing"
                        >
                          <Eye size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: 'var(--shadow-xs)' }}>
            
            {/* Catalog Top Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Wholesale Product Management ({products.length} Products)
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  Manage wholesale pricing tiers, MOQ thresholds, custom OEM options and sample dispatch.
                </p>
              </div>

              <button
                onClick={handleOpenCreateProduct}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={16} />
                <span>Publish New Product</span>
              </button>
            </div>

            {/* Filter Row */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: '1 1 300px' }}>
                <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="text"
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  placeholder="Search catalog by title, SKU, or category..."
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 36px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={e => setProductCategoryFilter(e.target.value)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  background: '#ffffff',
                  outline: 'none'
                }}
              >
                <option value="ALL">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Product Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 800 }}>
                    <th style={{ padding: '12px 16px' }}>Product &amp; SKU</th>
                    <th style={{ padding: '12px 16px' }}>Category</th>
                    <th style={{ padding: '12px 16px' }}>MOQ &amp; Unit Price</th>
                    <th style={{ padding: '12px 16px' }}>Sample Info</th>
                    <th style={{ padding: '12px 16px' }}>Badges</th>
                    <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(prod => (
                    <tr key={prod.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s ease' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={prod.images[0]}
                            alt={prod.title}
                            style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e2e8f0' }}
                          />
                          <div style={{ maxWidth: '320px' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a', lineHeight: '18px' }} className="truncate-2">
                              {prod.title}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>
                              ID: {prod.id} • SKU: {prod.variants[0]?.sku || 'SKU-FACTORY-01'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px', color: '#334155', fontWeight: 600 }}>
                        {prod.categoryName}
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: 800, color: '#ff6600' }}>
                          ${prod.priceTiers[0]?.price.toFixed(2)} - ${prod.priceTiers[prod.priceTiers.length - 1]?.price.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          MOQ: {prod.moq} {prod.unit}
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ color: '#0f172a', fontWeight: 600 }}>${prod.samplePrice.toFixed(2)}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{prod.sampleLeadTimeDays} days lead</div>
                      </td>

                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {prod.readyToShip && (
                            <span style={{ fontSize: '10px', background: '#eff6ff', color: '#2563eb', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              RTS
                            </span>
                          )}
                          {prod.usLocalStock && (
                            <span style={{ fontSize: '10px', background: '#fdf2f8', color: '#be185d', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              US Stock
                            </span>
                          )}
                          {prod.alibabaGuaranteed && (
                            <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#059669', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                              Guaranteed
                            </span>
                          )}
                        </div>
                      </td>

                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            onClick={() => handleOpenEditProduct(prod)}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#334155', cursor: 'pointer' }}
                            title="Edit Listing"
                          >
                            <Edit3 size={13} />
                          </button>

                          <Link
                            to="/product/$productId"
                            params={{ productId: prod.id }}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#ffffff', color: '#334155', display: 'flex', alignItems: 'center' }}
                            title="View Product Page"
                          >
                            <Eye size={13} />
                          </Link>

                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #fee2e2', background: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}
                            title="Delete Product"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS & TRADE ASSURANCE DISPATCH */}
        {activeTab === 'orders' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: 'var(--shadow-xs)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Incoming Wholesale Purchase Orders &amp; Contracts ({orders.length})
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  Manage Citibank Trade Assurance escrow orders, dispatch dates, tracking numbers, and PSI inspection reports.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', background: '#ecfdf5', color: '#059669', padding: '6px 12px', borderRadius: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <ShieldCheck size={15} /> 100% Escrow Protected
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map(ord => (
                <div
                  key={ord.id}
                  style={{
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '18px 22px',
                    background: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                          Contract #{ord.orderNumber}
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: ord.status === 'Delivered' ? '#ecfdf5' : ord.status === 'In Transit' ? '#eff6ff' : '#fffbeb',
                            color: ord.status === 'Delivered' ? '#059669' : ord.status === 'In Transit' ? '#2563eb' : '#d97706'
                          }}
                        >
                          {ord.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Buyer: <strong>{ord.shippingAddress.fullName}</strong> • Destination: <strong>{ord.shippingAddress.city}, {ord.shippingAddress.country}</strong> • Placed on: {ord.createdAt}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                        {formatPrice(ord.totalAmount)}
                      </div>
                      <div style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                        ✓ Trade Assurance Escrow Funded
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    {ord.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={item.productImage} alt="" style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.productTitle}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{item.variantName || 'Standard'} • Qty: <strong>{item.quantity} {item.unit}</strong></div>
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: '#334155' }}>
                          {formatPrice(item.unitPrice * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Logistics & Action footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span>Carrier: <strong>{ord.shippingCarrier}</strong></span>
                      <span>Tracking: <strong style={{ color: '#2563eb' }}>{ord.trackingNumber}</strong></span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenOrderModal(ord)}
                        className="btn-primary"
                        style={{ padding: '6px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Truck size={13} />
                        <span>Update Status &amp; Tracking</span>
                      </button>

                      <button
                        onClick={() => {
                          showToast('Contract Downloaded', `Proforma Invoice for ${ord.orderNumber} saved as PDF.`, 'success');
                        }}
                        className="btn-secondary"
                        style={{ padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <FileText size={13} />
                        <span>Proforma Invoice (PI)</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RFQ LEADS FEED & BIDDING */}
        {activeTab === 'rfqs' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: 'var(--shadow-xs)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Live Buyer Request for Quotation (RFQ) Opportunities
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  Verified importers actively looking for factory capacity. Submit custom price quotes and sample terms.
                </p>
              </div>

              <span style={{ fontSize: '12px', background: '#fff5eb', color: '#ff6600', padding: '6px 12px', borderRadius: '20px', fontWeight: 800 }}>
                ⚡ {rfqs.length} Active Sourcing Leads Available
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {rfqs.map(rfq => (
                <div
                  key={rfq.id}
                  style={{
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '14px',
                    padding: '20px',
                    background: '#ffffff',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '20px' }}>{rfq.buyerFlag}</span>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                          {rfq.title}
                        </h4>
                        <span style={{ fontSize: '10px', background: '#0f172a', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                          {rfq.tradeTerms}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Buyer: <strong>{rfq.buyerName}</strong> ({rfq.buyerCountry}) • Posted: {rfq.createdAt} • Sourcing Type: {rfq.sourcingType}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>Required Quantity:</div>
                      <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                        {rfq.quantity.toLocaleString()} {rfq.unit}
                      </div>
                      {rfq.targetPrice && (
                        <div style={{ fontSize: '11px', color: '#059669', fontWeight: 700 }}>
                          Target Price: ${rfq.targetPrice.toFixed(2)}/unit
                        </div>
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: '20px', background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '14px' }}>
                    "{rfq.details}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Quotes Received: <strong>{rfq.quotesReceivedCount} Verified Suppliers</strong> • Payment: <strong>{rfq.paymentTerms}</strong>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenQuoteModal(rfq)}
                        className="btn-primary"
                        style={{ padding: '8px 18px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Send size={14} />
                        <span>Submit Factory Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BUYER CHAT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: 'var(--shadow-xs)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Direct Buyer Messenger &amp; Inquiries ({conversations.length})
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  Real-time Trade Manager chat with international importers requesting sample specs and discounts.
                </p>
              </div>

              <Link to="/messages" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                Open Full Screen Messenger →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    background: '#f8fafc',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '14px',
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#ff6600', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px' }}>
                      {conv.messages[0]?.senderName.charAt(0) || 'B'}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <strong style={{ fontSize: '14px', color: '#0f172a' }}>
                          {conv.messages.find(m => m.senderId === 'buyer')?.senderName || 'Alexander Wright (Buyer)'}
                        </strong>
                        <span style={{ fontSize: '11px', background: '#ecfdf5', color: '#059669', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          VIP Pro Buyer
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }} className="truncate">
                        "{conv.lastMessage}"
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{conv.lastTimestamp}</span>
                    <Link
                      to="/messages"
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                    >
                      Reply Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FACTORY PROFILE & CERTIFICATES AUDIT */}
        {activeTab === 'profile' && (
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: 'var(--shadow-xs)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Verified Manufacturer Audit &amp; Showcase
                </h3>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                  TÜV Rheinland &amp; SGS on-site factory verification certificates and equipment specs.
                </p>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="btn-primary"
                style={{ padding: '8px 18px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Edit3 size={14} /> Edit Factory Data
              </button>
            </div>

            {/* Profile Grid */}
            <div className="grid-cols-2-responsive" style={{ gap: '24px', marginBottom: '24px' }}>
              
              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
                  🏭 Plant &amp; Production Capacity
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Floor Space:</span>
                    <strong style={{ color: '#0f172a' }}>{supplierProfile.floorSpace}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Workforce / Engineers:</span>
                    <strong style={{ color: '#0f172a' }}>{supplierProfile.employees}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Annual Production Value:</span>
                    <strong style={{ color: '#0f172a' }}>{supplierProfile.annualOutput}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Clean Room Facility:</span>
                    <strong style={{ color: supplierProfile.cleanRoom ? '#059669' : '#64748b' }}>
                      {supplierProfile.cleanRoom ? '✓ Class 10,000 Dust-Free Clean Room' : 'Standard Factory'}
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>
                  📜 Verified Quality Certifications
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {supplierProfile.certifications.map(c => (
                    <div
                      key={c}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <CheckCircle2 size={13} color="#059669" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '14px', fontSize: '12px', color: '#059669', fontWeight: 700 }}>
                  ✓ On-Site Verified by TÜV Rheinland &amp; Bureau Veritas
                </div>
              </div>
            </div>

            {/* Customization Capabilities */}
            <div style={{ background: '#fff5eb', border: '1.5px solid #fed7aa', borderRadius: '12px', padding: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#9a3412', marginBottom: '10px' }}>
                🎨 OEM/ODM Customization Capabilities Active for Buyers:
              </h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {supplierProfile.customizationCapabilities.map(cap => (
                  <span
                    key={cap}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #fed7aa',
                      color: '#c2410c',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}
                  >
                    • {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: ADD / EDIT PRODUCT MODAL */}
        {isProductModalOpen && (
          <div className="modal-backdrop" onClick={() => setIsProductModalOpen(false)}>
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
              style={{ width: '800px', maxWidth: '94vw', maxHeight: '90vh', overflowY: 'auto', padding: '28px', borderRadius: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  {editingProductId ? 'Edit Wholesale Product Listing' : 'Publish New Wholesale Product to Catalog'}
                </h3>
                <button onClick={() => setIsProductModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                  <X size={20} color="#64748b" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Title */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Product Title (Include Keywords, Material &amp; Function):
                  </label>
                  <input
                    type="text"
                    value={productForm.title}
                    onChange={e => setProductForm({ ...productForm, title: e.target.value })}
                    required
                    placeholder="e.g. 2026 Ultra AMOLED Smart Watch IP68 Waterproof OEM Custom Logo"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Category & Unit */}
                <div className="grid-cols-2-responsive" style={{ gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Category:
                    </label>
                    <select
                      value={productForm.categoryId}
                      onChange={e => setProductForm({ ...productForm, categoryId: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Packaging Unit:
                    </label>
                    <select
                      value={productForm.unit}
                      onChange={e => setProductForm({ ...productForm, unit: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    >
                      <option value="pieces">pieces</option>
                      <option value="sets">sets</option>
                      <option value="pairs">pairs</option>
                      <option value="meters">meters</option>
                      <option value="cartons">cartons</option>
                    </select>
                  </div>
                </div>

                {/* Price Tiers */}
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    Wholesale Tiered Pricing Matrix ($ USD):
                  </label>
                  <div className="grid-cols-3-responsive" style={{ gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Tier 1 (MOQ):</span>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                        <input
                          type="number"
                          value={productForm.tier1Qty}
                          onChange={e => setProductForm({ ...productForm, tier1Qty: Number(e.target.value), moq: Number(e.target.value) })}
                          placeholder="Min Qty"
                          style={{ width: '50%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.tier1Price}
                          onChange={e => setProductForm({ ...productForm, tier1Price: Number(e.target.value) })}
                          placeholder="$ Price"
                          style={{ width: '50%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Tier 2 (Mid Vol):</span>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                        <input
                          type="number"
                          value={productForm.tier2Qty}
                          onChange={e => setProductForm({ ...productForm, tier2Qty: Number(e.target.value) })}
                          placeholder="Min Qty"
                          style={{ width: '50%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.tier2Price}
                          onChange={e => setProductForm({ ...productForm, tier2Price: Number(e.target.value) })}
                          placeholder="$ Price"
                          style={{ width: '50%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>Tier 3 (Bulk):</span>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                        <input
                          type="number"
                          value={productForm.tier3Qty}
                          onChange={e => setProductForm({ ...productForm, tier3Qty: Number(e.target.value) })}
                          placeholder="Min Qty"
                          style={{ width: '50%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={productForm.tier3Price}
                          onChange={e => setProductForm({ ...productForm, tier3Price: Number(e.target.value) })}
                          placeholder="$ Price"
                          style={{ width: '50%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Product Main Image URL:
                  </label>
                  <input
                    type="url"
                    value={productForm.imageUrl}
                    onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Factory Specs &amp; Wholesale Description:
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                {/* Toggles */}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={productForm.readyToShip}
                      onChange={e => setProductForm({ ...productForm, readyToShip: e.target.checked })}
                      style={{ accentColor: '#ff6600' }}
                    />
                    <span>Ready to Ship (In Stock)</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={productForm.usLocalStock}
                      onChange={e => setProductForm({ ...productForm, usLocalStock: e.target.checked })}
                      style={{ accentColor: '#ff6600' }}
                    />
                    <span>US Warehouse Local Stock</span>
                  </label>
                </div>

                {/* Submit button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="btn-secondary"
                    style={{ padding: '10px 18px', fontSize: '13px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '10px 24px', fontSize: '13px' }}
                  >
                    {editingProductId ? 'Update Product' : 'Publish Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: SUBMIT RFQ QUOTE MODAL */}
        {isQuoteModalOpen && selectedRfqForQuote && (
          <div className="modal-backdrop" onClick={() => setIsQuoteModalOpen(false)}>
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
              style={{ width: '600px', maxWidth: '92vw', padding: '24px', borderRadius: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Submit Formal Factory Quote for RFQ
                </h3>
                <button onClick={() => setIsQuoteModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                  <X size={18} color="#64748b" />
                </button>
              </div>

              <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                  {selectedRfqForQuote.buyerFlag} {selectedRfqForQuote.title}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                  Buyer: {selectedRfqForQuote.buyerName} • Qty: {selectedRfqForQuote.quantity} {selectedRfqForQuote.unit} • Terms: {selectedRfqForQuote.tradeTerms}
                </div>
              </div>

              <form onSubmit={handleSendQuote} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="grid-cols-2-responsive" style={{ gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Factory Unit Price ($ USD):
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={quoteUnitPrice}
                      onChange={e => setQuoteUnitPrice(Number(e.target.value))}
                      required
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Production Lead Time (Days):
                    </label>
                    <input
                      type="number"
                      value={quoteLeadDays}
                      onChange={e => setQuoteLeadDays(Number(e.target.value))}
                      required
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Sample Availability &amp; Cost ($):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={quoteSamplePrice}
                    onChange={e => setQuoteSamplePrice(Number(e.target.value))}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Custom Notes / Technical Specs for Buyer:
                  </label>
                  <textarea
                    rows={3}
                    value={quoteNotes}
                    onChange={e => setQuoteNotes(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsQuoteModalOpen(false)}
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '8px 20px', fontSize: '13px' }}
                  >
                    Transmit Bid Quotation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: ORDER STATUS & TRACKING MODAL */}
        {isOrderModalOpen && selectedOrderForEdit && (
          <div className="modal-backdrop" onClick={() => setIsOrderModalOpen(false)}>
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
              style={{ width: '560px', maxWidth: '92vw', padding: '24px', borderRadius: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Update Trade Assurance Order Dispatch
                </h3>
                <button onClick={() => setIsOrderModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                  <X size={18} color="#64748b" />
                </button>
              </div>

              <form onSubmit={handleSaveOrderStatus} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Production &amp; Shipping Status:
                  </label>
                  <select
                    value={orderNewStatus}
                    onChange={e => setOrderNewStatus(e.target.value as any)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontWeight: 600 }}
                  >
                    <option value="Waiting Payment">Waiting Payment</option>
                    <option value="Waiting Dispatch">Waiting Dispatch (In Factory Production)</option>
                    <option value="In Transit">In Transit (Dispatched via Courier)</option>
                    <option value="Customs Cleared">Customs Cleared (DDP)</option>
                    <option value="Delivered">Delivered &amp; Signed</option>
                    <option value="Completed">Completed (Escrow Released)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Assigned International Carrier:
                  </label>
                  <input
                    type="text"
                    value={orderCarrier}
                    onChange={e => setOrderCarrier(e.target.value)}
                    placeholder="e.g. DHL Global Forwarding, FedEx International Priority"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Air/Ocean Tracking Number:
                  </label>
                  <input
                    type="text"
                    value={orderTrackingNum}
                    onChange={e => setOrderTrackingNum(e.target.value)}
                    placeholder="e.g. DHL-884920194"
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsOrderModalOpen(false)}
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '8px 20px', fontSize: '13px' }}
                  >
                    Save Dispatch Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 4: FACTORY PROFILE EDIT MODAL */}
        {isProfileModalOpen && (
          <div className="modal-backdrop" onClick={() => setIsProfileModalOpen(false)}>
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
              style={{ width: '600px', maxWidth: '92vw', padding: '24px', borderRadius: '16px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Edit Verified Factory Credentials
                </h3>
                <button onClick={() => setIsProfileModalOpen(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                  <X size={18} color="#64748b" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Company Name:
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  />
                </div>

                <div className="grid-cols-2-responsive" style={{ gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Floor Space:
                    </label>
                    <input
                      type="text"
                      value={profileForm.floorSpace}
                      onChange={e => setProfileForm({ ...profileForm, floorSpace: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                      Staff &amp; Engineers:
                    </label>
                    <input
                      type="text"
                      value={profileForm.employees}
                      onChange={e => setProfileForm({ ...profileForm, employees: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsProfileModalOpen(false)}
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '8px 20px', fontSize: '13px' }}
                  >
                    Save Factory Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
