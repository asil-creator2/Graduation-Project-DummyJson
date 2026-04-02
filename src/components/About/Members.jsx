
const Members = () => {
  return (
    <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the Team Behind NOVE
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Passionate individuals dedicated to bringing you the best shopping experience
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Asil Ahmed",
                role: "Founder & CEO",
                description: "Visionary leader with 10+ years in e-commerce"
              },
              {
                name: "Ahmed Ahmed",
                role: "Head of Product",
                description: "Product expert ensuring quality and innovation"
              },
              {
                name: "Mohamed Ahmed",
                role: "Customer Experience",
                description: "Dedicated to exceptional service"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition">
                <div className="w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
    </div>
  )
}

export default Members
