// Related to About Page
const MissionVision = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To empower individuals with thoughtfully curated products that enhance daily life, combining exceptional quality with sustainable practices. We strive to make premium shopping accessible to everyone, everywhere.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To become the most trusted destination for modern shoppers worldwide, setting new standards in quality, sustainability, and customer experience while staying true to our star-inspired values of excellence and innovation.
            </p>
          </div>
    </div>
  )
}

export default MissionVision
