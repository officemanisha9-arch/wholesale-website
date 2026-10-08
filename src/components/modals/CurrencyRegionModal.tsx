import React, { useState } from 'react';
import { X, Globe, Check, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COUNTRIES, CURRENCIES, LANGUAGES } from '../../data/currencies';
import { CurrencyCode, CountryConfig } from '../../types';

export const CurrencyRegionModal: React.FC = () => {
  const {
    isCurrencyModalOpen,
    setCurrencyModalOpen,
    country,
    setCountry,
    currency,
    setCurrency,
    language,
    setLanguage,
    showToast
  } = useApp();

  const [selectedCountry, setSelectedCountry] = useState<CountryConfig>(country);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(currency);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);
  const [searchFilter, setSearchFilter] = useState('');

  if (!isCurrencyModalOpen) return null;

  const handleSave = () => {
    setCountry(selectedCountry);
    setCurrency(selectedCurrency);
    setLanguage(selectedLanguage);
    setCurrencyModalOpen(false);
    showToast(
      'Preferences Updated',
      `Ship to ${selectedCountry.name} (${selectedCountry.flag}) in ${selectedCurrency} (${CURRENCIES[selectedCurrency]?.symbol})`,
      'success'
    );
  };

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) || c.code.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={() => setCurrencyModalOpen(false)}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ width: '640px', maxWidth: '94vw', padding: '32px', borderRadius: '24px', boxShadow: 'var(--shadow-xl)' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fff5eb', color: '#ff6600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
              Set Delivery Destination &amp; Currency
            </h3>
          </div>
          <button
            onClick={() => setCurrencyModalOpen(false)}
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-app)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '20px' }}>
          Select your shipping country to see accurate freight calculations, delivery lead times, and local tax exemptions. Prices across Alibaba.com will convert in real-time.
        </p>

        {/* Search input for country */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '11px' }} />
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="Search country or region..."
            style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px', background: 'var(--bg-app)', color: 'var(--text-primary)', outline: 'none' }}
          />
        </div>

        {/* 1. Country Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Ship To Country / Region:
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              maxHeight: '160px',
              overflowY: 'auto',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '10px',
              background: 'var(--bg-app)'
            }}
          >
            {filteredCountries.map(c => {
              const isSelected = selectedCountry.code === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c);
                    setSelectedCurrency(c.defaultCurrency);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: isSelected ? '#fff5eb' : 'var(--bg-card)',
                    border: isSelected ? '1.5px solid #ff6600' : '1px solid var(--border-color)',
                    fontSize: '12px',
                    fontWeight: isSelected ? 800 : 500,
                    color: isSelected ? '#ff6600' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                    <span style={{ fontSize: '16px' }}>{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                  </span>
                  {isSelected && <Check size={14} color="#ff6600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Currency Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Currency Display:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {Object.values(CURRENCIES).map(curr => {
              const isSelected = selectedCurrency === curr.code;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => setSelectedCurrency(curr.code)}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '10px',
                    background: isSelected ? '#fff5eb' : 'var(--bg-app)',
                    border: isSelected ? '1.5px solid #ff6600' : '1px solid var(--border-color)',
                    fontSize: '12px',
                    textAlign: 'center',
                    fontWeight: isSelected ? 800 : 500,
                    color: isSelected ? '#ff6600' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{curr.code} ({curr.symbol})</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }} className="truncate">{curr.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Language Selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Language:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {LANGUAGES.slice(0, 5).map(lang => {
              const isSelected = selectedLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLanguage(lang.code)}
                  style={{
                    padding: '8px',
                    borderRadius: '10px',
                    background: isSelected ? '#fff5eb' : 'var(--bg-app)',
                    border: isSelected ? '1.5px solid #ff6600' : '1px solid var(--border-color)',
                    fontSize: '12px',
                    fontWeight: isSelected ? 800 : 500,
                    color: isSelected ? '#ff6600' : 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {lang.native}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setCurrencyModalOpen(false)}
            className="btn-secondary"
            style={{ padding: '8px 20px', borderRadius: '10px' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary"
            style={{ padding: '8px 28px', borderRadius: '10px' }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

