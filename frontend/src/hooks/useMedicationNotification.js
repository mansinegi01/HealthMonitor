import { useEffect, useRef } from "react";
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const getNowMins = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};

const toMins = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export default function useMedicationNotifications() {
  const firedRef = useRef(new Set());

  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    const checkMeds = async () => {
      try {
        const res = await axios.get(
          `${BASE}/medications`,
          { withCredentials: true }
        );

        const meds = res.data.data || [];

        const nowMins = getNowMins();
        const today = new Date().toISOString().split("T")[0];

        meds.forEach((med) => {
          if (!med.reminderEnabled) return;

          const key = `${med._id}-${today}`;

          if (firedRef.current.has(key)) return;

          const diff = nowMins - toMins(med.scheduledTime);

          if (diff >= 0 && diff <= 2) {
            firedRef.current.add(key);

            new Notification(`💊 Time to take ${med.name}`, {
              body: `${med.dose} scheduled at ${med.scheduledTime}`,
            });
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    checkMeds();

    const id = setInterval(checkMeds, 30000);

    return () => clearInterval(id);
  }, []);
}