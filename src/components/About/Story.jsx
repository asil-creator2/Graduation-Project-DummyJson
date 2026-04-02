import { FaStar } from "react-icons/fa"

const Story = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Founded in 2024, NOVE was born from a simple idea: to create a shopping experience that combines premium quality with accessible pricing. The name "NOVE" comes from "nova" meaning new star, symbolizing our commitment to bringing fresh, innovative products to our customers.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              What started as a small passion project has grown into a trusted destination for thousands of happy customers worldwide. We believe that everyone deserves to own products that are not only functional but also beautifully designed.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Today, NOVE continues to grow, always staying true to our core values: quality, authenticity, and exceptional customer service. Every product in our collection is carefully curated to ensure it meets our high standards and exceeds your expectations.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
              <div className="relative bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                    <FaStar className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">"Quality Meets Innovation"</p>
                  <p className="text-white/80 text-sm">- NOVE Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Story
