export default function VideoList({ videos }) {
  return (
    <div>
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
