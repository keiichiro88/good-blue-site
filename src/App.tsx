import React, { useState, useEffect } from 'react';
import EnhancedHeader from './components/EnhancedHeader';
import ResponsiveHero from './components/ResponsiveHero';
import FeatureSection from './components/FeatureSection';
import CategoryShowcase from './components/CategoryShowcase';
import SeasonalRecommendations from './components/SeasonalRecommendations';
import HeroContent from './components/HeroContent';
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import AboutSection from './components/AboutSection';
import NewFooter from './components/NewFooter';
import Cart from './components/Cart';
import Toast from './components/Toast';
import NewProductDetail from './components/NewProductDetail';
import Checkout from './components/Checkout';
import SearchResults from './components/SearchResults';
import Favorites from './components/Favorites';
import InventoryManagement from './components/InventoryManagement';
import CoffeeCategoryPage from './components/CoffeeCategoryPage';
import SeedlingsCategoryPage from './components/SeedlingsCategoryPage';
import OnlineStorePage from './components/OnlineStorePage';
import CareGuidePage from './components/CareGuidePage';
import ComingSoonPage from './components/ComingSoonPage';
import LegalNoticePage from './components/LegalNoticePage';
import { Phone } from 'lucide-react';
import { products as initialProducts } from './data/products';
import { reviews as initialReviews } from './data/reviews';
import { Product, FilterOptions, CartItem, Review } from './types';

function App() {
  // URLハッシュから初期カテゴリーを取得
  const getInitialCategory = () => {
    const hash = window.location.hash.slice(1); // #を除去
    return hash || 'all';
  };

  const [currentCategory, setCurrentCategory] = useState<string>(getInitialCategory());
  
  // ローカルストレージからカートを復元
  const getInitialCart = (): CartItem[] => {
    try {
      const savedCart = localStorage.getItem('goodblue-cart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('カートの復元に失敗しました:', error);
    }
    return [];
  };

  // ローカルストレージからお気に入りを復元
  const getInitialFavorites = (): Product[] => {
    try {
      const savedFavorites = localStorage.getItem('goodblue-favorites');
      if (savedFavorites) {
        return JSON.parse(savedFavorites);
      }
    } catch (error) {
      console.error('お気に入りの復元に失敗しました:', error);
    }
    return [];
  };

  const [cart, setCart] = useState<CartItem[]>(getInitialCart());
  const [filters, setFilters] = useState<FilterOptions>({ category: 'all' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Product[]>(getInitialFavorites());
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [comingSoonPage, setComingSoonPage] = useState<string | null>(null);

  // URLハッシュが変更された時の処理
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && hash !== currentCategory) {
        handleCategoryChange(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentCategory]);

  // カテゴリーが変更された時にURLハッシュを更新
  useEffect(() => {
    if (currentCategory !== 'all') {
      window.location.hash = currentCategory;
    } else {
      // ホームページの場合はハッシュを削除
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [currentCategory]);

  // カートが変更された時にローカルストレージに保存
  useEffect(() => {
    try {
      localStorage.setItem('goodblue-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('カートの保存に失敗しました:', error);
    }
  }, [cart]);

  // お気に入りが変更された時にローカルストレージに保存
  useEffect(() => {
    try {
      localStorage.setItem('goodblue-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('お気に入りの保存に失敗しました:', error);
    }
  }, [favorites]);

  const handleCategoryChange = (category: string) => {
    // 準備中ページの処理
    if (['blog', 'interview', 'wholesale'].includes(category)) {
      const pageNames: Record<string, string> = {
        'blog': 'ブログ',
        'interview': 'インタビュー',
        'wholesale': '業務用卸売販売'
      };
      setComingSoonPage(pageNames[category]);
      return;
    }
    
    setCurrentCategory(category);
    setFilters({ 
      category: category === 'all' ? 'all' : category.includes('seedlings') || ['houseplants', 'fruit-trees', 'flowering-trees'].includes(category) ? 'seedlings' : category.includes('coffee') || ['single-origin', 'blends', 'organic'].includes(category) ? 'coffee' : 'all' 
    });
    setSelectedProduct(null); // カテゴリー変更時に商品詳細を閉じる
    setSearchQuery(''); // カテゴリー変更時に検索をクリア
    setComingSoonPage(null); // 準備中ページをリセット
    
    // 特定のページに遷移時は上部にスクロール
    if (category === 'cart' || category === 'checkout' || category === 'favorites' || category === 'inventory' || 
        category === 'seedlings' || category === 'coffee' || category === 'gift') {
      window.scrollTo(0, 0);
    }
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setToast({ show: true, message: `${product.name}をカートに追加しました` });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const handleContinueShopping = () => {
    setCurrentCategory('all');
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setCurrentCategory('checkout');
  };

  const handleOrderComplete = () => {
    // 注文完了後の処理
    setCart([]); // カートを空にする
    setShowCheckout(false);
    setCurrentCategory('all');
    setToast({ show: true, message: 'ご注文ありがとうございました！' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const handleGoBack = () => {
    setSelectedProduct(null);
  };

  const getRelatedProducts = (product: Product) => {
    // 同じカテゴリーの商品を関連商品として表示（現在の商品を除く）
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentCategory('search');
    setSelectedProduct(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentCategory('all');
  };

  const handleToggleFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id);
      if (isFavorite) {
        setToast({ show: true, message: `${product.name}をお気に入りから削除しました` });
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        setToast({ show: true, message: `${product.name}をお気に入りに追加しました` });
        return [...prevFavorites, product];
      }
    });
  };

  const handleRemoveFavorite = (productId: string) => {
    setFavorites(prevFavorites => {
      const product = prevFavorites.find(fav => fav.id === productId);
      if (product) {
        setToast({ show: true, message: `${product.name}をお気に入りから削除しました` });
      }
      return prevFavorites.filter(fav => fav.id !== productId);
    });
  };

  const isFavorite = (productId: string) => {
    return favorites.some(fav => fav.id === productId);
  };

  const handleReviewSubmit = (review: { productId: string; userName: string; rating: number; comment: string }) => {
    const newReview: Review = {
      id: `r${reviews.length + 1}`,
      productId: review.productId,
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: false
    };
    setReviews([...reviews, newReview]);
    setToast({ show: true, message: 'レビューを投稿しました' });
  };

  const handleReviewHelpful = (reviewId: string) => {
    setReviews(prevReviews =>
      prevReviews.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  // 在庫更新ハンドラー
  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, stock: newStock, inStock: newStock > 0 }
          : product
      )
    );
    setToast({ show: true, message: '在庫を更新しました' });
  };

  // 商品更新ハンドラー
  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setToast({ show: true, message: '商品情報を更新しました' });
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(review => review.productId === productId);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const showHero = currentCategory === 'all' && !selectedProduct;
  const showProducts = ['all', 'houseplants', 'fruit-trees', 'flowering-trees', 'single-origin', 'blends', 'organic'].includes(currentCategory) && !selectedProduct;
  const showCart = currentCategory === 'cart' && !showCheckout;
  const showProductDetail = selectedProduct !== null;
  const showCheckoutPage = showCheckout && currentCategory === 'checkout';
  const showSearchResults = currentCategory === 'search' && !selectedProduct;
  const showFavorites = currentCategory === 'favorites' && !selectedProduct;
  const showInventory = currentCategory === 'inventory' && !selectedProduct;
  const showCoffeeCategory = currentCategory === 'coffee' && !selectedProduct;
  const showSeedlingsCategory = currentCategory === 'seedlings' && !selectedProduct;
  const showOnlineStore = currentCategory === 'store' && !selectedProduct;
  const showCareGuide = currentCategory === 'care' && !selectedProduct;
  const showContact = currentCategory === 'contact' && !selectedProduct;
  const showLegalNotice = currentCategory === 'legal' && !selectedProduct;

  return (
    <div className="min-h-screen bg-good-blue-cream">
      <EnhancedHeader 
        onCategoryChange={handleCategoryChange} 
        cartItemCount={cartItemCount}
        onSearch={handleSearch}
        favoritesCount={favorites.length}
      />
      
      {comingSoonPage && (
        <ComingSoonPage
          pageName={comingSoonPage}
          onGoBack={() => {
            setComingSoonPage(null);
            handleCategoryChange('all');
          }}
        />
      )}
      
      {!comingSoonPage && showHero && (
        <>
          <ResponsiveHero onCategoryChange={handleCategoryChange} />
          <CategoryShowcase onCategoryChange={handleCategoryChange} />
          <FeatureSection onCategoryChange={handleCategoryChange} />
          <SeasonalRecommendations
            products={products}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
          <AboutSection />
        </>
      )}

      {!comingSoonPage && showProducts && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-good-blue-cream/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-64 flex-shrink-0">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                />
              </div>
              
              <ProductGrid
                products={products}
                filters={filters}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
              />
            </div>
          </div>
        </div>
      )}

      {!comingSoonPage && showProductDetail && selectedProduct && (
        <NewProductDetail
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          onGoBack={handleGoBack}
          relatedProducts={getRelatedProducts(selectedProduct)}
          onProductClick={handleProductClick}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite(selectedProduct.id)}
          reviews={getProductReviews(selectedProduct.id)}
          onReviewSubmit={handleReviewSubmit}
          onReviewHelpful={handleReviewHelpful}
        />
      )}

      {!comingSoonPage && showCart && (
        <Cart
          cartItems={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onContinueShopping={handleContinueShopping}
          onCheckout={handleCheckout}
        />
      )}

      {!comingSoonPage && showCheckoutPage && (
        <Checkout
          cartItems={cart}
          onBack={() => {
            setShowCheckout(false);
            setCurrentCategory('cart');
          }}
          onOrderComplete={handleOrderComplete}
        />
      )}

      {!comingSoonPage && showSearchResults && (
        <SearchResults
          searchQuery={searchQuery}
          products={products}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onClearSearch={handleClearSearch}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
        />
      )}

      {!comingSoonPage && showFavorites && (
        <Favorites
          favorites={favorites}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          onRemoveFavorite={handleRemoveFavorite}
          onContinueShopping={handleContinueShopping}
        />
      )}

      {!comingSoonPage && showInventory && (
        <InventoryManagement
          products={products}
          onUpdateStock={handleUpdateStock}
          onUpdateProduct={handleUpdateProduct}
        />
      )}

      {!comingSoonPage && showCoffeeCategory && (
        <CoffeeCategoryPage
          products={products}
          filters={filters}
          onFiltersChange={setFilters}
          isFilterOpen={isFilterOpen}
          onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {!comingSoonPage && showSeedlingsCategory && (
        <SeedlingsCategoryPage
          products={products}
          filters={filters}
          onFiltersChange={setFilters}
          isFilterOpen={isFilterOpen}
          onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
          onAddToCart={handleAddToCart}
          onProductClick={handleProductClick}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {!comingSoonPage && showOnlineStore && (
        <OnlineStorePage
          onCategoryChange={handleCategoryChange}
        />
      )}

      {!comingSoonPage && currentCategory === 'guide' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-good-blue-brown mb-8 text-center">店舗情報・アクセス</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 左側：店舗情報 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-good-blue-brown mb-4">店舗情報</h3>
                  <p className="text-good-blue-brown/80 mb-4">
                    花とカフェ goodblue (グッドブルー）<br />
                    〒879-4911<br />
                    大分県玖珠郡九重町田野1672-18<br />
                    TEL: 090-3013-7032
                  </p>
                  <p className="text-sm text-good-blue-brown/60">
                    ※お食事処「くじゅう野の花の郷」に隣接
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-good-blue-brown mb-4">営業時間</h3>
                  <p className="text-good-blue-brown/80 mb-4">
                    10:00 - 16:00<br />
                    店休日：不定休
                  </p>
                  <p className="text-sm text-good-blue-brown/60">
                    ※季節や天候により営業時間が変更になる場合がございます。<br />
                    お越しの際は事前にお電話でご確認ください。
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-good-blue-brown mb-4">交通アクセス</h3>
                  <p className="text-good-blue-brown/80">
                    九重の大自然に囲まれた素晴らしい環境でお待ちしております。<br />
                    お車でお越しの際は、「くじゅう野の花の郷」を目印にお越しください。
                  </p>
                </div>
              </div>
            </div>
            
            {/* 右側：Google Map */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-semibold text-good-blue-brown mb-4">地図</h3>
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3340.3592442902745!2d131.22118!3d33.15219439999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35414b9342675cbd%3A0x867229b41315d3f3!2z6Iqx44Go44Kr44OV44KnIGdvb2QgYmx1Ze-8iOOCsOODg-ODieODluODq-ODvO-8iQ!5e0!3m2!1sja!2sjp!4v1752116557388!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="花とカフェ goodblue (グッドブルー）の地図"
                ></iframe>
              </div>
              <p className="text-sm text-good-blue-brown/60 mt-4">
                ※地図をクリックすると、Google Mapsが開きます
              </p>
            </div>
          </div>
        </div>
      )}

      {!comingSoonPage && showCareGuide && (
        <CareGuidePage
          onCategoryChange={handleCategoryChange}
        />
      )}

      {!comingSoonPage && showContact && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-good-blue-brown mb-8 text-center">お問い合わせ</h2>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <p className="text-good-blue-brown/80 mb-6">
              お花のご注文、カフェのご予約、その他ご不明な点がございましたら、<br />
              お気軽にお問い合わせください。
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-good-blue-gold" />
                <div>
                  <p className="font-semibold text-good-blue-brown">090-3013-7032</p>
                  <p className="text-sm text-good-blue-brown/60">受付時間: 10:00 - 16:00</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-good-blue-light rounded-lg">
                <p className="text-sm text-good-blue-brown/80">
                  <strong>ご注文について</strong><br />
                  ・ブーケやアレンジメントは、ご希望をお伺いしてお作りいたします<br />
                  ・季節の花の入荷状況により、ご希望に添えない場合がございます<br />
                  ・カフェのご予約も承っております
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {!comingSoonPage && showLegalNotice && (
        <LegalNoticePage
          onCategoryChange={handleCategoryChange}
        />
      )}

      {!comingSoonPage && <NewFooter />}
      
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ show: false, message: '' })}
      />
    </div>
  );
}

export default App;