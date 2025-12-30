import { useState } from 'react';
import { User } from '../types';
import { X, AlertTriangle } from 'lucide-react';

interface ReportModalProps {
  reportedUser: User;
  onSubmit: (reason: string) => void;
  onCancel: () => void;
}

export function ReportModal({ reportedUser, onSubmit, onCancel }: ReportModalProps) {
  const [reason, setReason] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const categories = [
    'Spam or misleading content',
    'Harassment or bullying',
    'Hate speech or discrimination',
    'Violence or dangerous content',
    'Impersonation',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !reason.trim()) return;
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    const fullReason = `${selectedCategory}: ${reason}`;
    onSubmit(fullReason);
  };

  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-lg max-w-md w-full p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="text-orange-600" size={32} />
            </div>
            
            <h3 
              style={{ fontFamily: 'Playfair Display, serif' }}
              className="mb-3 tracking-tight"
            >
              Confirm Report
            </h3>
            
            <p 
              className="text-gray-600 mb-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Are you sure you want to report <strong>@{reportedUser.username}</strong>? This action will be reviewed by our moderation team.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 w-full mb-6 text-left">
              <p 
                className="text-gray-700 mb-1"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
              >
                <strong>Category:</strong> {selectedCategory}
              </p>
              <p 
                className="text-gray-700"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
              >
                <strong>Reason:</strong> {reason}
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Go Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-orange-600" size={24} />
            <h2 
              style={{ fontFamily: 'Playfair Display, serif' }}
              className="tracking-tight"
            >
              Report User
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* User info */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
            <img 
              src={reportedUser.avatar} 
              alt={reportedUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p 
                className="text-gray-900"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {reportedUser.name}
              </p>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
              >
                @{reportedUser.username}
              </p>
            </div>
          </div>

          {/* Category selection */}
          <div>
            <label 
              className="block text-gray-700 mb-3"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Why are you reporting this user? *
            </label>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mr-3"
                    required
                  />
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Detailed reason */}
          <div>
            <label 
              htmlFor="reason"
              className="block text-gray-700 mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Please provide additional details *
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              rows={5}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none"
              style={{ fontFamily: 'Inter, sans-serif' }}
              placeholder="Describe the issue in detail. This helps our moderation team understand the situation better."
            />
            <p 
              className="text-gray-500 mt-2"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
            >
              {reason.length}/500 characters
            </p>
          </div>

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p 
              className="text-blue-900"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}
            >
              <strong>Note:</strong> Reports are reviewed by our moderation team. False reports may result in action against your account. The reported user will not be notified of your report.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedCategory || !reason.trim()}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Continue to Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
