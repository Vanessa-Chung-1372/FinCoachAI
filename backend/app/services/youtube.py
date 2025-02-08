from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
from app.config import settings

def fetch_financial_videos(query="financial literacy", max_results=5):
    youtube = build("youtube", "v3", developerKey=settings.YOUTUBE_API_KEY)
    response = youtube.search().list(q=query, type="video", part="id,snippet", maxResults=max_results).execute()
    
    videos = []
    for item in response["items"]:
        video_id = item["id"]["videoId"]
        transcript = get_video_transcript(video_id)
        videos.append({
            "video_id": video_id,
            "title": item["snippet"]["title"],
            "transcript": transcript,
            "link": f"https://www.youtube.com/watch?v={video_id}"
        })
    return videos

def get_video_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return " ".join([entry["text"] for entry in transcript])
    except:
        return "Transcript unavailable"
