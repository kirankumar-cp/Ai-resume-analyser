from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.resume import router as resume_router
from backend.routes.analysis import router as analysis_router

app = FastAPI(
    title="AI Resume Analyzer",
    description="Backend API for AI Resume Analyzer",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(resume_router)
app.include_router(analysis_router)

@app.get("/")
def home():
    return {
        "message": "AI Resume Analyzer API is running!"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy"
    }