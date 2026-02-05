import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  Share,
  Bookmark,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Award,
  Sparkles,
  Focus,
  MoreHorizontal,
  Reply,
  Flag,
  Eye,
  EyeOff,
  Minus,
  Plus,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AnimatedCard, TooltipHover } from "@/components/Microinteractions";
import AwardsModal from "@/components/AwardsModal";
import LongPressContextMenu from "@/components/LongPressContextMenu";

interface Comment {
  id: string;
  author: string;
  authorBadges: string[];
  content: string;
  upvotes: number;
  downvotes: number;
  timeAgo: string;
  replies: Comment[];
  isCollapsed: boolean;
  depth: number;
  isOp: boolean;
}

const mockPost = {
  id: "1",
  subreddit: "r/technology",
  author: "u/techuser123",
  authorBadges: ["Expert Contributor"],
  timeAgo: "3 hours ago",
  title: "New AI breakthrough shows promise for medical diagnosis",
  content:
    "Researchers at Stanford have developed a new machine learning model that can diagnose rare diseases with 95% accuracy. The system was trained on over 1 million medical cases and can identify patterns that human doctors might miss. This could revolutionize healthcare in underserved areas where specialist doctors are scarce.",
  upvotes: 2847,
  comments: 234,
  awards: ["Gold", "Silver", "Helpful"],
};

const mockComments: Comment[] = [
  {
    id: "1",
    author: "u/medical_professional",
    authorBadges: ["Verified Doctor", "Gold"],
    content:
      "This is incredibly promising! As a practicing physician, I can see immediate applications in rural healthcare. The accuracy rate of 95% is quite impressive, though I'd like to see more details about the false positive/negative rates.",
    upvotes: 156,
    downvotes: 3,
    timeAgo: "2 hours ago",
    isCollapsed: false,
    depth: 0,
    isOp: false,
    replies: [
      {
        id: "1-1",
        author: "u/ai_researcher",
        authorBadges: ["PhD", "Platinum"],
        content:
          "The paper mentions a false positive rate of 2.1% and false negative rate of 3.4%. These are actually quite good for this type of diagnostic tool.",
        upvotes: 89,
        downvotes: 1,
        timeAgo: "1 hour ago",
        isCollapsed: false,
        depth: 1,
        isOp: false,
        replies: [
          {
            id: "1-1-1",
            author: "u/techuser123",
            authorBadges: ["Expert Contributor"],
            content:
              "Thanks for the clarification! Those rates are indeed very encouraging.",
            upvotes: 23,
            downvotes: 0,
            timeAgo: "45 minutes ago",
            isCollapsed: false,
            depth: 2,
            isOp: true,
            replies: [],
          },
        ],
      },
      {
        id: "1-2",
        author: "u/rural_doctor",
        authorBadges: ["Verified Healthcare"],
        content:
          "Working in a rural area, this would be a game-changer. We often have to refer patients to specialists hours away. If this tool could help with initial diagnosis, it would save lives.",
        upvotes: 67,
        downvotes: 0,
        timeAgo: "90 minutes ago",
        isCollapsed: false,
        depth: 1,
        isOp: false,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "u/skeptical_scientist",
    authorBadges: ["PhD", "Researcher"],
    content:
      "While this sounds impressive, I'm cautious about the claims. 95% accuracy on what dataset? How diverse was the training data? We need to be careful not to create biased systems that work well for some populations but not others.",
    upvotes: 234,
    downvotes: 12,
    timeAgo: "2 hours ago",
    isCollapsed: false,
    depth: 0,
    isOp: false,
    replies: [
      {
        id: "2-1",
        author: "u/data_scientist",
        authorBadges: ["ML Expert"],
        content:
          "Great point about bias. The paper should include demographic breakdowns of the training data and performance metrics across different groups.",
        upvotes: 45,
        downvotes: 2,
        timeAgo: "1 hour ago",
        isCollapsed: false,
        depth: 1,
        isOp: false,
        replies: [
          {
            id: "2-1-1",
            author: "u/ethics_researcher",
            authorBadges: ["AI Ethics"],
            content:
              "This is exactly why we need mandatory bias audits for all medical AI systems before deployment.",
            upvotes: 12,
            downvotes: 1,
            timeAgo: "30 minutes ago",
            isCollapsed: false,
            depth: 2,
            isOp: false,
            replies: [
              {
                id: "2-1-1-1",
                author: "u/policy_maker",
                authorBadges: ["Government"],
                content:
                  "We're actually working on regulations for exactly this. Medical AI will require extensive validation.",
                upvotes: 8,
                downvotes: 0,
                timeAgo: "15 minutes ago",
                isCollapsed: true,
                depth: 3,
                isOp: false,
                replies: [
                  {
                    id: "2-1-1-1-1",
                    author: "u/concerned_citizen",
                    authorBadges: [],
                    content:
                      "How long will these regulations take to implement?",
                    upvotes: 3,
                    downvotes: 0,
                    timeAgo: "10 minutes ago",
                    isCollapsed: true,
                    depth: 4,
                    isOp: false,
                    replies: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    author: "u/patient_advocate",
    authorBadges: ["Community Helper"],
    content:
      "This could be life-changing for people with rare diseases who often go years without proper diagnosis. The current system fails too many patients.",
    upvotes: 78,
    downvotes: 4,
    timeAgo: "1 hour ago",
    isCollapsed: false,
    depth: 0,
    isOp: false,
    replies: [],
  },
];

const aiSummary = {
  keyPoints: [
    "Stanford researchers developed an AI model with 95% accuracy for diagnosing rare diseases",
    "Medical professionals are optimistic but emphasize need for bias testing and demographic validation",
    "Rural healthcare providers see significant potential for improving access to specialist-level diagnosis",
    "Concerns raised about data diversity and potential algorithmic bias across different populations",
    "Regulatory frameworks for medical AI validation are currently being developed",
  ],
  sentiment: "Cautiously optimistic",
  engagement: "High interest with constructive debate",
};

export default function PostDetail() {
  const { postId } = useParams();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [focusedComment, setFocusedComment] = useState<string | null>(null);
  const [showAISummary, setShowAISummary] = useState(true);
  const [sortBy, setSortBy] = useState<
    "best" | "top" | "new" | "controversial"
  >("best");

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const toggleCommentCollapse = (commentId: string) => {
    const updateComments = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, isCollapsed: !comment.isCollapsed };
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: updateComments(comment.replies) };
        }
        return comment;
      });
    };
    setComments(updateComments(comments));
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Gold":
        return "bg-yellow-500";
      case "Platinum":
        return "bg-gray-400";
      case "Diamond":
        return "bg-blue-500";
      case "Verified Doctor":
        return "bg-green-500";
      case "PhD":
        return "bg-purple-500";
      default:
        return "bg-reddit-orange";
    }
  };

  const getThreadConnectorColor = (depth: number) => {
    const colors = [
      "border-blue-300",
      "border-green-300",
      "border-purple-300",
      "border-orange-300",
      "border-pink-300",
      "border-indigo-300",
    ];
    return colors[depth % colors.length];
  };

  const renderComment = (comment: Comment, isLastInThread = false) => {
    const isParent = comment.depth === 0;
    const isFocused = focusedComment === comment.id;
    const hasReplies = comment.replies.length > 0;
    const isDeepThread = comment.depth >= 3;

    // Don't render collapsed deep threads unless they're being expanded
    if (comment.isCollapsed && comment.depth >= 3) {
      return null;
    }

    return (
      <div
        key={comment.id}
        className={`relative ${focusedComment && !isFocused ? "opacity-30" : ""}`}
      >
        {/* Thread Connector */}
        {comment.depth > 0 && (
          <div
            className={`absolute top-0 bottom-0 w-1 ${getThreadConnectorColor(comment.depth - 1)} border-l-4 opacity-60`}
            style={{ left: `${comment.depth * 20 - 16}px` }}
          />
        )}

        {/* Thread Connection Dot */}
        {comment.depth > 0 && (
          <div
            className={`absolute w-3 h-3 rounded-full ${getThreadConnectorColor(comment.depth - 1).replace("border-", "bg-")} opacity-80`}
            style={{ left: `${comment.depth * 20 - 20}px`, top: "20px" }}
          />
        )}

        {/* Comment Card with Long Press */}
        <LongPressContextMenu
          isComment={true}
          isOwnContent={comment.isOp}
          onAction={(action) =>
            console.log(`Action: ${action} on comment ${comment.id}`)
          }
        >
          <AnimatedCard
            variant="hover-lift"
            className={`
            border border-wireframe-border transition-all duration-300
            ${
              isParent
                ? "bg-wireframe-surface-primary p-4 mb-4 rounded-lg shadow-sm"
                : "bg-wireframe-surface-secondary p-3 mb-2 ml-8 rounded-md"
            }
            ${isFocused ? "ring-2 ring-reddit-orange shadow-lg bg-orange-50" : ""}
          `}
            style={{
              marginLeft: comment.depth > 0 ? `${comment.depth * 20}px` : "0",
            }}
          >
            {/* Comment Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className={isParent ? "w-8 h-8" : "w-6 h-6"}>
                  <AvatarFallback className="bg-wireframe-surface-secondary text-xs">
                    {comment.author.slice(2, 4).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center space-x-2">
                  <span
                    className={`${isParent ? "font-bold text-base" : "font-medium text-sm"} text-wireframe-text-primary`}
                  >
                    {comment.author}
                  </span>

                  {/* Author Badges */}
                  <div className="flex items-center space-x-1">
                    {comment.authorBadges.map((badge, idx) => (
                      <TooltipHover key={idx} content={badge}>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${getBadgeColor(badge)}`}
                        >
                          <Award className="w-2 h-2 text-white" />
                        </div>
                      </TooltipHover>
                    ))}
                    {comment.isOp && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-reddit-orange text-white"
                      >
                        OP
                      </Badge>
                    )}
                  </div>

                  <span className="text-xs text-wireframe-text-muted">
                    {comment.timeAgo}
                  </span>
                </div>
              </div>

              {/* Comment Actions */}
              <div className="flex items-center space-x-2">
                {!focusedComment && (
                  <TooltipHover content="Focus on this thread">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFocusedComment(comment.id)}
                      className="h-6 w-6 p-0 hover:bg-wireframe-surface-hover"
                    >
                      <Focus className="w-3 h-3" />
                    </Button>
                  </TooltipHover>
                )}

                {hasReplies && (
                  <TooltipHover
                    content={
                      comment.isCollapsed
                        ? "Expand replies"
                        : "Collapse replies"
                    }
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCommentCollapse(comment.id)}
                      className="h-6 w-6 p-0 hover:bg-wireframe-surface-hover"
                    >
                      {comment.isCollapsed ? (
                        <Plus className="w-3 h-3" />
                      ) : (
                        <Minus className="w-3 h-3" />
                      )}
                    </Button>
                  </TooltipHover>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-wireframe-surface-hover"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Comment Content */}
            <div
              className={`mb-3 leading-relaxed ${isParent ? "text-base" : "text-sm"} text-wireframe-text-secondary`}
            >
              {comment.content}
            </div>

            {/* Comment Footer */}
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-1 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <ArrowUp className="w-3 h-3" />
                </Button>
                <span className="font-medium text-wireframe-text-primary min-w-[20px] text-center">
                  {formatNumber(comment.upvotes - comment.downvotes)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-1 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <ArrowDown className="w-3 h-3" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Reply className="w-3 h-3 mr-1" />
                Reply
              </Button>

              <AwardsModal
                commentId={comment.id}
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                  >
                    <Award className="w-3 h-3 mr-1" />
                    Award
                  </Button>
                }
              />

              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Flag className="w-3 h-3 mr-1" />
                Report
              </Button>
            </div>
          </AnimatedCard>
        </LongPressContextMenu>

        {/* Collapsed Thread Indicator */}
        {hasReplies && comment.isCollapsed && (
          <div
            className="ml-8 mb-2 p-3 bg-gradient-to-r from-wireframe-surface-hover to-wireframe-surface-secondary rounded-lg border border-dashed border-wireframe-border cursor-pointer hover:bg-gradient-to-r hover:from-wireframe-surface-secondary hover:to-wireframe-surface-hover transition-all duration-300 hover:shadow-md"
            onClick={() => toggleCommentCollapse(comment.id)}
            style={{ marginLeft: `${(comment.depth + 1) * 20}px` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-wireframe-text-secondary">
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium">
                  {comment.replies.length} more{" "}
                  {comment.replies.length === 1 ? "reply" : "replies"}
                </span>
                {isDeepThread && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700"
                  >
                    Deep thread
                  </Badge>
                )}
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                Expand
              </Button>
            </div>
            <div className="mt-1 text-xs text-wireframe-text-muted">
              Click to view nested discussion
            </div>
          </div>
        )}

        {/* Render Replies */}
        {!comment.isCollapsed && hasReplies && (
          <div className="space-y-2">
            {comment.replies.map((reply, index) =>
              renderComment(reply, index === comment.replies.length - 1),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-wireframe-border bg-wireframe-surface-primary shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center space-x-4 h-14">
            <Link
              to="/home"
              className="p-2 hover:bg-wireframe-surface-hover rounded-md transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-wireframe-text-secondary" />
            </Link>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-wireframe-text-primary">
                Post Discussion
              </span>
              {focusedComment && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFocusedComment(null)}
                  className="h-7 text-xs"
                >
                  <EyeOff className="w-3 h-3 mr-1" />
                  Exit Focus
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4">
        {/* Post Content */}
        <Card className="border border-wireframe-border bg-wireframe-surface-primary mb-6">
          <div className="p-6">
            {/* Post Header */}
            <div className="flex items-center text-sm text-wireframe-text-muted mb-3">
              <Link
                to={`/r/${mockPost.subreddit.slice(2)}`}
                className="font-medium hover:underline hover:text-reddit-orange transition-colors"
              >
                {mockPost.subreddit}
              </Link>
              <span className="mx-1">•</span>
              <span>Posted by</span>
              <Link
                to={`/u/${mockPost.author.slice(2)}`}
                className="ml-1 hover:underline flex items-center space-x-1"
              >
                <span>{mockPost.author}</span>
                {mockPost.authorBadges.map((badge, idx) => (
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
              <span>{mockPost.timeAgo}</span>
            </div>

            {/* Post Title */}
            <h1 className="text-2xl font-bold text-wireframe-text-primary mb-4 leading-tight">
              {mockPost.title}
            </h1>

            {/* Post Content */}
            <p className="text-wireframe-text-secondary leading-relaxed mb-4">
              {mockPost.content}
            </p>

            {/* Post Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <span className="font-medium text-wireframe-text-primary">
                    {formatNumber(mockPost.upvotes)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                <span className="flex items-center text-wireframe-text-muted">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {mockPost.comments} Comments
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <Share className="w-4 h-4 mr-1" />
                  Share
                </Button>

                <AwardsModal
                  postId={mockPost.id}
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                    >
                      <Award className="w-4 h-4 mr-1" />
                      Award
                    </Button>
                  }
                />

                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                >
                  <Bookmark className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>

              <div className="flex items-center space-x-1">
                {mockPost.awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center"
                  >
                    <Award className="w-3 h-3 text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* AI Summary Panel */}
        {showAISummary && (
          <AnimatedCard
            variant="hover-glow"
            className="border border-wireframe-border bg-gradient-to-r from-wireframe-surface-primary to-wireframe-surface-secondary mb-6"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-reddit-orange" />
                  <h3 className="font-semibold text-wireframe-text-primary">
                    AI Discussion Summary
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-purple-100 text-purple-700"
                  >
                    Beta
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAISummary(false)}
                  className="h-6 w-6 p-0"
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-wireframe-text-secondary mb-2">
                    Key Discussion Points:
                  </h4>
                  <ul className="space-y-1">
                    {aiSummary.keyPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-wireframe-text-secondary flex items-start"
                      >
                        <span className="w-1.5 h-1.5 bg-reddit-orange rounded-full mt-2 mr-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <span className="text-wireframe-text-muted">
                      Overall sentiment:{" "}
                      <strong className="text-blue-600">
                        {aiSummary.sentiment}
                      </strong>
                    </span>
                    <span className="text-wireframe-text-muted">
                      Engagement:{" "}
                      <strong className="text-green-600">
                        {aiSummary.engagement}
                      </strong>
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs h-6">
                    View Full Analysis
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedCard>
        )}

        {/* Comments Section */}
        <div className="space-y-4">
          {/* Comments Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-wireframe-text-primary">
              Comments ({mockPost.comments})
            </h2>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-wireframe-text-muted">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border border-wireframe-border rounded px-2 py-1 bg-wireframe-surface-primary"
              >
                <option value="best">Best</option>
                <option value="top">Top</option>
                <option value="new">New</option>
                <option value="controversial">Controversial</option>
              </select>
            </div>
          </div>

          <Separator />

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => renderComment(comment))}
          </div>
        </div>
      </div>
    </div>
  );
}
