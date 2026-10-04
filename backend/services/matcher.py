def match_skills(resume_skills, required_skills):

    resume_set = set(skill.lower() for skill in resume_skills)
    required_set = set(skill.lower() for skill in required_skills)

    matching_skills = [
        skill for skill in required_skills
        if skill.lower() in resume_set
    ]

    missing_skills = [
        skill for skill in required_skills
        if skill.lower() not in resume_set
    ]

    if len(required_skills) == 0:
        match_percentage = 0
    else:
        match_percentage = (
            len(matching_skills) / len(required_skills)
        ) * 100

    return {
        "matching_skills": matching_skills,
        "missing_skills": missing_skills,
        "match_percentage": round(match_percentage, 2)
    }