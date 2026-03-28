import React from "react";
import { useState } from "react";
import { useGratitude } from "./useEngagement";

function SentimentBar({ score }) {
  const pct = Math.round(score * 100);
  const color = score > 0.8 ? "#7ee8a2" : score > 0.6 ? "#f5c842" : "#ff6b6b";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: "#232840", borderRadius: 99 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 1s" }} />
      </div>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color, fontWeight: 700, flexShrink: 0 }}>{pct}%</span>
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function GratitudeLog() {
  const { entries, prompt, stats, loading, error, addEntry } = useGratitude();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newEntry, setNewEntry] = useState(null);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      const result = await addEntry({ prompt, entry: text });
      setNewEntry(result);
      setText("");
      setSubmitted(true);
    } catch (e) {
      alert(e.response?.data?.message || "Failed to save entry");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ color: "#8891b0", textAlign: "center", padding: 40, fontFamily: "DM Sans, sans-serif" }}>Loading...</div>;
  if (error) return <div style={{ color: "#ff6b6b", textAlign: "center", padding: 40 }}>{error}</div>;

  // Build 7-day sentiment bars from stats.dailyData
  const weekBars = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    return stats?.dailyData?.[key] || 0;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Weekly overview */}
      {stats && (
        <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 14, padding: 16, display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 11, color: "#4d5370", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Weekly Positivity</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 28, fontWeight: 700, color: "#7ee8a2" }}>
              {Math.round((stats.avgSentiment || 0) * 100)}%
            </div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0" }}>
              avg sentiment · {stats.totalEntries} entries · {stats.currentStreak}d streak
            </div>
          </div>
          <div style={{ display: "flex", gap: 3 }}>
            {weekBars.map((v, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column-reverse", height: 50, alignItems: "center", gap: 2 }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "#4d5370" }}>{DAYS[i]}</div>
                <div style={{ width: 8, background: "#7ee8a2", borderRadius: 99, height: `${v * 80}%`, minHeight: v > 0 ? 4 : 0, opacity: 0.4 + v * 0.6 }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New entry */}
      {!submitted ? (
        <div style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 14, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7ee8a2", boxShadow: "0 0 8px #7ee8a2" }} />
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 11, color: "#7ee8a2", letterSpacing: "0.1em", textTransform: "uppercase" }}>Today's Prompt</div>
          </div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 15, color: "#e8eaf2", marginBottom: 14, lineHeight: 1.5 }}>
            "{prompt}"
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write freely — this is just for you..."
            rows={4}
            style={{ width: "100%", background: "#13161e", border: "1px solid #232840", borderRadius: 10, padding: "10px 12px",
              fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", resize: "vertical", outline: "none",
              boxSizing: "border-box", lineHeight: 1.6 }}
          />
          <button onClick={handleSubmit} disabled={submitting || !text.trim()}
            style={{ marginTop: 10, padding: "10px 20px", background: submitting ? "#232840" : "#7ee8a2", border: "none",
              borderRadius: 10, cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 700,
              color: submitting ? "#4d5370" : "#0d0f14", transition: "all .2s" }}>
            {submitting ? "✦ Analyzing sentiment..." : "Save Entry →"}
          </button>
        </div>
      ) : (
        <div style={{ background: "#7ee8a215", border: "1px solid #7ee8a240", borderRadius: 14, padding: 16, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>{newEntry?.mood || "✨"}</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 14, color: "#7ee8a2", fontWeight: 700 }}>Entry saved!</div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0", marginTop: 4 }}>
            Positivity score: {Math.round((newEntry?.sentiment?.score || 0) * 100)}%
          </div>
          <button onClick={() => { setSubmitted(false); setNewEntry(null); }}
            style={{ marginTop: 12, background: "transparent", border: "1px solid #232840", borderRadius: 8, padding: "6px 16px",
              cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#8891b0" }}>
            Write another
          </button>
        </div>
      )}

      {/* Entries list */}
      {entries.map((entry) => (
        <div key={entry._id} style={{ background: "#181c27", border: "1px solid #232840", borderRadius: 14, padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 18 }}>{entry.mood}</span>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370" }}>{formatDate(entry.date)}</span>
            </div>
            {entry.streak > 0 && (
              <div style={{ background: "#7ee8a220", borderRadius: 99, padding: "3px 10px", display: "flex", gap: 4, alignItems: "center" }}>
                <span style={{ fontSize: 10 }}>🔥</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#7ee8a2", fontWeight: 700 }}>{entry.streak}d</span>
              </div>
            )}
          </div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#4d5370", fontStyle: "italic", marginBottom: 6 }}>
            "{entry.prompt}"
          </div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#e8eaf2", lineHeight: 1.6, marginBottom: 10 }}>
            {entry.entry}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#4d5370", flexShrink: 0 }}>Positivity</span>
            <SentimentBar score={entry.sentiment?.score || 0} />
          </div>
        </div>
      ))}

      {entries.length === 0 && !submitted && (
        <div style={{ textAlign: "center", padding: "24px 0", fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#4d5370" }}>
          No entries yet. Write your first one above ↑
        </div>
      )}
    </div>
  );
}