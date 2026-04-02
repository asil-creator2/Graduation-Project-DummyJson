import { Link, useParams } from 'react-router';
import { 
  FaStar, FaStarHalfAlt, FaRegStar,
  FaShoppingCart, FaShare, FaTruck, FaUndo, FaShieldAlt, 
  FaMinus, FaPlus, FaArrowLeft, FaCheckCircle 
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab , setActiveTab] = useState('description')
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);


  const renderStars = (rating) => {
    if (!product) return null;
    const rate = rating?.rate || rating || 0;
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="w-4 h-4 text-yellow-400 fill-current" />);
    }
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
<div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-slate-900 pt-20 pb-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Breadcrumb */}
    <div className="mb-6">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition group">
        <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
        <span className="text-sm">Back to Shopping</span>
      </Link>
    </div>

    {/* Product Main Section */}
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      
      {/* Left Column - Images Gallery */}
      <div className="space-y-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
          <img 
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/400'} 
            alt={product.title}
            className="w-full h-auto object-contain p-4"
          />
        </div>
        
        {/* Thumbnails (if multiple images exist) */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.slice(0, 4).map((img, idx) => (
              <div key={idx} className="w-20 h-20 bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column - Product Info */}
      <div className="space-y-6">
        {/* Category & Brand */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full capitalize">
            {product.category}
          </span>
          {product.brand && (
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1 rounded-full">
              {product.brand}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {product.title}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {product.rating} ({product.reviews?.length || 0} reviews)
          </span>
          {product.availabilityStatus && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              product.availabilityStatus === 'In Stock' 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}>
              {product.availabilityStatus}
            </span>
          )}
        </div>

        {/* Price with Discount */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-lg text-gray-400 line-through">
                ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                Save ${(product.price * product.discountPercentage / 100).toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {product.description}
        </p>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          {product.stock > 0 ? (
            <>
              <FaCheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">In Stock</span>
              {product.stock < 10 && (
                <span className="text-xs text-orange-600 dark:text-orange-400">• Only {product.stock} left!</span>
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400">• Ships in {product.shippingInformation?.toLowerCase() || '3-5 days'}</span>
            </>
          ) : (
            <>
              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
            </>
          )}
        </div>

        {/* Additional Info */}
        {product.sku && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SKU: {product.sku}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            className={`cursor-pointer flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl ${
              product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => dispatch(addToCart({...product, quantity: quantity}))}
            disabled={product.stock === 0}
          >
            <FaShoppingCart className="w-4 h-4" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          
          <button className="cursor-pointer px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 transition">
            <FaShare className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Shipping & Returns Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <FaTruck className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-white">Free Shipping</p>
              <p className="text-xs text-gray-500">{product.shippingInformation || 'On orders $100+'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <FaUndo className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-white">Easy Returns</p>
              <p className="text-xs text-gray-500">{product.warrantyInformation || '30-day policy'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
            <FaShieldAlt className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-white">Secure Checkout</p>
              <p className="text-xs text-gray-500">100% secure</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Product Details Tabs */}
    <div className="mt-12">
      <div className="border-b border-gray-200 dark:border-slate-700">
        <div className="flex gap-6">
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-sm font-medium transition ${
              activeTab === 'description' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('specifications')}
            className={`pb-3 text-sm font-medium transition ${
              activeTab === 'specifications' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Specifications
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-medium transition ${
              activeTab === 'reviews' 
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Reviews ({product.reviews?.length || 0})
          </button>
        </div>
      </div>

      <div className="py-6">
        {activeTab === 'description' && (
          <p className="text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
        )}

        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.sku && (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">SKU</span>
                <span className="text-sm text-gray-900 dark:text-white">{product.sku}</span>
              </div>
            )}
            {product.brand && (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Brand</span>
                <span className="text-sm text-gray-900 dark:text-white">{product.brand}</span>
              </div>
            )}
            {product.weight && (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Weight</span>
                <span className="text-sm text-gray-900 dark:text-white">{product.weight} g</span>
              </div>
            )}
            {product.dimensions && (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Dimensions</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                </span>
              </div>
            )}
            {product.warrantyInformation && (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Warranty</span>
                <span className="text-sm text-gray-900 dark:text-white">{product.warrantyInformation}</span>
              </div>
            )}
            {product.shippingInformation && (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-sm text-gray-900 dark:text-white">{product.shippingInformation}</span>
              </div>
            )}
            {product.tags && product.tags.length > 0 && (
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags</span>
                <span className="text-sm text-gray-900 dark:text-white capitalize">
                  {product.tags.join(', ')}
                </span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && product.reviews && (
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">{product.rating}</div>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(product.rating)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Based on {product.reviews.length} reviews</div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="border-b border-gray-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{review.reviewerName}</span>
                    <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button className="px-6 py-2 border-2 border-gray-300 dark:border-slate-700 rounded-lg text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition">
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
};

export default ProductDetails;