// One Word for the Boss — a make.fun bounty entry.
// This program chooses a single word that describes a boss and writes it
// to /output/entry.txt. The word is the whole entry: one word, 1 to 30
// characters, no spaces, no sentence, no explanation. It has to land alone.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Each candidate is scored on the judge's own criteria, most important first:
// funny standing alone, true about a real boss habit, fresh instead of the
// first word anyone reaches for, and travelling across any workplace.
const candidates = [
  { word: "Micromanager", funny: 2, truth: 5, fresh: 1, travels: 4 },
  { word: "Ghostboss", funny: 3, truth: 4, fresh: 3, travels: 3 },
  { word: "Blamethrower", funny: 4, truth: 4, fresh: 4, travels: 3 },
  { word: "Hovercraft", funny: 5, truth: 5, fresh: 5, travels: 5 },
  { word: "Meetingmaker", funny: 2, truth: 4, fresh: 2, travels: 3 },
];

// A candidate's total is the sum of its four criterion scores.
function score(entry) {
  return entry.funny + entry.truth + entry.fresh + entry.travels;
}

// The best word is the candidate with the highest total; the first one wins
// a tie, so the choice is deterministic on every run.
function pickBest(list) {
  let best = list[0];
  for (const entry of list.slice(1)) {
    if (score(entry) > score(best)) {
      best = entry;
    }
  }
  return best.word;
}

// Hovercraft wins outright: the boss who hovers over your shoulder all day,
// never landing, never doing the work themselves — funny, true and fresh.
const word = pickBest(candidates);

// The gate allows 1 to 30 characters and no whitespace at all, so the word
// is checked against exactly that shape before anything is written.
if (!/^\S{1,30}$/.test(word)) {
  throw new Error("entry must be one word of 1 to 30 characters");
}

// Write exactly the word, with no trailing newline, so the file holds only
// the ten letters of the entry and nothing else.
const outDir = "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), word, "utf8");
