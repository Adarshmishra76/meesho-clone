import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { Sparkles } from 'lucide-react';

interface ProductRecommendationsProps {
    currentProduct: {
        _id: string;
        category: string;
    };
}

const ProductRecommendations = ({ currentProduct }: ProductRecommendationsProps) => {
    const navigate = useNavigate();
    const { products } = useSelector((state: RootState) => state.product);

    // Get recommendations from same category, exclude current product
    const recommendations = products
        .filter(p => p.category === currentProduct.category)
        .filter(p => p._id !== currentProduct._id)
        .slice(0, 5);

    if (recommendations.length === 0) {
        return null;
    }

    return (
        <div className="mt-12 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {recommendations.map((product, index) => (
                    <div
                        key={product._id}
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Product Image */}
                        <div className="relative pt-[100%] bg-gray-50">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="absolute top-0 left-0 w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="p-3 flex flex-col flex-1">
                            <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1 truncate">
                                {product.category}
                            </h3>
                            <h2 className="text-gray-800 text-sm font-normal mb-2 line-clamp-2 h-10">
                                {product.title}
                            </h2>

                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-lg font-bold text-gray-900">₹{product.discountPrice}</span>
                                <span className="text-xs text-gray-400 line-through">₹{product.price}</span>
                            </div>

                            <div className="flex items-center">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                                    {product.rating} ★
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductRecommendations;
