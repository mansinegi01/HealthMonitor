// import React, { useState, useEffect } from "react";
// import { useMedications } from "./useEngagement";

// const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// // ─── HELPERS ──────────────────────────────────────────────────────────────────
// const toMins = (hhmm) => {
//   const [h, m] = (hhmm || "00:00").split(":").map(Number);
//   return h * 60 + m;
// };
// const getTodayKey = () => new Date().toISOString().split("T")[0];
// const getNowMins = () => { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); };
// const isTakenToday = (med) => {
//   const todayKey = getTodayKey();
//   return med.doseLogs?.some((l) => {
//     const d = new Date(l.date); d.setHours(0, 0, 0, 0);
//     return d.toISOString().split("T")[0] === todayKey && l.taken;
//   }) ?? false;
// };

// // ─── SESSION STORAGE FIRED SET ────────────────────────────────────────────────
// // const STORAGE_KEY = "medNotifyFired-" + getTodayKey();
// // function loadFiredSet() {
// //   try { const r = sessionStorage.getItem(STORAGE_KEY); return r ? new Set(JSON.parse(r)) : new Set(); }
// //   catch { return new Set(); }
// // }
// // function saveFiredSet(set) {
// //   try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...set])); } catch { }
// // }

// // ─── IN-APP TOAST ─────────────────────────────────────────────────────────────
// // A toast is injected directly into the DOM — works in ALL browsers/OS
// // regardless of notification permissions or OS settings.
// let toastContainer = null;

// function showToast(title, body, color = "#7ee8a2") {
//   // Create container once
//   if (!toastContainer) {
//     toastContainer = document.createElement("div");
//     toastContainer.style.cssText = [
//       "position:fixed", "top:20px", "right:20px", "z-index:99999",
//       "display:flex", "flex-direction:column", "gap:10px",
//       "pointer-events:none", "max-width:320px",
//     ].join(";");
//     document.body.appendChild(toastContainer);
//   }

//   const toast = document.createElement("div");
//   toast.style.cssText = [
//     "background:#181c27",
//     "border:1px solid " + color + "40",
//     "border-left:4px solid " + color,
//     "border-radius:12px",
//     "padding:14px 16px",
//     "box-shadow:0 8px 32px #00000080",
//     "pointer-events:all",
//     "cursor:pointer",
//     "animation:toastIn .3s cubic-bezier(.34,1.56,.64,1)",
//     "font-family:DM Sans,sans-serif",
//     "min-width:280px",
//   ].join(";");

//   toast.innerHTML = `
//     <div style="display:flex;align-items:flex-start;gap:10px;">
//       <span style="font-size:20px;flex-shrink:0">💊</span>
//       <div style="flex:1">
//         <div style="font-size:13px;font-weight:700;color:#e8eaf2;margin-bottom:3px">${title}</div>
//         <div style="font-size:12px;color:#8891b0;line-height:1.4">${body}</div>
//       </div>
//       <span style="color:#4d5370;font-size:16px;cursor:pointer;line-height:1;flex-shrink:0" 
//             onclick="this.closest('[data-toast]').remove()">×</span>
//     </div>
//   `;
//   toast.setAttribute("data-toast", "1");
//   toast.onclick = () => toast.remove();

//   // Inject keyframe once
//   if (!document.getElementById("toast-style")) {
//     const s = document.createElement("style");
//     s.id = "toast-style";
//     s.textContent = `
//       @keyframes toastIn { from { opacity:0; transform:translateX(40px) scale(.95); } to { opacity:1; transform:none; } }
//       @keyframes toastOut { to { opacity:0; transform:translateX(40px) scale(.95); } }
//     `;
//     document.head.appendChild(s);
//   }

//   toastContainer.appendChild(toast);

//   // Also try native notification as bonus (may or may not work depending on OS)
//   if (typeof Notification !== "undefined" && Notification.permission === "granted") {
//     try { new Notification(title, { body, silent: false }); } catch { }
//   }

//   // Auto-dismiss after 8 seconds
//   setTimeout(() => {
//     toast.style.animation = "toastOut .3s ease forwards";
//     setTimeout(() => toast.remove(), 300);
//   }, 8000);
// }

// // ─── NOTIFICATION ENGINE ──────────────────────────────────────────────────────
// // function useMedNotifications(medsRef) {
// //   const [permission, setPermission] = useState(
// //     typeof Notification !== "undefined" ? Notification.permission : "default"
// //   );
// //   const permissionRef = useRef(permission);
// //   const firedRef = useRef(loadFiredSet());

// //   useEffect(() => { permissionRef.current = permission; }, [permission]);

// //   const requestPermission = useCallback(async () => {
// //     if (!("Notification" in window)) return;
// //     const result = await Notification.requestPermission();
// //     setPermission(result);
// //     permissionRef.current = result;
// //     if (result === "granted") {
// //       setTimeout(() => showToast("✅ Reminders ON", "You'll see a popup at each medication's scheduled time."), 400);
// //     }
// //   }, []);

// //   const testNotification = useCallback(() => {
// //     showToast("💊 Test Reminder — MindNest", "In-app notifications are working perfectly!");
// //   }, []);

// //   const check = useCallback((isInitialLoad = false) => {
// //     const meds = medsRef.current;
// //     if (!meds?.length) return;

// //     const nowMins  = getNowMins();
// //     const todayKey = getTodayKey();

// //     meds.forEach((med) => {
// //       const fireKey       = `${med._id}-${todayKey}`;
// //       const scheduledMins = toMins(med.scheduledTime);
// //       const diff          = nowMins - scheduledMins;
// //       const taken         = isTakenToday(med);

// //       if (!med.reminderEnabled) return;
// //       if (taken) return;
// //       if (firedRef.current.has(fireKey)) return;

// //       if (isInitialLoad) {
// //         // Fire for any untaken med scheduled earlier today (up to 10 hours ago)
// //         if (diff >= 0 && diff <= 600) {
// //           const label = diff <= 2 ? "Time to take" : "Missed dose";
// //           firedRef.current.add(fireKey);
// //           saveFiredSet(firedRef.current);
// //           showToast(`${label}: ${med.name}`, `${med.dose} · was scheduled at ${med.scheduledTime}`);
// //         }
// //       } else {
// //         // Regular poll: fire at scheduled time (±2 min window)
// //         if (diff >= 0 && diff <= 2) {
// //           firedRef.current.add(fireKey);
// //           saveFiredSet(firedRef.current);
// //           showToast(`Time to take: ${med.name}`, `${med.dose} · scheduled at ${med.scheduledTime}`);
// //         }
// //       }
// //     });
// //   }, [medsRef]);

// //   useEffect(() => {
// //     const intervalId = setInterval(() => check(false), 30_000);

// //     let attempts = 0;
// //     const waitId = setInterval(() => {
// //       attempts++;
// //       if (medsRef.current?.length) { check(true); clearInterval(waitId); }
// //       else if (attempts > 20) clearInterval(waitId);
// //     }, 500);

// //     const now = new Date();
// //     const midnight = new Date(now); midnight.setHours(24, 0, 0, 0);
// //     const midnightId = setTimeout(() => { firedRef.current.clear(); }, midnight - now);

// //     return () => { clearInterval(intervalId); clearInterval(waitId); clearTimeout(midnightId); };
// //   }, []);

// //   return { permission, requestPermission, testNotification };
// // }

// // ─── NOTIFICATION BANNER ──────────────────────────────────────────────────────
// function NotificationBanner({ permission, onRequest, onTest }) {
//   // Always show as active since in-app toasts work regardless of permission
//   return (
//     <div style={{ background: "#7ee8a215", border: "1px solid #7ee8a230", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
//       <span style={{ fontSize: 16 }}>🔔</span>
//       <div style={{ flex: 1, fontFamily: "DM Sans, sans-serif", fontSize: 12 }}>
//         <span style={{ color: "#7ee8a2", fontWeight: 700 }}>Reminders active</span>
//         <span style={{ color: "#8891b0" }}> — in-app popup at scheduled time ±2 min, and on page load if missed</span>
//       </div>
//       <button onClick={onTest} style={{ flexShrink: 0, padding: "4px 12px", background: "transparent", border: "1px solid #7ee8a240", borderRadius: 6, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#7ee8a2" }}>
//         Test
//       </button>
//       <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7ee8a2", boxShadow: "0 0 6px #7ee8a2", flexShrink: 0 }} />
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
//     try { await onAdd(form); onClose(); } finally { setSaving(false); }
//   };
//   const inp = { width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 8, padding: "9px 12px", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", outline: "none", boxSizing: "border-box" };
//   const lbl = { display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 5 };
//   return (
//     <div style={{ position: "fixed", inset: 0, background: "#00000090", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
//       <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 16, padding: 24, width: "min(480px,90vw)", maxHeight: "90vh", overflowY: "auto" }}>
//         <h3 style={{ color: "#e8eaf2", fontFamily: "Syne, sans-serif", fontSize: 16, marginBottom: 20 }}>Add Medication / Supplement</h3>
//         {[
//           { label: "Name", key: "name", placeholder: "e.g. Sertraline", type: "text" },
//           { label: "Dose", key: "dose", placeholder: "e.g. 50mg", type: "text" },
//           { label: "Scheduled Time", key: "scheduledTime", type: "time" },
//         ].map(({ label, key, placeholder, type }) => (
//           <div key={key} style={{ marginBottom: 14 }}>
//             <label style={lbl}>{label}</label>
//             <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} style={inp} />
//           </div>
//         ))}
//         <div style={{ marginBottom: 14 }}>
//           <label style={lbl}>Type</label>
//           <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} style={inp}>
//             {["medication", "supplement", "vitamin", "other"].map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
//           </select>
//         </div>
//         <div style={{ marginBottom: 14 }}>
//           <label style={lbl}>Notes (optional)</label>
//           <input type="text" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} placeholder="e.g. Take with food" style={inp} />
//         </div>
//         <div style={{ marginBottom: 14 }}>
//           <label style={lbl}>Color</label>
//           <div style={{ display: "flex", gap: 8 }}>
//             {COLORS.map((c) => (
//               <div key={c} onClick={() => setForm((p) => ({ ...p, color: c }))}
//                 style={{ width: 24, height: 24, borderRadius: "50%", background: c, cursor: "pointer", border: form.color === c ? "2px solid #e8eaf2" : "2px solid transparent", boxSizing: "border-box" }} />
//             ))}
//           </div>
//         </div>
//         <div style={{ marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#13161e", border: "1px solid #232840", borderRadius: 10, padding: "10px 14px" }}>
//           <div>
//             <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", fontWeight: 600 }}>🔔 Reminder</div>
//             <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", marginTop: 2 }}>Show in-app popup at {form.scheduledTime}</div>
//           </div>
//           <div onClick={() => setForm((p) => ({ ...p, reminderEnabled: !p.reminderEnabled }))}
//             style={{ width: 42, height: 22, borderRadius: 99, cursor: "pointer", position: "relative", flexShrink: 0, background: form.reminderEnabled ? "#7ee8a2" : "#232840", transition: "background .2s" }}>
//             <div style={{ position: "absolute", top: 2, left: form.reminderEnabled ? 22 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
//           </div>
//         </div>
//         <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
//           <button onClick={onClose} style={{ flex: 1, padding: 10, background: "transparent", border: "1px solid #232840", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", color: "#8891b0", fontSize: 13 }}>Cancel</button>
//           <button onClick={handleSubmit} disabled={saving || !form.name.trim() || !form.dose.trim()}
//             style={{ flex: 2, padding: 10, background: saving || !form.name.trim() || !form.dose.trim() ? "#232840" : "#7ee8a2", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#0d0f14", fontSize: 13 }}>
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

//   // const medsRef = useRef([]);
//   // useEffect(() => { medsRef.current = meds; }, [meds]);

//   // const { permission, requestPermission, testNotification } = useMedNotifications(medsRef);
//   const permission =
//   typeof Notification !== "undefined"
//     ? Notification.permission
//     : "default";

// const requestPermission = async () => {
//   if ("Notification" in window) {
//     await Notification.requestPermission();
//   }
// };

// const testNotification = () => {
//   showToast(
//     "💊 Test Reminder — MindNest",
//     "In-app notifications are working perfectly!"
//   );
// };

//   // const handleToggle = async (med) => {
//   //   setLogging(med._id);
//   //   try { await logDose(med._id, !isTakenToday(med)); }
//   //   catch { alert("Failed to log dose. Please try again."); }
//   //   finally { setLogging(null); }
//   // };
//   const handleToggle = async (med) => {
//   setLogging(med._id);

//   try {
//     const res = await logDose(med._id, !isTakenToday(med));

//     console.log("LOG RESPONSE:", res);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLogging(null);
//   }
// };

//   const nowMins = getNowMins();
//   const weekAdherence = adherence?.dailyAdherence ? Object.values(adherence.dailyAdherence) : Array(7).fill(0);
//   const sortedMeds = [...meds].sort((a, b) => (a.scheduledTime || "").localeCompare(b.scheduledTime || ""));
//   const takenToday = meds.filter(isTakenToday).length;
//   const adherencePct = meds.length ? Math.round((takenToday / meds.length) * 100) : 0;
//   const adherenceColor = adherencePct === 100 ? "#7ee8a2" : adherencePct >= 50 ? "#f5c842" : "#ff6b6b";
//   const nextMed = sortedMeds.find((m) => !isTakenToday(m) && toMins(m.scheduledTime) > nowMins);

//   if (loading) return <div style={{ color: "#8891b0", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>Loading medications...</div>;
//   if (error)   return <div style={{ color: "#ff6b6b", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>{error}</div>;

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

//       <NotificationBanner permission={permission} onRequest={requestPermission} onTest={testNotification} />

//       {/* Next reminder pill */}
//       {nextMed && (
//         <div style={{ background: `${nextMed.color || "#7ee8a2"}12`, border: `1px solid ${nextMed.color || "#7ee8a2"}30`, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{ fontSize: 16, flexShrink: 0 }}>⏰</span>
//           <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0" }}>
//             Next reminder: <span style={{ color: nextMed.color || "#7ee8a2", fontWeight: 700 }}>{nextMed.name}</span> at{" "}
//             <span style={{ color: "#e8eaf2", fontFamily: "JetBrains Mono, monospace" }}>{nextMed.scheduledTime}</span>
//           </div>
//         </div>
//       )}

//       {/* Today adherence card */}
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
//             const bc = v === 100 ? "#7ee8a2" : v >= 70 ? "#f5c842" : v > 0 ? "#ff6b6b" : "#232840";
//             return (
//               <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
//                 <div style={{ width: "100%", background: bc, borderRadius: 4, height: `${Math.max(v * 0.36, v > 0 ? 4 : 0)}px`, opacity: 0.8, transition: "height .5s" }} />
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
//                 Taking <span style={{ color: "#e8eaf2", fontWeight: 600 }}>{adherence.moodInsight[0].name}</span> consistently is linked to a{" "}
//                 <span style={{ color: "#7ee8a2", fontWeight: 700 }}>+{adherence.moodInsight[0].correlation}</span> avg mood improvement.
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Med cards */}
//       {sortedMeds.map((med) => {
//         const taken    = isTakenToday(med);
//         const color    = med.color || "#7ee8a2";
//         const isOverdue = !taken && toMins(med.scheduledTime) <= nowMins;
//         const isLogging = logging === med._id;
//         return (
//           <div key={med._id} style={{ background: "#181c27", border: `1px solid ${taken ? color + "40" : isOverdue ? "#ff6b6b40" : "#232840"}`, borderRadius: 14, padding: 16, transition: "border .3s" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

//   <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//     <button
//       onClick={() => handleToggle(med)}
//       disabled={isLogging}
//       style={{
//         minWidth: "120px",
//         padding: "10px 14px",
//         borderRadius: 10,
//         border: "none",
//         cursor: "pointer",
//         fontFamily: "DM Sans, sans-serif",
//         fontWeight: 700,
//         fontSize: 12,
//         background: taken ? `${color}20` : color,
//         color: taken ? color : "#0d0f14",
//         transition: "all .2s",
//       }}
//     >
//       {isLogging
//         ? "Saving..."
//         : taken
//         ? "✓ Taken"
//         : "Mark Taken"}
//     </button>

//     {taken && (
//       <button
//         onClick={() => handleToggle(med)}
//         style={{
//           padding: "6px 10px",
//           borderRadius: 8,
//           border: "1px solid #232840",
//           background: "transparent",
//           color: "#8891b0",
//           cursor: "pointer",
//           fontSize: 11,
//         }}
//       >
//         Undo
//       </button>
//     )}
//   </div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                   <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: "#e8eaf2" }}>{med.name}</div>
//                   <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                     {med.reminderEnabled && <span style={{ fontSize: 11 }} title="Reminder enabled">🔔</span>}
//                     <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: isOverdue && !taken ? "#ff6b6b" : "#4d5370" }}>{med.scheduledTime}</div>
//                   </div>
//                 </div>
//                 <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 8 }}>
//                   {med.dose} · {med.type} ·{" "}
//                   {taken ? (
//   <span style={{ color: "#7ee8a2", fontWeight: 600 }}>
//     ✓ Taken Today
//   </span>
// ) : isOverdue ? (
//   <span style={{ color: "#ff6b6b", fontWeight: 600 }}>
//     ⚠ Missed / Overdue
//   </span>
// ) : (
//   <span style={{ color: "#f5c842", fontWeight: 600 }}>
//     ⏰ Upcoming
//   </span>
// )}
//                 </div>
//                 {med.notes && <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", fontStyle: "italic", marginBottom: 8 }}>{med.notes}</div>}
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${color}15`, borderRadius: 99, padding: "3px 10px" }}>
//                     <span style={{ fontSize: 10 }}>🔥</span>
//                     <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color, fontWeight: 700 }}>{med.streak ?? 0}d streak</span>
//                   </div>
//                   {med.moodCorrelation != null && med.moodCorrelation !== 0 && (
//                     <div style={{ background: "#5b8dee15", borderRadius: 99, padding: "3px 10px" }}>
//                       <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#5b8dee", fontWeight: 700 }}>
//                         Mood {med.moodCorrelation > 0 ? "+" : ""}{med.moodCorrelation}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <button onClick={() => deleteMedication(med._id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4d5370", fontSize: 18, padding: "4px 8px", lineHeight: 1 }}>×</button>
//             </div>
//           </div>
//         );
//       })}

//       {sortedMeds.length === 0 && (
//         <div style={{ textAlign: "center", padding: "24px 0", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370" }}>No medications added yet ↓</div>
//       )}

//       <button onClick={() => setShowAdd(true)} style={{ background: "transparent", border: "1px dashed #232840", borderRadius: 14, padding: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
//         ＋ Add Medication / Supplement
//       </button>

//       {showAdd && <AddMedModal onClose={() => setShowAdd(false)} onAdd={addMedication} />}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useMedications } from "./useEngagement";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const toMins = (hhmm) => {
  const [h, m] = (hhmm || "00:00").split(":").map(Number);
  return h * 60 + m;
};

// Generates an accurate local "YYYY-MM-DD" string instead of shifting to UTC
const getTodayKey = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getNowMins = () => { 
  const n = new Date(); 
  return n.getHours() * 60 + n.getMinutes(); 
};

// Compares the log dates using local calendar days to prevent timezone mismatch
const isTakenToday = (med) => {
  const todayKey = getTodayKey();
  return med.doseLogs?.some((l) => {
    if (!l.date || !l.taken) return false;
    
    const d = new Date(l.date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const logDateKey = `${year}-${month}-${day}`;
    
    return logDateKey === todayKey;
  }) ?? false;
};

// ─── IN-APP TOAST ─────────────────────────────────────────────────────────────
let toastContainer = null;

function showToast(title, body, color = "#7ee8a2") {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.style.cssText = [
      "position:fixed", "top:20px", "right:20px", "z-index:99999",
      "display:flex", "flex-direction:column", "gap:10px",
      "pointer-events:none", "max-width:320px",
    ].join(";");
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.style.cssText = [
    "background:#181c27",
    "border:1px solid " + color + "40",
    "border-left:4px solid " + color,
    "border-radius:12px",
    "padding:14px 16px",
    "box-shadow:0 8px 32px #00000080",
    "pointer-events:all",
    "cursor:pointer",
    "animation:toastIn .3s cubic-bezier(.34,1.56,.64,1)",
    "font-family:DM Sans,sans-serif",
    "min-width:280px",
  ].join(";");

  toast.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:10px;">
      <span style="font-size:20px;flex-shrink:0">💊</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700;color:#e8eaf2;margin-bottom:3px">${title}</div>
        <div style="font-size:12px;color:#8891b0;line-height:1.4">${body}</div>
      </div>
      <span style="color:#4d5370;font-size:16px;cursor:pointer;line-height:1;flex-shrink:0" 
            onclick="this.closest('[data-toast]').remove()">×</span>
    </div>
  `;
  toast.setAttribute("data-toast", "1");
  toast.onclick = () => toast.remove();

  if (!document.getElementById("toast-style")) {
    const s = document.createElement("style");
    s.id = "toast-style";
    s.textContent = `
      @keyframes toastIn { from { opacity:0; transform:translateX(40px) scale(.95); } to { opacity:1; transform:none; } }
      @keyframes toastOut { to { opacity:0; transform:translateX(40px) scale(.95); } }
    `;
    document.head.appendChild(s);
  }

  toastContainer.appendChild(toast);

  if (typeof Notification !== "undefined" && Notification.permission === "granted") {
    try { new Notification(title, { body, silent: false }); } catch { }
  }

  setTimeout(() => {
    toast.style.animation = "toastOut .3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 8000);
}

// ─── NOTIFICATION BANNER ──────────────────────────────────────────────────────
function NotificationBanner({ permission, onRequest, onTest }) {
  return (
    <div style={{ background: "#7ee8a215", border: "1px solid #7ee8a230", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 16 }}>🔔</span>
      <div style={{ flex: 1, fontFamily: "DM Sans, sans-serif", fontSize: 12 }}>
        <span style={{ color: "#7ee8a2", fontWeight: 700 }}>Reminders active</span>
        <span style={{ color: "#8891b0" }}> — in-app popup at scheduled time ±2 min, and on page load if missed</span>
      </div>
      <button onClick={onTest} style={{ flexShrink: 0, padding: "4px 12px", background: "transparent", border: "1px solid #7ee8a240", borderRadius: 6, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#7ee8a2" }}>
        Test
      </button>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#7ee8a2", boxShadow: "0 0 6px #7ee8a2", flexShrink: 0 }} />
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
    try { await onAdd(form); onClose(); } finally { setSaving(false); }
  };
  
  const inp = { width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 8, padding: "9px 12px", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", outline: "none", boxSizing: "border-box" };
  const lbl = { display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 5 };
  
  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000090", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
      <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 16, padding: 24, width: "min(480px,90vw)", maxHeight: "90vh", overflowY: "auto" }}>
        <h3 style={{ color: "#e8eaf2", fontFamily: "Syne, sans-serif", fontSize: 16, marginBottom: 20 }}>Add Medication / Supplement</h3>
        {[
          { label: "Name", key: "name", placeholder: "e.g. Sertraline", type: "text" },
          { label: "Dose", key: "dose", placeholder: "e.g. 50mg", type: "text" },
          { label: "Scheduled Time", key: "scheduledTime", type: "time" },
        ].map(({ label, key, placeholder, type }) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={lbl}>{label}</label>
            <input type={type} value={form[key]} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} placeholder={placeholder} style={inp} />
          </div>
        ))}
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Type</label>
          <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} style={inp}>
            {["medication", "supplement", "vitamin", "other"].map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Notes (optional)</label>
          <input type="text" value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} placeholder="e.g. Take with food" style={inp} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Color</label>
          <div style={{ display: "flex", gap: 8 }}>
            {COLORS.map((c) => (
              <div key={c} onClick={() => setForm((p) => ({ ...p, color: c }))}
                style={{ width: 24, height: 24, borderRadius: "50%", background: c, cursor: "pointer", border: form.color === c ? "2px solid #e8eaf2" : "2px solid transparent", boxSizing: "border-box" }} />
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#13161e", border: "1px solid #232840", borderRadius: 10, padding: "10px 14px" }}>
          <div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", fontWeight: 600 }}>🔔 Reminder</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", marginTop: 2 }}>Show in-app popup at {form.scheduledTime}</div>
          </div>
          <div onClick={() => setForm((p) => ({ ...p, reminderEnabled: !p.reminderEnabled }))}
            style={{ width: 42, height: 22, borderRadius: 99, cursor: "pointer", position: "relative", flexShrink: 0, background: form.reminderEnabled ? "#7ee8a2" : "#232840", transition: "background .2s" }}>
            <div style={{ position: "absolute", top: 2, left: form.reminderEnabled ? 22 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 10, background: "transparent", border: "1px solid #232840", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", color: "#8891b0", fontSize: 13 }}>Cancel</button>
          <button onClick={handleSubmit} disabled={saving || !form.name.trim() || !form.dose.trim()}
            style={{ flex: 2, padding: 10, background: saving || !form.name.trim() || !form.dose.trim() ? "#232840" : "#7ee8a2", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: "#0d0f14", fontSize: 13 }}>
            {saving ? "Saving..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Medications() {
  const { meds, adherence, loading, error, addMedication, logDose, deleteMedication } = useMedications();
  const [showAdd, setShowAdd] = useState(false);
  const [logging, setLogging] = useState(null);

  const permission = typeof Notification !== "undefined" ? Notification.permission : "default";

  const requestPermission = async () => {
    if ("Notification" in window) {
      await Notification.requestPermission();
    }
  };

  const testNotification = () => {
    showToast(
      "💊 Test Reminder — MindNest",
      "In-app notifications are working perfectly!"
    );
  };

  const handleToggle = async (med) => {
    setLogging(med._id);
    try {
      await logDose(med._id, !isTakenToday(med));
    } catch (err) {
      console.error("Failed to log dose:", err);
    } finally {
      setLogging(null);
    }
  };

  const nowMins = getNowMins();
  const weekAdherence = adherence?.dailyAdherence ? Object.values(adherence.dailyAdherence) : Array(7).fill(0);
  const sortedMeds = [...meds].sort((a, b) => (a.scheduledTime || "").localeCompare(b.scheduledTime || ""));
  const takenToday = meds.filter(isTakenToday).length;
  const adherencePct = meds.length ? Math.round((takenToday / meds.length) * 100) : 0;
  const adherenceColor = adherencePct === 100 ? "#7ee8a2" : adherencePct >= 50 ? "#f5c842" : "#ff6b6b";
  const nextMed = sortedMeds.find((m) => !isTakenToday(m) && toMins(m.scheduledTime) > nowMins);

  if (loading) return <div style={{ color: "#8891b0", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>Loading medications...</div>;
  if (error)   return <div style={{ color: "#ff6b6b", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>{error}</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      <NotificationBanner permission={permission} onRequest={requestPermission} onTest={testNotification} />

      {/* Next reminder pill */}
      {nextMed && (
        <div style={{ background: `${nextMed.color || "#7ee8a2"}12`, border: `1px solid ${nextMed.color || "#7ee8a2"}30`, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⏰</span>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0" }}>
            Next reminder: <span style={{ color: nextMed.color || "#7ee8a2", fontWeight: 700 }}>{nextMed.name}</span> at{" "}
            <span style={{ color: "#e8eaf2", fontFamily: "JetBrains Mono, monospace" }}>{nextMed.scheduledTime}</span>
          </div>
        </div>
      )}

      {/* Today adherence card */}
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
            const bc = v === 100 ? "#7ee8a2" : v >= 70 ? "#f5c842" : v > 0 ? "#ff6b6b" : "#232840";
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", background: bc, borderRadius: 4, height: `${Math.max(v * 0.36, v > 0 ? 4 : 0)}px`, opacity: 0.8, transition: "height .5s" }} />
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
                Taking <span style={{ color: "#e8eaf2", fontWeight: 600 }}>{adherence.moodInsight[0].name}</span> consistently is linked to a{" "}
                <span style={{ color: "#7ee8a2", fontWeight: 700 }}>+{adherence.moodInsight[0].correlation}</span> avg mood improvement.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Med cards */}
      {sortedMeds.map((med) => {
        const taken    = isTakenToday(med);
        const color    = med.color || "#7ee8a2";
        const isOverdue = !taken && toMins(med.scheduledTime) <= nowMins;
        const isLogging = logging === med._id;
        return (
          <div key={med._id} style={{ background: "#181c27", border: `1px solid ${taken ? color + "40" : isOverdue ? "#ff6b6b40" : "#232840"}`, borderRadius: 14, padding: 16, transition: "border .3s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button
                  onClick={() => handleToggle(med)}
                  disabled={isLogging}
                  style={{
                    minWidth: "120px",
                    padding: "10px 14px",
                    borderRadius: 10,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "DM Sans, sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    background: taken ? `${color}20` : color,
                    color: taken ? color : "#0d0f14",
                    transition: "all .2s",
                  }}
                >
                  {isLogging ? "Saving..." : taken ? "✓ Taken" : "Mark Taken"}
                </button>

                {taken && (
                  <button
                    onClick={() => handleToggle(med)}
                    disabled={isLogging}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: "1px solid #232840",
                      background: "transparent",
                      color: "#8891b0",
                      cursor: "pointer",
                      fontSize: 11,
                    }}
                  >
                    Undo
                  </button>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700, color: "#e8eaf2" }}>{med.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {med.reminderEnabled && <span style={{ fontSize: 11 }} title="Reminder enabled">🔔</span>}
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: isOverdue && !taken ? "#ff6b6b" : "#4d5370" }}>{med.scheduledTime}</div>
                  </div>
                </div>
                
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginBottom: 8 }}>
                  {med.dose} · {med.type} ·{" "}
                  {taken ? (
                    <span style={{ color: "#7ee8a2", fontWeight: 600 }}>✓ Taken Today</span>
                  ) : isOverdue ? (
                    <span style={{ color: "#ff6b6b", fontWeight: 600 }}>⚠ Missed / Overdue</span>
                  ) : (
                    <span style={{ color: "#f5c842", fontWeight: 600 }}>⏰ Upcoming</span>
                  )}
                </div>

                {med.notes && <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", fontStyle: "italic", marginBottom: 8 }}>{med.notes}</div>}
                
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: `${color}15`, borderRadius: 99, padding: "3px 10px" }}>
                    <span style={{ fontSize: 10 }}>🔥</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color, fontWeight: 700 }}>{med.streak ?? 0}d streak</span>
                  </div>
                  {med.moodCorrelation != null && med.moodCorrelation !== 0 && (
                    <div style={{ background: "#5b8dee15", borderRadius: 99, padding: "3px 10px" }}>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#5b8dee", fontWeight: 700 }}>
                        Mood {med.moodCorrelation > 0 ? "+" : ""}{med.moodCorrelation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => deleteMedication(med._id)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#4d5370", fontSize: 18, padding: "4px 8px", lineHeight: 1 }}>×</button>
            </div>
          </div>
        );
      })}

      {sortedMeds.length === 0 && (
        <div style={{ textAlign: "center", padding: "24px 0", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370" }}>No medications added yet ↓</div>
      )}

      <button onClick={() => setShowAdd(true)} style={{ background: "transparent", border: "1px dashed #232840", borderRadius: 14, padding: 14, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        ＋ Add Medication / Supplement
      </button>

      {showAdd && <AddMedModal onClose={() => setShowAdd(false)} onAdd={addMedication} />}
    </div>
  );
}