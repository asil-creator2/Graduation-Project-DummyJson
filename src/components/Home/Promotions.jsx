const Promotions = () => {
  const promotions = [
    {
      title: "Summer Sale",
      discount: "Up to 50% Off",
      description: "On selected items",
      bgColor: "from-orange-500 to-red-500",
      icon: "☀️",
      buttonText: "Shop Now",
      endDate: "Limited Time"
    },
    {
      title: "New Arrivals",
      discount: "Fresh Collection",
      description: "Discover the latest trends",
      bgColor: "from-blue-500 to-cyan-500",
      icon: "✨",
      buttonText: "Explore",
      endDate: "Just Landed"
    },
    {
      title: "Bundle Deal",
      discount: "Buy 2 Get 1 Free",
      description: "Mix and match",
      bgColor: "from-purple-500 to-pink-500",
      icon: "🎁",
      buttonText: "Shop Bundles",
      endDate: "Limited Stock"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hot Promotions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't miss out on these amazing deals. Limited time offers!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-r ${promo.bgColor} p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-4">{promo.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{promo.title}</h3>
                <div className="text-3xl font-black text-white mb-2">{promo.discount}</div>
                <p className="text-white/80 text-sm mb-4">{promo.description}</p>
                <div className="flex items-center justify-between">
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition">
                    {promo.buttonText}
                  </button>
                  <span className="text-white/70 text-xs">{promo.endDate}</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-8 -mr-8"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -mb-8 -ml-8"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;