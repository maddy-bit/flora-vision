import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, MessageSquare } from 'lucide-react';

export default function ReviewFormModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !text) return;
    onSubmit({ name, rating, text });
    setName('');
    setRating(5);
    setText('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Form Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0e1b10] border border-white/10 rounded-[28px] overflow-hidden p-6 shadow-2xl z-10 space-y-5"
            id="review-form-modal"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display font-semibold text-lg text-white">Write a Review</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-white/5 cursor-pointer"
                id="close-review-form-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 block">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Emily Watson"
                  className="w-full bg-[#142817]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  id="review-input-name"
                />
              </div>

              {/* Rating */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 block">Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-2xl transition-colors duration-200 cursor-pointer p-0.5 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-gray-400 font-medium ml-2">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Comment text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 block">Your Review</label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your thoughts about your plant collection experience with FloraVision..."
                  className="w-full bg-[#142817]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all resize-none"
                  id="review-input-text"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-3.5 rounded-xl transition-all duration-300 shadow-xl shadow-emerald-500/10 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                id="review-submit-btn"
              >
                <Heart className="w-4 h-4 fill-current" />
                Submit Review
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
