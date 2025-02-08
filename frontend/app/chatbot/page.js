"use client";

import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/chatbot", { query });
    if (res.data && res.data.response) {
      // Assuming the backend returns an object with a 'summary' field
      setResponse(res.data.response.summary || "No summary available");
    } else {
      setResponse("No response received.");
    }
  };

  return (
    <div>
      <h1>AI Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a financial question..."
        />
        <button type="submit">Ask</button>
      </form>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}