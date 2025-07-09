import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Banknote, Store, AlertCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onOrderComplete: () => void;
}

interface CustomerInfo {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  email: string;
  phone: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onBack, onOrderComplete }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    email: '',
    phone: '',
    postalCode: '',
    prefecture: '',
    city: '',
    address: '',
    building: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('credit');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 価格計算
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal >= 5000 ? 0 : 500;
  const total = subtotal + shippingFee;

  // 入力値の変更ハンドラー
  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // 郵便番号から住所を自動入力（実際の実装では郵便番号APIを使用）
  const handlePostalCodeChange = (value: string) => {
    const formattedValue = value.replace(/[^0-9]/g, '');
    handleInputChange('postalCode', formattedValue);
    
    // 7桁入力されたら住所を検索（デモ用）
    if (formattedValue.length === 7) {
      // 実際はAPIを呼び出す
      // ここではデモとして大分県の住所を設定
      setCustomerInfo(prev => ({
        ...prev,
        prefecture: '大分県',
        city: '玖珠郡九重町'
      }));
    }
  };

  // バリデーション
  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!customerInfo.lastName) newErrors.lastName = '姓を入力してください';
    if (!customerInfo.firstName) newErrors.firstName = '名を入力してください';
    if (!customerInfo.lastNameKana) newErrors.lastNameKana = '姓（カナ）を入力してください';
    if (!customerInfo.firstNameKana) newErrors.firstNameKana = '名（カナ）を入力してください';
    if (!customerInfo.email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }
    if (!customerInfo.phone) {
      newErrors.phone = '電話番号を入力してください';
    } else if (!/^[0-9-]+$/.test(customerInfo.phone)) {
      newErrors.phone = '正しい電話番号を入力してください';
    }
    if (!customerInfo.postalCode) newErrors.postalCode = '郵便番号を入力してください';
    if (!customerInfo.prefecture) newErrors.prefecture = '都道府県を入力してください';
    if (!customerInfo.city) newErrors.city = '市区町村を入力してください';
    if (!customerInfo.address) newErrors.address = '番地を入力してください';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 注文確定処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    // 実際の実装では、ここでAPIに注文情報を送信
    // デモのため、2秒後に完了とする
    setTimeout(() => {
      setIsSubmitting(false);
      alert('ご注文ありがとうございました！\n確認メールをお送りしました。');
      onOrderComplete();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-good-blue-brown hover:text-good-blue-gold transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>カートに戻る</span>
        </button>
        <h1 className="text-2xl font-bold text-good-blue-brown">ご注文手続き</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左側：入力フォーム */}
          <div className="lg:col-span-2 space-y-8">
            {/* お客様情報 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-good-blue-brown mb-6">お客様情報</h2>
              
              {/* 名前 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-good-blue-brown mb-1">
                    姓 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="山田"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-good-blue-brown mb-1">
                    名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="太郎"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
              </div>

              {/* 名前（カナ） */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-good-blue-brown mb-1">
                    セイ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.lastNameKana}
                    onChange={(e) => handleInputChange('lastNameKana', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                      errors.lastNameKana ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ヤマダ"
                  />
                  {errors.lastNameKana && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastNameKana}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-good-blue-brown mb-1">
                    メイ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.firstNameKana}
                    onChange={(e) => handleInputChange('firstNameKana', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                      errors.firstNameKana ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="タロウ"
                  />
                  {errors.firstNameKana && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstNameKana}</p>
                  )}
                </div>
              </div>

              {/* メールアドレス */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-good-blue-brown mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* 電話番号 */}
              <div>
                <label className="block text-sm font-medium text-good-blue-brown mb-1">
                  電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="090-1234-5678"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* 配送先住所 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-good-blue-brown mb-6">配送先住所</h2>
              
              {/* 郵便番号 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-good-blue-brown mb-1">
                  郵便番号 <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-good-blue-brown">〒</span>
                  <input
                    type="text"
                    value={customerInfo.postalCode}
                    onChange={(e) => handlePostalCodeChange(e.target.value)}
                    className={`w-40 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234567"
                    maxLength={7}
                  />
                  <span className="text-sm text-good-blue-brown/60">（ハイフンなし）</span>
                </div>
                {errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                )}
              </div>

              {/* 都道府県・市区町村 */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-good-blue-brown mb-1">
                    都道府県 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.prefecture}
                    onChange={(e) => handleInputChange('prefecture', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                      errors.prefecture ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="大分県"
                  />
                  {errors.prefecture && (
                    <p className="text-red-500 text-xs mt-1">{errors.prefecture}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-good-blue-brown mb-1">
                    市区町村 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="玖珠郡九重町"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              {/* 番地 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-good-blue-brown mb-1">
                  番地 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="田野1672-18"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* 建物名 */}
              <div>
                <label className="block text-sm font-medium text-good-blue-brown mb-1">
                  建物名・部屋番号
                </label>
                <input
                  type="text"
                  value={customerInfo.building}
                  onChange={(e) => handleInputChange('building', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
                  placeholder="○○マンション 101号室"
                />
              </div>
            </div>

            {/* 支払い方法 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-good-blue-brown mb-6">お支払い方法</h2>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-good-blue-light/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-good-blue-gold" />
                      <span className="font-medium">クレジットカード</span>
                    </div>
                    <p className="text-sm text-good-blue-brown/60 mt-1">
                      VISA, Mastercard, JCB, American Express
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-good-blue-light/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-good-blue-gold" />
                      <span className="font-medium">代金引換</span>
                    </div>
                    <p className="text-sm text-good-blue-brown/60 mt-1">
                      商品お届け時にドライバーへお支払い（手数料 +330円）
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-good-blue-light/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-good-blue-gold" />
                      <span className="font-medium">銀行振込</span>
                    </div>
                    <p className="text-sm text-good-blue-brown/60 mt-1">
                      ご注文確定後、振込先をメールでお送りします
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-good-blue-light/30 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="convenience"
                    checked={paymentMethod === 'convenience'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Store className="h-5 w-5 text-good-blue-gold" />
                      <span className="font-medium">コンビニ払い</span>
                    </div>
                    <p className="text-sm text-good-blue-brown/60 mt-1">
                      セブンイレブン、ローソン、ファミリーマート（手数料 +220円）
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* 配送についてのお願い */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-good-blue-brown mb-4">配送についてのお願い</h2>
              <textarea
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
                rows={3}
                placeholder="配送時間のご希望、不在時の対応など"
              />
            </div>
          </div>

          {/* 右側：注文サマリー */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-good-blue-brown mb-4">ご注文内容</h2>
              
              {/* 商品リスト */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 text-sm">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-good-blue-brown line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-good-blue-brown/60">
                        ¥{item.product.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-good-blue-brown">
                      ¥{(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-good-blue-brown/60">小計</span>
                  <span>¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-good-blue-brown/60">送料</span>
                  <span>{shippingFee === 0 ? '無料' : `¥${shippingFee.toLocaleString()}`}</span>
                </div>
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-good-blue-brown/60">代引手数料</span>
                    <span>¥330</span>
                  </div>
                )}
                {paymentMethod === 'convenience' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-good-blue-brown/60">コンビニ決済手数料</span>
                    <span>¥220</span>
                  </div>
                )}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-good-blue-brown">合計</span>
                  <span className="text-xl font-bold text-good-blue-brown">
                    ¥{(
                      total + 
                      (paymentMethod === 'cod' ? 330 : 0) + 
                      (paymentMethod === 'convenience' ? 220 : 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* 注意事項 */}
              <div className="mt-6 p-4 bg-good-blue-light/50 rounded-lg">
                <div className="flex gap-2">
                  <AlertCircle className="h-5 w-5 text-good-blue-gold flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-good-blue-brown/80 space-y-1">
                    <p>・植物の性質上、写真と実物が異なる場合があります</p>
                    <p>・生き物のため、お届け後の返品は承れません</p>
                    <p>・配送中の痛みがある場合は、到着後すぐにご連絡ください</p>
                  </div>
                </div>
              </div>

              {/* 注文確定ボタン */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 py-3 rounded-lg font-medium transition-all ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-good-blue-gold text-white hover:bg-good-blue-gold/90'
                }`}
              >
                {isSubmitting ? '処理中...' : 'ご注文を確定する'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;