from backend.services.skill_extractor import extract_skills


def analyze_job_description(job_description):

    required_skills = extract_skills(job_description)

    return required_skills