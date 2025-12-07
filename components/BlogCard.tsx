import { Heart, MessageCircle } from 'lucide-react';

interface BlogCardProps {
  title: string;
  date: string;
  image: string;
  category: string;
  onClick: () => void;
  likeCount?: number;
  commentCount?: number;
}

export function BlogCard({ title, date, image, category, onClick, likeCount = 0, commentCount = 0 }: BlogCardProps) {
  return (
    <article onClick={onClick} className="cursor-pointer group">
      <div className="relative overflow-hidden aspect-[4/3] mb-6">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center gap-4 mb-3">
        <span 
          className="inline-block px-3 py-1 text-white rounded-full"
          style={{ 
            backgroundColor: 'var(--accent-blog)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.75rem'
          }}
        >
          {category}
        </span>
        <span 
          className="text-gray-500"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem'
          }}
        >
          {date}
        </span>
      </div>
      <h2 
        style={{ fontFamily: 'Playfair Display, serif' }}
        className="mb-2 tracking-tight group-hover:opacity-70 transition-opacity"
      >
        {title}
      </h2>
      
      {(likeCount > 0 || commentCount > 0) && (
        <div className="flex items-center gap-4 mt-3">
          {likeCount > 0 && (
            <div className="flex items-center gap-1 text-gray-600">
              <Heart size={16} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                {likeCount}
              </span>
            </div>
          )}
          {commentCount > 0 && (
            <div className="flex items-center gap-1 text-gray-600">
              <MessageCircle size={16} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
                {commentCount}
              </span>
            </div>
          )}
        </div>
      )}
    </article>
  );
}