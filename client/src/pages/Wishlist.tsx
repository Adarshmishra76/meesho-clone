import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { fetchWishlist, removeFromWishlistAsync } from '../slices/wishlistSlice';
import { addToCart } from '../slices/cartSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';

const Wishlist = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { wishlistItems, loading } = useSelector((state: RootState) => state.wishlist);
    const { userInfo } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userInfo) {
            dispatch(fetchWishlist());
        } else {
            navigate('/login');
        }
    }, [dispatch, userInfo, navigate]);

    const removeFromWishlist = (productId: string) => {
        dispatch(removeFromWishlistAsync(productId));
    };

    const moveToCart = (product: any) => {
        // Add to cart
        dispatch(addToCart({
            _id: product._id,
            title: product.title,
            image: product.image,
            price: product.price,
            discountPrice: product.discountPrice,
            qty: 1
        }));

        // Remove from wishlist
        dispatch(removeFromWishlistAsync(product._id));

        alert('Moved to cart!');
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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Heart className="h-8 w-8 text-primary fill-primary" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                            <p className="text-gray-600">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {wishlistItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <Heart className="h-24 w-24 text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-6">Save items you love to buy them later!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    /* Products Grid */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {wishlistItems.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col group"
                            >
                                {/* Product Image */}
                                <div
                                    className="relative pt-[100%] bg-gray-50 cursor-pointer"
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="absolute top-0 left-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="p-3 flex flex-col flex-1">
                                    <h3
                                        className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1 truncate cursor-pointer"
                                        onClick={() => navigate(`/product/${product._id}`)}
                                    >
                                        {product.category}
                                    </h3>
                                    <h2
                                        className="text-gray-800 text-sm font-normal mb-1 line-clamp-2 h-10 cursor-pointer"
                                        onClick={() => navigate(`/product/${product._id}`)}
                                    >
                                        {product.title}
                                    </h2>

                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-lg font-bold text-gray-900">₹{product.discountPrice}</span>
                                        <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                                    </div>

                                    <div className="flex items-center mb-3">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                                            {product.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-auto grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => moveToCart(product)}
                                            className="flex items-center justify-center px-2 py-2 bg-primary text-white text-xs font-medium rounded hover:bg-pink-700 transition-colors"
                                            title="Move to Cart"
                                        >
                                            <ShoppingCart className="h-3 w-3 mr-1" />
                                            Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product._id)}
                                            className="flex items-center justify-center px-2 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
                                            title="Remove from Wishlist"
                                        >
                                            <Trash2 className="h-3 w-3 mr-1" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Wishlist;
