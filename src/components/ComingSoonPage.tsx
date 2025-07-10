import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';

interface ComingSoonPageProps {
  pageName: string;
  onGoBack: () => void;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ pageName, onGoBack }) => {
  return (
    <div className="min-h-screen bg-good-blue-cream flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-6"
        >
          <Clock className="h-16 w-16 text-good-blue-gold" />
        </motion.div>
        
        <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-4">
          {pageName}
        </h1>
        
        <p className="text-lg text-gray-600 mb-2">
          準備中です
        </p>
        
        <p className="text-sm md:text-base text-gray-500 mb-8">
          現在このページは準備中です。<br />
          もうしばらくお待ちください。
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGoBack}
          className="inline-flex items-center gap-2 bg-good-blue-gold text-white px-6 py-3 rounded-full font-medium hover:bg-good-blue-brown transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>ホームに戻る</span>
        </motion.button>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            お問い合わせは<br />
            TEL: 090-3013-7032
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;