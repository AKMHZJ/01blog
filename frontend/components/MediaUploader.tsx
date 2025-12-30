import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react';

interface MediaUploaderProps {
  mediaUrls: string[];
  setMediaUrls: (urls: string[]) => void;
}

export function MediaUploader({ mediaUrls, setMediaUrls }: MediaUploaderProps) {
  const [inputUrl, setInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = () => {
    if (inputUrl.trim()) {
      setMediaUrls([...mediaUrls, inputUrl.trim()]);
      setInputUrl('');
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload to a server and get back URLs
      // For demo purposes, we'll create object URLs
      const newUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setMediaUrls([...mediaUrls, ...newUrls]);
    }
  };

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.includes('video');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
            placeholder="Paste image or video URL"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Add URL
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
            or
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <Upload size={20} />
          Upload from device (Demo - creates temporary URLs)
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {mediaUrls.length > 0 && (
        <div className="space-y-3">
          <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
            Media files ({mediaUrls.length})
          </p>
          <div className="grid grid-cols-2 gap-3">
            {mediaUrls.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {isVideo(url) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Video className="text-gray-400" size={32} />
                    </div>
                  ) : (
                    <img 
                      src={url} 
                      alt={`Media ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-200"><svg class="text-gray-400" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></div>`;
                        }
                      }}
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(index)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}