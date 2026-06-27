import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) {
  
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      
      const numericPrice = parseInt(item.plant.price.replace(/[^\d]/g, ''), 10);
      return total + numericPrice * item.quantity;
    }, 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#050a06]/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0e1b10] border-l border-white/10 shadow-2xl flex flex-col"
            id="cart-drawer-panel"
          >
            {/* header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <h2 className="font-display font-semibold text-xl text-white">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 cursor-pointer"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* items list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-emerald-500/10 p-4 rounded-full border border-emerald-500/20">
                    <ShoppingBag className="w-10 h-10 text-emerald-400/60" />
                  </div>
                  <h3 className="font-display font-medium text-lg text-white">Your cart is empty</h3>
                  <p className="text-sm text-gray-400 max-w-xs">
                    Browse our collection and add some beautiful plants to brighten up your desk!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium text-xs px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  return (
                    <motion.div
                      key={item.plant.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 bg-[#142817]/60 p-3.5 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all duration-300"
                    >
                      {/*product image*/}
                      <div className="w-16 h-16 rounded-xl bg-emerald-950/40 border border-white/5 overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img
                          src={item.plant.image}
                          alt={item.plant.name}
                          className="w-12 h-12 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/*product details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-medium text-sm text-white truncate">
                          {item.plant.name}
                        </h4>
                        <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                          {item.plant.price}
                        </p>
                        
                        {/* qquantity selector */}
                        <div className="flex items-center gap-2.5 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.plant.id, -1)}
                            className="w-6 h-6 rounded-full bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-gray-400 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-semibold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.plant.id, 1)}
                            className="w-6 h-6 rounded-full bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 text-gray-400 flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* remove button */}
                      <button
                        onClick={() => onRemoveItem(item.plant.id)}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-[#0b140d]/90 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Items:</span>
                  <span className="font-semibold text-white">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 font-medium">Subtotal:</span>
                  <span className="text-xl font-display font-bold text-emerald-400">
                    Rs. {calculateTotal()}/-
                  </span>
                </div>

                <button
                  onClick={onCheckout}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-semibold py-3.5 rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/10 cursor-pointer active:scale-[0.98]"
                  id="checkout-btn"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
