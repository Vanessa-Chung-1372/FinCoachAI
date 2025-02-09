from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chatbot
from app.config import settings

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(chatbot.router, prefix="/chatbot")

@app.get("/")
def read_root():
    return {"message": "Welcome to FinCoach AI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)