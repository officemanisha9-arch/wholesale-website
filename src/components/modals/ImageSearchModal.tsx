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
        style={{ width: '600px', padding: '28px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Camera size={22} color="#ff6a00" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111' }}>
              Alibaba Lens Visual Sourcing
            </h3>
          </div>
          <button
            onClick={() => setImageSearchModalOpen(false)}
            style={{ color: '#888', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
          Upload or drag & drop a product photo, sketch, or competitor link to find direct OEM/ODM manufacturers with identical molds and wholesale tier pricing.
        </p>

        {/* Upload Zone */}
        <label
          style={{
            border: '2px dashed #fed7aa',
            borderRadius: '12px',
            background: '#fffaf5',
            padding: '32px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginBottom: '24px',
            position: 'relative'
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />

          {isAnalyzing ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #ff6a00',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}
              />
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#ff6a00' }}>
                AI Visual Recognition Scanning 50M+ Catalog...
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#ff6a00',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(255, 106, 0, 0.3)'
                }}
              >
                <UploadCloud size={28} />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: '4px' }}>
                Drop image here, or browse from computer
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>
                Supports JPG, PNG, WEBP up to 10MB
              </div>
            </>
          )}
        </label>

        {/* Preset Sample Images */}
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#333', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#ff6a00" />
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
                  gap: '8px',
                  padding: '6px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  background: '#fff',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#ff6a00')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}
              >
                <img
                  src={sample.image}
                  alt={sample.title}
                  style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#222' }} className="truncate">
                    {sample.title}
                  </div>
                  <div style={{ fontSize: '10px', color: '#ff6a00', fontWeight: 600 }}>
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
