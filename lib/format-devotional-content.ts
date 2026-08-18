// Automatically bold Bible references in devotional HTML content.
// Parses HTML into text/tag segments so references inside tags are never modified.

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
  "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Psalm",
  "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
  "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah",
  "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians",
  "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon",
  "Hebrews", "James", "1 Peter", "2 Peter",
  "1 John", "2 John", "3 John", "Jude", "Revelation",
];

// Sort longest names first so "2 Thessalonians" matches before "Thessalonians".
const sortedBooks = [...BIBLE_BOOKS].sort((a, b) => b.length - a.length);
const booksPattern = sortedBooks.map((b) => b.replace(/ /g, "\\s+")).join("|");

// Matches: "Psalm 34:18", "1 Corinthians 13:4-7", "2 Timothy 1:7", etc.
const REFERENCE_RE = new RegExp(
  `(?:${booksPattern})\\s+\\d+:\\d+(?:\\s*[-–]\\s*\\d+)?`,
  "g"
);

export function processDevotionalContent(html: string): string {
  // Parse into text and HTML-tag segments.
  const segments: { type: "text" | "html"; value: string }[] = [];
  const tagRe = /<[^>]+>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(html)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: html.slice(lastIndex, match.index) });
    }
    segments.push({ type: "html", value: match[0] });
    lastIndex = tagRe.lastIndex;
  }
  if (lastIndex < html.length) {
    segments.push({ type: "text", value: html.slice(lastIndex) });
  }

  // Bold Bible references in text segments only.
  return segments
    .map((seg) => {
      if (seg.type !== "text") return seg.value;
      return seg.value.replace(REFERENCE_RE, (ref) => `<strong>${ref}</strong>`);
    })
    .join("");
}
