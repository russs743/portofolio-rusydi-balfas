import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton";

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 mix-blend-difference">
        <BackButton />
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[90vh] w-full flex items-end pb-20 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-50 scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/70 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-5xl">
          <p className="text-white/50 tracking-[0.4em] uppercase text-xs md:text-sm mb-6">
            {project.folderName}
          </p>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9]">
            {project.title.replace(/-/g, ' ')}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 relative z-10 bg-[#050505]">
        {/* Left Column: Metadata */}
        <div className="md:col-span-4 flex flex-col gap-12">
          <div>
            <h3 className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-4">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.length > 0 ? project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs border border-white/10 rounded-full bg-white/5 text-white/70">
                  {tag}
                </span>
              )) : (
                <span className="text-white/30 text-xs">No tags available</span>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-4">Live Link</h3>
            <a 
              href={project.link !== "#" ? project.link : "#"} 
              target={project.link !== "#" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-medium border-b border-white/30 pb-1 transition-colors ${project.link !== "#" ? "hover:border-white text-white" : "text-white/30 border-transparent cursor-not-allowed"}`}
            >
              {project.link !== "#" ? "Visit Website ↗" : "Internal Web"}
            </a>
          </div>
        </div>

        {/* Right Column: Description & Media */}
        <div className="md:col-span-8 flex flex-col gap-16">
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-2xl md:text-4xl font-light leading-relaxed text-white/90">
              {project.description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')} 
            </h2>
          </div>
          
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
            <img 
              src={project.image} 
              alt={`${project.title} preview`}
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-white/10 flex items-center justify-center bg-[#050505]">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase">
          Rusydi Balfas © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
