import { useState, useEffect } from 'react';
import { fetchComments, submitComment } from '../services/api';
import { Card, Button } from './ui';

const CommentSection = ({ blogSlug, contentSlug, contentType = 'blog' }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: ''
    });
    const [rating, setRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Use contentSlug if provided, otherwise fall back to blogSlug
    const slug = contentSlug || blogSlug;

    useEffect(() => {
        loadComments();
    }, [slug, contentType]);

    const loadComments = async () => {
        try {
            const result = await fetchComments(slug, contentType);
            setComments(result.data.comments);
        } catch (error) {
            console.error('Failed to load comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccess(false);

        try {
            await submitComment({
                contentSlug: slug,
                contentType,
                author: {
                    name: formData.name,
                    email: formData.email
                },
                content: formData.content,
                ...(contentType === 'game' && rating > 0 && { rating })
            });

            setSuccess(true);
            setFormData({ name: '', email: '', content: '' });
            setRating(0);

            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            alert('Failed to submit comment: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-16 pt-12 border-t border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8">Comments ({comments.length})</h2>

            {/* Comment Form */}
            <Card className="bg-game-darker/50 border-game-purple/30 mb-8">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Leave a Comment</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        Your comment will be reviewed by an admin before appearing on the site.
                    </p>

                    {success && (
                        <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-green-400 text-sm mb-4">
                            ✓ Comment submitted successfully! It will appear after admin approval.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Name *</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-game-dark border border-game-purple/30 rounded-lg text-white placeholder-gray-500 focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Email *</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-game-dark border border-game-purple/30 rounded-lg text-white placeholder-gray-500 focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Rating (for games only) */}
                        {contentType === 'game' && (
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">Rating (Optional)</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-3xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-600 hover:text-gray-500'
                                                }`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                {rating > 0 && (
                                    <p className="text-sm text-gray-400 mt-1">You rated this game {rating} out of 5 stars</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-300 text-sm mb-2">Comment *</label>
                            <textarea
                                placeholder="Share your thoughts..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-3 bg-game-dark border border-game-purple/30 rounded-lg text-white placeholder-gray-500 focus:border-game-purple focus:ring-2 focus:ring-game-purple/20 transition-all"
                                rows="4"
                                maxLength="1000"
                                required
                            />
                            <div className="text-sm text-gray-500 mt-1">{formData.content.length}/1000</div>
                        </div>
                        <Button type="submit" variant="primary" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Comment'}
                        </Button>
                    </form>
                </div>
            </Card>

            {/* Comments List */}
            {loading ? (
                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-game-purple border-t-transparent mx-auto"></div>
                </div>
            ) : comments.length === 0 ? (
                <Card className="bg-game-darker/50 border-game-purple/30 p-8 text-center">
                    <p className="text-gray-400">No comments yet. Be the first to comment!</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {comments.map(comment => (
                        <Card key={comment._id} className="bg-game-darker/50 border-game-purple/30">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="text-white font-bold">{comment.author.name}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    {comment.rating && (
                                        <div className="text-yellow-400 text-lg">
                                            {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentSection;
