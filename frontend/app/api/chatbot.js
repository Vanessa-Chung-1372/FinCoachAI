import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { query } = req.body;

    // Log the query being sent to the backend
    console.log("Sending to backend:", { query });

    // Replace localhost with deployed API URL if applicable
    const backendResponse = await axios.post("http://localhost:8000/chatbot", { query });

    // Log the response received from the backend
    console.log("Received from backend:", backendResponse.data);

    res.status(200).json({ response: backendResponse.data });
  } catch (error) {
    console.error("Chatbot API Error:", error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
}