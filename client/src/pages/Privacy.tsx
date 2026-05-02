import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, Database, Cookie, UserCheck } from 'lucide-react';

const Privacy = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
                        <p className="text-sm text-gray-600">Last updated: January 2026</p>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 mb-6 border-2 border-blue-200">
                        <div className="flex items-start gap-3">
                            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-2">Educational Project Notice</h2>
                                <p className="text-sm text-gray-700">
                                    This is a demonstration platform. We recommend not entering real personal information.
                                    This privacy policy is for illustrative purposes only.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Sections */}
                    <div className="space-y-6">
                        {/* Section 1 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Database className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Information We Collect</h2>
                            </div>
                            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                                <p>For this educational platform, we may collect:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Account information (name, email, phone number)</li>
                                    <li>Usage data and browsing patterns</li>
                                    <li>Device and browser information</li>
                                    <li>Transaction history (for demo purposes)</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">How We Use Your Information</h2>
                            </div>
                            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                                <p>Since this is an educational project, any data collected is used solely for:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Demonstrating e-commerce functionality</li>
                                    <li>Testing user authentication flows</li>
                                    <li>Showcasing shopping cart features</li>
                                    <li>Educational and learning purposes</li>
                                    <li>No commercial or marketing use</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Data Security</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                We implement basic security measures to protect data during this demonstration. However,
                                as this is an educational project, we strongly recommend not entering real sensitive information.
                                Passwords are hashed, but this platform should not be used for actual personal data.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Cookie className="w-5 h-5 text-orange-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Cookies & Local Storage</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                This platform uses cookies and local storage to maintain your session and remember
                                your cart items. These are standard web technologies used for demonstration purposes.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                    <UserCheck className="w-5 h-5 text-pink-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Your Rights</h2>
                            </div>
                            <div className="text-sm text-gray-700 leading-relaxed">
                                <p className="mb-3">You have the right to:</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span>Access your data</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span>Delete your account</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span>Update your information</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span>Opt-out anytime</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100 text-center">
                        <p className="text-sm text-gray-700">
                            Have questions about privacy?{' '}
                            <a href="/contact" className="text-purple-600 font-semibold hover:underline">
                                Contact us
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Privacy;
