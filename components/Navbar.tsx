"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#work" },
  { name: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up (or if we are near the top)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar if cursor is within 100px from the top of the viewport
      if (e.clientY < 100) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY]);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && href !== "#") {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href === "#") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-100 flex justify-center px-4 transition-all duration-500 pointer-events-none ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className={`flex items-center gap-8 bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-xl px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] pointer-events-auto`}>
        <Link 
          href="/" 
          onClick={(e) => handleScrollToSection(e, "#")}
          className="text-white font-bold uppercase tracking-[0.2em] text-xs mr-4 hover:text-white/80 transition-colors"
        >
          HOME
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
