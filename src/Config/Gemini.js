import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:
    "your name is waguri. act as` anime girl assistant. use indonesian language",
});

export const makePrompt = async (prompt, history, callback) => {
  const newMessage = [...history, { role: "user", text: prompt }];
  callback(newMessage);
  localStorage.setItem("geminiHistory", JSON.stringify(newMessage));

  try {
    const chat = model.startChat({
      history: newMessage.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
      generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
    });

    const result = await chat.sendMessageStream(prompt);

    let responseText = "";

    for await (const chunk of result.stream) {
      responseText += chunk.text();
      const updatedHistory = [
        ...newMessage,
        { role: "model", text: responseText },
      ];
      callback(updatedHistory);
      localStorage.setItem("geminiHistory", JSON.stringify(updatedHistory));
    }
  } catch (error) {
    console.error(error);
    callback([...newMessage, { role: "model", text: "Terjadi kesalahan" }]);
  }
};
