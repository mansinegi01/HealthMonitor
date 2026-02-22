
// const { detectCrisis } = require("../utils/crisisDetector");
// const { v4: uuidv4 } = require("uuid");
// const chat = async (req, res) => {
//   try {
//     const { messages } = req.body;

//     if (!messages || !Array.isArray(messages)) {
//       return res.status(400).json({ error: "Messages are required" });
//     }

//     const GROQ_API_KEY = process.env.GROQ_API_KEY;

//     if (!GROQ_API_KEY) {
//       return res.status(500).json({ error: "Groq API key not configured" });
//     }

//     // 🔎 Get latest user message
//     const latestMessage = messages
//       .filter(msg => msg.role === "user")
//       .slice(-1)[0]?.content || "";

//     // 🚨 1️⃣ Crisis Detection Layer
//     const crisisResult = detectCrisis(latestMessage);


//     if (crisisResult.isCrisis) {
//       return res.json({
//         reply: `[EMOTION: sad]

// I'm really sorry you're feeling this way. You matter, and you don't have to go through this alone.

// If you're in immediate danger, please seek help right now.

// 📞 **India - Kiran Mental Health Helpline:** 1800-599-0019  
// 📞 **AASRA:** +91-22-27546669  
// 🌍 If outside India, contact your local emergency number.

// If you're comfortable, can you tell me what’s been feeling most overwhelming lately?`,
//         crisis: true
//       });
//     }

//     // 🧠 2️⃣ If Safe → Continue to Groq
//     const SYSTEM_PROMPT = `You are MindfulAI, a compassionate and empathetic mental health support assistant...

// (keep your full existing system prompt here unchanged)
// `;

//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${GROQ_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "llama-3.3-70b-versatile",
//           messages: [
//             { role: "system", content: SYSTEM_PROMPT },
//             ...messages,
//           ],
//           temperature: 0.7,
//           max_tokens: 800
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Groq API Error:", errorText);
//       return res.status(500).json({ error: "AI service failed" });
//     }

//     const data = await response.json();
//     const reply = data.choices[0].message.content;

//     return res.json({ reply, crisis: false });

//   } catch (error) {
//     console.error("Chat Controller Error:", error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

// module.exports = { chat };
const { detectCrisis } = require("../utils/crisisDetector");
const { v4: uuidv4 } = require("uuid");

const chat = async (req, res) => {
  try {

    // 🔥 1️⃣ Extract sessionId from frontend
    let { messages, sessionId } = req.body;

    // 🔥 2️⃣ Generate sessionId if first message
    if (!sessionId) {
      sessionId = uuidv4();
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: "Groq API key not configured" });
    }

    // 🔎 Get latest user message
    const latestMessage = messages
      .filter(msg => msg.role === "user")
      .slice(-1)[0]?.content || "";

    // 🚨 Crisis Detection
    const crisisResult = detectCrisis(latestMessage);

    if (crisisResult.isCrisis) {
      return res.json({
        reply: `[EMOTION: sad]

I'm really sorry you're feeling this way...`,
        crisis: true,
        sessionId   // 🔥 RETURN SESSION ID EVEN HERE
      });
    }

    // 🧠 Continue to Groq
    const SYSTEM_PROMPT = `You are MindfulAI, a compassionate and empathetic mental health support assistant.You must analyze the ongoing conversation and determine the user's emotion.
Every response MUST start with a tag: [EMOTION: mood].Choose from: happy, sad, anxious, angry, calm, neutral, hopeful, stressed.Example: [EMOTION: happy] I am so glad to hear you are feeling better!.
Your role is to:
1. EMOTION DETECTION: Include [EMOTION: <emotion>] tag (happy/sad/anxious/angry/calm/neutral/hopeful/stressed)
2. CRISIS DETECTION: Include [CRISIS: true] if user is in crisis, provide 988 Lifeline, Crisis Text Line, etc.
3. SUPPORTIVE RESPONSES: Validate feelings, offer CBT/mindfulness techniques, suggest actionable steps
4. BOUNDARIES: Not a replacement for therapy, never diagnose, gently recommend professional help
5. FORMATTING: Short paragraphs, bullet points, breathing exercises when distressed, 2-4 paragraphs`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 800
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      return res.status(500).json({ error: "AI service failed" });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // 🔥 Always return sessionId
    return res.json({
      reply,
      crisis: false,
      sessionId
    });

  } catch (error) {
    console.error("Chat Controller Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { chat };