import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { removeFromCart } from '../slices/cartSlice';
import { Trash2, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/checkout');
        } else {
            navigate('/login?redirect=checkout');
        }
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.discountPrice * item.qty, 0).toFixed(2);
    const totalDiscount = cartItems.reduce((acc, item) => acc + (item.price - item.discountPrice) * item.qty, 0).toFixed(2);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Continue Shopping
                </Link>

                <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems} Items)</h1>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <img
                            src="https://images.meesho.com/images/pow/empty-cart.png"
                            alt="Empty Cart"
                            className="h-48 mx-auto mb-6 opacity-50"
                        />
                        <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-pink-600 transition">
                            View Products
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="lg:w-2/3 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
                                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                                            <div className="text-sm text-gray-500 mt-1">Size: Free Size • Qty: {item.qty}</div>
                                            <div className="flex items-center mt-2 space-x-2">
                                                <span className="font-bold text-gray-900">₹{item.discountPrice}</span>
                                                <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                                                <span className="text-xs text-green-600 font-bold">{Math.round(((item.price - item.discountPrice) / item.price) * 100)}% off</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeFromCartHandler(item._id)}
                                            className="text-red-500 text-sm font-medium flex items-center hover:text-red-700 w-fit"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Details */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Price Details</h2>
                                <div className="space-y-3 text-sm text-gray-600 border-b border-gray-200 pb-4">
                                    <div className="flex justify-between">
                                        <span>Total Product Price</span>
                                        <span>₹{Number(totalPrice) + Number(totalDiscount)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Total Discounts</span>
                                        <span>- ₹{totalDiscount}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Delivery Charges</span>
                                        <span>FREE</span>
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-between items-center font-bold text-lg text-gray-900 mb-6">
                                    <span>Order Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                                <button
                                    onClick={checkoutHandler}
                                    className="w-full bg-primary text-white py-3 rounded-md font-bold text-lg hover:bg-pink-700 transition"
                                >
                                    Continue
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Cart;
