import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Gift,
  Coins,
  Plus,
  Award,
  Star,
  Heart,
  Zap,
  Crown,
  Diamond,
  RefreshCw,
  Check,
} from "lucide-react";
import { TooltipHover } from "@/components/Microinteractions";

interface Award {
  id: string;
  name: string;
  icon: React.ReactNode;
  cost: number;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface AwardsModalProps {
  postId?: string;
  commentId?: string;
  onAwardGiven?: (awardId: string) => void;
  trigger?: React.ReactNode;
}

const awards: Award[] = [
  {
    id: "silver",
    name: "Silver",
    icon: <Award className="w-6 h-6 text-gray-400" />,
    cost: 100,
    description: "Shows appreciation for good content",
    rarity: "common",
  },
  {
    id: "gold",
    name: "Gold",
    icon: <Award className="w-6 h-6 text-yellow-500" />,
    cost: 500,
    description: "Premium award with special recognition",
    rarity: "rare",
  },
  {
    id: "platinum",
    name: "Platinum",
    icon: <Crown className="w-6 h-6 text-gray-300" />,
    cost: 1800,
    description: "Highest honor with exclusive benefits",
    rarity: "epic",
  },
  {
    id: "helpful",
    name: "Helpful",
    icon: <Star className="w-6 h-6 text-blue-500" />,
    cost: 150,
    description: "For genuinely helpful contributions",
    rarity: "common",
  },
  {
    id: "wholesome",
    name: "Wholesome",
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    cost: 125,
    description: "Heartwarming and positive content",
    rarity: "common",
  },
  {
    id: "mind-blown",
    name: "Mind Blown",
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    cost: 400,
    description: "Revolutionary or mind-changing content",
    rarity: "rare",
  },
  {
    id: "diamond",
    name: "Diamond",
    icon: <Diamond className="w-6 h-6 text-cyan-400" />,
    cost: 2500,
    description: "Ultra-rare premium award",
    rarity: "legendary",
  },
];

const recentAwards = [
  { id: "gold", name: "Gold", usedAt: "2h ago" },
  { id: "helpful", name: "Helpful", usedAt: "1d ago" },
  { id: "silver", name: "Silver", usedAt: "3d ago" },
];

export default function AwardsModal({
  postId,
  commentId,
  onAwardGiven,
  trigger,
}: AwardsModalProps) {
  const [coinBalance, setCoinBalance] = useState(1250);
  const [selectedAward, setSelectedAward] = useState<string | null>(null);
  const [isGifting, setIsGifting] = useState(false);
  const [giftedAwards, setGiftedAwards] = useState<string[]>([]);

  const handleGiftAward = async (awardId: string) => {
    const award = awards.find((a) => a.id === awardId);
    if (!award || coinBalance < award.cost) return;

    setIsGifting(true);

    // Simulate API call
    setTimeout(() => {
      setCoinBalance((prev) => prev - award.cost);
      setGiftedAwards((prev) => [...prev, awardId]);
      setSelectedAward(null);
      setIsGifting(false);
      onAwardGiven?.(awardId);
    }, 1000);
  };

  const handleReloadCoins = () => {
    // In a real app, this would open a payment flow
    setCoinBalance((prev) => prev + 1000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100";
      case "rare":
        return "text-blue-600 bg-blue-100";
      case "epic":
        return "text-purple-600 bg-purple-100";
      case "legendary":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 px-2 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
    >
      <Gift className="w-4 h-4 mr-1" />
      Award
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-reddit-orange" />
            <span>Give Award</span>
          </DialogTitle>
        </DialogHeader>

        {/* Coin Balance */}
        <Card className="p-4 bg-gradient-to-r from-wireframe-surface-secondary to-wireframe-surface-hover border border-wireframe-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Coins className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="font-semibold text-wireframe-text-primary">
                  {coinBalance} Coins
                </p>
                <p className="text-xs text-wireframe-text-muted">
                  Available balance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TooltipHover content="Reload coins">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReloadCoins}
                  className="hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Reload
                </Button>
              </TooltipHover>
              <Button
                variant="default"
                size="sm"
                className="bg-reddit-orange hover:bg-red-600 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Buy More
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="awards" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="awards">All Awards</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="awards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {awards.map((award) => {
                const canAfford = coinBalance >= award.cost;
                const isGifted = giftedAwards.includes(award.id);

                return (
                  <Card
                    key={award.id}
                    className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedAward === award.id
                        ? "ring-2 ring-reddit-orange border-reddit-orange"
                        : "border-wireframe-border hover:border-wireframe-text-secondary"
                    } ${!canAfford ? "opacity-50" : ""}`}
                    onClick={() => canAfford && setSelectedAward(award.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">{award.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-wireframe-text-primary">
                            {award.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`text-xs ${getRarityColor(award.rarity)}`}
                            >
                              {award.rarity}
                            </Badge>
                            {isGifted && (
                              <Badge className="text-xs bg-green-100 text-green-700">
                                <Check className="w-3 h-3 mr-1" />
                                Gifted
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-wireframe-text-secondary mb-3 leading-relaxed">
                          {award.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 text-sm">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span
                              className={`font-medium ${canAfford ? "text-wireframe-text-primary" : "text-red-500"}`}
                            >
                              {award.cost}
                            </span>
                          </div>
                          {selectedAward === award.id && (
                            <Button
                              size="sm"
                              disabled={isGifting}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleGiftAward(award.id);
                              }}
                              className="bg-reddit-orange hover:bg-red-600 text-white"
                            >
                              {isGifting ? (
                                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <Gift className="w-3 h-3 mr-1" />
                              )}
                              {isGifting ? "Gifting..." : "Gift"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="space-y-3">
              {recentAwards.map((recent) => {
                const award = awards.find((a) => a.id === recent.id);
                if (!award) return null;

                return (
                  <Card
                    key={`recent-${recent.id}`}
                    className="p-3 border border-wireframe-border"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {award.icon}
                        <div>
                          <p className="font-medium text-wireframe-text-primary">
                            {award.name}
                          </p>
                          <p className="text-xs text-wireframe-text-muted">
                            Used {recent.usedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-sm text-wireframe-text-muted">
                          <Coins className="w-3 h-3 text-yellow-500" />
                          <span>{award.cost}</span>
                        </div>
                        <TooltipHover content="Gift again">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGiftAward(award.id)}
                            disabled={coinBalance < award.cost}
                            className="h-8 w-8 p-0"
                          >
                            <Gift className="w-3 h-3" />
                          </Button>
                        </TooltipHover>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="text-center">
          <p className="text-xs text-wireframe-text-muted leading-relaxed">
            Awards show appreciation and help support the community. Coins can
            be earned through participation or purchased.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
