"use client";

import { useState, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Shuffle, PlusCircle, Volume2, ChevronDown, Maximize2, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Perunggu - Kalibata, 2012
  const songInfo = {
    title: "Kalibata, 2012",
    artist: "Perunggu",
    album: "Memorandum",
    cover: "https://ik.imagekit.io/bhiaoqt1n/Perunggu_-_Memorandum.jpg",
    src: "/audio/kalibata.mp3"
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress || 0);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-9999 font-outfit">
      <style>{`
        .squiggly-slider {
          --slider-weight: 0.5rem;
          --accent-color: #C5E1A5;
          position: relative;
          width: 100%;
          height: var(--slider-weight);
        }

        .slider-input {
          -webkit-appearance: none;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          border-radius: 10px;
          cursor: pointer;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
        }

        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .slider-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: var(--accent-color);
          pointer-events: none;
          z-index: 5;
          -webkit-mask-image: url("data:image/svg+xml,%3Csvg width='24' height='12' viewBox='0 0 24 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6.5C1.5 6.5 2.5 3.5 4 3.5C5.5 3.5 6.5 6.5 8 6.5C9.5 6.5 10.5 3.5 12 3.5C13.5 3.5 14.5 6.5 16 6.5C17.5 6.5 18.5 3.5 20 3.5C21.5 3.5 22.5 6.5 24 6.5' fill='none' stroke='black' stroke-width='2'/%3E%3C/svg%3E");
          -webkit-mask-size: calc(var(--slider-weight) * 3) 100%;
          animation: squiggly-move 0.8s linear infinite;
        }

        @keyframes squiggly-move {
          from { -webkit-mask-position: 0 0; }
          to { -webkit-mask-position: calc(var(--slider-weight) * 3) 0; }
        }
      `}</style>

      {/* Real Audio Element */}
      <audio 
        ref={audioRef} 
        src={songInfo.src} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Bubble */
          <motion.div
            key="minimized"
            layoutId="player"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsMinimized(false)}
            className="group relative w-16 h-16 bg-[#1a1a1a] rounded-full overflow-hidden shadow-2xl border border-white/10 cursor-pointer flex items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-full h-full p-1"
            >
              <img 
                src={songInfo.cover} 
                alt="Cover" 
                className="w-full h-full object-cover rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <Music className="text-white/40 group-hover:text-white transition-colors" size={20} />
            </div>

            {/* Tiny progress ring or indicator */}
            {isPlaying && (
              <div className="absolute inset-0 border-2 border-[#C5E1A5] rounded-full animate-ping opacity-20" />
            )}
          </motion.div>
        ) : (
          /* Full Media Card */
          <motion.div
            key="full"
            layoutId="player"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="w-[320px] bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative"
          >
            {/* Minimize Button */}
            <button 
              onClick={() => setIsMinimized(true)}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/30 backdrop-blur-md text-white/70 hover:text-white rounded-full flex items-center justify-center transition-all hover:bg-black/50"
            >
              <ChevronDown size={24} />
            </button>

            {/* Header / Album Art */}
            <div className="relative aspect-square w-full group overflow-hidden">
              <img 
                src={songInfo.cover} 
                alt="Album Cover" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#1a1a1a] via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="px-8 pb-8 -mt-16 relative z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h4 className="text-white text-xl font-bold tracking-tight leading-tight mb-1">
                    {songInfo.title}
                  </h4>
                  <p className="text-white/50 text-sm font-medium">
                    {songInfo.artist}
                  </p>
                </div>
                <button className="text-white/40 hover:text-[#C5E1A5] transition-colors">
                  <PlusCircle size={22} />
                </button>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mb-8">
                <button className="text-white/30 hover:text-white transition-colors">
                  <Shuffle size={18} />
                </button>
                <div className="flex items-center gap-6">
                  <button className="text-white/60 hover:text-white transition-colors">
                    <SkipBack size={24} fill="currentColor" />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="w-14 h-14 bg-[#C5E1A5] text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#C5E1A5]/20"
                  >
                    {isPlaying ? (
                      <Pause size={28} fill="currentColor" />
                    ) : (
                      <Play size={28} fill="currentColor" className="translate-x-0.5" />
                    )}
                  </button>
                  <button className="text-white/60 hover:text-white transition-colors">
                    <SkipForward size={24} fill="currentColor" />
                  </button>
                </div>
                <button className="text-white/30 hover:text-white transition-colors">
                  <Volume2 size={18} />
                </button>
              </div>

              {/* Squiggly Slider */}
              <div className="squiggly-slider">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={progress}
                  onChange={handleSliderChange}
                  className="slider-input"
                />
                <div 
                  className="slider-progress" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-white/20 font-mono">
                  {audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}
                </span>
                <span className="text-[10px] text-white/20 font-mono">
                  {audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
