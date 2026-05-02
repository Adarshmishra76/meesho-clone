import Header from '../components/Header';
import Footer from '../components/Footer';
import { Store, Users, ShoppingBag, Heart, Shield, Award, Sparkles } from 'lucide-react';

const About = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">About Meesho</h1>
                        <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                            Democratizing e-commerce for everyone
                        </p>
                    </div>

                    {/* Company Overview */}
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                <Store className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Company</h2>
                        </div>
                        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                            <p>
                                Meesho is India's leading e-commerce platform that empowers millions of entrepreneurs, small businesses,
                                and individuals to start their online businesses with zero investment. Founded with a mission to democratize
                                internet commerce for everyone, we've revolutionized the way India shops and sells online.
                            </p>
                            <p>
                                With over 100 million customers and 5 million+ products across 600+ categories, Meesho has become
                                the go-to platform for affordable shopping. Our platform enables resellers and entrepreneurs to discover
                                products, share them on social media, and earn profit on every sale—all without maintaining inventory.
                            </p>
                            <p>
                                We're committed to making e-commerce accessible to everyone, especially in Tier 2 and Tier 3 cities where
                                traditional retail still dominates. Through technology and innovation, we're building India's most inclusive
                                e-commerce ecosystem.
                            </p>
                        </div>
                    </div>

                    {/* Key Features Grid */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                                <ShoppingBag className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">5 Cr+ Products</h3>
                            <p className="text-sm text-gray-600">
                                Vast selection across fashion, home, beauty, electronics and more
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">100M+ Customers</h3>
                            <p className="text-sm text-gray-600">
                                Trusted by millions of shoppers across India
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                <Award className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900 mb-2">Lowest Prices</h3>
                            <p className="text-sm text-gray-600">
                                Factory-direct pricing with no middlemen
                            </p>
                        </div>
                    </div>

                    {/* About This Website */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-sm p-8 mb-6 border-2 border-yellow-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">About This Website</h2>
                        </div>
                        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                            <p className="font-semibold text-yellow-800">
                                ⚠️ Important Notice: This is an Educational Project
                            </p>
                            <p>
                                This website is a demonstration clone created for educational and learning purposes only. It showcases
                                modern web development practices including React, TypeScript, Node.js, Express, and MongoDB.
                                This is NOT the official Meesho platform.
                            </p>
                            <p>
                                <strong>Please Note:</strong> No real transactions occur on this platform. All products, prices, and
                                features are for demonstration purposes. Do not enter real payment information or expect actual
                                product delivery.
                            </p>
                            <p>
                                This project demonstrates key e-commerce features including user authentication, product catalog,
                                shopping cart, checkout flow, order tracking, and responsive design—all built with modern
                                technologies and best practices.
                            </p>
                        </div>
                    </div>

                    {/* Our Values */}
                    <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                                <Heart className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Our Core Values</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-purple-600" />
                                    Customer First
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Everything we do is driven by our commitment to serving our customers better
                                </p>
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-purple-600" />
                                    Empowerment
                                </h3>
                                <p className="text-sm text-gray-600">
                                    We believe in empowering every individual to become an entrepreneur
                                </p>
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-purple-600" />
                                    Innovation
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Constantly innovating to make e-commerce accessible to everyone
                                </p>
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Heart className="w-4 h-4 text-purple-600" />
                                    Trust & Transparency
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Building trust through transparent business practices
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
