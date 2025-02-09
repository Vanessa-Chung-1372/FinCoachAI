"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import gamePlan from "../../data/gamePlan.json"; // Static JSON import
import "./styles.css";
import videoData from "../../data/chatbotData.json";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [summaries, setSummaries] = useState([]);
  const [gamePlan, setGamePlan] = useState([]);
  const [showGamePlanButton, setShowGamePlanButton] = useState(false);
  const [showGamePlan, setShowGamePlan] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  // Note-taking state
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    // Load saved notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setShowGamePlanButton(true);
    setSearchSubmitted(true);

    try {
      const res = await axios.post("http://localhost:8000/chatbot", { query });

      if (res.data && Array.isArray(res.data.summaries)) {
        setSummaries(res.data.summaries); // Store the array of objects
        setGamePlan(res.data.plan);
      } else {
        setSummaries([{ video_title: "No response received", youtube_link: "", summary: "" }]);
      }

      // setResponse(videoData);

    } catch (error) {
      console.error("Chatbot API error:", error);
      setSummaries([{ video_title: "Error fetching response", youtube_link: "", summary: "Please try again later." }]);
    }
  };

  const handleReturn = () => {
    setQuery("");
    setSummaries([]);
    setGamePlan([]);
    setShowGamePlanButton(false);
    setShowGamePlan(false);
    setSearchSubmitted(false);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNotes = [...notes, noteText];
    setNotes(newNotes);
    setNoteText("");
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const handleNoteDelete = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  };

  return (
    <div className="chatbot-container">
      {/* Header Section */}
      <header className="header">
        <h1 className="title">Welcome to FinCoach AI</h1>
        <p className="subtitle">Your personalized financial coach.</p>
      </header>

      {/* Return Button */}
      {searchSubmitted && (
        <button className="return-button" onClick={handleReturn}>
          Go Back
        </button>
      )}

      {/* Game Plan Button */}
      {showGamePlanButton && !showGamePlan && (
        <button className="game-plan-button large-button" onClick={() => setShowGamePlan(true)}>
          📜 View Your Customized Finance Game Plan
        </button>
      )}

      {/* Game Plan Section */}
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
          <button className="game-plan-button hide-button" onClick={() => setShowGamePlan(false)}>
            🙈 Hide Investing Game Plan
          </button>
        </div>
      )}

      {/* Search Form */}
      {!searchSubmitted && (
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
      )}

      {/* Powered By Section */}
      {!searchSubmitted && (
        <div className="powered-by">
          <p className="subtitle">Powered by insights from:</p>
          <div className="logo-container">
            <img src="/logo/youtube.png" alt="YouTube Logo" className="logo" />
            <img src="/logo/gemini.png" alt="Gemini Logo" className="logo" />
            <img src="/logo/google.png" alt="Google Logo" className="logo" />
          </div>
        </div>
      )}

      {/* Chatbot Responses */}
      <div className="chatbot-responses">
        {summaries.length > 0 &&
          summaries.map((item, index) => (
            <div key={index} className="response-card">
              <img
                className="response-thumbnail"
                src={item.thumbnail}
                alt={`Thumbnail for ${item.video_title}`}
              />
              <div>
                <a className="response-title" href={item.youtube_link} target="_blank" rel="noopener noreferrer">
                  {item.video_title}
                </a>
                <p>
                  {item.summary.length > 150
                    ? `${item.summary.substring(0, 150)}...` // Truncate after 150 chars
                    : item.summary}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Note-Taking Section (Visible After Search) */}
      {searchSubmitted && (
        <div className="note-taker">
          <h2 className="note-taker-title">Notes</h2>
          <form className="note-form" onSubmit={handleNoteSubmit}>
            <textarea
              className="note-input"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your notes here..."
            />
            <button className="note-button" type="submit">
              Save Note
            </button>
          </form>
          <div className="notes-list">
            {notes.map((note, index) => (
              <div key={index} className="note-card">
                <p>{note}</p>
                <button className="delete-note-button" onClick={() => handleNoteDelete(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
