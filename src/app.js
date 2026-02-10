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

// -------- 导航切换 --------
function setupNavigation() {
  const navLinks = $all(".nav-link");
  const sections = $all(".section");

  navLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.section;

      navLinks.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      sections.forEach((section) => {
        section.classList.toggle("section--active", section.id === target);
      });
    });
  });
}

// -------- 首页：励志语 & 简单统计 --------
function setupHome() {
  if (!inspirationQuotes || inspirationQuotes.length === 0) return;
  const index = new Date().getDate() % inspirationQuotes.length;
  const q = inspirationQuotes[index];

  $("#daily-quote-en").textContent = q.en;
  $("#daily-quote-zh").textContent = q.zh;
  $("#daily-quote-ref").textContent = q.ref;

  const statsContainer = $("#home-stats");
  const totalLessons = lessons.length;
  const totalWords = vocabularyPool.length;
  const totalTopics = speakingTopics.length;

  const stats = [
    { number: totalLessons, label: "Lesson series · 课程期数" },
    { number: totalWords, label: "Core words · 核心词汇" },
    { number: totalTopics, label: "Speaking topics · 口语话题" },
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
        `<li><strong>${v.word}</strong> (${v.phonetic}) – ${v.meaningZh}</li>`
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
      <span class="badge"><span class="badge-dot"></span> Level: ${
        lesson.level
      }</span>
      <span class="badge badge-soft"><span class="badge-dot"></span> Focus: ${lesson.focus.join(
        ", "
      )}</span>
    </div>
    <p class="muted">包含：词汇 · 口语题目 · idioms · 哲理 · Bible 经文 · 其他建议</p>

    <div class="lesson-columns">
      <section>
        <h3 class="lesson-block-title">Vocabulary · 词汇</h3>
        <ul class="lesson-list">${vocabList}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Speaking Topics · 口语话题</h3>
        <ul class="lesson-list">${topics}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Idioms</h3>
        <ul class="lesson-list">${idioms}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Philosophy · 哲理</h3>
        <ul class="lesson-list">${philosophy}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Bible</h3>
        <ul class="lesson-list">${bible}</ul>
      </section>
      <section>
        <h3 class="lesson-block-title">Others · 其他</h3>
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
      <span>已掌握 ${mastered} / ${total} 词汇</span>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
    `;
  }

  function renderWord() {
    if (!currentWord) {
      cardEl.innerHTML = `<p class="muted">点击 “下一词汇” 开始练习。</p>`;
      return;
    }

    const base = `
      <div class="vocab-word">${currentWord.word}</div>
      <div class="vocab-phonetic">${currentWord.phonetic}</div>
    `;

    const extra = showMeaning
      ? `
        <div class="vocab-meaning">${currentWord.meaningZh}</div>
        <div class="vocab-example">${currentWord.example}</div>
      `
      : `<p class="muted">点击 “显示/隐藏 中文 & 例句” 查看释义。</p>`;

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
      mastered: record.count + 1 >= 3, // 至少点“掌握”3 次，标记为 mastered
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

    <h3 class="speaking-section-title">思路提示 · Prompts</h3>
    <ul class="speaking-bullets">${prompts}</ul>

    <h3 class="speaking-section-title">Useful phrases · 常用表达</h3>
    <ul class="speaking-bullets">${phrases}</ul>

    <p class="muted" style="margin-top: 0.6rem;">
      小建议：先用中文在脑中回答一遍，然后试着用英文、慢慢说出来，不要怕停顿。
    </p>
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
    questionEl.textContent = `Which word matches this meaning? ${word.meaningZh}`;

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
    questionEl.textContent =
      "点击 “下一题” 开始小游戏。每道题按照中文选择对应的英文单词。";
    optionsEl.innerHTML = "";
  });

  gameState = { question: null, score: 0, total: 0 };
  updateStatus();
  questionEl.textContent =
    "点击 “下一题” 开始小游戏。每道题按照中文选择对应的英文单词。";
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

