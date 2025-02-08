from google import genai
from app.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

def classify_topic(transcript):
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=f"Classify this financial transcript into a category:\n{transcript}"
    )
    return response.text

def summarize_video(transcript):
    response = client.models.generate_content(
        model="gemini-2.0-flash", 
        contents=f"Summarize this financial video transcript:\n{transcript}"
    )
    return response.text
