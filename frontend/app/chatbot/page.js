"use client";
import { useState } from "react";
import "./styles.css";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = [
        {
          video_title: "How to Invest for Beginners (2025)",
          youtube_link: "https://www.youtube.com/watch?v=lNdOtlpmH5U",
          summary: "Ali Abdaal explains why investing in index funds is the best approach for beginners.",
          thumbnail: "https://img.youtube.com/vi/lNdOtlpmH5U/maxresdefault.jpg",
        },
        {
          video_title: "Investing for Beginners - How I Make Millions from Stocks (Full Guide)",
          youtube_link: "https://www.youtube.com/watch?v=8Ij7A1VCB7I",
          summary: "Mark Tilbury discusses how to invest in the stock market and why tax-advantaged accounts are crucial.",
          thumbnail: "https://img.youtube.com/vi/8Ij7A1VCB7I/maxresdefault.jpg",
        },
        {
          video_title: "How to Invest for Beginners in 2025",
          youtube_link: "https://www.youtube.com/watch?v=Ay4fmZdZqJE",
          summary: "Tilbury explores five investment options for beginners with $100, covering stocks, REITs, crypto, gold, and index funds.",
          thumbnail: "https://img.youtube.com/vi/Ay4fmZdZqJE/maxresdefault.jpg",
        },
      ];

      setResponse(res.slice(0, 5)); // Display only the top 5 videos
    } catch (error) {
      console.error("Chatbot API error:", error);
      setResponse([
        {
          video_title: "Error fetching response",
          youtube_link: "",
          summary: "Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">AI Chatbot</h1>
      <form className="chatbot-form" onSubmit={handleSubmit}>
        <input
          className="chatbot-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a financial question..."
        />
        <button className="chatbot-button" type="submit">
          Ask
        </button>
      </form>

      <div className="chatbot-responses">
        {response.length > 0 ? (
          response.map((item, index) => (
            <div key={index} className="response-card">
              <img
                className="response-thumbnail"
                src={item.thumbnail}
                alt={`Thumbnail for ${item.video_title}`}
              />
              <div>
                <a
                  className="response-title"
                  href={item.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.video_title}
                </a>
                <p>{item.summary}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
}
