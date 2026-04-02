import { FaStar } from "react-icons/fa"


const CallToAction = () => {
  return (
    <div>
          {/* Call to Action */}
        <div className="text-center bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 shadow-lg mb-4">
            <FaStar className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Join the NOVE Family
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            Discover products that inspire, delight, and elevate your everyday life. Shop with confidence and experience the NOVE difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105">
              Start Shopping
            </button>
            <button className="px-6 py-3 border-2 border-gray-300 dark:border-slate-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition">
              Contact Us
            </button>
          </div>
        </div>

    </div>
  )
}

export default CallToAction
