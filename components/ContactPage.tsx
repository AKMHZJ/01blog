import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for your message, ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 
            style={{ 
              fontFamily: 'Playfair Display, serif',
              fontSize: '3.5rem',
              lineHeight: '1.2'
            }}
            className="mb-6 tracking-tight"
          >
            Get in Touch
          </h1>
          <p 
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.25rem',
              lineHeight: '1.8'
            }}
          >
            We'd love to hear from you. Whether you have a question, feedback, or just want to say hello.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="border border-gray-200 rounded-lg p-8">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: 'var(--accent-blog)' }}
            >
              <Mail className="text-white" size={24} />
            </div>
            <h3 
              style={{ fontFamily: 'Playfair Display, serif' }}
              className="mb-2 tracking-tight"
            >
              Email Us
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
            >
              hello@themodernblog.com
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-8">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: 'var(--accent-blog)' }}
            >
              <MessageSquare className="text-white" size={24} />
            </div>
            <h3 
              style={{ fontFamily: 'Playfair Display, serif' }}
              className="mb-2 tracking-tight"
            >
              Follow Us
            </h3>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
            >
              @themodernblog on all platforms
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border border-gray-200 rounded-lg p-8 md:p-12">
          <h2 
            style={{ fontFamily: 'Playfair Display, serif' }}
            className="mb-2 tracking-tight text-center"
          >
            Send us a message
          </h2>
          <p 
            className="text-gray-600 text-center mb-8"
            style={{ fontFamily: 'Inter, sans-serif', lineHeight: '1.8' }}
          >
            Fill out the form below and we'll get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="name"
                  className="block text-gray-700 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    focusRingColor: 'var(--accent-blog)'
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label 
                  htmlFor="email"
                  className="block text-gray-700 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ 
                    fontFamily: 'Inter, sans-serif',
                    focusRingColor: 'var(--accent-blog)'
                  }}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="subject"
                className="block text-gray-700 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  focusRingColor: 'var(--accent-blog)'
                }}
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label 
                htmlFor="message"
                className="block text-gray-700 mb-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  focusRingColor: 'var(--accent-blog)'
                }}
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: 'var(--accent-blog)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <Send size={20} />
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
