import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  Clock,
  Calendar,
} from "lucide-react";
import { TooltipHover } from "@/components/Microinteractions";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  postAge: string;
  title?: string;
  duration?: number;
  autoPlay?: boolean;
  controls?: boolean;
  className?: string;
}

export default function VideoPlayerWithTimestamp({
  src,
  poster,
  postAge,
  title,
  duration = 0,
  autoPlay = false,
  controls = true,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const hideControlsTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setVideoProgress((video.currentTime / video.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      // Video metadata loaded
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = clickX / rect.width;
    const newTime = clickPercent * video.duration;

    video.currentTime = newTime;
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.max(
      0,
      Math.min(video.duration, video.currentTime + seconds),
    );
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    if (isPlaying && !isHovering) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  return (
    <div
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={isMuted}
        className="w-full h-full object-cover"
        onDoubleClick={toggleFullscreen}
        onClick={togglePlayPause}
      />

      {/* Post Age Overlay */}
      <div className="absolute top-3 right-3 z-20">
        <Badge className="bg-black bg-opacity-70 text-white border-none backdrop-blur-sm">
          <Clock className="w-3 h-3 mr-1" />
          {postAge}
        </Badge>
      </div>

      {/* Title Overlay (when provided) */}
      {title && (
        <div className="absolute top-3 left-3 right-16 z-20">
          <div className="bg-black bg-opacity-70 text-white text-sm px-3 py-2 rounded backdrop-blur-sm">
            <p className="font-medium leading-tight line-clamp-2">{title}</p>
          </div>
        </div>
      )}

      {/* Play/Pause Overlay (center) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="w-16 h-16 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 text-white backdrop-blur-sm transition-all duration-300"
          >
            <Play className="w-8 h-8 ml-1" />
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isPlaying && currentTime === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Controls */}
      {controls && (
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 transition-all duration-300 ${
            showControls
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2"
          }`}
        >
          {/* Progress Bar */}
          <div
            className="w-full h-1 bg-gray-600 rounded-full mb-3 cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-reddit-orange rounded-full transition-all duration-150 group-hover:h-1.5"
              style={{ width: `${videoProgress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TooltipHover content={isPlaying ? "Pause" : "Play"}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayPause}
                  className="w-8 h-8 text-white hover:bg-white/20"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </Button>
              </TooltipHover>

              <TooltipHover content="Rewind 10s">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => skip(-10)}
                  className="w-8 h-8 text-white hover:bg-white/20"
                >
                  <SkipBack className="w-4 h-4" />
                </Button>
              </TooltipHover>

              <TooltipHover content="Forward 10s">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => skip(10)}
                  className="w-8 h-8 text-white hover:bg-white/20"
                >
                  <SkipForward className="w-4 h-4" />
                </Button>
              </TooltipHover>

              <TooltipHover content={isMuted ? "Unmute" : "Mute"}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="w-8 h-8 text-white hover:bg-white/20"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
              </TooltipHover>
            </div>

            <div className="flex items-center space-x-3">
              {/* Time Display */}
              <div className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              <TooltipHover
                content={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="w-8 h-8 text-white hover:bg-white/20"
                >
                  {isFullscreen ? (
                    <Minimize className="w-4 h-4" />
                  ) : (
                    <Maximize className="w-4 h-4" />
                  )}
                </Button>
              </TooltipHover>
            </div>
          </div>
        </div>
      )}

      {/* Additional Metadata Overlay */}
      <div className="absolute bottom-20 right-3 z-20 space-y-2">
        {/* Duration Badge */}
        {duration > 0 && (
          <Badge className="bg-black bg-opacity-70 text-white border-none backdrop-blur-sm block">
            <Calendar className="w-3 h-3 mr-1" />
            {formatTime(duration)}
          </Badge>
        )}
      </div>
    </div>
  );
}
