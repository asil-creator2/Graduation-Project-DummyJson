import { FaStar } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white"><FaStar/></div>
              <span className="text-white font-bold text-xl">NOVA</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              Premium products curated for the modern lifestyle. Quality meets design with exceptional customer experience.
            </p>
            <div className="flex space-x-4 mt-4">
              {['📘', '🐦', '📷', '💼'].map((icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-sm">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {[
            { title: 'Shop', links: ['All Products', 'New Arrivals', 'Bestsellers', 'Sale'] },
            { title: 'Support', links: ['Help Center', 'Returns', 'Shipping Info', 'Order Tracking'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Sustainability'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'] },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-3 text-sm md:text-base">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {currentYear} NOVA. All rights reserved. Designed with ♥ for perfect UI/UX.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer