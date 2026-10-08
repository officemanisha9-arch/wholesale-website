import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  Navigation,
  Globe,
  Check,
  Search,
  Truck,
  Plane,
  Anchor,
  ShieldCheck,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Map as MapIcon,
  Satellite,
  Mountain,
  Loader2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GLOBAL_DELIVERY_HUBS } from '../../data/deliveryHubs';
import { COUNTRIES } from '../../data/currencies';
import { DeliveryHub } from '../../types';

export const DeliveryLocationMapModal: React.FC = () => {
  const {
    isLocationMapModalOpen,
    setLocationMapModalOpen,
    activeDeliveryHub,
    setActiveDeliveryHub,
    setCountry,
    detectCurrentLocation,
    setCustomAddressLocation,
    showToast
  } = useApp();

  const [selectedHub, setSelectedHub] = useState<DeliveryHub>(activeDeliveryHub);
  const [searchQuery, setSearchQuery] = useState('');
  const [customSearchLocation, setCustomSearchLocation] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeRegion, setActiveRegion] = useState<'ALL' | 'INDIA' | 'AMERICAS' | 'EUROPE' | 'ASIA_PACIFIC' | 'MIDDLE_EAST'>('ALL');
  
  // Google Map View Controls
  const [mapType, setMapType] = useState<'m' | 'k' | 'p' | 'h'>('m'); // m = roadmap, k = satellite, p = terrain, h = hybrid
  const [zoomLevel, setZoomLevel] = useState<number>(14);

  useEffect(() => {
    if (activeDeliveryHub) {
      setSelectedHub(activeDeliveryHub);
    }
  }, [activeDeliveryHub]);

  if (!isLocationMapModalOpen) return null;

  // Filter hubs based on region
  const filteredHubs = GLOBAL_DELIVERY_HUBS.filter(hub => {
    if (activeRegion === 'INDIA') return hub.countryCode === 'IN';
    if (activeRegion === 'AMERICAS') return hub.countryCode === 'US' || hub.countryCode === 'CA' || hub.countryCode === 'BR';
    if (activeRegion === 'EUROPE') return hub.countryCode === 'NL' || hub.countryCode === 'DE' || hub.countryCode === 'GB' || hub.countryCode === 'FR';
    if (activeRegion === 'ASIA_PACIFIC') return hub.countryCode === 'SG' || hub.countryCode === 'JP' || hub.countryCode === 'AU' || hub.countryCode === 'CN' || hub.countryCode === 'IN';
    if (activeRegion === 'MIDDLE_EAST') return hub.countryCode === 'AE';
    return true;
  });

  const handleUseCurrentLocation = async () => {
    setIsDetectingLocation(true);
    try {
      const hub = await detectCurrentLocation();
      if (hub) {
        setSelectedHub(hub);
        setCustomSearchLocation(null);
        setZoomLevel(15);
      }
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim();

    // 1. Check if query matches a predefined hub
    const matched = GLOBAL_DELIVERY_HUBS.find(h =>
      h.name.toLowerCase().includes(query.toLowerCase()) ||
      h.city.toLowerCase().includes(query.toLowerCase()) ||
      h.country.toLowerCase().includes(query.toLowerCase()) ||
      h.portCode.toLowerCase().includes(query.toLowerCase())
    );

    if (matched) {
      setSelectedHub(matched);
      setCustomSearchLocation(null);
      setZoomLevel(14);
      showToast('Port Located', `Centered on ${matched.name}`, 'info');
      return;
    }

    // 2. Geocode custom search address using OpenStreetMap Nominatim
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`
      );
      if (res.ok) {
        const results = await res.json();
        if (results && results.length > 0) {
          const item = results[0];
          const lat = parseFloat(item.lat);
          const lng = parseFloat(item.lon);
          const addr = item.address || {};
          const city = addr.city || addr.town || addr.village || addr.suburb || addr.county || query;
          const state = addr.state || '';
          const countryName = addr.country || 'Global';
          const countryCode = (addr.country_code || 'US').toUpperCase();
          const postalCode = addr.postcode || '';

          const customHub = setCustomAddressLocation({
            formattedAddress: item.display_name,
            street: query,
            city,
            state,
            country: countryName,
            countryCode,
            postalCode,
            lat,
            lng
          });

          setSelectedHub(customHub);
          setCustomSearchLocation(null);
          setZoomLevel(15);
          showToast('Address Located', `📍 ${city}, ${countryName}`, 'success');
          return;
        }
      }
    } catch (err) {
      console.warn('Geocoding search failed:', err);
    } finally {
      setIsSearching(false);
    }

    // Fallback: search via Google Maps query embed
    setCustomSearchLocation(query);
    setZoomLevel(14);
    showToast('Google Maps Search', `Locating: "${query}" on Google Maps`, 'info');
  };

  const handleSelectHub = (hub: DeliveryHub) => {
    setSelectedHub(hub);
    setCustomSearchLocation(null);
    setZoomLevel(13);
  };

  const handleConfirmLocation = () => {
    setActiveDeliveryHub(selectedHub);
    const matchedCountry = COUNTRIES.find(
      c => c.code.toUpperCase() === selectedHub.countryCode.toUpperCase() ||
           c.name.toLowerCase() === selectedHub.country.toLowerCase()
    );
    if (matchedCountry) {
      setCountry(matchedCountry);
    }
    setLocationMapModalOpen(false);
    showToast(
      'Delivery Destination Confirmed',
      `Active target: ${selectedHub.formattedAddress || selectedHub.name}`,
      'success'
    );
  };

  // Google Maps dynamic embed target
  const googleMapTarget = customSearchLocation
    ? encodeURIComponent(customSearchLocation)
    : `${selectedHub.lat},${selectedHub.lng}`;

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${googleMapTarget}&t=${mapType}&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="modal-backdrop" onClick={() => setLocationMapModalOpen(false)}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          width: '1040px',
          maxWidth: '96vw',
          maxHeight: '94vh',
          padding: 0,
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35)'
        }}
      >
        {/* MODAL HEADER */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#fff5eb',
                color: '#ff6600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(255, 102, 0, 0.12)'
              }}
            >
              <Globe size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                  Google Maps Delivery Destination &amp; GPS Port Selector
                </h3>
                <span style={{ fontSize: '10px', background: '#4285F4', color: '#fff', padding: '2px 7px', borderRadius: '4px', fontWeight: 800, letterSpacing: '0.4px' }}>
                  LIVE GOOGLE MAPS
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                Auto-detect live GPS location, search exact street address, or select verified customs ports.
              </p>
            </div>
          </div>

          <button
            onClick={() => setLocationMapModalOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#f1f5f9',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* TOP CONTROLS: SEARCH & GPS DETECTION */}
        <div
          style={{
            padding: '12px 24px',
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          {/* Google Search Bar */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', flex: '1 1 380px', display: 'flex', gap: '6px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '10px' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search any address, city, pin code or port (e.g., Connaught Place New Delhi, 110001)..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  background: '#ffffff',
                  outline: 'none'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              {isSearching ? <Loader2 size={13} className="animate-spin" /> : <Search size={13} />}
              <span>{isSearching ? 'Locating...' : 'Search Map'}</span>
            </button>
          </form>

          {/* GPS Auto-Detect Button */}
          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isDetectingLocation}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fff5eb',
              border: '1.5px solid #ff6600',
              color: '#ff6600',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 800,
              boxShadow: '0 2px 8px rgba(255, 102, 0, 0.15)',
              cursor: isDetectingLocation ? 'wait' : 'pointer'
            }}
          >
            {isDetectingLocation ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Navigation size={15} color="#ff6600" />
            )}
            <span>{isDetectingLocation ? 'Detecting Live GPS & Address...' : 'Detect My Exact Location'}</span>
          </button>
        </div>

        {/* INTERACTIVE GOOGLE MAPS EMBED CONTAINER */}
        <div style={{ position: 'relative', height: '360px', width: '100%', background: '#e2e8f0', overflow: 'hidden' }}>
          
          {/* Floating Map Controls & Mode Switcher */}
          <div style={{ position: 'absolute', top: '14px', left: '16px', zIndex: 10, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMapType('m')}
              style={{
                background: mapType === 'm' ? '#ff6600' : 'rgba(255, 255, 255, 0.95)',
                color: mapType === 'm' ? '#ffffff' : '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}
            >
              <MapIcon size={12} /> Roadmap
            </button>

            <button
              onClick={() => setMapType('k')}
              style={{
                background: mapType === 'k' ? '#ff6600' : 'rgba(255, 255, 255, 0.95)',
                color: mapType === 'k' ? '#ffffff' : '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}
            >
              <Satellite size={12} /> Satellite Docks
            </button>

            <button
              onClick={() => setMapType('p')}
              style={{
                background: mapType === 'p' ? '#ff6600' : 'rgba(255, 255, 255, 0.95)',
                color: mapType === 'p' ? '#ffffff' : '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '5px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                cursor: 'pointer'
              }}
            >
              <Mountain size={12} /> Terrain
            </button>
          </div>

          {/* Floating Zoom Controls */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '16px',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              background: '#ffffff',
              padding: '4px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              border: '1px solid #cbd5e1'
            }}
          >
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 1, 19))}
              style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#f8fafc', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, border: 'none', cursor: 'pointer' }}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 1, 3))}
              style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#f8fafc', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, border: 'none', cursor: 'pointer' }}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(15)}
              style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#f8fafc', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
              title="Reset View"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Real Google Maps Iframe */}
          <iframe
            title="Google Maps Delivery Port"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={googleMapsEmbedUrl}
            style={{ border: 0, width: '100%', height: '100%' }}
          />

          {/* Floating Live Coordinates Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '16px',
              zIndex: 10,
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#ffffff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              backdropFilter: 'blur(6px)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
            }}
          >
            <MapPin size={13} color="#ff6600" />
            <span>Target: {selectedHub.flag} {selectedHub.name} ({selectedHub.lat.toFixed(4)}°, {selectedHub.lng.toFixed(4)}°)</span>
          </div>
        </div>

        {/* BOTTOM HALF: ACTIVE DESTINATION INTEL & HUB SELECTOR */}
        <div style={{ padding: '16px 24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Active Selected Destination Card */}
          <div
            style={{
              background: '#fffbf7',
              border: '1.5px solid #fed7aa',
              borderRadius: '14px',
              padding: '12px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '300px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: '#ff6600',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(255, 102, 0, 0.25)'
                }}
              >
                <MapPin size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '18px' }}>{selectedHub.flag}</span>
                  <strong style={{ fontSize: '15px', color: '#0f172a', fontFamily: 'Outfit, sans-serif' }}>
                    {selectedHub.formattedAddress ? selectedHub.formattedAddress : selectedHub.name}
                  </strong>
                  <span style={{ fontSize: '10px', background: '#0f172a', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                    {selectedHub.portCode}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  📍 {selectedHub.city}{selectedHub.state ? `, ${selectedHub.state}` : ''}, {selectedHub.country} • Lat: <strong>{selectedHub.lat.toFixed(4)}°</strong>, Lng: <strong>{selectedHub.lng.toFixed(4)}°</strong> • {selectedHub.dockType}
                </div>
              </div>
            </div>

            {/* Quick Delivery Timelines */}
            <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '6px 12px' }}>
                <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                  <Plane size={12} color="#2563eb" /> Air Freight DDP:
                </div>
                <strong style={{ color: '#0f172a' }}>{selectedHub.airTransitDays}</strong>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '6px 12px' }}>
                <div style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}>
                  <Truck size={12} color="#059669" /> Ocean Freight DDP:
                </div>
                <strong style={{ color: '#0f172a' }}>{selectedHub.oceanTransitDays}</strong>
              </div>
            </div>
          </div>

          {/* Preset Cargo Ports Selector with Quick Region Filter */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                Or Select Major Commercial Cargo Gateway:
              </div>

              {/* Region Filter Tabs */}
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {[
                  { id: 'ALL', label: 'All Global' },
                  { id: 'INDIA', label: '🇮🇳 India Hubs' },
                  { id: 'ASIA_PACIFIC', label: '🌏 Asia' },
                  { id: 'AMERICAS', label: '🇺🇸 Americas' },
                  { id: 'EUROPE', label: '🇪🇺 Europe' },
                  { id: 'MIDDLE_EAST', label: '🇦🇪 Middle East' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setActiveRegion(r.id as any)}
                    style={{
                      fontSize: '11px',
                      fontWeight: activeRegion === r.id ? 800 : 600,
                      color: activeRegion === r.id ? '#ff6600' : '#64748b',
                      background: activeRegion === r.id ? '#fff5eb' : '#f8fafc',
                      border: '1px solid',
                      borderColor: activeRegion === r.id ? '#fed7aa' : '#e2e8f0',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hub list */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '8px', maxHeight: '100px', overflowY: 'auto' }}>
              {filteredHubs.map(hub => {
                const isSelected = selectedHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => handleSelectHub(hub)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      border: isSelected ? '1.5px solid #ff6600' : '1px solid #e2e8f0',
                      background: isSelected ? '#fff5eb' : '#ffffff',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '15px' }}>{hub.flag}</span>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: '12px', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#ff6600' : '#0f172a' }} className="truncate">
                        {hub.city} ({hub.portCode.split('-')[1]})
                      </div>
                      <div style={{ fontSize: '10px', color: '#64748b' }} className="truncate">
                        {hub.country}
                      </div>
                    </div>
                    {isSelected && <Check size={14} color="#ff6600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MODAL FOOTER ACTION */}
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>100% Trade Assurance DDP Escrow active for selected destination</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setLocationMapModalOpen(false)}
                className="btn-secondary"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLocation}
                className="btn-primary"
                style={{ padding: '8px 24px', fontSize: '13px' }}
              >
                <span>Confirm &amp; Set Destination</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
