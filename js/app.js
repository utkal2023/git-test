
"use strict";

// ========================================
// GIT WORKSHOP QUIZ QUESTIONS
// ========================================

const questions = [
    {
        question: "Which command creates a new Git repository?",
        options: [
            "git start",
            "git init",
            "git create",
            "git new"
        ],
        answer: 1,
        explanation: "git init initializes a new Git repository."
    },
    {
        question: "Which command downloads a remote repository to your computer?",
        options: [
            "git pull",
            "git push",
            "git clone",
            "git fetch"
        ],
        answer: 2,
        explanation: "git clone copies a remote repository to your local machine."
    },
    {
        question: "You have modified a file. Which command stages it for commit?",
        options: [
            "git commit",
            "git add",
            "git push",
            "git status"
        ],
        answer: 1,
        explanation: "git add stages changes so they can be included in a commit."
    },
    {
        question: "Which command creates a new branch called feature-login?",
        options: [
            "git branch feature-login",
            "git create feature-login",
            "git push feature-login",
            "git commit feature-login"
        ],
        answer: 0,
        explanation: "git branch feature-login creates a branch. It does not switch to it."
    },
    {
        question: "What is the purpose of a Pull Request?",
        options: [
            "To delete a branch",
            "To review and merge proposed changes",
            "To install Git",
            "To download a repository"
        ],
        answer: 1,
        explanation: "A Pull Request allows team members to review changes before merging."
    },
    {
        question: "Two developers modify the same lines in a file. What might happen?",
        options: [
            "Git automatically deletes the file",
            "A merge conflict",
            "The repository gets deleted",
            "The branch gets renamed"
        ],
        answer: 1,
        explanation: "Git may report a merge conflict when it cannot automatically combine changes."
    },
    {
        question: "Which command safely creates a new commit that reverses an earlier commit?",
        options: [
            "git delete",
            "git reset --hard",
            "git revert",
            "git remove"
        ],
        answer: 2,
        explanation: "git revert creates a new commit that reverses the changes from an earlier commit."
    },
    {
        question: "What is the main purpose of protecting the main branch?",
        options: [
            "To prevent all developers from accessing Git",
            "To ensure changes follow review and approval rules",
            "To stop developers creating branches",
            "To disable commits permanently"
        ],
        answer: 1,
        explanation: "Branch protection enforces rules such as Pull Request reviews and status checks."
    }
];

// ========================================
// GET HTML ELEMENTS
// ========================================

const questionsContainer =
    document.getElementById("questionsContainer");

const quizForm =
    document.getElementById("quizForm");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const answerMessage =
    document.getElementById("answerMessage");

const submitBtn =
    document.getElementById("submitBtn");

const resultContainer =
    document.getElementById("resultContainer");

const scoreDisplay =
    document.getElementById("scoreDisplay");

const resultMessage =
    document.getElementById("resultMessage");

const answerReview =
    document.getElementById("answerReview");

const retakeBtn =
    document.getElementById("retakeBtn");

// Stop with a clear error if an expected HTML element is missing.
const requiredElements = {
    questionsContainer,
    quizForm,
    progressBar,
    progressText,
    answerMessage,
    submitBtn,
    resultContainer,
    scoreDisplay,
    resultMessage,
    answerReview,
    retakeBtn
};

for (const [name, element] of Object.entries(requiredElements)) {
    if (!element) {
        throw new Error(`Required HTML element not found: ${name}`);
    }
}

// ========================================
// DISPLAY QUESTIONS
// ========================================

function loadQuestions() {
    questionsContainer.innerHTML = "";

    questions.forEach((item, index) => {
        const card = document.createElement("section");
        card.className = "question-card";

        const number = document.createElement("div");
        number.className = "question-number";
        number.textContent = `QUESTION ${index + 1}`;

        const heading = document.createElement("h3");
        heading.textContent = item.question;

        card.appendChild(number);
        card.appendChild(heading);

        item.options.forEach((option, optionIndex) => {
            const label = document.createElement("label");
            label.className = "option";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = `question-${index}`;
            radio.value = optionIndex;

            const optionText = document.createElement("span");
            optionText.textContent = option;

            label.appendChild(radio);
            label.appendChild(optionText);

            card.appendChild(label);

            radio.addEventListener("change", () => {
                updateSelectedStyle(index);
                updateProgress();
            });
        });

        questionsContainer.appendChild(card);
    });

    updateProgress();
}

// ========================================
// UPDATE SELECTED ANSWER STYLE
// ========================================

function updateSelectedStyle(questionIndex) {
    const card = questionsContainer.children[questionIndex];

    card.querySelectorAll(".option").forEach(label => {
        const radio = label.querySelector("input");
        label.classList.toggle("selected", radio.checked);
    });
}

// ========================================
// UPDATE PROGRESS BAR
// ========================================

function updateProgress() {
    let answered = 0;

    questions.forEach((item, index) => {
        const selected = document.querySelector(
            `input[name="question-${index}"]:checked`
        );

        if (selected) {
            answered++;
        }
    });

    const percentage = (answered / questions.length) * 100;

    progressBar.style.width = `${percentage}%`;

    progressText.textContent =
        `${answered} / ${questions.length} Answered`;

    answerMessage.textContent =
        answered === questions.length
            ? "All questions answered. You are ready to submit!"
            : `${questions.length - answered} question(s) remaining.`;
}

// ========================================
// SUBMIT QUIZ AND CALCULATE SCORE
// ========================================

quizForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let score = 0;
    let unanswered = 0;

    const userAnswers = [];

    questions.forEach((item, index) => {
        const selected = document.querySelector(
            `input[name="question-${index}"]:checked`
        );

        if (!selected) {
            unanswered++;
            userAnswers.push(null);
            return;
        }

        const selectedAnswer = Number(selected.value);
        userAnswers.push(selectedAnswer);

        if (selectedAnswer === item.answer) {
            score++;
        }
    });

    if (unanswered > 0) {
        answerMessage.textContent =
            `Please answer all ${unanswered} remaining question(s).`;

        const firstUnanswered = userAnswers.findIndex(
            answer => answer === null
        );

        questionsContainer.children[firstUnanswered].scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;
    }

    showResults(score, userAnswers);
});

// ========================================
// DISPLAY RESULTS AND ANSWER REVIEW
// ========================================

function showResults(score, userAnswers) {
    scoreDisplay.textContent = `${score} / ${questions.length}`;

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    if (percentage === 100) {
        resultMessage.textContent = "Excellent! Perfect score!";
    } else if (percentage >= 75) {
        resultMessage.textContent = "Great job! You know your Git!";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Good effort! Keep practising.";
    } else {
        resultMessage.textContent = "Keep learning. Try again!";
    }

    answerReview.innerHTML = "";

    questions.forEach((item, index) => {
        const isCorrect = userAnswers[index] === item.answer;

        const review = document.createElement("div");

        review.className = isCorrect
            ? "review-item correct"
            : "review-item incorrect";

        const heading = document.createElement("strong");
        heading.textContent =
            `${index + 1}. ${item.question}`;

        const yourAnswer = document.createElement("p");
        yourAnswer.textContent =
            `Your answer: ${item.options[userAnswers[index]]}`;

        const correctAnswer = document.createElement("p");
        correctAnswer.textContent =
            `Correct answer: ${item.options[item.answer]}`;

        const explanation = document.createElement("p");
        explanation.textContent = item.explanation;

        const status = document.createElement("p");
        status.textContent = isCorrect ? "✓ Correct" : "✗ Incorrect";

        review.appendChild(heading);
        review.appendChild(status);
        review.appendChild(yourAnswer);
        review.appendChild(correctAnswer);
        review.appendChild(explanation);

        answerReview.appendChild(review);
    });

    resultContainer.classList.remove("hidden");

    submitBtn.disabled = true;

    questionsContainer.style.display = "none";
    document.querySelector(".progress-section").style.display = "none";
    document.querySelector(".instruction").style.display = "none";
    document.querySelector(".submit-section").style.display = "none";

    resultContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// ========================================
// RETAKE QUIZ
// ========================================

retakeBtn.addEventListener("click", function() {
    quizForm.reset();

    submitBtn.disabled = false;

    questionsContainer.style.display = "block";
    document.querySelector(".progress-section").style.display = "block";
    document.querySelector(".instruction").style.display = "block";
    document.querySelector(".submit-section").style.display = "block";

    resultContainer.classList.add("hidden");

    loadQuestions();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ========================================
// INITIALIZE QUIZ
// ========================================

loadQuestions();

console.log("Git Workshop Quiz loaded successfully!");
