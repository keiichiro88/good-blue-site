import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '../types';

interface ReviewSummaryProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ reviews, averageRating }) => {
  // 評価ごとのレビュー数を計算
  const ratingCounts = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const totalReviews = reviews.length;

  // 星の表示
  const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
    const starSize = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (totalReviews === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-good-blue-gold/10">
        <div className="text-center">
          <p className="text-good-blue-brown/60 mb-2">まだレビューがありません</p>
          <p className="text-sm text-good-blue-brown/40">
            最初のレビューを投稿してみませんか？
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-good-blue-gold/10">
      <h3 className="text-lg font-semibold text-good-blue-brown mb-4">
        カスタマー評価
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 総合評価 */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            {renderStars(averageRating, 'lg')}
            <span className="text-2xl font-bold text-good-blue-brown">
              {averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-good-blue-brown/60">
            {totalReviews}件のレビュー
          </p>
        </div>

        {/* 評価分布 */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingCounts[rating as keyof typeof ratingCounts];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-sm text-good-blue-brown hover:text-good-blue-gold transition-colors">
                  <span>{rating}</span>
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                </button>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-good-blue-brown/60 w-12 text-right">
                  {percentage.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 購入済みバッジの説明 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-good-blue-brown/60">
          ※「購入済み」マークは、実際に商品を購入されたお客様のレビューです
        </p>
      </div>
    </div>
  );
};

export default ReviewSummary;