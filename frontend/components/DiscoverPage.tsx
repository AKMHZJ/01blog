import { useState, useEffect } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';
import { UserPlus, UserMinus } from 'lucide-react';

interface DiscoverPageProps {
  currentUserId: string;
  onUserClick: (user: User) => void;
}

export function DiscoverPage({ currentUserId, onUserClick }: DiscoverPageProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    const allUsers = storage.getUsers().filter(u => u.id !== currentUserId);
    setUsers(allUsers);
    setSubscriptions(storage.getUserSubscriptions(currentUserId));
  }, [currentUserId]);

  const handleToggleSubscribe = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (subscriptions.includes(userId)) {
      storage.unsubscribe(currentUserId, userId);
      setSubscriptions(subscriptions.filter(id => id !== userId));
    } else {
      storage.subscribe(currentUserId, userId);
      setSubscriptions([...subscriptions, userId]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 
            style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.5rem'
            }}
            className="mb-3 tracking-tight"
          >
            Discover Users
          </h1>
          <p 
            className="text-gray-600"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: '1.8'
            }}
          >
            Find interesting people to follow and see their posts in your feed
          </p>
        </div>

        <div className="space-y-4">
          {users.map((user) => {
            const isSubscribed = subscriptions.includes(user.id);
            const postCount = storage.getUserPosts(user.id).length;

            return (
              <div
                key={user.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => onUserClick(user)}
              >
                <div className="flex items-start gap-6">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 
                      style={{ fontFamily: 'Playfair Display, serif' }}
                      className="tracking-tight mb-1"
                    >
                      {user.name}
                    </h3>
                    <p 
                      className="text-gray-600 mb-3"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem'
                      }}
                    >
                      @{user.username} · {postCount} {postCount === 1 ? 'post' : 'posts'}
                    </p>
                    <p 
                      className="text-gray-700 mb-4"
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '1.7'
                      }}
                    >
                      {user.bio}
                    </p>
                    <button
                      onClick={(e) => handleToggleSubscribe(user.id, e)}
                      className={`px-5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        isSubscribed 
                          ? 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                          : 'text-white hover:opacity-90'
                      }`}
                      style={{ 
                        backgroundColor: isSubscribed ? 'transparent' : 'var(--accent-blog)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.875rem'
                      }}
                    >
                      {isSubscribed ? (
                        <>
                          <UserMinus size={16} />
                          Subscribed
                        </>
                      ) : (
                        <>
                          <UserPlus size={16} />
                          Subscribe
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
