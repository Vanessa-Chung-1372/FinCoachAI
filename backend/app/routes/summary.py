from fastapi import APIRouter
from app.services.ai import summarize_video

router = APIRouter()

@router.post("/")
def get_summary(transcript: str):
    summary = summarize_video(transcript)
    return {"summary": summary}
