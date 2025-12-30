import { useState } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const users = storage.getUsers();
    const found = users.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (!found) {
      setError('Invalid username or password');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Demo: password isn't checked against stored value. In real apps, authenticate.
    onLogin(found);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.25rem',
              lineHeight: '1.2'
            }}
            className="mb-2"
          >
            Sign in to Blog Network
          </h1>
          <p
            className="text-gray-600"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem' }}
          >
            Enter your credentials to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2"
              placeholder="username"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full border border-gray-200 rounded-md px-3 py-2"
              placeholder="password"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex items-center justify-between">
            <button className="rounded-md bg-black text-white px-4 py-2">Sign In</button>
          </div>
        </form>

        <p className="text-center text-gray-500 mt-6" style={{ fontFamily: 'Inter, sans-serif' }}>
          This is a demo — use one of the demo usernames from the dataset and any password.
        </p>
      </div>
    </div>
  );
}
