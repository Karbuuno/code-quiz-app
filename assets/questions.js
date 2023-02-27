var questions = [
  {
    question: "Which of the following is not a commonly used data type?",
    answers: ["Alerts", "Strings", "Booleans", "Numbers"],
    correctAnswer: "Alerts",
  },
  {
    question: "What can arrays in JavaScript can be used to store?",
    answers: [
      "Booleans",
      "Numbers and strings",
      "Other arrays",
      "All of the above",
    ],
    correctAnswer: "All of the above",
  },
  {
    question: "How do you enclose the condition of an ' if ' statement?",
    answers: ["Quotes", "Square brackets", "Curly brackets", "Parentheses"],
    correctAnswer: "Parentheses",
  },
  {
    question:
      "What is a very useful tool for debugging and printing content to the debugger?",
    answers: ["Console.log", "For loops", "CSS", "Terminal/Bash"],
    correctAnswer: "Console.log",
  },
  {
    question: "What does DOM stand for?",
    answers: [
      "Do Over Mulligan",
      "Document Object Model",
      "Data Object Model",
      "Document Option Model",
    ],
    correctAnswer: "Document Object Model",
  },
];
container = document.querySelector(".container");
var introduction = document.querySelector(".introduction");
var questionsSection = document.querySelector(".questions-section");
var clearScore = document.querySelector("#clear-score");
// getting from html
var timer = document.getElementById("time");
var start = document.getElementById("btn-start");
var questionsList = document.querySelector(".question-list");
var answersList = document.querySelector(".answers-list");
var viewHigscore = document.getElementById("view-higscore");
var initials = document.getElementById("initials");
var highestScore = document.getElementById("highestScore");
var answerType = document.querySelector("#answer-type");

function showHighScore() {
  var score = window.localStorage.getItem("score");

  if (score) {
    console.log(score);
    highestScore.innerHTML = JSON.parse(score);
  }
}

var questionIndex = 0;
var time = 75;
var score = 0;

function resetDom() {
  questionsList.innerHTML = "";
  answersList.innerHTML = "";
}
// displaying questions
function displayQuestions(questionIndex) {
  resetDom();
  questionsList.innerHTML += `<h3>${questions[questionIndex].question}</h3>`;
  for (var j = 0; j < questions[questionIndex].answers.length; j++) {
    answersList.innerHTML += `<li>${questions[questionIndex].answers[j]}</li>`;
  }
}
// checking answer
function checkAnswer(selectedAnswer) {
  // if question is not correct
  if (questions[questionIndex].correctAnswer != selectedAnswer) {
    // if the time is less then 10 we will end the game because if we subtract 10 the time will under 0
    // which is not good the maximum time will be 1
    answerType.textContent = "Wrong";
    if (time < 10) {
      time = 0;

      return;
    }
    time = time - 10;
  } else {
    answerType.textContent = "Correct";
  }

  // time must not ended and still we have questions left
  if (questions.length - 1 == questionIndex) {
    score = time;
  } else {
    questionIndex = questionIndex + 1;
    displayQuestions(questionIndex);
  }
}

answersList.addEventListener("click", function (event) {
  var element = event.target;
  checkAnswer(event.target.textContent);
});

function gameIsOver() {
  resetDom();
  // creating form dynamically
  var initialsHTML = `
  <h1 class="all-done">All Done</h1>
  <form id="scoreForm" class="scoreForm">
  <h4>Your Final Score is: ${score}</h4>
  <label>Enter Your initials</label>
  <input type="text" id="initialNameInput" />
  <button type="submit">Submit</button>
  
  </form>`;
  initials.innerHTML += initialsHTML;

  var scoreForm = document.querySelector("#scoreForm");
  var initialNameInput = document.querySelector("#initialNameInput");

  scoreForm &&
    scoreForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // getting from localStorage
      if (initialNameInput.value) {
        var allEntries = JSON.parse(localStorage.getItem("allScore")) || [];
        // creating new score
        var finalScore = {
          initials: initialNameInput.value,
          score: score,
        };
        allEntries.push(finalScore);

        window.localStorage.setItem("allScore", JSON.stringify(allEntries));
      } else {
        alert("please enter your initial name");
        return;
      }
      window.location.href =
        "https://karbuuno.github.io/code-quiz-app/score.html";
    });
}
// starting
start.addEventListener("click", function () {
  introduction.classList = "introduction hidden";
  questionsSection.classList = "questions-section show";
  displayQuestions(questionIndex);
  countDown();
});

var Interval = "";

var countDown = () => {
  Interval = setInterval(function () {
    if (time && time !== 0 && score == 0) {
      time--;
      timer.textContent = `Time left: ${time}`;
    } else {
      clearInterval(Interval);
      timer.textContent = "Time is up";
      answerType.textContent = "";
      gameIsOver();
    }
  }, 1000);
};
