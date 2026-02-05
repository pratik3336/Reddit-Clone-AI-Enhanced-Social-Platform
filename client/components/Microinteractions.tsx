import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "hover-lift" | "hover-glow" | "hover-rotate" | "hover-scale";
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = "hover-lift",
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    "hover-lift":
      "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0",
    "hover-glow":
      "transition-all duration-300 hover:shadow-lg hover:shadow-reddit-orange/25 hover:animate-glow",
    "hover-rotate":
      "transition-all duration-300 hover:rotate-2 hover:scale-105",
    "hover-scale":
      "transition-all duration-300 hover:scale-110 active:scale-95",
  };

  return (
    <button className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </button>
  );
};

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "hover-lift" | "hover-tilt" | "hover-expand" | "hover-glow";
  children: React.ReactNode;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  variant = "hover-lift",
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    "hover-lift":
      "transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
    "hover-tilt":
      "transition-all duration-300 hover:rotate-1 hover:scale-105 hover:shadow-lg",
    "hover-expand":
      "transition-all duration-300 hover:scale-105 hover:shadow-lg",
    "hover-glow":
      "transition-all duration-300 hover:shadow-xl hover:shadow-reddit-orange/10 hover:border-reddit-orange/20",
  };

  return (
    <div className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
};

interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  children,
  position = "bottom-right",
  className,
  ...props
}) => {
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  return (
    <button
      className={cn(
        "fixed z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300",
        "bg-reddit-orange text-white hover:bg-red-600",
        "hover:scale-110 hover:shadow-xl hover:shadow-reddit-orange/25",
        "active:scale-95 animate-bounce-gentle",
        positionClasses[position],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface StaggeredListProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export const StaggeredList: React.FC<StaggeredListProps> = ({
  children,
  delay = 100,
  className,
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * delay}ms`,
            animationFillMode: "both",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

interface PulsingIndicatorProps {
  size?: "sm" | "md" | "lg";
  color?: "red" | "orange" | "green" | "blue";
  className?: string;
}

export const PulsingIndicator: React.FC<PulsingIndicatorProps> = ({
  size = "md",
  color = "orange",
  className,
}) => {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  const colorClasses = {
    red: "bg-red-500",
    orange: "bg-reddit-orange",
    green: "bg-green-500",
    blue: "bg-blue-500",
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "rounded-full animate-pulse-slow",
          sizeClasses[size],
          colorClasses[color],
        )}
      />
      <div
        className={cn(
          "absolute inset-0 rounded-full animate-ping",
          sizeClasses[size],
          colorClasses[color],
          "opacity-75",
        )}
      />
    </div>
  );
};

interface TooltipHoverProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const TooltipHover: React.FC<TooltipHoverProps> = ({
  content,
  children,
  position = "top",
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative group">
      {children}
      <div
        className={cn(
          "absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "pointer-events-none whitespace-nowrap",
          positionClasses[position],
        )}
      >
        {content}
      </div>
    </div>
  );
};

interface RippleEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  className,
  ...props
}) => {
  const [ripples, setRipples] = React.useState<
    Array<{ x: number; y: number; id: number }>
  >([]);

  const addRipple = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onClick={addRipple}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none animate-ping bg-white/30 rounded-full"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </div>
  );
};

export default {
  AnimatedButton,
  AnimatedCard,
  FloatingActionButton,
  StaggeredList,
  PulsingIndicator,
  TooltipHover,
  RippleEffect,
};
