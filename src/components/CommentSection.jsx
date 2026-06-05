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
        <div className="mt-16 pt-12 border-t-[2px] border-ink/15">
            <h2 className="font-display text-3xl text-ink mb-8">Comments ({comments.length})</h2>

            {/* Comment Form */}
            <Card className="mb-8">
                <div className="p-6">
                    <h3 className="font-display text-xl text-ink mb-2">Leave a Comment</h3>
                    <p className="text-ink/60 text-sm mb-4 font-semibold">
                        Your comment will be reviewed by an admin before appearing on the site.
                    </p>

                    {success && (
                        <div className="bg-meadow/15 border-[2px] border-meadow rounded-xl p-4 text-meadow-deep text-sm mb-4 font-semibold">
                            ✓ Comment submitted successfully! It will appear after admin approval.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-ink text-sm mb-2 font-bold">Name *</label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-paper border-[2.5px] border-ink rounded-xl text-ink placeholder-ink/40 focus:border-meadow focus:ring-2 focus:ring-meadow/20 transition-all font-semibold"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-ink text-sm mb-2 font-bold">Email *</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-paper border-[2.5px] border-ink rounded-xl text-ink placeholder-ink/40 focus:border-meadow focus:ring-2 focus:ring-meadow/20 transition-all font-semibold"
                                    required
                                />
                            </div>
                        </div>

                        {/* Rating (for games only) */}
                        {contentType === 'game' && (
                            <div>
                                <label className="block text-ink text-sm mb-2 font-bold">Rating (Optional)</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-3xl transition-colors ${star <= rating ? 'text-sun' : 'text-ink/25 hover:text-ink/40'
                                                }`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                                {rating > 0 && (
                                    <p className="text-sm text-ink/60 mt-1 font-semibold">You rated this game {rating} out of 5 stars</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-ink text-sm mb-2 font-bold">Comment *</label>
                            <textarea
                                placeholder="Share your thoughts..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-4 py-3 bg-paper border-[2.5px] border-ink rounded-xl text-ink placeholder-ink/40 focus:border-meadow focus:ring-2 focus:ring-meadow/20 transition-all font-semibold"
                                rows="4"
                                maxLength="1000"
                                required
                            />
                            <div className="text-sm text-ink/45 mt-1 font-mono">{formData.content.length}/1000</div>
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
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-meadow border-t-transparent mx-auto"></div>
                </div>
            ) : comments.length === 0 ? (
                <Card className="p-8 text-center">
                    <p className="text-ink/60 font-semibold">No comments yet. Be the first to comment!</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {comments.map(comment => (
                        <Card key={comment._id}>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="text-ink font-bold font-display">{comment.author.name}</div>
                                        <div className="text-sm text-ink/45 font-mono">
                                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                    {comment.rating && (
                                        <div className="text-sun text-lg">
                                            {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                                        </div>
                                    )}
                                </div>
                                <p className="text-ink/75 leading-relaxed font-medium">{comment.content}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentSection;
