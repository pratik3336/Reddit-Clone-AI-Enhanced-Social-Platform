import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowUp, 
  ArrowDown, 
  MessageCircle, 
  Share, 
  Bookmark, 
  Award,
  Sparkles,
  Target,
  Clock,
  Zap,
  MoreHorizontal,
  Flag,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Post } from '@shared/api';
import { usePostActions, useOptimisticVote, useOptimisticSave } from '@/hooks/use-reddit-data';
import { AnimatedCard } from './Microinteractions';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  showSubreddit?: boolean;
  showAuthor?: boolean;
  compact?: boolean;
  className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  showSubreddit = true,
  showAuthor = true,
  compact = false,
  className = '',
}) => {
  const { handleVote, handleSave, isVoting, isSaving } = usePostActions(post.id);
  const optimisticVote = useOptimisticVote();
  const optimisticSave = useOptimisticSave();

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Gold':
        return 'bg-yellow-500';
      case 'Platinum':
        return 'bg-gray-400';
      case 'Diamond':
        return 'bg-blue-500';
      case 'Silver':
        return 'bg-gray-300';
      default:
        return 'bg-reddit-orange';
    }
  };

  const handleVoteClick = (vote: 'up' | 'down') => {
    // Optimistic update
    optimisticVote(post.id, vote);
    // Actual API call
    handleVote(vote);
  };

  const handleSaveClick = () => {
    // Optimistic update
    optimisticSave(post.id);
    // Actual API call
    handleSave();
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'hopeful':
        return 'bg-blue-500';
      case 'informative':
        return 'bg-purple-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <AnimatedCard
      variant="hover-lift"
      className={`border border-wireframe-border bg-wireframe-surface-primary hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="flex">
        {/* Vote Section */}
        <div className="flex flex-col items-center p-3 bg-wireframe-surface-secondary">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 mb-1 transition-colors ${
              post.isUpvoted
                ? 'text-green-600 bg-green-100'
                : 'hover:bg-green-100 hover:text-green-600'
            }`}
            onClick={() => handleVoteClick('up')}
            disabled={isVoting}
          >
            <ArrowUp className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium text-wireframe-text-primary">
            {formatNumber(post.score)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 mt-1 transition-colors ${
              post.isDownvoted
                ? 'text-red-600 bg-red-100'
                : 'hover:bg-red-100 hover:text-red-600'
            }`}
            onClick={() => handleVoteClick('down')}
            disabled={isVoting}
          >
            <ArrowDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Content */}
        <div className="flex-1 p-4">
          {/* Post Header */}
          {showSubreddit && (
            <div className="flex items-center text-sm text-wireframe-text-muted mb-2">
              <Link
                to={`/r/${post.subreddit}`}
                className="font-medium hover:underline hover:text-reddit-orange transition-colors"
              >
                r/{post.subreddit}
              </Link>
              {showAuthor && (
                <>
                  <span className="mx-1">•</span>
                  <span>Posted by</span>
                  <Link
                    to={`/u/${post.author.username}`}
                    className="ml-1 hover:underline flex items-center space-x-1"
                  >
                    <span>{post.author.username}</span>
                    {/* Author Badges */}
                    <div className="flex items-center space-x-1 ml-2">
                      {post.author.badges.map((badge, idx) => (
                        <div
                          key={idx}
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${getBadgeColor(badge)}`}
                          title={badge}
                        >
                          <Award className="w-2 h-2 text-white" />
                        </div>
                      ))}
                      <span className="text-xs text-wireframe-text-muted">
                        ({formatNumber(post.author.karma)})
                      </span>
                    </div>
                  </Link>
                </>
              )}
              <span className="mx-1">•</span>
              <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              
              {/* Post tags */}
              {post.nsfw && (
                <Badge className="ml-2 bg-red-100 text-red-700 text-xs">
                  NSFW
                </Badge>
              )}
              {post.spoiler && (
                <Badge className="ml-2 bg-yellow-100 text-yellow-700 text-xs">
                  Spoiler
                </Badge>
              )}
            </div>
          )}

          {/* Post Title */}
          <Link to={`/post/${post.id}`}>
            <h2 className="text-lg font-medium text-wireframe-text-primary mb-3 leading-tight hover:text-reddit-orange transition-colors cursor-pointer">
              {post.title}
            </h2>
          </Link>

          {/* Post Content */}
          {!compact && (
            <p className="text-wireframe-text-secondary text-sm mb-4 leading-relaxed">
              {post.content}
            </p>
          )}

          {/* AI Insights */}
          {post.aiInsights && !compact && (
            <div className="bg-gradient-to-r from-wireframe-surface-secondary to-wireframe-surface-hover p-4 rounded-lg mb-4 border-l-4 border-reddit-orange">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-reddit-orange" />
                  <Badge
                    variant="secondary"
                    className="text-xs bg-reddit-orange text-white"
                  >
                    AI Summary
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-wireframe-text-muted">
                      {post.aiInsights.confidence}% confidence
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-wireframe-text-muted">
                  <Clock className="w-3 h-3" />
                  {post.aiInsights.readTime}
                </div>
              </div>

              <p className="text-sm text-wireframe-text-secondary leading-relaxed mb-3">
                {post.aiInsights.summary}
              </p>

              {/* AI Insights */}
              <div className="flex flex-wrap gap-2 mb-2">
                {post.aiInsights.keyTopics.map((topic, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="text-xs"
                  >
                    {topic}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span
                  className={`px-2 py-1 rounded text-white ${getSentimentColor(post.aiInsights.sentiment)}`}
                >
                  {post.aiInsights.sentiment}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6"
                >
                  Read Full Article
                </Button>
              </div>
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-wireframe-text-muted">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                asChild
              >
                <Link to={`/post/${post.id}`}>
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {formatNumber(post.comments)} Comments
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <Share className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 transition-colors ${
                  post.isSaved
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'hover:bg-yellow-50 hover:text-yellow-600'
                }`}
                onClick={handleSaveClick}
                disabled={isSaving}
              >
                <Bookmark className="w-4 h-4 mr-1" />
                {post.isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>

            {/* Awards */}
            {post.awards.length > 0 && (
              <div className="flex items-center space-x-1">
                {post.awards.slice(0, 3).map((award, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${getBadgeColor(award)}`}
                    title={award}
                  >
                    <Award className="w-3 h-3 text-white" />
                  </div>
                ))}
                {post.awards.length > 3 && (
                  <span className="text-xs text-wireframe-text-muted">
                    +{post.awards.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* More Options */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-wireframe-surface-hover"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default PostCard;
