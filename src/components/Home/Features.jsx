
const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: '🚚',
                title: 'Free Shipping',
                description: 'Free worldwide shipping on orders over $100'
              },
              {
                icon: '🛡️',
                title: 'Secure Payment',
                description: '100% secure payment with encryption'
              },
              {
                icon: '💬',
                title: '24/7 Support',
                description: 'Dedicated support team always here to help'
              }
            ].map((feature, idx) => (
              <div key={idx} className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
    </section>
  )
}

export default Features
