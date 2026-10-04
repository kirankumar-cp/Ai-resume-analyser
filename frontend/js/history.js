const historyList = document.getElementById("history-list");

async function loadHistory() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/history"
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Failed to load history");
        }

        console.log("History data:", data);

        if (!data.analyses || data.analyses.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <h2>No Analysis History</h2>
                    <p>Your resume analyses will appear here.</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = data.analyses.map(analysis => `
            <div class="history-card">

                <div class="history-card-header">
                    <h2>${analysis.filename}</h2>

                    <span class="history-score">
                        ${analysis.match_percentage}%
                    </span>
                </div>

                <p class="history-job">
                    Job Description: ${analysis.job_description}
                </p>

                <div class="history-section">
                    <h3>Matching Skills</h3>

                    <div>
                        ${
                            analysis.matching_skills &&
                            analysis.matching_skills.length > 0
                            ? analysis.matching_skills
                                .map(skill =>
                                    `<span class="skill-tag">${skill}</span>`
                                )
                                .join("")
                            : "No matching skills"
                        }
                    </div>
                </div>

                <div class="history-section">
                    <h3>Missing Skills</h3>

                    <div>
                        ${
                            analysis.missing_skills &&
                            analysis.missing_skills.length > 0
                            ? analysis.missing_skills
                                .map(skill =>
                                    `<span class="missing-tag">${skill}</span>`
                                )
                                .join("")
                            : "No missing skills"
                        }
                    </div>
                </div>

            </div>
        `).join("");

    } catch (error) {
        console.error("History error:", error);

        historyList.innerHTML = `
            <div class="empty-history">
                <h2>Unable to load history</h2>
                <p>There was a problem loading your analysis history.</p>
            </div>
        `;
    }
}

loadHistory();