from pydantic import BaseModel

class Video(BaseModel):
    video_id: str
    title: str
    transcript: str
    link: str
    category: str = None
    summary: str = None
