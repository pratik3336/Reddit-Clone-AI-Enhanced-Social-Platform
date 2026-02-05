import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Reply,
  Share,
  Flag,
  Copy,
  Bookmark,
  Award,
  MoreHorizontal,
  Eye,
  EyeOff,
  UserPlus,
  MessageCircle,
  Heart,
} from "lucide-react";
import { TooltipHover } from "@/components/Microinteractions";

interface LongPressContextMenuProps {
  children: React.ReactNode;
  onAction?: (action: string) => void;
  isComment?: boolean;
  isOwnContent?: boolean;
  className?: string;
}

interface MenuAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  destructive?: boolean;
  primary?: boolean;
}

export default function LongPressContextMenu({
  children,
  onAction,
  isComment = false,
  isOwnContent = false,
  className = "",
}: LongPressContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isLongPressing = useRef(false);

  const actions: MenuAction[] = [
    {
      id: "reply",
      label: "Reply",
      icon: <Reply className="w-4 h-4" />,
      description: "Respond to this content",
      primary: true,
    },
    {
      id: "award",
      label: "Give Award",
      icon: <Award className="w-4 h-4" />,
      description: "Show appreciation",
    },
    {
      id: "save",
      label: "Save",
      icon: <Bookmark className="w-4 h-4" />,
      description: "Save for later",
    },
    {
      id: "share",
      label: "Share",
      icon: <Share className="w-4 h-4" />,
      description: "Share with others",
    },
    {
      id: "copy",
      label: "Copy Text",
      icon: <Copy className="w-4 h-4" />,
      description: "Copy to clipboard",
    },
    ...(isComment
      ? [
          {
            id: "follow",
            label: "Follow User",
            icon: <UserPlus className="w-4 h-4" />,
            description: "Get notified of new posts",
          },
        ]
      : []),
    {
      id: "hide",
      label: "Hide",
      icon: <EyeOff className="w-4 h-4" />,
      description: "Hide from feed",
    },
    {
      id: "report",
      label: "Report",
      icon: <Flag className="w-4 h-4" />,
      description: "Report inappropriate content",
      destructive: true,
    },
  ];

  const handleLongPressStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      isLongPressing.current = true;

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      timeoutRef.current = setTimeout(() => {
        if (isLongPressing.current) {
          setPosition({ x: clientX, y: clientY });
          setIsOpen(true);

          // Haptic feedback for mobile
          if ("vibrate" in navigator) {
            navigator.vibrate(50);
          }
        }
      }, 500); // 500ms long press threshold
    },
    [],
  );

  const handleLongPressEnd = useCallback(() => {
    isLongPressing.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const handleAction = (actionId: string) => {
    setIsOpen(false);
    onAction?.(actionId);
  };

  const handleOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <div
        className={`relative ${className}`}
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
        onContextMenu={(e) => e.preventDefault()} // Disable browser context menu
      >
        {children}
      </div>

      {/* Context Menu Overlay */}
      {isOpen && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-50"
            onClick={handleOutsideClick}
          />

          {/* Context Menu */}
          <Card
            className="fixed z-50 min-w-48 max-w-64 border border-wireframe-border bg-wireframe-surface-primary shadow-xl animate-in zoom-in duration-200"
            style={{
              left: Math.min(position.x, window.innerWidth - 250),
              top: Math.min(position.y, window.innerHeight - 400),
            }}
          >
            <div className="p-2">
              {/* Header */}
              <div className="px-3 py-2 border-b border-wireframe-border mb-2">
                <div className="flex items-center space-x-2">
                  <MoreHorizontal className="w-4 h-4 text-wireframe-text-muted" />
                  <span className="text-sm font-medium text-wireframe-text-primary">
                    Quick Actions
                  </span>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-1 mb-3">
                {actions
                  .filter((action) => action.primary)
                  .map((action) => (
                    <Button
                      key={action.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(action.id)}
                      className="w-full justify-start h-10 px-3 hover:bg-wireframe-surface-hover transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-reddit-orange">{action.icon}</div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-wireframe-text-primary">
                            {action.label}
                          </div>
                          {action.description && (
                            <div className="text-xs text-wireframe-text-muted">
                              {action.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))}
              </div>

              <Separator className="my-2" />

              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-1 mb-3">
                {actions
                  .filter((action) => !action.primary && !action.destructive)
                  .map((action) => (
                    <TooltipHover
                      key={action.id}
                      content={action.description || action.label}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction(action.id)}
                        className="h-12 flex-col space-y-1 hover:bg-wireframe-surface-hover transition-colors"
                      >
                        <div className="text-wireframe-text-secondary">
                          {action.icon}
                        </div>
                        <span className="text-xs text-wireframe-text-muted">
                          {action.label}
                        </span>
                      </Button>
                    </TooltipHover>
                  ))}
              </div>

              <Separator className="my-2" />

              {/* Destructive Actions */}
              <div className="space-y-1">
                {actions
                  .filter((action) => action.destructive)
                  .map((action) => (
                    <Button
                      key={action.id}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(action.id)}
                      className="w-full justify-start h-8 px-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {action.icon}
                        <span className="text-sm">{action.label}</span>
                      </div>
                    </Button>
                  ))}
              </div>

              {/* Footer */}
              <div className="mt-3 pt-2 border-t border-wireframe-border">
                <p className="text-xs text-center text-wireframe-text-muted">
                  Long press for quick actions
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
