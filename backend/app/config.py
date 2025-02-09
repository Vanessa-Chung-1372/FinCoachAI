from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    YOUTUBE_API_KEY: str
    GEMINI_API_KEY: str
    FIREBASE_CREDENTIALS: str
    PORT: int = 8000  # Default value for PORT

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
