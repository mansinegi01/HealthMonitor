// import React from "react";
// import { useState } from "react";

// const BrainScanChecker = () => {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [agreed, setAgreed] = useState(false);

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0];
//     setFile(selected);
//     setPreview(URL.createObjectURL(selected));
//     setResult(null);
//   };

//   const handleSubmit = async () => {
//     if (!file) return;
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/predict", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (err) {
//       alert("Error connecting to AI service. Make sure it is running.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
//       <h2>🧠 Brain Tumor Screening</h2>

//       {!agreed ? (
//         <div style={{ background: "#fff3cd", padding: "15px", borderRadius: "8px" }}>
//           <p><strong>⚠️ Disclaimer:</strong> This tool is for awareness only and does <strong>NOT</strong> replace professional medical diagnosis. Always consult a doctor.</p>
//           <button onClick={() => setAgreed(true)} style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}>
//             I Understand, Proceed
//           </button>
//         </div>
//       ) : (
//         <>
//           <input type="file" accept="image/*" onChange={handleFileChange} />

//           {preview && (
//             <img src={preview} alt="MRI Preview" style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }} />
//           )}

//           <button
//             onClick={handleSubmit}
//             disabled={!file || loading}
//             style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer", width: "100%" }}
//           >
//             {loading ? "Analyzing..." : "Analyze MRI Scan"}
//           </button>

//           {result && (
//             <div style={{ marginTop: "15px", padding: "15px", background: result.result === "notumor" ? "#d4edda" : "#f8d7da", borderRadius: "8px" }}>
//               <h3>Result: {result.result === "notumor" ? "✅ No Tumor Detected" : `⚠️ ${result.result} indicator detected`}</h3>
//               <p>Confidence: {result.confidence}%</p>
//               {result.result !== "notumor" && (
//                 <p>⚠️ Please consult a neurologist for a professional diagnosis.</p>
//               )}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default BrainScanChecker;
import React, { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

  .bsc-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f1117 0%, #141820 50%, #0d1219 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    font-family: 'DM Sans', sans-serif;
  }

  .bsc-card {
    width: 100%;
    max-width: 520px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 28px;
    padding: 48px 44px;
    backdrop-filter: blur(20px);
    position: relative;
    overflow: hidden;
  }

  .bsc-card::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .bsc-card::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .bsc-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(139,92,246,0.8);
    margin-bottom: 12px;
  }

  .bsc-title {
    font-family: 'DM Serif Display', serif;
    font-size: 32px;
    font-weight: 400;
    color: #f0f0f8;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .bsc-title em {
    font-style: italic;
    color: rgba(139,92,246,0.9);
  }

  .bsc-subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.35);
    font-weight: 300;
    margin-bottom: 36px;
    line-height: 1.6;
  }

  /* Disclaimer */
  .bsc-disclaimer {
    background: rgba(234,179,8,0.06);
    border: 1px solid rgba(234,179,8,0.15);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 28px;
  }

  .bsc-disclaimer-icon {
    font-size: 20px;
    margin-bottom: 10px;
    display: block;
  }

  .bsc-disclaimer p {
    font-size: 13px;
    color: rgba(234,179,8,0.8);
    line-height: 1.7;
    margin: 0 0 16px 0;
    font-weight: 300;
  }

  .bsc-disclaimer strong {
    font-weight: 500;
    color: rgba(234,179,8,0.95);
  }

  .bsc-proceed-btn {
    width: 100%;
    padding: 13px;
    background: rgba(139,92,246,0.15);
    border: 1px solid rgba(139,92,246,0.3);
    border-radius: 12px;
    color: rgba(139,92,246,0.9);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .bsc-proceed-btn:hover {
    background: rgba(139,92,246,0.25);
    border-color: rgba(139,92,246,0.5);
    color: #c4b5fd;
  }

  /* Upload area */
  .bsc-upload-zone {
    border: 1.5px dashed rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 32px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    margin-bottom: 20px;
    position: relative;
    background: rgba(255,255,255,0.02);
  }

  .bsc-upload-zone:hover, .bsc-upload-zone.active {
    border-color: rgba(139,92,246,0.4);
    background: rgba(139,92,246,0.04);
  }

  .bsc-upload-zone input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .bsc-upload-icon {
    width: 44px;
    height: 44px;
    background: rgba(139,92,246,0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    font-size: 20px;
  }

  .bsc-upload-label {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    font-weight: 300;
  }

  .bsc-upload-label span {
    color: rgba(139,92,246,0.8);
    font-weight: 500;
  }

  /* Preview */
  .bsc-preview-wrap {
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
    border: 1px solid rgba(255,255,255,0.07);
  }

  .bsc-preview-wrap img {
    width: 100%;
    display: block;
    max-height: 260px;
    object-fit: cover;
    filter: brightness(0.9) contrast(1.05);
  }

  .bsc-preview-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 16px;
    background: linear-gradient(transparent, rgba(0,0,0,0.6));
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    font-weight: 300;
  }

  /* Analyze button */
  .bsc-analyze-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(99,60,220,0.8) 100%);
    border: none;
    border-radius: 14px;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    margin-bottom: 12px;
    letter-spacing: 0.3px;
    position: relative;
    overflow: hidden;
  }

  .bsc-analyze-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, rgba(139,92,246,1) 0%, rgba(99,60,220,1) 100%);
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(139,92,246,0.25);
  }

  .bsc-analyze-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  .bsc-loading-dots {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }

  .bsc-loading-dots span {
    width: 5px;
    height: 5px;
    background: white;
    border-radius: 50%;
    animation: bsc-bounce 1.2s infinite;
  }

  .bsc-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .bsc-loading-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes bsc-bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-4px); opacity: 1; }
  }

  /* Result */
  .bsc-result {
    border-radius: 16px;
    padding: 24px;
    margin-top: 8px;
    animation: bsc-fadeIn 0.4s ease;
  }

  .bsc-result.safe {
    background: rgba(16,185,129,0.06);
    border: 1px solid rgba(16,185,129,0.15);
  }

  .bsc-result.warning {
    background: rgba(239,68,68,0.06);
    border: 1px solid rgba(239,68,68,0.15);
  }

  .bsc-result-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .bsc-result.safe .bsc-result-label { color: rgba(16,185,129,0.7); }
  .bsc-result.warning .bsc-result-label { color: rgba(239,68,68,0.7); }

  .bsc-result-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 6px;
  }

  .bsc-result.safe .bsc-result-title { color: rgba(16,185,129,0.95); }
  .bsc-result.warning .bsc-result-title { color: rgba(239,68,68,0.9); }

  .bsc-result-confidence {
    font-size: 13px;
    color: rgba(255,255,255,0.35);
    font-weight: 300;
    margin-bottom: 14px;
  }

  .bsc-confidence-bar {
    height: 3px;
    background: rgba(255,255,255,0.06);
    border-radius: 2px;
    margin-bottom: 16px;
    overflow: hidden;
  }

  .bsc-confidence-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.8s ease;
  }

  .bsc-result.safe .bsc-confidence-fill { background: rgba(16,185,129,0.6); }
  .bsc-result.warning .bsc-confidence-fill { background: rgba(239,68,68,0.6); }

  .bsc-result-note {
    font-size: 12.5px;
    color: rgba(255,255,255,0.3);
    font-weight: 300;
    line-height: 1.6;
  }

  .bsc-result.warning .bsc-result-note { color: rgba(239,68,68,0.55); }

  @keyframes bsc-fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .bsc-divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 28px 0;
  }

  .bsc-footer {
    font-size: 11.5px;
    color: rgba(255,255,255,0.18);
    text-align: center;
    font-weight: 300;
    line-height: 1.6;
  }
`;

const BrainScanChecker = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Error connecting to AI service. Make sure it is running.");
    }
    setLoading(false);
  };

  const isSafe = result?.result === "notumor";
  const tumorLabel = result?.result
    ? result.result.charAt(0).toUpperCase() + result.result.slice(1)
    : "";

  return (
    <>
      <style>{styles}</style>
      <div className="bsc-root">
        <div className="bsc-card">
          <div className="bsc-eyebrow">Neurological Screening</div>
          <h1 className="bsc-title">Brain <em>Scan</em><br />Checker</h1>
          <p className="bsc-subtitle">
            Upload an MRI image for AI-assisted awareness screening.
            Early awareness is the first step toward care.
          </p>

          {!agreed ? (
            <div className="bsc-disclaimer">
              <span className="bsc-disclaimer-icon">⚠️</span>
              <p>
                This tool is intended for <strong>awareness purposes only</strong> and does not
                constitute a medical diagnosis. Results should always be reviewed by a
                qualified neurologist or medical professional.
              </p>
              <button className="bsc-proceed-btn" onClick={() => setAgreed(true)}>
                I understand — continue
              </button>
            </div>
          ) : (
            <>
              {!preview ? (
                <div
                  className={`bsc-upload-zone ${dragOver ? "active" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const f = e.dataTransfer.files[0];
                    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); setResult(null); }
                  }}
                >
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  <div className="bsc-upload-icon">🧠</div>
                  <div className="bsc-upload-label">
                    <span>Choose MRI file</span> or drag it here
                  </div>
                </div>
              ) : (
                <div className="bsc-preview-wrap">
                  <img src={preview} alt="MRI Preview" />
                  <div className="bsc-preview-overlay">MRI scan ready for analysis</div>
                </div>
              )}

              {preview && (
                <button
                  className="bsc-analyze-btn"
                  onClick={handleSubmit}
                  disabled={!file || loading}
                >
                  {loading ? (
                    <span className="bsc-loading-dots">
                      Analyzing <span /><span /><span />
                    </span>
                  ) : "Analyze Scan"}
                </button>
              )}

              {preview && (
                <button
                  style={{
                    width: "100%", padding: "10px", background: "transparent",
                    border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px",
                    color: "rgba(255,255,255,0.25)", fontSize: "12px", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s"
                  }}
                  onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                >
                  ↩ Upload a different scan
                </button>
              )}

              {result && (
                <>
                  <div className="bsc-divider" />
                  <div className={`bsc-result ${isSafe ? "safe" : "warning"}`}>
                    <div className="bsc-result-label">
                      {isSafe ? "Screening Result" : "Indicator Detected"}
                    </div>
                    <div className="bsc-result-title">
                      {isSafe ? "No Tumor Detected" : `${tumorLabel} Indicator`}
                    </div>
                    <div className="bsc-result-confidence">
                      Confidence: {result.confidence}%
                    </div>
                    <div className="bsc-confidence-bar">
                      <div
                        className="bsc-confidence-fill"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                    <div className="bsc-result-note">
                      {isSafe
                        ? "No indicators of a brain tumor were detected in this scan. Continue monitoring your wellness regularly."
                        : "A potential neurological indicator has been detected. Please consult a qualified neurologist for a professional diagnosis at the earliest."}
                    </div>
                  </div>
                </>
              )}

              <div className="bsc-divider" />
              <div className="bsc-footer">
                This screening tool is powered by a CNN trained on 7,023 MRI images.
                It is not a substitute for professional medical advice.
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BrainScanChecker;