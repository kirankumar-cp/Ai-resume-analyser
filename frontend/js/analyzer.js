const resumeInput = document.getElementById("resume");
const fileName = document.getElementById("file-name");
const jobDescription = document.getElementById("job-description");
const analyzeButton = document.getElementById("analyze-btn");


// Show selected resume
resumeInput.addEventListener("change", function () {

    if (resumeInput.files.length > 0) {

        fileName.textContent =
            "Selected file: " + resumeInput.files[0].name;

    }

});


// Analyze Resume
analyzeButton.addEventListener("click", async function () {

    // Check resume
    if (resumeInput.files.length === 0) {
        alert("Please upload your resume PDF.");
        return;
    }


    // Check job description
    if (jobDescription.value.trim() === "") {
        alert("Please enter the job description.");
        return;
    }


    const resume = resumeInput.files[0];

    const formData = new FormData();

    formData.append("resume", resume);
    formData.append("job_description", jobDescription.value);


    // Change button
    analyzeButton.textContent = "Analyzing...";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/analyze",
            {
                method: "POST",
                body: formData
            }
        );


        const data = await response.json();


        if (!response.ok) {
            throw new Error("Analysis failed");
        }


        // Show result section
        const resultSection =
            document.getElementById("result-section");

        resultSection.style.display = "block";


        // Match percentage
        document.getElementById("match-score").textContent =
            data.match_percentage + "%";


        // Matching skills
        const matchingSkills =
            document.getElementById("matching-skills");

        if (data.matching_skills.length > 0) {

            matchingSkills.innerHTML =
                data.matching_skills
                    .map(skill => `<span class="skill-tag">${skill}</span>`)
                    .join("");

        } else {

            matchingSkills.textContent =
                "No matching skills found.";

        }


        // Missing skills
        const missingSkills =
            document.getElementById("missing-skills");

        if (data.missing_skills.length > 0) {

            missingSkills.innerHTML =
                data.missing_skills
                    .map(skill => `<span class="missing-tag">${skill}</span>`)
                    .join("");

        } else {

            missingSkills.textContent =
                "No major missing skills.";

        }


        // Suggestions
        const suggestions =
            document.getElementById("suggestions");

        if (data.missing_skills.length > 0) {

            suggestions.innerHTML =
                "Consider adding or developing these skills: " +
                data.missing_skills.join(", ") +
                ".";

        } else {

            suggestions.textContent =
                "Your resume covers the main skills required for this job.";

        }


        // Scroll to results
        resultSection.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(error);

        alert(
            "Unable to analyze the resume. " +
            "Make sure the FastAPI backend is running."
        );

    }


    analyzeButton.textContent = "Analyze Resume →";

});