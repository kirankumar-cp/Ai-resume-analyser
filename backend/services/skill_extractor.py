# Skills that our analyzer can identify

SKILLS = [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "MongoDB",
    "MySQL",
    "FastAPI",
    "Flask",
    "Django",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Data Science",
    "NumPy",
    "Pandas",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "NLP",
    "Natural Language Processing",
    "Git",
    "GitHub",
    "REST API",
    "Data Visualization",
]


def extract_skills(text):

    text_lower = text.lower()

    found_skills = []

    for skill in SKILLS:

        if skill.lower() in text_lower:
            found_skills.append(skill)

    return found_skills