import React from "react";
import { useState } from "react";
import { useGoals } from "./useEngagement";

const CATEGORY_COLORS = {
  mindfulness: "#7ee8a2",
  physical: "#5b8dee",
  reflection: "#b57bee",
  wellness: "#f5c842",
  social: "#f07bca",
  other: "#8891b0",
};

// ─── Ring Progress ──────────────────────────────────────────────────────────
function RingProgress({ value, max, size = 60, stroke = 5, color, label }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#232840" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#e8eaf2", fontWeight: 700 }}>
        {label}
      </div>
    </div>
  );
}

// ─── Add Goal Modal ─────────────────────────────────────────────────────────
function AddGoalModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ title: "", category: "wellness", target: 21, unit: "days", milestones: "7,14,21", color: "#7ee8a2" });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      const milestones = form.milestones.split(",").map((v) => parseInt(v.trim())).filter(Boolean);
      await onCreate({ ...form, target: Number(form.target), milestones });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000090", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
      <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 16, padding: 24, width: "min(480px,90vw)" }}>
        <h3 style={{ color: "#e8eaf2", fontFamily: "Syne, sans-serif", fontSize: 16, marginBottom: 20 }}>New SMART Goal</h3>
        {[
          { label: "Goal Title", key: "title", type: "text", placeholder: "e.g. Meditate Daily" },
          { label: "Target", key: "target", type: "number", placeholder: "21" },
          { label: "Unit", key: "unit", type: "text", placeholder: "days / sessions / entries" },
          { label: "Milestones (comma-separated)", key: "milestones", type: "text", placeholder: "7,14,21" },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 5 }}>{label}</label>
            <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
              placeholder={placeholder}
              style={{ width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 8, padding: "9px 12px",
                fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", outline: "none", boxSizing: "border-box" }} />
          </div>
        ))}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 5 }}>Category</label>
          <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value, color: CATEGORY_COLORS[e.target.value] }))}
            style={{ width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 8, padding: "9px 12px",
              fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", outline: "none" }}>
            {Object.keys(CATEGORY_COLORS).map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", background: "transparent", border: "1px solid #232840", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", color: "#8891b0", fontSize: 13 }}>Cancel</button>
          <button onClick={handleSubmit} disabled={saving || !form.title.trim()}
            style={{ flex: 2, padding: "10px", background: saving ? "#232840" : "#7ee8a2", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#0d0f14", fontSize: 13 }}>
            {saving ? "Saving..." : "Create Goal"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Goals Component ────────────────────────────────────────────────────
export default function Goals() {
  const { goals, stats, loading, error, createGoal, checkIn, deleteGoal } = useGoals();
  const [showAdd, setShowAdd] = useState(false);
  const [checkingIn, setCheckingIn] = useState(null);

  const handleCheckIn = async (id) => {
    setCheckingIn(id);
    try { await checkIn(id); } catch (e) { alert(e.response?.data?.message || "Already checked in today"); }
    finally { setCheckingIn(null); }
  };

  if (loading) return <div style={{ color: "#8891b0", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>Loading goals...</div>;
  if (error) return <div style={{ color: "#ff6b6b", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>{error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Stats Row */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Active Goals", value: stats.activeGoals, color: "#7ee8a2" },
            { label: "Total Streak", value: `${stats.totalStreak}d`, color: "#5b8dee" },
            { label: "Completion", value: `${stats.completionRate}%`, color: "#b57bee" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Activity Heatmap */}
      {stats?.activityMap && (
        <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 14, padding: 16 }}>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 11, color: "#4d5370", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>30-Day Activity</div>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {Array.from({ length: 30 }, (_, i) => {
              const d = new Date(); d.setDate(d.getDate() - (29 - i));
              const key = d.toISOString().split("T")[0];
              const active = !!stats.activityMap[key];
              return <div key={key} style={{ width: 14, height: 14, borderRadius: 3, background: active ? "#7ee8a2" : "#232840", opacity: active ? 0.8 : 1 }} />;
            })}
          </div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", marginTop: 8 }}>
            <span style={{ color: "#7ee8a2", fontWeight: 600 }}>{stats.activeDaysLast30} active days</span> in the last 30
          </div>
        </div>
      )}

      {/* Goal Cards */}
      {goals.map((goal) => {
        const color = goal.color || CATEGORY_COLORS[goal.category] || "#7ee8a2";
        const pct = Math.round((goal.current / goal.target) * 100);
        const nextMilestone = goal.milestones?.find((m) => !m.reached)?.value || goal.target;
        return (
          <div key={goal._id} style={{ background: "#181c27", border: `1px solid #232840`, borderRadius: 14, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <RingProgress value={goal.current} max={goal.target} size={54} stroke={5} color={color} label={`${pct}%`} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: "#e8eaf2" }}>{goal.title}</div>
                  <div style={{ background: `${color}20`, borderRadius: 99, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 11 }}>🔥</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color, fontWeight: 700 }}>{goal.streak}d</span>
                  </div>
                </div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 10 }}>
                  {goal.current}/{goal.target} {goal.unit} · {nextMilestone - goal.current} more to next milestone
                </div>
                {/* Milestone bar */}
                <div style={{ position: "relative", height: 6, background: "#232840", borderRadius: 99 }}>
                  <div style={{ height: "100%", borderRadius: 99, background: color, width: `${pct}%`, transition: "width 1s ease" }} />
                  {goal.milestones?.map((m) => (
                    <div key={m._id} style={{
                      position: "absolute", top: "50%", left: `${(m.value / goal.target) * 100}%`, transform: "translate(-50%,-50%)",
                      width: 10, height: 10, borderRadius: "50%", border: `2px solid ${m.reached ? color : "#232840"}`,
                      background: m.reached ? color : "#0d0f14", boxShadow: m.reached ? `0 0 8px ${color}80` : "none",
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
                  <button onClick={() => handleCheckIn(goal._id)} disabled={checkingIn === goal._id}
                    style={{ padding: "6px 16px", background: color, border: "none", borderRadius: 8, cursor: "pointer",
                      fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 700, color: "#0d0f14", opacity: checkingIn === goal._id ? 0.6 : 1 }}>
                    {checkingIn === goal._id ? "..." : "✓ Check In"}
                  </button>
                  <button onClick={() => deleteGoal(goal._id)} style={{ padding: "6px 12px", background: "transparent", border: "1px solid #232840", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#4d5370" }}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <button onClick={() => setShowAdd(true)} style={{ background: "transparent", border: "1px dashed #232840", borderRadius: 14, padding: 14, cursor: "pointer",
        fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        ＋ Add New SMART Goal
      </button>

      {showAdd && <AddGoalModal onClose={() => setShowAdd(false)} onCreate={createGoal} />}
    </div>
  );
}