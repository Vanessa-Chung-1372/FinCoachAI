"use client";
import { useState } from "react";
import gamePlan from "../../data/gamePlan.json"; // Static JSON import
import "./styles.css";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [showGamePlanButton, setShowGamePlanButton] = useState(false);
  const [showGamePlan, setShowGamePlan] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false); // Tracks if a question was asked

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return; // Prevent empty submissions

    setShowGamePlanButton(true); // Show "View Investing Game Plan" button
    setSearchSubmitted(true); // Hide search bar

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
        {
          video_title: "Can ChatGPT Answer Complex Investing and Retirement Questions?",
          youtube_link: "https://www.youtube.com/watch?v=EUDgo5T7wBQ",
          summary: "Rob Berger tests ChatGPT’s ability to answer tough investing and retirement questions.",
          thumbnail: "https://img.youtube.com/vi/EUDgo5T7wBQ/maxresdefault.jpg",
        },
        {
          video_title: "Build a Dynamic 3-Statement Financial Model From Scratch",
          youtube_link: "https://www.youtube.com/watch?v=66WChsYJ8C4",
          summary: "Kenji teaches how to build a three-statement financial model in Excel, using a lemonade stand as an example.",
          thumbnail: "https://img.youtube.com/vi/66WChsYJ8C4/maxresdefault.jpg",
        }
      ];

      setResponse(res);
    } catch (error) {
      console.error("Chatbot API error:", error);
      setResponse([{ video_title: "Error fetching response", youtube_link: "", summary: "Please try again later." }]);
    }
  };

  // Reset the chatbot to its initial state
  const handleReturn = () => {
    setQuery("");
    setResponse([]);
    setShowGamePlanButton(false);
    setShowGamePlan(false);
    setSearchSubmitted(false);
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">AI Chatbot</h1>

      {/* Show "View Game Plan" button at the top after user submits a question */}
      {showGamePlanButton && !showGamePlan && (
        <button className="game-plan-button" onClick={() => setShowGamePlan(true)}>
          📜 View Investing Game Plan
        </button>
      )}

      {/* Show Game Plan when button is clicked */}
      {showGamePlan && (
        <div className="game-plan">
          <h2>{gamePlan.title}</h2>
          <p>{gamePlan.description}</p>
          <ol>
            {gamePlan.sections.map((section, index) => (
              <li key={index}>
                <strong>{section.heading}</strong> (Source: {section.source})
                <ul>
                  {section.advice.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p>{gamePlan.conclusion}</p>

          {/* Button to hide game plan */}
          <button className="game-plan-button hide-button" onClick={() => setShowGamePlan(false)}>
            🙈 Hide Investing Game Plan
          </button>
        </div>
      )}

      {/* Hide the search bar once the result is returned */}
      {!searchSubmitted && (
        <form className="chatbot-form" onSubmit={handleSubmit}>
          <input
            className="chatbot-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a financial question..."
          />
          <button className="chatbot-button" type="submit">Ask</button>
        </form>
      )}

      {/* Show the chatbot responses */}
      <div className="chatbot-responses">
        {response.length > 0 ? (
          response.map((item, index) => (
            <div key={index} className="response-card">
              <img className="response-thumbnail" src={item.thumbnail} alt={`Thumbnail for ${item.video_title}`} />
              <div>
                <a className="response-title" href={item.youtube_link} target="_blank" rel="noopener noreferrer">
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

      {/* Show return button only when results are displayed */}
      {searchSubmitted && (
        <button className="return-button" onClick={handleReturn}>
          🔄 Return & Ask Another Question
        </button>
      )}
    </div>
  );
}
