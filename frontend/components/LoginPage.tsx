import { useState } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [users] = useState<User[]>(storage.getUsers());

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 
            style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: '3rem',
              lineHeight: '1.2'
            }}
            className="mb-4 tracking-tight"
          >
            Welcome to Blog Network
          </h1>
          <p 
            className="text-gray-600"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              lineHeight: '1.8'
            }}
          >
            Select a user to continue
          </p>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => onLogin(user)}
              className="w-full border border-gray-200 rounded-lg p-6 hover:border-gray-400 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    className="tracking-tight mb-1"
                  >
                    {user.name}
                  </h3>
                  <p 
                    className="text-gray-600"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem'
                    }}
                  >
                    @{user.username}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p 
          className="text-center text-gray-500 mt-8"
          style={{ 
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem'
          }}
        >
          This is a demo. In production, you'd have real authentication.
        </p>
      </div>
    </div>
  );
}
