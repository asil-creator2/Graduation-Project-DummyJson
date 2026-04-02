import {  useEffect, useMemo, useState } from 'react';
import {  useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import Category from './Category';
import { NavLink } from 'react-router';

const Products = ({state}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadMore,setLoadMore] = useState(false)
    const searchQuery = useSelector((state) => state.search.query)
    const activeCategory = useSelector((state) => state.category.text)

    useEffect(() => {
        const getProducts = async () => {
            const url = `https://dummyjson.com${
                (activeCategory === 'all' ? activeCategory : activeCategory.payload) === 'all' ? '/products?limit=1000' : `/products/category/${activeCategory.payload}`
            }`;

            try {
                
                const response = await fetch(url);
                                
                const data = await response.json();

                 if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data && Array.isArray(data.products)) {
                    setProducts(data.products);
                }
                setLoading(false);
            } catch (error) {
                console.error("An error occurred:", error);
                setLoading(false);
            }
        };


        getProducts();
    }, [activeCategory]);

    

    // Filter products based on active category
 const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => 
        product.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
    );
}, [products, searchQuery]);
    const firstHalf = filteredProducts.slice(0, 12);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-20" id='shop'>
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3 md:mb-4 dark:text-white">
              Curated Just For You
            </h2>
            <p className="text-gray-500 text-center max-w-2xl mx-auto text-sm sm:text-base px-4">
              Discover our handpicked selection of premium products from top brands
            </p>
          </div>
          {/* PRODUCTS WITH CATEGORY FILTERS */}
        <div className=''>
            {/* Category Filters - Responsive */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 md:mb-12 px-2 ">
                <Category/>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {state === 'home' && firstHalf.map((item) => (
                    
                     <ProductCard key={item.id} item={item}/>
                ))}
                {state === 'shop' && filteredProducts.map((item) => (
                    
                     <ProductCard key={item.id} item={item}/>
                ))}
            </div>

            {state === 'home' && (
            <div className='flex items-center justify-center mt-6'>
                <NavLink 
                to={'/shop'}
                className={`border-2 border-gray-500 px-6 py-3 text-gray-500 rounded-xl font-black text-md `}
                
                >Load More</NavLink>
            </div>
            )}

            {/* Empty state */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">No products found.</p>
                </div>
            )}
        </div>        
        </main>

    );
};

export default Products;