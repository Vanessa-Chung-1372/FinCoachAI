from google import genai
from app.config import settings
from app.services.youtube import search_youtube_videos, get_video_transcript

client = genai.Client(api_key=settings.GEMINI_API_KEY)

async def generate_related_questions(query: str) -> List[str]:
    """Generates related, more specific questions using Gemini."""
    prompt = f"""
    Generate 2-3 related, more specific questions based on the user's input.
    User Input: {query}
    """
    try:
        response = client.models.generate_content(
                        model="gemini-2.0-flash", 
                        contents=prompt
                    )
                    
        # Splitting the response into a list of questions
        questions = [q.strip() for q in response.text.split("\n") if q.strip()]
        return questions
    except Exception as e:
        print(f"Error generating related questions: {e}")
        return []

async def summarize_video_from_youtube(query):
    """
    Searches YouTube, summarizes top videos, and returns summaries.
    """
    try:
        # 1. Search YouTube
        videos = await search_youtube_videos(query, min_views=1000, max_results=3)

        summaries = []
        for video in videos:
            try:
                # 2. Fetch transcript
                transcript = await get_video_transcript(video["video_id"])

                # 3. Summarize transcript
                if transcript:
                    prompt = f"""
                    Summarize the following YouTube transcript, focusing on actionable steps the viewer can take to achieve the goal mentioned in the video title.
                    Keep the summary concise (around 150-200 words). Include the YouTube video title and the YouTuber's name.

                    Transcript: {transcript}
                    """

                    response = client.models.generate_content(
                        model="gemini-2.0-flash", 
                        contents=prompt
                    )
                    summary_text = response.text

                    summaries.append({
                        "video_title": video["title"],
                        "youtube_link": f"https://www.youtube.com/watch?v={video['video_id']}",
                        "summary": summary_text
                    })
            except Exception as e:
                print(f"Error processing video {video['video_id']}: {e}")
                continue

        return summaries

    except Exception as e:
        print(f"Error in summarize_video_from_youtube: {e}")
        return []
