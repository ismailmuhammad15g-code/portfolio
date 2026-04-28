import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import { useAction } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { 
  User, 
  Calendar, 
  Languages,
  MonitorSmartphone,
  Globe,
  Code,
  Box,
  Database,
  Code2 as Github,
  Mail,
  MessageCircle as Twitter,
  Star,
  ExternalLink,
  Menu,
  X,
  ArrowUp
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: PortfolioPage,
})

function PortfolioPage() {
  const navigate = useNavigate()
  const [introStage, setIntroStage] = useState<'checking' | 'loading' | 'playing' | 'closing' | 'done'>('checking')
  const [animationData, setAnimationData] = useState<any>(null)
  const [isNavigatingToEvents, setIsNavigatingToEvents] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  const [githubStats, setGithubStats] = useState<any>(null)
  const getGithubStats = useAction(api.github.getGithubStats)

  const [landingAnimationData, setLandingAnimationData] = useState<any>(null)
  const [emailAnimationData, setEmailAnimationData] = useState<any>(null)
  const [meVideoLottieData, setMeVideoLottieData] = useState<any>(null)
  const [showVideo, setShowVideo] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro_v4')
    if (hasSeenIntro) {
      setIntroStage('done')
    } else {
      setIntroStage('loading')
      fetch('/intromain.json')
        .then((res) => res.json())
        .then((data) => {
          setAnimationData(data)
          setIntroStage('playing')
        })
        .catch((err) => {
          console.error("Failed to load intro", err)
          setIntroStage('done')
        })
    }

    getGithubStats().then((data) => {
      setGithubStats(data)
    }).catch(console.error)

    fetch('/landingPerson.json').then(res => res.json()).then(setLandingAnimationData).catch(console.error)
    fetch('/email.json').then(res => res.json()).then(setEmailAnimationData).catch(console.error)
    fetch('/mevideolottie.json').then(res => res.json()).then(setMeVideoLottieData).catch(console.error)
  }, [getGithubStats])

  const handleIntroComplete = () => {
    setIntroStage('closing')
    setTimeout(() => {
      setIntroStage('done')
      localStorage.setItem('hasSeenIntro_v4', 'true')
    }, 800)
  }

  const handleEventsNavigation = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    setIsNavigatingToEvents(true)
    setTimeout(() => {
      navigate({ to: '/events' })
    }, 2500)
  }

  if (introStage === 'checking') {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <div className="text-secondary font-serif italic text-xl animate-pulse">Preparing Experience...</div>
        </div>
      </div>
    )
  }

  if (introStage === 'loading' || introStage === 'playing') {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center transition-all duration-300">
        {introStage === 'playing' ? (
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="w-full h-full max-w-2xl max-h-2xl flex items-center justify-center">
              <Lottie 
                animationData={animationData} 
                loop={false} 
                onComplete={handleIntroComplete}
                className="w-full h-full"
              />
            </div>
            <button 
              onClick={handleIntroComplete}
              className="absolute bottom-10 px-6 py-2 border border-secondary/30 rounded-full text-secondary/70 hover:text-primary hover:border-primary hover:bg-surface transition-all text-sm tracking-widest uppercase cursor-pointer"
            >
              Skip Intro
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <div className="text-secondary font-serif italic text-xl animate-pulse">Loading Animation...</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen relative z-0 text-primary selection:bg-accent selection:text-white pb-24 overflow-hidden">
      {(introStage === 'closing' || (introStage === 'done' && !localStorage.getItem('cinemaDone'))) && (
        <div className="fixed inset-0 z-[1000] pointer-events-none flex flex-col justify-between">
          <div 
            className={`w-full bg-[#1a1a1a] ${introStage === 'closing' ? 'animate-eye-close-top' : 'animate-eye-open-top'} origin-top`}
            onAnimationEnd={() => { if (introStage === 'done') localStorage.setItem('cinemaDone', 'true') }}
          ></div>
          <div className={`w-full bg-[#1a1a1a] ${introStage === 'closing' ? 'animate-eye-close-bottom' : 'animate-eye-open-bottom'} origin-bottom`}></div>
        </div>
      )}

      <div className="fixed inset-0 -z-10 bg-[url('/bg-mobile.jpg')] md:bg-[url('/bg-desktop.jpg')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-multiply pointer-events-none"></div>

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden flex items-center">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-32 md:w-48 opacity-60 animate-fly object-contain"
          src="/flyingplane.webm"
        />
      </div>

      {isNavigatingToEvents && (
        <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center transition-all duration-300">
          <img src="/planeloading.gif" alt="Taking off..." className="w-64 md:w-96 object-contain" />
          <div className="mt-8 text-primary font-serif text-xl md:text-2xl tracking-widest animate-pulse uppercase">Taking off to Events...</div>
        </div>
      )}

      <header className="py-8 px-6 md:px-12 max-w-6xl mx-auto flex justify-between items-center border-b border-secondary/20 relative z-40">
        <h1 className="text-2xl font-serif tracking-wide text-primary">I.M.I</h1>
        
        <nav className="hidden md:flex gap-8 font-sans text-sm tracking-widest uppercase text-secondary items-center">
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
          <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
          <a href="#github" className="hover:text-accent transition-colors">GitHub</a>
          <button onClick={handleEventsNavigation} className="hover:text-accent transition-colors ml-4 font-bold text-lg cursor-pointer" title="More (Events)">...</button>
        </nav>

        <button 
          className="md:hidden text-primary hover:text-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-surface border-b border-secondary/20 shadow-xl py-6 px-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-2 z-50">
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-sans text-sm tracking-widest uppercase hover:text-accent">About</a>
            <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-sans text-sm tracking-widest uppercase hover:text-accent">Skills</a>
            <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-sans text-sm tracking-widest uppercase hover:text-accent">Projects</a>
            <a href="#github" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary font-sans text-sm tracking-widest uppercase hover:text-accent">GitHub</a>
            <button 
              onClick={handleEventsNavigation} 
              className="text-secondary font-sans text-sm tracking-widest uppercase hover:text-accent text-left"
            >
              Events
            </button>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-12 pb-24 pt-12">
        <section id="hero" className="py-20 md:py-32 flex flex-col md:flex-row gap-16 items-center">
          <div className="space-y-6 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-3 border border-secondary/30 px-4 py-2 rounded-full text-sm font-medium text-secondary mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Vibe Coder & Software Engineer
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Ismail<br/>
              <span className="text-secondary italic font-light">Muhammad Ibrahim</span>
            </h2>
            <p className="text-secondary font-light text-lg md:text-xl max-w-md mx-auto md:mx-0 leading-relaxed">
              Crafting elegant digital experiences with a French Parisian aesthetic and robust engineering.
            </p>
            <div className="flex gap-4 pt-4 justify-center md:justify-start">
              <a href="#projects" className="border border-primary px-8 py-3 rounded-[4px] hover:bg-primary hover:text-white transition-all shadow-[0_4px_0_0_#1a1a1a] hover:shadow-none hover:translate-y-1 font-medium tracking-wide">
                View Work
              </a>
              <a href="#about" className="px-8 py-3 rounded-[4px] text-secondary hover:text-primary transition-colors font-medium tracking-wide">
                Discover
              </a>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-md mx-auto md:ml-auto">
            <div 
              className="relative w-72 h-72 md:w-96 md:h-96 mx-auto rounded-full border border-secondary/20 overflow-hidden shadow-2xl group cursor-pointer"
              onMouseEnter={() => setShowVideo(true)}
              onMouseLeave={() => setShowVideo(false)}
              onClick={() => setShowVideo(!showVideo)}
            >
              <div className="absolute inset-0 bg-accent/10 mix-blend-multiply z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0"></div>
              
              {!showVideo ? (
                <img src="/me.jpg" alt="Ismail Muhammad Ibrahim" className="w-full h-full object-cover grayscale-[30%] contrast-[1.1] brightness-[1.05]" />
              ) : (
                <div className="w-full h-full bg-surface">
                  {meVideoLottieData ? (
                    <Lottie animationData={meVideoLottieData} loop={true} className="w-full h-full scale-[1.2]" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-background">
                      <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="absolute -bottom-6 -right-6 md:-right-12 bg-surface border border-secondary/20 p-4 shadow-xl rounded-[4px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Languages size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary font-bold tracking-widest uppercase">Trilingual</p>
                  <p className="font-serif text-primary">EN / FR / AR</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent my-12"></div>

        <section id="about" className="py-20 scroll-mt-24">
          <div className="mb-16 text-center md:text-left">
            <h3 className="text-4xl font-serif text-primary mb-4">Identity & Origins</h3>
            <div className="w-16 h-px bg-accent mx-auto md:mx-0"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface p-6 border border-secondary/10 shadow-sm rounded-[4px] hover:shadow-md transition-shadow">
              <User className="text-accent mb-4" size={24} />
              <p className="text-xs text-secondary font-bold tracking-widest uppercase mb-1">Name</p>
              <p className="font-serif text-xl text-primary">Ismail Muhammad Ibrahim</p>
            </div>
            <div className="bg-surface p-6 border border-secondary/10 shadow-sm rounded-[4px] hover:shadow-md transition-shadow">
              <Calendar className="text-accent mb-4" size={24} />
              <p className="text-xs text-secondary font-bold tracking-widest uppercase mb-1">Age</p>
              <p className="font-serif text-xl text-primary">20 Years Old</p>
            </div>
            <div className="bg-surface p-6 border border-secondary/10 shadow-sm rounded-[4px] hover:shadow-md transition-shadow">
              <Globe className="text-accent mb-4" size={24} />
              <p className="text-xs text-secondary font-bold tracking-widest uppercase mb-1">Nationality</p>
              <p className="font-serif text-xl text-primary">Libyan</p>
            </div>
            <div className="bg-surface p-6 border border-secondary/10 shadow-sm rounded-[4px] hover:shadow-md transition-shadow">
              <Code className="text-accent mb-4" size={24} />
              <p className="text-xs text-secondary font-bold tracking-widest uppercase mb-1">Role</p>
              <p className="font-serif text-xl text-primary">Vibe Coder / Dev</p>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 scroll-mt-24">
          <div className="mb-16 text-center md:text-left">
            <h3 className="text-4xl font-serif text-primary mb-4">Technical Expertise</h3>
            <div className="w-16 h-px bg-accent mx-auto md:mx-0"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-secondary/20 pb-4">
                <MonitorSmartphone className="text-accent" />
                <h4 className="font-serif text-2xl text-primary">Frontend</h4>
              </div>
              <ul className="space-y-3 font-light text-secondary">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> React & React Native</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Next.js & TanStack Start</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Tailwind CSS v4 & Framer Motion</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Lottie Animations</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-secondary/20 pb-4">
                <Database className="text-accent" />
                <h4 className="font-serif text-2xl text-primary">Backend</h4>
              </div>
              <ul className="space-y-3 font-light text-secondary">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Node.js & Express</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Convex (Real-time DB)</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Supabase & Firebase</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> API Integration & Webhooks</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-secondary/20 pb-4">
                <Box className="text-accent" />
                <h4 className="font-serif text-2xl text-primary">Tools & Workflow</h4>
              </div>
              <ul className="space-y-3 font-light text-secondary">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Git & GitHub Actions</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Vercel & E2B</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> Claude & AI Tooling</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent/50"></div> UI/UX Design Principles</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="github" className="py-20 scroll-mt-24">
          <div className="mb-16 text-center md:text-left flex items-center gap-4 justify-center md:justify-start">
            <Github className="text-primary" size={36} />
            <div>
              <h3 className="text-4xl font-serif text-primary mb-2">Live Contributions</h3>
              <div className="w-16 h-px bg-accent mx-auto md:mx-0"></div>
            </div>
          </div>

          {githubStats ? (
            <div className="bg-surface border border-secondary/10 shadow-sm rounded-[4px] p-8 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-8">
                <div>
                  <p className="text-xs text-secondary font-bold tracking-widest uppercase mb-1">GitHub Account</p>
                  <a href="https://github.com/ismailmuhammad15g-code" target="_blank" className="font-serif text-2xl text-primary hover:text-accent transition-colors flex items-center gap-2">
                    ismailmuhammad15g-code <ExternalLink size={18} />
                  </a>
                </div>
                <div className="text-center bg-background px-8 py-4 rounded-[4px] border border-secondary/10">
                  <p className="text-4xl font-serif text-accent mb-1">{githubStats.totalRepos}</p>
                  <p className="text-xs text-secondary font-bold tracking-widest uppercase">Public Repositories</p>
                </div>
              </div>

              {githubStats.latestRepo && (
                <div className="border-t border-secondary/10 pt-8 mt-4">
                  <p className="text-xs text-secondary font-bold tracking-widest uppercase mb-4">Latest Project</p>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h4 className="font-serif text-xl text-primary mb-2">{githubStats.latestRepo.name}</h4>
                      <p className="text-secondary font-light text-sm max-w-lg">{githubStats.latestRepo.description || "No description provided."}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium">
                      {githubStats.latestRepo.language && (
                        <span className="flex items-center gap-1 text-primary"><div className="w-2 h-2 rounded-full bg-accent"></div> {githubStats.latestRepo.language}</span>
                      )}
                      <span className="flex items-center gap-1 text-secondary"><Star size={16} /> {githubStats.latestRepo.stars}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-surface border border-secondary/10 shadow-sm rounded-[4px] p-12 text-center flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-secondary font-serif italic">Fetching live GitHub metrics...</p>
            </div>
          )}
        </section>

      </main>

      <footer className="border-t border-secondary/20 pt-16 pb-8 px-6 bg-surface mt-12 relative z-10">
        <div className="absolute -top-[120px] right-4 md:right-12 z-20 pointer-events-none">
          <img src="/catjumping.gif" alt="Jumping Cat" className="w-32 md:w-48 object-contain mix-blend-multiply opacity-80" />
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif text-primary mb-2">I.M.I</h2>
            <p className="text-secondary font-light text-sm tracking-wide">Vibe Coder & Software Engineer</p>
          </div>
          
          <div className="flex gap-6">
            <a href="mailto:contact@example.com" className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-surface transition-all">
              <Mail size={18} />
            </a>
            <a href="https://github.com/ismailmuhammad15g-code" className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-surface transition-all">
              <Github size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-secondary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-surface transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs tracking-widest uppercase text-secondary font-bold">
            © {new Date().getFullYear()} ISMAIL MOHAMMAD. ALL RIGHTS RESERVED.
          </p>
          <p className="font-sans text-xs tracking-widest uppercase text-secondary font-bold flex items-center gap-2">
            BUILT WITH VIBE <span className="text-accent">❤️</span>
          </p>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-surface rounded-full shadow-xl flex items-center justify-center hover:bg-accent transition-colors z-50 animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
          aria-label="Go to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  )
}
