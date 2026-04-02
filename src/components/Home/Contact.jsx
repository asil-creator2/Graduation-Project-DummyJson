const Contact = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">support@nove.com</p>
              <p className="text-gray-600 dark:text-gray-400">hello@nove.com</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">+1 (555) 123-4567</p>
              <p className="text-gray-600 dark:text-gray-400">Mon-Fri, 9am - 6pm EST</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
              <p className="text-gray-600 dark:text-gray-400">123 Commerce Street</p>
              <p className="text-gray-600 dark:text-gray-400">New York, NY 10001</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                ></textarea>
              </div>

              <button className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;