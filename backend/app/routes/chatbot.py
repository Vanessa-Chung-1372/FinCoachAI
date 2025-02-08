from fastapi import APIRouter
from app.services.ai import classify_topic, summarize_video
from pydantic import BaseModel

class TranscriptRequest(BaseModel):
    transcript: str

router = APIRouter()



@router.post("/classify")
def classify(request: TranscriptRequest):
    category = classify_topic(request.transcript)
    return {"category": category}




@router.post("/summarize")
def summarize(request: TranscriptRequest):
    summary = summarize_video(request.transcript)
    return {"summary": summary}