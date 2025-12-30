import { useState, useEffect } from 'react';
import { Post, User } from '../types';
import { storage } from '../utils/storage';
import { BlogCard } from './BlogCard';
import { PostEditor } from './PostEditor';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface MyBlogPageProps {
  user: User;
  onPostClick: (post: Post) => void;
}

export function MyBlogPage({ user, onPostClick }: MyBlogPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>();

  const loadPosts = () => {
    setPosts(storage.getUserPosts(user.id));
  };

  useEffect(() => {
    loadPosts();
  }, [user.id]);

  const handleCreatePost = () => {
    setEditingPost(undefined);
    setShowEditor(true);
  };

  const handleEditPost = (post: Post, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDeletePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this post?')) {
      storage.deletePost(postId);
      loadPosts();
    }
  };

  const handleSavePost = (postData: Omit<Post, 'id' | 'date' | 'authorId'>) => {
    if (editingPost) {
      storage.updatePost(editingPost.id, postData);
    } else {
      storage.createPost({
        ...postData,
        authorId: user.id
      });
    }
    setShowEditor(false);
    setEditingPost(undefined);
    loadPosts();
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Profile Header */}
        <div className="flex items-start gap-8 mb-16 pb-12 border-b border-gray-200">
          <img 
            src={user.avatar} 
            alt={user.name}
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
              {user.name}
            </h1>
            <p 
              className="text-gray-600 mb-4"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.125rem',
                lineHeight: '1.8'
              }}
            >
              @{user.username}
            </p>
            <p 
              className="text-gray-700 mb-6"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.8'
              }}
            >
              {user.bio}
            </p>
            <button
              onClick={handleCreatePost}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ 
                backgroundColor: 'var(--accent-blog)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <Plus size={20} />
              Create New Post
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mb-8">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="tracking-tight mb-2"
          >
            My Posts ({posts.length})
          </h2>
          <p 
            className="text-gray-600"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.8'
            }}
          >
            Manage your published content
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 rounded-lg">
            <p 
              className="text-gray-600 mb-4"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.125rem'
              }}
            >
              You haven&apos;t published any posts yet.
            </p>
            <button
              onClick={handleCreatePost}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              style={{ 
                backgroundColor: 'var(--accent-blog)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <Plus size={20} />
              Create Your First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post) => (
              <div key={post.id} className="relative group">
                <BlogCard
                  title={post.title}
                  date={post.date}
                  image={post.image}
                  category={post.category}
                  onClick={() => onPostClick(post)}
                  likeCount={post.likes?.length || 0}
                  commentCount={post.comments?.length || 0}
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={(e) => handleEditPost(post, e)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDeletePost(post.id, e)}
                    className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showEditor && (
        <PostEditor
          post={editingPost}
          onSave={handleSavePost}
          onCancel={() => {
            setShowEditor(false);
            setEditingPost(undefined);
          }}
        />
      )}
    </div>
  );
}