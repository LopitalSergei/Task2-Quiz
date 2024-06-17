"use strict";

const questions = [
  {
    question:
      "Кто проводил эксперимент, где испытуемым показывали фильм про куклу и действия с ней, и затем наблюдали за поведением детей?",
    answers: ["А. Бандура", "Дж. Роттер", "Дж. Келли", "У. Мишел"],
    correctAnswer: 1,
  },
  {
    question: "В чём заключается предполагающий конструкт?",
    answers: [
      "Стандартизирует элементы т. обр., чтобы они были исключительно в его диапазоне",
      "Элементы могут одновременно принадлежать другим областям, но они постоянны в составе своей сферы",
      "Оставляет свои элементы открытыми для альтернативных конструкций",
      "Включает широкий спектр явлений",
    ],
    correctAnswer: 4,
  },
  {
    question:
      "Верно ли утверждение, что бихевиористы отрицают сознание как предмет начного исследования и сводят психику к различным формам поведения?",
    answers: ["Да", "Нет"],
    correctAnswer: 1,
  },
  {
    question:
      "Какой стадии когнитивного развития по Ж. Пиаже соответствует след. описание: развивается способность оперировать абстрактными понятиями, навыки научного мышления.",
    answers: [
      "Сенсомоторная стадия",
      "Дооперациональная стадия",
      "Стадия конкретных операций",
      "Период формальных операций",
    ],
    correctAnswer: 4,
  },
  //   { question: "", answers: [], correctAnswer: 0 },
];

let questionIdex = 0;
let score = 0;
let themeStyle = "dark";

const questionNumber = document.querySelector("#question-number");
const questionTimer = document.querySelector("#question-timer");
const questionTitle = document.querySelector("#question-title");
const answersList = document.querySelector("#answers-list");
const questionSubmit = document.querySelector("#question-submit");
const questionNext = document.querySelector("#question-next");
const styleToggle = document.querySelector("#style-toggle");

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
  startTimer();
  questionNumber.innerHTML = `Вопрос № ${questionIdex + 1} из ${
    questions.length
  }`;
  questionTimer.innerHTML = formatTimeLeft(TIME_LIMIT);
  questionTitle.innerHTML = questions[questionIdex]["question"];

  const answers = questions[questionIdex]["answers"];

  const answerTemplate = `
  <li class="question-answer">
      <input class="question-input" type="radio" id="question-answer-%answerNumber%" name="answer" value="%answerNumber%"/>
		<label class="question-label" for="question-answer-%answerNumber%">%answer%</label>
   </li>`;

  for (let i = 0; i < answers.length; i++) {
    const answer = answerTemplate
      .replaceAll("%answerNumber%", i + 1)
      .replace("%answer%", answers[i]);

    answersList.innerHTML += answer;
  }
}

function checkAnswer() {
  clearInterval(timerInterval);
  const answerChecked = answersList.querySelector("input:checked");
  if (answerChecked) {
    const correctAnswer = questions[questionIdex]["correctAnswer"];

    const userAnswerValue = parseInt(answerChecked.value);

    if (userAnswerValue === correctAnswer) {
      score++;
      answerChecked.classList.add("correct-answer");
    } else {
      answerChecked.classList.add("incorrect-answer");
    }

    questionEnd();
  }
}

function questionEnd() {
  questionSubmit.disabled = true;
  questionNext.disabled = false;
  //   const questionLabel = document.querySelector(".question-label");
  //   questionLabel.classList.add("no-hover");
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

let TIME_LIMIT = 10;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = "";

function formatTimeLeft(time) {
  // Наибольшее целое число меньше или равно результату деления времени на 60.
  const minutes = Math.floor(time / 60);

  // Секунды – это остаток деления времени на 60 (оператор модуля)
  let seconds = time % 60;

  // Если значение секунд меньше 10, тогда отображаем его с 0 впереди
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // Вывод в формате MM:SS
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
  themeStyle = "light";
  document.body.classList.add("light-theme");
}

function enabledDarkTheme() {
  themeStyle = "dark";
  document.body.classList.remove("light-theme");
}

// APP

clearQuestion();
createQuestion();
questionSubmit.onclick = checkAnswer;
questionNext.onclick = nextQuestion;
styleToggle.onclick = () => {
  if (themeStyle === "dark") {
    enableLightTheme();
  } else {
    enabledDarkTheme();
  }
};
