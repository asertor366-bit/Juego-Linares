import { GoogleGenAI, Type } from "@google/genai";
import { GameLevel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "Un título creativo y llamativo para el nivel del juego."
    },
    location: {
      type: Type.STRING,
      description: "La ubicación emblemática de Linares donde se desarrolla el nivel."
    },
    threat: {
      type: Type.STRING,
      description: "La amenaza cibernética específica que se aborda en este nivel."
    },
    missionDescription: {
      type: Type.STRING,
      description: "Una descripción narrativa de la misión que los superhéroes deben completar."
    },
    challenge: {
      type: Type.STRING,
      description: "El reto o puzzle principal que el jugador debe superar, relacionado con la amenaza y la ubicación."
    },
    reward: {
      type: Type.STRING,
      description: "La recompensa o 'fuerza' que obtienen los héroes al completar el nivel, como un número de teléfono de ayuda (INCIBE, Policía) o una nueva habilidad."
    },
    npc: {
        type: Type.OBJECT,
        description: "Un personaje no jugador (NPC) que los héroes encuentran en el nivel.",
        properties: {
            name: { type: Type.STRING },
            dialogue: { type: Type.STRING, description: "Una línea de diálogo clave del NPC que introduce la misión." }
        },
    }
  },
  required: ["title", "location", "threat", "missionDescription", "challenge", "reward"]
};

export async function generateGameConcept(threat: string, location: string): Promise<GameLevel> {
  const prompt = `
    Eres un diseñador de videojuegos experto. Tu tarea es crear un concepto para un nivel de un juego de superhéroes.
    
    **Ambientación del Juego:**
    - **Héroes:** Un superhéroe y una superheroína de la ciudad de Linares, Jaén, España.
    - **Misión:** Luchar contra amenazas digitales como el ciberacoso, grooming, sexting, etc.
    - **Mecánica:** En cada nivel, los héroes superan un reto en un lugar emblemático de Linares. Al superarlo, obtienen 'fuerzas' o 'power-ups' que son recursos del mundo real para luchar contra estas amenazas (ej: el número de teléfono de INCIBE 017, contacto con la Policía Nacional, consejos de ciberseguridad, etc.).

    **Tu Tarea:**
    Genera un concepto DETALLADO para un nivel del juego basado en los siguientes parámetros:
    - **Amenaza a combatir:** ${threat}
    - **Lugar emblemático de Linares:** ${location}

    Responde únicamente con un objeto JSON que siga el esquema proporcionado. No incluyas explicaciones adicionales ni texto fuera del JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const text = response.text.trim();
    const gameLevel: GameLevel = JSON.parse(text);
    return gameLevel;
  } catch (error) {
    console.error("Error generating game concept:", error);
    throw new Error("Failed to get a valid concept from the AI. Please try again.");
  }
}
