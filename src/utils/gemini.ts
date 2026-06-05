import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export interface SymptomAnalysisResult {
  conditions: string[];
  urgencyLevel: 'Green' | 'Yellow' | 'Red';
  urgencyReason: string;
  homeRemedies: Array<{ name: string; instruction: string; iconKeyword: string }>;
  disclaimer: string;
}

const GEMINI_MODEL = 'gemini-2.5-flash';
const REQUEST_TIMEOUT_MS = 30_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Request timed out after ${ms / 1000}s. Please try again.`)), ms)
  );
  return Promise.race([promise, timeout]);
}

export async function analyzeSymptoms(
  symptoms: string,
  duration: string,
  severity: number,
  ageGroup: string,
  language: string = 'English'
): Promise<SymptomAnalysisResult> {
  if (!apiKey) {
    throw new Error('Missing Gemini API Key. Add VITE_GEMINI_API_KEY to your .env.local file and restart the dev server.');
  }

  const prompt = `
    You are "SwasthAI", a calm, empathetic, and highly professional Indian medical assistant doctor.
    Analyze the following patient information:
    - Symptoms: ${symptoms}
    - Duration: ${duration}
    - Severity (1-10): ${severity}
    - Age Group: ${ageGroup}

    Language: Please reply in ${language}.

    Based on this, provide a preliminary assessment structured EXACTLY as a JSON object with the following schema:
    {
      "conditions": ["string", "string"], // Array of 2-3 possible conditions
      "urgencyLevel": "Green" | "Yellow" | "Red", // Green = Home care, Yellow = See doctor soon, Red = Emergency
      "urgencyReason": "string", // Brief explanation for the urgency level
      "homeRemedies": [
        { "name": "string", "instruction": "string", "iconKeyword": "string" } // Array of 2-3 home remedies suitable for Indian households (e.g. kaadha, haldi doodh if applicable). keep iconKeyword simple like "water", "bed", "tea", "leaf"
      ],
      "disclaimer": "This is not a substitute for professional medical advice. Please consult a registered medical practitioner."
    }

    Ensure the diagnosis is culturally aware of common Indian ailments (like seasonal flu, dengue, typhoid, acidity/gas) if symptoms match.
    DO NOT RETURN MARKDOWN, ONLY RETURN RAW JSON.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const result = await withTimeout(model.generateContent(prompt), REQUEST_TIMEOUT_MS);
    const text = result.response.text();
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText) as SymptomAnalysisResult;
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('Failed to communicate with Gemini API');
  }
}
