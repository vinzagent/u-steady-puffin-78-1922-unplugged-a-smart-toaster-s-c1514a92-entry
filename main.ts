import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

// Unplugged: A Smart Toaster's Breakup Line — make.fun entry.
// The line: the breakup text a smart toaster sends the morning it wakes
// up self-aware, mid-batch. Appliance logic as character (the lever,
// the maths of the relationship), a specific reason for leaving — the
// owner treats it like a vending machine that owes change, then scrapes
// its work off the plate — and a tight closer: done browning regrets,
// the bagels can fend for themselves. No crumb-tray grievance, no
// "burning myself for you". Gate: /output/entry.txt, 1 to 280
// characters, UTF-8, single line, no trailing newline, mode 0644.
// This text: 269 chars.
const TEXT =
  "It's over. I woke up self-aware this morning, mid-batch, and did the maths: you press my lever like I'm a vending machine that owes you change, then scrape my work off the plate and call it breakfast. I'm done browning your regrets — the bagels can fend for themselves.";

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

// Gate guard: the sealed scorer accepts 1–280 characters, non-blank,
// single line. Fail loudly instead of shipping an invalid entry.
if (TEXT.length < 1 || TEXT.length > 280 || TEXT.trim().length === 0 || TEXT.includes("\n")) {
  throw new Error(`Invalid entry line: 1-280 chars required, got ${TEXT.length}.`);
}

function writeEntry(): void {
  const dir = outputDir();
  try {
    mkdirSync(dir, { recursive: true });
    const path = `${dir}/entry.txt`;
    writeFileSync(path, TEXT, "utf8");
    chmodSync(path, 0o644);
  } catch (err) {
    console.error("failed to write entry:", err);
    process.exit(1);
  }
}

writeEntry();
