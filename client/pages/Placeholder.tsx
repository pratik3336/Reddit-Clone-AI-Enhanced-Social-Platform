import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Construction } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-wireframe-bg">
      {/* Header */}
      <header className="border-b border-wireframe-border bg-wireframe-surface-primary">
        <div className="flex items-center p-4 max-w-4xl mx-auto">
          <Link
            to="/home"
            className="p-2 hover:bg-wireframe-surface-hover rounded-md mr-4"
          >
            <ChevronLeft className="w-5 h-5 text-wireframe-text-secondary" />
          </Link>
          <h1 className="text-lg font-semibold text-wireframe-text-primary">
            {title}
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <Card className="w-full max-w-md p-8 border border-wireframe-border bg-wireframe-surface-primary text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wireframe-surface-secondary mb-6">
            <Construction className="w-8 h-8 text-wireframe-text-muted" />
          </div>

          <h2 className="text-xl font-semibold text-wireframe-text-primary mb-4">
            {title}
          </h2>

          <p className="text-wireframe-text-secondary mb-6 leading-relaxed">
            {description}
          </p>

          <div className="space-y-3">
            <Button
              variant="default"
              className="w-full bg-wireframe-text-primary hover:bg-wireframe-text-secondary text-white"
              asChild
            >
              <Link to="/home">Go to Home Feed</Link>
            </Button>

            <p className="text-xs text-wireframe-text-muted">
              Continue prompting to have this page implemented with full
              functionality.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
