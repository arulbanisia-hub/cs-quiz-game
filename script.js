// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What does RAM stands for?",
    answers: [
      { text: "Read Access Memory", correct: false },
      { text: "Random Access Memory", correct: true },
      { text: "Random Action Memory", correct: false },
      { text: "Run All Memory", correct: false },
    ],
  },
  {
    question: "Which Data Structure uses FIFO?",
    answers: [
      { text: "Graph", correct: false },
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
    ],
  },
  {
    question: "What does HTML stands for?",
    answers: [
      { text: "Hyper Trainer Marking Language", correct: false },
      { text: "Hyper Text Machine Language", correct: false },
      { text: "High Text Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "C", correct: false },
      { text: "C++", correct: false },
      { text: "C+", correct: true },
      { text: "C#", correct: false },
    ],
  },
  {
    question: "What symbol is used for single-line comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "/* */", correct: false },
      { text: "#", correct: false },
      { text: "<!-- -->", correct: false },
    ],
  },
    {
    question: "Which of these is NOT an Operating System?",
    answers: [
      { text: "Linux", correct: false },
      { text: "Oracle", correct: true },
      { text: "macOS", correct: false },
      { text: "Windows", correct: false },
    ],
  },
    {
    question: "What is the core of an Operating System called?",
    answers: [
      { text: "Shell", correct: false },
      { text: "Complier", correct: false },
      { text: "Terminal", correct: false },
      { text: "Kernel", correct: true },
    ],
  },
    {
    question: "Which symbol is used to end a statement in C?",
    answers: [
      { text: ":", correct: false },
      { text: ";", correct: true },
      { text: ".", correct: false },
      { text: "-", correct: false },
    ],
  },
    {
    question: "Which Data Structure works on LIFO principle?",
    answers: [
      { text: "Stack", correct: true },
      { text: "Queue", correct: false },
      { text: "True", correct: false },
      { text: "Graph", correct: false },
    ],
  },
    {
    question: "Which of the following is the programming language?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
      { text: "C#", correct: true },
      { text: "JSON", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Perfect Score! CS master!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! Strong CS basics!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep practicing!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
