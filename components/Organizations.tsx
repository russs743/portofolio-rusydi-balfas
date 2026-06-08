"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const organizations = [
  {
    name: "Socio Techno",
    role: "Chairman",
    period: "06/2024 – 12/2024",
    location: "Bogor",
    description: "Saya dipercaya untuk bertanggung jawab penuh di acara Socio Techno 2024. Socio Techno adalah acara seminar yang diselenggarakan oleh Himalkom IPB, tetapi dalam masa kepemimpinan saya, Socio Techno sudah berevolusi, karena saya berhasil menggabungkan kinerja 2 divisi yaitu divisi media branding dan juga divisi entrepreneur, acara ini menjadi acara podcast kewirausahaan dan juga desain, bisa dibilang versi upgrade dari Socio Techno sebelumnya karna pembawaannya yang fun tetapi tetap edukatif.",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    name: "ITTODAY",
    role: "Vice Chairman (competition leader)",
    period: "01/2024 – 10/2024",
    location: "Bogor, Indonesia",
    description: "Saya telah berperan sebagai staff di ITTODAY 2023 sebagai staff kompetisi dan untuk ITTODAY 2024 saya menjabat sebagai competition leader dan saya bertanggung jawab atas keseluruhan kompetisi yang ada di ITTODAY 2024.",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    name: "Himalkom",
    role: "Staff of entrepreneur",
    period: "01/2024 – 12/2024",
    location: "Bogor, Indonesia",
    description: "Saya berperan sebagai staff entrepreneur yang bertanggung jawab sebagai pengelola keuangan Himalkom dan juga menaikkan pemasukan Himalkom.",
    color: "from-orange-500/20 to-yellow-500/20"
  },
  {
    name: "CPSC 2023",
    role: "Public relations",
    period: "2023 – 2023",
    location: "Bogor, Indonesia",
    description: "Saya bertanggung jawab sebagai staff hubungan masyarakat yang akan memegang seluruh akun media sosial CPSC.",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    name: "Eid al-Fitr 2022 committee",
    role: "Chairman",
    period: "2022",
    location: "Bogor, Indonesia",
    description: "Saya bertanggung jawab dalam pendistribusian zakat fitrah dan mal di Masjid Al Mardhiyyah.",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    name: "Agriinformatic",
    role: "Event Coordinator",
    period: "2023",
    location: "Bogor, Indonesia",
    description: "Saya bertanggung jawab terhadap keberlangsungan acara dari mulai rundown acara, dan sampai di hari H saya memastikan bahwa semua rangkaian acara berjalan sesuai dengan jadwal.",
    color: "from-indigo-500/20 to-blue-500/20"
  }
];

export default function Organizations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Background Title Parallax
    gsap.to(titleRef.current, {
      y: 100,
      opacity: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Cards Reveal
    const cards = gsap.utils.toArray<HTMLElement>(".org-card");
    cards.forEach((card) => {
      gsap.fromTo(card,
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.9,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative py-32 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] overflow-hidden perspective-2000"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Massive Background Title */}
      <h2 
        ref={titleRef}
        className="absolute top-20 left-1/2 -translate-x-1/2 text-[15vw] font-black text-white/3 uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap"
      >
        Organizations
      </h2>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col gap-1 w-full mb-20">
          <span className="text-blue-500 font-medium tracking-[0.3em] uppercase text-sm">Experience</span>
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Organizations</h3>
          <div className="w-20 h-1 bg-blue-500 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {organizations.map((org, i) => (
            <div 
              key={i}
              className="org-card group relative bg-white/2 border border-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 hover:bg-white/4 transition-all duration-500 flex flex-col hover:translate-z-10 hover:-rotate-x-2 hover:rotate-y-2 preserve-3d"
            >
              {/* Gradient Accent */}
              <div className={`absolute inset-0 bg-linear-to-br ${org.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`} />
              
              <div className="relative z-10">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      {org.name}
                    </h4>
                    <p className="text-white/60 font-medium italic mt-1">{org.role}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-mono text-blue-500 block">{org.period}</span>
                    <span className="text-xs text-white/40 uppercase tracking-widest">{org.location}</span>
                  </div>
                </div>
                
                <p className="text-white/70 leading-relaxed text-sm md:text-base line-clamp-6 group-hover:line-clamp-none transition-all duration-500">
                  {org.description}
                </p>

                <div className="mt-8 flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-px bg-white/30" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Details</span>
                </div>
              </div>

              {/* Numbering */}
              <span className="absolute bottom-8 right-8 text-5xl font-black text-white/2 group-hover:text-white/5 transition-colors pointer-events-none">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
