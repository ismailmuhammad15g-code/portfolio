import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ExternalLink, Trophy, Activity, Calendar, X } from 'lucide-react'

export const Route = createFileRoute('/events')({
  component: EventsPage,
})

function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  return (
    <div className="min-h-screen relative z-0 text-primary selection:bg-accent selection:text-white pb-24">
      {/* Background overlay */}
      <div className="fixed inset-0 -z-10 bg-[url('/bg-mobile.jpg')] md:bg-[url('/bg-desktop.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-multiply pointer-events-none"></div>

      {/* Navigation / Header */}
      <header className="py-8 px-6 md:px-12 max-w-6xl mx-auto flex justify-between items-center border-b border-secondary/20">
        <a href="/" className="text-2xl font-serif tracking-wide text-primary hover:text-accent transition-colors">I.M.I</a>
        <nav className="hidden md:flex gap-8 font-sans text-sm tracking-widest uppercase text-secondary">
          <a href="/" className="hover:text-accent transition-colors">Back to Home</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-16">
        <section className="mb-24">
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-serif text-5xl md:text-7xl text-primary mb-6 uppercase tracking-tight">The Arena</h2>
            <div className="w-24 h-px bg-accent mx-auto md:mx-0 mb-6"></div>
            <p className="text-secondary font-light text-lg">Events, Hackathons, and Competitions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-surface p-8 rounded-[4px] border border-secondary/20 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all group flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Trophy size={100} />
              </div>
              <div className="flex gap-4 items-center mb-6 z-10">
                <div className="w-16 h-16 rounded-full bg-background border border-secondary/20 flex items-center justify-center p-2 shadow-sm">
                  <img src="/flavortownlogo.png" alt="FlavorTown" className="w-full h-full object-contain" />
                </div>
                <div className="w-16 h-16 rounded-full bg-background border border-secondary/20 flex items-center justify-center p-2 shadow-sm">
                  <img src="/flavortown-hackclublogo.png" alt="HackClub" className="w-full h-full object-contain" />
                </div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-2 z-10">FlavorTown</h3>
              <div className="flex items-center gap-2 text-sm text-accent mb-4 font-medium tracking-wide uppercase z-10">
                <Calendar size={14} />
                <span>2025 - 2026</span>
                <span className="mx-2 text-secondary/30">•</span>
                <span>Participant</span>
              </div>
              <p className="text-secondary font-light leading-relaxed mb-8 flex-grow z-10">
                Joined the FlavorTown hackathon. Built innovative tools and assets in a high-energy environment.
              </p>
              <button 
                onClick={() => setSelectedEvent({
                  title: "FlavorTown",
                  role: "Participant",
                  date: "2025 - 2026",
                  description: "Joined the FlavorTown hackathon. Built innovative tools and assets in a high-energy environment.",
                  link: "https://flavortown.hackclub.com/",
                  logos: ["/flavortownlogo.png", "/flavortown-hackclublogo.png"]
                })}
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors z-10 mt-auto border-t border-secondary/10 pt-4 cursor-pointer text-left"
              >
                View Event Details <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-12 text-center md:text-left">
            <h2 className="font-serif text-5xl md:text-7xl text-primary mb-6 uppercase tracking-tight">Proof of Work</h2>
            <div className="w-24 h-px bg-accent mx-auto md:mx-0 mb-6"></div>
            <p className="text-secondary font-light text-lg">Coding Statistics and Contributions</p>
          </div>
          
          <div className="bg-surface p-8 rounded-[4px] border border-secondary/20 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <Activity className="text-accent" size={28} />
                <h3 className="font-serif text-2xl text-primary">Activity Overview</h3>
              </div>
              <p className="text-secondary font-light leading-relaxed">
                Continuously pushing code, building tools, and crafting experiences. As a vibe coder and software engineer, I believe in making a tangible impact through my repositories and open-source contributions.
              </p>
            </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <img src="https://github-readme-stats.vercel.app/api?username=ismailmuhammad15g-code&show_icons=true&theme=transparent&title_color=1a1a1a&icon_color=d4a5a5&text_color=6b5b5b&bg_color=ffffff&hide_border=true" alt="GitHub Stats" className="max-w-full drop-shadow-sm border border-secondary/10 rounded-[4px] bg-background/50" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-[6px] border-accent py-8 px-6 bg-primary text-surface mt-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs tracking-widest uppercase text-gray-500 font-bold">
            © {new Date().getFullYear()} ISMAIL MOHAMMAD. ALL RIGHTS RESERVED.
          </p>
          <p className="font-sans text-xs tracking-widest uppercase text-gray-500 font-bold">
            BUILT WITH ZETSU ISMAIL MOHAMMAD.
          </p>
        </div>
      </footer>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-primary/80 backdrop-blur-sm cursor-pointer" 
            onClick={() => setSelectedEvent(null)}
          ></div>
          <div className="bg-surface relative z-10 w-full max-w-3xl rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setSelectedEvent(null)} 
              className="absolute top-4 right-4 text-secondary hover:text-accent transition-colors z-20 bg-surface/80 p-1 rounded-full"
            >
              <X size={24} />
            </button>
            
            <div className="overflow-y-auto p-8 md:p-12">
              <div className="flex flex-wrap gap-4 items-center mb-8">
                {selectedEvent.logos.map((logo: string, idx: number) => (
                  <div key={idx} className="w-20 h-20 rounded-full bg-background border border-secondary/20 flex items-center justify-center p-3 shadow-sm">
                    <img src={logo} alt="Event Logo" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">{selectedEvent.title}</h2>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-accent mb-8 font-medium tracking-wide uppercase">
                <span className="flex items-center gap-2"><Calendar size={16} /> {selectedEvent.date}</span>
                <span className="text-secondary/30 hidden sm:inline">•</span>
                <span className="flex items-center gap-2"><Activity size={16} /> {selectedEvent.role}</span>
              </div>
              
              <div className="w-16 h-px bg-accent mb-8"></div>
              
              <p className="text-secondary font-light leading-relaxed text-lg mb-12">
                {selectedEvent.description}
              </p>
              
              <a 
                href={selectedEvent.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 border border-primary px-8 py-3 rounded-[4px] hover:bg-primary hover:text-white transition-all shadow-[0_4px_0_0_#1a1a1a] hover:shadow-none hover:translate-y-1 font-medium"
              >
                Visit Official Website <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}