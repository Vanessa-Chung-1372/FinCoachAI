from fastapi import APIRouter
from app.services.ai import classify_topic, summarize_video

router = APIRouter()

@router.post("/classify")
def classify(transcript: str):
    category = classify_topic(transcript)
    return {"category": category}

@router.post("/summarize")
def summarize(transcript: str):
    summary = summarize_video(transcript)
    return {"summary": summary}
