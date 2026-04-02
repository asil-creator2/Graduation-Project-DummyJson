import Products from '../components/Home/Products';
import NewsLetter from '../components/Home/NewsLetter';
import Header from '../components/Home/Header';
import Features  from '../components/Home/Features';
import Collections from '../components/Home/Collection';
import Promotions from '../components/Home/Promotions';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800" id='home'>
      
      {/* Add padding top to account for fixed navbar */}
      <div className="pt-16 md:pt-20">
        {/* ========== HERO SECTION ========== */}
        <Header/>
        {/*=========== COLLECTION SECTION */}
        <Collections/>
        {/* ========== PRODUCTS SECTION ========== */}
        <Products state='home' />
        {/* ========== PROMOTIONS SECTION ========== */}
        <Promotions/>
        {/* ========== FEATURES SECTION ========== */}
        <Features/>
        {/* ========== NEWSLETTER SECTION ========== */}
        <NewsLetter/>

      </div>
    </div>
  );
};

export default Home;