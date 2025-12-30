import { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { storage } from '../utils/storage';
import { BlogCard } from './BlogCard';
import { ReportModal } from './ReportModal';
import { UserPlus, UserMinus, Flag } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfilePageProps {
  targetUser: User;
  currentUserId: string;
  onPostClick: (post: Post) => void;
}

export function UserProfilePage({ targetUser, currentUserId, onPostClick }: UserProfilePageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [hasReported, setHasReported] = useState(false);

  useEffect(() => {
    setPosts(storage.getUserPosts(targetUser.id));
    setIsSubscribed(storage.isSubscribed(currentUserId, targetUser.id));
    setHasReported(storage.hasReported(currentUserId, targetUser.id));
  }, [targetUser.id, currentUserId]);

  const handleSubscribe = () => {
    if (isSubscribed) {
      storage.unsubscribe(currentUserId, targetUser.id);
      setIsSubscribed(false);
    } else {
      storage.subscribe(currentUserId, targetUser.id);
      setIsSubscribed(true);
    }
  };

  const handleReport = (reason: string) => {
    storage.createReport(currentUserId, targetUser.id, reason);
    setHasReported(true);
    setShowReportModal(false);
    toast.success('Report submitted successfully', {
      description: 'Our moderation team will review your report.'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Profile Header */}
        <div className="flex items-start gap-8 mb-16 pb-12 border-b border-gray-200">
          <img 
            src={targetUser.avatar} 
            alt={targetUser.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 
              style={{ 
                fontFamily: 'Playfair Display, serif',
                fontSize: '2.5rem'
              }}
              className="mb-2 tracking-tight"
            >
              {targetUser.name}
            </h1>
            <p 
              className="text-gray-600 mb-4"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.125rem',
                lineHeight: '1.8'
              }}
            >
              @{targetUser.username}
            </p>
            <p 
              className="text-gray-700 mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.8'
              }}
            >
              {targetUser.bio}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSubscribe}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  isSubscribed 
                    ? 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                    : 'text-white hover:opacity-90'
                }`}
                style={{ 
                  backgroundColor: isSubscribed ? 'transparent' : 'var(--accent-blog)',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                {isSubscribed ? (
                  <>
                    <UserMinus size={20} />
                    Unsubscribe
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Subscribe
                  </>
                )}
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                disabled={hasReported}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  hasReported 
                    ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'border border-red-300 text-red-600 hover:bg-red-50'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
                title={hasReported ? 'You have already reported this user' : 'Report this user'}
              >
                <Flag size={20} />
                {hasReported ? 'Reported' : 'Report'}
              </button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mb-8">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="tracking-tight mb-2"
          >
            Posts ({posts.length})
          </h2>
          <p 
            className="text-gray-600"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.8'
            }}
          >
            Published content from {targetUser.name}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 rounded-lg">
            <p 
              className="text-gray-600"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.125rem'
              }}
            >
              This user hasn&apos;t published any posts yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                date={post.date}
                image={post.image}
                category={post.category}
                onClick={() => onPostClick(post)}
                likeCount={post.likes?.length || 0}
                commentCount={post.comments?.length || 0}
              />
            ))}
          </div>
        )}
      </main>

      {showReportModal && (
        <ReportModal
          reportedUser={targetUser}
          onSubmit={handleReport}
          onCancel={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
}