import React, { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio();
    // Using a royalty-free ambient music URL from a CDN
    audioRef.current.src = "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3";
    audioRef.current.loop = true;
    audioRef.current.volume = volume / 100;
    audioRef.current.preload = "none";

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = audioRef.current.currentTime; // Smooth fade would go here
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="fixed top-24 right-6 z-50 group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="flex items-center gap-2 bg-charcoal/90 backdrop-blur-sm border border-gold/20 rounded-full px-4 py-2 shadow-lg transition-all duration-300">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="text-gold hover:text-gold/80 hover:bg-gold/10 rounded-full h-8 w-8"
        >
          {isPlaying ? (
            <Music className="h-4 w-4 animate-pulse" />
          ) : (
            <Music className="h-4 w-4" />
          )}
        </Button>

        {/* Volume controls - show on hover */}
        <div 
          className={`flex items-center gap-2 transition-all duration-300 ${
            showControls ? 'opacity-100 w-32' : 'opacity-0 w-0 overflow-hidden'
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setVolume(volume === 0 ? 30 : 0)}
            className="text-gold hover:text-gold/80 hover:bg-gold/10 rounded-full h-6 w-6 flex-shrink-0"
          >
            {volume === 0 ? (
              <VolumeX className="h-3 w-3" />
            ) : (
              <Volume2 className="h-3 w-3" />
            )}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={(value) => setVolume(value[0])}
            max={100}
            step={1}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};
