"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronDown, FileJson, FileText, Code2, Link as LinkIcon, Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [activeTab, setActiveTab] = useState<"contact.json" | "README.md">("contact.json");
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section 
      className="w-full bg-[#050505] py-24 px-4 md:px-8 min-h-[90vh] flex items-center justify-center font-mono relative"
      style={{ perspective: "1500px" }}
    >
      
      {/* Background ambient code snippets */}
      <div className="absolute inset-0 pointer-events-none opacity-5 text-green-500 font-mono text-xs p-8 overflow-hidden select-none hidden lg:block">
        <p>import {'{ Message }'} from '@rusydi/core';</p>
        <br/>
        <p>const handleContact = (data) ={'>'} {'{'}</p>
        <p>&nbsp;&nbsp;console.log('Sending message.', data);</p>
        <p>&nbsp;&nbsp;return api.post('/v1/contact', data);</p>
        <p>{'};'}</p>
      </div>

      {/* VS Code Window Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotateX: 15, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.1
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-5xl bg-[#1e1e1e] border border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden relative z-10"
        style={{ height: "650px", maxHeight: "80vh" }}
      >
        {/* Title Bar */}
        <div className="h-10 bg-[#323233] flex items-center justify-between px-4 select-none shrink-0 border-b border-[#1e1e1e]">
          <div className="flex space-x-2 w-1/3">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-zinc-400 text-xs text-center w-1/3 truncate">Rusydi_Portfolio - Visual Studio Code</div>
          <div className="w-1/3"></div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className={`hidden md:flex flex-col bg-[#252526] border-r border-zinc-800 transition-all duration-300 ${isExplorerOpen ? "w-56" : "w-12"}`}>
            {/* Sidebar Activity Bar */}
            <div className="h-full w-12 border-r border-zinc-800 flex flex-col items-center py-4 absolute left-0 bg-[#333333] z-20">
              <button onClick={() => setIsExplorerOpen(!isExplorerOpen)} className="text-zinc-400 hover:text-white mb-6">
                <FileText className="w-6 h-6" />
              </button>
              <div className="text-zinc-500 hover:text-white cursor-not-allowed mb-6"><Code2 className="w-6 h-6" /></div>
            </div>
            
            {/* Explorer Content */}
            <div className={`pl-12 w-full h-full flex flex-col ${isExplorerOpen ? "opacity-100" : "opacity-0 invisible"} transition-opacity duration-300`}>
              <div className="px-4 py-2 text-[11px] text-zinc-400 tracking-wider font-bold">EXPLORER</div>
              
              <div className="flex flex-col text-sm text-zinc-300 mt-2">
                <div className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer text-white">
                  <ChevronDown className="w-4 h-4 mr-1" />
                  <span className="font-bold">PORTFOLIO</span>
                </div>
                
                <div className="pl-6 flex flex-col">
                  <div className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer">
                    <ChevronRight className="w-4 h-4 mr-1 text-zinc-500" />
                    <span>components</span>
                  </div>
                  <div className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer">
                    <ChevronRight className="w-4 h-4 mr-1 text-zinc-500" />
                    <span>api</span>
                  </div>
                  
                  {/* Files */}
                  <div 
                    onClick={() => setActiveTab("contact.json")}
                    className={`flex items-center px-2 py-1 cursor-pointer mt-1 ${activeTab === "contact.json" ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}`}
                  >
                    <FileJson className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>contact.json</span>
                  </div>
                  
                  <div 
                    onClick={() => setActiveTab("README.md")}
                    className={`flex items-center px-2 py-1 cursor-pointer ${activeTab === "README.md" ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"}`}
                  >
                    <FileText className="w-4 h-4 mr-2 text-blue-400" />
                    <span>README.md</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden ml-0 md:ml-0 relative">
             {/* Tabs */}
             <div className="flex bg-[#252526] h-10 shrink-0 overflow-x-auto custom-scrollbar">
               <button 
                 onClick={() => setActiveTab("contact.json")} 
                 className={`flex items-center px-4 h-full border-r border-zinc-800 space-x-2 shrink-0 ${activeTab === 'contact.json' ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' : 'text-zinc-500 hover:bg-[#2d2d2d]'}`}
               >
                 <FileJson className="w-4 h-4 text-yellow-400" />
                 <span className="text-sm">contact.json</span>
               </button>
               <button 
                 onClick={() => setActiveTab("README.md")} 
                 className={`flex items-center px-4 h-full border-r border-zinc-800 space-x-2 shrink-0 ${activeTab === 'README.md' ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' : 'text-zinc-500 hover:bg-[#2d2d2d]'}`}
               >
                 <FileText className="w-4 h-4 text-blue-400" />
                 <span className="text-sm">README.md</span>
               </button>
             </div>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                
                {/* CONTACT.JSON TAB */}
                {activeTab === 'contact.json' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-sm md:text-base max-w-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Code Lines Container */}
                      <div className="flex">
                        {/* Line Numbers */}
                        <div className="text-zinc-600 text-right pr-6 select-none hidden sm:block">
                          1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15
                        </div>
                        
                        {/* Code Content */}
                        <div className="flex-1 text-zinc-300">
                          <div>
                            <span className="text-[#c586c0]">import</span> {'{'} <span className="text-[#4fc1ff]">Message</span> {'}'} <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">'@portfolio/api'</span>;
                          </div>
                          <br/>
                          <div>
                            <span className="text-[#569cd6]">const</span> <span className="text-[#4fc1ff]">clientInfo</span> <span className="text-[#d4d4d4]">=</span> {'{'}
                          </div>
                          
                          <div className="pl-4 md:pl-8 space-y-4 my-4 border-l border-zinc-700/50">
                            {/* Name Input */}
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <label className="text-[#9cdcfe] w-24 shrink-0">"name"<span className="text-zinc-400">:</span></label>
                              <div className="flex items-center text-[#ce9178] flex-1">
                                <span>"</span>
                                <input 
                                  type="text" 
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                  className="bg-transparent border-b border-zinc-700/30 focus:border-[#007acc] outline-none w-full text-[#ce9178] placeholder-zinc-600 px-1 py-0.5"
                                  placeholder="John Doe"
                                  required
                                />
                                <span>",</span>
                              </div>
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col sm:flex-row sm:items-center">
                              <label className="text-[#9cdcfe] w-24 shrink-0">"email"<span className="text-zinc-400">:</span></label>
                              <div className="flex items-center text-[#ce9178] flex-1">
                                <span>"</span>
                                <input 
                                  type="email" 
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  className="bg-transparent border-b border-zinc-700/30 focus:border-[#007acc] outline-none w-full text-[#ce9178] placeholder-zinc-600 px-1 py-0.5"
                                  placeholder="john@example.com"
                                  required
                                />
                                <span>",</span>
                              </div>
                            </div>

                            {/* Message Input */}
                            <div className="flex flex-col">
                              <label className="text-[#9cdcfe] mb-2 shrink-0">"message"<span className="text-zinc-400">:</span></label>
                              <div className="flex text-[#ce9178]">
                                <span>"</span>
                                <textarea 
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  className="bg-zinc-800/30 border border-zinc-700/50 rounded-md focus:border-[#007acc] outline-none w-full h-24 text-[#ce9178] placeholder-zinc-600 p-2 resize-none mx-2 leading-relaxed"
                                  placeholder="Let's build something awesome..."
                                  required
                                />
                                <span className="self-end">"</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>{'};'}</div>
                          <br/>
                          <div>
                            <span className="text-[#6a9955]">// Execute transmission script</span>
                          </div>
                          
                          {/* Submit Button */}
                          <div className="mt-2">
                            <button 
                              type="submit" 
                              disabled={status === "loading" || status === "success"}
                              className="text-zinc-400 hover:text-white flex items-center transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <span className="text-[#c586c0] mr-2">await</span>
                              <span className="text-[#dcdcaa]">Message</span>
                              <span className="text-zinc-400">.</span>
                              <span className="text-[#dcdcaa]">send</span>
                              <span className="text-[#ffd700]">(</span>
                              <span className="text-[#4fc1ff]">clientInfo</span>
                              <span className="text-[#ffd700]">)</span>
                              <span className="text-zinc-400">;</span>
                              
                              <span className="ml-4 text-xs">
                                {status === "idle" && <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">▶ Run Script</span>}
                                {status === "loading" && <span className="text-yellow-500 animate-pulse">Running...</span>}
                                {status === "success" && <span className="text-green-500">Success!</span>}
                                {status === "error" && <span className="text-red-500">Failed!</span>}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* README.MD TAB */}
                {activeTab === 'README.md' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-sans text-zinc-300 max-w-2xl prose prose-invert">
                    <h1 className="text-4xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">Let's Talk! 🚀</h1>
                    
                    <p className="text-lg text-zinc-400 mb-8">
                      I'm always open to discussing product design work, software engineering, or partnership opportunities.
                    </p>

                    <h2 className="text-2xl font-semibold text-white mb-4">Contact Details</h2>
                    <ul className="space-y-3 mb-10 list-none pl-0">
                      <li className="flex items-center">
                        <span className="bg-zinc-800 p-2 rounded-md mr-4"><Mail className="w-5 h-5 text-cyan-400" /></span>
                        <a href="mailto:rusydi@example.com" className="text-blue-400 hover:underline">rusydibalfas@gmail.com</a>
                      </li>
                      <li className="flex items-center">
                        <span className="bg-zinc-800 p-2 rounded-md mr-4"><MapPin className="w-5 h-5 text-red-400" /></span>
                        <span>Bogor, West Java, Region_ID: 16680</span>
                      </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-white mb-4">Social Links</h2>
                    <div className="flex space-x-4">
                      <a href="https://www.linkedin.com/in/rusydi-balfas/" className="flex items-center bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors">
                        <Linkedin className="w-5 h-5 mr-2" /> LinkedIn
                      </a>
                      <a href="https://github.com/russs743" className="flex items-center bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors">
                        <Github className="w-5 h-5 mr-2" /> GitHub
                      </a>
                      <a href="https://www.instagram.com/rusydibalfas_/" className="flex items-center bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors">
                        <Instagram className="w-5 h-5 mr-2" /> Instagram
                      </a>
                    </div>
                  </motion.div>
                )}

             </div>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-[#007acc] shrink-0 flex items-center px-3 text-white text-xs space-x-4">
          <span className="flex items-center cursor-pointer hover:bg-white/20 px-1 rounded"><ChevronRight className="w-3 h-3 mr-1"/> main*</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded flex items-center"><Code2 className="w-3 h-3 mr-1"/> {activeTab === 'contact.json' ? 'TypeScript' : 'Markdown'}</span>
          <span className="cursor-pointer hover:bg-white/20 px-1 rounded">UTF-8</span>
          <span className="ml-auto hidden sm:block">Prettier: ✓</span>
        </div>
      </motion.div>
    </section>
  )
}
