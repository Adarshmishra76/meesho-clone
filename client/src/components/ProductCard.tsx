import { Star, ShoppingBag, Zap, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { addToCart } from '../slices/cartSlice';
import { addToWishlistAsync, removeFromWishlistAsync } from '../slices/wishlistSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

interface ProductProps {
    product: {
        _id: string;
        title: string;
        price: number;
        discountPrice: number;
        rating: number;
        image: string;
        category: string;
    }
}

const ProductCard = ({ product }: ProductProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { showToast } = useToast();

    const isInWishlist = wishlistItems.some((item) => item._id === product._id);

    const addToCartHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(addToCart({
            _id: product._id,
            title: product.title,
            image: product.image,
            price: product.price,
            discountPrice: product.discountPrice,
            qty: 1
        }));
        showToast('Added to cart!', 'success');
    };

    const buyNowHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(addToCart({
            _id: product._id,
            title: product.title,
            image: product.image,
            price: product.price,
            discountPrice: product.discountPrice,
            qty: 1
        }));
        navigate('/cart');
    };

    const toggleWishlist = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!userInfo) {
            showToast('Please login to add to wishlist', 'warning');
            navigate('/login');
            return;
        }

        try {
            if (isInWishlist) {
                await dispatch(removeFromWishlistAsync(product._id)).unwrap();
                showToast('Removed from wishlist!', 'success');
            } else {
                await dispatch(addToWishlistAsync(product._id)).unwrap();
                showToast('Added to wishlist!', 'success');
            }
        } catch (error: any) {
            console.error('Wishlist error:', error);
            showToast(error || 'Failed to update wishlist', 'error');
        }
    };

    return (
        <div
            className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col group h-full"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            <div className="relative pt-[100%] bg-gray-50">
                {/* Wishlist Heart Icon */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform duration-200"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        className={`h-5 w-5 transition-all duration-300 ${isInWishlist
                            ? 'fill-red-500 text-red-500 animate-pulse'
                            : 'text-gray-400 hover:text-red-500'
                            }`}
                    />
                </button>

                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-3 flex flex-col flex-1">
                <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1 truncate">{product.category}</h3>
                <h2 className="text-gray-800 text-sm font-normal mb-1 line-clamp-2 h-10">{product.title}</h2>

                <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xl font-bold text-gray-900">₹{product.discountPrice}</span>
                    <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                    <span className="text-xs font-bold text-green-600">{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                        {product.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                    </span>
                    <span className="text-xs text-gray-400">Free Delivery</span>
                </div>

                {/* Buttons - visible on hover or always on mobile? Making them accessible always for better UX */}
                <div className="mt-auto grid grid-cols-2 gap-2">
                    <button
                        onClick={addToCartHandler}
                        className="flex items-center justify-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <ShoppingBag className="h-3 w-3 mr-1" /> Add
                    </button>
                    <button
                        onClick={buyNowHandler}
                        className="flex items-center justify-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-primary hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        <Zap className="h-3 w-3 mr-1" /> Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
