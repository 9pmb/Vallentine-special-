
import { GoogleGenAI } from "@google/genai";

export const generateLovePoem = async (name: string, nickname: string) => {
  // CRITICAL: Create a new GoogleGenAI instance right before the call to ensure 
  // it uses the most up-to-date API key from the environment.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a deeply emotional, poetic, and sincere Valentine's Day love letter and a short poem for my girlfriend ${name} (we call her ${nickname}). 
      Context: We've been together since November 5, 2024. Yesterday, February 13, 2026, we had a massive fight and broke up. Today is Valentine's Day, Feb 14, 2026. 
      I want to apologize, tell her how much she means to me, and ask for a fresh start. 
      The tone should be vulnerable, romantic, and heartbroken but hopeful. Include references to our time together.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
        // Disable thinking budget to ensure the fastest possible response and avoid hangs.
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    // Access the .text property directly as per guidelines.
    const text = response.text;
    
    if (!text) {
      throw new Error("Empty response from AI");
    }

    return text;
  } catch (error) {
    console.error("Error generating poem:", error);
    // Return a heartfelt fallback so the user is never stuck on a spinner.
    return `My Dearest ${nickname},

Even when words fail me, my heart doesn't. February 13th was a shadow I never want to revisit. Since November 2024, you've been my light, my laughter, and my entire world.

I am so incredibly sorry for the fight. I let the moment get the better of me, forgetting that you are the most precious thing in my life. This Valentine's Day, all I want is for us to start again.

I love you more than words can say. Please, let's make this right.

Forever yours,
Aadi`;
  }
};
