import { FaStar} from 'react-icons/fa';
import Members from '../components/About/Members';
import CallToAction from '../components/About/CallToAction';
import Stats from '../components/About/Stats';
import Values from '../components/About/Values';
import MissionVision from '../components/About/Mission&Vision';
import Story from '../components/About/Story';

const About = () => {
  return (
    <div id='about' className="mt-5 min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 shadow-lg mb-6">
            <FaStar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NOVE</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Redefining modern shopping with quality, style, and innovation
          </p>
        </div>

        {/* Story Section */}
        <Story/>

        {/* Mission & Vision Section */}
        <MissionVision/>

        {/* Values Section */}
        <Values/>

        {/* Stats Section */}
        <Stats/>

        {/* Team Section */}
        <Members/>
        {/*Call To Action */}
        <CallToAction/>
      </div>
    </div>
  );
};

export default About;