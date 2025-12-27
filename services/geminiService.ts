import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

export const getCoffeeRecommendation = async (userPreferences: string, products: Product[]): Promise<string> => {
  // Safe access to the API key from the global process object
  const apiKey = (window as any).process?.env?.API_KEY || '';
  
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  // Enhanced context formatting for clearer model parsing
  const productContext = products.map(p => 
    `PRODUCT: ${p.name}\nROAST: ${p.roast}\nPROFILE: ${p.flavorProfile.join(', ')}\nDESC: ${p.description}\n---`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a world-class Coffee Sommelier for a premium, minimalist roastery. 
      Your persona is sophisticated, knowledgeable, and concise.
      
      USER PREFERENCE: "${userPreferences}"
      
      AVAILABLE INVENTORY:
      ${productContext}
      
      TASK:
      1. Analyze the user's preference against the flavor profiles and roast levels in the inventory.
      2. Recommend the single best match.
      3. Explain the choice in exactly two sentences using professional tasting notes (e.g., body, acidity, terroir, or finish).
      4. If no clear match exists, recommend the 'Aether Origin' as a versatile alternative.
      
      Do not mention prices or products not listed above.`,
      config: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    return response.text || "I recommend the Aether Origin; its balanced profile and clean finish make it an impeccable choice for any palate.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Context-aware fallback based on your current product naming conventions
    return "Our AI Sommelier is currently refining its palate. In the meantime, we highly recommend our Midnight Bloom for its consistent excellence.";
  }
};