import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatIA = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Campo 'text' é obrigatório." });
    }

    const model = genAI.getGenerativeModel({ model: "gemma-3n-e2b-it" });

    const result = await model.generateContent(text);
    const responseText = result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.error("Erro na IA:", error);
    res.status(500).json({ error: "Erro ao gerar resposta da IA" });
  }
};
