
const Stats = () => {
  return (
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "50k+", label: "Happy Customers" },
              { number: "500+", label: "Products" },
              { number: "30+", label: "Countries" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default Stats
