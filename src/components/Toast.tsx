import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-good-blue-brown text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <CheckCircle className="h-5 w-5 text-good-blue-gold" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Toast;