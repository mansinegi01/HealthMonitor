import React from "react";
import { useState } from "react";

const BrainScanChecker = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
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

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>🧠 Brain Tumor Screening</h2>

      {!agreed ? (
        <div style={{ background: "#fff3cd", padding: "15px", borderRadius: "8px" }}>
          <p><strong>⚠️ Disclaimer:</strong> This tool is for awareness only and does <strong>NOT</strong> replace professional medical diagnosis. Always consult a doctor.</p>
          <button onClick={() => setAgreed(true)} style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}>
            I Understand, Proceed
          </button>
        </div>
      ) : (
        <>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          {preview && (
            <img src={preview} alt="MRI Preview" style={{ width: "100%", marginTop: "10px", borderRadius: "8px" }} />
          )}

          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            style={{ marginTop: "10px", padding: "10px 20px", cursor: "pointer", width: "100%" }}
          >
            {loading ? "Analyzing..." : "Analyze MRI Scan"}
          </button>

          {result && (
            <div style={{ marginTop: "15px", padding: "15px", background: result.result === "notumor" ? "#d4edda" : "#f8d7da", borderRadius: "8px" }}>
              <h3>Result: {result.result === "notumor" ? "✅ No Tumor Detected" : `⚠️ ${result.result} indicator detected`}</h3>
              <p>Confidence: {result.confidence}%</p>
              {result.result !== "notumor" && (
                <p>⚠️ Please consult a neurologist for a professional diagnosis.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BrainScanChecker;