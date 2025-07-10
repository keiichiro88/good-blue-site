import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, TrendingDown, Edit2, Save, X, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

interface InventoryManagementProps {
  products: Product[];
  onUpdateStock: (productId: string, newStock: number) => void;
  onUpdateProduct?: (product: Product) => void;
}

interface StockHistory {
  productId: string;
  date: string;
  change: number;
  type: 'sale' | 'restock' | 'adjustment';
  note?: string;
}

const InventoryManagement: React.FC<InventoryManagementProps> = ({
  products,
  onUpdateStock,
  onUpdateProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'seedlings' | 'cafe'>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'out'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: number }>({});
  const [stockHistory, setStockHistory] = useState<StockHistory[]>([]);

  // 在庫履歴のモックデータ
  useEffect(() => {
    const mockHistory: StockHistory[] = [
      { productId: '1', date: '2025-07-09', change: -5, type: 'sale', note: 'オンライン注文' },
      { productId: '2', date: '2025-07-08', change: 20, type: 'restock', note: '新規入荷' },
      { productId: '3', date: '2025-07-07', change: -2, type: 'sale', note: '店頭販売' },
    ];
    setStockHistory(mockHistory);
  }, []);

  // フィルタリング
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStock = 
      stockFilter === 'all' ||
      (stockFilter === 'low' && product.stock !== undefined && product.stock > 0 && product.stock <= 10) ||
      (stockFilter === 'out' && (!product.stock || product.stock === 0));
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  // 在庫レベルの取得
  const getStockLevel = (stock?: number) => {
    if (!stock || stock === 0) return { label: '在庫切れ', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (stock <= 10) return { label: '在庫少', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { label: '在庫あり', color: 'text-green-600', bgColor: 'bg-green-50' };
  };

  // 編集開始
  const startEdit = (productId: string, currentStock: number) => {
    setEditingId(productId);
    setEditValues({ [productId]: currentStock });
  };

  // 編集キャンセル
  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  // 在庫更新
  const saveStock = (productId: string) => {
    const newStock = editValues[productId];
    if (newStock !== undefined && newStock >= 0) {
      onUpdateStock(productId, newStock);
      
      // 履歴に追加
      const product = products.find(p => p.id === productId);
      if (product && product.stock !== undefined) {
        const change = newStock - product.stock;
        const newHistory: StockHistory = {
          productId,
          date: new Date().toISOString().split('T')[0],
          change,
          type: 'adjustment',
          note: '手動調整'
        };
        setStockHistory([newHistory, ...stockHistory]);
      }
    }
    setEditingId(null);
    setEditValues({});
  };

  // 在庫の増減
  const adjustStock = (productId: string, delta: number) => {
    if (editingId === productId) {
      const currentValue = editValues[productId] ?? 0;
      const newStock = Math.max(0, currentValue + delta);
      setEditValues({ [productId]: newStock });
    }
  };

  // 統計情報
  const stats = {
    totalProducts: products.length,
    outOfStock: products.filter(p => !p.stock || p.stock === 0).length,
    lowStock: products.filter(p => p.stock && p.stock > 0 && p.stock <= 10).length,
    totalValue: products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-good-blue-brown mb-8">在庫管理</h1>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-good-blue-brown/60">総商品数</p>
              <p className="text-2xl font-bold text-good-blue-brown">{stats.totalProducts}</p>
            </div>
            <Package className="h-8 w-8 text-good-blue-gold" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-good-blue-brown/60">在庫切れ</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-good-blue-brown/60">在庫少</p>
              <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-good-blue-brown/60">在庫総額</p>
              <p className="text-xl font-bold text-good-blue-brown">¥{stats.totalValue.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-good-blue-brown mb-2">商品検索</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="商品名で検索..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-good-blue-brown mb-2">カテゴリー</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as 'all' | 'seedlings' | 'cafe')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
            >
              <option value="all">すべて</option>
              <option value="seedlings">花苗</option>
              <option value="cafe">カフェメニュー</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-good-blue-brown mb-2">在庫状態</label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as 'all' | 'low' | 'out')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
            >
              <option value="all">すべて</option>
              <option value="low">在庫少（10以下）</option>
              <option value="out">在庫切れ</option>
            </select>
          </div>
        </div>
      </div>

      {/* 在庫テーブル */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-good-blue-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-good-blue-brown uppercase tracking-wider">
                  商品名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-good-blue-brown uppercase tracking-wider">
                  カテゴリー
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-good-blue-brown uppercase tracking-wider">
                  価格
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-good-blue-brown uppercase tracking-wider">
                  在庫数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-good-blue-brown uppercase tracking-wider">
                  状態
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-good-blue-brown uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const stockLevel = getStockLevel(product.stock);
                const isEditing = editingId === product.id;
                const currentStock = isEditing ? editValues[product.id] : product.stock || 0;

                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-good-blue-brown">
                            {product.name}
                          </div>
                          <div className="text-xs text-good-blue-brown/60">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-good-blue-brown">
                        {product.category === 'seedlings' ? '花苗' : 'カフェ'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-good-blue-brown">
                        ¥{product.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => adjustStock(product.id, -1)}
                            className="p-1 hover:bg-gray-200 rounded"
                            disabled={currentStock <= 0}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            type="number"
                            value={currentStock}
                            onChange={(e) => setEditValues({ [product.id]: parseInt(e.target.value) || 0 })}
                            className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                            min="0"
                          />
                          <button
                            onClick={() => adjustStock(product.id, 1)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm font-medium text-good-blue-brown">
                          {product.stock || 0}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockLevel.bgColor} ${stockLevel.color}`}>
                        {stockLevel.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveStock(product.id)}
                            className="text-green-600 hover:text-green-700"
                            title="保存"
                          >
                            <Save className="h-5 w-5" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-600 hover:text-red-700"
                            title="キャンセル"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(product.id, product.stock || 0)}
                          className="text-good-blue-gold hover:text-good-blue-gold/80"
                          title="編集"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 最近の在庫変動 */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-good-blue-brown mb-4">最近の在庫変動</h2>
        <div className="space-y-2">
          {stockHistory.slice(0, 5).map((history, index) => {
            const product = products.find(p => p.id === history.productId);
            if (!product) return null;

            return (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    history.change > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {history.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-good-blue-brown">{product.name}</p>
                    <p className="text-xs text-good-blue-brown/60">
                      {history.date} - {history.note}
                    </p>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  history.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {history.change > 0 ? '+' : ''}{history.change}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;