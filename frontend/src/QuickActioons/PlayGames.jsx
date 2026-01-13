import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- MINI GAME: ZEN CANVAS ---
const ZenCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 8 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsla(${Math.random() * 40 + 200}, 70%, 60%, 0.8)`;
        this.life = 100;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.1;
        this.life -= 0.5;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update(); p.draw();
        if (p.life <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    };
    animate();

    const addParticles = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      for(let i=0; i<2; i++) particles.push(new Particle(e.clientX - rect.left, e.clientY - rect.top));
    };

    canvas.addEventListener('mousemove', addParticles);
    return () => window.removeEventListener('resize', resize);
  }, [isDrawing]);

  return (
    <canvas 
      ref={canvasRef} 
      onMouseDown={() => setIsDrawing(true)} 
      onMouseUp={() => setIsDrawing(false)}
      className="w-full h-[400px] rounded-xl cursor-crosshair bg-slate-900"
    />
  );
};

// --- MINI GAME: BREATH SYNC ---
const BreathSync = () => {
  const [phase, setPhase] = useState("Inhale");
  useEffect(() => {
    const sequence = [
      { text: "Inhale", duration: 4000 },
      { text: "Hold", duration: 4000 },
      { text: "Exhale", duration: 4000 },
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % sequence.length;
      setPhase(sequence[i].text);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[400px] bg-slate-900 rounded-xl">
      <motion.div
        animate={{ scale: phase === "Inhale" ? 1.5 : phase === "Exhale" ? 1 : 1.5 }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="w-32 h-32 bg-blue-500/30 border-2 border-blue-400 rounded-full flex items-center justify-center"
      >
        <span className="text-white font-medium">{phase}</span>
      </motion.div>
    </div>
  );
};

// --- MAIN COMPONENT ---
function PlayGames() {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { 
      id: "zen", 
      title: "Zen Fluid Canvas", 
      desc: "Flow with colors to quiet your mind.", 
      icon: "🌊", 
      color: "from-blue-500 to-indigo-600",
      component: <ZenCanvas /> 
    },
    { 
      id: "breath", 
      title: "Breath Sync", 
      desc: "Regulate your nervous system with visuals.", 
      icon: "🌬️", 
      color: "from-emerald-400 to-teal-600",
      component: <BreathSync /> 
    },
    { 
      id: "focus", 
      title: "Category Focus", 
      desc: "Distract your anxiety with logic.", 
      icon: "🧠", 
      color: "from-purple-500 to-pink-600",
      component: <div className="text-center p-10">Category Game Component Goes Here</div> 
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-8 overflow-hidden mt-14">
      <AnimatePresence mode="wait">
        {!activeGame ? (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
                Healing Arcade
              </h1>
              <p className="text-slate-400 text-lg">Choose a path to peace.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-10">
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
                  onClick={() => setActiveGame(game)}
                  className={`relative w-72 h-96 rounded-3xl p-8 cursor-pointer bg-gradient-to-br ${game.color} shadow-2xl overflow-hidden group`}
                  style={{ perspective: 1000 }}
                >
                  <div className="absolute -right-4 -top-4 text-9xl opacity-10 group-hover:rotate-12 transition-transform">
                    {game.icon}
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="text-5xl mb-6">{game.icon}</div>
                      <h2 className="text-2xl font-bold mb-3">{game.title}</h2>
                      <p className="text-white/80 text-sm">{game.desc}</p>
                    </div>
                    <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 font-semibold hover:bg-white/40 transition-all">
                      Open Tool
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="active"
            initial={{ opacity: 0, zoom: 0.8 }}
            animate={{ opacity: 1, zoom: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto pt-10"
          >
            <button 
              onClick={() => setActiveGame(null)}
              className="text-slate-400 hover:text-white mb-6 flex items-center gap-2 transition-colors"
            >
              ← Back to Selection
            </button>
            <div className="bg-slate-800/50 border border-white/10 p-8 rounded-[2rem] shadow-inner">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">{activeGame.title}</h2>
                <span className="px-4 py-1 bg-white/10 rounded-full text-xs uppercase tracking-widest text-slate-300">
                  Focus Mode
                </span>
              </div>
              {activeGame.component}
              <p className="mt-6 text-center text-slate-500 text-sm italic">
                Focus on the movement and let your thoughts pass by.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PlayGames;