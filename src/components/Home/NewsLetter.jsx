

const NewsLetter = () => {
  return (
        <section id="newsletter" className=" bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl mx-4 sm:mx-6 lg:mx-auto max-w-7xl my-8 sm:my-12 p-6 sm:p-8 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Stay in the Loop</h2>
          <p className="text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">Get exclusive offers, new product alerts, and design inspiration.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto px-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 sm:px-6 py-3 rounded-xl bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 text-sm sm:text-base"
            />
            <button className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition text-sm sm:text-base">
              Subscribe
            </button>
          </div>
        </section>
  )
}

export default NewsLetter
