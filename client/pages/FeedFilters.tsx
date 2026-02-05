import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  Filter,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  TrendingUp,
  Clock,
  MessageCircle,
  Award,
  Wifi,
  WifiOff,
  Settings,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface FilterState {
  contentType: string[];
  sortBy: string;
  timeRange: string;
  onlyTextPosts: boolean;
  hideNSFW: boolean;
  minimumScore: number;
  showSpoilers: boolean;
  lowBandwidthMode: boolean;
}

const contentTypes = [
  {
    id: "text",
    label: "Text Posts",
    icon: <FileText className="w-4 h-4" />,
    description: "Discussion posts and self-posts",
  },
  {
    id: "image",
    label: "Images",
    icon: <Image className="w-4 h-4" />,
    description: "Photos and pictures",
  },
  {
    id: "video",
    label: "Videos",
    icon: <Video className="w-4 h-4" />,
    description: "Video content and GIFs",
  },
  {
    id: "link",
    label: "Links",
    icon: <LinkIcon className="w-4 h-4" />,
    description: "External links and articles",
  },
];

const sortOptions = [
  {
    id: "hot",
    label: "Hot",
    icon: <TrendingUp className="w-4 h-4" />,
    description: "Trending and popular posts",
  },
  {
    id: "new",
    label: "New",
    icon: <Clock className="w-4 h-4" />,
    description: "Latest posts first",
  },
  {
    id: "top",
    label: "Top",
    icon: <Award className="w-4 h-4" />,
    description: "Highest scored posts",
  },
  {
    id: "rising",
    label: "Rising",
    icon: <TrendingUp className="w-4 h-4" />,
    description: "Fast-growing posts",
  },
  {
    id: "controversial",
    label: "Controversial",
    icon: <MessageCircle className="w-4 h-4" />,
    description: "Most debated posts",
  },
];

const timeRanges = [
  { id: "hour", label: "Past Hour" },
  { id: "day", label: "Past 24 Hours" },
  { id: "week", label: "Past Week" },
  { id: "month", label: "Past Month" },
  { id: "year", label: "Past Year" },
  { id: "all", label: "All Time" },
];

export default function FeedFilters() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>({
    contentType: ["text", "image", "video", "link"],
    sortBy: "hot",
    timeRange: "all",
    onlyTextPosts: false,
    hideNSFW: true,
    minimumScore: 0,
    showSpoilers: false,
    lowBandwidthMode: false,
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };

      // Auto-enable low bandwidth mode if only text posts is selected
      if (key === "onlyTextPosts" && value) {
        updated.lowBandwidthMode = true;
        updated.contentType = ["text"];
      }

      return updated;
    });
  };

  const toggleContentType = (typeId: string) => {
    setFilters((prev) => ({
      ...prev,
      contentType: prev.contentType.includes(typeId)
        ? prev.contentType.filter((id) => id !== typeId)
        : [...prev.contentType, typeId],
    }));
  };

  const resetFilters = () => {
    setFilters({
      contentType: ["text", "image", "video", "link"],
      sortBy: "hot",
      timeRange: "all",
      onlyTextPosts: false,
      hideNSFW: true,
      minimumScore: 0,
      showSpoilers: false,
      lowBandwidthMode: false,
    });
  };

  const applyFilters = () => {
    // In a real app, this would update the global filter state
    navigate("/home");
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
                <Filter className="w-5 h-5 text-wireframe-text-primary" />
                <span className="font-medium text-wireframe-text-primary">
                  Feed Filters
                </span>
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-reddit-orange text-white"
                  >
                    {activeFiltersCount} active
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={resetFilters}>
                Reset
              </Button>
              <Button
                size="sm"
                onClick={applyFilters}
                className="bg-reddit-orange hover:bg-red-600 text-white"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Low Bandwidth Notice */}
        {filters.lowBandwidthMode && (
          <Card className="mb-4 p-4 bg-blue-50 border border-blue-200">
            <div className="flex items-center space-x-3">
              <WifiOff className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">
                  Low Bandwidth Mode Active
                </p>
                <p className="text-sm text-blue-600">
                  Images and videos are disabled to save data usage
                </p>
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="content">By Content</TabsTrigger>
            <TabsTrigger value="sorting">By Sorting</TabsTrigger>
          </TabsList>

          {/* Content Filters Tab */}
          <TabsContent value="content" className="space-y-6">
            {/* Content Type Selection */}
            <Card className="p-6 border border-wireframe-border bg-wireframe-surface-primary">
              <h3 className="text-lg font-semibold text-wireframe-text-primary mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-reddit-orange" />
                Content Types
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contentTypes.map((type) => {
                  const isSelected = filters.contentType.includes(type.id);
                  const isDisabled =
                    filters.onlyTextPosts && type.id !== "text";

                  return (
                    <button
                      key={type.id}
                      onClick={() => !isDisabled && toggleContentType(type.id)}
                      disabled={isDisabled}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-300 text-left
                        ${
                          isSelected && !isDisabled
                            ? "border-reddit-orange bg-orange-50 shadow-md"
                            : "border-wireframe-border bg-wireframe-surface-secondary hover:border-wireframe-text-secondary"
                        }
                        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-sm"}
                      `}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`mt-1 ${isSelected ? "text-reddit-orange" : "text-wireframe-text-muted"}`}
                        >
                          {type.icon}
                        </div>
                        <div>
                          <h4
                            className={`font-medium ${isSelected ? "text-reddit-orange" : "text-wireframe-text-primary"}`}
                          >
                            {type.label}
                          </h4>
                          <p className="text-sm text-wireframe-text-muted mt-1 leading-relaxed">
                            {type.description}
                          </p>
                        </div>
                        {isSelected && !isDisabled && (
                          <div className="ml-auto">
                            <div className="w-5 h-5 rounded-full bg-reddit-orange flex items-center justify-center">
                              <X className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* Special Options */}
            <Card className="p-6 border border-wireframe-border bg-wireframe-surface-primary">
              <h3 className="text-lg font-semibold text-wireframe-text-primary mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-reddit-orange" />
                Special Options
              </h3>
              <div className="space-y-4">
                {/* Only Text Posts */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-wireframe-surface-secondary">
                  <div className="flex items-center space-x-3">
                    <WifiOff className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-wireframe-text-primary">
                        Only Text Posts
                      </h4>
                      <p className="text-sm text-wireframe-text-muted">
                        Perfect for low bandwidth users
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={filters.onlyTextPosts}
                    onCheckedChange={(checked) =>
                      updateFilter("onlyTextPosts", checked)
                    }
                  />
                </div>

                {/* Low Bandwidth Mode */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-wireframe-surface-secondary">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-wireframe-text-primary">
                        Low Bandwidth Mode
                      </h4>
                      <p className="text-sm text-wireframe-text-muted">
                        Reduce data usage and improve loading
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={filters.lowBandwidthMode}
                    onCheckedChange={(checked) =>
                      updateFilter("lowBandwidthMode", checked)
                    }
                  />
                </div>

                {/* Hide NSFW */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-wireframe-surface-secondary">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">18+</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-wireframe-text-primary">
                        Hide NSFW Content
                      </h4>
                      <p className="text-sm text-wireframe-text-muted">
                        Filter adult content from feed
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={filters.hideNSFW}
                    onCheckedChange={(checked) =>
                      updateFilter("hideNSFW", checked)
                    }
                  />
                </div>

                {/* Show Spoilers */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-wireframe-surface-secondary">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded bg-yellow-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-wireframe-text-primary">
                        Show Spoiler Content
                      </h4>
                      <p className="text-sm text-wireframe-text-muted">
                        Automatically reveal spoiler tags
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={filters.showSpoilers}
                    onCheckedChange={(checked) =>
                      updateFilter("showSpoilers", checked)
                    }
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Sorting Filters Tab */}
          <TabsContent value="sorting" className="space-y-6">
            {/* Sort Options */}
            <Card className="p-6 border border-wireframe-border bg-wireframe-surface-primary">
              <h3 className="text-lg font-semibold text-wireframe-text-primary mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-reddit-orange" />
                Sort Posts By
              </h3>
              <div className="space-y-3">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateFilter("sortBy", option.id)}
                    className={`
                      w-full p-4 rounded-lg border-2 transition-all duration-300 text-left
                      ${
                        filters.sortBy === option.id
                          ? "border-reddit-orange bg-orange-50 shadow-md"
                          : "border-wireframe-border bg-wireframe-surface-secondary hover:border-wireframe-text-secondary hover:shadow-sm"
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`${filters.sortBy === option.id ? "text-reddit-orange" : "text-wireframe-text-muted"}`}
                      >
                        {option.icon}
                      </div>
                      <div>
                        <h4
                          className={`font-medium ${filters.sortBy === option.id ? "text-reddit-orange" : "text-wireframe-text-primary"}`}
                        >
                          {option.label}
                        </h4>
                        <p className="text-sm text-wireframe-text-muted mt-1">
                          {option.description}
                        </p>
                      </div>
                      {filters.sortBy === option.id && (
                        <div className="ml-auto">
                          <div className="w-5 h-5 rounded-full bg-reddit-orange flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Time Range (for Top sorting) */}
            {filters.sortBy === "top" && (
              <Card className="p-6 border border-wireframe-border bg-wireframe-surface-primary">
                <h3 className="text-lg font-semibold text-wireframe-text-primary mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-reddit-orange" />
                  Time Range
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {timeRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => updateFilter("timeRange", range.id)}
                      className={`
                        p-3 rounded-lg border-2 transition-all duration-300 text-center
                        ${
                          filters.timeRange === range.id
                            ? "border-reddit-orange bg-orange-50 text-reddit-orange"
                            : "border-wireframe-border bg-wireframe-surface-secondary text-wireframe-text-primary hover:border-wireframe-text-secondary"
                        }
                      `}
                    >
                      <span className="text-sm font-medium">{range.label}</span>
                    </button>
                  ))}
                </div>
              </Card>
            )}

            {/* Minimum Score Filter */}
            <Card className="p-6 border border-wireframe-border bg-wireframe-surface-primary">
              <h3 className="text-lg font-semibold text-wireframe-text-primary mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-reddit-orange" />
                Minimum Score
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-wireframe-text-muted min-w-0">
                    Hide posts with less than:
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={filters.minimumScore}
                    onChange={(e) =>
                      updateFilter("minimumScore", parseInt(e.target.value))
                    }
                    className="flex-1 h-2 bg-wireframe-surface-secondary rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-medium text-wireframe-text-primary min-w-0 text-right">
                    {filters.minimumScore} points
                  </span>
                </div>
                <p className="text-xs text-wireframe-text-muted">
                  Higher values show only well-received content
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Apply Button (Mobile) */}
        <div className="sticky bottom-4 mt-6">
          <Button
            onClick={applyFilters}
            className="w-full h-12 bg-reddit-orange hover:bg-red-600 text-white shadow-lg"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
