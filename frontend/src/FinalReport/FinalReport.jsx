import React, { useEffect, useState } from "react";

const Report = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/health/report")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Weekly Report</h2>

      <p>Stress: {data.averages.stress}</p>
      <p>Energy: {data.averages.energy}</p>
      <p>Focus: {data.averages.focus}</p>
      <p>Sleep: {data.averages.sleep}</p>

      <h3>Logs:</h3>
      {data.logs.map((log, i) => (
        <div key={i}>
          <p>{new Date(log.createdAt).toLocaleDateString()}</p>
          <p>Stress: {log.stressLevel}</p>
        </div>
      ))}
    </div>
  );
};

export default Report;