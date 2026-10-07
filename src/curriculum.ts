export type PartId =
  | "noun"
  | "pronoun"
  | "adjective"
  | "adverb"
  | "preposition"
  | "interjection"
  | "conjunction"
  | "verb";

export type Part = {
  id: PartId;
  name: string;
  short: string;
  job: string;
  definition: string;
  example: string;
  highlight: string;
  why: string;
  group: "naming" | "modifying" | "pic" | "lone";
  prompts: string[];
  check: { question: string; choices: string[]; answer: number; why: string };
};

export const PARTS: Part[] = [
  {
    id: "noun",
    name: "Noun",
    short: "Names it",
    job: "Person, place, or thing",
    definition: "A noun names a person, place, or thing. In a sentence, the noun is often the subject.",
    example: "The cat jumped over the chair.",
    highlight: "cat",
    why: "In the group, the noun is how you name the problem. Name the person, place, or thing that is in the way of your goal. You cannot change what you will not name.",
    group: "naming",
    prompts: [
      "Name the people you need with you in order to reach your goal.",
      "Name someone or something that can get in the way of that goal.",
      "Name a high-risk behavior that could pull you backward.",
    ],
    check: {
      question: "Which word is the noun in “John bought a new car”?",
      choices: ["bought", "new", "John", "a"],
      answer: 2,
      why: "John is the person the sentence is about. Bought is the verb. New describes the car.",
    },
  },
  {
    id: "pronoun",
    name: "Pronoun",
    short: "Stands in",
    job: "Takes the place of a noun",
    definition:
      "A pronoun takes the place of a noun so you do not have to repeat the same word. She, he, they, we, it, you, us, them, ours, and theirs are pronouns.",
    example: "John bought a new car and he paid cash.",
    highlight: "he",
    why: "In the group, a pronoun is a replacement. You can replace a person, place, thing, or thought that puts you at risk. Replace a distorted thought with a fact.",
    group: "naming",
    prompts: [
      "What thoughts or feelings do you want to replace?",
      "Which people do you need to spend less time with?",
      "Which places do you need to stop going?",
    ],
    check: {
      question: "In “The cat jumped, and it hid,” what does “it” replace?",
      choices: ["jumped", "the cat", "hid", "and"],
      answer: 1,
      why: "It stands in for the cat so the sentence does not say cat twice.",
    },
  },
  {
    id: "adjective",
    name: "Adjective",
    short: "Describes",
    job: "Modifies a noun or pronoun",
    definition:
      "An adjective modifies a noun or pronoun. It tells which one, what kind, or how many. In this program, small words like the and a are counted with the adjectives.",
    example: "The black cat jumped over the chair.",
    highlight: "black",
    why: "In the group, an adjective is a small change you choose. A behavior you learned as a child can be modified so it fits the life you want now. You can ask for support while you change it.",
    group: "modifying",
    prompts: [
      "Name something you used to believe that you do not believe anymore.",
      "Name behaviors you want to modify.",
      "Name feelings that need modifying.",
    ],
    check: {
      question: "Which word modifies car in “John bought a new blue car”?",
      choices: ["John", "bought", "blue", "a new blue car"],
      answer: 2,
      why: "Blue tells what kind of car. New does too. Blue is the word this lesson highlights.",
    },
  },
  {
    id: "adverb",
    name: "Adverb",
    short: "How it happens",
    job: "Modifies a verb, adjective, or adverb",
    definition:
      "An adverb modifies a verb, an adjective, or another adverb. It often tells how, when, where, or to what degree. Many adverbs end in -ly.",
    example: "John quickly left in his blue car.",
    highlight: "quickly",
    why: "In the group, the adverb is how you change the action. Your thinking drives your feelings, and your feelings drive what you do. Ask for the right help from the right person. An enabler who covers for you is not help.",
    group: "modifying",
    prompts: [
      "What do you need help with: housing, substance use, anger, education, or work?",
      "How do you feel about talking with a counselor or doctor?",
      "What changes are you prepared to make?",
    ],
    check: {
      question: "In “John quickly left,” which word does quickly modify?",
      choices: ["John", "left", "the car", "blue"],
      answer: 1,
      why: "Quickly tells how he left. It modifies the verb, not the person.",
    },
  },
  {
    id: "preposition",
    name: "Preposition",
    short: "Shows relation",
    job: "Connects a word to a noun or pronoun",
    definition:
      "A preposition shows the relationship between a word and a noun or pronoun. Over, under, in, on, to, from, with, and after are prepositions.",
    example: "The cat jumped over the chair.",
    highlight: "over",
    why: "In the group, a preposition points at the link between your past and what you do today. An old event is not the same event. A different time, place, and people can call for a different response.",
    group: "pic",
    prompts: [
      "How does your past relate to your current situation?",
      "How have your changes helped you?",
      "How does your thinking affect your goals?",
    ],
    check: {
      question: "Which word is the preposition in “John drove his car under the bridge”?",
      choices: ["drove", "his", "under", "bridge"],
      answer: 2,
      why: "Under shows the relationship between the car and the bridge.",
    },
  },
  {
    id: "interjection",
    name: "Interjection",
    short: "Shows feeling",
    job: "Expresses emotion",
    definition:
      "An interjection expresses emotion. A mild one is followed by a comma: Hey, whose cat is this? A strong one is followed by an exclamation point: Wow! John has a beautiful car.",
    example: "Wow! John has a beautiful car.",
    highlight: "Wow!",
    why: "In the group, the feeling is not the problem. The action you choose next is what gets you in trouble. Learn to notice the feeling and express it without harm.",
    group: "pic",
    prompts: [
      "Where did you learn which feelings were safe to show?",
      "Which feeling do you express most often, and what action follows it?",
      "What feeling do you want to express in a safer way?",
    ],
    check: {
      question: "Why is Wow followed by an exclamation point?",
      choices: [
        "It is a noun",
        "It shows strong emotion",
        "It connects two sentences",
        "It modifies a verb",
      ],
      answer: 1,
      why: "A strong interjection takes an exclamation point. A mild one, like Hey, takes a comma.",
    },
  },
  {
    id: "conjunction",
    name: "Conjunction",
    short: "Connects",
    job: "Joins words, phrases, or sentences",
    definition:
      "A conjunction connects words, phrases, clauses, and sentences. Coordinating conjunctions are for, and, nor, but, or, yet, so. Correlative conjunctions work in pairs: both/and, either/or, neither/nor, not only/but also, whether/or.",
    example: "The cat jumped over the chair, for it was afraid of the dog.",
    highlight: "for",
    why: "In the group, a conjunction is how you connect the dots. Childhood, core beliefs, and today’s choices are linked. If you do not know the root, you cannot fix it.",
    group: "pic",
    prompts: [
      "What is one core belief you still carry?",
      "Who in your family used alcohol or other drugs?",
      "Were both of your parents in the home? What did that teach you?",
    ],
    check: {
      question: "What does the word but show in a sentence?",
      choices: ["A cause", "A contrast", "A result", "A choice"],
      answer: 1,
      why: "For shows cause. And links equals. Nor shows the negative. But shows contrast. Or shows a choice. Yet shows contrast. So shows a result.",
    },
  },
  {
    id: "verb",
    name: "Verb",
    short: "The action",
    job: "Tells what the subject does",
    definition:
      "A verb tells the action, or what is being done. A complete sentence in this program has a noun, a verb, and a predicate. The predicate is the rest of the sentence that shows what the subject is doing.",
    example: "The cat jumped over the chair.",
    highlight: "jumped",
    why: "In the group, the verb is execution. After you name it, replace it, and modify it, you work the plan. Tools you can use: thought stopping, a time out, leaving the situation, meditation, asking for help, a meeting, and counting to ten.",
    group: "lone",
    prompts: [
      "Name the first steps of action you will take.",
      "How will you complete the first step?",
      "If you stay the same, what is the likely cost?",
    ],
    check: {
      question: "Which three pieces does this program require in a complete sentence?",
      choices: [
        "Adjective, adverb, and preposition",
        "Noun, verb, and predicate",
        "Pronoun, interjection, and conjunction",
        "Subject, comma, and period",
      ],
      answer: 1,
      why: "Noun, verb, predicate. The noun is the subject. The verb is the action. The predicate tells what the subject is doing.",
    },
  },
];

export const PART_BY_ID = Object.fromEntries(PARTS.map((part) => [part.id, part])) as Record<
  PartId,
  Part
>;

export const CODE_GROUPS = [
  {
    id: "naming" as const,
    code: "2",
    title: "Naming",
    hint: "Noun and pronoun",
  },
  {
    id: "modifying" as const,
    code: "2",
    title: "Modifying",
    hint: "Adjective and adverb",
  },
  {
    id: "pic" as const,
    code: "3",
    title: "PIC",
    hint: "Preposition, interjection, conjunction",
  },
  {
    id: "lone" as const,
    code: "1",
    title: "Lone star",
    hint: "Verb",
  },
];

export type Token = { text: string; part: PartId };

export const SENTENCES: { id: string; tokens: Token[]; teach: string }[] = [
  {
    id: "cat",
    teach: "Cat is the noun. Jumped is the verb. Over relates the cat to the chair.",
    tokens: [
      { text: "The", part: "adjective" },
      { text: "black", part: "adjective" },
      { text: "cat", part: "noun" },
      { text: "jumped", part: "verb" },
      { text: "over", part: "preposition" },
      { text: "the", part: "adjective" },
      { text: "chair", part: "noun" },
    ],
  },
  {
    id: "john-car",
    teach: "He replaces John. And connects the two actions. Bought and paid are verbs.",
    tokens: [
      { text: "John", part: "noun" },
      { text: "bought", part: "verb" },
      { text: "a", part: "adjective" },
      { text: "new", part: "adjective" },
      { text: "car", part: "noun" },
      { text: "and", part: "conjunction" },
      { text: "he", part: "pronoun" },
      { text: "paid", part: "verb" },
      { text: "cash", part: "noun" },
    ],
  },
  {
    id: "quickly",
    teach: "Quickly modifies the verb left. His and blue modify car, so they count as adjectives here.",
    tokens: [
      { text: "John", part: "noun" },
      { text: "quickly", part: "adverb" },
      { text: "left", part: "verb" },
      { text: "in", part: "preposition" },
      { text: "his", part: "adjective" },
      { text: "blue", part: "adjective" },
      { text: "car", part: "noun" },
    ],
  },
  {
    id: "wow",
    teach: "Wow! is a strong interjection. Beautiful modifies car.",
    tokens: [
      { text: "Wow!", part: "interjection" },
      { text: "John", part: "noun" },
      { text: "has", part: "verb" },
      { text: "a", part: "adjective" },
      { text: "beautiful", part: "adjective" },
      { text: "car", part: "noun" },
    ],
  },
  {
    id: "afraid",
    teach: "For shows the cause. It replaces the cat.",
    tokens: [
      { text: "The", part: "adjective" },
      { text: "cat", part: "noun" },
      { text: "jumped", part: "verb" },
      { text: "for", part: "conjunction" },
      { text: "it", part: "pronoun" },
      { text: "was", part: "verb" },
      { text: "afraid", part: "adjective" },
    ],
  },
  {
    id: "hey",
    teach: "Hey, is a mild interjection. Whose modifies cat.",
    tokens: [
      { text: "Hey,", part: "interjection" },
      { text: "whose", part: "adjective" },
      { text: "cat", part: "noun" },
      { text: "is", part: "verb" },
      { text: "this", part: "pronoun" },
    ],
  },
];

export const QUIZ: { question: string; choices: string[]; answer: number; why: string }[] = [
  {
    question: "What do participants say before they speak?",
    choices: ["Knowledge is power", "It's all business", "Noun, verb, predicate", "2-2-3-1"],
    answer: 1,
    why: "“It's all business” means it is time to be real, do the work, and drop the shame.",
  },
  {
    question: "What does the memory code 2-2-3-1 stand for?",
    choices: [
      "Two nouns, two verbs, three adjectives, one period",
      "Naming pair, modifying pair, PIC trio, and the verb",
      "Two minutes, two hands, three breaths, one chair",
      "Two goals, two fears, three steps, one meeting",
    ],
    answer: 1,
    why: "Two naming words, two modifying words, three PIC words, and one verb. That is all eight.",
  },
  {
    question: "A pronoun is used to…",
    choices: [
      "Show strong emotion",
      "Take the place of a noun",
      "Connect two sentences",
      "Modify a verb",
    ],
    answer: 1,
    why: "She, he, it, they, and we stand in so you do not repeat the noun.",
  },
  {
    question: "Which list is the coordinating conjunctions?",
    choices: [
      "Over, under, in, on",
      "For, and, nor, but, or, yet, so",
      "Wow, hey, oh, ouch",
      "Quickly, bravely, calmly",
    ],
    answer: 1,
    why: "Those seven words join equal ideas. Each one has a job: cause, link, negative, contrast, choice, contrast, result.",
  },
  {
    question: "In the group, an internal trigger is…",
    choices: [
      "A person you can see",
      "A thought or feeling",
      "A street you walk",
      "A meeting you attend",
    ],
    answer: 1,
    why: "Internal triggers are thoughts and feelings. External triggers are people, places, and things you can point to.",
  },
  {
    question: "Insight in Grammar Squad means…",
    choices: [
      "Inside me, I see",
      "I already knew the ending",
      "I forgot a detail",
      "I planned the next year",
    ],
    answer: 0,
    why: "Insight is understanding your own thinking, feelings, and usual choices.",
  },
  {
    question: "What does the briefcase hold?",
    choices: [
      "Only your goals",
      "The hurts, beliefs, and feelings you still carry",
      "Other people's homework",
      "A list of conjunctions",
    ],
    answer: 1,
    why: "The briefcase is the case of what you carry. Facing it makes the case lighter.",
  },
  {
    question: "The Chair means you are ready to…",
    choices: [
      "Skip the writing",
      "Blame the past and stop there",
      "Own the harm you caused and ask for help",
      "Memorize eight definitions only",
    ],
    answer: 2,
    why: "The Chair is change: truth, remorse, ownership, and help. Not blame.",
  },
];

export const THEMES = [
  "Disappointment",
  "Abuse",
  "Ridicule",
  "Neglect",
  "Humiliation",
  "Rejection",
  "Abandonment",
  "Deception",
  "Betrayal",
  "Being frightened",
];

export const COPING_TOOLS = [
  "Thought stopping",
  "Time out",
  "Leave the situation",
  "Meditate",
  "Ask for help",
  "Go to a meeting",
  "Count to ten",
  "Write it down",
];

export const CHAIR_MARKS = [
  "I can be honest, even when it does not favor me",
  "I can feel for the people I hurt",
  "I can say what I did without blaming them",
  "I can own my actions",
  "I can ask for help",
];

export const GLOSSARY: { term: string; meaning: string }[] = [
  {
    term: "Hindsight",
    meaning:
      "Understanding an event only after it happened. At the time, you did not see it clearly.",
  },
  {
    term: "Insight",
    meaning: "A clear look at people, situations, and your own inner nature. Inside me, I see.",
  },
  {
    term: "Foresight",
    meaning: "Looking ahead. Using what you know so you can choose a different next step.",
  },
  {
    term: "Oversight",
    meaning: "A miss. You forgot or failed to notice something, and you acted on impulse.",
  },
  {
    term: "Trigger",
    meaning: "Something that starts a thought, feeling, or old behavior. It can be inside you or outside you.",
  },
  {
    term: "It's all business",
    meaning: "The line you say before you speak. It is time to be real, do the assignment, and respect the room.",
  },
  {
    term: "2-2-3-1",
    meaning:
      "The memory code for the eight parts: two naming, two modifying, three PIC, and one verb.",
  },
  {
    term: "PIC",
    meaning: "Preposition, interjection, and conjunction.",
  },
  {
    term: "Briefcase",
    meaning: "What you carry: old hurts, shame, and beliefs. You decide what stays in it.",
  },
  {
    term: "The Chair",
    meaning: "The end of the path. You face your story and take responsibility for the harm you caused.",
  },
  {
    term: "Enabler",
    meaning: "A person who covers your harm so you never feel the consequence. That is not support.",
  },
  {
    term: "Predicate",
    meaning: "In this program, the part of the sentence that tells what the subject is doing.",
  },
];

export const SPEECH_TOPICS = [
  "The mental health impact of negative self-talk",
  "The impact of negative media on young people",
  "How to overcome negative thinking",
  "The health risks of high stress",
  "The adverse effects of negative emotions",
  "Ways to avoid misery and negative thinking",
  "The relationship between depression and negative thinking",
  "How to handle negative people",
  "The effects of negative rumors and gossip",
];

export const BOOK_PAGES = 79;
