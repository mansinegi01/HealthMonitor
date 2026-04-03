import React, { useState, useContext, useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MessageCircle, Users, Zap, PenTool, Dumbbell,
  Brain, Sun, Moon, Target, ScanLine, User
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import axios from "axios";

// ─── Flying Emoji Component ────────────────────────────────────────────────
function FlyingEmoji({ emoji, startPos, endPos, onComplete }) {
  return (
    <motion.div
      initial={{ x: startPos.x, y: startPos.y, scale: 1.4, opacity: 1, rotate: 0 }}
      animate={{
        x: endPos.x,
        y: endPos.y,
        scale: 0.3,
        opacity: [1, 1, 0.8, 0],
        rotate: [0, -15, 10, -5, 0],
      }}
      transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      onAnimationComplete={onComplete}
      style={{
        position: "fixed",
        zIndex: 9999,
        fontSize: "28px",
        pointerEvents: "none",
        userSelect: "none",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
      }}
    >
      {emoji}
    </motion.div>
  );
}

// ─── Profile Icon with pulse effect ───────────────────────────────────────
function ProfileIcon({ isDark, t, navigate, pulseProfile }) {
  return (
    <motion.div
      id="profile-icon-target"
      onClick={() => navigate("/profile")}
      animate={pulseProfile ? {
        scale: [1, 1.35, 1.1, 1.25, 1],
        rotate: [0, -8, 8, -4, 0],
      } : { scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        width: "38px", height: "38px", borderRadius: "50%",
        background: isDark ? "rgba(99,102,241,0.2)" : "#EEE8DE",
        border: `2px solid ${pulseProfile ? (isDark ? "#818cf8" : "#8B7355") : (isDark ? "rgba(255,255,255,0.1)" : "#D8CFC0")}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", position: "relative", transition: "border-color 0.3s",
        boxShadow: pulseProfile ? `0 0 16px ${isDark ? "rgba(129,140,248,0.6)" : "rgba(139,115,85,0.5)"}` : "none",
      }}
    >
      <User size={18} color={isDark ? "#818cf8" : "#8B7355"} />
      {pulseProfile && (
        <motion.div
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: `2px solid ${isDark ? "#818cf8" : "#8B7355"}`,
            pointerEvents: "none",
          }}
        />
      )}
    </motion.div>
  );
}

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────
function CardItem({ icon, title, desc, action, highlight, isDark, t, delay = 0, accent = "#6B8F71" }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [rotateX, rotateY, glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        background: t.cardBg,
        border: `1px solid ${highlight ? accent : hovered ? accent + "66" : t.cardBorder}`,
        borderRadius: "20px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        backdropFilter: isDark ? "blur(20px)" : "none",
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
        boxShadow: hovered
          ? isDark
            ? `0 28px 52px rgba(0,0,0,0.45), 0 0 0 1px ${accent}33`
            : `0 28px 52px rgba(0,0,0,0.1), 0 0 0 1px ${accent}44`
          : isDark
            ? "0 4px 16px rgba(0,0,0,0.25)"
            : "0 2px 12px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        cursor: "default",
      }}
    >
      {/* Moving spotlight glow on hover */}
      {hovered && (
        <motion.div
          style={{
            position: "absolute", inset: 0, borderRadius: "20px",
            background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${accent}18 0%, transparent 65%)`,
            pointerEvents: "none", zIndex: 0,
          }}
          animate={{
            background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, ${accent}18 0%, transparent 65%)`,
          }}
        />
      )}

      {/* Top shimmer line */}
      <motion.div
        animate={{ opacity: hovered ? 0.8 : 0.3, scaleX: hovered ? 1 : 0.6 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", top: 0, left: "15%", right: "15%", height: "1.5px",
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          borderRadius: "2px", transformOrigin: "center",
        }}
      />

      {/* Accent corner glow */}
      <motion.div
        animate={{ opacity: hovered ? 0.22 : 0.07, scale: hovered ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute", top: "-25px", left: "-25px", width: "90px", height: "90px",
          borderRadius: "50%", filter: "blur(28px)", background: accent, pointerEvents: "none",
        }}
      />

      {/* Floating particles on hover */}
      <AnimatePresence>
        {hovered && [0, 1, 2].map((i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10, x: 10 + i * 20, scale: 0 }}
            animate={{ opacity: [0, 0.6, 0], y: -30 - i * 10, scale: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 + i * 0.2, delay: i * 0.15, repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              position: "absolute", bottom: "10px", right: `${20 + i * 15}px`,
              width: "5px", height: "5px", borderRadius: "50%",
              background: accent, pointerEvents: "none", zIndex: 0,
            }}
          />
        ))}
      </AnimatePresence>

      <div style={{ position: "relative", zIndex: 1, transform: "translateZ(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
          <motion.div
            animate={{ rotate: hovered ? [0, -8, 8, 0] : 0, scale: hovered ? 1.12 : 1 }}
            transition={{ duration: 0.4 }}
            style={{ padding: "10px", borderRadius: "12px", background: t.iconBox, border: `1px solid ${t.cardBorder}`, display: "flex" }}>
            {icon}
          </motion.div>
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: "17px", fontWeight: 500, color: t.text, margin: 0 }}>
            {title}
          </h3>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 300, color: t.subtext, lineHeight: 1.6, margin: "0 0 16px 0" }}>
          {desc}
        </p>
        <div>{action}</div>
      </div>
    </motion.div>
  );
}

// ─── Main Home ─────────────────────────────────────────────────────────────
function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [isDark, setIsDark] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [highlightNotes, setHighlightNotes] = useState(false);
  const [highlightTherapy, setHighlightTherapy] = useState(false);
  const [flyingEmojis, setFlyingEmojis] = useState([]);
  const [pulseProfile, setPulseProfile] = useState(false);

  const feelings = [
    { label: "Happy 😊", mood: "happy", emoji: "😊" },
    { label: "Excited 🤩", mood: "excited", emoji: "🤩" },
    { label: "Good 🙂", mood: "good", emoji: "🙂" },
    { label: "Tired 😴", mood: "tired", emoji: "😴" },
    { label: "Sad 😢", mood: "sad", emoji: "😢" },
    { label: "Anxious 😟", mood: "anxious", emoji: "😟" },
    { label: "Neutral 😐", mood: "neutral", emoji: "😐" },
  ];

  const motivationalQuotesByMood = {
    "Tired 😴": ["Rest when you need to, but don't quit. 🌙", "Even slow progress is progress. 💪"],
    "Sad 😢": ["It's okay to not be okay — better days are coming. ☀️", "You are stronger than you feel right now. 💫"],
    "Anxious 😟": ["Breathe. You've got this. 🌿", "Peace begins with one deep breath. 🌸"],
  };

  const launchEmojiToProfile = useCallback((emoji, buttonEl) => {
    const profileEl = document.getElementById("profile-icon-target");
    if (!buttonEl || !profileEl) return;

    const btnRect = buttonEl.getBoundingClientRect();
    const profileRect = profileEl.getBoundingClientRect();

    const startPos = {
      x: btnRect.left + btnRect.width / 2 - 14,
      y: btnRect.top + btnRect.height / 2 - 14,
    };
    const endPos = {
      x: profileRect.left + profileRect.width / 2 - 14,
      y: profileRect.top + profileRect.height / 2 - 14,
    };

    const id = Date.now() + Math.random();
    setFlyingEmojis(prev => [...prev, { id, emoji, startPos, endPos }]);

    setTimeout(() => {
      setPulseProfile(true);
      setTimeout(() => setPulseProfile(false), 700);
    }, 820);
  }, []);

  const handleFeelingClick = async (feelingLabel, e) => {
    setHighlightNotes(false);
    setHighlightTherapy(false);

    const token = localStorage.getItem("token");
    if (!token) { alert("Please login first."); navigate("/login"); return; }

    const moodObj = feelings.find((f) => f.label === feelingLabel);

    // Launch emoji animation immediately on click
    launchEmojiToProfile(moodObj.emoji, e.currentTarget);

    try {
      await axios.post("http://localhost:8000/api/mood", { mood: moodObj.mood }, { headers: { Authorization: `Bearer ${token}` } });
    } catch (err) { console.error("Backend Error:", err.response?.data || err.message); return; }

    let popupText = "";
    if (["Happy 😊", "Excited 🤩", "Good 🙂"].includes(feelingLabel)) {
      setHighlightNotes(true); popupText = "📝 Reflect on this joy in your notes!";
    } else {
      setHighlightTherapy(true);
      const quotes = motivationalQuotesByMood[feelingLabel] || ["You are loved. 💚"];
      popupText = quotes[Math.floor(Math.random() * quotes.length)];
    }

    setPopupMessage(popupText); setShowPopup(true);
    setTimeout(() => { setShowPopup(false); setHighlightNotes(false); setHighlightTherapy(false); }, 4000);
  };

  const light = {
    bg: "#F5F3EE", text: "#2C2C2C", subtext: "#7A7A7A",
    cardBg: "#FFFFFF", cardBorder: "#E8E4DC",
    feelingBg: "#FFFFFF", feelingBorder: "#E0DAD0", feelingText: "#4A4A4A",
    iconBox: "#F5F3EE", orb1: "rgba(180,200,170,0.35)", orb2: "rgba(210,195,175,0.25)", orb3: "rgba(175,185,210,0.2)",
    accent: "#8B7355", toggleBg: "#E0DAD0", toggleDot: "#8B7355",
    popupBg: "#FFFFFF", popupBorder: "#E0DAD0", popupText: "#4A4A4A",
  };

  const dark = {
    bg: "#030305", text: "#FFFFFF", subtext: "#9CA3AF",
    cardBg: "rgba(15,15,21,0.6)", cardBorder: "rgba(255,255,255,0.08)",
    feelingBg: "rgba(255,255,255,0.05)", feelingBorder: "rgba(255,255,255,0.1)", feelingText: "#FFFFFF",
    iconBox: "rgba(255,255,255,0.05)", orb1: "rgba(67,56,202,0.2)", orb2: "rgba(29,78,216,0.15)", orb3: "rgba(109,40,217,0.12)",
    accent: "#818cf8", toggleBg: "rgba(99,102,241,0.2)", toggleDot: "#6366f1",
    popupBg: "#4f46e5", popupBorder: "rgba(255,255,255,0.2)", popupText: "#FFFFFF",
  };

  const t = isDark ? dark : light;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Lora', 'Georgia', serif", overflowX: "hidden", transition: "background 0.5s, color 0.5s" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
        .home-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        .home-grid .full-w { grid-column: 1 / -1; }
        @media (max-width: 640px) { .home-grid { grid-template-columns: 1fr; } .home-grid .full-w { grid-column: 1; } }
        .mood-btn { transition: all 0.18s ease; }
        .mood-btn:hover { transform: scale(1.08) translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }
        .mood-btn:active { transform: scale(0.94); }
        @keyframes orb-pulse { 0%,100% { opacity:0.6; transform: scale(1); } 50% { opacity:1; transform: scale(1.05); } }
      `}</style>

      {/* Flying emojis */}
      {flyingEmojis.map(({ id, emoji, startPos, endPos }) => (
        <FlyingEmoji key={id} emoji={emoji} startPos={startPos} endPos={endPos}
          onComplete={() => setFlyingEmojis(prev => prev.filter(e => e.id !== id))} />
      ))}

      {/* Top bar with profile icon */}
      <div style={{ position: "fixed", top: "78px", right: "20px", zIndex: 200, display: "flex", alignItems: "center", gap: "14px" }}>
        <ProfileIcon isDark={isDark} t={t} navigate={navigate} pulseProfile={pulseProfile} />

        {/* Theme Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Sun size={15} style={{ color: isDark ? "#6B7280" : "#D97706" }} />
          <div onClick={() => setIsDark(!isDark)}
            style={{ width: "44px", height: "23px", background: t.toggleBg, borderRadius: "12px", position: "relative", cursor: "pointer", border: `1px solid ${isDark ? "rgba(99,102,241,0.3)" : "#C8B8A2"}` }}>
            <motion.div animate={{ x: isDark ? 21 : 2 }}
              style={{ width: "17px", height: "17px", background: t.toggleDot, borderRadius: "50%", position: "absolute", top: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isDark ? <Moon size={9} color="white" /> : <Sun size={9} color="white" />}
            </motion.div>
          </div>
          <Moon size={15} style={{ color: isDark ? "#818CF8" : "#8B7355" }} />
        </div>
      </div>

      {/* Background Orbs */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[
          { top: "-10%", left: "-8%", bg: t.orb1 },
          { bottom: "-10%", right: "-8%", bg: t.orb2 },
          { top: "40%", right: "20%", bg: t.orb3 },
        ].map((o, i) => (
          <div key={i} style={{
            position: "absolute", ...o, width: "38%", height: "38%",
            borderRadius: "50%", filter: "blur(90px)",
            background: o.bg, animation: `orb-pulse ${4 + i}s infinite ${i * 1.2}s`
          }} />
        ))}
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            style={{ position: "fixed", top: "96px", left: "50%", transform: "translateX(-50%)", zIndex: 100, padding: "14px 28px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: "10px", minWidth: "280px", justifyContent: "center", background: t.popupBg, border: `1px solid ${t.popupBorder}`, color: t.popupText }}>
            <Zap size={17} style={{ color: "#FBBF24" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "14px" }}>{popupMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <main style={{ position: "relative", zIndex: 10, paddingTop: "100px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px", maxWidth: "900px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: t.accent, marginBottom: "12px" }}>
            Your Wellness Space
          </p>
          <h1 style={{ fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 500, letterSpacing: "-0.5px", lineHeight: 1.2, marginBottom: "10px" }}>
            Welcome back,{" "}
            <em style={{ color: t.accent, fontStyle: "italic" }}>{user?.name || "Explorer"}</em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 300, color: t.subtext, marginTop: "8px" }}>
            How is your inner world today?
          </p>

          {/* Mood pills */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "28px" }}>
            {feelings.map((f, i) => (
              <motion.button
                key={i}
                className="mood-btn"
                onClick={(e) => handleFeelingClick(f.label, e)}
                whileTap={{ scale: 0.9 }}
                style={{
                  padding: "9px 20px", borderRadius: "999px",
                  border: `1px solid ${t.feelingBorder}`,
                  background: t.feelingBg, color: t.feelingText,
                  fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                  fontWeight: 400, cursor: "pointer",
                  position: "relative", overflow: "hidden",
                }}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: t.subtext, marginTop: "10px", opacity: 0.6 }}>
            ✨ Tap a mood — watch it fly to your profile
          </p>
        </motion.div>

        {/* Grid */}
        <div className="home-grid" style={{ perspective: "1200px" }}>

          <CardItem isDark={isDark} t={t} highlight={highlightNotes} delay={0.1}
            icon={<PenTool size={20} color={isDark ? "#6ee7b7" : "#6B8F71"} />} accent={isDark ? "#6ee7b7" : "#6B8F71"}
            title="Wellness Notes" desc="Reflect on your emotions and document your soul's journey."
            action={
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => navigate("/notes", { state: { mood: "good" } })}
                  style={{ flex: 1, padding: "10px", borderRadius: "10px", border: `1px solid ${isDark ? "rgba(110,231,183,0.25)" : "#C8D8C0"}`, background: isDark ? "rgba(110,231,183,0.1)" : "#EEF8EE", color: isDark ? "#6ee7b7" : "#3A6B3A", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                  😄 Good
                </button>
                <button onClick={() => navigate("/notes", { state: { mood: "sad" } })}
                  style={{ flex: 1, padding: "10px", borderRadius: "10px", border: `1px solid ${isDark ? "rgba(251,113,133,0.25)" : "#E8C8C0"}`, background: isDark ? "rgba(251,113,133,0.1)" : "#FFF0EE", color: isDark ? "#fda4af" : "#8B3A3A", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                  😔 Low
                </button>
              </div>
            }
          />

          <CardItem isDark={isDark} t={t} highlight={highlightTherapy} delay={0.15}
            icon={<Brain size={20} color={isDark ? "#c084fc" : "#7B6B9B"} />} accent={isDark ? "#c084fc" : "#7B6B9B"}
            title="Mind Therapy" desc="Soothing frequencies and guided meditation for mental clarity."
            action={
              <button onClick={() => navigate("/therapy")}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: `1px solid ${isDark ? "rgba(192,132,252,0.3)" : "#C8C0E0"}`, background: isDark ? "rgba(192,132,252,0.12)" : "#F4F0FB", color: isDark ? "#c084fc" : "#5A4A7B", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                Enter Therapy Room
              </button>
            }
          />

          <CardItem isDark={isDark} t={t} delay={0.2}
            icon={<Zap size={20} color={isDark ? "#fbbf24" : "#9B8B4A"} />} accent={isDark ? "#fbbf24" : "#9B8B4A"}
            title="Quick Hub" desc="Access your metrics and relaxation minigames instantly."
            action={
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <Link to="/playGames" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", borderRadius: "10px", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#E0D8B8"}`, background: isDark ? "rgba(255,255,255,0.04)" : "#FBF8EE", color: isDark ? "#E5E7EB" : "#6B5B2A", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", textDecoration: "none", transition: "all 0.2s" }}>🎮 Games</Link>
                <Link to="/reports" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", borderRadius: "10px", border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#C8CCE0"}`, background: isDark ? "rgba(255,255,255,0.04)" : "#EEF0FB", color: isDark ? "#E5E7EB" : "#3A4A6B", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", textDecoration: "none", transition: "all 0.2s" }}>📊 Reports</Link>
              </div>
            }
          />

          <CardItem isDark={isDark} t={t} delay={0.25}
            icon={<Dumbbell size={20} color={isDark ? "#60a5fa" : "#4A6B8B"} />} accent={isDark ? "#60a5fa" : "#4A6B8B"}
            title="Fitness" desc="Curated physical activities to strengthen both body and mind."
            action={
              <button onClick={() => navigate("/workout")}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: `1px solid ${isDark ? "rgba(96,165,250,0.3)" : "#C0CCE0"}`, background: isDark ? "rgba(96,165,250,0.12)" : "#EEF4FB", color: isDark ? "#60a5fa" : "#2A4A6B", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                Start Session
              </button>
            }
          />

          <CardItem isDark={isDark} t={t} delay={0.3}
            icon={<MessageCircle size={20} color={isDark ? "#818cf8" : "#5A6B9B"} />} accent={isDark ? "#818cf8" : "#5A6B9B"}
            title="AI Wellness Guide" desc="Your personal AI companion for instant support and guidance."
            action={
              <button onClick={() => navigate("/chatbot")}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "none", background: isDark ? "#4f46e5" : "#5A6B9B", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                Start Chatting
              </button>
            }
          />

          <CardItem isDark={isDark} t={t} delay={0.35}
            icon={<Users size={20} color={isDark ? "#f472b6" : "#9B5A6B"} />} accent={isDark ? "#f472b6" : "#9B5A6B"}
            title="Community Circle" desc="A safe haven to share and connect with fellow travelers."
            action={
              <button onClick={() => navigate("/community")}
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "none", background: isDark ? "#be185d" : "#9B5A6B", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                Explore Community
              </button>
            }
          />

          {/* Brain Tumor — full width */}
          <div className="full-w">
            <CardItem isDark={isDark} t={t} delay={0.4}
              icon={<ScanLine size={20} color={isDark ? "#f87171" : "#8B4A4A"} />} accent={isDark ? "#f87171" : "#8B4A4A"}
              title="Brain Tumor Screening" desc="Upload an MRI scan for AI-powered neurological screening. Awareness is the first step to care."
              action={
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <button onClick={() => navigate("/brain-scan")}
                    style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: isDark ? "#dc2626" : "#8B4A4A", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                    🧠 Upload MRI Scan
                  </button>
                  <p style={{ flex: 1, fontSize: "12px", color: t.subtext, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                    ⚠️ For awareness only — not a medical diagnosis
                  </p>
                </div>
              }
            />
          </div>

          {/* Engagement — full width */}
          <div className="full-w">
            <CardItem isDark={isDark} t={t} delay={0.45}
              icon={<Target size={20} color={isDark ? "#34d399" : "#4A7B5A"} />} accent={isDark ? "#34d399" : "#4A7B5A"}
              title="Engagement & Accountability" desc="Track SMART goals, log daily gratitude, and monitor medication adherence — all in one place."
              action={
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { emoji: "🎯", label: "Goals", bg: isDark ? "rgba(52,211,153,0.1)" : "#EEF8F0", border: isDark ? "rgba(52,211,153,0.25)" : "#B8D8C0", color: isDark ? "#34d399" : "#2A5A3A" },
                    { emoji: "✨", label: "Gratitude", bg: isDark ? "rgba(251,191,36,0.1)" : "#FBF8EE", border: isDark ? "rgba(251,191,36,0.25)" : "#E0D8A8", color: isDark ? "#fbbf24" : "#5A4A1A" },
                    { emoji: "💊", label: "Meds", bg: isDark ? "rgba(96,165,250,0.1)" : "#EEF2FB", border: isDark ? "rgba(96,165,250,0.25)" : "#B8C4E0", color: isDark ? "#60a5fa" : "#1A3A5A" },
                  ].map(({ emoji, label, bg, border, color }) => (
                    <button key={label} onClick={() => navigate("/engagement")}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", padding: "12px", borderRadius: "10px", border: `1px solid ${border}`, background: bg, color, fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
                      <span style={{ fontSize: "20px" }}>{emoji}</span>
                      {label}
                    </button>
                  ))}
                </div>
              }
            />
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;