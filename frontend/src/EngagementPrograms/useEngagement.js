// // // // import React from "react";
// // // // import { useState, useEffect, useCallback } from "react";
// // // // import axios from "axios";

// // // // const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// // // // const authHeaders = () => ({
// // // //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// // // // });

// // // // // ─── GOALS ─────────────────────────────────────────────────────────────────
// // // // export const useGoals = () => {
// // // //   const [goals, setGoals] = useState([]);
// // // //   const [stats, setStats] = useState(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);

// // // //   const fetchGoals = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const [goalsRes, statsRes] = await Promise.all([
// // // //         axios.get(`${BASE}/goals`, authHeaders()),
// // // //         axios.get(`${BASE}/goals/stats`, authHeaders()),
// // // //       ]);
// // // //       setGoals(goalsRes.data.data);
// // // //       setStats(statsRes.data.data);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || "Failed to load goals");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   const createGoal = async (payload) => {
// // // //     const res = await axios.post(`${BASE}/goals`, payload, authHeaders());
// // // //     setGoals((prev) => [res.data.data, ...prev]);
// // // //     return res.data.data;
// // // //   };

// // // //   const checkIn = async (id) => {
// // // //     const res = await axios.patch(`${BASE}/goals/${id}/checkin`, {}, authHeaders());
// // // //     setGoals((prev) => prev.map((g) => (g._id === id ? res.data.data : g)));
// // // //     return res.data.data;
// // // //   };

// // // //   const deleteGoal = async (id) => {
// // // //     await axios.delete(`${BASE}/goals/${id}`, authHeaders());
// // // //     setGoals((prev) => prev.filter((g) => g._id !== id));
// // // //   };

// // // //   useEffect(() => { fetchGoals(); }, [fetchGoals]);

// // // //   return { goals, stats, loading, error, fetchGoals, createGoal, checkIn, deleteGoal };
// // // // };

// // // // // ─── GRATITUDE ──────────────────────────────────────────────────────────────
// // // // export const useGratitude = () => {
// // // //   const [entries, setEntries] = useState([]);
// // // //   const [prompt, setPrompt] = useState("");
// // // //   const [stats, setStats] = useState(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);

// // // //   const fetchAll = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const [entriesRes, promptRes, statsRes] = await Promise.all([
// // // //         axios.get(`${BASE}/gratitude`, authHeaders()),
// // // //         axios.get(`${BASE}/gratitude/prompt`, authHeaders()),
// // // //         axios.get(`${BASE}/gratitude/stats`, authHeaders()),
// // // //       ]);
// // // //       setEntries(entriesRes.data.data);
// // // //       setPrompt(promptRes.data.prompt);
// // // //       setStats(statsRes.data.data);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || "Failed to load gratitude data");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   const addEntry = async ({ prompt: p, entry }) => {
// // // //     const res = await axios.post(`${BASE}/gratitude`, { prompt: p, entry }, authHeaders());
// // // //     setEntries((prev) => [res.data.data, ...prev]);
// // // //     return res.data.data;
// // // //   };

// // // //   useEffect(() => { fetchAll(); }, [fetchAll]);

// // // //   return { entries, prompt, stats, loading, error, fetchAll, addEntry };
// // // // };

// // // // // ─── MEDICATIONS ─────────────────────────────────────────────────────────────
// // // // export const useMedications = () => {
// // // //   const [meds, setMeds] = useState([]);
// // // //   const [adherence, setAdherence] = useState(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);

// // // //   const fetchAll = useCallback(async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const [medsRes, adherenceRes] = await Promise.all([
// // // //         axios.get(`${BASE}/medications`, authHeaders()),
// // // //         axios.get(`${BASE}/medications/adherence`, authHeaders()),
// // // //       ]);
// // // //       setMeds(medsRes.data.data);
// // // //       setAdherence(adherenceRes.data.data);
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || "Failed to load medications");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }, []);

// // // //   const addMedication = async (payload) => {
// // // //     const res = await axios.post(`${BASE}/medications`, payload, authHeaders());
// // // //     setMeds((prev) => [...prev, res.data.data]);
// // // //     return res.data.data;
// // // //   };

// // // //   const logDose = async (id, taken, moodScore) => {
// // // //     const res = await axios.patch(`${BASE}/medications/${id}/log`, { taken, moodScore }, authHeaders());
// // // //     setMeds((prev) => prev.map((m) => (m._id === id ? res.data.data : m)));
// // // //     const adherenceRes = await axios.get(`${BASE}/medications/adherence`, authHeaders());
// // // //     setAdherence(adherenceRes.data.data);
// // // //     return res.data.data;
// // // //   };

// // // //   const deleteMedication = async (id) => {
// // // //     await axios.delete(`${BASE}/medications/${id}`, authHeaders());
// // // //     setMeds((prev) => prev.filter((m) => m._id !== id));
// // // //   };

// // // //   useEffect(() => { fetchAll(); }, [fetchAll]);

// // // //   return { meds, adherence, loading, error, fetchAll, addMedication, logDose, deleteMedication };
// // // // };
// // // import React from "react";
// // // import { useState, useEffect, useCallback } from "react";
// // // import axios from "axios";

// // // const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// // // const authHeaders = () => ({
// // //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// // // });

// // // // ─── GOALS ─────────────────────────────────────────────────────────────────
// // // export const useGoals = () => {
// // //   const [goals, setGoals] = useState([]);
// // //   const [stats, setStats] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   const fetchGoals = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const [goalsRes, statsRes] = await Promise.all([
// // //         axios.get(`${BASE}/goals`, authHeaders()),
// // //         axios.get(`${BASE}/goals/stats`, authHeaders()),
// // //       ]);
// // //       setGoals(goalsRes.data.data);
// // //       setStats(statsRes.data.data);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Failed to load goals");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   const createGoal = async (payload) => {
// // //     const res = await axios.post(`${BASE}/goals`, payload, authHeaders());
// // //     setGoals((prev) => [res.data.data, ...prev]);
// // //     return res.data.data;
// // //   };

// // //   const checkIn = async (id) => {
// // //     const res = await axios.patch(`${BASE}/goals/${id}/checkin`, {}, authHeaders());
// // //     setGoals((prev) => prev.map((g) => (g._id === id ? res.data.data : g)));
// // //     return res.data.data;
// // //   };

// // //   const deleteGoal = async (id) => {
// // //     await axios.delete(`${BASE}/goals/${id}`, authHeaders());
// // //     setGoals((prev) => prev.filter((g) => g._id !== id));
// // //   };

// // //   useEffect(() => { fetchGoals(); }, [fetchGoals]);

// // //   return { goals, stats, loading, error, fetchGoals, createGoal, checkIn, deleteGoal };
// // // };

// // // // ─── GRATITUDE ──────────────────────────────────────────────────────────────
// // // export const useGratitude = () => {
// // //   const [entries, setEntries] = useState([]);
// // //   const [prompt, setPrompt] = useState("");
// // //   const [stats, setStats] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   const fetchAll = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const [entriesRes, promptRes, statsRes] = await Promise.all([
// // //         axios.get(`${BASE}/gratitude`, authHeaders()),
// // //         axios.get(`${BASE}/gratitude/prompt`, authHeaders()),
// // //         axios.get(`${BASE}/gratitude/stats`, authHeaders()),
// // //       ]);
// // //       setEntries(entriesRes.data.data);
// // //       setPrompt(promptRes.data.prompt);
// // //       setStats(statsRes.data.data);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Failed to load gratitude data");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   const addEntry = async ({ prompt: p, entry }) => {
// // //     const res = await axios.post(`${BASE}/gratitude`, { prompt: p, entry }, authHeaders());
// // //     setEntries((prev) => [res.data.data, ...prev]);
// // //     return res.data.data;
// // //   };

// // //   useEffect(() => { fetchAll(); }, [fetchAll]);

// // //   return { entries, prompt, stats, loading, error, fetchAll, addEntry };
// // // };

// // // // ─── MEDICATIONS ─────────────────────────────────────────────────────────────
// // // export const useMedications = () => {
// // //   const [meds, setMeds] = useState([]);
// // //   const [adherence, setAdherence] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   const fetchAll = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const [medsRes, adherenceRes] = await Promise.all([
// // //         axios.get(`${BASE}/medications`, authHeaders()),
// // //         axios.get(`${BASE}/medications/adherence`, authHeaders()),
// // //       ]);
// // //       setMeds(medsRes.data.data);
// // //       setAdherence(adherenceRes.data.data);
// // //     } catch (err) {
// // //       setError(err.response?.data?.message || "Failed to load medications");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   const addMedication = async (payload) => {
// // //     const res = await axios.post(`${BASE}/medications`, payload, authHeaders());
// // //     setMeds((prev) => [...prev, res.data.data]);
// // //     return res.data.data;
// // //   };

// // //   const logDose = async (id, taken, moodScore) => {
// // //     const res = await axios.patch(`${BASE}/medications/${id}/log`, { taken, moodScore }, authHeaders());
// // //     setMeds((prev) => prev.map((m) => (m._id === id ? res.data.data : m)));
// // //     const adherenceRes = await axios.get(`${BASE}/medications/adherence`, authHeaders());
// // //     setAdherence(adherenceRes.data.data);
// // //     return res.data.data;
// // //   };

// // //   const deleteMedication = async (id) => {
// // //     await axios.delete(`${BASE}/medications/${id}`, authHeaders());
// // //     setMeds((prev) => prev.filter((m) => m._id !== id));
// // //   };

// // //   useEffect(() => { fetchAll(); }, [fetchAll]);

// // //   return { meds, adherence, loading, error, fetchAll, addMedication, logDose, deleteMedication };
// // // };

// // import { useState, useEffect, useCallback } from "react";
// // import axios from "axios";

// // // ✅ Base URL
// // const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// // // ✅ AXIOS INSTANCE WITH COOKIE SUPPORT
// // const api = axios.create({
// //   baseURL: BASE,
// //   withCredentials: true, // 🔥 VERY IMPORTANT (sends cookies)
// // });


// // // ─── GOALS ─────────────────────────────────────────────────────────────────
// // export const useGoals = () => {
// //   const [goals, setGoals] = useState([]);
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const fetchGoals = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const [goalsRes, statsRes] = await Promise.all([
// //         api.get("/goals"),
// //         api.get("/goals/stats"),
// //       ]);

// //       setGoals(goalsRes.data.data);
// //       setStats(statsRes.data.data);

// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to load goals");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const createGoal = async (payload) => {
// //     const res = await api.post("/goals", payload);
// //     setGoals((prev) => [res.data.data, ...prev]);
// //     return res.data.data;
// //   };

// //   const checkIn = async (id) => {
// //     const res = await api.patch(`/goals/${id}/checkin`);
// //     setGoals((prev) =>
// //       prev.map((g) => (g._id === id ? res.data.data : g))
// //     );
// //     return res.data.data;
// //   };

// //   const deleteGoal = async (id) => {
// //     await api.delete(`/goals/${id}`);
// //     setGoals((prev) => prev.filter((g) => g._id !== id));
// //   };

// //   useEffect(() => {
// //     fetchGoals();
// //   }, [fetchGoals]);

// //   return { goals, stats, loading, error, fetchGoals, createGoal, checkIn, deleteGoal };
// // };


// // // ─── GRATITUDE ──────────────────────────────────────────────────────────────
// // export const useGratitude = () => {
// //   const [entries, setEntries] = useState([]);
// //   const [prompt, setPrompt] = useState("");
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const fetchAll = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const [entriesRes, promptRes, statsRes] = await Promise.all([
// //         api.get("/gratitude"),
// //         api.get("/gratitude/prompt"),
// //         api.get("/gratitude/stats"),
// //       ]);

// //       setEntries(entriesRes.data.data);
// //       setPrompt(promptRes.data.prompt);
// //       setStats(statsRes.data.data);

// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to load gratitude data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const addEntry = async ({ prompt: p, entry }) => {
// //     const res = await api.post("/gratitude", { prompt: p, entry });
// //     setEntries((prev) => [res.data.data, ...prev]);
// //     return res.data.data;
// //   };

// //   useEffect(() => {
// //     fetchAll();
// //   }, [fetchAll]);

// //   return { entries, prompt, stats, loading, error, fetchAll, addEntry };
// // };


// // // ─── MEDICATIONS ─────────────────────────────────────────────────────────────
// // export const useMedications = () => {
// //   const [meds, setMeds] = useState([]);
// //   const [adherence, setAdherence] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const fetchAll = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const [medsRes, adherenceRes] = await Promise.all([
// //         api.get("/medications"),
// //         api.get("/medications/adherence"),
// //       ]);

// //       setMeds(medsRes.data.data);
// //       setAdherence(adherenceRes.data.data);

// //     } catch (err) {
// //       setError(err.response?.data?.message || "Failed to load medications");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   const addMedication = async (payload) => {
// //     const res = await api.post("/medications", payload);
// //     setMeds((prev) => [...prev, res.data.data]);
// //     return res.data.data;
// //   };

// //   const logDose = async (id, taken, moodScore) => {
// //     const res = await api.patch(`/medications/${id}/log`, { taken, moodScore });

// //     setMeds((prev) =>
// //       prev.map((m) => (m._id === id ? res.data.data : m))
// //     );

// //     const adherenceRes = await api.get("/medications/adherence");
// //     setAdherence(adherenceRes.data.data);

// //     return res.data.data;
// //   };

// //   const deleteMedication = async (id) => {
// //     await api.delete(`/medications/${id}`);
// //     setMeds((prev) => prev.filter((m) => m._id !== id));
// //   };

// //   useEffect(() => {
// //     fetchAll();
// //   }, [fetchAll]);

// //   return { meds, adherence, loading, error, fetchAll, addMedication, logDose, deleteMedication };
// // };
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// // ✅ Base URL
// const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// // ✅ AXIOS INSTANCE WITH COOKIE SUPPORT
// const api = axios.create({
//   baseURL: BASE,
//   withCredentials: true, // sends cookies for session-based auth
// });

// // ─── GOALS ─────────────────────────────────────────────────────────────────
// export const useGoals = () => {
//   const [goals, setGoals] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchGoals = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [goalsRes, statsRes] = await Promise.all([
//         api.get("/goals"),
//         api.get("/goals/stats"),
//       ]);
//       setGoals(goalsRes.data.data);
//       setStats(statsRes.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load goals");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const createGoal = async (payload) => {
//     const res = await api.post("/goals", payload);
//     setGoals((prev) => [res.data.data, ...prev]);
//     // Refresh stats after creating a goal
//     try {
//       const statsRes = await api.get("/goals/stats");
//       setStats(statsRes.data.data);
//     } catch (_) {}
//     return res.data.data;
//   };

//   const checkIn = async (id) => {
//     const res = await api.patch(`/goals/${id}/checkin`);
//     setGoals((prev) => prev.map((g) => (g._id === id ? res.data.data : g)));
//     // Refresh stats after check-in (streak/completion rate change)
//     try {
//       const statsRes = await api.get("/goals/stats");
//       setStats(statsRes.data.data);
//     } catch (_) {}
//     return res.data.data;
//   };

//   const deleteGoal = async (id) => {
//     await api.delete(`/goals/${id}`);
//     setGoals((prev) => prev.filter((g) => g._id !== id));
//     try {
//       const statsRes = await api.get("/goals/stats");
//       setStats(statsRes.data.data);
//     } catch (_) {}
//   };

//   useEffect(() => {
//     fetchGoals();
//   }, [fetchGoals]);

//   return { goals, stats, loading, error, fetchGoals, createGoal, checkIn, deleteGoal };
// };

// // ─── GRATITUDE ──────────────────────────────────────────────────────────────
// export const useGratitude = () => {
//   const [entries, setEntries] = useState([]);
//   const [prompt, setPrompt] = useState("");
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchAll = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [entriesRes, promptRes, statsRes] = await Promise.all([
//         api.get("/gratitude"),
//         api.get("/gratitude/prompt"),
//         api.get("/gratitude/stats"),
//       ]);
//       setEntries(entriesRes.data.data);
//       setPrompt(promptRes.data.prompt);
//       setStats(statsRes.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load gratitude data");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const addEntry = async ({ prompt: p, entry }) => {
//     const res = await api.post("/gratitude", { prompt: p, entry });
//     setEntries((prev) => [res.data.data, ...prev]);
//     // Refresh stats so streak + sentiment bars update
//     try {
//       const statsRes = await api.get("/gratitude/stats");
//       setStats(statsRes.data.data);
//     } catch (_) {}
//     return res.data.data;
//   };

//   useEffect(() => {
//     fetchAll();
//   }, [fetchAll]);

//   return { entries, prompt, stats, loading, error, fetchAll, addEntry };
// };

// // ─── MEDICATIONS ─────────────────────────────────────────────────────────────
// export const useMedications = () => {
//   const [meds, setMeds] = useState([]);
//   const [adherence, setAdherence] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchAll = useCallback(async () => {
//     setLoading(true);
//     try {
//       // NOTE: ensure your Express router registers GET /medications/adherence
//       // BEFORE GET /medications/:id, otherwise Express will treat "adherence"
//       // as an :id param and 404.
//       const [medsRes, adherenceRes] = await Promise.all([
//         api.get("/medications"),
//         api.get("/medications/adherence"),
//       ]);
//       setMeds(medsRes.data.data);
//       setAdherence(adherenceRes.data.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to load medications");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const addMedication = async (payload) => {
//     const res = await api.post("/medications", payload);
//     setMeds((prev) => [...prev, res.data.data]);
//     return res.data.data;
//   };

//   const logDose = async (id, taken, moodScore) => {
//     const res = await api.patch(`/medications/${id}/log`, { taken, moodScore });
//     setMeds((prev) => prev.map((m) => (m._id === id ? res.data.data : m)));
//     // Refresh adherence stats after logging
//     try {
//       const adherenceRes = await api.get("/medications/adherence");
//       setAdherence(adherenceRes.data.data);
//     } catch (_) {}
//     return res.data.data;
//   };

//   const deleteMedication = async (id) => {
//     await api.delete(`/medications/${id}`);
//     setMeds((prev) => prev.filter((m) => m._id !== id));
//   };

//   useEffect(() => {
//     fetchAll();
//   }, [fetchAll]);

//   return { meds, adherence, loading, error, fetchAll, addMedication, logDose, deleteMedication };
// };

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({ baseURL: BASE, withCredentials: true });

// ─── GOALS ────────────────────────────────────────────────────────────────────
export const useGoals = () => {
  const [goals, setGoals]   = useState([]);
  const [stats, setStats]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [goalsRes, statsRes] = await Promise.all([
        api.get("/goals"),
        api.get("/goals/stats"),
      ]);
      setGoals(goalsRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load goals");
    } finally {
      setLoading(false);
    }
  }, []);

  const createGoal = async (payload) => {
    const res = await api.post("/goals", payload);
    setGoals((prev) => [res.data.data, ...prev]);
    _refreshStats("goals");
    return res.data.data;
  };

  const checkIn = async (id) => {
    const res = await api.patch(`/goals/${id}/checkin`);
    // Replace the updated goal in state immediately — no refresh needed
    setGoals((prev) => prev.map((g) => (g._id === id ? res.data.data : g)));
    _refreshStats("goals");
    return res.data.data;
  };

  const deleteGoal = async (id) => {
    await api.delete(`/goals/${id}`);
    setGoals((prev) => prev.filter((g) => g._id !== id));
    _refreshStats("goals");
  };

  // Internal helper: silently refresh stats after a mutation
  const _refreshStats = async (type) => {
    try {
      if (type === "goals") {
        const res = await api.get("/goals/stats");
        setStats(res.data.data);
      }
    } catch (_) {}
  };

  useEffect(() => { fetchGoals(); }, [fetchGoals]);

  return { goals, stats, loading, error, fetchGoals, createGoal, checkIn, deleteGoal };
};

// ─── GRATITUDE ─────────────────────────────────────────────────────────────────
export const useGratitude = () => {
  const [entries, setEntries]   = useState([]);
  const [prompt, setPrompt]     = useState("");
  const [stats, setStats]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [entriesRes, promptRes, statsRes] = await Promise.all([
        api.get("/gratitude"),
        api.get("/gratitude/prompt"),
        api.get("/gratitude/stats"),
      ]);
      setEntries(entriesRes.data.data);
      setPrompt(promptRes.data.prompt);
      setStats(statsRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load gratitude data");
    } finally {
      setLoading(false);
    }
  }, []);

  const addEntry = async ({ prompt: p, entry }) => {
    const res = await api.post("/gratitude", { prompt: p, entry });
    // Prepend new entry to list immediately
    setEntries((prev) => [res.data.data, ...prev]);
    // Refresh stats so streak + weekly sentiment chart updates
    try {
      const statsRes = await api.get("/gratitude/stats");
      setStats(statsRes.data.data);
    } catch (_) {}
    return res.data.data;
  };

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { entries, prompt, stats, loading, error, fetchAll, addEntry };
};

// ─── MEDICATIONS ──────────────────────────────────────────────────────────────
export const useMedications = () => {
  const [meds, setMeds]         = useState([]);
  const [adherence, setAdherence] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // ⚠️  IMPORTANT: Express route order matters!
      // In your router file, register:
      //   router.get("/adherence", getAdherenceStats)   ← FIRST
      //   router.get("/:id", ...)                       ← SECOND
      // Otherwise Express matches "adherence" as :id and returns 404.
      const [medsRes, adherenceRes] = await Promise.all([
        api.get("/medications"),
        api.get("/medications/adherence"),
      ]);
      setMeds(medsRes.data.data);
      setAdherence(adherenceRes.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load medications");
    } finally {
      setLoading(false);
    }
  }, []);

  const addMedication = async (payload) => {
    const res = await api.post("/medications", payload);
    // Append new med and keep sorted by scheduledTime on the API side
    setMeds((prev) => [...prev, res.data.data]);
    return res.data.data;
  };

  /**
   * logDose — marks a dose taken or not-taken.
   *
   * FIX: The API response contains the full updated Mongoose document
   * (with the new doseLogs entry appended + recalcStreak result).
   * We replace the med in state with that document so isTakenToday()
   * immediately reflects the new status — NO page refresh needed.
   */
  const logDose = async (id, taken, moodScore) => {
    const res = await api.patch(`/medications/${id}/log`, { taken, moodScore });
    const updatedMed = res.data.data;

    // Replace the specific med with the full updated doc from the API
    setMeds((prev) => prev.map((m) => (m._id === id ? updatedMed : m)));

    // Silently refresh 7-day adherence stats
    try {
      const adherenceRes = await api.get("/medications/adherence");
      setAdherence(adherenceRes.data.data);
    } catch (_) {}

    return updatedMed;
  };

  const deleteMedication = async (id) => {
    await api.delete(`/medications/${id}`);
    setMeds((prev) => prev.filter((m) => m._id !== id));
    // Refresh adherence after deletion (total meds count changes)
    try {
      const adherenceRes = await api.get("/medications/adherence");
      setAdherence(adherenceRes.data.data);
    } catch (_) {}
  };

  useEffect(() => { fetchAll(); }, [fetchAll]);

  return { meds, adherence, loading, error, fetchAll, addMedication, logDose, deleteMedication };
};