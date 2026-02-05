import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search as SearchIcon,
  Filter,
  ChevronLeft,
  ArrowUp,
  MessageCircle,
  Users,
  User,
  Calendar,
  TrendingUp,
  X,
  Lightbulb,
  Sparkles,
  AlertCircle,
  Clock,
  Hash,
  Award,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const searchSuggestions = [
  "AI breakthrough in medicine",
  "machine learning tutorials",
  "climate change solutions",
  "cryptocurrency news",
  "space exploration updates",
  "programming best practices",
  "fitness motivation",
  "cooking recipes",
];

const typoCorrections = {
  "artifical intelligence": "artificial intelligence",
  "machien learning": "machine learning",
  programing: "programming",
  envorinment: "environment",
  techonology: "technology",
};

const searchResults = {
  posts: [
    {
      id: 1,
      subreddit: "r/technology",
      author: "u/techuser123",
      authorBadges: ["Expert Contributor"],
      time: "2h ago",
      title: "AI breakthrough in medical diagnosis shows 95% accuracy",
      snippet:
        "Researchers have developed a new machine learning model that can diagnose rare diseases with unprecedented accuracy. The system uses deep learning to analyze medical images and patient data...",
      upvotes: 2847,
      comments: 234,
      relevanceScore: 95,
      semanticMatch: ["AI", "medical", "diagnosis", "machine learning"],
    },
    {
      id: 2,
      subreddit: "r/science",
      author: "u/researcher_mike",
      authorBadges: ["Verified Researcher"],
      time: "5h ago",
      title:
        "New AI algorithm predicts protein structures with remarkable precision",
      snippet:
        "Scientists at DeepMind have created an AI system that can predict how proteins fold, solving a 50-year-old problem in biology and opening new avenues for drug discovery...",
      upvotes: 4521,
      comments: 567,
      relevanceScore: 92,
      semanticMatch: ["AI", "algorithm", "protein", "prediction"],
    },
    {
      id: 3,
      subreddit: "r/MachineLearning",
      author: "u/ml_enthusiast",
      authorBadges: ["ML Expert"],
      time: "1d ago",
      title: "GPT-4 vs Claude: A comprehensive comparison of AI capabilities",
      snippet:
        "This detailed analysis compares the latest language models across various benchmarks and real-world applications, examining their strengths and limitations...",
      upvotes: 1892,
      comments: 156,
      relevanceScore: 88,
      semanticMatch: ["AI", "GPT-4", "language models", "comparison"],
    },
  ],
  subreddits: [
    {
      name: "r/ArtificialIntelligence",
      members: "856K",
      description:
        "A subreddit dedicated to discussing artificial intelligence, machine learning, and related technologies.",
      joined: false,
      growth: "+12%",
      relevanceScore: 98,
    },
    {
      name: "r/MachineLearning",
      members: "2.1M",
      description:
        "Machine learning research papers, implementations, and discussions.",
      joined: true,
      growth: "+8%",
      relevanceScore: 95,
    },
    {
      name: "r/deeplearning",
      members: "425K",
      description:
        "Deep learning news, papers, and tutorials for researchers and practitioners.",
      joined: false,
      growth: "+15%",
      relevanceScore: 90,
    },
  ],
  users: [
    {
      username: "u/ai_researcher",
      karma: "125K",
      description: "PhD in AI, working on computer vision and NLP",
      badges: ["Expert", "Verified"],
      avatar: null,
      relevanceScore: 94,
    },
    {
      username: "u/ml_expert",
      karma: "89K",
      description: "Machine learning engineer at tech company",
      badges: ["Expert"],
      avatar: null,
      relevanceScore: 87,
    },
    {
      username: "u/data_scientist",
      karma: "67K",
      description: "Data scientist passionate about AI ethics",
      badges: ["Contributor"],
      avatar: null,
      relevanceScore: 82,
    },
  ],
};

const relatedQueries = [
  "machine learning applications",
  "deep learning tutorials",
  "neural networks explained",
  "AI in healthcare",
  "artificial intelligence jobs",
  "computer vision projects",
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [originalQuery, setOriginalQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    time: "all",
    type: "all",
    engagement: "all",
    sort: "relevance",
  });
  const [activeTab, setActiveTab] = useState("posts");
  const [hasTypoCorrection, setHasTypoCorrection] = useState(false);
  const [correctedQuery, setCorrectedQuery] = useState("");

  useEffect(() => {
    // Check for typo corrections
    const correction = typoCorrections[query.toLowerCase()];
    if (correction && query.toLowerCase() !== correction) {
      setHasTypoCorrection(true);
      setCorrectedQuery(correction);
    } else {
      setHasTypoCorrection(false);
      setCorrectedQuery("");
    }
  }, [query]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const removeFilter = (filterType: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: filterType === "sort" ? "relevance" : "all",
    }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setOriginalQuery(suggestion);
    setShowSuggestions(false);
    const params = new URLSearchParams();
    params.set("q", suggestion);
    setSearchParams(params);
  };

  const acceptTypoCorrection = () => {
    setQuery(correctedQuery);
    setOriginalQuery(correctedQuery);
    setHasTypoCorrection(false);
    const params = new URLSearchParams();
    params.set("q", correctedQuery);
    setSearchParams(params);
  };

  const getActiveFilterChips = () => {
    const chips = [];
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (
        (key === "sort" && value !== "relevance") ||
        (key !== "sort" && value !== "all")
      ) {
        chips.push({ type: key, value, label: getFilterLabel(key, value) });
      }
    });
    return chips;
  };

  const getFilterLabel = (type: string, value: string) => {
    const labels = {
      time: {
        day: "Past 24 hours",
        week: "Past week",
        month: "Past month",
        year: "Past year",
      },
      type: {
        text: "Text posts",
        link: "Link posts",
        image: "Image posts",
        video: "Video posts",
      },
      engagement: {
        high: "High engagement",
        medium: "Medium engagement",
        low: "Low engagement",
      },
      sort: {
        top: "Top rated",
        new: "Newest first",
        comments: "Most comments",
      },
    };
    return labels[type as keyof typeof labels]?.[value as keyof any] || value;
  };

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-wireframe-border bg-wireframe-surface-primary shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-4 h-14">
            <Link
              to="/home"
              className="p-2 hover:bg-wireframe-surface-hover rounded-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-wireframe-text-secondary" />
            </Link>

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-2xl relative">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-wireframe-text-muted" />
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowSuggestions(query.length > 0)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  placeholder="Search Reddit with AI-powered semantic search"
                  className="pl-10 bg-wireframe-surface-secondary border-wireframe-border hover:border-reddit-orange focus:border-reddit-orange transition-colors"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery("");
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-wireframe-surface-hover rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-wireframe-text-muted" />
                  </button>
                )}
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <Card className="absolute top-full left-0 right-0 mt-1 p-2 border border-wireframe-border bg-wireframe-surface-primary shadow-lg z-50">
                  <div className="space-y-1">
                    {searchSuggestions
                      .filter(
                        (suggestion) =>
                          suggestion
                            .toLowerCase()
                            .includes(query.toLowerCase()) &&
                          suggestion.toLowerCase() !== query.toLowerCase(),
                      )
                      .slice(0, 5)
                      .map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left p-2 hover:bg-wireframe-surface-hover rounded text-sm transition-colors flex items-center space-x-2"
                        >
                          <SearchIcon className="w-4 h-4 text-wireframe-text-muted" />
                          <span className="text-wireframe-text-primary">
                            {suggestion}
                          </span>
                        </button>
                      ))}
                    <div className="border-t border-wireframe-border pt-2 mt-2">
                      <div className="flex items-center space-x-2 p-2 text-xs text-wireframe-text-muted">
                        <Sparkles className="w-3 h-3 text-reddit-orange" />
                        <span>Suggestions powered by AI semantic search</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <Button className="bg-wireframe-text-primary hover:bg-wireframe-text-secondary text-white transition-colors">
              Search
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Typo Correction */}
        {hasTypoCorrection && (
          <Card className="mb-4 p-3 border border-orange-200 bg-orange-50">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-orange-800">
                Did you mean:
                <button
                  onClick={acceptTypoCorrection}
                  className="ml-1 font-medium underline hover:no-underline"
                >
                  {correctedQuery}
                </button>
                ?
              </span>
            </div>
          </Card>
        )}

        {/* Search Results Info */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-wireframe-text-primary mb-2 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-reddit-orange" />
            Search results for "{query || originalQuery || "AI"}"
          </h1>
          <div className="flex items-center space-x-4 text-sm text-wireframe-text-muted">
            <span>
              Found{" "}
              {searchResults.posts.length +
                searchResults.subreddits.length +
                searchResults.users.length}{" "}
              results
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Search completed in 0.12s</span>
            </span>
            <Badge
              variant="secondary"
              className="text-xs bg-purple-100 text-purple-700"
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Semantic AI Search
            </Badge>
          </div>
        </div>

        {/* Enhanced Filters with Active Filter Chips */}
        <Card className="mb-6 p-4 border border-wireframe-border bg-wireframe-surface-primary">
          <div className="space-y-4">
            {/* Filter Controls */}
            <div className="flex items-center space-x-4 text-sm flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-wireframe-text-muted" />
                <span className="text-wireframe-text-secondary font-medium">
                  Filters:
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-wireframe-text-muted" />
                <Select
                  value={activeFilters.time}
                  onValueChange={(value) => handleFilterChange("time", value)}
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="day">Past 24 hours</SelectItem>
                    <SelectItem value="week">Past week</SelectItem>
                    <SelectItem value="month">Past month</SelectItem>
                    <SelectItem value="year">Past year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-wireframe-text-muted" />
                <Select
                  value={activeFilters.type}
                  onValueChange={(value) => handleFilterChange("type", value)}
                >
                  <SelectTrigger className="w-24 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-wireframe-text-muted" />
                <Select
                  value={activeFilters.engagement}
                  onValueChange={(value) =>
                    handleFilterChange("engagement", value)
                  }
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All posts</SelectItem>
                    <SelectItem value="high">High engagement</SelectItem>
                    <SelectItem value="medium">Medium engagement</SelectItem>
                    <SelectItem value="low">Low engagement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-wireframe-text-muted">Sort by:</span>
                <Select
                  value={activeFilters.sort}
                  onValueChange={(value) => handleFilterChange("sort", value)}
                >
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="top">Top rated</SelectItem>
                    <SelectItem value="new">Newest</SelectItem>
                    <SelectItem value="comments">Most comments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {getActiveFilterChips().length > 0 && (
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-sm text-wireframe-text-secondary">
                  Active filters:
                </span>
                {getActiveFilterChips().map((chip, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center space-x-1 bg-reddit-orange text-white hover:bg-red-600 cursor-pointer transition-colors"
                    onClick={() => removeFilter(chip.type)}
                  >
                    <span className="text-xs">{chip.label}</span>
                    <X className="w-3 h-3" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Related Queries */}
        <Card className="mb-6 p-4 border border-wireframe-border bg-wireframe-surface-primary">
          <h3 className="text-sm font-semibold text-wireframe-text-secondary mb-3 flex items-center">
            <Lightbulb className="w-4 h-4 mr-2 text-reddit-orange" />
            Related searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedQueries.map((relatedQuery, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(relatedQuery)}
                className="px-3 py-1 text-sm border border-wireframe-border rounded-full hover:border-reddit-orange hover:bg-wireframe-surface-hover transition-colors"
              >
                {relatedQuery}
              </button>
            ))}
          </div>
        </Card>

        {/* Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-wireframe-surface-secondary">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-wireframe-surface-primary"
            >
              Posts ({searchResults.posts.length})
            </TabsTrigger>
            <TabsTrigger
              value="subreddits"
              className="data-[state=active]:bg-wireframe-surface-primary"
            >
              Subreddits ({searchResults.subreddits.length})
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-wireframe-surface-primary"
            >
              Users ({searchResults.users.length})
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-4">
            {searchResults.posts.map((post) => (
              <Card
                key={post.id}
                className="border border-wireframe-border bg-wireframe-surface-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="flex">
                  {/* Vote Section */}
                  <div className="flex flex-col items-center p-3 bg-wireframe-surface-secondary">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mb-1 hover:bg-green-100 hover:text-green-600 transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <span className="text-sm font-medium text-wireframe-text-primary">
                      {formatNumber(post.upvotes)}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="flex-1 p-4">
                    {/* Relevance Score & Semantic Matches */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {post.relevanceScore}% match
                        </Badge>
                        <div className="flex items-center space-x-1">
                          {post.semanticMatch.slice(0, 3).map((match, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {match}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Post Header */}
                    <div className="flex items-center text-sm text-wireframe-text-muted mb-2">
                      <Link
                        to={`/r/${post.subreddit.slice(2)}`}
                        className="font-medium hover:underline hover:text-reddit-orange transition-colors"
                      >
                        {post.subreddit}
                      </Link>
                      <span className="mx-1">•</span>
                      <span>Posted by</span>
                      <Link
                        to={`/u/${post.author.slice(2)}`}
                        className="ml-1 hover:underline flex items-center space-x-1"
                      >
                        <span>{post.author}</span>
                        {post.authorBadges.map((badge, idx) => (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full bg-reddit-orange flex items-center justify-center"
                            title={badge}
                          >
                            <Award className="w-2 h-2 text-white" />
                          </div>
                        ))}
                      </Link>
                      <span className="mx-1">•</span>
                      <span>{post.time}</span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-lg font-medium text-wireframe-text-primary mb-2 leading-tight hover:text-reddit-orange transition-colors cursor-pointer">
                      {post.title}
                    </h3>

                    {/* Post Snippet */}
                    <p className="text-wireframe-text-secondary text-sm mb-3 leading-relaxed">
                      {post.snippet}
                    </p>

                    {/* Post Actions */}
                    <div className="flex items-center space-x-4 text-wireframe-text-muted text-sm">
                      <span className="flex items-center hover:text-blue-600 transition-colors cursor-pointer">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {formatNumber(post.comments)} comments
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Subreddits Tab */}
          <TabsContent value="subreddits" className="space-y-4">
            {searchResults.subreddits.map((subreddit) => (
              <Card
                key={subreddit.name}
                className="border border-wireframe-border bg-wireframe-surface-primary p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-wireframe-surface-secondary flex items-center justify-center">
                        <span className="text-wireframe-text-primary font-medium">
                          {subreddit.name.slice(2, 4).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <Link
                            to={`/r/${subreddit.name.slice(2)}`}
                            className="font-semibold text-wireframe-text-primary hover:underline hover:text-reddit-orange transition-colors"
                          >
                            {subreddit.name}
                          </Link>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            {subreddit.relevanceScore}% match
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-wireframe-text-muted space-x-3">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {subreddit.members} members
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs text-green-600"
                          >
                            {subreddit.growth}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-wireframe-text-secondary leading-relaxed">
                      {subreddit.description}
                    </p>
                  </div>
                  <Button
                    variant={subreddit.joined ? "secondary" : "default"}
                    size="sm"
                    className={
                      subreddit.joined
                        ? ""
                        : "bg-wireframe-text-primary hover:bg-wireframe-text-secondary text-white"
                    }
                  >
                    {subreddit.joined ? "Joined" : "Join"}
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            {searchResults.users.map((user) => (
              <Card
                key={user.username}
                className="border border-wireframe-border bg-wireframe-surface-primary p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar || undefined} />
                      <AvatarFallback className="bg-wireframe-surface-secondary">
                        {user.username.slice(2, 4).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Link
                          to={`/u/${user.username.slice(2)}`}
                          className="font-semibold text-wireframe-text-primary hover:underline hover:text-reddit-orange transition-colors"
                        >
                          {user.username}
                        </Link>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {user.relevanceScore}% match
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-wireframe-text-muted mb-2">
                        <span>{user.karma} karma</span>
                        <div className="flex items-center space-x-1">
                          {user.badges.map((badge, idx) => (
                            <div
                              key={idx}
                              className="w-4 h-4 rounded-full bg-reddit-orange flex items-center justify-center"
                              title={badge}
                            >
                              <Award className="w-2 h-2 text-white" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-wireframe-text-secondary">
                        {user.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-reddit-orange hover:text-white transition-colors"
                  >
                    Follow
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
