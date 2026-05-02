import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../slices/authSlice';
import type { RootState, AppDispatch } from '../store';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { userInfo, loading, error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
        return () => {
            dispatch(clearError());
        }
    }, [navigate, userInfo, dispatch]);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register({ name, email, phone, password }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=1380&t=st=1685445277~exp=1685445877~hmac=6c747758368165737577575757')" }}>
            <div className="max-w-md w-full space-y-8 p-10 rounded-2xl shadow-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white relative overflow-hidden">

                {/* Decorative Circles */}
                <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[-50px] right-[-50px] w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>

                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-4xl font-bold tracking-wider uppercase mb-2">Join Us</h1>
                    <h2 className="text-lg font-light tracking-widest uppercase opacity-80">Sign Up</h2>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-200/50 text-white px-4 py-2 rounded text-center backdrop-blur-sm">
                        {error}
                        <div className="mt-1 text-xs">
                            Already registered? <Link to="/login" className="underline font-bold hover:text-gray-200">Log In</Link>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={submitHandler}>
                    <div className="space-y-4">
                        {/* Name Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                required
                                className="block w-full pl-8 pr-3 py-2 border-b border-gray-300 text-white placeholder-gray-200 bg-transparent focus:outline-none focus:border-white focus:ring-0 sm:text-sm transition-colors"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input
                                type="email"
                                required
                                className="block w-full pl-8 pr-3 py-2 border-b border-gray-300 text-white placeholder-gray-200 bg-transparent focus:outline-none focus:border-white focus:ring-0 sm:text-sm transition-colors"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <input
                                type="tel"
                                required
                                className="block w-full pl-8 pr-3 py-2 border-b border-gray-300 text-white placeholder-gray-200 bg-transparent focus:outline-none focus:border-white focus:ring-0 sm:text-sm transition-colors"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input
                                type="password"
                                required
                                className="block w-full pl-8 pr-3 py-2 border-b border-gray-300 text-white placeholder-gray-200 bg-transparent focus:outline-none focus:border-white focus:ring-0 sm:text-sm transition-colors"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-bold rounded-full text-purple-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white shadow-lg transform transition hover:scale-105 duration-200"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <div className="text-sm text-gray-200">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-white hover:underline">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
