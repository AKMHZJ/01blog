import React from 'react';

interface LandingPageProps {
  onContinue: () => void;
}

export function LandingPage({ onContinue }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-3xl w-full text-center">
        <h1
          style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem' }}
          className="mb-6"
        >
          Welcome to Blog Network
        </h1>

        <p
          className="text-gray-700 mb-10"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.125rem' }}
        >
          Discover thoughtful writing from designers, technologists, and
          creatives. Press continue to sign in and explore posts.
        </p>

        <div className="flex justify-center">
          <button
            onClick={onContinue}
            className="rounded-md bg-black text-black px-6 py-3 hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
