import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { logout } from '../slices/authSlice';
import { listProducts } from '../slices/productSlice';
import type { RootState, AppDispatch } from '../store';
import { User, LogOut, Search, HelpCircle, Home, Heart, ShoppingCart } from 'lucide-react';

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login');
    };

    const [activeCategory, setActiveCategory] = useState('All');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.profile-dropdown-container')) {
                setIsProfileDropdownOpen(false);
            }
        };

        if (isProfileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    // Listen for reset filter events
    useEffect(() => {
        const handleResetFilter = () => {
            setActiveCategory('All');
        };

        window.addEventListener('resetCategoryFilter' as any, handleResetFilter);
        return () => {
            window.removeEventListener('resetCategoryFilter' as any, handleResetFilter);
        };
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-3xl font-bold text-primary font-sans" onClick={() => setActiveCategory('All')}>meesho</Link>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-lg mx-8 hidden sm:block">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                placeholder="Try Saree, Kurti or Search by Product Code"
                                onChange={(e) => {
                                    const keyword = e.target.value;
                                    dispatch(listProducts(keyword));
                                }}
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center space-x-6">
                        <a href="https://play.google.com/store/apps/details?id=com.meesho.supply" target="_blank" rel="noopener noreferrer" className="hidden md:flex flex-col items-center group text-gray-600 hover:text-primary">
                            <span className="text-sm font-medium">Download App</span>
                        </a>
                        <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

                        {userInfo ? (
                            <div className="relative profile-dropdown-container">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex flex-col items-center text-gray-600 hover:text-primary"
                                >
                                    <User className="h-6 w-6" />
                                    <span className="text-xs font-medium">Profile</span>
                                </button>
                                {/* Dropdown */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-10">
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">Hello, {userInfo.name}</div>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <User className="h-4 w-4 mr-2" /> View Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsProfileDropdownOpen(false);
                                                logoutHandler();
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                        >
                                            <LogOut className="h-4 w-4 mr-2" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="flex flex-col items-center text-gray-600 hover:text-primary">
                                <User className="h-6 w-6" />
                                <span className="text-xs font-medium">Profile</span>
                            </Link>
                        )}

                        {/* Conditional Cart/Home based on current page */}
                        {location.pathname === '/' ? (
                            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-primary">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="text-xs font-medium">Cart</span>
                            </Link>
                        ) : (
                            <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-primary">
                                <Home className="h-6 w-6" />
                                <span className="text-xs font-medium">Home</span>
                            </Link>
                        )}

                        {/* Wishlist Button - Only on Home Page */}
                        {location.pathname === '/' && (
                            <button
                                onClick={() => {
                                    if (!userInfo) {
                                        alert('Please login to view wishlist');
                                        navigate('/login');
                                    } else {
                                        navigate('/wishlist');
                                    }
                                }}
                                className="flex flex-col items-center text-gray-600 hover:text-primary relative bg-transparent border-none cursor-pointer"
                            >
                                <Heart className="h-6 w-6" />
                                <span className="text-xs font-medium">Wishlist</span>
                            </button>
                        )}

                        <Link to="/contact" className="flex flex-col items-center text-gray-600 hover:text-primary">
                            <HelpCircle className="h-6 w-6" />
                            <span className="text-xs font-medium">Help</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="sm:hidden pb-3">
                    <input
                        type="text"
                        className="focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                        placeholder="Search..."
                        onChange={(e) => {
                            const keyword = e.target.value;
                            dispatch(listProducts(keyword));
                        }}
                    />
                </div>
            </div>

            {/* Categories Bar (Scrollable) */}
            {location.pathname !== '/cart' && location.pathname !== '/checkout' && location.pathname !== '/contact' && location.pathname !== '/about' && location.pathname !== '/profile' && location.pathname !== '/terms' && location.pathname !== '/privacy' && (
                <div className="border-t border-gray-200 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex space-x-8 py-3 overflow-x-auto text-sm font-medium text-gray-700 scrollbar-hide">
                            {['All', 'Women Ethnic', 'Women Western', 'Men Fashion', 'Kids', 'Home & Kitchen', 'Beauty', 'Jewellery', 'Bags', 'Footwear', 'Electronics'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        // Only allow interaction on Home page
                                        if (location.pathname === '/') {
                                            setActiveCategory(cat);
                                            dispatch(listProducts(cat === 'All' ? '' : cat));
                                            window.dispatchEvent(new CustomEvent('categoryFilter', {
                                                detail: { category: cat }
                                            }));
                                        }
                                    }}
                                    className={`whitespace-nowrap bg-transparent border-none text-left px-1 pb-1 transition-colors duration-200 
                                        ${location.pathname === '/' ? 'cursor-pointer hover:text-primary' : 'cursor-default'} 
                                        ${activeCategory === cat && location.pathname === '/'
                                            ? 'text-primary border-b-2 border-primary font-bold'
                                            : 'text-gray-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
