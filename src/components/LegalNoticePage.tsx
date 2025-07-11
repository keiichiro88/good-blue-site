import React from 'react';
import { motion } from 'framer-motion';

interface LegalNoticePageProps {
  onCategoryChange: (category: string) => void;
}

const LegalNoticePage: React.FC<LegalNoticePageProps> = ({ onCategoryChange }) => {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-base px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* パンくずリスト */}
          <div className="text-sm text-gray-600 mb-8">
            <span 
              className="hover:text-good-blue-gold cursor-pointer"
              onClick={() => onCategoryChange('all')}
            >
              ホーム
            </span>
            <span className="mx-2">＞</span>
            <span className="text-gray-900">特定商取引法に基づく表記</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            特定商取引法に基づく表記
          </h1>

          <div className="bg-gray-50 rounded-lg p-6 md:p-8 space-y-6">
            {/* 販売業者 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">販売業者</h3>
              <p className="text-gray-600">花とカフェ goodblue</p>
            </div>

            {/* 運営統括責任者 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">運営統括責任者</h3>
              <p className="text-gray-600">的場 達郎</p>
            </div>

            {/* 郵便番号 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">郵便番号</h3>
              <p className="text-gray-600">〒879-4911</p>
            </div>

            {/* 住所 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">住所</h3>
              <p className="text-gray-600">大分県玖珠郡九重町田野1672-18</p>
            </div>

            {/* 商品代金以外の料金の説明 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">商品代金以外の料金の説明</h3>
              <p className="text-gray-600">
                送料別途。5,000円以上のご購入で送料無料。詳しくは送料についてのページをご確認ください。
              </p>
            </div>

            {/* 申込有効期限 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">申込有効期限</h3>
              <p className="text-gray-600">
                ご注文確定後、3営業日以内にお支払いください。期限を過ぎた場合は自動的にキャンセルとなる場合があります。
              </p>
            </div>

            {/* 販売価格 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">販売価格</h3>
              <p className="text-gray-600">
                各商品ページに記載された価格（税込）
              </p>
            </div>

            {/* 引渡し時期 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">引渡し時期</h3>
              <p className="text-gray-600">
                ご注文確定後、1週間以内に発送いたします。なお、在庫切れ・天候不良等の理由により遅れる場合は、メールにてご連絡いたします。
              </p>
            </div>

            {/* お支払い方法 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">お支払い方法</h3>
              <div className="space-y-2 text-gray-600">
                <p>以下のお支払い方法をご利用いただけます：</p>
                <ul className="list-disc list-inside ml-4">
                  <li>クレジットカード（VISA、Mastercard、JCB、AMEX等）</li>
                  <li>銀行振込</li>
                  <li>コンビニ決済</li>
                </ul>
              </div>
            </div>

            {/* お支払い期限 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">お支払い期限</h3>
              <p className="text-gray-600">
                ご注文確定後から3営業日以内にお支払いください。
              </p>
            </div>

            {/* 返品期限 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">返品期限</h3>
              <p className="text-gray-600">
                商品到着後7日以内にご連絡ください。
              </p>
            </div>

            {/* 返品条件 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">返品条件</h3>
              <p className="text-gray-600">
                お客様都合による返品は、未使用・未開封のものに限ります。返送料はお客様負担となります。
                不良品や誤送品の場合は、送料当店負担で交換・返品を承ります。
              </p>
            </div>

            {/* サービス名 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">サービス名</h3>
              <p className="text-gray-600">
                GOOD BLUE オンラインストア
              </p>
            </div>

            {/* 電話番号 */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">電話番号</h3>
              <p className="text-gray-600">090-3013-7032</p>
              <p className="text-sm text-gray-500 mt-1">
                営業時間：10:00～16:00（不定休）
              </p>
            </div>

            {/* 公開メールアドレス */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-700 mb-2">公開メールアドレス</h3>
              <p className="text-gray-600">info@good-blue.com</p>
            </div>

            {/* ホームページアドレス */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">ホームページアドレス</h3>
              <p className="text-gray-600">https://good-blue.com</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>注意事項</strong><br />
              植物の性質上、商品の色・形・大きさが写真と異なる場合がございます。<br />
              季節により、お届けする苗の状態が異なる場合がございます。
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LegalNoticePage;