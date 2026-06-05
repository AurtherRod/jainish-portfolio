import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({ error, errorInfo });

        // Log to error reporting service (e.g., Sentry)
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-game-dark">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <div className="mb-8">
                            <span className="text-8xl">⚠️</span>
                        </div>
                        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-meadow to-coral bg-clip-text text-transparent">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-xl text-ink/70 mb-8 font-semibold">
                            We encountered an unexpected error. Don't worry, our team has been notified.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="toon-btn"
                        >
                            Reload Page
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="mt-8 text-left slab p-6">
                                <summary className="cursor-pointer text-meadow-deep font-bold mb-4">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="text-sm text-ink/60 overflow-auto">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.node,
    onError: PropTypes.func,
};

export default ErrorBoundary;
