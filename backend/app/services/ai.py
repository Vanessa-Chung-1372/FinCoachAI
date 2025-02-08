import google.generativeai as genai
from app.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

def classify_topic(transcript):
    prompt = f"Classify this financial transcript into a category:\n{transcript}"
    model = genai.GenerativeModel("gemini-pro")
    return model.generate_content(prompt).text

def summarize_video(transcript):
    prompt = f"Summarize this financial video transcript:\n{transcript}"
    model = genai.GenerativeModel("gemini-pro")
    return model.generate_content(prompt).text
