import { GoogleGenAI } from "@google/genai";
import { AIActionType } from "../types";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  constructor(apiKey: string) {
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  updateApiKey(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateCodeFromPrompt(prompt: string): Promise<string> {
    if (!this.ai) throw new Error("API Key is missing");

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Write code for the following request: "${prompt}". 
        Return ONLY the raw code. Do not include markdown backticks (like \`\`\`). 
        Do not include explanations. If it's a component, make it self-contained.`,
      });
      return response.text.trim();
    } catch (error) {
      console.error("Gemini Generate Error:", error);
      throw new Error("Failed to generate code.");
    }
  }

  async performActionOnCode(code: string, action: AIActionType): Promise<string> {
    if (!this.ai) throw new Error("API Key is missing");

    let prompt = "";
    switch (action) {
      case AIActionType.REFACTOR:
        prompt = "Refactor the following code to be cleaner, more modern, and more performant. Return ONLY the raw code.";
        break;
      case AIActionType.FIX_BUGS:
        prompt = "Fix any potential bugs in the following code. Return ONLY the raw code.";
        break;
      case AIActionType.ADD_TYPES:
        prompt = "Add strict TypeScript types to the following code. Return ONLY the raw code.";
        break;
      case AIActionType.EXPLAIN:
        prompt = "Explain what the following code does in less than 50 words. Do not return code, return text.";
        break;
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${prompt}\n\nCode:\n${code}`,
      });
      return response.text.trim();
    } catch (error) {
      console.error("Gemini Action Error:", error);
      throw new Error("Failed to process code.");
    }
  }
}