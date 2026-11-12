
console.log("DevOps Team Portal loaded successfully");

// Original service status functionality
document.getElementById("status").style.color = "green";

// ---------------------------------
// TAB SWITCHING
// ---------------------------------

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", function () {

        const selectedTab = this.dataset.tab;

        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(tab => tab.classList.remove("active"));

        this.classList.add("active");
        document.getElementById(selectedTab).classList.add("active");

    });
});

// ---------------------------------
// GIT QUIZ
// ---------------------------------

const correctAnswers = {
    q1: "b",
    q2: "c",
    q3: "b",
    q4: "c",
    q5: "c",
    q6: "a",
    q7: "b",
    q8: "b"
};

const explanations = {
    q1: "A non-fast-forward push may be rejected when another developer has pushed new commits. Fetch and integrate those changes before pushing again.",

    q2: "Branch protection rules can prevent direct pushes to main and require changes through Pull Requests.",

    q3: "When Git cannot automatically reconcile overlapping changes, it reports a merge conflict. Developers must resolve it.",

    q4: "A pushed commit can be removed from branch history through history rewriting, but this can disrupt collaborators. For shared branches, prefer git revert.",

    q5: "git revert creates a new commit that reverses the changes of an earlier commit without rewriting shared history.",

    q6: "A commit is stored in your local Git repository. It will not reach GitHub until you push it.",

    q7: "Deleting a merged feature branch does not remove its changes from main.",

    q8: "git reflog records local HEAD movements and can help recover commits that are no longer shown in git log, while the objects remain available."
};

const answerText = {
    q1: "The second push may be rejected if the remote branch has new commits",
    q2: "No, branch protection can block direct pushes",
    q3: "A merge conflict may occur",
    q4: "Yes, by rewriting history, but it can affect collaborators",
    q5: "git revert",
    q6: "The code is saved locally but not uploaded to the remote repository",
    q7: "The merged changes remain in main",
    q8: "Yes, using git reflog, if the commit is still reachable in local Git records"
};

const quizForm = document.getElementById("gitQuizForm");

quizForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const formData = new FormData(quizForm);

    let score = 0;
    let reviewHTML = "";

    for (let i = 1; i <= 8; i++) {

        const question = "q" + i;
        const selectedAnswer = formData.get(question);
        const isCorrect = selectedAnswer === correctAnswers[question];

        if (isCorrect) {
            score++;
        }

        reviewHTML += `
            <div class="review-item">

                <p><strong>Question ${i}</strong></p>

                <p class="${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                    ${isCorrect ? "✓ Correct Answer" : "✗ Incorrect Answer"}
                </p>

                <p>
                    <strong>Correct answer:</strong>
                    ${answerText[question]}
                </p>

                <p class="explanation">
                    ${explanations[question]}
                </p>

            </div>
        `;
    }

    const percentage = Math.round((score / 8) * 100);

    let message = "";

    if (score === 8) {
        message = "Excellent! Git expert!";
    } else if (score >= 6) {
        message = "Great job! You have good Git knowledge.";
    } else if (score >= 4) {
        message = "Good attempt! Keep practising.";
    } else {
        message = "Keep learning! Try the quiz again.";
    }

    document.getElementById("scoreDisplay").innerHTML = `
        <div class="score-card">
            <div class="score-number">${score} / 8</div>
            <h3>${percentage}% Score</h3>
            <p>${message}</p>
        </div>
    `;

    document.getElementById("answerReview").innerHTML = reviewHTML;

    document.getElementById("quizResult").hidden = false;

    document.getElementById("quizResult").scrollIntoView({
        behavior: "smooth"
    });

});

// ---------------------------------
// RETAKE QUIZ
// ---------------------------------

document.getElementById("retakeQuiz").addEventListener("click", function() {

    quizForm.reset();

    document.getElementById("quizResult").hidden = true;

    quizForm.scrollIntoView({
        behavior: "smooth"
    });

});
