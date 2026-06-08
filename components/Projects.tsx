"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { projectsData } from "@/data/projectsData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const featuredProjectIds = ["dashboard-kol", "maintenance-page", "museum-zoologi"];
  const featuredProjects = projectsData.filter(p => featuredProjectIds.includes(p.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || !sectionRef.current || !introRef.current) return;

      // Background moves EXTREMELY SLOW
      gsap.to(bgRef.current, {
        y: "-5%",
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2, // Smooth lag for a "heavy" feel
        },
      });

      // Title moves with very subtle parallax
      gsap.to(titleRef.current, {
        y: 100,
        opacity: 0.01,
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: sectionRef, dependencies: [mounted] },
  );

  if (!mounted) return null; // Avoid hydration mismatch by waiting for client mount

  return (
    <div className="w-full bg-[#050505] flex flex-col items-center">
      {/* 2. Featured Projects Hover Section (Right after tech) */}
      <section className="relative z-30 w-full flex flex-col justify-center overflow-hidden py-24 md:py-32">
        {/* Floating Images (Not Fullscreen) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {featuredProjects.map((project) => (
            <div
              key={`bg-${project.id}`}
              className={`absolute inset-0 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-center ${
                hoveredProject === project.id ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-90" />
              <div className="absolute inset-0 bg-[#050505]/40" />
              <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </div>
          ))}
        </div>
        
        {/* List */}
        <div className="relative z-10 w-full mx-auto px-6 md:px-12 lg:px-24">
          <p className="text-white/40 tracking-[0.3em] uppercase text-sm mb-8 md:mb-12">Selected Works</p>
          <div className="flex flex-col border-t border-white/10">
            {featuredProjects.map((project) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.id}`}
                className="group relative flex items-center justify-between py-10 md:py-16 border-b border-white/10 cursor-pointer overflow-hidden"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="absolute left-0 top-0 w-full h-full bg-white/5 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 z-0" />
                
                <h3 className="relative z-10 text-3xl md:text-5xl lg:text-7xl font-black text-white/50 uppercase tracking-tighter transition-colors duration-500 group-hover:text-white mix-blend-difference">
                  {project.title.replace(/-/g, ' ')}
                </h3>
                <span className="relative z-10 text-white/30 text-2xl md:text-4xl font-light transition-all duration-500 group-hover:text-white group-hover:-rotate-45">
                  ↗
                </span>
              </Link>
            ))}
          </div>

          <div className="flex justify-end mt-12">
            <Link 
              href="/projects"
              className="group relative flex items-center gap-4 text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] text-sm font-bold"
            >
              <span className="relative z-10">View All Projects</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors group-hover:scale-110 duration-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
