import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedPostProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  onClick: () => void;
}

export function FeaturedPost({ title, excerpt, date, image, category, onClick }: FeaturedPostProps) {
  return (
    <article 
      onClick={onClick}
      className="group cursor-pointer mb-20"
    >
      <div className="relative overflow-hidden aspect-[21/9] mb-8">
        <ImageWithFallback 
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <span 
            className="px-3 py-1 rounded-full text-white"
            style={{ 
              backgroundColor: 'var(--accent-blog)',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {category}
          </span>
          <time className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
            {date}
          </time>
        </div>
        <h2 
          style={{ fontFamily: 'Playfair Display, serif' }}
          className="mb-4 group-hover:text-gray-600 transition-colors tracking-tight"
        >
          {title}
        </h2>
        <p 
          className="text-gray-600 leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
        >
          {excerpt}
        </p>
      </div>
    </article>
  );
}
