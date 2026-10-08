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
        style={{ width: '640px', padding: '28px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={22} color="#ff6a00" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111' }}>
              Set Delivery Destination & Currency
            </h3>
          </div>
          <button
            onClick={() => setCurrencyModalOpen(false)}
            style={{ color: '#888', padding: '4px', borderRadius: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px', lineHeight: '18px' }}>
          Select your shipping country to see accurate freight calculations, delivery lead times, and local tax exemptions. Prices across Alibaba.com will convert in real-time.
        </p>

        {/* 1. Country Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '8px' }}>
            Ship To Country / Region:
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              maxHeight: '160px',
              overflowY: 'auto',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '10px',
              background: '#f9fafb'
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
                    borderRadius: '6px',
                    background: isSelected ? '#fff3e8' : '#fff',
                    border: isSelected ? '1.5px solid #ff6a00' : '1px solid #e5e7eb',
                    fontSize: '12px',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#ff6a00' : '#333'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px' }}>{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                  </span>
                  {isSelected && <Check size={14} color="#ff6a00" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Currency Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '8px' }}>
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
                    padding: '8px',
                    borderRadius: '6px',
                    background: isSelected ? '#fff3e8' : '#fff',
                    border: isSelected ? '1.5px solid #ff6a00' : '1px solid #e5e7eb',
                    fontSize: '12px',
                    textAlign: 'center',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#ff6a00' : '#333'
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{curr.code} ({curr.symbol})</div>
                  <div style={{ fontSize: '10px', color: '#888' }} className="truncate">{curr.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Language Selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#222', marginBottom: '8px' }}>
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
                    borderRadius: '6px',
                    background: isSelected ? '#fff3e8' : '#fff',
                    border: isSelected ? '1.5px solid #ff6a00' : '1px solid #e5e7eb',
                    fontSize: '12px',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#ff6a00' : '#333'
                  }}
                >
                  {lang.native}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            type="button"
            onClick={() => setCurrencyModalOpen(false)}
            className="btn-secondary"
            style={{ padding: '8px 20px' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary"
            style={{ padding: '8px 28px' }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
