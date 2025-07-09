import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield, Leaf, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onGoBack: () => void;
  relatedProducts: Product[];
  onProductClick: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  onAddToCart, 
  onGoBack,
  relatedProducts,
  onProductClick
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // 商品画像の配列（実際の実装では複数画像を用意）
  const productImages = [
    product.image,
    // 追加の画像URLをここに追加可能
  ];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // カートに追加後、数量をリセット
  };

  const getDifficultyInfo = () => {
    if (!product.difficulty) return null;
    const difficultyMap = {
      easy: { label: '育てやすさ: 簡単', color: 'text-green-600' },
      medium: { label: '育てやすさ: 普通', color: 'text-yellow-600' },
      hard: { label: '育てやすさ: 難しい', color: 'text-red-600' }
    };
    return difficultyMap[product.difficulty];
  };

  const getRoastInfo = () => {
    if (!product.roastLevel) return null;
    const roastMap = {
      light: { label: '焙煎度: 浅煎り', color: 'text-amber-600' },
      medium: { label: '焙煎度: 中煎り', color: 'text-orange-600' },
      dark: { label: '焙煎度: 深煎り', color: 'text-stone-600' }
    };
    return roastMap[product.roastLevel];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 戻るボタン */}
      <button
        onClick={onGoBack}
        className="flex items-center gap-2 text-good-blue-brown hover:text-good-blue-gold transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>商品一覧に戻る</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* 画像セクション */}
        <div className="space-y-4">
          {/* メイン画像 */}
          <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {product.organic && (
              <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                オーガニック
              </span>
            )}
          </div>
          
          {/* サムネイル画像（複数画像がある場合） */}
          {productImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index 
                      ? 'border-good-blue-gold' 
                      : 'border-gray-200 hover:border-good-blue-gold/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 商品情報セクション */}
        <div className="space-y-6">
          {/* 商品名とカテゴリー */}
          <div>
            <p className="text-sm text-good-blue-gold mb-2">
              {product.category === 'seedlings' ? '花苗' : 'カフェメニュー'}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-good-blue-brown mb-4">
              {product.name}
            </h1>
            <p className="text-good-blue-brown/80 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 特性情報 */}
          <div className="space-y-2">
            {getDifficultyInfo() && (
              <p className={`text-sm font-medium ${getDifficultyInfo()!.color}`}>
                {getDifficultyInfo()!.label}
              </p>
            )}
            {getRoastInfo() && (
              <p className={`text-sm font-medium ${getRoastInfo()!.color}`}>
                {getRoastInfo()!.label}
              </p>
            )}
            {product.bloom && (
              <p className="text-sm text-good-blue-brown">
                <span className="font-medium">開花時期:</span> {product.bloom}
              </p>
            )}
            {product.sunlight && (
              <p className="text-sm text-good-blue-brown">
                <span className="font-medium">日当たり:</span> {product.sunlight}
              </p>
            )}
          </div>

          {/* 価格 */}
          <div className="border-t border-b border-gray-200 py-6">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-good-blue-brown">
                ¥{product.price.toLocaleString()}
              </span>
              <span className="text-sm text-good-blue-brown/60">税込</span>
            </div>
          </div>

          {/* 数量選択とカートボタン */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-good-blue-brown">数量:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-good-blue-light rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4 text-good-blue-brown" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 99}
                  className="p-2 hover:bg-good-blue-light rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4 text-good-blue-brown" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  product.inStock
                    ? 'bg-good-blue-gold text-white hover:bg-good-blue-gold/90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {product.inStock ? 'カートに追加' : '在庫切れ'}
              </button>
              <button className="p-3 border border-good-blue-gold/30 hover:border-good-blue-gold rounded-lg transition-colors">
                <Heart className="h-5 w-5 text-good-blue-brown" />
              </button>
            </div>
          </div>

          {/* 商品特徴 */}
          <div className="bg-good-blue-light/50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-good-blue-brown mb-3">商品の特徴</h3>
            
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-good-blue-gold mt-0.5" />
              <div>
                <p className="font-medium text-sm text-good-blue-brown">全国配送対応</p>
                <p className="text-xs text-good-blue-brown/70 mt-1">
                  5,000円以上のご購入で送料無料
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-good-blue-gold mt-0.5" />
              <div>
                <p className="font-medium text-sm text-good-blue-brown">品質保証</p>
                <p className="text-xs text-good-blue-brown/70 mt-1">
                  プロが厳選した健康な苗をお届け
                </p>
              </div>
            </div>

            {product.organic && (
              <div className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-good-blue-gold mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-good-blue-brown">オーガニック栽培</p>
                  <p className="text-xs text-good-blue-brown/70 mt-1">
                    農薬不使用で安心・安全
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 詳細情報（花苗の場合） */}
          {product.category === 'seedlings' && (
            <div className="border-t pt-6">
              <h3 className="font-semibold text-good-blue-brown mb-4">育て方のポイント</h3>
              <div className="prose prose-sm text-good-blue-brown/80">
                <p>
                  九重の大自然で育った強健な苗です。お届け後は、以下の点にご注意ください：
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>到着後はすぐに箱から出し、水をたっぷり与えてください</li>
                  <li>植え付けは朝夕の涼しい時間帯がおすすめです</li>
                  <li>最初の1週間は直射日光を避け、半日陰で管理してください</li>
                  <li>土が乾いたらたっぷりと水を与えてください</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 関連商品 */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-good-blue-brown mb-6">関連商品</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <button
                key={relatedProduct.id}
                onClick={() => onProductClick(relatedProduct)}
                className="group text-left"
              >
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-good-blue-brown line-clamp-2 group-hover:text-good-blue-gold transition-colors">
                  {relatedProduct.name}
                </h3>
                <p className="text-sm font-bold text-good-blue-brown mt-1">
                  ¥{relatedProduct.price.toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;