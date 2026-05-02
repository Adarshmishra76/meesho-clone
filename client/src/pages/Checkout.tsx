import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { clearCart } from '../slices/cartSlice';
import { addOrder } from '../slices/orderSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingBag, MapPin, CreditCard, CheckCircle, Package, Truck, ChevronRight } from 'lucide-react';

const Checkout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const [currentStep, setCurrentStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');

    // Form states
    const [deliveryAddress, setDeliveryAddress] = useState({
        fullName: userInfo?.name || '',
        phone: userInfo?.phone || '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cod');

    const [orderTotal, setOrderTotal] = useState(0);

    // Calculate totals
    const subtotal = cartItems.reduce((acc, item) => acc + item.discountPrice * item.qty, 0);
    const shipping = subtotal > 500 ? 0 : 30;
    const total = subtotal + shipping;

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !orderPlaced) {
            navigate('/cart');
        }
    }, [cartItems, navigate, orderPlaced]);

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentStep(2);
    };

    const handlePlaceOrder = () => {
        const newOrderId = Math.floor(100000 + Math.random() * 900000).toString();
        setOrderId(newOrderId);
        setOrderTotal(total);

        // Create and save order
        const order = {
            id: newOrderId,
            date: new Date().toISOString(),
            items: cartItems,
            total,
            status: 'processing',
            paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment',
            deliveryAddress
        };

        dispatch(addOrder(order));
        setOrderPlaced(true);
        setCurrentStep(3);

        setTimeout(() => {
            dispatch(clearCart());
        }, 2000);
    };

    if (orderPlaced && currentStep === 3) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm p-8 md:p-10 text-center border border-gray-100">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-3">
                                Order Placed Successfully! 🎉
                            </h1>
                            <p className="text-sm text-gray-600 mb-8">
                                Thank you for your order! Your order has been confirmed and will be delivered soon.
                            </p>

                            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 mb-6 border border-green-200">
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order ID:</span>
                                        <span className="font-bold text-gray-900">#{orderId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Amount:</span>
                                        <span className="font-bold text-lg text-green-600">₹{orderTotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment:</span>
                                        <span className="font-semibold text-gray-900">
                                            {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
                                >
                                    View Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Checkout</h1>
                        <p className="text-sm text-gray-600">Complete your purchase</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center gap-4">
                            {[
                                { num: 1, label: 'Address', icon: MapPin },
                                { num: 2, label: 'Payment', icon: CreditCard }
                            ].map((step, idx) => (
                                <div key={step.num} className="flex items-center">
                                    <div className={`flex items-center gap-3 ${currentStep >= step.num ? 'opacity-100' : 'opacity-40'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep >= step.num
                                            ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                                            : 'bg-gray-300'
                                            }`}>
                                            <step.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700">{step.label}</span>
                                    </div>
                                    {idx < 1 && (
                                        <ChevronRight className={`w-5 h-5 mx-4 ${currentStep > step.num ? 'text-purple-500' : 'text-gray-300'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2">

                            {/* Step 1: Delivery Address */}
                            {currentStep === 1 && (
                                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                                    </div>

                                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-2">Full Name *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={deliveryAddress.fullName}
                                                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullName: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-2">Phone Number *</label>
                                                <input
                                                    type="tel"
                                                    required
                                                    value={deliveryAddress.phone}
                                                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                                                    placeholder="9876543210"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-gray-700 mb-2">Address *</label>
                                            <textarea
                                                required
                                                rows={3}
                                                value={deliveryAddress.address}
                                                onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500 resize-none"
                                                placeholder="House No, Street, Area"
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-2">City *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={deliveryAddress.city}
                                                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                                                    placeholder="Mumbai"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-2">State *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={deliveryAddress.state}
                                                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, state: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                                                    placeholder="Maharashtra"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-700 mb-2">Pincode *</label>
                                                <input
                                                    type="text"
                                                    required
                                                    pattern="[0-9]{6}"
                                                    value={deliveryAddress.pincode}
                                                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                                                    placeholder="400001"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            Continue to Payment
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Step 2: Payment Method */}
                            {currentStep === 2 && (
                                <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <label className={`block p-5 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod'
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300'
                                            }`}>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="cod"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="w-4 h-4 text-purple-600"
                                                />
                                                <div className="ml-4 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Package className="w-5 h-5 text-purple-600" />
                                                        <span className="font-bold text-gray-900 text-sm">Cash on Delivery</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-1">Pay when you receive your order</p>
                                                </div>
                                            </div>
                                        </label>

                                        <label className={`block p-5 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'online'
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300'
                                            }`}>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value="online"
                                                    checked={paymentMethod === 'online'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="w-4 h-4 text-purple-600"
                                                />
                                                <div className="ml-4 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="w-5 h-5 text-purple-600" />
                                                        <span className="font-bold text-gray-900 text-sm">Online Payment</span>
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-1">UPI, Cards, Net Banking (Demo Mode)</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button
                                            onClick={() => setCurrentStep(1)}
                                            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                                    <h3 className="text-base font-bold text-gray-900">Order Summary</h3>
                                </div>

                                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                                            <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">{item.title}</h4>
                                                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                                <p className="text-sm font-bold text-purple-600">₹{item.discountPrice}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-700">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="font-semibold">₹{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-700">
                                        <span className="flex items-center gap-1">
                                            <Truck className="w-4 h-4" />
                                            Shipping
                                        </span>
                                        <span className="font-semibold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                    </div>
                                    {shipping === 0 && (
                                        <p className="text-xs text-green-600 flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            You saved ₹30!
                                        </p>
                                    )}
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-base font-bold text-gray-900">Total</span>
                                            <span className="text-xl font-bold text-purple-600">₹{total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
