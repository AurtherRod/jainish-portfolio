import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, isAuthenticated } from '../services/api';
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

            <div className="min-h-screen flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="font-display text-4xl text-ink mb-2">
                            Admin <span className="text-meadow-deep">Login</span>
                        </h1>
                        <p className="text-ink/60 font-semibold">Access your dashboard</p>
                    </div>

                    {/* Login Form */}
                    <div className="slab p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-ink mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-paper border-[2.5px] border-ink rounded-xl text-ink placeholder-ink/40 focus:outline-none focus:border-meadow focus:ring-2 focus:ring-meadow/20 transition-all font-semibold"
                                    placeholder="admin@jainish.space"
                                    disabled={loading}
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-ink mb-2">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-paper border-[2.5px] border-ink rounded-xl text-ink placeholder-ink/40 focus:outline-none focus:border-meadow focus:ring-2 focus:ring-meadow/20 transition-all font-semibold"
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-coral/15 border-[2px] border-coral rounded-xl p-3 text-coral text-sm font-semibold">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="toon-btn w-full"
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
                            </button>
                        </form>
                    </div>

                    {/* Back to Home */}
                    <div className="text-center mt-6">
                        <a href="/" className="text-meadow-deep hover:text-meadow transition-colors text-sm font-semibold">
                            ← Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
