from fastapi import FastAPI
from app.routes import videos, chatbot, summary
from app.config import settings  # Import settings

app = FastAPI()

# Include routes
app.include_router(videos.router, prefix="/videos")
app.include_router(chatbot.router, prefix="/chatbot")
app.include_router(summary.router, prefix="/summary")

@app.get("/")
def read_root():
    return {"message": "Welcome to FinCoach AI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)  # Use settings for port
