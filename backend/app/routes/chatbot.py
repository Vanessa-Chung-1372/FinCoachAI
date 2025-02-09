from fastapi import APIRouter, HTTPException
from app.services.ai import generate_related_questions, summarize_video_from_youtube, generate_plan
from pydantic import BaseModel

class ChatbotRequest(BaseModel):
    query: str

router = APIRouter()

@router.post("/")
async def chat_endpoint(request: ChatbotRequest):
    try:
        # 1. Generate keywords based on
        related_questions = await generate_related_questions(request.query)

        # 2. Summarize videos based on the query and related questions
        summaries = []
        for question in [request.query] + related_questions:
            if len(summaries) >= 5:
                break
            video_summary = await summarize_video_from_youtube(question)
            if video_summary:
                summaries.extend(video_summary)

        plan = await generate_plan(summaries, request.query)

        return {"plan": plan, "summaries": summaries}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))