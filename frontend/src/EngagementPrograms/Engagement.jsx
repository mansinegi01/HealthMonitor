import React from "react";
import { useState } from "react";
import Goals from "./Goals";
import GratitudeLog from "./GratitudeLog";
import Medications from "./Medications";

const TABS = [
  { id: "goals", label: "Goals & Streaks", icon: "◎" },
  { id: "gratitude", label: "Gratitude Log", icon: "✦" },
  { id: "medications", label: "Medications", icon: "⬡" },
];

export default function Engagement() {
  const [activeTab, setActiveTab] = useState("goals");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .eng-tab-btn { transition: all .2s; }
        .eng-tab-btn:hover { background: #181c27 !important; color: #e8eaf2 !important; }
        .eng-card-btn:hover { opacity: 0.85; }
        textarea:focus { border-color: #7ee8a2 !important; box-shadow: 0 0 0 3px #7ee8a220 !important; }
        input:focus { border-color: #7ee8a2 !important; box-shadow: 0 0 0 3px #7ee8a220 !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #232840; border-radius: 99px; }
      `}</style>

      <div style={{
        background: "#0d0f14", minHeight: "100vh", padding: "24px 16px",
        fontFamily: "DM Sans, sans-serif",
      }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          {/* Page Header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800, color: "#e8eaf2",
                letterSpacing: "-0.02em", margin: 0 }}>
                Engagement & Accountability
              </h1>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#4d5370" }}>
                {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#8891b0", margin: 0 }}>
              Track your goals, gratitude, and medication adherence
            </p>
          </div>

          {/* Tab Bar */}
          <div style={{
            display: "flex", gap: 4, background: "#13161e", padding: 4, borderRadius: 14,
            border: "1px solid #232840", marginBottom: 16,
          }}>
            {TABS.map((tab) => (
              <button key={tab.id} className="eng-tab-btn" onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, padding: "10px 8px", borderRadius: 10, border: "none", cursor: "pointer",
                  fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 600,
                  background: activeTab === tab.id ? "#181c27" : "transparent",
                  color: activeTab === tab.id ? "#e8eaf2" : "#8891b0",
                  boxShadow: activeTab === tab.id ? "0 0 0 1px #232840" : "none",
                }}>
                <span style={{ marginRight: 5 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "goals" && <Goals />}
            {activeTab === "gratitude" && <GratitudeLog />}
            {activeTab === "medications" && <Medications />}
          </div>
        </div>
      </div>
    </>
  );
}