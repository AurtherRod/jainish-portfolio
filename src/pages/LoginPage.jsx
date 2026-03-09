import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isAuthenticated } from '../services/api';
import { Button } from '../components/ui';
import SEO from '../components/SEO';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect if already logged in
        if (isAuthenticated()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log('Attempting login...');
            const result = await login(email, password);
            console.log('Login result:', result);

            if (result.status === 'success') {
                console.log('Storing token and navigating...');
                localStorage.setItem('token', result.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="Admin Login - Jainish Portfolio"
                description="Admin login for Jainish's portfolio dashboard"
                noindex={true}
            />

            <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-game-dark via-game-darker to-black">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Admin <span className="text-game-purple">Login</span>
                        </h1>
                        <p className="text-gray-400">Access your dashboard</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-game-darker/50 backdrop-blur-sm border border-game-purple/20 rounded-xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-game-dark border border-game-purple/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    placeholder="admin@jainish.space"
                                    disabled={loading}
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-game-dark border border-game-purple/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-6">
                        <a href="/" className="text-game-purple hover:text-game-pink transition-colors text-sm">
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
