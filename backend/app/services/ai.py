from google import genai
import json
from typing import List
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
        videos = await search_youtube_videos(query, max_results=3, min_views=1000)

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
                        "summary": summary_text,
                        "thumbnail": video["thumbnail_url"]
                    })
            except Exception as e:
                print(f"Error processing video {video['video_id']}: {e}")
                continue

        return summaries

    except Exception as e:
        print(f"Error in summarize_video_from_youtube: {e}")
        return []

async def generate_plan(summaries, query):
    """
    Generates a structured financial coaching plan based on user query and video summaries.
    """

    # Convert summaries to a structured text format
    summary_texts = "\n\n".join([
        f"Video Title: {video['video_title']}\nSummary: {video['summary']}"
        for video in summaries
    ])

    prompt = f"""
    You are an AI financial coach. Generate a structured financial coaching plan based on the user’s query and video summaries. 
    **Only return a valid JSON object** without additional text or explanations.
    
    The JSON format should be:

    {{
      "title": "A Guide for [User Query]",
      "description": "Brief explanation of why this is important",
      "sections": [
        {{
          "heading": "First Key Step",
          "source": "YouTuber names from summaries",
          "advice": ["Step 1", "Step 2", "Step 3"]
        }},
        {{
          "heading": "Next Steps",
          "source": "YouTuber names from summaries",
          "advice": ["Step A", "Step B"]
        }},
        {{
          "heading": "Common Mistakes to Avoid",
          "source": "YouTuber names from summaries",
          "advice": ["Mistake 1", "Mistake 2"]
        }}
      ],
      "conclusion": "Final advice for the user"
    }}

    **Do not include any extra text. Only return a valid JSON object.** 

    User Query: {query}
    
    Video Summaries:
    {summary_texts}
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        # Ensure AI response is not empty
        ai_response = response.text.strip()
        if not ai_response:
            raise ValueError("Empty response from AI")

        # Extract JSON from AI response (handles extra text)
        json_start = ai_response.find("{")  # Find the first JSON bracket
        json_end = ai_response.rfind("}")   # Find the last JSON bracket
        if json_start == -1 or json_end == -1:
            raise ValueError("Invalid JSON response from AI")

        clean_json_str = ai_response[json_start : json_end + 1]  # Extract only the JSON part

        # Parse and return the JSON
        plan_json = json.loads(clean_json_str)
        return plan_json

    except json.JSONDecodeError as e:
        print(f"Error parsing AI response: {e}")
        return {"error": "Invalid JSON format from AI"}

    except Exception as e:
        print(f"Error generating plan: {e}")
        return {"error": "An error occurred while generating the plan"}
