import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Phone, MessageSquare, Send, MapPin } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact Us</h1>
                        <p className="text-sm text-gray-600">
                            We're here to help. Get in touch with us.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Contact Form */}
                        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 mb-1">Email Support</h3>
                                        <p className="text-sm text-gray-600 mb-2">Send us an email anytime</p>
                                        <a href="mailto:support@meesho.com" className="text-sm font-semibold text-purple-600 hover:underline">
                                            support@meesho.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 mb-1">Phone Support</h3>
                                        <p className="text-sm text-gray-600 mb-2">Mon-Sat, 9 AM to 6 PM</p>
                                        <a href="tel:+918080808080" className="text-sm font-semibold text-blue-600 hover:underline">
                                            +91 80808 08080
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 mb-1">Office Address</h3>
                                        <p className="text-sm text-gray-600">
                                            Meesho Headquarters<br />
                                            HSR Layout, Bangalore<br />
                                            Karnataka, India - 560102
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                                <div className="flex items-start gap-3">
                                    <MessageSquare className="w-5 h-5 text-purple-600 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">Response Time</h3>
                                        <p className="text-sm text-gray-600">
                                            We typically respond within 24 hours
                                        </p>
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

export default Contact;
