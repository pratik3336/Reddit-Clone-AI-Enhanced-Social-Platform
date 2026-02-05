import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  Star,
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share,
  Bookmark,
  Calendar,
  TrendingUp,
  Users,
  Filter,
  StarOff,
  Heart,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedCard, TooltipHover } from "@/components/Microinteractions";

interface FavoritePost {
  id: string;
  subreddit: string;
  author: string;
  authorBadges: string[];
  timeAgo: string;
  savedAt: string;
  title: string;
  content: string;
  upvotes: number;
  comments: number;
  category: "saved" | "upvoted" | "commented";
  isStarred: boolean;
}

interface FavoriteSubreddit {
  name: string;
  members: string;
  description: string;
  savedPosts: number;
  lastActivity: string;
  category: string;
}

const favoritePosts: FavoritePost[] = [
  {
    id: "1",
    subreddit: "r/technology",
    author: "u/techuser123",
    authorBadges: ["Expert Contributor"],
    timeAgo: "2h ago",
    savedAt: "Today",
    title: "New AI breakthrough shows promise for medical diagnosis",
    content:
      "Researchers have developed a machine learning model with 95% accuracy for diagnosing rare diseases...",
    upvotes: 2847,
    comments: 234,
    category: "saved",
    isStarred: true,
  },
  {
    id: "2",
    subreddit: "r/programming",
    author: "u/developer_jane",
    authorBadges: ["Senior Dev"],
    timeAgo: "4h ago",
    savedAt: "Yesterday",
    title: "Why TypeScript is becoming essential for large-scale applications",
    content:
      "A comprehensive analysis of TypeScript's benefits in enterprise development...",
    upvotes: 1523,
    comments: 189,
    category: "upvoted",
    isStarred: false,
  },
  {
    id: "3",
    subreddit: "r/science",
    author: "u/researcher_mike",
    authorBadges: ["Verified Researcher"],
    timeAgo: "1d ago",
    savedAt: "3 days ago",
    title: "Climate change study reveals unexpected ecosystem adaptations",
    content:
      "New research shows plant species adapting faster than predicted...",
    upvotes: 4521,
    comments: 567,
    category: "commented",
    isStarred: true,
  },
];

const favoriteSubreddits: FavoriteSubreddit[] = [
  {
    name: "r/technology",
    members: "2.1M",
    description: "Technology news and discussions",
    savedPosts: 15,
    lastActivity: "2h ago",
    category: "Tech",
  },
  {
    name: "r/programming",
    members: "3.8M",
    description: "Programming discussions and tutorials",
    savedPosts: 8,
    lastActivity: "1d ago",
    category: "Tech",
  },
  {
    name: "r/science",
    members: "28.9M",
    description: "Science news and research",
    savedPosts: 12,
    lastActivity: "3h ago",
    category: "Science",
  },
];

export default function Favorites() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "oldest">(
    "recent",
  );

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Expert Contributor":
        return "bg-reddit-orange";
      case "Senior Dev":
        return "bg-blue-500";
      case "Verified Researcher":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "saved":
        return "text-yellow-600 bg-yellow-100";
      case "upvoted":
        return "text-green-600 bg-green-100";
      case "commented":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "saved":
        return <Bookmark className="w-3 h-3" />;
      case "upvoted":
        return <ArrowUp className="w-3 h-3" />;
      case "commented":
        return <MessageCircle className="w-3 h-3" />;
      default:
        return <Star className="w-3 h-3" />;
    }
  };

  const filteredPosts = favoritePosts.filter(
    (post) => selectedCategory === "all" || post.category === selectedCategory,
  );

  const toggleStar = (postId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggling star for post ${postId}`);
  };

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-wireframe-border bg-wireframe-surface-primary shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-4">
              <Link
                to="/home"
                className="p-2 hover:bg-wireframe-surface-hover rounded-md transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-wireframe-text-secondary" />
              </Link>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-medium text-wireframe-text-primary">
                  Favorites
                </span>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-700"
                >
                  {filteredPosts.length} items
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipHover content="Filter favorites">
                <Button variant="ghost" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </TooltipHover>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="posts">Saved Posts</TabsTrigger>
            <TabsTrigger value="subreddits">Favorite Subreddits</TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            {/* Filter Controls */}
            <Card className="p-4 border border-wireframe-border bg-wireframe-surface-primary">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-wireframe-text-secondary">
                    Category:
                  </span>
                  <div className="flex space-x-1">
                    {["all", "saved", "upvoted", "commented"].map(
                      (category) => (
                        <Button
                          key={category}
                          variant={
                            selectedCategory === category
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={`h-8 px-3 ${
                            selectedCategory === category
                              ? "bg-reddit-orange text-white"
                              : "hover:bg-wireframe-surface-hover"
                          }`}
                        >
                          {category === "all" ? (
                            "All"
                          ) : (
                            <div className="flex items-center space-x-1">
                              {getCategoryIcon(category)}
                              <span className="capitalize">{category}</span>
                            </div>
                          )}
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-wireframe-text-secondary">
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border border-wireframe-border rounded px-2 py-1 bg-wireframe-surface-secondary"
                  >
                    <option value="recent">Recently Saved</option>
                    <option value="popular">Most Popular</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <AnimatedCard
                  key={post.id}
                  variant="hover-lift"
                  className="border border-wireframe-border bg-wireframe-surface-primary"
                >
                  <div className="p-4">
                    {/* Post Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-sm text-wireframe-text-muted">
                        <Link
                          to={`/r/${post.subreddit.slice(2)}`}
                          className="font-medium hover:underline hover:text-reddit-orange transition-colors"
                        >
                          {post.subreddit}
                        </Link>
                        <span className="mx-1">•</span>
                        <span>by</span>
                        <Link
                          to={`/u/${post.author.slice(2)}`}
                          className="ml-1 hover:underline flex items-center space-x-1"
                        >
                          <span>{post.author}</span>
                          {post.authorBadges.map((badge, idx) => (
                            <div
                              key={idx}
                              className={`w-3 h-3 rounded-full ${getBadgeColor(badge)}`}
                              title={badge}
                            />
                          ))}
                        </Link>
                        <span className="mx-1">•</span>
                        <span>{post.timeAgo}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`text-xs ${getCategoryColor(post.category)}`}
                        >
                          {getCategoryIcon(post.category)}
                          <span className="ml-1 capitalize">
                            {post.category}
                          </span>
                        </Badge>
                        <TooltipHover
                          content={
                            post.isStarred
                              ? "Remove from starred"
                              : "Add to starred"
                          }
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStar(post.id)}
                            className="h-7 w-7 p-0"
                          >
                            {post.isStarred ? (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            ) : (
                              <StarOff className="w-4 h-4 text-wireframe-text-muted" />
                            )}
                          </Button>
                        </TooltipHover>
                      </div>
                    </div>

                    {/* Post Title */}
                    <Link to={`/post/${post.id}`}>
                      <h3 className="text-lg font-medium text-wireframe-text-primary mb-2 leading-tight hover:text-reddit-orange transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Post Content */}
                    <p className="text-wireframe-text-secondary text-sm mb-4 leading-relaxed">
                      {post.content}
                    </p>

                    {/* Post Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-wireframe-text-muted text-sm">
                        <div className="flex items-center space-x-1">
                          <ArrowUp className="w-4 h-4" />
                          <span>{formatNumber(post.upvotes)}</span>
                        </div>
                        <Link
                          to={`/post/${post.id}`}
                          className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{formatNumber(post.comments)}</span>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          <Share className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-wireframe-text-muted">
                        <Calendar className="w-3 h-3" />
                        <span>Saved {post.savedAt}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <Card className="p-8 text-center border border-wireframe-border bg-wireframe-surface-primary">
                <Star className="w-12 h-12 text-wireframe-text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium text-wireframe-text-primary mb-2">
                  No favorites yet
                </h3>
                <p className="text-wireframe-text-muted mb-4">
                  Start saving posts you want to read later by clicking the
                  bookmark icon
                </p>
                <Button
                  asChild
                  className="bg-reddit-orange hover:bg-red-600 text-white"
                >
                  <Link to="/home">Browse Posts</Link>
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Subreddits Tab */}
          <TabsContent value="subreddits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteSubreddits.map((subreddit) => (
                <AnimatedCard
                  key={subreddit.name}
                  variant="hover-lift"
                  className="border border-wireframe-border bg-wireframe-surface-primary"
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-reddit-orange text-white font-bold">
                          {subreddit.name.slice(2, 4).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <Link
                            to={`/r/${subreddit.name.slice(2)}`}
                            className="font-semibold text-wireframe-text-primary hover:text-reddit-orange transition-colors"
                          >
                            {subreddit.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                          >
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          </Button>
                        </div>

                        <p className="text-sm text-wireframe-text-secondary mb-3 leading-relaxed">
                          {subreddit.description}
                        </p>

                        <div className="flex items-center justify-between text-xs text-wireframe-text-muted">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{subreddit.members}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Bookmark className="w-3 h-3" />
                              <span>{subreddit.savedPosts} saved</span>
                            </div>
                          </div>
                          <span>Active {subreddit.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
