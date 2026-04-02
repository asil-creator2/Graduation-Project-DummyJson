import { Link } from 'react-router';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaStar, FaTruck, FaShieldAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, removeItem, setCart } from '../Redux/cartSlice';
import { fetchCart, saveCart } from '../services/cartService';
import { useEffect, useRef } from 'react';

const Cart = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.products);
    const user = useSelector((state) => state.auth.user);
    
    // نعمل ref عشان نجيب أحدث قيمة للـ cartItems
    const cartItemsRef = useRef(cartItems);
    
    // نحدث الـ ref كل مرة تتغير الـ cartItems
    useEffect(() => {
        cartItemsRef.current = cartItems;
    }, [cartItems]);
    

    
    const saveCartToFirestore = async (products) => {
        if (user?.uid) {
            await saveCart(user.uid, products);
        }
    };

    // دالة زيادة الكمية
    const handleIncrement = async (item) => {
        // نجيب أحدث قيمة للـ cartItems
        const currentCart = cartItemsRef.current;
        
        // 1. نعدل Redux
        dispatch(increment(item));
        
        // 2. نجيب المنتجات الجديدة بعد التعديل باستخدام الـ currentCart
        const updatedProducts = currentCart.map(p => 
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
        
        // 3. نحفظ في Firestore فوراً
        await saveCartToFirestore(updatedProducts);
    };
    
    // دالة تقليل الكمية
    const handleDecrement = async (item) => {
        // نجيب أحدث قيمة للـ cartItems
        const currentCart = cartItemsRef.current;
        const currentItem = currentCart.find(p => p.id === item.id);
        
        if (currentItem && currentItem.quantity > 1) {
            // 1. نعدل Redux
            dispatch(decrement(item));
            
            // 2. نجيب المنتجات الجديدة بعد التعديل
            const updatedProducts = currentCart.map(p => 
                p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p
            );
            
            // 3. نحفظ في Firestore فوراً
            await saveCartToFirestore(updatedProducts);
        }
    };
    
    // دالة مسح منتج
    const handleRemoveItem = async (item) => {
        // نجيب أحدث قيمة للـ cartItems
        const currentCart = cartItemsRef.current;
        
        // 1. نعدل Redux
        dispatch(removeItem(item));
        
        // 2. نجيب المنتجات الجديدة
        const updatedProducts = currentCart.filter(p => p.id !== item.id);
        
        // 3. نحفظ في Firestore فوراً
        await saveCartToFirestore(updatedProducts);
    };
    
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const getEstimatedDelivery = () => {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Looks like you haven't added any items yet</p>
                        <Link to="/" className="inline-block px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-105">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition mb-4 group">
                    <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
                    <span className="text-sm font-medium">Continue Shopping</span>
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Shopping Cart
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items - Left Column */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-md transition p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Product Image */}
                                <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden">
                                    <img 
                                        src={item.images?.[0] || item.image || 'https://via.placeholder.com/100'} 
                                        alt={item.title || item.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                                
                                {/* Product Details */}
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full capitalize">
                                                    {item.category}
                                                </span>
                                                {item.brand && (
                                                    <span className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                                                        {item.brand}
                                                    </span>
                                                )}
                                                {item.discountPercentage > 0 && (
                                                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                                        -{Math.round(item.discountPercentage)}% OFF
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1">
                                                {item.title || item.name}
                                            </h3>
                                            
                                            {/* Rating */}
                                            {item.rating && (
                                                <div className="flex items-center gap-1 mt-1">
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar key={i} className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-gray-500 ml-1">
                                                        {item.rating} ({item.reviews?.length || 0} reviews)
                                                    </span>
                                                </div>
                                            )}
                                            
                                            {/* Price with Discount */}
                                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    ${item.price}
                                                </span>
                                                {item.discountPercentage > 0 && (
                                                    <>
                                                        <span className="text-sm text-gray-400 line-through">
                                                            ${(item.price * (1 + item.discountPercentage / 100)).toFixed(2)}
                                                        </span>
                                                        <span className="text-xs text-green-600 dark:text-green-400">
                                                            Save ${(item.price * item.discountPercentage / 100).toFixed(2)}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            
                                            {/* Stock Status */}
                                            {item.stock > 0 && item.stock < 10 && (
                                                <div className="mt-2">
                                                    <span className="text-xs text-orange-600 dark:text-orange-400">
                                                        Only {item.stock} left in stock!
                                                    </span>
                                                </div>
                                            )}
                                            
                                            {item.description && (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}
                                            
                                            <div className="flex items-center gap-2 mt-3 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg w-fit">
                                                <FaTruck className="w-3 h-3" />
                                                <span>Estimated delivery: {getEstimatedDelivery()}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Quantity Controls & Actions */}
                                        <div className="flex flex-col items-end gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg">
                                                    <button
                                                        onClick={() => handleDecrement(item)}
                                                        className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <FaMinus className="w-3 h-3 text-gray-500" />
                                                    </button>
                                                    <span className="w-10 text-center text-gray-900 dark:text-white font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleIncrement(item)}
                                                        className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                                                        disabled={item.quantity >= (item.stock || 99)}
                                                    >
                                                        <FaPlus className="w-3 h-3 text-gray-500" />
                                                    </button>
                                                </div>
                                                
                                                <button
                                                    onClick={() => handleRemoveItem(item)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition"
                                                    title="Remove"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                            </div>
                                            
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Item total</p>
                                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <FaTruck className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                    Free Shipping on orders over $100
                                </p>
                                {subtotal < 100 && (
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                        Add ${(100 - subtotal).toFixed(2)} more to qualify for free shipping
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            Order Summary
                        </h2>
                        
                        <div className="space-y-3 pb-4 border-b border-gray-200 dark:border-slate-700">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Estimated Tax (10%)</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                        </div>
                        
                        <div className="flex justify-between pt-4 pb-6">
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Promo code"
                                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                />
                                <button className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition">
                                    Apply
                                </button>
                            </div>
                        </div>
                        
                        <button className="w-full py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition transform hover:scale-[1.02]">
                            Proceed to Checkout
                        </button>
                        
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-3">
                                Secure payment methods
                            </p>
                            <div className="flex justify-center gap-3">
                                <span className="text-xl">💳</span>
                                <span className="text-xl">🪪</span>
                                <span className="text-xl">🍎</span>
                                <span className="text-xl">💰</span>
                            </div>
                        </div>
                        
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <FaShieldAlt className="w-3 h-3" />
                                <span>30-Day Money Back Guarantee</span>
                            </div>
                        </div>
                        
                        {subtotal < 100 && subtotal > 0 && (
                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
                                    🚚 Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Cart;