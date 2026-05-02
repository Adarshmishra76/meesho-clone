import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store';
import { logout } from '../slices/authSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Package, Shield, MapPin, CreditCard, User, Mail, LogOut, ChevronLeft, Save, CheckCircle, Truck, Clock, Edit } from 'lucide-react';

const Profile = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const { orders } = useSelector((state: RootState) => state.order);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [editingAddress, setEditingAddress] = useState(false);
    const [address, setAddress] = useState('123 Main Street, Mumbai, Maharashtra - 400001');
    const [tempAddress, setTempAddress] = useState(address);
    const [editingProfile, setEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        phone: userInfo?.phone || ''
    });

    if (!userInfo) {
        navigate('/login');
        return null;
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleSaveAddress = () => {
        setAddress(tempAddress);
        setEditingAddress(false);
        alert('Address saved successfully!');
    };

    const handleSaveProfile = () => {
        setEditingProfile(false);
        alert('Profile updated successfully!');
    };

    const cards = [
        {
            icon: Package,
            title: 'Your Orders',
            description: 'Track, return, or buy things again',
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-600',
            section: 'orders'
        },
        {
            icon: Shield,
            title: 'Login & security',
            description: 'Edit login, name, and mobile number',
            bgColor: 'bg-gray-50',
            iconColor: 'text-gray-600',
            section: 'security'
        },
        {
            icon: MapPin,
            title: 'Your Addresses',
            description: 'Edit addresses for orders and gifts',
            bgColor: 'bg-yellow-50',
            iconColor: 'text-yellow-600',
            section: 'addresses'
        },
        {
            icon: CreditCard,
            title: 'Payment options',
            description: 'Edit or add payment methods',
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-600',
            section: 'payment'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'shipped': return 'bg-blue-100 text-blue-700';
            default: return 'bg-yellow-100 text-yellow-700';
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button when in section view */}
                    {activeSection && (
                        <button
                            onClick={() => setActiveSection(null)}
                            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-purple-600 font-medium text-sm transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back to Account
                        </button>
                    )}

                    {/* Header */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        {activeSection ? cards.find(c => c.section === activeSection)?.title : 'Your Account'}
                    </h1>

                    {/* Main View - Cards Grid */}
                    {!activeSection && (
                        <>
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                {cards.map((card, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveSection(card.section)}
                                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left group border border-gray-100 hover:border-purple-200"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-14 h-14 ${card.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                <card.icon className={`w-7 h-7 ${card.iconColor}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                                                    {card.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {card.description}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Account Info Preview */}
                            <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Full Name</p>
                                            <p className="text-sm font-semibold text-gray-900">{userInfo.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium">Email</p>
                                            <p className="text-sm font-semibold text-gray-900">{userInfo.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </>
                    )}

                    {/* Orders Section */}
                    {activeSection === 'orders' && (
                        <div className="space-y-4">
                            {orders.length === 0 ? (
                                <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-100 text-center">
                                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Orders Yet</h3>
                                    <p className="text-sm text-gray-600 mb-6">Start shopping to see your orders here!</p>
                                    <button
                                        onClick={() => navigate('/')}
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="text-base font-bold text-gray-900">Order #{order.id}</h3>
                                                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">{order.items.length} items</p>
                                                <p className="text-lg font-bold text-purple-600">₹{order.total}</p>
                                            </div>
                                        </div>

                                        {/* Order Items List */}
                                        <div className="mb-4 space-y-2 border-t border-gray-200 pt-4">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-12 h-12 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-xs font-semibold text-gray-900 line-clamp-1">{item.title}</h4>
                                                        <p className="text-xs text-gray-500">Qty: {item.qty} × ₹{item.discountPrice}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-gray-900">₹{item.qty * item.discountPrice}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4 border-t border-gray-200 pt-4">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                {order.status === 'delivered' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                                                    order.status === 'shipped' ? <Truck className="w-3 h-3 mr-1" /> :
                                                        <Clock className="w-3 h-3 mr-1" />}
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                            <span className="text-sm text-gray-600">Payment: {order.paymentMethod}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Login & Security Section */}
                    {activeSection === 'security' && (
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Account Details</h2>
                                {!editingProfile && (
                                    <button
                                        onClick={() => setEditingProfile(true)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                )}
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                        disabled={!editingProfile}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm ${editingProfile ? 'border-purple-300 focus:ring-2 focus:ring-purple-200' : 'bg-gray-50 border-gray-200'}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        disabled={!editingProfile}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm ${editingProfile ? 'border-purple-300 focus:ring-2 focus:ring-purple-200' : 'bg-gray-50 border-gray-200'}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2">Mobile Number</label>
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        disabled={!editingProfile}
                                        className={`w-full px-4 py-3 border rounded-lg text-sm ${editingProfile ? 'border-purple-300 focus:ring-2 focus:ring-purple-200' : 'bg-gray-50 border-gray-200'}`}
                                    />
                                </div>
                                {editingProfile && (
                                    <div className="flex gap-4 mt-6">
                                        <button
                                            onClick={handleSaveProfile}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                                        >
                                            <Save className="w-4 h-4 inline mr-2" />
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingProfile(false);
                                                setProfileData({ name: userInfo.name, email: userInfo.email, phone: userInfo.phone || '' });
                                            }}
                                            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Addresses Section */}
                    {activeSection === 'addresses' && (
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Saved Address</h2>
                                {!editingAddress && (
                                    <button
                                        onClick={() => {
                                            setEditingAddress(true);
                                            setTempAddress(address);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                )}
                            </div>
                            {!editingAddress ? (
                                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-green-700 font-semibold mb-1">Default Address</p>
                                            <p className="text-sm text-gray-900">{address}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <textarea
                                        value={tempAddress}
                                        onChange={(e) => setTempAddress(e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 resize-none"
                                        placeholder="Enter your complete address..."
                                    />
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleSaveAddress}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition-all"
                                        >
                                            <Save className="w-4 h-4 inline mr-2" />
                                            Save Address
                                        </button>
                                        <button
                                            onClick={() => setEditingAddress(false)}
                                            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Payment Options Section */}
                    {activeSection === 'payment' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Last Order Payment</h2>
                                {orders.length > 0 ? (
                                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Order ID</p>
                                                <p className="text-base font-bold text-gray-900">#{orders[0].id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 font-medium">Amount</p>
                                                <p className="text-lg font-bold text-purple-600">₹{orders[0].total}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                            <CreditCard className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-xs text-gray-500">Payment Method</p>
                                                <p className="text-sm font-semibold text-gray-900">{orders[0].paymentMethod}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-sm text-gray-500">No payment history available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
