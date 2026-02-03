import fetch from "node-fetch";

export const detectEmotion = async (text) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  const result = await response.json();

  const emotions = result[0];
  emotions.sort((a, b) => b.score - a.score);

  return {
    label: emotions[0].label,
    confidence: emotions[0].score,
  };
};
