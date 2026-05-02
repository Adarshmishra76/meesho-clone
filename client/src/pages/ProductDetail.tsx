import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import { addToWishlistAsync, removeFromWishlistAsync } from '../slices/wishlistSlice';
import type { RootState, AppDispatch } from '../store';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductRecommendations from '../components/ProductRecommendations';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { Star, ShoppingBag, Zap, ChevronRight, ThumbsUp, CheckCircle, Package, Truck, Shield, Heart } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading, error } = useSelector((state: RootState) => state.product);
    const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [quantity, setQuantity] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [showAllReviews, setShowAllReviews] = useState(false);
    const { addToRecentlyViewed } = useRecentlyViewed();

    const isInWishlist = product ? wishlistItems.some((item) => item._id === product._id) : false;

    useEffect(() => {
        if (id) {
            dispatch(listProductDetails(id));
        }
    }, [dispatch, id]);

    // Track recently viewed
    useEffect(() => {
        if (product) {
            addToRecentlyViewed({
                _id: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                discountPrice: product.discountPrice,
                rating: product.rating,
                category: product.category
            });
        }
    }, [product, addToRecentlyViewed]);

    const addToCartHandler = () => {
        if (product) {
            dispatch(addToCart({
                _id: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                discountPrice: product.discountPrice,
                qty: quantity
            }));
            alert('Added to Cart!');
        }
    };

    const buyNowHandler = () => {
        if (product) {
            dispatch(addToCart({
                _id: product._id,
                title: product.title,
                image: product.image,
                price: product.price,
                discountPrice: product.discountPrice,
                qty: quantity
            }));
            navigate('/cart');
        }
    };

    const toggleWishlist = async () => {
        if (!userInfo) {
            alert('Please login to add to wishlist');
            navigate('/login');
            return;
        }

        if (product) {
            try {
                if (isInWishlist) {
                    await dispatch(removeFromWishlistAsync(product._id)).unwrap();
                    alert('Removed from wishlist!');
                } else {
                    await dispatch(addToWishlistAsync(product._id)).unwrap();
                    alert('Added to wishlist!');
                }
            } catch (error: any) {
                console.error('Wishlist error:', error);
                alert(`Error: ${error || 'Failed to update wishlist'}`);
            }
        }
    };

    const renderStarDistribution = () => {
        if (!product?.reviewStats) return null;

        const { distribution, total } = product.reviewStats;
        return (
            <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = distribution[star] || 0;
                    const percentage = total > 0 ? (count / total) * 100 : 0;
                    return (
                        <div key={star} className="flex items-center gap-2 text-sm">
                            <span className="w-8 text-gray-600">{star} ★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <span className="w-12 text-right text-gray-500 text-xs">{count}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    const filteredReviews = () => {
        if (!product?.reviews) return [];

        let filtered = product.reviews;

        // Apply filter
        if (selectedFilter === 'verified') {
            filtered = filtered.filter((r: any) => r.verified);
        }

        // Limit to latest 10 reviews by default
        if (!showAllReviews) {
            return filtered.slice(0, 10);
        }

        return filtered;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex justify-center items-center p-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
                        <strong className="font-bold">Error!</strong>
                        <span className="block">{error || 'Product not found'}</span>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const discountPercentage = Math.round(((product.price - product.discountPrice) / product.price) * 100);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                    <Link to="/" className="hover:text-primary">Home</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-gray-400">{product.category}</span>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-gray-400 truncate max-w-xs">{product.title}</span>
                </nav>

                {/* Product Main Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="flex justify-center items-start">
                            <div className="w-full max-w-md bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-auto object-contain max-h-96"
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">{product.brand}</p>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                                <p className="text-sm text-gray-600">{product.category}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md">
                                    <span className="font-bold text-lg">{product.rating}</span>
                                    <Star className="h-4 w-4 ml-1 fill-current" />
                                </div>
                                <span className="text-gray-600">
                                    {product.reviewStats?.total || product.numReviews} Reviews
                                </span>
                            </div>

                            {/* Price */}
                            <div className="border-t border-b border-gray-200 py-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl md:text-4xl font-bold text-gray-900">₹{product.discountPrice}</span>
                                    <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
                                    <span className="text-lg font-bold text-green-600">{discountPercentage}% off</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">inclusive of all taxes</p>
                            </div>

                            {/* Stock Status */}
                            <div className="flex items-center gap-2">
                                {product.countInStock > 0 ? (
                                    <>
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-green-600 font-medium">In Stock ({product.countInStock} available)</span>
                                    </>
                                ) : (
                                    <>
                                        <Package className="h-5 w-5 text-red-600" />
                                        <span className="text-red-600 font-medium">Out of Stock</span>
                                    </>
                                )}
                            </div>

                            {/* Quantity Selector */}
                            {product.countInStock > 0 && (
                                <div className="flex items-center gap-4">
                                    <label className="font-medium text-gray-700">Quantity:</label>
                                    <div className="flex items-center border border-gray-300 rounded-md">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-2 hover:bg-gray-100 font-bold text-gray-700"
                                        >
                                            −
                                        </button>
                                        <span className="px-6 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                                            className="px-4 py-2 hover:bg-gray-100 font-bold text-gray-700"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="flex items-center justify-center px-4 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ShoppingBag className="h-5 w-5 mr-2" />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={toggleWishlist}
                                    className={`flex items-center justify-center px-4 py-3 border-2 font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${isInWishlist
                                        ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                                    {isInWishlist ? 'Wishlisted' : 'Wishlist'}
                                </button>
                                <button
                                    onClick={buyNowHandler}
                                    disabled={product.countInStock === 0}
                                    className="flex items-center justify-center px-4 py-3 bg-primary text-white font-bold rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Zap className="h-5 w-5 mr-2" />
                                    Buy Now
                                </button>
                            </div>

                            {/* Features */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 space-y-3">
                                <div className="flex items-center gap-3">
                                    <Truck className="h-5 w-5 text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700">Free Delivery on orders above ₹499</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-green-600" />
                                    <span className="text-sm font-medium text-gray-700">100% Original Products</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Package className="h-5 w-5 text-purple-600" />
                                    <span className="text-sm font-medium text-gray-700">Easy 7-day return policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {product.description}
                    </div>
                </div>

                {/* Ratings & Reviews */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Ratings & Reviews</h2>

                    {/* Rating Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-6 border-b border-gray-200">
                        <div className="text-center md:text-left">
                            <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                            <div className="flex items-center justify-center md:justify-start mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-5 w-5 ${star <= Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600">{product.reviewStats?.total || product.numReviews} Reviews</p>
                        </div>
                        <div className="md:col-span-2">
                            {renderStarDistribution()}
                        </div>
                    </div>

                    {/* Review Filters */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                        <button
                            onClick={() => {
                                setSelectedFilter('all');
                                setShowAllReviews(false);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            All Reviews
                        </button>
                        <button
                            onClick={() => {
                                setSelectedFilter('verified');
                                setShowAllReviews(false);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedFilter === 'verified' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            Verified Purchases
                        </button>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {filteredReviews().map((review: any) => (
                            <div key={review.reviewId} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900">{review.userName}</span>
                                            {review.verified && (
                                                <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                                <span className="text-sm font-bold">{review.rating}</span>
                                                <Star className="h-3 w-3 ml-1 fill-current" />
                                            </div>
                                            <span className="text-sm text-gray-500">{review.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-medium text-gray-900 mb-1">{review.title}</h3>
                                <div className="text-gray-700 mb-3 whitespace-pre-line leading-relaxed">
                                    {review.comment}
                                </div>
                                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary transition-colors">
                                    <ThumbsUp className="h-4 w-4" />
                                    Helpful ({review.helpful})
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* View All Reviews Button */}
                    {product?.reviews && product.reviews.length > 10 && (
                        <div className="text-center mt-8">
                            <button
                                onClick={() => setShowAllReviews(!showAllReviews)}
                                className="px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-pink-50 transition-colors"
                            >
                                {showAllReviews ? 'Show Latest Reviews' : `View All ${product.reviews.length} Reviews`}
                            </button>
                        </div>
                    )}
                </div>

                {/* Product Recommendations */}
                {product && <ProductRecommendations currentProduct={product} />}
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetail;
