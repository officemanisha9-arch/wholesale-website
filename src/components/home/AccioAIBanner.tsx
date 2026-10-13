import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, ArrowRight, Bot, Cpu, Zap, Search, Layers, ShieldCheck, CheckCircle2, Factory, Terminal } from 'lucide-react';

export const AccioAIBanner: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');

  const samplePrompts = [
    { label: 'Bamboo Wireless Chargers', text: '500 bamboo wireless chargers with laser engraved logo under $6' },
    { label: 'Heavy 450 GSM Hoodies', text: '1000 heavy 450 GSM French terry blank hoodies with custom woven tags' },
    { label: 'Fiber Laser Sheet Metal Cutter', text: '3000W Fiber Laser sheet metal cutter with European CE certificate' },
    { label: 'Custom Anodized CNC Enclosures', text: '2000 precision CNC 6061 aluminum electronics enclosures with matte sandblast finish' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: '/ai-sourcing',
      search: prompt.trim() ? ({ prompt: prompt.trim() } as any) : undefined
    });
  };

  return (
    <div style={{ marginBottom: '40px' }}>
      <div className="container">
        <div className="accio-banner-card">
          {/* Subtle Grid Matrix Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              opacity: 0.8,
              pointerEvents: 'none'
            }}
          />

          <div className="accio-grid" style={{ position: 'relative', zIndex: 5 }}>
            {/* Left Prompt Box */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(99, 102, 241, 0.2)',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  color: '#a5b4fc',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '14px',
                  letterSpacing: '0.6px'
                }}
              >
                <Sparkles size={13} color="#818cf8" />
                <span>GRIDAI SOURCING &amp; BOM ENGINE</span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(20px, 4.5vw, 28px)',
                  fontWeight: 900,
                  lineHeight: '1.25',
                  marginBottom: '12px',
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '-0.02em',
                  color: '#ffffff'
                }}
              >
                Match Audited OEM Super-Factories in Seconds
              </h2>

              <p style={{ fontSize: '13.5px', color: '#cbd5e1', marginBottom: '22px', lineHeight: '22px', maxWidth: '620px' }}>
                Describe custom wholesale specifications or paste technical blueprint requirements. GridAI analyzes materials, estimates target BoM production costs, checks export compliance, and pairs you directly with top verified factories.
              </p>

              {/* Interactive Prompt Input Form */}
              <form onSubmit={handleSubmit} className="accio-input-form">
                <input
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="e.g. 500 pcs titanium smart watches with silicone strap, custom packaging & CE cert..."
                  className="accio-input-field"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.25)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3)';
                  }}
                />

                <button
                  type="submit"
                  className="btn-primary accio-submit-btn"
                >
                  <Sparkles size={14} />
                  <span>Analyze Spec</span>
                </button>
              </form>

              {/* Sample Prompt Chips */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600 }}>Try Prompts:</span>
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(p.text);
                      navigate({ to: '/ai-sourcing', search: { prompt: p.text } as any });
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.07)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      padding: '4px 12px',
                      fontSize: '11.5px',
                      color: '#e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                      e.currentTarget.style.borderColor = '#818cf8';
                      e.currentTarget.style.color = '#c7d2fe';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.color = '#e2e8f0';
                    }}
                  >
                    "{p.label}"
                  </button>
                ))}
              </div>
            </div>

            {/* Right Live AI Stats Card */}
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={18} color="#818cf8" />
                  <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#ffffff' }}>Live Sourcing Intelligence</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#34d399', fontWeight: 700 }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <span>ONLINE</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                <span style={{ color: '#94a3b8' }}>Audited Plant Database:</span>
                <strong style={{ color: '#38bdf8', fontWeight: 700 }}>34,800+ Tier-1 Plants</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                <span style={{ color: '#94a3b8' }}>Avg AI Costing Speed:</span>
                <strong style={{ color: '#10b981', fontWeight: 700 }}>&lt; 2.4 seconds</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                <span style={{ color: '#94a3b8' }}>BoM Estimation Accuracy:</span>
                <strong style={{ color: '#ff8a4c', fontWeight: 700 }}>98.4% Real Factory Delta</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                <span style={{ color: '#94a3b8' }}>SourceGrid Escrow:</span>
                <strong style={{ color: '#c084fc', fontWeight: 700 }}>100% Citibank Protected</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
