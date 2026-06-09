import { Instagram, Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-white py-16 relative overflow-hidden">
      {/* Top Border Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 md:w-1/2 h-px bg-linear-to-r from-transparent via-fuchsia-500 to-transparent opacity-30" />
      <div 
        className="absolute -top-[10vw] left-1/2 -translate-x-1/2 w-[60vw] h-[20vw] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse at center, rgba(192, 38, 211, 0.15) 0%, transparent 70%)' }}
      />

      <div className="w-full mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.04em] mb-4 text-center">
          RUSYDI
        </h2>
        <p className="text-gray-400 text-center mb-10 max-w-md text-sm md:text-base leading-relaxed">
          Frontend Developer & Visual Architect. Let's connect and build
          something amazing together.
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/rusydibalfas_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-fuchsia-500/10 hover:border-fuchsia-500/50 hover:text-fuchsia-400 transition-all duration-300 group"
          >
            <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rusydi-balfas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-fuchsia-500/10 hover:border-fuchsia-500/50 hover:text-fuchsia-400 transition-all duration-300 group"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@namikz743"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-fuchsia-500/10 hover:border-fuchsia-500/50 hover:text-fuchsia-400 transition-all duration-300 group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 group-hover:scale-110 transition-transform"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/russs743"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-fuchsia-500/10 hover:border-fuchsia-500/50 hover:text-fuchsia-400 transition-all duration-300 group"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Bottom Text */}
        <div className="text-gray-600 text-xs md:text-sm flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-8">
          <p className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Rusydi Balfas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
