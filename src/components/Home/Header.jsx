const Header = () => {
  return (
    <div>
      <section className=" relative py-12 md:py-24 overflow-hidden bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-48 md:w-80 h-48 md:h-80 bg-blue-100 dark:bg-blue-600/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 md:w-96 h-64 md:h-96 bg-purple-100 dark:bg-purple-600/10 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">🔥 Hot Deals 2026</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 md:mb-6">
                <span className="text-gray-900 dark:text-white">Shop the Best</span><br />
                <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products Online</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Discover thousands of products at unbeatable prices. Free shipping on orders over $100. Shop now and save big!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#shop" className="group bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base">
                  Shop Now
                  <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <button className="border-2 border-gray-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-700 dark:text-gray-200 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg">
                  View Collections
                </button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">30-Day Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Secure Payments</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image/Product Showcase */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=600&fit=crop" 
                    alt="Shopping"
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
                
                {/* Floating Badges */}
                <div className="absolute -top-8 -left-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-3 animate-pulse">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">50%</div>
                    <div className="text-xs text-gray-500">OFF</div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">⭐ 4.9</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Electronics', icon: '💻', color: 'from-blue-500 to-cyan-500' },
            { name: 'Fashion', icon: '👕', color: 'from-pink-500 to-rose-500' },
            { name: 'Home & Living', icon: '🏠', color: 'from-amber-500 to-orange-500' },
            { name: 'Beauty', icon: '💄', color: 'from-purple-500 to-fuchsia-500' },
          ].map((cat, idx) => (
            <button
              key={idx}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center group hover:scale-105"
            >
              <div className={`w-12 h-12 mx-auto bg-linear-to-r ${cat.color} rounded-full flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition`}>
                {cat.icon}
              </div>
              <p className="font-semibold text-gray-800 dark:text-white text-sm">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header