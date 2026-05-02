import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../slices/productSlice';
import type { AppDispatch, RootState } from '../store';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import RecentlyViewed from '../components/RecentlyViewed';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.product);
    const [activeFilter, setActiveFilter] = useState<string>('');

    useEffect(() => {
        console.log('Home: Dispatching listProducts');
        dispatch(listProducts(''));
    }, [dispatch]);

    // Listen for category filter events from Header
    useEffect(() => {
        const handleCategoryFilter = (event: CustomEvent) => {
            const category = event.detail.category;
            if (category && category !== 'All') {
                setActiveFilter(category);
            } else {
                setActiveFilter('');
            }
        };

        window.addEventListener('categoryFilter' as any, handleCategoryFilter as any);
        return () => {
            window.removeEventListener('categoryFilter' as any, handleCategoryFilter as any);
        };
    }, []);

    console.log('Home Render State:', { productsLength: products?.length, loading, error });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

                {/* Hero Banner Section */}
                <div
                    className="-mx-4 -mt-8 md:mx-0 md:mt-0 rounded-none md:rounded-xl overflow-hidden shadow-sm mb-10 border-b border-gray-100 md:border md:border-pink-100 relative bg-cover bg-center bg-no-repeat h-[250px] md:h-[500px]"
                    style={{ backgroundImage: "url('https://pandeyjii.netlify.app/logo.jpg')" }}
                >
                </div>

                {/* Stats and Download Section */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-3 rounded-full border border-green-300 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                            <span className="bg-white text-green-700 text-sm font-bold px-2 py-1 rounded-full">₹30</span>
                            <span className="font-bold text-white">Shipping</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-400 to-indigo-500 px-6 py-3 rounded-full border border-blue-300 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                            <span className="bg-white text-blue-700 text-sm font-bold px-2 py-1 rounded-full">5 Cr+</span>
                            <span className="font-bold text-white">Products</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-400 to-pink-500 px-6 py-3 rounded-full border border-purple-300 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                            <span className="bg-white text-purple-700 text-sm font-bold px-2 py-1 rounded-full">600+</span>
                            <span className="font-bold text-white">Categories</span>
                        </div>
                    </div>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.meesho.supply"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-md inline-block text-center"
                    >
                        Download the App
                    </a>
                </div>

                {/* Recently Viewed Products */}
                <RecentlyViewed />

                {/* Top Categories Visuals */}
                <div className="mb-12">
                    <div className="h-px bg-gray-200 w-full mb-8 relative">
                        <span className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-gray-50 px-4 text-2xl font-bold text-gray-800 uppercase tracking-widest">Top Categories</span>
                    </div>
                    <br />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div
                            className="relative rounded-lg overflow-hidden h-48 group cursor-pointer"
                            onClick={() => {
                                console.log('Clicking Women Ethnic');
                                dispatch(listProducts('Women Ethnic'));
                                setActiveFilter('Women Ethnic');
                                console.log('Set filter to: Women Ethnic');
                            }}
                        >
                            <img src="https://cdn.shopaccino.com/calmna/products/dsc2085-copy-101086815976799_l.jpg?v=651?param=1" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Women Ethnic" />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                                <span className="text-white font-bold text-xl drop-shadow-md">Women Ethnic</span>
                            </div>
                        </div>
                        <div
                            className="relative rounded-lg overflow-hidden h-48 group cursor-pointer"
                            onClick={() => {
                                dispatch(listProducts('Women Western'));
                                setActiveFilter('Women Western');
                            }}
                        >
                            <img src="https://www.missmosa.in/cdn/shop/files/B87CC8A3-C54D-4616-BF5E-E8546873C47D.jpg?v=1749208167&width=500" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Women Western" />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                                <span className="text-white font-bold text-xl drop-shadow-md">Women Western</span>
                            </div>
                        </div>
                        <div
                            className="relative rounded-lg overflow-hidden h-48 group cursor-pointer"
                            onClick={() => {
                                dispatch(listProducts('Men Fashion'));
                                setActiveFilter('Men Fashion');
                            }}
                        >
                            <img src="https://5.imimg.com/data5/SELLER/Default/2021/7/ZW/DY/RA/133215290/mens-wear.jpg" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="Men Fashion" />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                                <span className="text-white font-bold text-xl drop-shadow-md">Men Fashion</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Products For You</h2>
                    <div className="ml-auto w-48 hidden sm:block">
                        <select className="form-select block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                            <option>Relevance</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Rating</option>
                        </select>
                    </div>
                </div>

                {error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(15)].map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products && products.length > 0 ? (
                            products.map((product, index) => (
                                <div
                                    key={product._id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 0.05} s` }}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No products found. Please check database connection.
                            </div>
                        )}
                    </div>
                )}

                {/* Show All Products Button */}
                {activeFilter && (
                    <div className="flex justify-center mt-10 mb-4">
                        <button
                            onClick={() => {
                                console.log('Clearing filter');
                                dispatch(listProducts(''));
                                setActiveFilter('');
                                // Dispatch event to reset header category
                                window.dispatchEvent(new CustomEvent('resetCategoryFilter'));
                            }}
                            className="bg-primary hover:bg-pink-700 text-white font-medium py-2.5 px-6 rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            <span>Show All Products</span>
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Home;
