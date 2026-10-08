import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { X, Camera, UploadCloud, Search, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PRODUCTS } from '../../data/products';

export const ImageSearchModal: React.FC = () => {
  const navigate = useNavigate();
  const { isImageSearchModalOpen, setImageSearchModalOpen, setSearchQuery } = useApp();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  if (!isImageSearchModalOpen) return null;

  const sampleImages = [
    { title: 'Smart Watch AMOLED', image: PRODUCTS[0].images[0], query: 'Smart Watch' },
    { title: 'French Terry Hoodie', image: PRODUCTS[1].images[0], query: 'Hoodie' },
    { title: 'Fiber Laser Cutter', image: PRODUCTS[2].images[0], query: 'Laser Cutting' },
    { title: 'Luxury Rigid Box', image: PRODUCTS[3].images[0], query: 'Rigid Box' },
    { title: '40oz Vacuum Tumbler', image: PRODUCTS[6].images[0], query: 'Tumbler' },
    { title: 'TOPCon Solar Panel', image: PRODUCTS[7].images[0], query: 'Solar Panel' }
  ];

  const handleSelectSample = (sample: typeof sampleImages[0]) => {
    setPreviewImage(sample.image);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setImageSearchModalOpen(false);
      setSearchQuery(sample.query);
      navigate({ to: '/products', search: { q: sample.query } as any });
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setImageSearchModalOpen(false);
        setSearchQuery('Smart Watch');
        navigate({ to: '/products', search: { q: 'Smart Watch' } as any });
      }, 1500);
    }
  };

  return (
    <div className="modal-backdrop" onClick={() => setImageSearchModalOpen(false)}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ width: '620px', maxWidth: '94vw', padding: '32px', borderRadius: '24px', boxShadow: 'var(--shadow-xl)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff5eb', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Camera size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Alibaba Lens Visual Sourcing
            </h3>
          </div>
          <button
            onClick={() => setImageSearchModalOpen(false)}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-app)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '20px' }}>
          Upload or drag & drop a product photo, sketch, or competitor link to find direct OEM/ODM manufacturers with identical molds and wholesale tier pricing.
        </p>

        {/* Upload Zone */}
        <label
          style={{
            border: '2px dashed #fed7aa',
            borderRadius: '16px',
            background: 'var(--bg-app)',
            padding: '36px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginBottom: '24px',
            position: 'relative',
            transition: 'all 0.2s ease'
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />

          {isAnalyzing ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  border: '3px solid #ff6600',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}
              />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#ff6600', fontFamily: 'Outfit, sans-serif' }}>
                AI Visual Recognition Scanning 50M+ Catalog...
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ff6600',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  boxShadow: '0 4px 14px rgba(255, 102, 0, 0.3)'
                }}
              >
                <UploadCloud size={30} />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'Outfit, sans-serif' }}>
                Drop image here, or browse from device
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Supports JPG, PNG, WEBP up to 10MB
              </div>
            </>
          )}
        </label>

        {/* Preset Sample Images */}
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#ff6600" />
            <span>Or try visual search with sample wholesale products:</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {sampleImages.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-app)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#ff6600';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <img
                  src={sample.image}
                  alt={sample.title}
                  style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }} className="truncate">
                    {sample.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#ff6600', fontWeight: 700 }}>
                    Visual Match →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

