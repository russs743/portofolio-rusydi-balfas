"use client";

import { projectsData } from "@/data/projectsData";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Github, Search, Filter } from "lucide-react";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(projectsData.flatMap((project) => project.tags))
  ).sort();

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <Link 
          href="/"
          className="group flex items-center gap-2 text-sm font-medium tracking-widest uppercase overflow-hidden"
        >
          <div className="relative w-5 h-5 overflow-hidden">
            <ArrowLeft className="w-full h-full transition-transform duration-500 group-hover:-translate-x-full" />
            <ArrowLeft className="absolute top-0 left-full w-full h-full transition-transform duration-500 group-hover:-translate-x-full" />
          </div>
          <span>Back to Home</span>
        </Link>
        <div className="text-sm font-medium tracking-[0.3em] uppercase opacity-50">
          Digital Archive / 2026
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] mb-12">
            Selected <br />
            <span className="text-white/20">Artifacts</span>
          </h1>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-16">
          <div className="relative w-full md:w-[400px] group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all border ${
                selectedTag === null
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
              }`}
            >
              All
            </button>
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest transition-all border ${
                  selectedTag === tag
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
            >
              <Link href={`/projects/${project.id}`} className="block relative aspect-video overflow-hidden rounded-3xl bg-white/5 border border-white/10 transition-all duration-700 group-hover:border-white/30 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2 leading-none">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/50 line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] group/btn">
                        <span className="relative overflow-hidden inline-block">
                          <span className="inline-block transition-transform duration-500 group-hover/btn:-translate-y-full">View Project</span>
                          <span className="absolute top-0 left-0 inline-block transition-transform duration-500 translate-y-full group-hover/btn:translate-y-0">View Project</span>
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/20 text-xl font-medium uppercase tracking-[0.5em]">No artifacts found</p>
          </div>
        )}
      </section>

      {/* Custom Cursor / Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/2 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/2 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
