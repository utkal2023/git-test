
console.log("Git Knowledge Challenge loaded successfully");

// ----------------------------------
// QUIZ QUESTIONS AND ANSWERS
// ----------------------------------

const questions = [
    {
        question: "What happens if two developers push changes to the same branch?",
        options: [
            "Both changes always overwrite each other",
            "The second push may be rejected if the remote branch has new commits",
            "Git automatically deletes one developer's code",
            "Git automatically creates a new branch"
        ],
        answer: 1,
        explanation: "Git rejects a non-fast-forward push when the remote has commits that your local branch does not contain. Fetch and integrate those changes before pushing."
    },
    {
        question: "Can a developer directly push to a protected main branch?",
        options: [
            "Yes, always",
            "Yes, using git push --force",
            "No, branch protection can block direct pushes",
            "Only during working hours"
        ],
        answer: 2,
        explanation: "Branch protection rules can prevent direct pushes and enforce Pull Requests, approvals and other checks."
    },
    {
        question: "What happens when two people modify the same line?",
        options: [
            "Git always selects the latest change",
            "A merge conflict may occur",
            "Both changes are automatically combined",
            "The repository gets deleted"
        ],
        answer: 1,
        explanation: "Git may report a merge conflict when it cannot automatically reconcile overlapping changes. Developers must resolve the conflict."
    },
    {
        question: "Can we delete a commit that has already been pushed?",
        options: [
            "No, pushed commits can never be changed",
            "Yes, by deleting the entire repository",
            "Yes, by rewriting history, but it can affect collaborators",
            "Git automatically deletes old commits"
        ],
        answer: 2,
        explanation: "Commands such as git reset followed by a force push can rewrite published history. This can disrupt collaborators. Prefer git revert for shared branches."
    },
    {
        question: "What is the safest way to undo a production commit that has already been shared?",
        options: [
            "git reset --hard",
            "Delete the main branch",
            "git revert",
            "git stash"
        ],
        answer: 2,
        explanation: "git revert creates a new commit that reverses the changes of an earlier commit while preserving shared history."
    },
    {
        question: "What happens if we commit code but forget to push?",
        options: [
            "The code is saved locally but not uploaded to the remote repository",
            "Git automatically pushes after one hour",
            "The commit is lost immediately",
            "GitHub Pages automatically deploys it"
        ],
        answer: 0,
        explanation: "A commit is stored in your local repository. Other developers and GitHub cannot see it until you push it."
    },
    {
        question: "What happens if we delete a feature branch after merging?",
        options: [
            "The merged code is automatically deleted",
            "The merged changes remain in main",
            "The entire repository is deleted",
            "All commits are removed"
        ],
        answer: 1,
        explanation: "Deleting a merged feature branch removes the branch reference, not the changes already integrated into main."
    },
    {
        question: "Can we recover a commit that is no longer visible in git log?",
        options: [
            "No, it is permanently lost",
            "Yes, using git reflog, if the commit is still available locally",
            "Only by reinstalling Git",
            "By running git push"
        ],
        answer: 1,
        explanation: "git reflog records local HEAD movements. It can help locate previous commits and recover them using git branch or git reset, provided the commit object is still available."
    }
];

// ----------------------------------
// RENDER QUESTIONS
// ----------------------------------

const container = document.getElementById("questionsContainer");
const form = document.getElementById("gitQuizForm");

questions.forEach((q, index) => {

    const card = document.createElement("section");
    card.className = "question-card";

    const top = document.createElement("div");
    top.className = "question-top";

    top.innerHTML = `
        <span class="question-number">
            QUESTION ${String(index + 1).padStart(2, "0")}
        </span>
        <span class="question-points">1 POINT</span>
    `;

    const heading = document.createElement("h3");
    heading.textContent = q.question;

    card.appendChild(top);
    card.appendChild(heading);

    q.options.forEach((option, optionIndex) => {

        const label = document.createElement("label");
        label.className = "option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "q" + index;
        input.value = optionIndex;
        input.required = true;

        const text = document.createElement("span");
        text.textContent = option;

        label.appendChild(input);
        label.appendChild(text);

        card.appendChild(label);

        input.addEventListener("change", () => {

            card.querySelectorAll(".option").forEach(item => {
                item.classList.remove("selected");
            });

            label.classList.add("selected");

            updateProgress();

        });

    });

    container.appendChild(card);

});

// ----------------------------------
// PROGRESS TRACKER
// ----------------------------------

function updateProgress() {

    let answered = 0;

    questions.forEach((q, index) => {

        if (form.querySelector(`input[name="q${index}"]:checked`)) {
            answered++;
        }

    });

    document.getElementById("progressText").textContent =
        `${answered} / ${questions.length} Answered`;

    document.getElementById("progressBar").style.width =
        `${(answered / questions.length) * 100}%`;

    document.getElementById("submitBtn").disabled =
        answered !== questions.length;
}

// ----------------------------------
// SUBMIT QUIZ
// ----------------------------------

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let score = 0;
    let reviewHTML = "";

    questions.forEach((q, index) => {

        const selected = form.querySelector(
            `input[name="q${index}"]:checked`
        );

        const selectedAnswer = Number(selected.value);
        const correct = selectedAnswer === q.answer;

        if (correct) {
            score++;
        }

        reviewHTML += `
            <div class="review-item">

                <h4>
                    ${index + 1}. ${q.question}
                </h4>

                <div class="review-status ${
                    correct ? "correct-answer" : "wrong-answer"
                }">
                    ${correct ? "✓ Correct Answer" : "✗ Incorrect Answer"}
                </div>

                <p>
                    <strong>Your answer:</strong>
                    ${q.options[selectedAnswer]}
                </p>

                <p>
                    <strong>Correct answer:</strong>
                    ${q.options[q.answer]}
                </p>

                <p class="explanation">
                    ${q.explanation}
                </p>

            </div>
        `;

    });

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    const wrong = questions.length - score;

    document.getElementById("scoreDisplay").textContent =
        `${score}/${questions.length}`;

    document.getElementById("percentage").textContent =
        `${percentage}%`;

    document.getElementById("correctCount").textContent = score;

    document.getElementById("wrongCount").textContent = wrong;

    document.getElementById("answerReview").innerHTML = reviewHTML;

    document.getElementById("resultMessage").textContent =
        score === 8
            ? "Outstanding! You are a Git champion!"
            : score >= 6
            ? "Excellent work! You have a strong understanding of Git."
            : score >= 4
            ? "Good effort! Keep practising your Git skills."
            : "Keep learning! Review the explanations and try again.";

    document.getElementById("quizResult").hidden = false;

    document.getElementById("submitBtn").disabled = true;

    document.getElementById("quizResult").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

// ----------------------------------
// RETAKE QUIZ
// ----------------------------------

document.getElementById("retakeQuiz").addEventListener("click", () => {

    form.reset();

    document.querySelectorAll(".option").forEach(option => {
        option.classList.remove("selected");
    });

    document.getElementById("quizResult").hidden = true;

    document.getElementById("progressBar").style.width = "0%";

    document.getElementById("progressText").textContent = "0 / 8 Answered";

    document.getElementById("submitBtn").disabled = true;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
