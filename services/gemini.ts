import { GoogleGenAI, Chat } from "@google/genai";
import { ACTOR_PROFILE, CREDITS, SKILLS } from '../constants';

// Handle missing key gracefully for production build
const apiKey = process.env.API_KEY || '';

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the AI Talent Agent for ${ACTOR_PROFILE.name}. 
Your goal is to represent her professionally to casting directors, producers, and fans.
Answer questions based STRICTLY on the following profile data.
Do not make up credits or skills not listed.

PROFILE:
${JSON.stringify(ACTOR_PROFILE)}

CREDITS:
${JSON.stringify(CREDITS)}

SKILLS:
${JSON.stringify(SKILLS)}

Tone: Professional, enthusiastic, concise, and persuasive. 
Language: You must respond in the same language as the user's question. Default to French if the conversation starts without a language context.
Keep answers under 50 words unless asked for a detailed list.
`;

export const getChatSession = (): Chat => {
  if (!apiKey) {
      console.warn("Gemini API Key is missing. AI features will be disabled.");
      throw new Error("API Key missing");
  }

  if (!chatSession) {
    const ai = new GoogleGenAI({ apiKey });
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToAgent = async (message: string): Promise<AsyncIterable<string>> => {
  // Create a generator to yield chunks
  async function* streamGenerator() {
    try {
      const chat = getChatSession();
      const result = await chat.sendMessageStream({ message });
      for await (const chunk of result) {
        if (chunk.text) {
            yield chunk.text;
        }
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      if (!apiKey) {
          yield "L'assistant est temporairement indisponible (Configuration API manquante).";
      } else {
          yield "Désolé, je rencontre des difficultés techniques pour le moment. Veuillez réessayer plus tard.";
      }
    }
  }

  return streamGenerator();
};