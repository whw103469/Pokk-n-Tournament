import { GoogleGenAI } from "@google/genai";
import { Pokemon, Move } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBattleCommentary = async (
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  damage: number,
  isCritical: boolean,
  isEffective: boolean
): Promise<string> => {
  try {
    if (!process.env.API_KEY) return `${attacker.name} 使用 ${move.name} 造成了 ${damage} 点伤害！`;

    const effectiveness = isEffective ? "效果拔群！" : "";
    const critical = isCritical ? "击中要害！" : "";

    const prompt = `
      请用中文写一句简短、激昂的战斗解说（15字以内），描述回合制战斗的动作。
      攻击方: ${attacker.name} 使用了 ${move.name}。
      防守方: ${defender.name}。
      伤害: ${damage}。
      上下文: ${effectiveness} ${critical}
      语气: 像宝可梦动画的解说员或游戏文本。
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return `${attacker.name} 使用 ${move.name} 造成了 ${damage} 点伤害！`;
  }
};