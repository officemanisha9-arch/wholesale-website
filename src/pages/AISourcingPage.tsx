import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Sparkles,
  Bot,
  Cpu,
  Layers,
  CheckCircle2,
  Building2,
  ArrowRight,
  ShieldCheck,
  Send,
  Zap,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react';
import { SUPPLIERS } from '../data/suppliers';
import { useApp } from '../context/AppContext';

export const AISourcingPage: React.FC = () => {
  const navigate = useNavigate();
  const { formatPrice, startChatWithSupplier, submitRFQ, showToast } = useApp();

  const [inputPrompt, setInputPrompt] = useState(
    'I want to manufacture 1,000 custom 3-in-1 bamboo wireless charging stations with laser engraved logo, matte black aluminum arm, and luxury gift packaging under $7.00 each.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>({
    productName: '3-in-1 Eco Bamboo Wireless Fast Charging Hub',
    targetPriceEst: '$6.20 - $6.80 / unit',
    recommendedMoq: 500,
    materialsBreakdown: [
      { component: 'Base Enclosure', material: 'FSC Certified 100% Solid Moso Bamboo', costEst: '$1.80' },
      { component: 'Charging Arm & Coils', material: 'Anodized 6063 Aluminum + 3x 15W Qi2 Fast Coils', costEst: '$3.10' },
      { component: 'Logo Customization', material: 'Precision CO2 Laser Engraving', costEst: '$0.30' },
      { component: 'Master Retail Box', material: '1200gsm Rigid Cardboard + Custom EVA Foam Insert', costEst: '$0.90' }
    ],
    complianceRequirements: ['Qi2 Fast Wireless Standard', 'FCC ID Part 15', 'CE Radio Equipment Directive (RED)', 'RoHS 2.0 Lead-Free'],
    matchedSuppliers: [
      {
        supplier: SUPPLIERS[0],
        matchScore: 98,
        unitQuote: 6.50,
        sampleDays: 3,
        productionDays: 14,
        highlight: 'Specialized in smart wireless charging with 11 yrs ISO9001 certified electronics assembly'
      },
      {
        supplier: SUPPLIERS[6],
        matchScore: 94,
        unitQuote: 6.80,
        sampleDays: 2,
        productionDays: 12,
        highlight: 'FSC 100% bamboo CNC woodwork super-plant with export experience to US & EU'
      }
    ]
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('AI Sourcing Match Completed', '2 verified factories with ready tooling molds matched!', 'success');
    }, 1200);
  };

  const handleCreateAutoRFQ = () => {
    submitRFQ({
      title: analysisResult.productName,
      category: 'Consumer Electronics',
      sourcingType: 'Customized Product',
      quantity: 1000,
      unit: 'pieces',
      targetPrice: 6.80,
      destinationCountry: 'United States',
      tradeTerms: 'DDP',
      paymentTerms: 'Trade Assurance',
      details: inputPrompt
    });
    navigate({ to: '/rfq' });
  };

  return (
    <div style={{ padding: '28px 0 70px 0', minHeight: '100vh' }}>
      <div className="container">
        {/* Header Hero */}
        <div
          style={{
            background: 'linear-gradient(135deg, #090d16 0%, #15143a 50%, #290d38 100%)',
            borderRadius: '22px',
            padding: '40px 44px',
            color: '#ffffff',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg), 0 0 30px rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <div style={{ maxWidth: '680px', position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 102, 0, 0.25)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 102, 0, 0.6)',
                color: '#ff9a4d',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '20px',
                marginBottom: '14px',
                letterSpacing: '0.6px'
              }}
            >
              <Sparkles size={12} />
              <span>ACCIO AI SOURCING AGENT</span>
            </div>

            <h1
              style={{
                fontSize: '32px',
                fontWeight: 800,
                lineHeight: '1.25',
                marginBottom: '12px',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Autonomous B2B Sourcing &amp; Factory Engineering AI
            </h1>

            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '22px' }}>
              Describe what you want to create. Accio reverse-engineers the Bill of Materials (BoM), calculates unit cost bounds, and matches verified OEM factories with exact technical capabilities.
            </p>
          </div>
        </div>

        {/* Interactive Prompt Input Box */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '28px',
            border: '1.5px solid #fed7aa',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '36px'
          }}
        >
          <form onSubmit={handleGenerate}>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
              Describe Your Sourcing Goal or Specifications:
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                rows={3}
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1.5px solid #e2e8f0',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  outline: 'none',
                  resize: 'vertical',
                  color: '#0f172a'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#64748b', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, color: '#ff6600' }}>Presets:</span>
                {[
                  '1000 Bamboo Wireless Charger Hub',
                  '450 GSM Oversized Streetwear Hoodie',
                  '3000W Fiber Laser Cutting CNC',
                  'Luxury Rigid Gift Boxes'
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInputPrompt(`I want to source ${preset} with custom branding, low sample lead time, and DDP freight to my port.`)}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      padding: '4px 10px',
                      borderRadius: '14px',
                      fontSize: '11.5px',
                      color: '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff5eb';
                      e.currentTarget.style.color = '#ff6600';
                      e.currentTarget.style.borderColor = '#fed7aa';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="btn-primary"
                style={{ padding: '11px 26px', fontSize: '14px', borderRadius: '12px' }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Analyzing Specs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} />
                    <span>Generate Sourcing Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* AI Analysis Breakdown Output */}
        <div className="rfq-split-grid">
          {/* Left: Engineering Breakdown */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '30px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <Cpu size={22} color="#ff6600" />
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                AI Bill of Materials (BoM) &amp; Cost Engineering
              </h3>
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, #fffbf7 0%, #fff7ed 100%)',
                padding: '16px 20px',
                borderRadius: '14px',
                border: '1px solid #fed7aa',
                marginBottom: '20px'
              }}
            >
              <div style={{ fontSize: '11.5px', color: '#9a3412', fontWeight: 800, letterSpacing: '0.5px' }}>PREDICTED PRODUCTION TARGET:</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#ff6600', fontFamily: 'Outfit, sans-serif', marginTop: '2px' }}>
                {analysisResult.targetPriceEst}
              </div>
              <div style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                Recommended Production Batch: ≥ {analysisResult.recommendedMoq} units
              </div>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                Decomposed Component Breakdown:
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Component</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', color: '#64748b', fontWeight: 700 }}>Material &amp; Process</th>
                    <th style={{ padding: '10px 12px', textAlign: 'right', color: '#64748b', fontWeight: 700 }}>Est. Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResult.materialsBreakdown.map((row: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '11px 12px', fontWeight: 700, color: '#0f172a' }}>{row.component}</td>
                      <td style={{ padding: '11px 12px', color: '#475569' }}>{row.material}</td>
                      <td style={{ padding: '11px 12px', textAlign: 'right', fontWeight: 800, color: '#ff6600' }}>
                        {row.costEst}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                Target Regulatory Standards:
              </h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {analysisResult.complianceRequirements.map((c: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      background: '#ecfdf5',
                      color: '#047857',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid #a7f3d0'
                    }}
                  >
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Matched Verified Factories */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '30px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <Building2 size={22} color="#059669" />
              <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                AI Matched Verified OEM Manufacturers
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {analysisResult.matchedSuppliers.map((match: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '18px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{match.supplier.flag}</span>
                        <strong style={{ fontSize: '14.5px', color: '#0f172a' }}>{match.supplier.name}</strong>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        <span className="badge-verified">{match.supplier.years} YRS</span>
                        <span className="badge-trade-assurance">Trade Assurance</span>
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#ecfdf5',
                        color: '#059669',
                        fontSize: '11.5px',
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '14px',
                        border: '1px solid #a7f3d0'
                      }}
                    >
                      {match.matchScore}% Match
                    </div>
                  </div>

                  <p style={{ fontSize: '12.5px', color: '#475569', marginBottom: '12px', lineHeight: '19px' }}>
                    {match.highlight}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', marginBottom: '14px', background: '#ffffff', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div>
                      <span style={{ color: '#64748b' }}>Unit Quote: </span>
                      <strong style={{ color: '#ff6600', fontSize: '16px', fontFamily: 'Outfit, sans-serif' }}>{formatPrice(match.unitQuote)}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Sample: </span>
                      <strong style={{ color: '#0f172a' }}>{match.sampleDays} Days</strong>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      onClick={() => startChatWithSupplier(match.supplier.id, undefined, `Hello! We reviewed your factory profile via Accio AI Sourcing for: "${inputPrompt}". Please send sample options.`)}
                      className="btn-primary"
                      style={{ padding: '8px 0', fontSize: '12px', borderRadius: '8px' }}
                    >
                      <Zap size={13} />
                      <span>Instant Inquiry</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate({ to: '/manufacturers' });
                      }}
                      className="btn-secondary"
                      style={{ padding: '8px 0', fontSize: '12px', borderRadius: '8px' }}
                    >
                      Audit Showroom
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleCreateAutoRFQ}
              className="btn-dark"
              style={{ width: '100%', padding: '13px 0', fontSize: '14px', borderRadius: '12px' }}
            >
              <Send size={15} />
              <span>Convert AI Sourcing Plan to Public RFQ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
