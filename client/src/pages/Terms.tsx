import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const Terms = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Terms & Conditions</h1>
                        <p className="text-sm text-gray-600">Last updated: January 2026</p>
                    </div>

                    {/* Important Notice */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-sm p-6 mb-6 border-2 border-yellow-200">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h2 className="text-base font-bold text-gray-900 mb-2">Educational Project Notice</h2>
                                <p className="text-sm text-gray-700">
                                    This is a demonstration platform created for educational purposes. These terms are for
                                    illustrative purposes and do not constitute a legally binding agreement.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-6">
                        {/* Section 1 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-purple-600">1</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Acceptance of Terms</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                By accessing and using this website, you accept and agree to be bound by these Terms and Conditions.
                                This is a dummy e-commerce platform created for educational purposes only. No real transactions
                                occur on this platform.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-blue-600">2</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Use of Service</h2>
                            </div>
                            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                                <p>This platform is provided solely for demonstration and learning purposes. Users agree to:</p>
                                <div className="space-y-2">
                                    {[
                                        'Not use the platform for any commercial purposes',
                                        'Not attempt to make real purchases or payments',
                                        'Not enter real personal or financial information',
                                        'Understand that all products and prices are fictional',
                                        'Use the platform responsibly and ethically'
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-green-600">3</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">No Real Transactions</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                This platform does not process real payments or deliver actual products. All product listings,
                                prices, and shopping features are for demonstration purposes only. No legal contract for sale
                                is formed through the use of this platform.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-pink-600">4</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Account Registration</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Users may create accounts to explore features. Use dummy information for testing purposes.
                                We are not responsible for any data stored on this demonstration platform.
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-orange-600">5</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Intellectual Property</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                This is an educational clone project. All product images and content are used for demonstration
                                purposes only. We do not claim ownership of any brand names, logos, or product images.
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-red-600">6</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Limitation of Liability</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                This is an educational project with no warranties or guarantees. The developers assume no
                                liability for any issues arising from the use of this platform. Use at your own discretion.
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-indigo-600">7</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Changes to Terms</h2>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                We reserve the right to modify or discontinue this platform at any time without prior notice.
                                These terms may also be updated periodically.
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Shield className="w-5 h-5 text-purple-600" />
                            <h3 className="text-base font-bold text-gray-900">Questions?</h3>
                        </div>
                        <p className="text-sm text-gray-700">
                            If you have any questions about these Terms, please{' '}
                            <a href="/contact" className="text-purple-600 font-semibold hover:underline">
                                contact us
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Terms;
