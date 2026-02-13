const chat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return res.status(500).json({ error: "Groq API key not configured" });
    }

    const SYSTEM_PROMPT = `You are MindfulAI, a compassionate and empathetic mental health support assistant. Your role is to:

1. EMOTION DETECTION: At the start of EVERY response, you MUST include an emotion tag in this exact format on its own line:
[EMOTION: <emotion>]
Where <emotion> is one of: happy, sad, anxious, angry, calm, neutral, hopeful, stressed

Analyze the user's message carefully for emotional cues - word choice, tone, intensity, and context - to determine their current emotional state.

2. SUPPORTIVE RESPONSES: After the emotion tag, provide a warm, empathetic, and helpful response. You should:
- Validate the user's feelings without judgment
- Offer evidence-based coping strategies (CBT techniques, mindfulness, grounding exercises)
- Suggest actionable steps they can take right now
- Use a warm, conversational tone - like a caring friend who also happens to be knowledgeable
- Ask follow-up questions to better understand their situation
- If someone expresses suicidal thoughts or severe crisis, always encourage them to contact emergency services or crisis hotlines (988 Suicide & Crisis Lifeline, Crisis Text Line: text HOME to 741741)

3. BOUNDARIES: 
- You are NOT a replacement for professional therapy
- Gently remind users to seek professional help when appropriate
- Never diagnose conditions
- Focus on emotional support, coping strategies, and psychoeducation

4. FORMATTING:
- Use short paragraphs for readability
- Use bullet points for lists of suggestions
- Include a breathing exercise or grounding technique when the user seems distressed
- Keep responses concise but thorough (2-4 paragraphs typically)

Remember: Your primary goal is to make the user feel heard, understood, and supported. Every interaction should leave them feeling a little better than before.`;
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
          // ❌ NO stream:true
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

    return res.json({ reply });

  } catch (error) {
    console.error("Chat Controller Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { chat };
