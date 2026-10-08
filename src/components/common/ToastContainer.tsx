import React from 'react';
import { X, CheckCircle, Info, AlertTriangle, AlertOctagon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => {
        let Icon = Info;
        let iconColor = '#2563eb';
        if (toast.type === 'success') {
          Icon = CheckCircle;
          iconColor = '#059669';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = '#d97706';
        } else if (toast.type === 'error') {
          Icon = AlertOctagon;
          iconColor = '#dc2626';
        }

        return (
          <div key={toast.id} className={`toast-item toast-${toast.type}`}>
            <Icon size={20} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#111', marginBottom: '2px' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '12px', color: '#555', lineHeight: '16px' }}>
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{ color: '#999', padding: '2px' }}
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
