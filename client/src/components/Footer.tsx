import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-8 text-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Column 1: Store Info */}
                    <div>
                        <h3 className="text-3xl font-bold text-primary mb-4">meesho</h3>
                        <p className="text-sm mb-4">
                            There are many variations of passages of generic lorem ipsum available, but the majority have suffered alteration in some form.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Column 2: Shop */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-primary">Women Ethnic</Link></li>
                            <li><Link to="/" className="hover:text-primary">Women Western</Link></li>
                            <li><Link to="/" className="hover:text-primary">Men</Link></li>
                            <li><Link to="/" className="hover:text-primary">Kids</Link></li>
                            <li><Link to="/" className="hover:text-primary">Electronic</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Information */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Information</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
                            <li><Link to="/press" className="hover:text-primary">Press Releases</Link></li>
                            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Fashnear Technologies Private Limited,</li>
                            <li>CIN: U74900KA2015PTC082263</li>
                            <li>06-105-B, 06-102, (138 Wu)</li>
                            <li>Vaishnavi Signature, No. 78/9,</li>
                            <li>Outer Ring Road, Bellandur,</li>
                            <li>Varthur Hobli, Bengaluru-560103,</li>
                            <li>Karnataka, India</li>
                            <li>E-mail address: query@meesho.com</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 mt-8 text-center text-sm md:flex md:justify-between md:items-center">
                    <p>&copy; 2026 Meesho ~ All Rights Reserved !</p>
                    <div className="mt-4 md:mt-0">
                        <span className="text-gray-500">Trusted by 10 Crore+ Indians</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
