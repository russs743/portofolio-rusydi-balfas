"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect } from "react";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"], weight: "400" });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    id: "01",
    label: "Core expertise",
    title: "Web Development",
    description:
      "I build responsive, fast, and dynamic web applications. Focusing on modern frameworks, clean code architecture, and scalability.",
    skills: ["JavaScript", "Next.js", "React.js", "Angular", "Web App Dev"],
  },
  {
    id: "02",
    label: "Creative edge",
    title: "Design & Styling",
    description:
      "Crafting beautiful interfaces with smooth animations and pixel-perfect styling for optimal user experience.",
    skills: ["Tailwind CSS", "UIX Design", "GSAP"],
  },
  {
    id: "03",
    label: "Technical foundation",
    title: "Data & Systems",
    description:
      "Analyzing systems, managing data workflows, and integrating robust APIs to power complex applications.",
    skills: ["Python", "Power BI", "Systems Analysis", "Postman API"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".skill-card-wrapper");

      // Floating animation for skill dots
      gsap.to(".skill-dot", {
        y: -4,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.1,
      });

      wrappers.forEach((wrapper, index) => {
        // Entrance animation on the wrapper
        gsap.fromTo(
          wrapper,
          {
            y: 150,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );

        // Stacking Scale down & Dim effect on the inner scaler
        // Separating elements prevents GSAP transform conflicts!
        if (index < wrappers.length - 1) {
          const scaler = wrapper.querySelector(".skill-card-scaler");
          if (scaler) {
            gsap.to(scaler, {
              scale: 0.94 - (wrappers.length - 1 - index) * 0.02,
              opacity: 0.4,
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: wrapper,
                start: `top top+=${10 + index * 2}rem`, // Trigger when wrapper hits its sticky position
                endTrigger: containerRef.current,
                end: "bottom bottom",
                scrub: true,
              }
            });
          }
        }
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const wrappers = document.querySelectorAll('.skill-card-wrapper');
    const cleanups: (() => void)[] = [];

    wrappers.forEach(wrapper => {
      const tilter = wrapper.querySelector('.skill-card-tilter') as HTMLElement;
      if (!tilter) return;

      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        // Use wrapper's rect so boundary calculations remain stable while tilter rotates
        const rect = wrapper.getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;
        
        tilter.style.setProperty('--mouse-x', `${x}px`);
        tilter.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4; 
        const rotateY = ((x - centerX) / centerX) * 4;

        gsap.to(tilter, {
          rotateX,
          rotateY,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(tilter, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)', 
        });
      };

      wrapper.addEventListener('mousemove', handleMouseMove);
      wrapper.addEventListener('mouseleave', handleMouseLeave);

      cleanups.push(() => {
        wrapper.removeEventListener('mousemove', handleMouseMove);
        wrapper.removeEventListener('mouseleave', handleMouseLeave);
      });
    });

    return () => cleanups.forEach(cleanup => cleanup());
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#fafafa] py-32 px-6 md:px-12 lg:px-24"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-violet-600/10 blur-[120px] rounded-full mix-blend-multiply animate-pulse duration-1000" />
        <div className="absolute bottom-20 left-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-fuchsia-600/10 blur-[120px] rounded-full mix-blend-multiply animate-pulse duration-1000" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16 lg:gap-24 relative z-10">
        {/* Left Side: Sticky Title */}
        <div className="md:w-1/3 md:sticky md:top-40">
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6 relative inline-block">
              Tech.
              <span className="absolute -bottom-1 left-0 w-1/3 h-2 bg-linear-to-r from-fuchsia-600 to-violet-600 rounded-full" />
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed max-w-md mt-4">
              My technical toolkit and areas of expertise. I turn ideas into
              realities that people can see, use, and connect with.
            </p>
          </div>
        </div>

        {/* Right Side: Stacking Animated Cards */}
        <div className="md:w-2/3 flex flex-col relative pb-[5vh]">
          {skillCategories.map((category, index) => (
            <div
              key={category.id}
              className="skill-card-wrapper w-full sticky"
              style={{ 
                top: `calc(10rem + ${index * 2}rem)`, 
                marginBottom: index === skillCategories.length - 1 ? '0' : '6rem', 
                zIndex: index, 
              }}
            >
              <div className="skill-card-scaler w-full h-full transform-origin-top">
                {/* Card Content - Handles 3D Tilt */}
                <div className="skill-card-tilter w-full bg-white/70 backdrop-blur-2xl border border-white group hover:border-fuchsia-500/30 rounded-4xl md:rounded-[3rem] p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(192,38,211,0.1)] transition-all duration-300 overflow-hidden relative">
                  
                  {/* Magnetic Glow Effect inside card */}
                  <div 
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(192,38,211,0.06), transparent 40%)',
                      zIndex: -1,
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${caveat.className} text-fuchsia-500 text-2xl md:text-4xl font-bold`}>
                        {category.label}
                      </div>
                      <span className="text-gray-100 font-black text-6xl md:text-8xl select-none group-hover:text-fuchsia-50 transition-colors duration-500 -rotate-6">
                        {category.id}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 group-hover:translate-x-2 transition-transform duration-500">
                      {category.title}
                    </h3>
                    <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
                      {category.description}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                      {category.skills.map((skill, i) => (
                        <li
                          key={skill}
                          className="flex items-center text-gray-700 text-lg font-medium group/skill cursor-default"
                        >
                          <span 
                            className="skill-dot w-3 h-3 rounded-full bg-linear-to-tr from-fuchsia-500 to-violet-500 mr-4 shadow-[0_0_10px_rgba(192,38,211,0.4)] group-hover/skill:scale-150 transition-transform duration-300"
                          ></span>
                          <span className="group-hover/skill:text-fuchsia-600 transition-colors duration-300 group-hover/skill:translate-x-1 inline-block">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
