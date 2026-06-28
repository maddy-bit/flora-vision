import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  aglaonema,
  topiary,
} from "./assets/images";
import {
  ShoppingBag,
  Search,
  Star,
  Play,
  ChevronRight,
  ChevronLeft,
  Heart,
  Plus,
  X,
  Sparkles,
  Award,
  Filter,
  CheckCircle,
  Leaf
} from 'lucide-react';

import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import PlantModal from './components/PlantModal';
import ReviewFormModal from './components/ReviewFormModal';

import {
  TOP_SELLING_PLANTS,
  TRENDY_PLANTS,
  REVIEWS,
  HERO_REVIEW,
  O2_PLANTS_SLIDES
} from './data';

export default function App() {
  // Application
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Plant lists & filter
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // O2 Slideshow
  const [o2Index, setO2Index] = useState(0);

  // Success message state for interactions
  const [notification, setNotification] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');

  // Cart Handle
  const handleAddToCart = (plant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.plant.id === plant.id);
      if (existing) {
        return prev.map((item) =>
          item.plant.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { plant, quantity: 1 }];
    });

    // notification
    showNotification(`Added ${plant.name} to your cart!`);
  };

  const handleUpdateCartQuantity = (id, delta) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.plant.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.plant.id !== id));
    showNotification("Item removed from cart");
  };

  const handleCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    showNotification("🎉 Checkout Successful! Thank you for ordering from FloraVision.");
  };

  // Notification system
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Add customized reviews
  const handleAddReview = (newReviewData) => {
    const freshReview = {
      ...newReviewData,
      id: `custom-review-${Date.now()}`,
      avatar: `/src/assets/images/avatar_shelly_1782552418424.jpg` // Default to a gorgeous avatar
    };
    setReviewsList((prev) => [freshReview, ...prev]);
    showNotification("Heartfelt thanks for your review!");
  };

  // Filter Categories
  const categories = useMemo(() => {
    const list = new Set(TOP_SELLING_PLANTS.map((p) => p.category));
    return ['All', ...Array.from(list)];
  }, []);

  // filtered plants
  const filteredPlants = useMemo(() => {
    return TOP_SELLING_PLANTS.filter((plant) => {
      const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Subscribe
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setIsSubscribed(true);
    setSubscribeEmail('');
    showNotification("📧 Subscribed successfully to FloraVision updates!");
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0b140d] text-gray-200 relative overflow-hidden flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-900">

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl relative">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute -top-16 right-0 p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search for indoor plants, succulents, cactus..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#122214] border border-white/10 rounded-3xl pl-14 pr-6 py-5 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all shadow-xl"
                  />
                </div>

                <div className="flex gap-2 justify-center flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsSearchOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 border ${selectedCategory === cat
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#122c16] border border-emerald-500/30 text-emerald-200 px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3.5 max-w-sm backdrop-blur-md"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-xs font-medium leading-relaxed">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
        onHomeClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onProductsClick={() => {
          document.getElementById('top-selling')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onReviewsClick={() => {
          document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 space-y-24 md:space-y-32 py-10">

        {/* BACKGROUND TOPIARY TREE WRAPPER */}
        <div className="relative">
          {/* Centered Topiary Tree*/}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-full max-w-5xl aspect-square pointer-events-none z-0 overflow-visible opacity-80 select-none">
            <div className="absolute inset-12 bg-emerald-500/10 rounded-full blur-[120px]" />
            <img
              src={topiary}
              alt="Background Tree"
              className="w-full h-full object-contain opacity-75 select-none pointer-events-none scale-100 md:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* relative content container */}
          <div className="relative z-10 space-y-24 md:space-y-32">

            {/* HERO SECTION */}
            <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[75vh]" id="hero">

              <div className="absolute top-0 right-1/4 w-96 h-96 nature-glow pointer-events-none -translate-y-1/3" />

              {/* Info & Badges */}
              <div className="lg:col-span-7 space-y-8 relative z-10">
                {/*Badge */}
                <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  Premium Botanicals
                </div>


                <div className="space-y-4">
                  <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight leading-[0.95]">
                    Earth’s Exhale
                  </h1>
                  <p className="text-sm text-gray-400 max-w-lg font-medium leading-relaxed">
                    "Earth Exhale" symbolizes the purity and vitality of the Earth's natural environment and its essential role in sustaining life.
                  </p>
                </div>

                {/*BUY NOW BUTTON */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      document.getElementById('top-selling')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-8 py-4 rounded-full transition-all duration-300 shadow-xl shadow-emerald-500/15 cursor-pointer hover:translate-y-[-2px] active:translate-y-0"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={() => {

                      document.getElementById('o2-section')?.scrollIntoView({ behavior: 'smooth' });
                      showNotification("🌱 Scrolling to the O2 Plant Live Demo section!");
                    }}
                    className="flex items-center gap-2.5 text-xs font-semibold text-white hover:text-emerald-400 transition-colors py-3 px-5 rounded-full hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-emerald-500/20">
                      <Play className="w-3.5 h-3.5 fill-current text-white" />
                    </div>
                    Live Demo
                  </button>
                </div>


                <div className="pt-6">
                  <div className="glass-panel p-5 rounded-[24px] border border-white/10 max-w-sm hover:border-emerald-500/30 transition-all duration-300 shadow-lg">
                    <div className="flex items-center gap-3.5 mb-2.5">
                      <img
                        src={HERO_REVIEW.avatar}
                        alt={HERO_REVIEW.name}
                        className="w-10 h-10 rounded-full object-cover border border-emerald-500/20"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white leading-none">{HERO_REVIEW.name}</h4>
                        <div className="flex text-yellow-500 mt-1">
                          {[...Array(HERO_REVIEW.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
                      "{HERO_REVIEW.text}"
                    </p>
                  </div>
                </div>
              </div>

              {/* aglaonema plant card */}
              <div className="lg:col-span-5 relative flex justify-center z-10 lg:pl-6">
                <div className="relative group w-full max-w-[340px]">


                  <div className="absolute -inset-4 bg-emerald-500/10 rounded-[42px] blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500" />


                  <div className="relative overflow-hidden glass-panel border border-white/12 rounded-[38px] p-6 text-center shadow-2xl transition-all duration-500 hover:translate-y-[-4px]">


                    <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/10">
                      Indoor Plant
                    </span>

                    {/*Product image */}
                    <div className="my-6 relative flex justify-center h-56 items-center">
                      <img
                        src="/src/assets/images/aglaonema_plant_1782552273018.jpg"
                        alt="Aglaonema plant"
                        className="w-48 h-48 object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Product Meta */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <h3 className="font-display font-bold text-lg text-white">Aglaonema plant</h3>
                        <ChevronRight className="w-5 h-5 text-emerald-400 cursor-pointer hover:translate-x-1 transition-transform" />
                      </div>

                      <button
                        onClick={() => {
                          const top1 = TOP_SELLING_PLANTS.find(p => p.id === 'top-1');
                          if (top1) handleAddToCart(top1);
                        }}
                        className="w-full bg-white hover:bg-emerald-400 hover:text-slate-950 text-[#0b140d] font-bold text-xs py-3 rounded-full transition-all duration-300 shadow-md cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>

                    {/* Pagination Dots Indicator */}
                    <div className="flex justify-center gap-1.5 mt-5">
                      <span className="w-5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            </section>


            {/* PLANTS SECTION */}
            <section className="space-y-12" id="trendy-plants">

              {/* Header Title*/}
              <div className="flex justify-center">
                <div className="flex items-center gap-2 bg-emerald-950/40 border border-white/5 px-6 py-2 rounded-full backdrop-blur-md">
                  <span className="text-emerald-500 font-light text-2xl">[</span>
                  <h2 className="font-display font-semibold text-2xl md:text-3xl text-white tracking-tight">
                    Our Trendy plants
                  </h2>
                  <span className="text-emerald-500 font-light text-2xl">]</span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* Card 1*/}
                <div className="trendy-card-left glass-panel border border-white/12 hover:border-emerald-500/30 p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group shadow-2xl transition-all duration-300">

                  <div className="w-48 h-48 md:w-56 md:h-56 relative flex justify-center items-center flex-shrink-0">
                    <div className="absolute inset-4 nature-glow rounded-full" />
                    <img
                      src={TRENDY_PLANTS[0].image}
                      alt={TRENDY_PLANTS[0].title}
                      className="w-40 h-40 md:w-48 md:h-48 object-contain z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>


                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="font-display font-semibold text-xl text-white">
                      {TRENDY_PLANTS[0].title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                      {TRENDY_PLANTS[0].text}
                    </p>
                    <div className="text-emerald-400 font-display font-bold text-lg">
                      {TRENDY_PLANTS[0].price}
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <button
                        onClick={() => {
                          //trendy plant mapping
                          const item = {
                            id: TRENDY_PLANTS[0].id,
                            name: TRENDY_PLANTS[0].title,
                            description: TRENDY_PLANTS[0].text,
                            price: TRENDY_PLANTS[0].price,
                            image: TRENDY_PLANTS[0].image,
                            category: 'Trendy'
                          };
                          setSelectedPlant(item);
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-white/5 transition-all cursor-pointer"
                      >
                        Explore
                      </button>
                      <button
                        onClick={() => {
                          const item = {
                            id: TRENDY_PLANTS[0].id,
                            name: TRENDY_PLANTS[0].title,
                            description: TRENDY_PLANTS[0].text,
                            price: TRENDY_PLANTS[0].price,
                            image: TRENDY_PLANTS[0].image,
                            category: 'Trendy'
                          };
                          handleAddToCart(item);
                        }}
                        className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all cursor-pointer"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2*/}
                <div className="trendy-card-right glass-panel border border-white/12 hover:border-emerald-500/30 p-8 flex flex-col md:flex-row-reverse items-center gap-6 relative overflow-hidden group shadow-2xl transition-all duration-300">

                  <div className="w-48 h-48 md:w-56 md:h-56 relative flex justify-center items-center flex-shrink-0">
                    <div className="absolute inset-4 nature-glow rounded-full" />
                    <img
                      src={TRENDY_PLANTS[1].image}
                      alt={TRENDY_PLANTS[1].title}
                      className="w-40 h-40 md:w-48 md:h-48 object-contain z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Text details */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="font-display font-semibold text-xl text-white">
                      {TRENDY_PLANTS[1].title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                      {TRENDY_PLANTS[1].text}
                    </p>
                    <div className="text-emerald-400 font-display font-bold text-lg">
                      {TRENDY_PLANTS[1].price}
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <button
                        onClick={() => {
                          const item = {
                            id: TRENDY_PLANTS[1].id,
                            name: TRENDY_PLANTS[1].title,
                            description: TRENDY_PLANTS[1].text,
                            price: TRENDY_PLANTS[1].price,
                            image: TRENDY_PLANTS[1].image,
                            category: 'Trendy'
                          };
                          setSelectedPlant(item);
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-2.5 rounded-xl border border-white/5 transition-all cursor-pointer"
                      >
                        Explore
                      </button>
                      <button
                        onClick={() => {
                          const item = {
                            id: TRENDY_PLANTS[1].id,
                            name: TRENDY_PLANTS[1].title,
                            description: TRENDY_PLANTS[1].text,
                            price: TRENDY_PLANTS[1].price,
                            image: TRENDY_PLANTS[1].image,
                            category: 'Trendy'
                          };
                          handleAddToCart(item);
                        }}
                        className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all cursor-pointer"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>
        </div>

        {/*TOP SELLING PLANTS */}
        <section className="space-y-12" id="top-selling">

          {/* Header*/}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-light text-2xl">[</span>
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-white tracking-tight">
                Our Top Selling Plants
              </h2>
              <span className="text-emerald-500 font-light text-2xl">]</span>
            </div>

            {/* Inline filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 max-w-full">
              <Filter className="w-4 h-4 text-emerald-400 mr-1 flex-shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${selectedCategory === cat
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-[#142817]/40 text-gray-400 hover:text-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid 6 Plants */}
          {filteredPlants.length === 0 ? (
            <div className="text-center py-16 space-y-4 bg-white/5 rounded-3xl p-8">
              <p className="text-gray-400 font-medium text-sm">No plants match your selected filter or search keyword.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-6 py-2.5 rounded-full transition-all"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredPlants.map((plant) => {
                return (
                  <motion.div
                    key={plant.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="arch-card-shape bg-[#122214] border border-white/5 hover:border-emerald-500/20 p-6 flex flex-col items-center justify-between text-center group shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
                  >

                    <button
                      onClick={() => setSelectedPlant(plant)}
                      className="w-full relative py-6 flex justify-center h-48 items-center cursor-pointer"
                    >
                      <div className="absolute inset-4 nature-glow rounded-full scale-75 group-hover:scale-95 transition-transform duration-500" />
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-40 h-40 object-contain z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </button>


                    <div className="w-full space-y-4 mt-4">
                      <div className="space-y-1.5">
                        <button
                          onClick={() => setSelectedPlant(plant)}
                          className="font-display font-bold text-lg text-white hover:text-emerald-300 transition-colors text-center w-full block cursor-pointer"
                        >
                          {plant.name}
                        </button>
                        <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto line-clamp-2">
                          {plant.description}
                        </p>
                      </div>

                      {/*Price,add icon */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-4">
                        <span className="text-base font-display font-bold text-emerald-400">
                          {plant.price}
                        </span>

                        <button
                          onClick={() => handleAddToCart(plant)}
                          className="p-3 bg-white/5 hover:bg-emerald-500 hover:text-slate-950 text-gray-300 rounded-xl transition-all duration-300 border border-white/5 hover:border-transparent cursor-pointer"
                          aria-label={`Add ${plant.name} to cart`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>


        {/* CUSTOMER REVIEWS */}
        <section className="space-y-12" id="reviews-section">

          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-light text-2xl">[</span>
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-white tracking-tight">
                Customer Review
              </h2>
              <span className="text-emerald-500 font-light text-2xl">]</span>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs px-6 py-3 rounded-full transition-all cursor-pointer self-start"
            >
              Write A Review
            </button>
          </div>

          {/* Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {reviewsList.map((review) => {
                return (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-panel p-6 rounded-[28px] border border-white/10 hover:border-emerald-500/20 shadow-xl flex flex-col justify-between group transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Avatar,Name,Stars row */}
                      <div className="flex items-center gap-3.5">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-11 h-11 rounded-full object-cover border border-emerald-500/10"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-white">{review.name}</h4>
                          <div className="flex text-yellow-500 mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>


                      <p className="text-xs text-gray-300 leading-relaxed font-medium">
                        "{review.text}"
                      </p>
                    </div>

                    {/*leaf footer*/}
                    <div className="flex justify-end pt-4 mt-4 border-t border-white/5">
                      <Leaf className="w-4 h-4 text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>


        {/*O2 SECTION*/}
        <section className="space-y-12" id="o2-section">

          {/* header */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-light text-2xl">[</span>
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-white tracking-tight">
                Our Best o2
              </h2>
              <span className="text-emerald-500 font-light text-2xl">]</span>
            </div>
          </div>

          {/* big slide card */}
          <div className="glass-panel rounded-[38px] p-8 md:p-12 border border-white/10 overflow-hidden relative shadow-2xl">

            <div className="absolute top-0 right-0 w-80 h-80 nature-glow pointer-events-none -translate-y-1/3" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

              {/* Plant visual - Left side */}
              <div className="lg:col-span-5 flex justify-center relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={o2Index}
                    initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.85, rotate: 6 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center"
                  >
                    <div className="absolute inset-4 nature-glow rounded-full scale-110" />
                    <img
                      src={O2_PLANTS_SLIDES[o2Index].image}
                      alt="O2 collection plant"
                      className="w-52 h-52 md:w-60 md:h-60 object-contain z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Text Meta Content - Right side */}
              <div className="lg:col-span-7 space-y-6">

                {/* Badge */}
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full">
                  <Award className="w-3 h-3" />
                  Max Oxygen Level
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={o2Index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                      {O2_PLANTS_SLIDES[o2Index].title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed max-w-xl whitespace-pre-line">
                      {O2_PLANTS_SLIDES[o2Index].subtext}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Footer buttons */}
                <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/5 pt-6">

                  {/* Explore button */}
                  <button
                    onClick={() => {
                      document.getElementById('top-selling')?.scrollIntoView({ behavior: 'smooth' });
                      showNotification("Explore our full high-oxygen selection below!");
                    }}
                    className="bg-white hover:bg-emerald-400 hover:text-slate-950 text-[#0b140d] font-bold text-xs px-6 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-md"
                  >
                    Explore
                  </button>

                  <div className="flex items-center gap-4 bg-white/5 border border-white/5 px-4 py-2 rounded-full">
                    <button
                      onClick={() => {
                        setO2Index((prev) => (prev === 0 ? O2_PLANTS_SLIDES.length - 1 : prev - 1));
                      }}
                      className="text-gray-400 hover:text-emerald-400 transition-colors p-1 cursor-pointer"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="text-xs font-mono font-semibold text-white tracking-widest">
                      0{o2Index + 1}/0{O2_PLANTS_SLIDES.length}
                    </span>

                    <button
                      onClick={() => {
                        setO2Index((prev) => (prev === O2_PLANTS_SLIDES.length - 1 ? 0 : prev + 1));
                      }}
                      className="text-gray-400 hover:text-emerald-400 transition-colors p-1 cursor-pointer"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                </div>

              </div>

            </div>

            <div className="flex justify-center gap-2 mt-8 border-t border-white/5 pt-4">
              {O2_PLANTS_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setO2Index(idx)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${o2Index === idx ? 'bg-emerald-400 w-6' : 'bg-gray-600'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-24 border-t border-white/5 bg-[#080d09]" id="footer">
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

            {/* Brand & Desc */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                  <Leaf className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-display font-bold text-xl text-white">FloraVision.</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-medium">
                "From lush indoor greens to vibrant outdoor blooms, our plants are crafted to thrive and elevate your living environment."
              </p>

              {/* Social text links */}
              <div className="flex items-center gap-6 pt-2 font-mono text-xs font-bold text-gray-500">
                <a href="#facebook" className="hover:text-emerald-400 transition-colors">FB</a>
                <a href="#twitter" className="hover:text-emerald-400 transition-colors">TW</a>
                <a href="#linkedin" className="hover:text-emerald-400 transition-colors">LI</a>
              </div>
            </div>

            {/* Quick links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">Quick Link's</h4>
              <ul className="space-y-3.5 text-xs text-gray-400 font-medium">
                <li>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Home</button>
                </li>
                <li>
                  <button onClick={() => {
                    document.getElementById('top-selling')?.scrollIntoView({ behavior: 'smooth' });
                  }} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">Type's Of plant's</button>
                </li>
                <li>
                  <a href="#footer" className="hover:text-emerald-400 transition-colors block">Contact</a>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-emerald-400 transition-colors block">Privacy</a>
                </li>
              </ul>
            </div>

            {/* Subscription newsletter */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-white">For Every Update.</h4>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="bg-[#122214] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all flex-1"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-emerald-400 hover:text-slate-950 text-[#0b140d] font-bold text-[10px] tracking-wider uppercase px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer text-center"
                >
                  SUBSCRIBE
                </button>
              </form>

              {isSubscribed && (
                <p className="text-[10px] text-emerald-400 font-semibold animate-fadeIn">
                  🎉 Thank you for subscribing to our newsletter!
                </p>
              )}
            </div>

          </div>

          {/* Copyright notice row */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] text-gray-500 font-medium">
            <span>FloraVision © all right reserve</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-current" /> in collaboration with AI Studio
            </span>
          </div>

        </div>
      </footer>


      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
      />

      \
      <PlantModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onAddToCart={handleAddToCart}
      />

      <ReviewFormModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleAddReview}
      />

    </div>
  );
}
