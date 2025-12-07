import { useState, useEffect } from 'react';
import { Post, Comment } from '../types';
import { storage } from '../utils/storage';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Newsletter } from './Newsletter';
import { ReportModal } from './ReportModal';
import { ArrowLeft, Heart, MessageCircle, Trash2, Video, Flag } from 'lucide-react';
import { toast } from 'sonner';

interface PostPageProps {
  post: Post;
  onBack: () => void;
}

export function PostPage({ post: initialPost, onBack }: PostPageProps) {
  const [post, setPost] = useState<Post>(initialPost);
  const [currentUser, setCurrentUser] = useState(storage.getCurrentUser());
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [hasReported, setHasReported] = useState(false);

  useEffect(() => {
    // Refresh post data
    const refreshedPost = storage.getPost(post.id);
    if (refreshedPost) {
      setPost(refreshedPost);
    }

    // Check if current user has liked
    if (currentUser && refreshedPost) {
      setIsLiked(refreshedPost.likes?.includes(currentUser.id) || false);
    }

    // Check if current user has reported the author
    if (currentUser && refreshedPost?.author) {
      setHasReported(storage.hasReported(currentUser.id, refreshedPost.author.id));
    }
  }, [post.id, currentUser]);

  const handleLike = () => {
    if (!currentUser) return;
    
    const updatedPost = storage.toggleLike(post.id, currentUser.id);
    if (updatedPost) {
      setPost(updatedPost);
      setIsLiked(!isLiked);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !commentText.trim()) return;

    const newComment = storage.addComment(post.id, currentUser.id, commentText);
    if (newComment) {
      const updatedPost = storage.getPost(post.id);
      if (updatedPost) {
        setPost(updatedPost);
        setCommentText('');
      }
    }
  };

  const handleDeleteComment = (commentId: string) => {
    if (!currentUser) return;
    
    if (confirm('Delete this comment?')) {
      storage.deleteComment(post.id, commentId);
      const updatedPost = storage.getPost(post.id);
      if (updatedPost) {
        setPost(updatedPost);
      }
    }
  };

  const handleReport = (reason: string) => {
    if (!currentUser || !post.author) return;
    
    storage.createReport(currentUser.id, post.author.id, reason);
    setHasReported(true);
    setShowReportModal(false);
    toast.success('Report submitted successfully', {
      description: 'Our moderation team will review your report.'
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('video');
  };

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Back button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowLeft size={20} />
          Back to all posts
        </button>

        {/* Category and date */}
        <div className="flex items-center gap-3 mb-6">
          <span 
            className="px-3 py-1 rounded-full text-white"
            style={{ 
              backgroundColor: 'var(--accent-blog)',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {post.category}
          </span>
          <time className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            {post.date}
          </time>
        </div>

        {/* Author info */}
        {post.author && currentUser && currentUser.id !== post.author.id && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p 
                  className="text-gray-900"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {post.author.name}
                </p>
                <p 
                  className="text-gray-600"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
                >
                  @{post.author.username}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              disabled={hasReported}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                hasReported 
                  ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
                  : 'border border-red-300 text-red-600 hover:bg-red-50'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
              title={hasReported ? 'You have already reported this user' : 'Report this user'}
            >
              <Flag size={16} />
              {hasReported ? 'Reported' : 'Report'}
            </button>
          </div>
        )}

        {/* Author info for own post */}
        {post.author && currentUser && currentUser.id === post.author.id && (
          <div className="flex items-center gap-3 mb-6">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p 
                className="text-gray-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {post.author.name}
              </p>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
              >
                @{post.author.username}
              </p>
            </div>
          </div>
        )}

        {/* Title */}
        <h1 
          style={{ 
            fontFamily: 'Playfair Display, serif',
            fontSize: '3rem',
            lineHeight: '1.2'
          }}
          className="mb-10 tracking-tight"
        >
          {post.title}
        </h1>

        {/* Featured image - full width of content */}
        <div className="relative overflow-hidden aspect-[16/9] mb-8 -mx-6 md:mx-0">
          <ImageWithFallback 
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Like and comment counts */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Heart 
              size={24} 
              fill={isLiked ? 'currentColor' : 'none'}
              className="transition-all"
            />
            <span>{post.likes?.length || 0} {post.likes?.length === 1 ? 'like' : 'likes'}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle size={24} />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>
              {post.comments?.length || 0} {post.comments?.length === 1 ? 'comment' : 'comments'}
            </span>
          </div>
        </div>

        {/* Article content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {post.content.map((paragraph, index) => (
            <p 
              key={index} 
              className="mb-6 text-gray-800"
              style={{ 
                lineHeight: '1.9',
                fontSize: '1.125rem'
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Additional Media */}
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className="mb-12">
            <h3 
              style={{ fontFamily: 'Playfair Display, serif' }}
              className="mb-6 tracking-tight"
            >
              Media Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.mediaUrls.map((url, index) => (
                <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {isVideo(url) ? (
                    <video 
                      src={url} 
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={url} 
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="border-t border-gray-200 pt-12">
          <h3 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="mb-8 tracking-tight"
          >
            Comments ({post.comments?.length || 0})
          </h3>

          {/* Comment form */}
          {currentUser && (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="flex gap-3">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none mb-3"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: 'var(--accent-blog)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Comments list */}
          <div className="space-y-6">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  {comment.user && (
                    <>
                      <img 
                        src={comment.user.avatar} 
                        alt={comment.user.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg px-4 py-3">
                          <div className="flex items-center justify-between mb-1">
                            <p 
                              className="text-gray-900"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {comment.user.name}
                            </p>
                            {currentUser && comment.userId === currentUser.id && (
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete comment"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                          <p 
                            className="text-gray-800"
                            style={{ 
                              fontFamily: 'Inter, sans-serif',
                              lineHeight: '1.6'
                            }}
                          >
                            {comment.content}
                          </p>
                        </div>
                        <p 
                          className="text-gray-500 mt-2 ml-4"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.875rem'
                          }}
                        >
                          {formatTimestamp(comment.timestamp)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p 
                className="text-gray-500 text-center py-8"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>

        {/* Newsletter CTA */}
        <Newsletter />
      </article>

      {/* Report Modal */}
      {showReportModal && post.author && (
        <ReportModal
          reportedUser={post.author}
          onSubmit={handleReport}
          onCancel={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
}