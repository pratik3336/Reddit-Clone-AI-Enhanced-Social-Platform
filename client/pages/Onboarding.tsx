import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Onboarding() {
  return (
    <div className="min-h-screen bg-wireframe-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border border-wireframe-border bg-wireframe-surface-primary">
        {/* Reddit Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-reddit-orange mb-4">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-white fill-current"
            >
              <path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zM9.777 13.017c0-.821.672-1.488 1.503-1.488.83 0 1.503.667 1.503 1.488 0 .821-.673 1.489-1.503 1.489-.831 0-1.503-.668-1.503-1.489zM18.605 11.863c0 .821-.672 1.488-1.503 1.488-.83 0-1.503-.667-1.503-1.488 0-.821.673-1.489 1.503-1.489.831 0 1.503.668 1.503 1.489z" />
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-wireframe-text-primary mb-2">
            reddit
          </h1>
          <p className="text-wireframe-text-secondary text-lg">
            Your communities, your conversations
          </p>
        </div>

        {/* Sign Up Buttons */}
        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-12 border-wireframe-border hover:bg-wireframe-surface-hover"
            asChild
          >
            <Link to="/interests">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Link>
          </Button>

          <Button
            className="w-full h-12 bg-wireframe-text-primary hover:bg-wireframe-text-secondary text-white"
            asChild
          >
            <Link to="/interests">Sign up with Email</Link>
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-wireframe-text-muted text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-wireframe-text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center mt-8 pt-6 border-t border-wireframe-border">
          <p className="text-xs text-wireframe-text-muted leading-relaxed">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="hover:underline">
              User Agreement
            </Link>{" "}
            and acknowledge that you understand the{" "}
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Card>
    </div>
  );
}
