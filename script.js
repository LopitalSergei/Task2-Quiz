"use strict";

import {
  questions,
  questionNumber,
  questionTimer,
  questionTitle,
  answersList,
  questionSubmit,
  questionNext,
  styleToggle,
  TIME_LIMIT,
} from "./constants.js";

let questionIdex = 0;
let score = 0;
let themeStyle = localStorage.getItem("themeStyle");

function clearQuestion() {
  questionNumber.innerHTML = "";
  questionTimer.innerHTML = "";
  questionTitle.innerHTML = "";
  answersList.innerHTML = "";
  questionSubmit.disabled = false;
  questionNext.disabled = true;
  timePassed = 0;
  timeLeft = TIME_LIMIT;
}

function createQuestion() {
  let questionWithManyAnswer = false;
  if (questions[questionIdex]["correctAnswer"].length > 1) {
    questionWithManyAnswer = true;
  }
  startTimer();
  questionNumber.innerHTML = `Вопрос № ${questionIdex + 1} из ${
    questions.length
  }`;
  questionTimer.innerHTML = formatTimeLeft(TIME_LIMIT);
  questionTitle.innerHTML = questions[questionIdex]["question"];

  const answers = questions[questionIdex]["answers"];
  let answerTemplate = "";

  if (questionWithManyAnswer) {
    answerTemplate = `
  <li class="question-answer">
		<input class="custom-checkbox" type="checkbox" id="question-answer-%answerNumber%" name="answer" value="%answerNumber%"/>
		<label class="question-label" for="question-answer-%answerNumber%">%answer%</label>
	</li>`;
  } else {
    answerTemplate = `
	<li class="question-answer">
		 <input class="question-input" type="radio" id="question-answer-%answerNumber%" name="answer" value="%answerNumber%"/>
		 <label class="question-label" for="question-answer-%answerNumber%">%answer%</label>
	 </li>`;
  }

  for (let i = 0; i < answers.length; i++) {
    const answer = answerTemplate
      .replaceAll("%answerNumber%", i + 1)
      .replace("%answer%", answers[i]);

    answersList.innerHTML += answer;
  }
}

function checkAnswer() {
  clearInterval(timerInterval);
  const answerChecked = answersList.querySelectorAll("input:checked");
  const allAnswers = answersList.querySelectorAll("input");
  let correctCount = 0;
  let correct = false;
  if (answerChecked.length !== 0) {
    correct = true;
    const correctAnswers = questions[questionIdex]["correctAnswer"];

    for (let i = 0; i < answerChecked.length; i++) {
      const answer = answerChecked[i];
      const userAnswerValue = parseInt(answer.value);
      if (correctAnswers.includes(userAnswerValue)) {
        answer.classList.add("correct-answer");
        correctCount++;
      } else {
        answer.classList.add("incorrect-answer");
        correct = false;
      }
    }
    if (correctCount === correctAnswers.length && correct) {
      score++;
    }

    for (let i = 0; i < correctAnswers.length; i++) {
      const correctAnswer = correctAnswers[i];
      if (!allAnswers[correctAnswer - 1].classList.contains("correct-answer")) {
        allAnswers[correctAnswer - 1].classList.add("not-selected-answer");
      }
    }

    questionEnd();
  }
}

function questionEnd() {
  questionSubmit.disabled = true;
  questionNext.disabled = false;
  for (const answer of answersList.querySelectorAll("input")) {
    answer.disabled = true;
    answer.classList.add("no-hover");
  }
}

function nextQuestion() {
  if (questions.length !== questionIdex + 1) {
    questionIdex++;
    clearQuestion();
    createQuestion();
  } else {
    clearQuestion();
    showResults();
  }
}

function showResults() {
  questionNumber.innerHTML = "Тест пройден!";
  questionTitle.innerHTML = `Вы ответили на ${score} из ${questions.length} вопросов!`;

  questionSubmit.innerHTML = "Начать заново";
  questionSubmit.onclick = () => location.reload();

  questionNext.remove();
}

// TIMER

let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = "";

function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);

  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed++;
    timeLeft = TIME_LIMIT - timePassed;
    document.querySelector("#question-timer").innerHTML =
      formatTimeLeft(timeLeft);
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      checkAnswer();
      questionEnd();
    }
  }, 1000);
}

function enableLightTheme() {
  document.body.classList.add("light-theme");
  localStorage.setItem("themeStyle", "light");
}

function enabledDarkTheme() {
  document.body.classList.remove("light-theme");
  localStorage.setItem("themeStyle", "dark");
}

// APP

if (themeStyle === "light") {
  enableLightTheme();
}

clearQuestion();
createQuestion();
questionSubmit.onclick = checkAnswer;
questionNext.onclick = nextQuestion;
styleToggle.onclick = () => {
  themeStyle = localStorage.getItem("themeStyle");
  if (themeStyle === "dark") {
    enableLightTheme();
  } else {
    enabledDarkTheme();
  }
};
