import { GoogleGenAI, Type } from "@google/genai";
import { GameLevel } from '../types';
import { CYBER_SOLUTIONS } from "../constants";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey:import.meta.env.VITE_API_KEY});

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
      description: "Un reto o puzzle corto y directo que el jugador debe superar, relacionado con la misión."
    },
    options: {
        type: Type.ARRAY,
        description: "Una lista de tres posibles soluciones para el reto. Una es la 'palabra clave de ayuda' correcta, y las otras dos son incorrectas y disparatadas. Las opciones deben estar en orden aleatorio.",
        items: {
            type: Type.STRING
        }
    },
    reward: {
      type: Type.STRING,
      description: "La 'palabra clave de ayuda' que el jugador debe descubrir para superar el reto. Debe ser una de las soluciones clave proporcionadas en el prompt (ej: 'Familia y entorno cercano'). Esta es la opción correcta."
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
  required: ["title", "location", "threat", "missionDescription", "challenge", "options", "reward"]
};

export async function generateGameConcept(threat: string, location: string): Promise<GameLevel> {
  const solutionList = CYBER_SOLUTIONS.map(s => `- ${s}`).join('\n');

  const prompt = `
    Eres un diseñador de videojuegos educativo y creativo. Tu tarea es crear un concepto para un nivel de un juego de superhéroes para concienciar a los jóvenes.
    
    **Ambientación del Juego:**
    - **Héroes:** Anibalex e Hymilka, superhéroes de la ciudad de Linares, Jaén, España.
    - **Misión:** Luchar contra amenazas digitales como el grooming, sextorsión, etc.
    - **Mecánica:** En cada nivel, los héroes se enfrentan a un reto. Para superarlo, deben elegir la opción correcta entre tres posibilidades. La opción correcta es la 'palabra clave de ayuda', que representa a quién o a qué pueden recurrir en la vida real.

    **Tu Tarea:**
    Genera un concepto DETALLADO para un nivel del juego basado en los siguientes parámetros:
    - **Amenaza a combatir:** ${threat}
    - **Lugar emblemático de Linares:** ${location}

    1.  **Diseña un reto corto y directo** relacionado con la amenaza.
    2.  **Elige UNA 'palabra clave de ayuda'** de la siguiente lista como la solución correcta. Esta será el valor del campo 'reward'.
    3.  **Crea DOS opciones más que sean totalmente disparatadas** y no tengan relación con la solución.
    4.  **Mezcla estas tres opciones** (la correcta y las dos disparatadas) y ponlas en el campo 'options'.

    **Posibles 'Palabras Clave de Ayuda' (la recompensa DEBE ser una de estas):**
    ${solutionList}

    Responde únicamente con un objeto JSON que siga el esquema proporcionado. El campo 'reward' debe contener la 'palabra clave de ayuda' exacta que has elegido. El campo 'options' debe contener la recompensa y las dos opciones disparatadas en orden aleatorio. No incluyas explicaciones adicionales ni texto fuera del JSON.
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
