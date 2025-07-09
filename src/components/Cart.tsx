import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onContinueShopping,
  onCheckout 
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal >= 5000 ? 0 : 500; // 5000円以上で送料無料
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-good-blue-brown/20 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-good-blue-brown mb-4">カートは空です</h2>
        <p className="text-good-blue-brown/60 mb-8">
          素敵な山野草やカフェメニューを見つけてください
        </p>
        <button
          onClick={onContinueShopping}
          className="inline-flex items-center gap-2 bg-good-blue-gold text-white px-6 py-3 rounded-lg hover:bg-good-blue-gold/90 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          お買い物を続ける
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-good-blue-brown mb-8">ショッピングカート</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* カートアイテム一覧 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h3 className="text-sm md:text-base font-semibold text-good-blue-brown mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-xs md:text-sm text-good-blue-brown/60 mb-2">
                    {item.product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-good-blue-light rounded transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4 text-good-blue-brown" />
                      </button>
                      <span className="w-12 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-good-blue-light rounded transition-colors"
                      >
                        <Plus className="h-4 w-4 text-good-blue-brown" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-good-blue-brown">
                        ¥{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors group"
                      >
                        <Trash2 className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 注文サマリー */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-good-blue-brown mb-4">注文内容</h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-good-blue-brown/60">小計</span>
                <span className="font-medium">¥{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-good-blue-brown/60">送料</span>
                <span className="font-medium">
                  {shippingFee === 0 ? '無料' : `¥${shippingFee.toLocaleString()}`}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-xs text-good-blue-gold">
                  ※ ¥5,000以上のご購入で送料無料
                </p>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-good-blue-brown">合計</span>
                <span className="text-xl font-bold text-good-blue-brown">
                  ¥{total.toLocaleString()}
                </span>
              </div>
            </div>
            
            <button
              onClick={onCheckout}
              className="w-full bg-good-blue-gold text-white py-3 rounded-lg hover:bg-good-blue-gold/90 transition-colors font-medium mb-3"
            >
              レジに進む
            </button>
            
            <button
              onClick={onContinueShopping}
              className="w-full text-good-blue-brown py-2 rounded-lg hover:bg-good-blue-light transition-colors text-sm"
            >
              お買い物を続ける
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;