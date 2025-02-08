import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { query } = req.body;
    const response = await axios.post("http://localhost:8000/chatbot", { query });
    res.status(200).json({ response: response.data });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
