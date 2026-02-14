
import React, { useState, useEffect } from 'react';
import { HeartScene } from './components/Heart3D';
import { AppSection } from './types';
import { MILESTONES, RELATIONSHIP_START } from './constants';
import { Heart, Calendar, MessageCircle, ArrowRight, Undo2, Send } from 'lucide-react';

const App: React.FC = () => {
  const [section, setSection] = useState<AppSection>(AppSection.INTRO);
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const diff = new Date('2026-02-14').getTime() - RELATIONSHIP_START.getTime();
    setDaysTogether(Math.floor(diff / (1000 * 60 * 60 * 24)));
    
    // Scroll to top on section change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section]);

  const handleWhatsAppForgive = () => {
    const message = encodeURIComponent("okay Aadi let's start Again I love you so much 🎀❣️");
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="relative min-h-screen text-white bg-[#0a0505] overflow-x-hidden selection:bg-pink-500/30">
      {/* 3D Background - Fixed so it doesn't scroll */}
      <div className="fixed inset-0 z-0">
        <HeartScene />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen px-5 pb-32 pt-10 max-w-lg mx-auto">
        
        {/* Content Render Logic */}
        <main className="w-full flex-grow flex flex-col items-center">
          
          {section === AppSection.INTRO && (
            <div className="text-center w-full mt-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <span className="inline-block px-4 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-red-500/30">
                Valentine's Day 2026
              </span>
              <h2 className="font-romance text-6xl text-transparent bg-clip-text bg-gradient-to-br from-red-400 via-pink-400 to-red-600 drop-shadow-[0_10px_10px_rgba(220,38,38,0.3)] leading-tight">
                Forever Aayu
              </h2>
              <div className="mt-6 space-y-6">
                <div className="glass rounded-3xl p-6 py-8 border-white/5 shadow-2xl">
                   <p className="text-4xl font-bold text-white mb-1">{daysTogether}</p>
                   <p className="text-sm font-medium text-pink-200/60 uppercase tracking-tighter">Beautiful Days Together</p>
                </div>
                
                <p className="text-lg font-cursive text-pink-100/90 italic leading-relaxed px-4">
                  "Every heartbeat of mine since November 2024 has had your name on it."
                </p>

                <div className="flex flex-col gap-4 pt-4">
                  <button 
                    onClick={() => setSection(AppSection.JOURNEY)}
                    className="group relative w-full py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl font-bold shadow-2xl shadow-red-900/40 active:scale-95 transition-all"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Relive Our Memories <ArrowRight size={18} />
                    </span>
                  </button>
                  <button 
                    onClick={() => setSection(AppSection.APOLOGY)}
                    className="w-full py-5 glass border-white/10 rounded-2xl font-bold active:scale-95 transition-all text-white/90"
                  >
                    I Have Something To Say
                  </button>
                </div>
              </div>
            </div>
          )}

          {section === AppSection.JOURNEY && (
            <div className="w-full space-y-8 animate-in fade-in duration-700">
              <header className="text-center mb-10">
                <h3 className="font-romance text-5xl text-red-400">Our Timeline</h3>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-2">Nov 2024 — Present</p>
              </header>
              
              <div className="relative border-l border-red-500/20 ml-3 space-y-10 py-2">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="relative pl-8 animate-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${i * 150}s` }}>
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full shadow-lg border-2 border-[#0a0505] ${m.type === 'love' ? 'bg-red-500' : m.type === 'challenge' ? 'bg-white/20' : 'bg-pink-400'}`}></div>
                    <div className="glass p-5 rounded-2xl border-white/5 shadow-xl">
                      <span className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest">{m.date}</span>
                      <h4 className="text-md font-bold mt-1 text-white/90">{m.title}</h4>
                      <p className="mt-2 text-white/60 text-xs leading-relaxed font-light">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex flex-col gap-3">
                <button 
                  onClick={() => setSection(AppSection.APOLOGY)}
                  className="w-full py-5 bg-red-600 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
                >
                  I'm So Sorry, Aayu
                </button>
                <button 
                  onClick={() => setSection(AppSection.INTRO)}
                  className="w-full py-4 glass border-white/5 rounded-2xl font-semibold text-xs text-white/40 flex items-center justify-center gap-2"
                >
                  <Undo2 size={14} /> Back to Start
                </button>
              </div>
            </div>
          )}

          {section === AppSection.APOLOGY && (
            <div className="w-full space-y-8 animate-in zoom-in-95 duration-500">
              <div className="glass p-8 rounded-[2.5rem] border-red-500/20 shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                <h3 className="font-romance text-5xl text-red-400 mb-6 italic">Aayu...</h3>
                
                <div className="space-y-6 text-white/80 font-light text-base leading-relaxed text-left">
                  <p>
                    I know I messed up yesterday. February 13th will haunt me because I let a moment of anger overshadow a year and a half of love.
                  </p>
                  <p>
                    You are my best friend, my Aayu, the only person who truly knows my soul. I'm sorry for everything I said and for the silence that followed.
                  </p>
                  <p>
                    Since November 2024, you've been my light. I don't want a single day without you, especially not today.
                  </p>
                </div>
                
                <div className="my-8 p-4 rounded-2xl bg-pink-500/5 border border-pink-500/10">
                  <p className="text-pink-300 font-cursive text-xl italic">
                    "okay Aadi let's start Again I love you so much 🎀❣️"
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <button 
                    onClick={handleWhatsAppForgive}
                    className="w-full py-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 rounded-2xl font-bold shadow-2xl shadow-green-900/20 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all text-white"
                  >
                    <span className="flex items-center gap-2 text-lg">
                      Okay I forgive you <Heart size={20} fill="white" />
                    </span>
                    <span className="text-[10px] opacity-80 font-normal uppercase tracking-widest">Send this to Aadi on WhatsApp</span>
                  </button>
                  
                  <button 
                    onClick={() => setSection(AppSection.INTRO)}
                    className="w-full py-4 text-xs font-bold text-white/40 uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <Undo2 size={14} /> Nevermind, go back
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Mobile-First Bottom Navigation Bar */}
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm flex items-center justify-around p-2 glass rounded-3xl z-50 shadow-2xl border-white/10">
          <button 
            onClick={() => setSection(AppSection.INTRO)}
            className={`flex flex-col items-center gap-1 p-3 px-5 rounded-2xl transition-all ${section === AppSection.INTRO ? 'bg-red-600 text-white' : 'text-white/40'}`}
          >
            <Heart size={20} fill={section === AppSection.INTRO ? "white" : "none"} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
          </button>
          <button 
            onClick={() => setSection(AppSection.JOURNEY)}
            className={`flex flex-col items-center gap-1 p-3 px-5 rounded-2xl transition-all ${section === AppSection.JOURNEY ? 'bg-red-600 text-white' : 'text-white/40'}`}
          >
            <Calendar size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Story</span>
          </button>
          <button 
            onClick={() => setSection(AppSection.APOLOGY)}
            className={`flex flex-col items-center gap-1 p-3 px-5 rounded-2xl transition-all ${section === AppSection.APOLOGY ? 'bg-red-600 text-white' : 'text-white/40'}`}
          >
            <MessageCircle size={20} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Heart</span>
          </button>
        </nav>

        {/* Floating Heart Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute animate-pulse opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 6}s`
              }}
            >
              <Heart size={16 + Math.random() * 20} className="text-red-500" fill="currentColor" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
