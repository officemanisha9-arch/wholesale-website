import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, ArrowRight, Bot, Cpu, Zap, Search, Layers, ShieldCheck } from 'lucide-react';

export const AccioAIBanner: React.FC = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');

  const samplePrompts = [
    '500 bamboo wireless chargers with laser engraved logo under $6',
    '1000 heavy 450 GSM French terry blank hoodies with custom woven tags',
    '3000W Fiber Laser sheet metal cutter with European CE certificate'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: '/ai-sourcing' });
  };

  return (
    <div style={{ marginBottom: '36px' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #090d16 0%, #15143a 50%, #290d38 100%)',
            borderRadius: '20px',
            padding: '36px 40px',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg), 0 0 30px rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          {/* Ambient Glow Orbs */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '20%',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(30px)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '10%',
              width: '260px',
              height: '260px',
              background: 'radial-gradient(circle, rgba(255, 102, 0, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
              filter: 'blur(30px)'
            }}
          />

          <div className="accio-grid" style={{ position: 'relative', zIndex: 2 }}>
            {/* Left Prompt Box */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 102, 0, 0.2)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 102, 0, 0.6)',
                  color: '#ff9a4d',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  marginBottom: '12px',
                  letterSpacing: '0.6px'
                }}
              >
                <Sparkles size={12} />
                <span>ACCIO AI SOURCING AGENT</span>
              </div>

              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  lineHeight: '1.25',
                  marginBottom: '10px',
                  fontFamily: 'Outfit, sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                Match Audited OEM Super-Factories in Seconds
              </h2>

              <p style={{ fontSize: '13.5px', color: '#cbd5e1', marginBottom: '20px', lineHeight: '22px' }}>
                Describe your custom wholesale specifications. Accio analyzes materials, estimates BoM target costs, verifies export compliance, and pairs you directly with top factories.
              </p>

              {/* Interactive Prompt Input */}
              <form onSubmit={handleSubmit} style={{ position: 'relative', marginBottom: '14px' }}>
                <input
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="e.g. 500 pcs titanium smart watches with silicone strap and custom retail packaging..."
                  style={{
                    width: '100%',
                    padding: '13px 136px 13px 18px',
                    borderRadius: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    background: 'rgba(255, 255, 255, 0.07)',
                    backdropFilter: 'blur(12px)',
                    color: '#ffffff',
                    fontSize: '13.5px',
                    outline: 'none',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                  }}
                />

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    position: 'absolute',
                    right: '4px',
                    top: '4px',
                    bottom: '4px',
                    padding: '0 20px',
                    fontSize: '13px'
                  }}
                >
                  <Sparkles size={14} />
                  <span>Generate</span>
                </button>
              </form>

              {/* Sample Prompt Chips */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Try Prompts:</span>
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPrompt(p);
                      navigate({ to: '/ai-sourcing' });
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: '16px',
                      padding: '4px 12px',
                      fontSize: '11.5px',
                      color: '#e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 102, 0, 0.25)';
                      e.currentTarget.style.borderColor = '#ff6600';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                      e.currentTarget.style.color = '#e2e8f0';
                    }}
                  >
                    "{p.slice(0, 40)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Right Live AI Stats Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                padding: '22px',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bot size={20} color="#ff6600" />
                  <div style={{ fontSize: '13.5px', fontWeight: 800 }}>Live Sourcing Intelligence</div>
                </div>
                <span className="pulse-dot" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                <span style={{ color: '#94a3b8' }}>Verified Factory Pool:</span>
                <strong style={{ color: '#38bdf8', fontWeight: 700 }}>34,800+ audited plants</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                <span style={{ color: '#94a3b8' }}>Avg RFQ Turnaround:</span>
                <strong style={{ color: '#4ade80', fontWeight: 700 }}>&lt; 3.2 minutes</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px' }}>
                <span style={{ color: '#94a3b8' }}>Trade Assurance Escrow:</span>
                <strong style={{ color: '#fed7aa', fontWeight: 700 }}>100% Protected</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
