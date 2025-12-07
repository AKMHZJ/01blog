export interface User {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: string;
  user?: User;
}

export interface Post {
  id: string;
  authorId: string;
  title: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
  content: string[];
  author?: User;
  likes: string[]; // Array of user IDs who liked the post
  comments: Comment[];
  mediaUrls?: string[]; // Additional media files
}

export interface Subscription {
  userId: string;
  subscribedToId: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'reviewed' | 'resolved';
}