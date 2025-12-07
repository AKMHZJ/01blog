import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <div className="border-t border-gray-200 pt-12 mt-16">
      <div className="max-w-xl mx-auto text-center">
        <h3 
          style={{ fontFamily: 'Playfair Display, serif' }}
          className="mb-3 tracking-tight"
        >
          Subscribe to our newsletter
        </h3>
        <p 
          className="text-gray-600 mb-6"
          style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
        >
          Get the latest articles and insights delivered directly to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              focusRingColor: 'var(--accent-blog)'
            }}
          />
          <button
            type="submit"
            className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ 
              backgroundColor: 'var(--accent-blog)',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
