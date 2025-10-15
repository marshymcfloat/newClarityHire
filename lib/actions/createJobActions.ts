// app/actions/generateActions.ts
"use server"; // This directive marks this file as server-only

import { GoogleGenAI } from "@google/genai";

// Initialize the client here, safely on the server
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateJobDescriptionField(
  fieldName: string,
  jobTitle: string
) {
  if (!jobTitle) {
    return { success: false, error: "Job title is required." };
  }

  const prompt = `
    Generate a professional and concise ${fieldName} for the job title "${jobTitle}".

    **Instructions:**
    - The output must be a single, well-written paragraph.
    - Do NOT include any headings, titles, bullet points, or lists.
    - Do NOT use introductory phrases like "Here is the summary:".
    - The tone should be professional and engaging for potential candidates.
    - Write only the text for the ${fieldName} itself.
  `;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 1,
        maxOutputTokens: 5000,
      },
    });

    return { success: true, text: result.text };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { success: false, error: "Failed to generate content." };
  }
}
