import { User, Post, Subscription, Comment, Report } from '../types';

export const storage = {
  // User operations
  getUsers(): User[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  },

  getUser(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  },

  getCurrentUser(): User | null {
    const userId = localStorage.getItem('currentUserId');
    return userId ? this.getUser(userId) || null : null;
  },

  setCurrentUser(userId: string) {
    localStorage.setItem('currentUserId', userId);
  },

  logout() {
    localStorage.removeItem('currentUserId');
  },

  // Post operations
  getPosts(): Post[] {
    const posts = localStorage.getItem('posts');
    const parsedPosts = posts ? JSON.parse(posts) : [];
    const users = this.getUsers();
    
    return parsedPosts.map((post: Post) => ({
      ...post,
      likes: post.likes || [],
      comments: (post.comments || []).map(comment => ({
        ...comment,
        user: users.find(u => u.id === comment.userId)
      })),
      author: users.find(u => u.id === post.authorId)
    }));
  },

  getUserPosts(userId: string): Post[] {
    return this.getPosts().filter(p => p.authorId === userId);
  },

  getPost(id: string): Post | undefined {
    return this.getPosts().find(p => p.id === id);
  },

  createPost(post: Omit<Post, 'id' | 'date'>): Post {
    const posts = this.getPosts();
    const newPost: Post = {
      ...post,
      id: `post${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      likes: [],
      comments: []
    };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    return newPost;
  },

  updatePost(id: string, updates: Partial<Post>): Post | null {
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    posts[index] = { ...posts[index], ...updates };
    localStorage.setItem('posts', JSON.stringify(posts));
    return posts[index];
  },

  deletePost(id: string): boolean {
    const posts = this.getPosts();
    const filtered = posts.filter(p => p.id !== id);
    if (filtered.length === posts.length) return false;
    
    localStorage.setItem('posts', JSON.stringify(filtered));
    return true;
  },

  // Like operations
  toggleLike(postId: string, userId: string): Post | null {
    const posts = this.getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    const likes = post.likes || [];
    const hasLiked = likes.includes(userId);

    if (hasLiked) {
      post.likes = likes.filter(id => id !== userId);
    } else {
      post.likes = [...likes, userId];
    }

    localStorage.setItem('posts', JSON.stringify(posts));
    return this.getPost(postId) || null;
  },

  // Comment operations
  addComment(postId: string, userId: string, content: string): Comment | null {
    const posts = this.getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    const newComment: Comment = {
      id: `comment${Date.now()}`,
      postId,
      userId,
      content,
      timestamp: new Date().toISOString()
    };

    post.comments = [...(post.comments || []), newComment];
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Return comment with user info
    const user = this.getUser(userId);
    return { ...newComment, user };
  },

  deleteComment(postId: string, commentId: string): boolean {
    const posts = this.getPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return false;

    const originalLength = (post.comments || []).length;
    post.comments = (post.comments || []).filter(c => c.id !== commentId);

    if (post.comments.length === originalLength) return false;

    localStorage.setItem('posts', JSON.stringify(posts));
    return true;
  },

  // Subscription operations
  getSubscriptions(): Subscription[] {
    const subs = localStorage.getItem('subscriptions');
    return subs ? JSON.parse(subs) : [];
  },

  getUserSubscriptions(userId: string): string[] {
    return this.getSubscriptions()
      .filter(s => s.userId === userId)
      .map(s => s.subscribedToId);
  },

  isSubscribed(userId: string, targetUserId: string): boolean {
    return this.getSubscriptions().some(
      s => s.userId === userId && s.subscribedToId === targetUserId
    );
  },

  subscribe(userId: string, targetUserId: string) {
    const subscriptions = this.getSubscriptions();
    if (!this.isSubscribed(userId, targetUserId)) {
      subscriptions.push({ userId, subscribedToId: targetUserId });
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
    }
  },

  unsubscribe(userId: string, targetUserId: string) {
    const subscriptions = this.getSubscriptions().filter(
      s => !(s.userId === userId && s.subscribedToId === targetUserId)
    );
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  },

  getFeedPosts(userId: string): Post[] {
    const subscribedIds = this.getUserSubscriptions(userId);
    return this.getPosts()
      .filter(p => subscribedIds.includes(p.authorId))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  // Report operations
  getReports(): Report[] {
    const reports = localStorage.getItem('reports');
    return reports ? JSON.parse(reports) : [];
  },

  createReport(reporterId: string, reportedUserId: string, reason: string): Report {
    const reports = this.getReports();
    const newReport: Report = {
      id: `report${Date.now()}`,
      reporterId,
      reportedUserId,
      reason,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    reports.push(newReport);
    localStorage.setItem('reports', JSON.stringify(reports));
    return newReport;
  },

  getUserReports(userId: string): Report[] {
    return this.getReports().filter(r => r.reportedUserId === userId);
  },

  hasReported(reporterId: string, reportedUserId: string): boolean {
    return this.getReports().some(
      r => r.reporterId === reporterId && r.reportedUserId === reportedUserId
    );
  }
};