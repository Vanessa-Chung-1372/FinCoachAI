"use client";
import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch chatbot data from API route
      const res = await axios.get("/api/chatbot");

      if (res.data && Array.isArray(res.data)) {
        setResponse(res.data); // ✅ Store array of objects
      } else {
        setResponse([{ video_title: "No response received", youtube_link: "", summary: "" }]);
      }
    } catch (error) {
      console.error("Chatbot API error:", error);
      setResponse([{ video_title: "Error fetching response", youtube_link: "", summary: "" }]);
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
        {response.length > 0 ? (
          <ul>
            {response.map((item, index) => (
              <li key={index}>
                <h4>{item.video_title}</h4>
                <p>{item.summary}</p>
                {item.youtube_link && (
                  <a href={item.youtube_link} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
}
