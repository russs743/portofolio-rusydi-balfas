"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !container.current ||
        !imageRef.current ||
        !titleRef.current ||
        !sectionRef.current ||
        !descRef.current
      )
        return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 1,
            pin: true,
          },
        });

        // DESKTOP PHASE 1: Reveal (Silhouette)
        tl.fromTo(
          titleRef.current,
          { filter: "blur(0px)", opacity: 1, scale: 1, y: 0 },
          {
            y: -100,
            opacity: 0.4,
            filter: "blur(12px)",
            scale: 0.95,
            ease: "power1.inOut",
          },
          0.1,
        );
        tl.to(subtitleRef.current, { y: -50, opacity: 0, ease: "none" }, 0);
        tl.fromTo(
          imageRef.current,
          { y: "100%", scale: 0.9, opacity: 0, filter: "brightness(0)" },
          {
            y: "0%",
            scale: 1,
            opacity: 1,
            filter: "brightness(0)",
            ease: "power2.out",
          },
          0.1,
        );

        // DESKTOP PHASE 2: Shift Left & Blur Title & Show Bio
        tl.to(
          imageRef.current,
          {
            x: "-22vw",
            scale: 0.9,
            filter: "brightness(0.8)",
            ease: "power2.inOut",
          },
          1,
        );
        tl.to(
          titleRef.current,
          {
            opacity: 0.05,
            filter: "blur(20px)",
            y: -150,
            ease: "power2.inOut",
          },
          1,
        );
        tl.fromTo(
          descRef.current,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out" },
          1.2,
        );
      });

      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=250%",
            scrub: 1,
            pin: true,
          },
        });

        // MOBILE PHASE 1: Reveal (Silhouette)
        tl.fromTo(
          titleRef.current,
          { filter: "blur(0px)", opacity: 1, scale: 1, y: 0 },
          {
            y: -50,
            opacity: 0.4,
            filter: "blur(8px)",
            scale: 0.8,
            ease: "power1.inOut",
          },
          0.1,
        );
        tl.to(subtitleRef.current, { y: -30, opacity: 0, ease: "none" }, 0);
        tl.fromTo(
          imageRef.current,
          { y: "100%", scale: 0.8, opacity: 0, filter: "brightness(0)" },
          {
            y: "0%",
            scale: 0.9,
            opacity: 1,
            filter: "brightness(0)",
            ease: "power2.out",
          },
          0.1,
        );

        // MOBILE PHASE 2: Shift Up & Show Bio
        tl.to(
          imageRef.current,
          {
            y: "-15vh",
            scale: 0.7,
            filter: "brightness(0.8)",
            ease: "power2.inOut",
          },
          1,
        );
        tl.to(
          titleRef.current,
          {
            opacity: 0.05,
            filter: "blur(10px)",
            y: -100,
            ease: "power2.inOut",
          },
          1,
        );
        tl.fromTo(
          descRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out" },
          1.2,
        );
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden"
    >
      <div
        ref={container}
        className="relative h-full w-full flex flex-col items-center justify-start pt-[12vh]"
      >
        {/* Title Content */}
        <div className="text-center z-10 relative flex flex-col items-center w-full mt-[8vh] md:mt-[4vh]">
          {/* Colorful Animated Glowing Orbs for Dark Theme */}
          <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-violet-600/30 blur-[120px] rounded-full pointer-events-none -z-20 mix-blend-screen" />
          <div className="absolute top-[30%] right-[20%] w-[35vw] h-[35vw] bg-fuchsia-600/30 blur-[120px] rounded-full pointer-events-none -z-20 mix-blend-screen" />
          <div className="absolute bottom-[10%] left-[40%] w-[50vw] h-[50vw] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none -z-20 mix-blend-screen" />

          {/* Subtle Dot Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[24px_24px] opacity-50 pointer-events-none -z-10" />

          {/* Top Subtitle */}
          <p className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] text-white/90 uppercase mb-6 md:mb-10 select-none">
            Frontend Developer and Visual Architect.
          </p>

          {/* Main Title Group */}
          <div
            ref={titleRef}
            className="flex flex-col items-center relative leading-none"
          >
            {/* First Name (Solid) */}
            <h1 className="text-[22vw] md:text-[16vw] font-black tracking-[-0.04em] text-white uppercase select-none m-0 leading-[0.85]">
              RUSYDI
            </h1>

            {/* Badge (Overlapping) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white text-fuchsia-600 text-[6px] md:text-[8px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-[2px] select-none shadow-md whitespace-nowrap">
              SCROLL TO EXPLORE
            </div>

            {/* Last Name (Outline with Dashed Border) */}
            <div className="relative border border-dashed border-white/50 p-2 mt-2">
              <h1
                className="text-[22vw] md:text-[16vw] font-black tracking-[-0.04em] text-transparent uppercase select-none m-0 leading-[0.85]"
                style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 0.8)" }}
              >
                BALFAS
              </h1>
            </div>
          </div>

          {/* Bottom Text */}
          <p
            ref={subtitleRef}
            className="text-sm md:text-lg font-medium text-white/90 mt-8 md:mt-12 select-none drop-shadow-sm"
          >
            Precision structure, bold creative vision.
          </p>
        </div>

        {/* Hero Image Container */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4 md:px-[5vw]">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              ref={imageRef}
              src="https://ik.imagekit.io/bhiaoqt1n/rusdi%20balfas2.png"
              alt="Rusydi"
              className="h-[60vh] lg:h-[95vh] w-auto object-contain object-bottom will-change-transform"
            />

            {/* Description Container */}
            <div
              ref={descRef}
              className="absolute bottom-[10vh] lg:bottom-auto lg:top-[55%] lg:-translate-y-1/2 lg:right-[5vw] xl:right-[10vw] w-[90vw] lg:w-[40vw] text-center lg:text-left pointer-events-auto opacity-0"
            >
              <h3 className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-muted mb-4 lg:mb-8">
                Introduction
              </h3>
              <p className="text-base md:text-xl lg:text-2xl font-light leading-relaxed text-white/90">
                <span className="text-white font-medium">
                  Frontend Developer
                </span>{" "}
                with experience in developing internal dashboards, website
                management systems, HR systems, and event ticketing platforms
                using technologies such as{" "}
                <span className="text-white font-medium">
                  Next.js, React.js, Angular, and Node.js
                </span>
                . Experienced in API integration, responsive web development,
                UI/UX design, and technical support for office operations and
                events. Passionate about growing as a Frontend Developer by
                building interactive, responsive, and user-friendly web
                applications.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Gradient overlay to blend image */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-linear-to-t from-[#050505] to-transparent z-30 pointer-events-none" />
      </div>
    </div>
  );
}
