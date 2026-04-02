import { FaCreditCard, FaHeadset, FaLeaf, FaStar } from "react-icons/fa"

const Values = () => {
  return (
    <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaStar className="w-6 h-6" />,
                title: "Quality First",
                description: "We never compromise on quality. Every product meets our rigorous standards."
              },
              {
                icon: <FaLeaf className="w-6 h-6" />,
                title: "Sustainability",
                description: "Committed to eco-friendly practices and responsible sourcing."
              },
              {
                icon: <FaHeadset className="w-6 h-6" />,
                title: "Customer First",
                description: "Your satisfaction is our top priority, 24/7 support available."
              },
              {
                icon: <FaCreditCard className="w-6 h-6" />,
                title: "Transparency",
                description: "Honest pricing, clear policies, and genuine products."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition group">
                <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
  )
}

export default Values
