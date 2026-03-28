import React from "react";
// import { useState } from "react";
// import { useMedications } from "./useEngagement";

// const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// function AddMedModal({ onClose, onAdd }) {
//   const [form, setForm] = useState({ name: "", dose: "", type: "medication", scheduledTime: "08:00", color: "#7ee8a2", reminderEnabled: true, notes: "" });
//   const [saving, setSaving] = useState(false);

//   const COLORS = ["#7ee8a2", "#5b8dee", "#b57bee", "#f5c842", "#f07bca", "#ff6b6b"];

//   const handleSubmit = async () => {
//     if (!form.name.trim() || !form.dose.trim()) return;
//     setSaving(true);
//     try { await onAdd(form); onClose(); }
//     finally { setSaving(false); }
//   };

//   return (
//     <div style={{ position: "fixed", inset: 0, background: "#00000090", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
//       <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 16, padding: 24, width: "min(480px,90vw)" }}>
//         <h3 style={{ color: "#e8eaf2", fontFamily: "Syne, sans-serif", fontSize: 16, marginBottom: 20 }}>Add Medication / Supplement</h3>
//         {[
//           { label: "Name", key: "name", placeholder: "e.g. Sertraline" },
//           { label: "Dose", key: "dose", placeholder: "e.g. 50mg" },
//           { label: "Scheduled Time", key: "scheduledTime", type: "time" },
//         ].map(({ label, key, placeholder, type = "text" }) => (
//           <div key={key} style={{ marginBottom: 14 }}>
//             <label style={{ display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 5 }}>{label}</label>
//             <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
//               placeholder={placeholder}
//               style={{ width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 8, padding: "9px 12px",
//                 fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", outline: "none", boxSizing: "border-box" }} />
//           </div>
//         ))}
//         <div style={{ marginBottom: 14 }}>
//           <label style={{ display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 5 }}>Type</label>
//           <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
//             style={{ width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 8, padding: "9px 12px",
//               fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", outline: "none" }}>
//             {["medication", "supplement", "vitamin", "other"].map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
//           </select>
//         </div>
//         <div style={{ marginBottom: 14 }}>
//           <label style={{ display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 8 }}>Color</label>
//           <div style={{ display: "flex", gap: 8 }}>
//             {COLORS.map((c) => (
//               <div key={c} onClick={() => setForm((p) => ({ ...p, color: c }))}
//                 style={{ width: 24, height: 24, borderRadius: "50%", background: c, cursor: "pointer",
//                   border: form.color === c ? `2px solid #e8eaf2` : "2px solid transparent", boxSizing: "border-box" }} />
//             ))}
//           </div>
//         </div>
//         <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
//           <button onClick={onClose} style={{ flex: 1, padding: 10, background: "transparent", border: "1px solid #232840", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", color: "#8891b0", fontSize: 13 }}>Cancel</button>
//           <button onClick={handleSubmit} disabled={saving || !form.name.trim()}
//             style={{ flex: 2, padding: 10, background: saving ? "#232840" : "#7ee8a2", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#0d0f14", fontSize: 13 }}>
//             {saving ? "Saving..." : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Medications() {
//   const { meds, adherence, loading, error, addMedication, logDose, deleteMedication } = useMedications();
//   const [showAdd, setShowAdd] = useState(false);
//   const [logging, setLogging] = useState(null);

//   const todayKey = new Date().toISOString().split("T")[0];

//   // Check if a med is taken today
//   const isTakenToday = (med) => {
//     return med.doseLogs?.some((l) => {
//       const d = new Date(l.date); d.setHours(0, 0, 0, 0);
//       return d.toISOString().split("T")[0] === todayKey && l.taken;
//     });
//   };

//   const handleToggle = async (med) => {
//     setLogging(med._id);
//     try { await logDose(med._id, !isTakenToday(med)); }
//     catch (e) { alert("Failed to log dose"); }
//     finally { setLogging(null); }
//   };

//   const weekAdherence = adherence?.dailyAdherence
//     ? Object.values(adherence.dailyAdherence)
//     : Array(7).fill(0);

//   if (loading) return <div style={{ color: "#8891b0", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>Loading medications...</div>;
//   if (error) return <div style={{ color: "#ff6b6b", textAlign: "center", padding: 40 }}>{error}</div>;

//   const takenToday = meds.filter(isTakenToday).length;
//   const adherencePct = meds.length ? Math.round((takenToday / meds.length) * 100) : 0;
//   const adherenceColor = adherencePct === 100 ? "#7ee8a2" : adherencePct >= 50 ? "#f5c842" : "#ff6b6b";

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//       {/* Today's adherence */}
//       <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 14, padding: 16 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
//           <div>
//             <div style={{ fontFamily: "Syne, sans-serif", fontSize: 11, color: "#4d5370", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Today's Adherence</div>
//             <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 700, color: adherenceColor }}>
//               {takenToday}/{meds.length} <span style={{ fontSize: 14 }}>taken</span>
//             </div>
//           </div>
//           <div style={{ background: `${adherenceColor}20`, borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
//             <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 18, fontWeight: 700, color: adherenceColor }}>{adherencePct}%</div>
//             <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#4d5370" }}>today</div>
//           </div>
//         </div>
//         {/* 7-day bars */}
//         <div style={{ fontFamily: "Syne, sans-serif", fontSize: 10, color: "#4d5370", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>7-Day Adherence</div>
//         <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 44 }}>
//           {weekAdherence.map((v, i) => {
//             const barColor = v === 100 ? "#7ee8a2" : v >= 70 ? "#f5c842" : v > 0 ? "#ff6b6b" : "#232840";
//             return (
//               <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
//                 <div style={{ width: "100%", background: barColor, borderRadius: 4, height: `${Math.max(v * 0.36, v > 0 ? 4 : 0)}px`, opacity: 0.8, transition: "height .5s" }} />
//                 <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#4d5370" }}>{DAYS[i]}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Mood correlation insight */}
//       {adherence?.moodInsight?.length > 0 && (
//         <div style={{ background: "#5b8dee15", border: "1px solid #5b8dee30", borderRadius: 14, padding: 14 }}>
//           <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
//             <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
//             <div>
//               <div style={{ fontFamily: "Syne, sans-serif", fontSize: 13, color: "#5b8dee", fontWeight: 700, marginBottom: 4 }}>Mood Correlation Insight</div>
//               <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", lineHeight: 1.5 }}>
//                 Taking <span style={{ color: "#e8eaf2", fontWeight: 600 }}>{adherence.moodInsight[0].name}</span> consistently is linked to a{" "}
//                 <span style={{ color: "#7ee8a2", fontWeight: 700 }}>+{adherence.moodInsight[0].correlation}</span> avg mood improvement on taken days.
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Med cards */}
//       {meds.map((med) => {
//         const taken = isTakenToday(med);
//         const color = med.color || "#7ee8a2";
//         return (
//           <div key={med._id} style={{ background: "#181c27", border: `1px solid ${taken ? color + "40" : "#232840"}`, borderRadius: 14, padding: 16, transition: "border .3s" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//               {/* Toggle button */}
//               <button onClick={() => handleToggle(med)} disabled={logging === med._id}
//                 style={{ width: 38, height: 38, borderRadius: 10, border: `2px solid ${taken ? color : "#232840"}`,
//                   background: taken ? `${color}20` : "transparent", cursor: "pointer",
//                   display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>
//                 {logging === med._id ? <span style={{ fontSize: 14 }}>⋯</span> : taken ? <span style={{ color, fontSize: 16 }}>✓</span> : null}
//               </button>
//               <div style={{ flex: 1 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: "#e8eaf2" }}>{med.name}</div>
//                   <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#4d5370" }}>{med.scheduledTime}</div>
//                 </div>
//                 <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 8 }}>
//                   {med.dose} · {med.type} · {taken ? <span style={{ color }}>Taken ✓</span> : "Pending"}
//                 </div>
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${color}15`, borderRadius: 99, padding: "3px 10px" }}>
//                     <span style={{ fontSize: 10 }}>🔥</span>
//                     <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color, fontWeight: 700 }}>{med.streak}d streak</span>
//                   </div>
//                   {med.moodCorrelation !== 0 && (
//                     <div style={{ background: "#5b8dee15", borderRadius: 99, padding: "3px 10px" }}>
//                       <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#5b8dee", fontWeight: 700 }}>
//                         Mood {med.moodCorrelation > 0 ? "+" : ""}{med.moodCorrelation}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <button onClick={() => deleteMedication(med._id)}
//                 style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4d5370", fontSize: 18, padding: "4px 8px" }}>
//                 ×
//               </button>
//             </div>
//           </div>
//         );
//       })}

//       <button onClick={() => setShowAdd(true)} style={{ background: "transparent", border: "1px dashed #232840", borderRadius: 14, padding: 14, cursor: "pointer",
//         fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
//         ＋ Add Medication / Supplement
//       </button>

//       {showAdd && <AddMedModal onClose={() => setShowAdd(false)} onAdd={addMedication} />}
//     </div>
//   );
// // }
// import React from "react";
// import { useState, useEffect, useRef, useCallback } from "react";
// import { useMedications } from "./useEngagement";

// const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// // ─── NOTIFICATION ENGINE ─────────────────────────────────────────────────────
// // Runs a scheduler every 30s. When a med's scheduledTime matches HH:MM now,
// // and it hasn't been taken today, fires a browser Notification.
// // Tracks fired keys ("medId-date-time") in a ref so it never double-fires.
// function useMedNotifications(meds) {
//   const [permission, setPermission] = useState(
//     typeof Notification !== "undefined" ? Notification.permission : "default"
//   );
//   const firedRef = useRef(new Set());

//   const requestPermission = useCallback(async () => {
//     if (!("Notification" in window)) return;
//     const result = await Notification.requestPermission();
//     setPermission(result);
//   }, []);

//   const fireNotification = useCallback(
//     (med) => {
//       if (permission !== "granted") return;
//       const n = new Notification(`💊 Time to take ${med.name}`, {
//         body: `Dose: ${med.dose}  •  Don't break your ${med.streak}d streak! 🔥`,
//         icon: "/favicon.ico",
//         tag: `med-${med._id}`,       // same tag = replaces instead of stacking
//         requireInteraction: true,     // stays until user dismisses
//       });
//       setTimeout(() => n.close(), 12000);
//     },
//     [permission]
//   );

//   // Scheduler
//   useEffect(() => {
//     if (permission !== "granted" || !meds?.length) return;

//     const check = () => {
//       const now = new Date();
//       const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
//       const todayKey = now.toISOString().split("T")[0];

//       meds.forEach((med) => {
//         if (!med.reminderEnabled) return;

//         const fireKey = `${med._id}-${todayKey}-${med.scheduledTime}`;
//         if (firedRef.current.has(fireKey)) return;

//         if (med.scheduledTime === hhmm) {
//           const alreadyTaken = med.doseLogs?.some((l) => {
//             const d = new Date(l.date);
//             d.setHours(0, 0, 0, 0);
//             return d.toISOString().split("T")[0] === todayKey && l.taken;
//           });
//           if (!alreadyTaken) {
//             fireNotification(med);
//             firedRef.current.add(fireKey);
//           }
//         }
//       });
//     };

//     check(); // run immediately on mount / meds change
//     const id = setInterval(check, 30000);
//     return () => clearInterval(id);
//   }, [meds, permission, fireNotification]);

//   // Clear fired set at midnight
//   useEffect(() => {
//     const now = new Date();
//     const midnight = new Date(now);
//     midnight.setHours(24, 0, 0, 0);
//     const id = setTimeout(() => firedRef.current.clear(), midnight - now);
//     return () => clearTimeout(id);
//   }, []);

//   return { permission, requestPermission };
// }

// // ─── NOTIFICATION BANNER ──────────────────────────────────────────────────────
// function NotificationBanner({ permission, onRequest }) {
//   if (permission === "granted") {
//     return (
//       <div style={{ background: "#7ee8a215", border: "1px solid #7ee8a230", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
//         <span style={{ fontSize: 16 }}>🔔</span>
//         <div style={{ flex: 1, fontFamily: "DM Sans, sans-serif", fontSize: 12 }}>
//           <span style={{ color: "#7ee8a2", fontWeight: 700 }}>Reminders active</span>
//           <span style={{ color: "#8891b0" }}> — you'll be notified at each medication's scheduled time</span>
//         </div>
//         <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7ee8a2", boxShadow: "0 0 6px #7ee8a2", flexShrink: 0 }} />
//       </div>
//     );
//   }

//   if (permission === "denied") {
//     return (
//       <div style={{ background: "#ff6b6b15", border: "1px solid #ff6b6b30", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
//         <span style={{ fontSize: 16 }}>🔕</span>
//         <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#ff6b6b", lineHeight: 1.5 }}>
//           Notifications are blocked. Go to <strong>Browser Settings → Site Settings → Notifications</strong> and allow this site.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ background: "#f5c84215", border: "1px solid #f5c84230", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
//       <span style={{ fontSize: 22, flexShrink: 0 }}>🔔</span>
//       <div style={{ flex: 1 }}>
//         <div style={{ fontFamily: "Syne, sans-serif", fontSize: 13, color: "#f5c842", fontWeight: 700, marginBottom: 2 }}>Enable Medication Reminders</div>
//         <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0" }}>
//           Get a browser notification exactly at each medication's scheduled time.
//         </div>
//       </div>
//       <button onClick={onRequest} style={{ flexShrink: 0, padding: "8px 18px", background: "#f5c842", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 700, color: "#0d0f14" }}>
//         Enable
//       </button>
//     </div>
//   );
// }

// // ─── ADD MED MODAL ────────────────────────────────────────────────────────────
// function AddMedModal({ onClose, onAdd }) {
//   const [form, setForm] = useState({ name: "", dose: "", type: "medication", scheduledTime: "08:00", color: "#7ee8a2", reminderEnabled: true, notes: "" });
//   const [saving, setSaving] = useState(false);
//   const COLORS = ["#7ee8a2", "#5b8dee", "#b57bee", "#f5c842", "#f07bca", "#ff6b6b"];

//   const handleSubmit = async () => {
//     if (!form.name.trim() || !form.dose.trim()) return;
//     setSaving(true);
//     try { await onAdd(form); onClose(); }
//     finally { setSaving(false); }
//   };

//   const inputStyle = { width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 8, padding: "9px 12px", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", outline: "none", boxSizing: "border-box" };
//   const labelStyle = { display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 5 };

//   return (
//     <div style={{ position: "fixed", inset: 0, background: "#00000090", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
//       <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 16, padding: 24, width: "min(480px,90vw)", maxHeight: "90vh", overflowY: "auto" }}>
//         <h3 style={{ color: "#e8eaf2", fontFamily: "Syne, sans-serif", fontSize: 16, marginBottom: 20 }}>Add Medication / Supplement</h3>

//         {[
//           { label: "Name", key: "name", placeholder: "e.g. Sertraline" },
//           { label: "Dose", key: "dose", placeholder: "e.g. 50mg" },
//           { label: "Scheduled Time", key: "scheduledTime", type: "time" },
//         ].map(({ label, key, placeholder, type = "text" }) => (
//           <div key={key} style={{ marginBottom: 14 }}>
//             <label style={labelStyle}>{label}</label>
//             <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} style={inputStyle} />
//           </div>
//         ))}

//         <div style={{ marginBottom: 14 }}>
//           <label style={labelStyle}>Type</label>
//           <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} style={inputStyle}>
//             {["medication", "supplement", "vitamin", "other"].map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
//           </select>
//         </div>

//         <div style={{ marginBottom: 14 }}>
//           <label style={labelStyle}>Color</label>
//           <div style={{ display: "flex", gap: 8 }}>
//             {COLORS.map((c) => (
//               <div key={c} onClick={() => setForm((p) => ({ ...p, color: c }))}
//                 style={{ width: 24, height: 24, borderRadius: "50%", background: c, cursor: "pointer", border: form.color === c ? "2px solid #e8eaf2" : "2px solid transparent", boxSizing: "border-box" }} />
//             ))}
//           </div>
//         </div>

//         {/* Reminder toggle */}
//         <div style={{ marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#13161e", border: "1px solid #232840", borderRadius: 10, padding: "10px 14px" }}>
//           <div>
//             <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", fontWeight: 600 }}>🔔 Browser Reminder</div>
//             <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", marginTop: 2 }}>Notify me at {form.scheduledTime}</div>
//           </div>
//           <div onClick={() => setForm((p) => ({ ...p, reminderEnabled: !p.reminderEnabled }))}
//             style={{ width: 42, height: 22, borderRadius: 99, cursor: "pointer", position: "relative", flexShrink: 0, background: form.reminderEnabled ? "#7ee8a2" : "#232840", transition: "background .2s" }}>
//             <div style={{ position: "absolute", top: 2, left: form.reminderEnabled ? 22 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
//           </div>
//         </div>

//         <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
//           <button onClick={onClose} style={{ flex: 1, padding: 10, background: "transparent", border: "1px solid #232840", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", color: "#8891b0", fontSize: 13 }}>Cancel</button>
//           <button onClick={handleSubmit} disabled={saving || !form.name.trim()} style={{ flex: 2, padding: 10, background: saving ? "#232840" : "#7ee8a2", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#0d0f14", fontSize: 13 }}>
//             {saving ? "Saving..." : "Add"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── MAIN ─────────────────────────────────────────────────────────────────────
// export default function Medications() {
//   const { meds, adherence, loading, error, addMedication, logDose, deleteMedication } = useMedications();
//   const [showAdd, setShowAdd] = useState(false);
//   const [logging, setLogging] = useState(null);

//   const { permission, requestPermission } = useMedNotifications(meds);

//   const todayKey = new Date().toISOString().split("T")[0];

//   const isTakenToday = (med) =>
//     med.doseLogs?.some((l) => {
//       const d = new Date(l.date); d.setHours(0, 0, 0, 0);
//       return d.toISOString().split("T")[0] === todayKey && l.taken;
//     });

//   const handleToggle = async (med) => {
//     setLogging(med._id);
//     try { await logDose(med._id, !isTakenToday(med)); }
//     catch { alert("Failed to log dose"); }
//     finally { setLogging(null); }
//   };

//   const weekAdherence = adherence?.dailyAdherence ? Object.values(adherence.dailyAdherence) : Array(7).fill(0);

//   if (loading) return <div style={{ color: "#8891b0", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>Loading medications...</div>;
//   if (error) return <div style={{ color: "#ff6b6b", textAlign: "center", padding: 40 }}>{error}</div>;

//   const takenToday = meds.filter(isTakenToday).length;
//   const adherencePct = meds.length ? Math.round((takenToday / meds.length) * 100) : 0;
//   const adherenceColor = adherencePct === 100 ? "#7ee8a2" : adherencePct >= 50 ? "#f5c842" : "#ff6b6b";

//   // Sort by scheduled time ascending
//   const sortedMeds = [...meds].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

//   // Next upcoming untaken med
//   const now = new Date();
//   const nowMins = now.getHours() * 60 + now.getMinutes();
//   const nextMed = sortedMeds.find((m) => {
//     if (isTakenToday(m)) return false;
//     const [h, min] = m.scheduledTime.split(":").map(Number);
//     return h * 60 + min > nowMins;
//   });

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

//       {/* Notification permission banner */}
//       <NotificationBanner permission={permission} onRequest={requestPermission} />

//       {/* Next reminder pill */}
//       {nextMed && permission === "granted" && (
//         <div style={{ background: `${nextMed.color || "#7ee8a2"}12`, border: `1px solid ${nextMed.color || "#7ee8a2"}30`, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{ fontSize: 16, flexShrink: 0 }}>⏰</span>
//           <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0" }}>
//             Next reminder: <span style={{ color: nextMed.color || "#7ee8a2", fontWeight: 700 }}>{nextMed.name}</span> at <span style={{ color: "#e8eaf2", fontFamily: "JetBrains Mono, monospace" }}>{nextMed.scheduledTime}</span>
//           </div>
//         </div>
//       )}

//       {/* Today's adherence card */}
//       <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 14, padding: 16 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
//           <div>
//             <div style={{ fontFamily: "Syne, sans-serif", fontSize: 11, color: "#4d5370", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Today's Adherence</div>
//             <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 700, color: adherenceColor }}>
//               {takenToday}/{meds.length} <span style={{ fontSize: 14 }}>taken</span>
//             </div>
//           </div>
//           <div style={{ background: `${adherenceColor}20`, borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
//             <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 18, fontWeight: 700, color: adherenceColor }}>{adherencePct}%</div>
//             <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#4d5370" }}>today</div>
//           </div>
//         </div>
//         <div style={{ fontFamily: "Syne, sans-serif", fontSize: 10, color: "#4d5370", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>7-Day Adherence</div>
//         <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 44 }}>
//           {weekAdherence.map((v, i) => {
//             const barColor = v === 100 ? "#7ee8a2" : v >= 70 ? "#f5c842" : v > 0 ? "#ff6b6b" : "#232840";
//             return (
//               <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
//                 <div style={{ width: "100%", background: barColor, borderRadius: 4, height: `${Math.max(v * 0.36, v > 0 ? 4 : 0)}px`, opacity: 0.8, transition: "height .5s" }} />
//                 <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#4d5370" }}>{DAYS[i]}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Mood insight */}
//       {adherence?.moodInsight?.length > 0 && (
//         <div style={{ background: "#5b8dee15", border: "1px solid #5b8dee30", borderRadius: 14, padding: 14 }}>
//           <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
//             <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
//             <div>
//               <div style={{ fontFamily: "Syne, sans-serif", fontSize: 13, color: "#5b8dee", fontWeight: 700, marginBottom: 4 }}>Mood Correlation Insight</div>
//               <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", lineHeight: 1.5 }}>
//                 Taking <span style={{ color: "#e8eaf2", fontWeight: 600 }}>{adherence.moodInsight[0].name}</span> consistently is linked to a <span style={{ color: "#7ee8a2", fontWeight: 700 }}>+{adherence.moodInsight[0].correlation}</span> avg mood improvement on taken days.
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Med cards */}
//       {sortedMeds.map((med) => {
//         const taken = isTakenToday(med);
//         const color = med.color || "#7ee8a2";
//         const [h, m] = med.scheduledTime.split(":").map(Number);
//         const isOverdue = !taken && (h * 60 + m) <= nowMins;

//         return (
//           <div key={med._id} style={{ background: "#181c27", border: `1px solid ${taken ? color + "40" : isOverdue ? "#ff6b6b40" : "#232840"}`, borderRadius: 14, padding: 16, transition: "border .3s" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//               <button onClick={() => handleToggle(med)} disabled={logging === med._id}
//                 style={{ width: 38, height: 38, borderRadius: 10, border: `2px solid ${taken ? color : isOverdue ? "#ff6b6b" : "#232840"}`, background: taken ? `${color}20` : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>
//                 {logging === med._id ? <span style={{ fontSize: 14 }}>⋯</span> : taken ? <span style={{ color, fontSize: 16 }}>✓</span> : isOverdue ? <span style={{ color: "#ff6b6b", fontSize: 14, fontWeight: 700 }}>!</span> : null}
//               </button>

//               <div style={{ flex: 1 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: "#e8eaf2" }}>{med.name}</div>
//                   <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                     {med.reminderEnabled && permission === "granted" && (
//                       <span style={{ fontSize: 11 }} title="Reminder enabled">🔔</span>
//                     )}
//                     <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: isOverdue && !taken ? "#ff6b6b" : "#4d5370" }}>
//                       {med.scheduledTime}
//                     </div>
//                   </div>
//                 </div>
//                 <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 8 }}>
//                   {med.dose} · {med.type} ·{" "}
//                   {taken ? <span style={{ color }}>Taken ✓</span> : isOverdue ? <span style={{ color: "#ff6b6b" }}>Overdue !</span> : <span style={{ color: "#f5c842" }}>Upcoming</span>}
//                 </div>
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${color}15`, borderRadius: 99, padding: "3px 10px" }}>
//                     <span style={{ fontSize: 10 }}>🔥</span>
//                     <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color, fontWeight: 700 }}>{med.streak}d streak</span>
//                   </div>
//                   {med.moodCorrelation !== 0 && (
//                     <div style={{ background: "#5b8dee15", borderRadius: 99, padding: "3px 10px" }}>
//                       <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#5b8dee", fontWeight: 700 }}>
//                         Mood {med.moodCorrelation > 0 ? "+" : ""}{med.moodCorrelation}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <button onClick={() => deleteMedication(med._id)}
//                 style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4d5370", fontSize: 18, padding: "4px 8px" }}>
//                 ×
//               </button>
//             </div>
//           </div>
//         );
//       })}

//       <button onClick={() => setShowAdd(true)} style={{ background: "transparent", border: "1px dashed #232840", borderRadius: 14, padding: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
//         ＋ Add Medication / Supplement
//       </button>

//       {showAdd && <AddMedModal onClose={() => setShowAdd(false)} onAdd={addMedication} />}
//     </div>
//   );
// }
import { useState, useEffect, useRef, useCallback } from "react";
import { useMedications } from "./useEngagement";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// Convert "HH:MM" to total minutes since midnight
const toMins = (hhmm) => {
  const [h, m] = (hhmm || "00:00").split(":").map(Number);
  return h * 60 + m;
};

const getTodayKey = () => new Date().toISOString().split("T")[0];

const getNowMins = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

const isTakenToday = (med) => {
  const todayKey = getTodayKey();
  return med.doseLogs?.some((l) => {
    const d = new Date(l.date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0] === todayKey && l.taken;
  });
};

// ─── NOTIFICATION ENGINE ──────────────────────────────────────────────────────
function useMedNotifications(medsRef) {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );
  const firedRef = useRef(new Set());
  const permissionRef = useRef(permission);

  // keep permissionRef in sync
  useEffect(() => { permissionRef.current = permission; }, [permission]);

  const shoot = useCallback((med, label) => {
    if (permissionRef.current !== "granted") return;
    try {
      console.log(`[MedReminder] Firing notification for ${med.name} (${label})`);
      const n = new Notification(`💊 ${label}: ${med.name}`, {
        body: `Dose: ${med.dose}  •  Due: ${med.scheduledTime}  •  🔥 ${med.streak}d streak`,
        tag: `med-${med._id}`,
        requireInteraction: true,
        silent: false,
      });
      n.onclick = () => { window.focus(); n.close(); };
      setTimeout(() => n.close(), 20000);
    } catch (e) {
      console.warn("[MedReminder] Notification error:", e.message);
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) { alert("Browser does not support notifications."); return; }
    const result = await Notification.requestPermission();
    setPermission(result);
    permissionRef.current = result;
    if (result === "granted") {
      setTimeout(() => {
        new Notification("✅ Med reminders ON!", {
          body: "You'll be notified at each medication's scheduled time.",
          tag: "med-confirm",
        });
      }, 300);
    }
  }, []);

  // Single long-lived interval — reads medsRef.current so it always sees latest meds
  // without needing to restart the interval when meds load
  useEffect(() => {
    const check = (isInitialLoad = false) => {
      const meds = medsRef.current;
      if (!meds?.length || permissionRef.current !== "granted") return;

      const nowMins = getNowMins();
      const todayKey = getTodayKey();

      console.log(`[MedReminder] Checking ${meds.length} meds at ${String(Math.floor(nowMins/60)).padStart(2,"0")}:${String(nowMins%60).padStart(2,"0")} (initialLoad=${isInitialLoad})`);

      meds.forEach((med) => {
        if (!med.reminderEnabled) return;
        if (isTakenToday(med)) return;

        const fireKey = `${med._id}-${todayKey}`;
        if (firedRef.current.has(fireKey)) return;

        const scheduledMins = toMins(med.scheduledTime);
        const diff = nowMins - scheduledMins; // positive = overdue

        console.log(`[MedReminder] ${med.name}: scheduled=${med.scheduledTime}, diff=${diff}min`);

        if (isInitialLoad) {
          // Fire for anything overdue within last 90 mins on page load
          if (diff >= 0 && diff <= 90) {
            shoot(med, diff <= 2 ? "Time to take" : "Missed reminder");
            firedRef.current.add(fireKey);
          }
        } else {
          // Regular check: ±2 min window
          if (Math.abs(diff) <= 2) {
            shoot(med, "Time to take");
            firedRef.current.add(fireKey);
          }
        }
      });
    };

    // Start interval immediately — check(true) runs as soon as meds load via medsRef
    const id = setInterval(() => {
      const meds = medsRef.current;
      if (meds?.length) check(false);
    }, 30000);

    // Initial load check — retry until meds are available
    let attempts = 0;
    const waitForMeds = setInterval(() => {
      attempts++;
      const meds = medsRef.current;
      if (meds?.length) {
        check(true);
        clearInterval(waitForMeds);
      } else if (attempts > 20) {
        clearInterval(waitForMeds); // give up after 10s
      }
    }, 500);

    // Reset fired keys at midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const midnightId = setTimeout(() => firedRef.current.clear(), midnight - now);

    return () => {
      clearInterval(id);
      clearInterval(waitForMeds);
      clearTimeout(midnightId);
    };
  }, []); // ← empty deps: interval starts once and never restarts

  return { permission, requestPermission };
}

// ─── NOTIFICATION BANNER ──────────────────────────────────────────────────────
function NotificationBanner({ permission, onRequest, onTest }) {
  if (permission === "granted") {
    return (
      <div style={{ background: "#7ee8a215", border: "1px solid #7ee8a230", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 16 }}>🔔</span>
        <div style={{ flex: 1, fontFamily: "DM Sans, sans-serif", fontSize: 12 }}>
          <span style={{ color: "#7ee8a2", fontWeight: 700 }}>Reminders active</span>
          <span style={{ color: "#8891b0" }}> — notified at scheduled time ±2 mins, and on page load if missed</span>
        </div>
        <button onClick={onTest} style={{ flexShrink: 0, padding: "4px 12px", background: "transparent", border: "1px solid #7ee8a240", borderRadius: 6, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#7ee8a2" }}>
          Test
        </button>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7ee8a2", boxShadow: "0 0 6px #7ee8a2", flexShrink: 0 }} />
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div style={{ background: "#ff6b6b15", border: "1px solid #ff6b6b30", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 16 }}>🔕</span>
        <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#ff6b6b", lineHeight: 1.5 }}>
          Notifications are blocked. Go to <strong>Browser Settings → Site Settings → Notifications</strong> and allow this site.
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5c84215", border: "1px solid #f5c84230", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 22, flexShrink: 0 }}>🔔</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 13, color: "#f5c842", fontWeight: 700, marginBottom: 2 }}>Enable Medication Reminders</div>
        <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0" }}>
          Get a browser notification exactly at each medication's scheduled time.
        </div>
      </div>
      <button onClick={onRequest} style={{ flexShrink: 0, padding: "8px 18px", background: "#f5c842", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 700, color: "#0d0f14" }}>
        Enable
      </button>
    </div>
  );
}

// ─── ADD MED MODAL ────────────────────────────────────────────────────────────
function AddMedModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", dose: "", type: "medication", scheduledTime: "08:00", color: "#7ee8a2", reminderEnabled: true, notes: "" });
  const [saving, setSaving] = useState(false);
  const COLORS = ["#7ee8a2", "#5b8dee", "#b57bee", "#f5c842", "#f07bca", "#ff6b6b"];

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.dose.trim()) return;
    setSaving(true);
    try { await onAdd(form); onClose(); }
    finally { setSaving(false); }
  };

  const inputStyle = { width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 8, padding: "9px 12px", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", outline: "none", boxSizing: "border-box" };
  const labelStyle = { display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 5 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000090", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
      <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 16, padding: 24, width: "min(480px,90vw)", maxHeight: "90vh", overflowY: "auto" }}>
        <h3 style={{ color: "#e8eaf2", fontFamily: "Syne, sans-serif", fontSize: 16, marginBottom: 20 }}>Add Medication / Supplement</h3>

        {[
          { label: "Name", key: "name", placeholder: "e.g. Sertraline" },
          { label: "Dose", key: "dose", placeholder: "e.g. 50mg" },
          { label: "Scheduled Time", key: "scheduledTime", type: "time" },
        ].map(({ label, key, placeholder, type = "text" }) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{label}</label>
            <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} style={inputStyle} />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Type</label>
          <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} style={inputStyle}>
            {["medication", "supplement", "vitamin", "other"].map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Color</label>
          <div style={{ display: "flex", gap: 8 }}>
            {COLORS.map((c) => (
              <div key={c} onClick={() => setForm((p) => ({ ...p, color: c }))}
                style={{ width: 24, height: 24, borderRadius: "50%", background: c, cursor: "pointer", border: form.color === c ? "2px solid #e8eaf2" : "2px solid transparent", boxSizing: "border-box" }} />
            ))}
          </div>
        </div>

        {/* Reminder toggle */}
        <div style={{ marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#13161e", border: "1px solid #232840", borderRadius: 10, padding: "10px 14px" }}>
          <div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", fontWeight: 600 }}>🔔 Browser Reminder</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", marginTop: 2 }}>Notify me at {form.scheduledTime}</div>
          </div>
          <div onClick={() => setForm((p) => ({ ...p, reminderEnabled: !p.reminderEnabled }))}
            style={{ width: 42, height: 22, borderRadius: 99, cursor: "pointer", position: "relative", flexShrink: 0, background: form.reminderEnabled ? "#7ee8a2" : "#232840", transition: "background .2s" }}>
            <div style={{ position: "absolute", top: 2, left: form.reminderEnabled ? 22 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 10, background: "transparent", border: "1px solid #232840", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", color: "#8891b0", fontSize: 13 }}>Cancel</button>
          <button onClick={handleSubmit} disabled={saving || !form.name.trim()} style={{ flex: 2, padding: 10, background: saving ? "#232840" : "#7ee8a2", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#0d0f14", fontSize: 13 }}>
            {saving ? "Saving..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Medications() {
  const { meds, adherence, loading, error, addMedication, logDose, deleteMedication } = useMedications();
  const [showAdd, setShowAdd] = useState(false);
  const [logging, setLogging] = useState(null);

  // medsRef always holds latest meds — notification engine reads this
  // so the interval doesn't need to restart every time meds updates
  const medsRef = useRef([]);
  useEffect(() => { medsRef.current = meds; }, [meds]);

  const { permission, requestPermission } = useMedNotifications(medsRef);

  // Test button — fires a sample notification immediately
  const testNotification = useCallback(() => {
    if (permission !== "granted") return;
    try {
      const n = new Notification("💊 Test Reminder — MindNest", {
        body: "Notifications are working! You'll be reminded at each medication's scheduled time.",
        tag: "med-test",
        requireInteraction: false,
        silent: false,
      });
      n.onclick = () => { window.focus(); n.close(); };
      setTimeout(() => n.close(), 6000);
    } catch (e) {
      alert("Notification error: " + e.message);
    }
  }, [permission]);

  const todayKey = new Date().toISOString().split("T")[0];

  const isTakenToday = (med) =>
    med.doseLogs?.some((l) => {
      const d = new Date(l.date); d.setHours(0, 0, 0, 0);
      return d.toISOString().split("T")[0] === todayKey && l.taken;
    });

  const handleToggle = async (med) => {
    setLogging(med._id);
    try { await logDose(med._id, !isTakenToday(med)); }
    catch { alert("Failed to log dose"); }
    finally { setLogging(null); }
  };

  const weekAdherence = adherence?.dailyAdherence ? Object.values(adherence.dailyAdherence) : Array(7).fill(0);

  if (loading) return <div style={{ color: "#8891b0", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>Loading medications...</div>;
  if (error) return <div style={{ color: "#ff6b6b", textAlign: "center", padding: 40 }}>{error}</div>;

  const takenToday = meds.filter(isTakenToday).length;
  const adherencePct = meds.length ? Math.round((takenToday / meds.length) * 100) : 0;
  const adherenceColor = adherencePct === 100 ? "#7ee8a2" : adherencePct >= 50 ? "#f5c842" : "#ff6b6b";

  // Sort by scheduled time ascending
  const sortedMeds = [...meds].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  // Next upcoming untaken med
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const nextMed = sortedMeds.find((m) => {
    if (isTakenToday(m)) return false;
    const [h, min] = m.scheduledTime.split(":").map(Number);
    return h * 60 + min > nowMins;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Notification permission banner */}
      <NotificationBanner permission={permission} onRequest={requestPermission} onTest={testNotification} />

      {/* Next reminder pill */}
      {nextMed && permission === "granted" && (
        <div style={{ background: `${nextMed.color || "#7ee8a2"}12`, border: `1px solid ${nextMed.color || "#7ee8a2"}30`, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⏰</span>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0" }}>
            Next reminder: <span style={{ color: nextMed.color || "#7ee8a2", fontWeight: 700 }}>{nextMed.name}</span> at <span style={{ color: "#e8eaf2", fontFamily: "JetBrains Mono, monospace" }}>{nextMed.scheduledTime}</span>
          </div>
        </div>
      )}

      {/* Today's adherence card */}
      <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 14, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 11, color: "#4d5370", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Today's Adherence</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 700, color: adherenceColor }}>
              {takenToday}/{meds.length} <span style={{ fontSize: 14 }}>taken</span>
            </div>
          </div>
          <div style={{ background: `${adherenceColor}20`, borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 18, fontWeight: 700, color: adherenceColor }}>{adherencePct}%</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#4d5370" }}>today</div>
          </div>
        </div>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 10, color: "#4d5370", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>7-Day Adherence</div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 44 }}>
          {weekAdherence.map((v, i) => {
            const barColor = v === 100 ? "#7ee8a2" : v >= 70 ? "#f5c842" : v > 0 ? "#ff6b6b" : "#232840";
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", background: barColor, borderRadius: 4, height: `${Math.max(v * 0.36, v > 0 ? 4 : 0)}px`, opacity: 0.8, transition: "height .5s" }} />
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#4d5370" }}>{DAYS[i]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood insight */}
      {adherence?.moodInsight?.length > 0 && (
        <div style={{ background: "#5b8dee15", border: "1px solid #5b8dee30", borderRadius: 14, padding: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
            <div>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: 13, color: "#5b8dee", fontWeight: 700, marginBottom: 4 }}>Mood Correlation Insight</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", lineHeight: 1.5 }}>
                Taking <span style={{ color: "#e8eaf2", fontWeight: 600 }}>{adherence.moodInsight[0].name}</span> consistently is linked to a <span style={{ color: "#7ee8a2", fontWeight: 700 }}>+{adherence.moodInsight[0].correlation}</span> avg mood improvement on taken days.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Med cards */}
      {sortedMeds.map((med) => {
        const taken = isTakenToday(med);
        const color = med.color || "#7ee8a2";
        const [h, m] = med.scheduledTime.split(":").map(Number);
        const isOverdue = !taken && (h * 60 + m) <= nowMins;

        return (
          <div key={med._id} style={{ background: "#181c27", border: `1px solid ${taken ? color + "40" : isOverdue ? "#ff6b6b40" : "#232840"}`, borderRadius: 14, padding: 16, transition: "border .3s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button onClick={() => handleToggle(med)} disabled={logging === med._id}
                style={{ width: 38, height: 38, borderRadius: 10, border: `2px solid ${taken ? color : isOverdue ? "#ff6b6b" : "#232840"}`, background: taken ? `${color}20` : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>
                {logging === med._id ? <span style={{ fontSize: 14 }}>⋯</span> : taken ? <span style={{ color, fontSize: 16 }}>✓</span> : isOverdue ? <span style={{ color: "#ff6b6b", fontSize: 14, fontWeight: 700 }}>!</span> : null}
              </button>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: "#e8eaf2" }}>{med.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {med.reminderEnabled && permission === "granted" && (
                      <span style={{ fontSize: 11 }} title="Reminder enabled">🔔</span>
                    )}
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: isOverdue && !taken ? "#ff6b6b" : "#4d5370" }}>
                      {med.scheduledTime}
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 8 }}>
                  {med.dose} · {med.type} ·{" "}
                  {taken ? <span style={{ color }}>Taken ✓</span> : isOverdue ? <span style={{ color: "#ff6b6b" }}>Overdue !</span> : <span style={{ color: "#f5c842" }}>Upcoming</span>}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${color}15`, borderRadius: 99, padding: "3px 10px" }}>
                    <span style={{ fontSize: 10 }}>🔥</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color, fontWeight: 700 }}>{med.streak}d streak</span>
                  </div>
                  {med.moodCorrelation !== 0 && (
                    <div style={{ background: "#5b8dee15", borderRadius: 99, padding: "3px 10px" }}>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#5b8dee", fontWeight: 700 }}>
                        Mood {med.moodCorrelation > 0 ? "+" : ""}{med.moodCorrelation}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <button onClick={() => deleteMedication(med._id)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4d5370", fontSize: 18, padding: "4px 8px" }}>
                ×
              </button>
            </div>
          </div>
        );
      })}

      <button onClick={() => setShowAdd(true)} style={{ background: "transparent", border: "1px dashed #232840", borderRadius: 14, padding: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        ＋ Add Medication / Supplement
      </button>

      {showAdd && <AddMedModal onClose={() => setShowAdd(false)} onAdd={addMedication} />}
    </div>
  );
}