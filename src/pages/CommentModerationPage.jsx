import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPendingComments, fetchAllComments, approveComment, rejectComment, deleteComment } from '../services/api';
import { Card, Button, Badge } from '../components/ui';
import DashboardLayout from '../components/DashboardLayout';
import SEO from '../components/SEO';

const CommentModerationPage = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');

    useEffect(() => {
        loadComments();
    }, [filter]);

    // Auto-refresh when window regains focus
    useEffect(() => {
        const handleFocus = () => {
            loadComments();
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [filter]);

    const loadComments = async () => {
        setLoading(true);
        try {
            let result;
            if (filter === 'pending') {
                result = await fetchPendingComments();
            } else {
                result = await fetchAllComments({ status: filter === 'all' ? undefined : filter });
            }
            setComments(result.data.comments);
        } catch (error) {
            console.error('Failed to load comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approveComment(id);
            setComments(comments.filter(c => c._id !== id));
            // Refresh to get updated counts
            await loadComments();
        } catch (error) {
            alert('Failed to approve comment: ' + error.message);
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectComment(id);
            setComments(comments.filter(c => c._id !== id));
            // Refresh to get updated counts
            await loadComments();
        } catch (error) {
            alert('Failed to reject comment: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            await deleteComment(id);
            setComments(comments.filter(c => c._id !== id));
            // Refresh to get updated counts
            await loadComments();
        } catch (error) {
            alert('Failed to delete comment: ' + error.message);
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-game-purple border-t-transparent"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <>
            <SEO title="Moderate Comments - Dashboard" noindex={true} />

            <DashboardLayout>
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-white">
                            Moderate Comments
                            {filter === 'pending' && comments.length > 0 && (
                                <Badge variant="tech" className="ml-4">{comments.length} Pending</Badge>
                            )}
                        </h1>
                        <Button
                            variant="outline"
                            onClick={() => loadComments()}
                            disabled={loading}
                        >
                            {loading ? '↻ Refreshing...' : '↻ Refresh'}
                        </Button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-4 mb-6">
                        <Button
                            variant={filter === 'pending' ? 'primary' : 'outline'}
                            onClick={() => setFilter('pending')}
                        >
                            Pending
                        </Button>
                        <Button
                            variant={filter === 'approved' ? 'primary' : 'outline'}
                            onClick={() => setFilter('approved')}
                        >
                            Approved
                        </Button>
                        <Button
                            variant={filter === 'rejected' ? 'primary' : 'outline'}
                            onClick={() => setFilter('rejected')}
                        >
                            Rejected
                        </Button>
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                    </div>

                    {/* Comments List */}
                    {comments.length === 0 ? (
                        <Card className="bg-game-darker/50 border-game-purple/30 p-12 text-center">
                            <p className="text-gray-400 text-lg">
                                {filter === 'pending' ? 'No pending comments' : `No ${filter} comments`}
                            </p>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <Card key={comment._id} className="bg-game-darker/50 border-game-purple/30">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="text-white font-bold">{comment.author.name}</div>
                                                    {comment.status === 'approved' && <Badge variant="success">Approved</Badge>}
                                                    {comment.status === 'rejected' && <Badge variant="secondary">Rejected</Badge>}
                                                    {comment.status === 'pending' && <Badge variant="tech">Pending</Badge>}
                                                </div>
                                                <div className="text-sm text-gray-500 mb-1">{comment.author.email}</div>
                                                <div className="text-sm text-gray-500">
                                                    On: <Link to={`/blog/${comment.blogSlug}`} className="text-game-purple hover:text-game-pink">
                                                        {comment.blogSlug}
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(comment.createdAt).toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="bg-game-dark/50 rounded-lg p-4 mb-4">
                                            <p className="text-gray-300">{comment.content}</p>
                                        </div>

                                        <div className="flex gap-3">
                                            {comment.status === 'pending' && (
                                                <>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => handleApprove(comment._id)}
                                                    >
                                                        ✓ Approve
                                                    </Button>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => handleReject(comment._id)}
                                                    >
                                                        ✗ Reject
                                                    </Button>
                                                </>
                                            )}
                                            {comment.status === 'rejected' && (
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={() => handleApprove(comment._id)}
                                                >
                                                    ✓ Approve
                                                </Button>
                                            )}
                                            {comment.status === 'approved' && (
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() => handleReject(comment._id)}
                                                >
                                                    ✗ Reject
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(comment._id)}
                                            >
                                                🗑 Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
};

export default CommentModerationPage;
