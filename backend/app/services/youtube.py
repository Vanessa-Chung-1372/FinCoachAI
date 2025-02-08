from googleapiclient.discovery import build
from youtube_transcript_api import YouTubeTranscriptApi
from app.config import settings

async def search_youtube_videos(query: str, max_results: int = 5, min_views: int = 1000):
    """Searches YouTube for videos matching the query and filters based on view count and relevance."""
    youtube = build("youtube", "v3", developerKey=settings.YOUTUBE_API_KEY)
    try:
        response = youtube.search().list(
            q=query,
            type="video",
            part="id,snippet",
            maxResults=max_results,
            order="relevance"
        ).execute()

        videos = []
        for item in response["items"]:
            video_id = item["id"]["videoId"]
            title = item["snippet"]["title"]
            # Basic relevance score (can be improved)
            relevance_score = title.lower().count(query.lower())
            videos.append({
                "video_id": video_id,
                "title": title,
                "relevance_score": relevance_score
            })

        # Filter videos based on minimum view count (This requires another API call per video)
        filtered_videos = []
        for video in videos:
            try:
                video_details = youtube.videos().list(
                    part="statistics",
                    id=video["video_id"]
                ).execute()
                view_count = int(video_details["items"][0]["statistics"]["viewCount"])
                if view_count >= min_views:
                    filtered_videos.append(video)
            except Exception as e:
                print(f"Could not fetch view count for video {video['video_id']}: {e}")
                continue

        return filtered_videos

    except Exception as e:
        print(f"Error searching YouTube: {e}")
        return []

async def get_video_transcript(video_id: str) -> str:
    """Fetches the transcript of a YouTube video."""
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join([entry["text"] for entry in transcript])
        return text
    except Exception as e:
        print(f"Error fetching transcript for video {video_id}: {e}")
        return None
