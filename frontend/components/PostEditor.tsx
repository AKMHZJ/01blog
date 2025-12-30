import { useState, useEffect } from 'react';
import { Post } from '../types';
import { X } from 'lucide-react';
import { MediaUploader } from './MediaUploader';

interface PostEditorProps {
  post?: Post;
  onSave: (post: Omit<Post, 'id' | 'date' | 'authorId'>) => void;
  onCancel: () => void;
}

export function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [category, setCategory] = useState(post?.category || 'Lifestyle');
  const [image, setImage] = useState(post?.image || '');
  const [content, setContent] = useState(post?.content.join('\n\n') || '');
  const [mediaUrls, setMediaUrls] = useState<string[]>(post?.mediaUrls || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      excerpt,
      category,
      image: image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1080',
      content: content.split('\n\n').filter(p => p.trim()),
      likes: post?.likes || [],
      comments: post?.comments || [],
      mediaUrls
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="tracking-tight"
          >
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label 
              htmlFor="title"
              className="block text-gray-700 mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
              placeholder="Enter your post title"
            />
          </div>

          <div>
            <label 
              htmlFor="excerpt"
              className="block text-gray-700 mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none"
              style={{ fontFamily: 'Inter, sans-serif' }}
              placeholder="Brief description of your post"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label 
                htmlFor="category"
                className="block text-gray-700 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Category *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option>Lifestyle</option>
                <option>Design</option>
                <option>Technology</option>
                <option>Productivity</option>
                <option>Architecture</option>
              </select>
            </div>

            <div>
              <label 
                htmlFor="image"
                className="block text-gray-700 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Image URL
              </label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="content"
              className="block text-gray-700 mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Content * (separate paragraphs with blank lines)
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
              style={{ fontFamily: 'Inter, sans-serif' }}
              placeholder="Write your post content here..."
            />
          </div>

          <div>
            <label 
              className="block text-gray-700 mb-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Additional Media (Optional)
            </label>
            <MediaUploader
              mediaUrls={mediaUrls}
              setMediaUrls={setMediaUrls}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: 'var(--accent-blog)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              {post ? 'Update Post' : 'Publish Post'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}