import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { X, History } from 'lucide-react';

const RecentlyViewed = () => {
    const navigate = useNavigate();
    const { getRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        setProducts(getRecentlyViewed());
    }, [getRecentlyViewed]);

    const handleClear = () => {
        clearRecentlyViewed();
        setProducts([]);
    };

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-bold text-gray-900">Recently Viewed</h2>
                    <span className="text-sm text-gray-500">({products.length})</span>
                </div>
                <button
                    onClick={handleClear}
                    className="text-sm text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
                    title="Clear history"
                >
                    <X className="h-4 w-4" />
                    Clear
                </button>
            </div>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {products.map((product) => (
                    <div
                        key={product._id}
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="flex-shrink-0 w-32 cursor-pointer group"
                    >
                        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <h3 className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">
                            {product.title}
                        </h3>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-gray-900">₹{product.discountPrice}</span>
                            <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewed;
