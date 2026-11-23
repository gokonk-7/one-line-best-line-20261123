// One Line, Best Line — make.fun bounty u-gudril-cool-one-line-best-line-b8c41f4d
// The entry is a single line of text (max 240 characters) on a free and
// entertaining theme. This program writes that one line to /output/entry.txt,
// where the sealed gate scorer reads it and the AI judge compares it pairwise
// against the other entries.
//
// The line: a password manager locks its owner out and demands a ransom of
// one uppercase letter and a special character. It opens on a relatable,
// scroll-stopping image ("locked me out of my own life"), stays one single
// sentence, and lands the whole joke on the punch at the end.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const LINE =
  "My password manager just locked me out of my own life and is now holding my memories hostage for a ransom of one uppercase letter and a special character.";

const OUTPUT_PATH = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";

function main(): void {
  if (LINE.length > 240) {
    throw new Error(`entry line is ${LINE.length} characters, over the 240 limit`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry line must not be blank");
  }
  let target = OUTPUT_PATH;
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, LINE, "utf8");
  } catch (error) {
    // Local runs without a writable /output fall back to ./output/entry.txt.
    console.error(`cannot write ${target}: ${error}`);
    target = join(process.cwd(), "output", "entry.txt");
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, LINE, "utf8");
  }
  // Read the file back and confirm it holds exactly the entry line.
  const written = readFileSync(target, "utf8");
  if (written !== LINE) {
    throw new Error(`wrote ${written.length} characters, expected ${LINE.length}`);
  }
  console.log(`wrote entry to ${target}`);
}

main();
