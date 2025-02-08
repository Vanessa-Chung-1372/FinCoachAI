import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/videos").then((res) => setVideos(res.data));
  }, []);

  return (
    <div>
      <h1>FinCoach AI</h1>
      {videos.map((video) => (
        <div key={video.video_id}>
          <h3>{video.title}</h3>
          <p>{video.transcript}</p>
          <a href={video.link} target="_blank">Watch</a>
        </div>
      ))}
    </div>
  );
}
