// 基础数据：课程、词汇、口语 topic、励志语、经文（ES module 版本）

export const lessons = [
  {
    id: "2025-02-03-chores",
    title: "Feb 3 · Chores & Decluttering",
    level: "Intermediate",
    focus: ["chores", "decluttering", "life application"],
    vocabulary: [
      { word: "filthy", phonetic: "", meaning: "very dirty", meaningZh: "非常脏的", example: "The kitchen floor was absolutely filthy after the party." },
      { word: "vacuuming", phonetic: "", meaning: "the activity of cleaning floors using a vacuum cleaner", meaningZh: "用吸尘器清扫", example: "I spent the morning vacuuming the living room." },
      { word: "sweep (with a broom)", phonetic: "", meaning: "to clean the floor using a broom", meaningZh: "用扫帚扫地", example: "Could you sweep the kitchen floor with a broom?" },
      { word: "ironing clothes / wrinkle-free", phonetic: "", meaning: "to make clothes smooth using a hot iron so they have no wrinkles", meaningZh: "熨衣服 / 没有皱褶的", example: "He likes his shirts wrinkle-free, so he spends time ironing clothes." },
      { word: "raking leaves", phonetic: "", meaning: "collecting fallen leaves using a rake", meaningZh: "用耙子耙落叶", example: "We spent the afternoon raking leaves in the yard." },
      { word: "mowing the lawn", phonetic: "", meaning: "cutting the grass using a lawn mower", meaningZh: "修剪草坪", example: "My weekend chore is mowing the lawn." },
      { word: "trimming the hedges", phonetic: "", meaning: "cutting bushes to keep them neat", meaningZh: "修剪树篱", example: "He enjoys trimming the hedges in his garden." },
      { word: "green thumb", phonetic: "", meaning: "a natural talent for growing plants", meaningZh: "园艺天赋，种植能手", example: "She has a real green thumb and everything she plants grows well." },
      { word: "fig tree", phonetic: "", meaning: "a tree that grows figs", meaningZh: "无花果树", example: "There is a beautiful fig tree in their backyard." },
      { word: "weeding the garden", phonetic: "", meaning: "removing unwanted plants from a garden", meaningZh: "除草", example: "Weeding the garden can be tiring but satisfying." },
      { word: "domestic helper", phonetic: "", meaning: "a person employed to do household tasks", meaningZh: "家政帮手，家务助理", example: "They hired a domestic helper to come twice a week." },
      { word: "domestic violence", phonetic: "", meaning: "violent or abusive behavior at home", meaningZh: "家庭暴力", example: "Domestic violence is a serious issue that must not be ignored." },
      { word: "domestic engineer", phonetic: "", meaning: "a humorous term for a homemaker", meaningZh: "家庭工程师（幽默说法，指全职主妇/主夫）", example: "She jokingly calls herself a domestic engineer." },
      { word: "grocery shopping", phonetic: "", meaning: "buying food and household items from a store", meaningZh: "买菜，采购日用品", example: "I do the grocery shopping every Saturday morning." },
      { word: "nanny", phonetic: "", meaning: "someone paid to look after children", meaningZh: "保姆，专门照顾小孩的人", example: "They hired a nanny to take care of their baby." },
      { word: "babysitter", phonetic: "", meaning: "a person who looks after children for a short time", meaningZh: "临时保姆，帮忙看小孩的人", example: "We need a babysitter for Friday night." },
      { word: "dusting", phonetic: "", meaning: "removing dust from surfaces", meaningZh: "擦灰，掸灰", example: "Dusting the shelves is my least favorite chore." },
      { word: "cooking rice in a pot", phonetic: "", meaning: "making rice using a normal pot instead of a rice cooker", meaningZh: "用锅煮米饭", example: "My grandma is good at cooking rice in a pot." },
      { word: "walking the dog", phonetic: "", meaning: "taking the dog outside for a walk", meaningZh: "遛狗", example: "Walking the dog helps me relax after work." },
      { word: "to run an errand", phonetic: "", meaning: "to go out to do a small job or task", meaningZh: "跑腿，出去办点小事", example: "I need to run an errand before dinner." }
    ],
    topics: [
      "Talk about your least favorite chore and why you dislike it.",
      "Describe a chore that used to be fun, but slowly turned into a grind.",
      "Have you ever felt that socializing became a chore instead of joy?",
      "Share one area of your life (mental, schedule, digital, relationships) that needs decluttering."
    ],
    idioms: [
      {
        phrase: "a pack rat",
        meaning: "a person who keeps a lot of things and doesn’t like to throw things away",
        example: "My uncle is a real pack rat; his garage is full of old stuff."
      },
      {
        phrase: "a hoarder",
        meaning: "someone who collects and keeps too many things, often in an unhealthy way",
        example: "The TV show shows how a hoarder’s house can become unsafe."
      },
      {
        phrase: "minimalism",
        meaning: "a lifestyle that focuses on owning fewer things and what is truly important",
        example: "Minimalism helped her focus on what really matters in life."
      },
      {
        phrase: "sentimental value",
        meaning: "the personal emotional value something has, not its money value",
        example: "This old T-shirt has sentimental value because my friend gave it to me."
      },
      {
        phrase: "to pitch in",
        meaning: "to help with some work or activity",
        example: "If everyone pitches in, we can clean the house quickly."
      },
      {
        phrase: "clean up one’s act",
        meaning: "to start behaving in a better or more responsible way",
        example: "He decided to clean up his act and stop wasting time online."
      },
      {
        phrase: "clean as a whistle",
        meaning: "very clean",
        example: "After hours of cleaning, the bathroom was clean as a whistle."
      },
      {
        phrase: "sweep something under the carpet",
        meaning: "to hide a problem instead of dealing with it",
        example: "We can’t just sweep this issue under the carpet."
      },
      {
        phrase: "air one’s dirty laundry in public",
        meaning: "to talk about private problems in front of other people",
        example: "They argued loudly and aired their dirty laundry in public."
      }
    ],
    philosophy: [
      "A dream job can slowly turn into a grind if we lose our sense of purpose.",
      "Even a creative hobby can lose its spark when it becomes only a requirement.",
      "Decluttering is not only about objects; our mind, schedule, digital life and relationships also need space.",
      "Sometimes God invites us to let go of what we cling to, so that we can hold what truly gives life."
    ],
    bible: [
      {
        ref: "1 Corinthians 14:40",
        text: "But everything should be done in a fitting and orderly way."
      }
    ],
    others: [
      "Decluttering practices: garage sale / yard sale, making donations, joining community groups such as Buy Nothing groups.",
      "Example pricing language: “2 dollars” = “2 bucks”.",
      "Book: “The Life-Changing Magic of Tidying Up” by Marie Kondo – tidy by category, not by location; discard first, then organize; ask whether an item sparks joy."
    ]
  }
];

export const speakingTopics = [
  {
    id: "chores-and-decluttering",
    title: "Chores, Decluttering and Heart Space",
    question:
      "Talk about how chores and decluttering reflect what is happening in your inner life.",
    prompts: [
      "Which chore do you avoid the most? Why?",
      "Is there an area of your life that feels cluttered (mind, schedule, digital life, relationships)?",
      "What is one small thing you could ‘declutter’ this week?",
      "How would your daily life change if you lived more simply?"
    ],
    usefulPhrases: [
      "To be honest, I tend to avoid …",
      "Recently I’ve realized that my … is very cluttered.",
      "One small step I want to take this week is …",
      "For me, decluttering is not just about things, it’s about …"
    ]
  }
];

export const inspirationQuotes = [
  {
    en: "Little by little, with God’s grace, your English — and your life — will grow.",
    zh: "一点一点，在神的恩典中，你的英语和生命都会慢慢成长。",
    ref: "Faith · Growth · Daily discipline",
  },
  {
    en: "Your mistakes don’t define you; they train you.",
    zh: "错误不会定义你，它们只是在训练你。",
    ref: "Growth mindset",
  },
  {
    en: "When you feel like quitting, remember why you started.",
    zh: "当你想放弃的时候，想一想你当初为什么开始。",
    ref: "Perseverance",
  },
  {
    en: "God cares more about your heart than your performance.",
    zh: "神更在乎你的心，而不是你的表现。",
    ref: "Identity in Christ",
  },
  {
    en: "Consistency beats intensity. 20 focused minutes of English a day is powerful.",
    zh: "持续胜过猛冲，每天专注 20 分钟英语就很有力量。",
    ref: "Habits · Consistency",
  },
];

// 汇总出一个词汇池，用于词汇记忆和小游戏
export const vocabularyPool = lessons.flatMap((lesson) => lesson.vocabulary);

