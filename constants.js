export const questions = [
  {
    question: "Вопрос с несколькими вариантами ответов",
    answers: ["Ответ 1", "Ответ 2", "Ответ 3", "Ответ 4"],
    correctAnswer: [1, 2],
  },
  {
    question:
      "Кто проводил эксперимент, где испытуемым показывали фильм про куклу и действия с ней, и затем наблюдали за поведением детей?",
    answers: ["А. Бандура", "Дж. Роттер", "Дж. Келли", "У. Мишел"],
    correctAnswer: [1],
  },
  {
    question: "В чём заключается предполагающий конструкт?",
    answers: [
      "Стандартизирует элементы т. обр., чтобы они были исключительно в его диапазоне",
      "Элементы могут одновременно принадлежать другим областям, но они постоянны в составе своей сферы",
      "Оставляет свои элементы открытыми для альтернативных конструкций",
      "Включает широкий спектр явлений",
    ],
    correctAnswer: [4],
  },
  {
    question:
      "Верно ли утверждение, что бихевиористы отрицают сознание как предмет начного исследования и сводят психику к различным формам поведения?",
    answers: ["Да", "Нет"],
    correctAnswer: [1],
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
    correctAnswer: [4],
  },
];

export const questionNumber = document.querySelector("#question-number");
export const questionTimer = document.querySelector("#question-timer");
export const questionTitle = document.querySelector("#question-title");
export const answersList = document.querySelector("#answers-list");
export const questionSubmit = document.querySelector("#question-submit");
export const questionNext = document.querySelector("#question-next");
export const styleToggle = document.querySelector("#style-toggle");

export const TIME_LIMIT = 10;
