import { useState, useEffect } from "react";
import { User, Post } from "./types";
import { storage } from "./utils/storage";
import { initializeMockData } from "./utils/mockData";
import { Header } from "./components/Header";
import { LoginPage } from "./components/LoginPage";
import { FeedPage } from "./components/FeedPage";
import { MyBlogPage } from "./components/MyBlogPage";
import { UserProfilePage } from "./components/UserProfilePage";
import { DiscoverPage } from "./components/DiscoverPage";
import { PostPage } from "./components/PostPage";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { Toaster } from "./components/ui/sonner";

type PageType =
  | "feed"
  | "myblog"
  | "discover"
  | "about"
  | "contact"
  | "post"
  | "userprofile";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(
    null,
  );
  const [currentPage, setCurrentPage] =
    useState<PageType>("feed");
  const [selectedPost, setSelectedPost] = useState<Post | null>(
    null,
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(
    null,
  );

  useEffect(() => {
    initializeMockData();
    const user = storage.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (user: User) => {
    storage.setCurrentUser(user.id);
    setCurrentUser(user);
    setCurrentPage("feed");
  };

  const handleLogout = () => {
    storage.logout();
    setCurrentUser(null);
    setCurrentPage("feed");
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    setSelectedPost(null);
    setSelectedUser(null);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setCurrentPage("post");
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setCurrentPage("userprofile");
  };

  const handleBackFromPost = () => {
    setSelectedPost(null);
    setCurrentPage("feed");
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={currentUser}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {currentPage === "feed" && (
        <FeedPage
          userId={currentUser.id}
          onPostClick={handlePostClick}
          onDiscoverClick={() => setCurrentPage("discover")}
        />
      )}

      {currentPage === "myblog" && (
        <MyBlogPage
          user={currentUser}
          onPostClick={handlePostClick}
        />
      )}

      {currentPage === "discover" && (
        <DiscoverPage
          currentUserId={currentUser.id}
          onUserClick={handleUserClick}
        />
      )}

      {currentPage === "userprofile" && selectedUser && (
        <UserProfilePage
          targetUser={selectedUser}
          currentUserId={currentUser.id}
          onPostClick={handlePostClick}
        />
      )}

      {currentPage === "post" && selectedPost && (
        <PostPage
          post={selectedPost}
          onBack={handleBackFromPost}
        />
      )}

      {currentPage === "about" && <AboutPage />}

      {currentPage === "contact" && <ContactPage />}

      {/* Footer */}
      {currentPage !== "post" && (
        <footer className="border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-600">
            <p style={{ fontFamily: "Inter, sans-serif" }}>
              © 2025 Blog Network. A platform for writers and
              readers.
            </p>
          </div>
        </footer>
      )}

      <Toaster />
    </div>
  );
}