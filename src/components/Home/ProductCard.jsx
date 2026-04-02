import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../Redux/cartSlice';
import { Link } from 'react-router';
import Swal from "sweetalert2";
import { saveCart } from '../../services/cartService';

// add to cart alert
  const showAddedToCart = (productName) => {
    Swal.fire({
      title: 'Added to Cart!',
      text : `${productName}\n has been Added to Cart`,
      icon: 'success',
      iconColor: '#3b82f6',
      confirmButtonText: 'Continue Shopping',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: true,
      customClass: {
        popup: 'rounded-xl popup',
        confirmButton: 'confirmButton px-5 py-2 rounded-lg font-medium',
      }
    });
  };


const ProductCard = ({ item }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const cartItems = useSelector((state) => state.cart.products);

    const handleAddToCart = async () => {
        // نضيف في Redux
        dispatch(addToCart(item));
        
        // نحفظ في Firestore
        if (user?.uid) {
            const updatedCart = [...cartItems, { ...item, quantity: item.quantity ? item.quantity : 1 , }];
            await saveCart(user.uid, updatedCart);
        }
        
        // Alert
        showAddedToCart(item.title)
    };

    
    return (
        <div 
            key={item.id}
            className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-slate-800/50 transition-all duration-300 group cursor-pointer"
        >
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700">
                <img 
                    src={item.images?.[0] || item.image || 'https://via.placeholder.com/300'} 
                    alt={item.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />                                
                {/* Badges */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
                    {item.stock > 0 ? (
                        <span className="bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg shadow-md">
                            IN STOCK
                        </span>
                    ) : (
                        <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg shadow-md">
                            OUT OF STOCK
                        </span>
                    )}
                    {item.discountPercentage > 0 && (
                        <span className="bg-orange-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg shadow-md">
                            -{Math.round(item.discountPercentage)}%
                        </span>
                    )}
                </div>
                
                {/* Quick View Button */}
                <div className="absolute inset-x-0 bottom-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/70 to-transparent p-3 sm:p-4">
                    <Link 
                        to={`/product/${item.id}`}
                        className="block w-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm text-center hover:bg-blue-600 hover:text-white transition"
                    >
                        Quick View
                    </Link>
                </div>
            </div>
            
            {/* Content */}
            <div className="p-3 sm:p-4 md:p-5">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full capitalize">
                        {item.category}
                    </span>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                                key={star} 
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= Math.round(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600 fill-current'}`} 
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 ml-0.5 sm:ml-1">
                            ({item.reviews?.length || 0})
                        </span>
                    </div>
                </div>
                
                <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {item.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">
                    {item.description}
                </p>
                
                <div className="flex flex-col gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 dark:text-white">
                            ${item.price}
                        </span>
                        {item.discountPercentage > 0 && (
                            <>
                                <span className="text-sm text-gray-400 line-through">
                                    ${(item.price * (1 + item.discountPercentage / 100)).toFixed(2)}
                                </span>
                                <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                                    Save ${(item.price * item.discountPercentage / 100).toFixed(2)}
                                </span>
                            </>
                        )}
                    </div>
                    
                    {/* Stock Indicator */}
                    {item.stock < 10 && item.stock > 0 && (
                        <p className="text-xs text-orange-600 dark:text-orange-400">
                            Only {item.stock} left in stock!
                        </p>
                    )}
                    
                    <button 
                        className="flex items-center justify-center font-semibold text-sm gap-2 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-300 shadow-md"
                        onClick={() => {handleAddToCart()}}
                        disabled={item.stock === 0}
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {item.stock === 0 ? 'Out of Stock' : 'Add To Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard
