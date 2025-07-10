import React, { useState } from 'react';
import { Truck, Info } from 'lucide-react';

interface ShippingCalculatorSimpleProps {
  subtotal: number;
  onClose?: () => void;
}

const ShippingCalculatorSimple: React.FC<ShippingCalculatorSimpleProps> = ({ subtotal, onClose }) => {
  const [formData, setFormData] = useState({
    postalCode: '',
    prefecture: '',
    weight: '1'
  });

  // 都道府県リスト（簡略版）
  const prefectureList = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
  ];

  // 地域別送料
  const getShippingFee = (prefecture: string) => {
    if (subtotal >= 5000) return 0;

    const shippingZones: { [key: string]: number } = {
      '北海道': 1300,
      '青森県': 1100, '岩手県': 1100, '宮城県': 1100, '秋田県': 1100, '山形県': 1100, '福島県': 1100,
      '茨城県': 1000, '栃木県': 1000, '群馬県': 1000, '埼玉県': 1000, '千葉県': 1000, '東京都': 1000, '神奈川県': 1000,
      '新潟県': 900, '富山県': 900, '石川県': 900, '福井県': 900, '山梨県': 900, '長野県': 900, '岐阜県': 900, '静岡県': 900, '愛知県': 900,
      '三重県': 800, '滋賀県': 800, '京都府': 800, '大阪府': 800, '兵庫県': 800, '奈良県': 800, '和歌山県': 800,
      '鳥取県': 700, '島根県': 700, '岡山県': 700, '広島県': 700, '山口県': 700,
      '徳島県': 700, '香川県': 700, '愛媛県': 700, '高知県': 700,
      '福岡県': 600, '佐賀県': 600, '長崎県': 600, '熊本県': 600, '大分県': 600, '宮崎県': 600, '鹿児島県': 600,
      '沖縄県': 1400
    };

    return shippingZones[prefecture] || 600;
  };


  const shippingFee = formData.prefecture ? getShippingFee(formData.prefecture) : null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-good-blue-gold/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-good-blue-brown flex items-center gap-2">
          <Truck className="h-5 w-5" />
          送料計算（参考価格）
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-good-blue-brown/60 hover:text-good-blue-brown text-xl"
          >
            ×
          </button>
        )}
      </div>

      {/* 送料に関する重要な注記 */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm font-medium text-yellow-800 mb-1">※ 送料について</p>
        <p className="text-xs text-yellow-700">
          表示される送料は参考価格です。実際の送料は商品のサイズ・重量・配送時期により変動する場合があります。
          正確な送料はご注文確定後にお知らせいたします。
        </p>
      </div>

      <div className="space-y-4">
        {/* 郵便番号入力 */}
        <div>
          <label htmlFor="postal-code" className="block text-sm font-medium text-good-blue-brown mb-1">
            郵便番号（ハイフンなし）
          </label>
          <input
            id="postal-code"
            type="text"
            value={formData.postalCode}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, postalCode: e.target.value }));
            }}
            onBlur={(e) => {
              // フォーカスが外れた時に数字以外を除去
              const numericValue = e.target.value.replace(/[^\d]/g, '').substring(0, 7);
              setFormData(prev => ({ ...prev, postalCode: numericValue }));
            }}
            placeholder="8794911"
            maxLength={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
          />
          <p className="text-xs text-good-blue-brown/60 mt-1">
            {formData.postalCode ? (
              <>入力中: {formData.postalCode.replace(/[^\d]/g, '').slice(0, 3)}{formData.postalCode.replace(/[^\d]/g, '').length > 3 ? '-' + formData.postalCode.replace(/[^\d]/g, '').slice(3, 7) : ''}</>
            ) : (
              '数字7桁を入力してください（ハイフンは自動で除去されます）'
            )}
          </p>
        </div>

        {/* 都道府県選択 */}
        <div>
          <label htmlFor="prefecture" className="block text-sm font-medium text-good-blue-brown mb-1">
            配送先都道府県
          </label>
          <select
            id="prefecture"
            value={formData.prefecture}
            onChange={(e) => setFormData(prev => ({ ...prev, prefecture: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
          >
            <option value="">都道府県を選択してください</option>
            {prefectureList.map((pref) => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
        </div>

        {/* 送料表示 */}
        {shippingFee !== null && formData.prefecture && (
          <div className={`mt-6 p-4 rounded-lg ${
            shippingFee === 0 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-good-blue-light/50 border border-good-blue-gold/20'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-good-blue-brown">
                {formData.prefecture}への送料
              </span>
              <span className={`text-xl font-bold ${
                shippingFee === 0 ? 'text-green-600' : 'text-good-blue-brown'
              }`}>
                {shippingFee === 0 ? '無料' : `¥${shippingFee.toLocaleString()}`}
              </span>
            </div>
            {shippingFee === 0 && (
              <p className="text-xs text-green-600 mt-1">
                5,000円以上のご購入で送料無料
              </p>
            )}
          </div>
        )}

        {/* 送料に関する注意事項 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-good-blue-gold mt-0.5 flex-shrink-0" />
            <div className="space-y-1 text-xs text-good-blue-brown/70">
              <p>• 送料は大分県からの発送料金です</p>
              <p>• 5,000円以上のご購入で全国送料無料</p>
              <p>• 離島・一部地域は追加料金がかかる場合があります</p>
              <p>• <strong>実際の送料は商品により異なるため、詳細はお問い合わせください</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingCalculatorSimple;