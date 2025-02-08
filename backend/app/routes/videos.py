from fastapi import APIRouter
from app.services.youtube import fetch_financial_videos
from app.services.database import save_video_data

router = APIRouter()

@router.get("/")
def get_videos():
    videos = fetch_financial_videos()
    for video in videos:
        save_video_data(video)
    return videos
