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
    <div style={{ padding: '24px 0 60px 0' }}>
      <div className="container">
        {/* Header Hero */}
        <div
          style={{
            background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #3b0764 100%)',
            borderRadius: '16px',
            padding: '36px 40px',
            color: '#ffffff',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(90deg, #fa6400, #ff8c00)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '12px',
                marginBottom: '10px'
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
                marginBottom: '10px',
                fontFamily: 'Outfit, sans-serif'
              }}
            >
              Autonomous B2B Sourcing &amp; Factory Engineering AI
            </h1>

            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '22px' }}>
              Simply describe what you want to create. Accio reverse-engineers the Bill of Materials (BoM), calculates unit cost bounds, and matches verified OEM factories with exact technical capabilities.
            </p>
          </div>
        </div>

        {/* Interactive Prompt Input Box */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            border: '1.5px solid #fed7aa',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '32px'
          }}
        >
          <form onSubmit={handleGenerate}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>
              Describe Your Sourcing Goal or Upload Product Sketch:
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                rows={3}
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1.5px solid #e5e7eb',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#666' }}>
                <span style={{ fontWeight: 600, color: '#ff6a00' }}>Quick Presets:</span>
                {[
                  '1000 Bamboo Wireless Charger Hub',
                  '450 GSM Oversized Streetwear Hoodie',
                  '3000W Fiber Laser Cutting CNC',
                  'Luxury Eco-friendly Rigid Gift Boxes'
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInputPrompt(`I want to source ${preset} with custom branding, low sample lead time, and DDP freight to my port.`)}
                    style={{
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: '#4b5563'
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
                style={{ padding: '10px 24px', fontSize: '14px' }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Analyzing Sourcing Specs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
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
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Cpu size={22} color="#ff6a00" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111' }}>
                AI Bill of Materials (BoM) &amp; Cost Engineering
              </h3>
            </div>

            <div
              style={{
                background: '#fff8f2',
                padding: '14px',
                borderRadius: '8px',
                border: '1px solid #fed7aa',
                marginBottom: '18px'
              }}
            >
              <div style={{ fontSize: '12px', color: '#8d4e1d', fontWeight: 700 }}>PREDICTED PRODUCTION TARGET:</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#ff6a00' }}>
                {analysisResult.targetPriceEst}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Recommended Production Batch: ≥ {analysisResult.recommendedMoq} units
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#222', marginBottom: '10px' }}>
                Decomposed Component Breakdown:
              </h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e5e7eb' }}>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#666' }}>Component</th>
                    <th style={{ padding: '8px', textAlign: 'left', color: '#666' }}>Material &amp; Process</th>
                    <th style={{ padding: '8px', textAlign: 'right', color: '#666' }}>Est. Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResult.materialsBreakdown.map((row: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '10px 8px', fontWeight: 700, color: '#111' }}>{row.component}</td>
                      <td style={{ padding: '10px 8px', color: '#555' }}>{row.material}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 700, color: '#ff6a00' }}>
                        {row.costEst}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#222', marginBottom: '8px' }}>
                Target Regulatory Standards:
              </h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {analysisResult.complianceRequirements.map((c: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      background: '#ecfdf5',
                      color: '#047857',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px'
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
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Building2 size={22} color="#059669" />
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111' }}>
                AI Matched Verified OEM Manufacturers
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {analysisResult.matchedSuppliers.map((match: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    background: '#f9fafb',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{match.supplier.flag}</span>
                        <strong style={{ fontSize: '14px', color: '#111' }}>{match.supplier.name}</strong>
                      </div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '3px' }}>
                        <span className="badge-verified">{match.supplier.years} YRS</span>
                        <span className="badge-trade-assurance">Trade Assurance</span>
                      </div>
                    </div>

                    <div
                      style={{
                        background: '#ecfdf5',
                        color: '#059669',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '12px'
                      }}
                    >
                      {match.matchScore}% Match
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#555', marginBottom: '10px', lineHeight: '18px' }}>
                    {match.highlight}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '12px' }}>
                    <div>
                      <span style={{ color: '#666' }}>Est. Unit Quote: </span>
                      <strong style={{ color: '#ff6a00', fontSize: '15px' }}>{formatPrice(match.unitQuote)}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#666' }}>Sample Lead Time: </span>
                      <strong>{match.sampleDays} Days</strong>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <button
                      onClick={() => startChatWithSupplier(match.supplier.id, undefined, `Hello! We reviewed your factory profile via Accio AI Sourcing for: "${inputPrompt}". Please send sample options.`)}
                      className="btn-primary"
                      style={{ padding: '7px 0', fontSize: '12px' }}
                    >
                      <Zap size={12} />
                      <span>Instant Factory Inquiry</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate({ to: '/manufacturers' });
                      }}
                      className="btn-secondary"
                      style={{ padding: '7px 0', fontSize: '12px' }}
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
              style={{ width: '100%', padding: '12px 0', fontSize: '14px' }}
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
