import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  TrendingUp,
  Plus,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share,
  Bookmark,
  Home as HomeIcon,
  Bell,
  User,
  Menu,
  Sparkles,
  Award,
  Star,
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Users,
  Clock,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePosts, useSubreddits } from "@/hooks/use-reddit-data";
import PostCard from "@/components/PostCard";

const posts = [
  {
    id: 1,
    subreddit: "r/technology",
    author: "u/techuser123",
    authorBadges: ["Expert Contributor", "Gold"],
    authorKarma: "125K",
    time: "2h ago",
    title: "New AI breakthrough shows promise for medical diagnosis",
    content:
      "AI-generated summary: Researchers have developed a new machine learning model that can diagnose rare diseases with 95% accuracy, potentially revolutionizing medical care in underserved areas.",
    aiInsights: {
      confidence: 92,
      keyTopics: ["Machine Learning", "Healthcare", "Medical Diagnosis"],
      sentiment: "positive",
      readTime: "3 min read",
    },
    upvotes: 2847,
    comments: 234,
    isPersonalized: true,
    cluster: "AI & Technology",
  },
  {
    id: 2,
    subreddit: "r/programming",
    author: "u/developer_jane",
    authorBadges: ["Senior Dev", "Platinum"],
    authorKarma: "89K",
    time: "4h ago",
    title: "Why TypeScript is becoming essential for large-scale applications",
    content:
      "AI-generated summary: This post discusses the benefits of TypeScript in enterprise environments, including better code maintainability, fewer runtime errors, and improved developer experience.",
    aiInsights: {
      confidence: 88,
      keyTopics: ["TypeScript", "Enterprise Development", "Code Quality"],
      sentiment: "informative",
      readTime: "5 min read",
    },
    upvotes: 1523,
    comments: 189,
    isPersonalized: true,
    cluster: "AI & Technology",
  },
  {
    id: 3,
    subreddit: "r/science",
    author: "u/researcher_mike",
    authorBadges: ["Verified Researcher", "Diamond"],
    authorKarma: "67K",
    time: "6h ago",
    title: "Climate change study reveals unexpected ecosystem adaptations",
    content:
      "AI-generated summary: New research shows that certain plant species are adapting to climate change faster than predicted, offering hope for ecosystem resilience.",
    aiInsights: {
      confidence: 94,
      keyTopics: ["Climate Change", "Ecology", "Environmental Science"],
      sentiment: "hopeful",
      readTime: "4 min read",
    },
    upvotes: 4521,
    comments: 567,
    isPersonalized: false,
    cluster: "Science & Research",
  },
];

const pinnedSubreddits = [
  { name: "r/technology", members: "2.1M", progress: 85, level: "Expert" },
  { name: "r/programming", members: "3.8M", progress: 60, level: "Advanced" },
  { name: "r/science", members: "28.9M", progress: 40, level: "Intermediate" },
  { name: "r/askreddit", members: "42.1M", progress: 20, level: "Beginner" },
  { name: "r/worldnews", members: "31.2M", progress: 75, level: "Expert" },
];

const trendingTopics = [
  { topic: "AI breakthrough", trend: "+245%", icon: "🤖" },
  { topic: "Climate change", trend: "+120%", icon: "🌍" },
  { topic: "Space exploration", trend: "+89%", icon: "🚀" },
  { topic: "Electric vehicles", trend: "+67%", icon: "⚡" },
  { topic: "Cryptocurrency", trend: "+34%", icon: "₿" },
];

const relatedCommunities = [
  {
    name: "r/MachineLearning",
    members: "2.1M",
    description: "Machine learning discussions and research",
    growth: "+12%",
  },
  {
    name: "r/ArtificialIntelligence",
    members: "856K",
    description: "AI news and discussions",
    growth: "+8%",
  },
  {
    name: "r/DataScience",
    members: "1.2M",
    description: "Data science community",
    growth: "+15%",
  },
];

const topicClusters = [
  {
    name: "AI & Technology",
    posts: 2,
    isCollapsed: false,
    trend: "trending",
  },
  {
    name: "Science & Research",
    posts: 1,
    isCollapsed: false,
    trend: "popular",
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [collapsedClusters, setCollapsedClusters] = useState<string[]>([]);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  // Data fetching
  const { data: posts = [], isLoading: postsLoading, error: postsError } = usePosts();
  const { data: subreddits = [], isLoading: subredditsLoading } = useSubreddits();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const toggleCluster = (clusterName: string) => {
    setCollapsedClusters((prev) =>
      prev.includes(clusterName)
        ? prev.filter((c) => c !== clusterName)
        : [...prev, clusterName],
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Gold":
        return "bg-yellow-500";
      case "Platinum":
        return "bg-gray-400";
      case "Diamond":
        return "bg-blue-500";
      default:
        return "bg-reddit-orange";
    }
  };

  const renderPosts = () => {
    if (postsLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border border-wireframe-border bg-wireframe-surface-primary p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-wireframe-surface-secondary rounded mb-2"></div>
                <div className="h-6 bg-wireframe-surface-secondary rounded mb-4"></div>
                <div className="h-20 bg-wireframe-surface-secondary rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      );
    }

    if (postsError) {
      return (
        <Card className="border border-red-200 bg-red-50 p-4">
          <div className="text-center">
            <p className="text-red-600">Failed to load posts. Please try again.</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-wireframe-border bg-wireframe-surface-primary shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                className="md:hidden p-2 hover:bg-wireframe-surface-hover rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link
                to="/"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-reddit-orange flex items-center justify-center">
                  <span className="text-white font-bold text-sm">r</span>
                </div>
                <span className="font-bold text-lg text-wireframe-text-primary hidden sm:block">
                  reddit
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-wireframe-text-muted" />
                <Input
                  placeholder="Search Reddit"
                  className="pl-10 pr-12 bg-wireframe-surface-secondary border-wireframe-border hover:border-reddit-orange focus:border-reddit-orange transition-colors"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-reddit-orange hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/search">
                    <Filter className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex hover:bg-reddit-orange hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-wireframe-surface-hover transition-colors"
                asChild
              >
                <Link to="/filters">
                  <Filter className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-wireframe-surface-hover transition-colors"
                asChild
              >
                <Link to="/favorites">
                  <Star className="w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-wireframe-surface-hover transition-colors"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-wireframe-surface-hover transition-colors"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Left Sidebar */}
        <aside
          className={`w-64 border-r border-wireframe-border bg-wireframe-surface-primary p-4 fixed left-0 top-14 h-full z-40 transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:top-0 md:transform-none md:block`}
        >
          {/* Pinned Subreddits */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-wireframe-text-secondary mb-3 uppercase tracking-wide">
              Pinned Communities
            </h3>
            <div className="space-y-2">
              {pinnedSubreddits.map((subreddit) => (
                <div
                  key={subreddit.name}
                  className="p-2 rounded-md hover:bg-wireframe-surface-hover transition-colors"
                >
                  <Link
                    to={`/r/${subreddit.name.slice(2)}`}
                    className="flex items-center justify-between text-wireframe-text-primary mb-2"
                  >
                    <span className="text-sm font-medium">
                      {subreddit.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {subreddit.level}
                    </Badge>
                  </Link>
                  <div className="flex items-center justify-between text-xs text-wireframe-text-muted mb-1">
                    <span>{subreddit.members} members</span>
                    <span>{subreddit.progress}% progress</span>
                  </div>
                  <Progress value={subreddit.progress} className="h-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div>
            <h3 className="text-sm font-semibold text-wireframe-text-secondary mb-3 uppercase tracking-wide flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </h3>
            <div className="space-y-2">
              {trendingTopics.map((item, index) => (
                <Link
                  key={index}
                  to={`/search?q=${encodeURIComponent(item.topic)}`}
                  className="flex items-center justify-between p-2 text-sm text-wireframe-text-primary hover:bg-wireframe-surface-hover rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span>{item.topic}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs text-green-600">
                    {item.trend}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main id="main-content" className="flex-1 md:ml-0 p-4">
          <div className="max-w-2xl">
            {/* Feed Header */}
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-wireframe-text-primary mb-2 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-reddit-orange" />
                Personalized Home Feed
              </h1>
              <div className="flex space-x-2">
                <Badge className="bg-wireframe-text-primary text-white">
                  Hot
                </Badge>
                <Badge
                  variant="outline"
                  className="hover:bg-wireframe-surface-hover transition-colors cursor-pointer"
                >
                  New
                </Badge>
                <Badge
                  variant="outline"
                  className="hover:bg-wireframe-surface-hover transition-colors cursor-pointer"
                >
                  Top
                </Badge>
                <Badge
                  variant="outline"
                  className="hover:bg-wireframe-surface-hover transition-colors cursor-pointer"
                >
                  Rising
                </Badge>
              </div>
            </div>

            {/* Feature Showcase */}
            <Card className="mb-6 p-4 border border-wireframe-border bg-gradient-to-r from-wireframe-surface-primary to-wireframe-surface-secondary">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-reddit-orange" />
                <h3 className="font-semibold text-wireframe-text-primary">
                  New Reddit Features
                </h3>
                <Badge
                  variant="secondary"
                  className="text-xs bg-reddit-orange text-white"
                >
                  Enhanced
                </Badge>
              </div>
              <p className="text-sm text-wireframe-text-secondary mb-4">
                Experience the latest Reddit enhancements with improved
                interactions, better filtering, and personalized features.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-reddit-orange text-reddit-orange hover:bg-reddit-orange hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/post/1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Enhanced Comments
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/filters">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-colors"
                  asChild
                >
                  <Link to="/favorites">
                    <Star className="w-4 h-4 mr-2" />
                    Favorites Hub
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Posts Feed */}
            {renderPosts()}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 p-4 hidden xl:block">
          {/* You Might Also Like Carousel */}
          <Card className="border border-wireframe-border bg-wireframe-surface-primary p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-wireframe-text-primary flex items-center">
                <Star className="w-4 h-4 mr-2 text-reddit-orange" />
                You might also like
              </h3>
              <div className="flex space-x-1">
                <button
                  onClick={() =>
                    setCurrentCarouselIndex(
                      Math.max(0, currentCarouselIndex - 1),
                    )
                  }
                  className="p-1 hover:bg-wireframe-surface-hover rounded transition-colors"
                  disabled={currentCarouselIndex === 0}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setCurrentCarouselIndex(
                      Math.min(
                        relatedCommunities.length - 1,
                        currentCarouselIndex + 1,
                      ),
                    )
                  }
                  className="p-1 hover:bg-wireframe-surface-hover rounded transition-colors"
                  disabled={
                    currentCarouselIndex >= relatedCommunities.length - 1
                  }
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {relatedCommunities
                .slice(currentCarouselIndex, currentCarouselIndex + 2)
                .map((community) => (
                  <div
                    key={community.name}
                    className="flex items-start justify-between hover:bg-wireframe-surface-hover p-2 rounded-lg transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Link
                          to={`/r/${community.name.slice(2)}`}
                          className="font-medium text-wireframe-text-primary hover:underline"
                        >
                          {community.name}
                        </Link>
                        <Badge
                          variant="secondary"
                          className="text-xs text-green-600"
                        >
                          {community.growth}
                        </Badge>
                      </div>
                      <p className="text-xs text-wireframe-text-muted mb-1">
                        {community.description}
                      </p>
                      <div className="flex items-center text-xs text-wireframe-text-muted">
                        <Users className="w-3 h-3 mr-1" />
                        {community.members} members
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="ml-2 hover:bg-reddit-orange hover:text-white transition-colors"
                    >
                      Join
                    </Button>
                  </div>
                ))}
            </div>
          </Card>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-wireframe-surface-primary border-t border-wireframe-border shadow-lg">
        <div className="flex items-center justify-around h-16">
          <Link
            to="/home"
            className="flex flex-col items-center p-2 text-reddit-orange"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/search"
            className="flex flex-col items-center p-2 text-wireframe-text-muted hover:text-reddit-orange transition-colors"
          >
            <Search className="w-5 h-5" />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link
            to="/favorites"
            className="flex flex-col items-center p-2 text-wireframe-text-muted hover:text-reddit-orange transition-colors"
          >
            <Star className="w-5 h-5" />
            <span className="text-xs mt-1">Favorites</span>
          </Link>
          <Link
            to="/notifications"
            className="flex flex-col items-center p-2 text-wireframe-text-muted hover:text-reddit-orange transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs mt-1">Notifications</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center p-2 text-wireframe-text-muted hover:text-reddit-orange transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
