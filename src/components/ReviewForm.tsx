import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: {
    productId: string;
    userName: string;
    rating: number;
    comment: string;
  }) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit, onCancel }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{
    userName?: string;
    rating?: string;
    comment?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!userName.trim()) {
      newErrors.userName = 'お名前を入力してください';
    }

    if (rating === 0) {
      newErrors.rating = '評価を選択してください';
    }

    if (!comment.trim()) {
      newErrors.comment = 'レビューを入力してください';
    } else if (comment.length < 10) {
      newErrors.comment = 'レビューは10文字以上で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        productId,
        userName: userName.trim(),
        rating,
        comment: comment.trim()
      });
      
      // フォームをリセット
      setUserName('');
      setRating(0);
      setComment('');
      setErrors({});
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-good-blue-gold/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-good-blue-brown">
          レビューを投稿
        </h3>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-good-blue-light rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-good-blue-brown" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* お名前 */}
        <div>
          <label className="block text-sm font-medium text-good-blue-brown mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent ${
              errors.userName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="山田太郎"
          />
          {errors.userName && (
            <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
          )}
        </div>

        {/* 評価 */}
        <div>
          <label className="block text-sm font-medium text-good-blue-brown mb-1">
            評価 <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-good-blue-brown/60">
              {rating > 0 && `${rating}つ星`}
            </span>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
          )}
        </div>

        {/* レビュー本文 */}
        <div>
          <label className="block text-sm font-medium text-good-blue-brown mb-1">
            レビュー <span className="text-red-500">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent resize-none ${
              errors.comment ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="商品の感想をお聞かせください（10文字以上）"
          />
          <div className="flex items-center justify-between mt-1">
            {errors.comment && (
              <p className="text-red-500 text-xs">{errors.comment}</p>
            )}
            <p className="text-xs text-good-blue-brown/60 ml-auto">
              {comment.length}文字
            </p>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-good-blue-light/50 rounded-lg p-4 text-sm text-good-blue-brown/80">
          <p className="font-medium mb-1">投稿時のご注意</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>誹謗中傷や不適切な表現はお控えください</li>
            <li>個人情報の記載はお避けください</li>
            <li>投稿されたレビューは公開されます</li>
          </ul>
        </div>

        {/* ボタン */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-good-blue-gold text-white py-2 px-4 rounded-lg hover:bg-good-blue-gold/90 transition-colors font-medium"
          >
            レビューを投稿
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-good-blue-gold/30 rounded-lg hover:bg-good-blue-light transition-colors"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;