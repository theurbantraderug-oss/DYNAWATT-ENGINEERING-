import { GoogleGenAI } from "@google/genai";

export const generateMarketingContent = async (topic: string, type: 'blog' | 'service'): Promise<string> => {
  try {
    // Initialize the client inside the function to prevent app crash on load if key is missing
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = type === 'blog' 
      ? `Write a short, helpful blog post (approx 150 words) for an Electrician website in Uganda about: "${topic}". Include safety tips and mention local context like Umeme (UEDCL) power stability if relevant.`
      : `Write a compelling service description (approx 80 words) for an electrical service: "${topic}". Focus on reliability and safety for Ugandan homeowners.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate content at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating content. Please check your API key in Vercel settings.";
  }
};