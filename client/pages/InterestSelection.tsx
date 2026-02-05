import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ChevronLeft, Check, Sparkles, Users, TrendingUp } from "lucide-react";

const interests = [
  { id: "tech", label: "Tech", icon: "💻" },
  { id: "fitness", label: "Fitness", icon: "💪" },
  { id: "beauty", label: "Beauty", icon: "💄" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "ai", label: "AI", icon: "🤖" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "music", label: "Music", icon: "🎵" },
  { id: "food", label: "Food", icon: "🍕" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "art", label: "Art", icon: "🎨" },
  { id: "books", label: "Books", icon: "📚" },
  { id: "science", label: "Science", icon: "🔬" },
  { id: "politics", label: "Politics", icon: "🗳️" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "movies", label: "Movies", icon: "🎬" },
  { id: "photography", label: "Photography", icon: "📸" },
];

const personalizedRecommendations = {
  tech: [
    {
      name: "r/programming",
      members: "3.8M",
      reason: "Based on your interest in tech",
    },
    {
      name: "r/MachineLearning",
      members: "2.1M",
      reason: "Popular with tech enthusiasts",
    },
    { name: "r/webdev", members: "1.2M", reason: "Trending in tech community" },
  ],
  ai: [
    {
      name: "r/artificial",
      members: "856K",
      reason: "Perfect match for AI interest",
    },
    {
      name: "r/ChatGPT",
      members: "425K",
      reason: "Highly active AI community",
    },
    {
      name: "r/deeplearning",
      members: "312K",
      reason: "Advanced AI discussions",
    },
  ],
  gaming: [
    {
      name: "r/gaming",
      members: "34.1M",
      reason: "The largest gaming community",
    },
    { name: "r/pcmasterrace", members: "7.2M", reason: "Popular with gamers" },
    { name: "r/IndieGaming", members: "1.8M", reason: "Discover new games" },
  ],
  fitness: [
    { name: "r/fitness", members: "9.8M", reason: "Main fitness community" },
    {
      name: "r/bodyweightfitness",
      members: "2.1M",
      reason: "Home workout focused",
    },
    {
      name: "r/progresspics",
      members: "1.5M",
      reason: "Motivational transformations",
    },
  ],
  science: [
    { name: "r/science", members: "28.9M", reason: "Top science discussions" },
    { name: "r/askscience", members: "22.1M", reason: "Ask experts anything" },
    { name: "r/space", members: "19.8M", reason: "Explore the universe" },
  ],
  movies: [
    { name: "r/movies", members: "31.2M", reason: "Main movie community" },
    {
      name: "r/MovieSuggestions",
      members: "2.8M",
      reason: "Discover new films",
    },
    {
      name: "r/criterion",
      members: "456K",
      reason: "Curated film discussions",
    },
  ],
} as const;

export default function InterestSelection() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) => {
      const updated = prev.includes(interestId)
        ? prev.filter((id) => id !== interestId)
        : [...prev, interestId];

      // Generate AI recommendations based on selections
      if (updated.length >= 2) {
        generateAIRecommendations(updated);
      } else {
        setShowRecommendations(false);
      }

      return updated;
    });
  };

  const generateAIRecommendations = (interests: string[]) => {
    const recommendations: any[] = [];
    interests.forEach((interest) => {
      if (
        personalizedRecommendations[
          interest as keyof typeof personalizedRecommendations
        ]
      ) {
        recommendations.push(
          ...personalizedRecommendations[
            interest as keyof typeof personalizedRecommendations
          ],
        );
      }
    });

    // Remove duplicates and limit to top 6
    const uniqueRecommendations = recommendations
      .filter(
        (rec, index, self) =>
          index === self.findIndex((r) => r.name === rec.name),
      )
      .slice(0, 6);

    setAiRecommendations(uniqueRecommendations);
    setShowRecommendations(true);
  };

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Header */}
      <header className="border-b border-wireframe-border bg-wireframe-surface-primary">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link
            to="/"
            className="p-2 hover:bg-wireframe-surface-hover rounded-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-wireframe-text-secondary" />
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-wireframe-text-primary">
              Choose your interests
            </h1>
            <p className="text-sm text-wireframe-text-muted">
              Select at least 3 topics you're interested in
            </p>
          </div>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6 border border-wireframe-border bg-wireframe-surface-primary shadow-sm">
          {/* Interest Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`
                    relative p-4 rounded-lg border-2 transition-all duration-300 text-center hover:scale-105 hover:shadow-md
                    ${
                      isSelected
                        ? "border-wireframe-text-primary bg-wireframe-text-primary text-white shadow-lg"
                        : "border-wireframe-border bg-wireframe-surface-secondary text-wireframe-text-primary hover:bg-wireframe-surface-hover hover:border-wireframe-text-secondary"
                    }
                  `}
                >
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                      <Check className="w-3 h-3 text-wireframe-text-primary" />
                    </div>
                  )}
                  <div className="text-2xl mb-2 transition-transform duration-200">
                    {interest.icon}
                  </div>
                  <div className="text-sm font-medium">{interest.label}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Count */}
          <div className="text-center mb-6">
            <Badge
              variant={selectedInterests.length >= 3 ? "default" : "secondary"}
              className={`px-3 py-1 transition-all duration-300 ${
                selectedInterests.length >= 3 ? "bg-green-600 text-white" : ""
              }`}
            >
              {selectedInterests.length} selected{" "}
              {selectedInterests.length >= 3
                ? "✓"
                : `(${3 - selectedInterests.length} more needed)`}
            </Badge>
          </div>

          {/* AI Recommendations Section */}
          {showRecommendations && aiRecommendations.length > 0 && (
            <div className="mb-8 animate-in slide-in-from-bottom duration-500">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-reddit-orange animate-pulse" />
                <h3 className="text-lg font-semibold text-wireframe-text-primary">
                  AI-Curated Communities for You
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {aiRecommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-wireframe-border bg-wireframe-surface-secondary hover:bg-wireframe-surface-hover transition-all duration-300 group cursor-pointer hover:shadow-md hover:scale-105"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-reddit-orange text-white text-sm font-bold">
                          {rec.name.slice(2, 4).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-wireframe-text-primary group-hover:text-reddit-orange transition-colors">
                            {rec.name}
                          </h4>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs hover:bg-reddit-orange hover:text-white transition-colors"
                          >
                            Join
                          </Button>
                        </div>
                        <div className="flex items-center text-xs text-wireframe-text-muted mt-1">
                          <Users className="w-3 h-3 mr-1" />
                          {rec.members} members
                        </div>
                        <p className="text-xs text-wireframe-text-secondary mt-2 leading-relaxed">
                          {rec.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Continue Button */}
          <Button
            className={`w-full h-12 transition-all duration-300 transform hover:scale-105 ${
              selectedInterests.length >= 3
                ? "bg-wireframe-text-primary hover:bg-wireframe-text-secondary text-white shadow-lg"
                : "bg-wireframe-surface-secondary text-wireframe-text-muted cursor-not-allowed"
            }`}
            disabled={selectedInterests.length < 3}
            asChild={selectedInterests.length >= 3}
          >
            {selectedInterests.length >= 3 ? (
              <Link to="/home">Continue</Link>
            ) : (
              <span>Continue</span>
            )}
          </Button>

          {/* AI Insights */}
          {selectedInterests.length > 0 && (
            <div className="text-center mt-4 p-3 bg-wireframe-surface-secondary rounded-lg border border-wireframe-border animate-in fade-in duration-500">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-reddit-orange" />
                <span className="text-sm font-medium text-wireframe-text-primary">
                  AI Insight
                </span>
              </div>
              <p className="text-xs text-wireframe-text-secondary leading-relaxed">
                Based on your selections, you'll see{" "}
                {selectedInterests.length >= 3
                  ? "highly personalized"
                  : "tailored"}{" "}
                content and discover communities that match your interests
                perfectly.
              </p>
            </div>
          )}

          {/* Skip Link */}
          <div className="text-center mt-4">
            <Link
              to="/home"
              className="text-wireframe-text-muted hover:text-wireframe-text-secondary text-sm hover:underline transition-colors"
            >
              Skip for now
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
