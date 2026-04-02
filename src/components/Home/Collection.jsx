const Collections = () => {
  const collections = [
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      itemCount: 245,
      bgColor: "from-blue-500/20 to-blue-600/20"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      itemCount: 189,
      bgColor: "from-pink-500/20 to-rose-600/20"
    },
    {
      name: "Home & Living",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      itemCount: 156,
      bgColor: "from-amber-500/20 to-orange-600/20"
    },
    {
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      itemCount: 98,
      bgColor: "from-purple-500/20 to-fuchsia-600/20"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900" id="collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Collection
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collections for every style and need
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-linear-to-t ${collection.bgColor} from-black/60 to-transparent`}></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white mb-1">{collection.name}</h3>
                <p className="text-white/80 text-sm">{collection.itemCount} Products</p>
                <button className="mt-3 text-white border border-white/50 hover:bg-white hover:text-gray-900 px-4 py-1.5 rounded-lg text-sm transition">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;