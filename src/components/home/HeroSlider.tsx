import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Cpu,
  Boxes,
  Layers,
  Package,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export interface PeekSlide {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  accentColor: string;
}

const PEEK_SLIDES: PeekSlide[] = [
  {
    id: 'electronics',
    title: 'Consumer Electronics & Smart Hardware',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=85',
    link: '/products?category=electronics',
    icon: Cpu,
    accentColor: '#ff6600'
  },
  {
    id: 'machinery',
    title: 'Industrial Machinery & Precision CNC',
    category: 'Machinery',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop&q=85',
    link: '/products?category=machinery',
    icon: Boxes,
    accentColor: '#38bdf8'
  },
  {
    id: 'apparel',
    title: 'Custom Apparel & Textile Mills',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=85',
    link: '/products?category=apparel',
    icon: Layers,
    accentColor: '#10b981'
  },
  {
    id: 'home-kitchen',
    title: 'Smart Home & Modern Living Appliances',
    category: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=85',
    link: '/products?category=home-kitchen',
    icon: Package,
    accentColor: '#a855f7'
  },
  {
    id: 'trade-logistics',
    title: 'Trade Assurance & Global Logistics',
    category: 'Trade Escrow',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=85',
    link: '/buyer-central',
    icon: ShieldCheck,
    accentColor: '#f59e0b'
  }
];

const AUTOPLAY_TIME = 4200; // 4.2 seconds

export const HeroSlider: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Monitor screen width for responsive 3D geometry
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth < 1024;

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        setCurrentIndex((prev) => (prev + 1) % PEEK_SLIDES.length);
      } else {
        // Swiped right -> prev
        setCurrentIndex((prev) => (prev === 0 ? PEEK_SLIDES.length - 1 : prev - 1));
      }
    }
    setTouchStartX(null);
  };

  // Autoplay 3D carousel loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PEEK_SLIDES.length);
    }, AUTOPLAY_TIME);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? PEEK_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % PEEK_SLIDES.length);
  };

  return (
    <div
      style={{ position: 'relative', width: '100%', marginBottom: '24px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Coverflow Stage with Real Spatial Depth */}
      <div className="hero-peek-stage">
        {/* Ambient Stage Floor Glow */}
        <div className="hero-3d-floor-glow" />

        {/* 3D Track Container */}
        <div className="hero-peek-track">
          {PEEK_SLIDES.map((slide, idx) => {
            const N = PEEK_SLIDES.length;
            let offset = idx - currentIndex;
            if (offset < -Math.floor(N / 2)) offset += N;
            if (offset > Math.floor(N / 2)) offset -= N;

            const isCenter = offset === 0;
            const SlideIcon = slide.icon;

            // Compute exact 3D Spatial Position & Rotation
            let cardStyle: React.CSSProperties = {
              left: '50%'
            };

            if (offset === 0) {
              // Center Focus Card: Facing camera with high z-elevation
              cardStyle = {
                left: '50%',
                transform: isMobile
                  ? 'translate3d(-50%, 0, 20px) rotateY(0deg) scale(1)'
                  : 'translate3d(-50%, 0, 48px) rotateY(0deg) scale(1)',
                opacity: 1,
                zIndex: 30,
                filter: 'brightness(1) contrast(1)',
                cursor: 'pointer',
                boxShadow:
                  '0 30px 65px -10px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 102, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.22)'
              };
            } else if (offset === 1) {
              // Near Right Card: Peeking neatly, fully within stage bounds
              cardStyle = {
                left: '50%',
                transform: isMobile
                  ? 'translate3d(-34%, 0, -60px) rotateY(-22deg) scale(0.8)'
                  : 'translate3d(-24%, 0, -140px) rotateY(-32deg) scale(0.85)',
                opacity: isMobile ? 0.45 : 0.65,
                zIndex: 20,
                filter: 'brightness(0.6) contrast(0.95)',
                cursor: 'pointer',
                boxShadow: '-15px 20px 45px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              };
            } else if (offset === -1) {
              // Near Left Card: Peeking neatly, fully within stage bounds
              cardStyle = {
                left: '50%',
                transform: isMobile
                  ? 'translate3d(-66%, 0, -60px) rotateY(22deg) scale(0.8)'
                  : 'translate3d(-76%, 0, -140px) rotateY(32deg) scale(0.85)',
                opacity: isMobile ? 0.45 : 0.65,
                zIndex: 20,
                filter: 'brightness(0.6) contrast(0.95)',
                cursor: 'pointer',
                boxShadow: '15px 20px 45px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              };
            } else if (offset === 2) {
              // Far Right Card in deep background (hidden on tablets/mobile)
              cardStyle = {
                left: '50%',
                transform: isTablet
                  ? 'translate3d(0, 0, -300px) scale(0)'
                  : 'translate3d(-14%, 0, -280px) rotateY(-45deg) scale(0.7)',
                opacity: isTablet ? 0 : 0.25,
                zIndex: 10,
                filter: 'brightness(0.35) blur(1px)',
                cursor: 'pointer',
                pointerEvents: isTablet ? 'none' : 'auto',
                display: isTablet ? 'none' : 'block'
              };
            } else if (offset === -2) {
              // Far Left Card in deep background (hidden on tablets/mobile)
              cardStyle = {
                left: '50%',
                transform: isTablet
                  ? 'translate3d(0, 0, -300px) scale(0)'
                  : 'translate3d(-86%, 0, -280px) rotateY(45deg) scale(0.7)',
                opacity: isTablet ? 0 : 0.25,
                zIndex: 10,
                filter: 'brightness(0.35) blur(1px)',
                cursor: 'pointer',
                pointerEvents: isTablet ? 'none' : 'auto',
                display: isTablet ? 'none' : 'block'
              };
            }

            const handleCardClick = (e: React.MouseEvent) => {
              if (isCenter) {
                navigate({ to: slide.link as any });
              } else {
                e.preventDefault();
                goToSlide(idx);
              }
            };

            return (
              <div
                key={slide.id}
                className={`hero-peek-card ${isCenter ? 'center' : ''}`}
                style={cardStyle}
                onClick={handleCardClick}
              >
                {/* Full-bleed crisp 3D panel image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hero-peek-img"
                  loading={isCenter ? 'eager' : 'lazy'}
                />

                {/* Subtle vignette shadow */}
                <div className="hero-peek-vignette" />

                {/* Chic glass pill on active center card */}
                {isCenter && (
                  <div className="hero-peek-chip">
                    <SlideIcon size={13} color={slide.accentColor} />
                    <span>{slide.title}</span>
                    <ArrowRight size={11} color="rgba(255, 255, 255, 0.7)" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="hero-peek-arrow prev"
          aria-label="Previous 3D slide"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          className="hero-peek-arrow next"
          aria-label="Next 3D slide"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Bottom Controls: Expanding Dots & Counter */}
      <div className="hero-peek-controls">
        {/* Pagination Dots */}
        <div className="hero-peek-dots">
          {PEEK_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(idx)}
              className={`hero-peek-dot ${idx === currentIndex ? 'active' : ''}`}
              style={idx === currentIndex ? { background: slide.accentColor } : {}}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Counter & Pause Button */}
        <div className="hero-peek-counter">
          <span>{String(currentIndex + 1).padStart(2, '0')}</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
          <span>{String(PEEK_SLIDES.length).padStart(2, '0')}</span>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '1px 3px',
              display: 'inline-flex',
              alignItems: 'center',
              marginLeft: '2px'
            }}
            title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
          >
            {isPaused ? <Play size={10} color="#ff9e58" /> : <Pause size={10} />}
          </button>
        </div>
      </div>
    </div>
  );
};
