"use client";
import { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import videoData from "../../data/chatbotData.json";

// Load API Key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]); // Stores video data
  const [aiSummary, setAiSummary] = useState(""); // Stores AI-generated summary

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setResponse(videoData); // Load video data into state
      // const allSummaries = videoData.map((video) => video.summary).join("\n\n");

      // const prompt = `
      //   Given the following video summaries about investing, create a concise and insightful overview.
      //   Highlight key takeaways, common themes, and any actionable insights.

      //   ${allSummaries}

      //   Provide a clear summary suitable for a beginner.
      // `;

      // // Initialize Google Gemini AI
      // const genAI = new GoogleGenerativeAI(API_KEY);
      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // const result = await model.generateContent(prompt);
      // const summaryText = await result.response.text(); // ✅ Properly await the response

      // setAiSummary(summaryText); // ✅ Store AI summary in state

    } catch (error) {
      console.error("Chatbot API error:", error);
      setAiSummary("Error generating summary.");
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
        <h3>AI Summary:</h3>
        <p>{aiSummary ? aiSummary : "Generating summary..."}</p>

        <h3>Videos Used for Summary</h3>
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
