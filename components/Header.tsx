import { User } from '../types';
import { LogOut } from 'lucide-react';

export function Header({ 
  user,
  currentPage,
  onNavigate,
  onLogout
}: { 
  user: User | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}) {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('feed')}
          className="hover:opacity-70 transition-opacity"
        >
          <h1 style={{ fontFamily: 'Playfair Display, serif' }} className="tracking-tight">
            Blog Network
          </h1>
        </button>
        
        {user && (
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              <button 
                onClick={() => onNavigate('feed')}
                className={`transition-colors ${
                  currentPage === 'feed' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Feed
              </button>
              <button 
                onClick={() => onNavigate('myblog')}
                className={`transition-colors ${
                  currentPage === 'myblog' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                My Blog
              </button>
              <button 
                onClick={() => onNavigate('discover')}
                className={`transition-colors ${
                  currentPage === 'discover' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Discover
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`transition-colors ${
                  currentPage === 'about' 
                    ? 'text-gray-900' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                About
              </button>
            </nav>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <button
                onClick={onLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}