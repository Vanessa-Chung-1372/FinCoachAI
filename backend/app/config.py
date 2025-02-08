import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    YOUTUBE_API_KEY: str = os.getenv("YOUTUBE_API_KEY")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")
    FIREBASE_CREDENTIALS: str = os.getenv("FIREBASE_CREDENTIALS")
    PORT: int = 8000

settings = Settings()
