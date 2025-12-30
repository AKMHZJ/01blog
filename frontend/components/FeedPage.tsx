import { useState, useEffect } from 'react';
import { Post } from '../types';
import { storage } from '../utils/storage';
import { BlogCard } from './BlogCard';
import { Users } from 'lucide-react';

interface FeedPageProps {
  userId: string;
  onPostClick: (post: Post) => void;
  onDiscoverClick: () => void;
}

export function FeedPage({ userId, onPostClick, onDiscoverClick }: FeedPageProps) {
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [subscribedCount, setSubscribedCount] = useState(0);

  useEffect(() => {
    const posts = storage.getFeedPosts(userId);
    const subscriptions = storage.getUserSubscriptions(userId);
    setFeedPosts(posts);
    setSubscribedCount(subscriptions.length);
  }, [userId]);

  if (subscribedCount === 0) {
    return (
      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'var(--accent-blog)' }}
            >
              <Users className="text-white" size={40} />
            </div>
            <h2 
              style={{ 
                fontFamily: 'Playfair Display, serif',
                fontSize: '2rem'
              }}
              className="mb-4 tracking-tight"
            >
              Your Feed is Empty
            </h2>
            <p 
              className="text-gray-600 mb-8"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.125rem',
                lineHeight: '1.8'
              }}
            >
              Start following other users to see their posts in your personalized feed.
            </p>
            <button
              onClick={onDiscoverClick}
              className="px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: 'var(--accent-blog)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Discover Users
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 
            style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem'
            }}
            className="mb-3 tracking-tight"
          >
            Your Feed
          </h1>
          <p 
            className="text-gray-600"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: '1.8'
            }}
          >
            Latest posts from {subscribedCount} {subscribedCount === 1 ? 'user' : 'users'} you follow
          </p>
        </div>

        {feedPosts.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 rounded-lg">
            <p 
              className="text-gray-600"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.125rem'
              }}
            >
              No posts yet from users you follow. Check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {feedPosts.map((post) => (
              <div key={post.id}>
                <BlogCard
                  title={post.title}
                  date={post.date}
                  image={post.image}
                  category={post.category}
                  onClick={() => onPostClick(post)}
                  likeCount={post.likes?.length || 0}
                  commentCount={post.comments?.length || 0}
                />
                {post.author && (
                  <div className="flex items-center gap-2 mt-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span 
                      className="text-gray-600"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem'
                      }}
                    >
                      {post.author.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}