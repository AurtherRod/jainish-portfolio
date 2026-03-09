import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../services/api';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated()) {
                setLoading(false);
                return;
            }

            try {
                await getCurrentUser();
                setAuthenticated(true);
            } catch (error) {
                // Token is invalid or expired
                localStorage.removeItem('token');
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-game-dark">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-game-purple border-t-transparent"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-game-pink opacity-20"></div>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
