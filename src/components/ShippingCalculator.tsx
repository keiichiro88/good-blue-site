import React, { useState } from 'react';
import { Truck, Info } from 'lucide-react';

interface ShippingCalculatorProps {
  subtotal: number;
  onClose?: () => void;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ subtotal, onClose }) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [weight, setWeight] = useState(1); // kg単位

  // 都道府県リスト
  const prefectures = [
    { value: 'hokkaido', name: '北海道', zone: 'hokkaido' },
    { value: 'aomori', name: '青森県', zone: 'tohoku' },
    { value: 'iwate', name: '岩手県', zone: 'tohoku' },
    { value: 'miyagi', name: '宮城県', zone: 'tohoku' },
    { value: 'akita', name: '秋田県', zone: 'tohoku' },
    { value: 'yamagata', name: '山形県', zone: 'tohoku' },
    { value: 'fukushima', name: '福島県', zone: 'tohoku' },
    { value: 'ibaraki', name: '茨城県', zone: 'kanto' },
    { value: 'tochigi', name: '栃木県', zone: 'kanto' },
    { value: 'gunma', name: '群馬県', zone: 'kanto' },
    { value: 'saitama', name: '埼玉県', zone: 'kanto' },
    { value: 'chiba', name: '千葉県', zone: 'kanto' },
    { value: 'tokyo', name: '東京都', zone: 'kanto' },
    { value: 'kanagawa', name: '神奈川県', zone: 'kanto' },
    { value: 'niigata', name: '新潟県', zone: 'chubu' },
    { value: 'toyama', name: '富山県', zone: 'chubu' },
    { value: 'ishikawa', name: '石川県', zone: 'chubu' },
    { value: 'fukui', name: '福井県', zone: 'chubu' },
    { value: 'yamanashi', name: '山梨県', zone: 'chubu' },
    { value: 'nagano', name: '長野県', zone: 'chubu' },
    { value: 'gifu', name: '岐阜県', zone: 'chubu' },
    { value: 'shizuoka', name: '静岡県', zone: 'chubu' },
    { value: 'aichi', name: '愛知県', zone: 'chubu' },
    { value: 'mie', name: '三重県', zone: 'kinki' },
    { value: 'shiga', name: '滋賀県', zone: 'kinki' },
    { value: 'kyoto', name: '京都府', zone: 'kinki' },
    { value: 'osaka', name: '大阪府', zone: 'kinki' },
    { value: 'hyogo', name: '兵庫県', zone: 'kinki' },
    { value: 'nara', name: '奈良県', zone: 'kinki' },
    { value: 'wakayama', name: '和歌山県', zone: 'kinki' },
    { value: 'tottori', name: '鳥取県', zone: 'chugoku' },
    { value: 'shimane', name: '島根県', zone: 'chugoku' },
    { value: 'okayama', name: '岡山県', zone: 'chugoku' },
    { value: 'hiroshima', name: '広島県', zone: 'chugoku' },
    { value: 'yamaguchi', name: '山口県', zone: 'chugoku' },
    { value: 'tokushima', name: '徳島県', zone: 'shikoku' },
    { value: 'kagawa', name: '香川県', zone: 'shikoku' },
    { value: 'ehime', name: '愛媛県', zone: 'shikoku' },
    { value: 'kochi', name: '高知県', zone: 'shikoku' },
    { value: 'fukuoka', name: '福岡県', zone: 'kyushu' },
    { value: 'saga', name: '佐賀県', zone: 'kyushu' },
    { value: 'nagasaki', name: '長崎県', zone: 'kyushu' },
    { value: 'kumamoto', name: '熊本県', zone: 'kyushu' },
    { value: 'oita', name: '大分県', zone: 'kyushu' },
    { value: 'miyazaki', name: '宮崎県', zone: 'kyushu' },
    { value: 'kagoshima', name: '鹿児島県', zone: 'kyushu' },
    { value: 'okinawa', name: '沖縄県', zone: 'okinawa' }
  ];

  // 地域別送料（大分県からの発送）
  const shippingRates = {
    kyushu: { // 九州（大分県含む）
      base: 600,
      additional: 100 // 追加1kgごと
    },
    shikoku: { // 四国
      base: 700,
      additional: 120
    },
    chugoku: { // 中国
      base: 700,
      additional: 120
    },
    kinki: { // 近畿
      base: 800,
      additional: 150
    },
    chubu: { // 中部
      base: 900,
      additional: 150
    },
    kanto: { // 関東
      base: 1000,
      additional: 180
    },
    tohoku: { // 東北
      base: 1100,
      additional: 200
    },
    hokkaido: { // 北海道
      base: 1300,
      additional: 250
    },
    okinawa: { // 沖縄
      base: 1400,
      additional: 300
    }
  };

  // 送料計算
  const calculateShipping = () => {
    if (!selectedPrefecture) return null;

    const prefecture = prefectures.find(p => p.value === selectedPrefecture);
    if (!prefecture) return null;

    const zone = prefecture.zone as keyof typeof shippingRates;
    const rate = shippingRates[zone];

    // 5,000円以上は送料無料
    if (subtotal >= 5000) {
      return {
        shipping: 0,
        message: '5,000円以上のご購入で送料無料！',
        zone: prefecture.name,
        isFree: true
      };
    }

    // 重量による送料計算
    const additionalWeight = Math.max(0, weight - 1);
    const shipping = rate.base + (additionalWeight * rate.additional);

    return {
      shipping,
      message: `${prefecture.name}への送料`,
      zone: prefecture.name,
      isFree: false
    };
  };

  const shippingInfo = calculateShipping();

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 数字のみを許可
    const numericValue = value.replace(/\D/g, '');
    // 7桁までに制限
    const truncatedValue = numericValue.slice(0, 7);
    setPostalCode(truncatedValue);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-good-blue-gold/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-good-blue-brown flex items-center gap-2">
          <Truck className="h-5 w-5" />
          送料計算
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-good-blue-brown/60 hover:text-good-blue-brown"
          >
            ✕
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* 郵便番号入力 */}
        <div>
          <label className="block text-sm font-medium text-good-blue-brown mb-1">
            郵便番号（ハイフンなし）
          </label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => {
              const newValue = e.target.value.replace(/\D/g, '').slice(0, 7);
              console.log('Setting postal code to:', newValue);
              setPostalCode(newValue);
            }}
            placeholder="8794911"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
          />
          <div className="flex items-center justify-between mt-1">
            {postalCode && (
              <p className="text-xs text-good-blue-brown/60">
                入力中: {postalCode.slice(0, 3)}{postalCode.length > 3 ? '-' + postalCode.slice(3) : ''}
              </p>
            )}
            <button
              type="button"
              onClick={() => setPostalCode('8794911')}
              className="text-xs text-good-blue-gold hover:text-good-blue-gold/80"
            >
              サンプル入力
            </button>
          </div>
        </div>

        {/* 都道府県選択 */}
        <div>
          <label className="block text-sm font-medium text-good-blue-brown mb-1">
            配送先都道府県
          </label>
          <select
            value={selectedPrefecture}
            onChange={(e) => setSelectedPrefecture(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
          >
            <option value="">都道府県を選択してください</option>
            {prefectures.map((pref) => (
              <option key={pref.value} value={pref.value}>
                {pref.name}
              </option>
            ))}
          </select>
        </div>

        {/* 重量選択 */}
        <div>
          <label className="block text-sm font-medium text-good-blue-brown mb-1">
            おおよその重量（kg）
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="w-16 text-center font-medium text-good-blue-brown">
              {weight}kg
            </span>
          </div>
        </div>

        {/* 送料表示 */}
        {shippingInfo && (
          <div className={`mt-6 p-4 rounded-lg ${
            shippingInfo.isFree 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-good-blue-light/50 border border-good-blue-gold/20'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-good-blue-brown">
                {shippingInfo.message}
              </span>
              <span className={`text-xl font-bold ${
                shippingInfo.isFree ? 'text-green-600' : 'text-good-blue-brown'
              }`}>
                ¥{shippingInfo.shipping.toLocaleString()}
              </span>
            </div>
            {shippingInfo.isFree && (
              <p className="text-xs text-green-600">
                現在のカート金額: ¥{subtotal.toLocaleString()}
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
              <p>• 植物の梱包は丁寧に行うため、実際の重量より大きくなる場合があります</p>
            </div>
          </div>
        </div>

        {/* 送料早見表 */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-good-blue-gold hover:text-good-blue-gold/80">
            地域別送料早見表を見る
          </summary>
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">地域</th>
                  <th className="text-right py-2">基本送料</th>
                  <th className="text-right py-2">追加料金/kg</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2">九州</td>
                  <td className="text-right">¥600</td>
                  <td className="text-right">+¥100</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">四国・中国</td>
                  <td className="text-right">¥700</td>
                  <td className="text-right">+¥120</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">近畿</td>
                  <td className="text-right">¥800</td>
                  <td className="text-right">+¥150</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">中部</td>
                  <td className="text-right">¥900</td>
                  <td className="text-right">+¥150</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">関東</td>
                  <td className="text-right">¥1,000</td>
                  <td className="text-right">+¥180</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">東北</td>
                  <td className="text-right">¥1,100</td>
                  <td className="text-right">+¥200</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2">北海道</td>
                  <td className="text-right">¥1,300</td>
                  <td className="text-right">+¥250</td>
                </tr>
                <tr>
                  <td className="py-2">沖縄</td>
                  <td className="text-right">¥1,400</td>
                  <td className="text-right">+¥300</td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </div>
  );
};

export default ShippingCalculator;