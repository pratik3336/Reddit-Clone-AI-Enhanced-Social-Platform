import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import AccessibilityToolbar from "@/components/AccessibilityToolbar";
import Onboarding from "./pages/Onboarding";
import InterestSelection from "./pages/InterestSelection";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PostDetail from "./pages/PostDetail";
import FeedFilters from "./pages/FeedFilters";
import Favorites from "./pages/Favorites";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Skip link for keyboard navigation */}
            <a href="#main-content" className="skip-link" tabIndex={1}>
              Skip to main content
            </a>
            <Routes>
              <Route path="/" element={<Onboarding />} />
              <Route path="/interests" element={<InterestSelection />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/post/:postId" element={<PostDetail />} />
              <Route path="/filters" element={<FeedFilters />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* Placeholder routes */}
              <Route
                path="/login"
                element={
                  <Placeholder
                    title="Login"
                    description="Login page will allow users to sign in to their Reddit account."
                  />
                }
              />
              <Route
                path="/terms"
                element={
                  <Placeholder
                    title="Terms of Service"
                    description="User agreement and terms of service for Reddit."
                  />
                }
              />
              <Route
                path="/privacy"
                element={
                  <Placeholder
                    title="Privacy Policy"
                    description="Privacy policy explaining how Reddit handles user data."
                  />
                }
              />
              <Route
                path="/create"
                element={
                  <Placeholder
                    title="Create Post"
                    description="Create a new post in your favorite subreddit."
                  />
                }
              />
              <Route
                path="/notifications"
                element={
                  <Placeholder
                    title="Notifications"
                    description="View your notifications, replies, and mentions."
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Placeholder
                    title="Profile"
                    description="View and edit your Reddit profile."
                  />
                }
              />

              {/* Dynamic routes */}
              <Route
                path="/r/:subreddit"
                element={
                  <Placeholder
                    title="Subreddit"
                    description="View posts and discussions in this community."
                  />
                }
              />
              <Route
                path="/u/:username"
                element={
                  <Placeholder
                    title="User Profile"
                    description="View this user's posts, comments, and profile information."
                  />
                }
              />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Accessibility Toolbar */}
            <AccessibilityToolbar />
          </BrowserRouter>
        </TooltipProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  );
}
