import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { Review } from '../types';

interface ReviewListProps {
  reviews: Review[];
  onHelpful?: (reviewId: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, onHelpful }) => {
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('helpful');

  // レビューをソート
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // 星の表示
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // 日付のフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-good-blue-brown/60">
        まだレビューがありません
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ソートオプション */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-good-blue-brown">
          カスタマーレビュー ({reviews.length}件)
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'helpful' | 'rating')}
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
        >
          <option value="helpful">参考になった順</option>
          <option value="newest">新しい順</option>
          <option value="rating">評価の高い順</option>
        </select>
      </div>

      {/* レビューリスト */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-good-blue-gold/10"
          >
            {/* レビューヘッダー */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-medium text-good-blue-brown">
                    {review.userName}
                  </span>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <CheckCircle className="h-3 w-3" />
                      <span>購入済み</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {renderStars(review.rating)}
                  <span className="text-sm text-good-blue-brown/60">
                    {formatDate(review.date)}
                  </span>
                </div>
              </div>
            </div>

            {/* レビュー本文 */}
            <p className="text-good-blue-brown/80 leading-relaxed mb-4">
              {review.comment}
            </p>

            {/* 役立ったボタン */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onHelpful && onHelpful(review.id)}
                className="flex items-center gap-2 text-sm text-good-blue-brown/60 hover:text-good-blue-brown transition-colors"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>役に立った ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;