/* Pixel Pi-oneers · script.js
   1. Mobile menu   2. Footer year   3. Gallery lightbox   4. Mini quiz */

/* ---------- 1. Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.textContent = open ? "×" : "☰";
}

menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- 2. Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- 3. Gallery lightbox ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const galleryPhotos = [...document.querySelectorAll(".gallery .photo")];
let photoIndex = 0;

function showPhoto(i) {
  photoIndex = (i + galleryPhotos.length) % galleryPhotos.length;
  const figure = galleryPhotos[photoIndex];
  const img = figure.querySelector("img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = figure.querySelector("figcaption").textContent;
}

galleryPhotos.forEach((figure, i) => {
  figure.querySelector(".photo-btn").addEventListener("click", () => {
    showPhoto(i);
    lightbox.showModal();
  });
});
document.getElementById("lightboxClose").addEventListener("click", () => lightbox.close());
document.getElementById("lightboxPrev").addEventListener("click", () => showPhoto(photoIndex - 1));
document.getElementById("lightboxNext").addEventListener("click", () => showPhoto(photoIndex + 1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") showPhoto(photoIndex - 1);
  if (e.key === "ArrowRight") showPhoto(photoIndex + 1);
});

/* ---------- 4. Mini quiz ---------- */
const questions = [
  {
    q: "Which season was our team's first FIRST LEGO League season?",
    answers: ["BIOGLOW", "UNEARTHED", "MASTERPIECE"],
    correct: 1,
    why: "UNEARTHED was Pixel Pi-oneers' debut FLL season in 2025/26.",
  },
  {
    q: "What was the name of our 2025/26 innovation project?",
    answers: ["CHEMTRACE", "SoilScope", "EcoScan"],
    correct: 1,
    why: "SoilScope explored smarter archaeological site surveying.",
  },
  {
    q: "Which city hosted the Asia Pacific Open Championship we attended?",
    answers: ["Singapore", "Cape Town", "Sydney"],
    correct: 2,
    why: "Pixel Pi-oneers represented South Africa in Sydney, Australia.",
  },
];

const quiz = {
  question: document.getElementById("quizQuestion"),
  options: document.getElementById("quizOptions"),
  feedback: document.getElementById("quizFeedback"),
  progress: document.getElementById("quizProgress"),
  next: document.getElementById("quizNext"),
};

let index = 0;
let score = 0;
let answered = false;
let finished = false;

function showQuestion() {
  const current = questions[index];
  answered = false;
  finished = false;
  quiz.question.textContent = current.q;
  quiz.progress.textContent = `Question ${index + 1} of ${questions.length}`;
  quiz.feedback.textContent = "Choose an answer.";
  quiz.next.disabled = true;
  quiz.next.textContent = index === questions.length - 1 ? "See my result" : "Next question";
  quiz.options.innerHTML = "";

  current.answers.forEach((text, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = text;
    button.addEventListener("click", () => chooseAnswer(i));
    quiz.options.appendChild(button);
  });
}

function chooseAnswer(choice) {
  if (answered) return;
  answered = true;
  const current = questions[index];
  const isCorrect = choice === current.correct;
  if (isCorrect) score++;

  [...quiz.options.children].forEach((button, i) => {
    button.disabled = true;
    if (i === current.correct) button.classList.add("correct");
    if (i === choice && !isCorrect) button.classList.add("wrong");
  });

  quiz.feedback.textContent = (isCorrect ? "Correct! " : "Not quite. ") + current.why;
  quiz.next.disabled = false;
}

function showResult() {
  finished = true;
  quiz.question.textContent = `You scored ${score} out of ${questions.length}`;
  quiz.options.innerHTML = "";
  quiz.progress.textContent = "Finished";
  quiz.feedback.textContent =
    score === questions.length
      ? "Pi-oneer-level knowledge. You know our story!"
      : "Thanks for playing. Explore our seasons to learn even more about us.";
  quiz.next.textContent = "Play again";
  quiz.next.disabled = false;
}

quiz.next.addEventListener("click", () => {
  if (finished) {
    index = 0;
    score = 0;
    showQuestion();
  } else if (answered) {
    if (index < questions.length - 1) {
      index++;
      showQuestion();
    } else {
      showResult();
    }
  }
});

showQuestion();
