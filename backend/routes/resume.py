from fastapi import APIRouter, UploadFile, File, Form

from backend.services.pdf_parser import extract_text_from_pdf
from backend.services.skill_extractor import extract_skills
from backend.services.job_analyzer import analyze_job_description
from backend.services.matcher import match_skills
from backend.database import analyses_collection

router = APIRouter()


@router.post("/api/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):

    # 1. Extract text from resume
    resume_text = extract_text_from_pdf(resume.file)

    # 2. Extract resume skills
    resume_skills = extract_skills(resume_text)

    # 3. Extract required job skills
    required_skills = analyze_job_description(job_description)

    # 4. Match resume skills with job skills
    result = match_skills(
        resume_skills,
        required_skills
    )

    # 5. Save analysis to MongoDB
    analysis_data = {
        "filename": resume.filename,
        "job_description": job_description,
        "resume_skills": resume_skills,
        "required_skills": required_skills,
        "matching_skills": result["matching_skills"],
        "missing_skills": result["missing_skills"],
        "match_percentage": result["match_percentage"]
    }

    analyses_collection.insert_one(analysis_data)

    return {
        "success": True,
        "filename": resume.filename,
        "resume_skills": resume_skills,
        "required_skills": required_skills,
        "matching_skills": result["matching_skills"],
        "missing_skills": result["missing_skills"],
        "match_percentage": result["match_percentage"]
    }
