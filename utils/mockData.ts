import { User, Post } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'Chen_design',
    name: 'Blacky Chen',
    bio: 'UX Designer & minimalist enthusiast. Writing about design, productivity, and intentional living.',
    avatar: 'https://i.pravatar.cc/400?img=7'
  },
  {
    id: 'user2',
    username: 'tech_mike',
    name: 'Michael Rodriguez',
    bio: 'Tech lead exploring AI, machine learning, and the future of technology.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: 'user3',
    username: 'emma_writes',
    name: 'Nigroo Thompson',
    bio: 'Writer, coffee lover, and advocate for mindful living. Sharing stories that matter.',
    avatar: 'https://i.pravatar.cc/400?img=13'
  },
  {
    id: 'user4',
    username: 'alex_arch',
    name: 'Alex Kim',
    bio: 'Architect fascinated by minimalist spaces and sustainable design.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
  }
];

export const mockPosts: Post[] = [
  {
    id: 'post1',
    authorId: 'user1',
    title: "The Future of Remote Work: Building Productive Workspaces at Home",
    date: "December 2, 2025",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0NzA5NjgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Productivity",
    excerpt: "Discover how to create an inspiring and efficient workspace that maximizes your productivity and creativity while working from home.",
    content: [
      "The shift to remote work has transformed how we approach our professional lives. Creating a dedicated workspace at home is no longer a luxury—it's a necessity for maintaining productivity and work-life balance.",
      "A well-designed home office should prioritize both functionality and aesthetics. Natural light is crucial for maintaining energy levels throughout the day.",
      "Ergonomics play a vital role in long-term comfort and health. Invest in a quality chair that supports your back, and ensure your monitor is at eye level.",
      "Organization is key to maintaining focus. Use vertical space with shelving to keep your workspace clutter-free.",
      "Finally, personalize your space with elements that inspire you. These touches can boost creativity and make your workspace enjoyable."
    ],
    likes: [],
    comments: []
  },
  {
    id: 'post2',
    authorId: 'user1',
    title: "Mastering the Art of Minimalist Design in 2025",
    date: "November 28, 2025",
    image: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ2OTg3Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Design",
    excerpt: "Learn the fundamental principles of minimalist design and how to apply them to create stunning, purposeful digital experiences.",
    content: [
      "Minimalist design isn't about using less—it's about making every element count.",
      "The foundation of minimalist design lies in understanding hierarchy. Every element should have a clear purpose.",
      "White space is your most powerful tool. It gives your content room to breathe.",
      "Typography in minimalist design does heavy lifting. Choose fonts wisely.",
      "Color should be used intentionally and sparingly for maximum impact."
    ],
    likes: [],
    comments: []
  },
  {
    id: 'post3',
    authorId: 'user2',
    title: "Innovation in Technology: What's Next for AI and Machine Learning",
    date: "November 25, 2025",
    image: "https://images.unsplash.com/photo-1609619385076-36a873425636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjQ3MDkzMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Technology",
    excerpt: "Explore the cutting-edge developments in artificial intelligence and how they're reshaping industries across the globe.",
    content: [
      "Artificial intelligence and machine learning have moved from experimental to essential business tools.",
      "Natural language processing advances are transforming customer service and content creation.",
      "Computer vision enables applications from medical diagnosis to autonomous vehicles.",
      "The democratization of AI tools is fostering creative solutions.",
      "The focus is shifting to responsible AI with emphasis on ethics and transparency."
    ],
    likes: [],
    comments: []
  },
  {
    id: 'post4',
    authorId: 'user4',
    title: "Architecture and Space: The Beauty of Minimalist Structures",
    date: "November 20, 2025",
    image: "https://images.unsplash.com/photo-1520529890308-f503006340b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NDcxODM0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Architecture",
    excerpt: "Discover how minimalist architecture creates powerful spaces through simplicity, clean lines, and thoughtful material choices.",
    content: [
      "Minimalist architecture strips away the unnecessary to reveal the essential.",
      "Each line, surface, and material is chosen with intention.",
      "Light plays a crucial role in minimalist spaces.",
      "Material selection emphasizes quality over quantity.",
      "These spaces promote mindfulness and support well-being."
    ],
    likes: [],
    comments: []
  },
  {
    id: 'post5',
    authorId: 'user3',
    title: "Finding Peace in Nature: A Guide to Mindful Outdoor Experiences",
    date: "November 15, 2025",
    image: "https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY0NzY5NDQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Lifestyle",
    excerpt: "Learn how to connect with nature in meaningful ways and cultivate mindfulness through outdoor activities.",
    content: [
      "Nature offers a vital counterbalance to our hyperconnected digital age.",
      "Mindful engagement with nature starts with presence.",
      "You don't need wilderness to connect with nature.",
      "Photography can enhance your nature experience when approached mindfully.",
      "Regular nature immersion provides documented health and wellness benefits."
    ],
    likes: [],
    comments: []
  },
  {
    id: 'post6',
    authorId: 'user3',
    title: "The Perfect Morning Ritual: Coffee, Contemplation, and Creativity",
    date: "November 10, 2025",
    image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtb3JuaW5nfGVufDF8fHx8MTc2NDc0MjM3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Lifestyle",
    excerpt: "Explore how a thoughtful morning routine can set the tone for a productive and fulfilling day.",
    content: [
      "The way you start your morning shapes your entire day.",
      "Coffee can be a meditation in itself when prepared mindfully.",
      "Many creatives dedicate morning time to contemplation.",
      "Morning is when creativity often peaks.",
      "The perfect morning ritual is deeply personal."
    ],
    likes: [],
    comments: []
  }
];

// Initialize localStorage with mock data
export function initializeMockData() {

  localStorage.removeItem('users');
  localStorage.removeItem('posts');
  localStorage.removeItem('subscriptions');

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem('posts')) {
    localStorage.setItem('posts', JSON.stringify(mockPosts));
  }
  if (!localStorage.getItem('subscriptions')) {
    localStorage.setItem('subscriptions', JSON.stringify([]));
  }
}