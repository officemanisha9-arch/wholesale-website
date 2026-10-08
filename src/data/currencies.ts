import type { CurrencyConfig, CountryConfig } from '../types';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0, flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '🇬🇧' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 154.5, flag: '🇯🇵' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 84.2, flag: '🇮🇳' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.37, flag: '🇨🇦' },
  AUD: { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', rate: 1.53, flag: '🇦🇺' },
  CNY: { code: 'CNY', symbol: 'CN¥', name: 'Chinese Yuan', rate: 7.24, flag: '🇨🇳' },
  BRL: { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 5.65, flag: '🇧🇷' },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 3.67, flag: '🇦🇪' },
};

export const COUNTRIES: CountryConfig[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', defaultCurrency: 'USD', zipFormat: '10001' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', defaultCurrency: 'GBP', zipFormat: 'SW1A 1AA' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', defaultCurrency: 'EUR', zipFormat: '10115' },
  { code: 'FR', name: 'France', flag: '🇫🇷', defaultCurrency: 'EUR', zipFormat: '75001' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', defaultCurrency: 'JPY', zipFormat: '100-0001' },
  { code: 'IN', name: 'India', flag: '🇮🇳', defaultCurrency: 'INR', zipFormat: '110001' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', defaultCurrency: 'CAD', zipFormat: 'M5V 2T6' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', defaultCurrency: 'AUD', zipFormat: '2000' },
  { code: 'CN', name: 'China', flag: '🇨🇳', defaultCurrency: 'CNY', zipFormat: '100000' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', defaultCurrency: 'BRL', zipFormat: '01001-000' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', defaultCurrency: 'AED', zipFormat: '00000' },
  { code: 'TR', name: 'Türkiye', flag: '🇹🇷', defaultCurrency: 'USD', zipFormat: '34000' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', defaultCurrency: 'USD', zipFormat: '700000' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', defaultCurrency: 'EUR', zipFormat: '00118' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', defaultCurrency: 'EUR', zipFormat: '28001' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', defaultCurrency: 'EUR', zipFormat: '1012 JS' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', defaultCurrency: 'USD', zipFormat: '06000' },
];

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'zh', name: 'Chinese', native: '简体中文' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
];
