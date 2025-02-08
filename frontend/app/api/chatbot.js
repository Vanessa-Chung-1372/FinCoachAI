import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const filePath = path.join(process.cwd(), "frontend/data/chatbotData.json"); // ✅ Correct file path
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error reading chatbot data:", error);
    res.status(500).json({ error: "Failed to read chatbot data." });
  }
}
