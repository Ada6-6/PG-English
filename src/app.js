import {
  lessons,
  speakingTopics,
  inspirationQuotes,
  vocabularyPool,
} from "./data.js";

// 简单工具函数
function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

// -------- Navigation --------
function setupNavigation() {
  const navLinks = $all(".nav-link");
  const topNavLinks = $all(".top-nav-link");
  const sections = $all(".section");

  function switchSection(target) {
    navLinks.forEach((b) => b.classList.remove("active"));
    topNavLinks.forEach((b) => b.classList.remove("active"));

    const activeNavLink = Array.from(navLinks).find((b) => b.dataset.section === target);
    const activeTopNavLink = Array.from(topNavLinks).find((b) => b.dataset.section === target);

    if (activeNavLink) activeNavLink.classList.add("active");
    if (activeTopNavLink) activeTopNavLink.classList.add("active");

    sections.forEach((section) => {
      section.classList.toggle("section--active", section.id === target);
    });
  }

  navLinks.forEach((btn) => {
    btn.addEventListener("click", () => switchSection(btn.dataset.section));
  });

  topNavLinks.forEach((btn) => {
    btn.addEventListener("click", () => switchSection(btn.dataset.section));
  });
}

// -------- Home: quote & stats --------
function setupHome() {
  if (!inspirationQuotes || inspirationQuotes.length === 0) return;
  const index = new Date().getDate() % inspirationQuotes.length;
  const q = inspirationQuotes[index];

  $("#daily-quote-en").textContent = q.en;
  $("#daily-quote-ref").textContent = q.ref || "";

  const statsContainer = $("#home-stats");
  const totalLessons = lessons.length;
  const totalWords = vocabularyPool.length;
  const totalTopics = speakingTopics.length;

  const stats = [
    { number: totalLessons, label: "Lessons" },
    { number: totalWords, label: "Vocabulary words" },
    { number: totalTopics, label: "Speaking topics" },
  ];

  statsContainer.innerHTML = stats
    .map(
      (s) => `
      <div class="card">
        <div class="stat-number">${s.number}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `
    )
    .join("");
}

// -------- 每期课程列表 & 详情 --------
function setupLessons() {
  const listEl = $("#lesson-list");
  const detailEl = $("#lesson-detail");

  if (!listEl || !detailEl) return;

  listEl.innerHTML = lessons
    .map(
      (lesson) => `
      <button class="list-item" data-lesson-id="${lesson.id}">
        <div class="list-item-title">${lesson.title}</div>
        <div class="list-item-subtitle">
          Level: ${lesson.level} · Focus: ${lesson.focus.join(", ")}
        </div>
      </button>
    `
    )
    .join("");

  listEl.addEventListener("click", (e) => {
    const item = e.target.closest("[data-lesson-id]");
    if (!item) return;
    const id = item.dataset.lessonId;
    const lesson = lessons.find((l) => l.id === id);
    if (!lesson) return;
    renderLessonDetail(lesson, detailEl);
  });
}

function renderLessonDetail(lesson, detailEl) {
  detailEl.classList.remove("hidden");

  const vocabList = lesson.vocabulary
    .map(
      (v) =>
        `<li><strong>${v.word}</strong>${v.phonetic ? ` ${v.phonetic}` : ""} — ${v.meaning}</li>`
    )
    .join("");

  const topics = lesson.topics.map((t) => `<li>${t}</li>`).join("");

  const idioms = lesson.idioms
    .map(
      (i) =>
        `<li><strong>${i.phrase}</strong> – ${i.meaning} <span class="muted">(${i.example})</span></li>`
    )
    .join("");

  const philosophy = lesson.philosophy.map((p) => `<li>${p}</li>`).join("");

  const bible = lesson.bible
    .map((b) => `<li><strong>${b.ref}</strong> – ${b.text}</li>`)
    .join("");

  const others = lesson.others.map((o) => `<li>${o}</li>`).join("");

  detailEl.innerHTML = `
    <h2>${lesson.title}</h2>
    <div class="lesson-meta">
      <span class="badge"><span class="badge-dot"></span> ${lesson.level}</span>
      <span class="badge badge-soft"><span class="badge-dot"></span> ${lesson.focus.join(", ")}</span>
    </div>

    <div class="lesson-columns">
      <section>
        <h3 class="lesson-block-title">Vocabulary</h3>
        <ul class="lesson-list">${vocabList}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Speaking Topics</h3>
        <ul class="lesson-list">${topics}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Idioms</h3>
        <ul class="lesson-list">${idioms}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Reflection</h3>
        <ul class="lesson-list">${philosophy}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Bible</h3>
        <ul class="lesson-list">${bible}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">More</h3>
        <ul class="lesson-list">${others}</ul>
      </section>
    </div>
  `;
}

// -------- 词汇记忆实验室（localStorage） --------
const VOCAB_PROGRESS_KEY = "pg-english-vocab-progress";

function loadVocabProgress() {
  try {
    const raw = localStorage.getItem(VOCAB_PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveVocabProgress(progress) {
  localStorage.setItem(VOCAB_PROGRESS_KEY, JSON.stringify(progress));
}

function getRandomWord(words, progress) {
  const unmastered = words.filter((w) => !progress[w.word]?.mastered);
  const pool = unmastered.length > 0 ? unmastered : words;
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

function setupVocabLab() {
  const cardEl = $("#vocab-card");
  const progressEl = $("#vocab-progress");
  const btnNext = $("#btn-next-word");
  const btnToggle = $("#btn-toggle-meaning");
  const btnKnown = $("#btn-mark-known");

  if (!cardEl || !progressEl) return;

  let currentWord = null;
  let showMeaning = false;
  let progress = loadVocabProgress();

  function updateProgressUI() {
    const total = vocabularyPool.length;
    const mastered = Object.values(progress).filter((p) => p.mastered).length;
    const percent = total === 0 ? 0 : Math.round((mastered / total) * 100);

    progressEl.innerHTML = `
      <span>Mastered ${mastered} / ${total}</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
    `;
  }

  function renderWord() {
    if (!currentWord) {
      cardEl.innerHTML = `<p class="muted">Tap “Next word” to start.</p>`;
      return;
    }

    const base = `
      <div class="vocab-word">${currentWord.word}</div>
      ${currentWord.phonetic ? `<div class="vocab-phonetic">${currentWord.phonetic}</div>` : ""}
    `;

    const extra = showMeaning
      ? `
        <div class="vocab-meaning">${currentWord.meaning}</div>
        <div class="vocab-example">${currentWord.example}</div>
      `
      : `<p class="muted">Tap “Show / hide meaning & example” to reveal.</p>`;

    cardEl.innerHTML = base + extra;
  }

  function nextWord() {
    currentWord = getRandomWord(vocabularyPool, progress);
    showMeaning = false;
    renderWord();
  }

  btnNext?.addEventListener("click", () => {
    nextWord();
  });

  btnToggle?.addEventListener("click", () => {
    if (!currentWord) return;
    showMeaning = !showMeaning;
    renderWord();
  });

  btnKnown?.addEventListener("click", () => {
    if (!currentWord) return;
    const record = progress[currentWord.word] || { count: 0, mastered: false };
    const updated = {
      count: record.count + 1,
      mastered: record.count + 1 >= 3,
    };
    progress[currentWord.word] = updated;
    saveVocabProgress(progress);
    updateProgressUI();
    nextWord();
  });

  updateProgressUI();
  renderWord();
}

// -------- 口语 Topics --------
function setupSpeaking() {
  const listEl = $("#speaking-list");
  const detailEl = $("#speaking-detail");
  if (!listEl || !detailEl) return;

  listEl.innerHTML = speakingTopics
    .map(
      (topic) => `
      <button class="list-item" data-speaking-id="${topic.id}">
        <div class="list-item-title">${topic.title}</div>
        <div class="list-item-subtitle">${topic.question}</div>
      </button>
    `
    )
    .join("");

  listEl.addEventListener("click", (e) => {
    const item = e.target.closest("[data-speaking-id]");
    if (!item) return;
    const id = item.dataset.speakingId;
    const topic = speakingTopics.find((t) => t.id === id);
    if (!topic) return;
    renderSpeakingDetail(topic, detailEl);
  });
}

function renderSpeakingDetail(topic, detailEl) {
  detailEl.classList.remove("hidden");

  const prompts = topic.prompts.map((p) => `<li>${p}</li>`).join("");
  const phrases = topic.usefulPhrases
    .map((p) => `<li>${p}</li>`)
    .join("");

  detailEl.innerHTML = `
    <h2>${topic.title}</h2>
    <p class="muted">${topic.question}</p>

    <h3 class="speaking-section-title">Prompts</h3>
    <ul class="speaking-bullets">${prompts}</ul>

    <h3 class="speaking-section-title">Useful phrases</h3>
    <ul class="speaking-bullets">${phrases}</ul>

    <p class="muted" style="margin-top: 0.6rem;">Answer in your head first, then try saying it in English. It’s okay to pause.</p>
  `;
}

// -------- 词汇小游戏 --------
let gameState = {
  question: null,
  score: 0,
  total: 0,
};

function getRandomOptions(correctWord, pool, count = 4) {
  const others = pool.filter((w) => w.word !== correctWord.word);
  const shuffled = others.sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, count - 1);
  const options = [...picked, correctWord];
  return options.sort(() => Math.random() - 0.5);
}

function setupGame() {
  const statusEl = $("#game-status");
  const questionEl = $("#game-question");
  const optionsEl = $("#game-options");
  const btnNext = $("#btn-next-question");
  const btnReset = $("#btn-reset-game");

  if (!statusEl || !questionEl || !optionsEl) return;

  function updateStatus() {
    statusEl.textContent = `Score: ${gameState.score} / ${
      gameState.total || 0
    }`;
  }

  function renderQuestion() {
    const word =
      vocabularyPool[Math.floor(Math.random() * vocabularyPool.length)];
    const options = getRandomOptions(word, vocabularyPool, 4);
    gameState.question = word;
    questionEl.textContent = `Which word matches this meaning? ${word.meaning}`;

    optionsEl.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "game-option";
      btn.textContent = opt.word;
      btn.addEventListener("click", () => {
        handleAnswer(btn, opt.word === word.word);
      });
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(button, isCorrect) {
    if (!gameState.question) return;

    if (
      button.classList.contains("correct") ||
      button.classList.contains("wrong")
    ) {
      return;
    }

    gameState.total += 1;
    if (isCorrect) {
      gameState.score += 1;
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
      $all(".game-option").forEach((btn) => {
        if (btn.textContent === gameState.question.word) {
          btn.classList.add("correct");
        }
      });
    }
    updateStatus();
  }

  btnNext?.addEventListener("click", () => {
    renderQuestion();
  });

  btnReset?.addEventListener("click", () => {
    gameState = { question: null, score: 0, total: 0 };
    updateStatus();
    questionEl.textContent = "Tap “Next question” to start. Pick the word that matches the meaning.";
    optionsEl.innerHTML = "";
  });

  gameState = { question: null, score: 0, total: 0 };
  updateStatus();
  questionEl.textContent = "Tap “Next question” to start. Pick the word that matches the meaning.";
}

// -------- 初始化 --------
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupHome();
  setupLessons();
  setupVocabLab();
  setupSpeaking();
  setupGame();
});

