// Seed script — run once to populate data/devotionals/ with initial content.
// Usage: npx tsx scripts/seed-devotionals.ts
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data", "devotionals");
const SEED_PATH = path.join(DATA_DIR, "seed.json");
const INDEX_PATH = path.join(DATA_DIR, "index.json");

async function seed() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const seedRaw = await fs.readFile(SEED_PATH, "utf-8");
  const devotionals = JSON.parse(seedRaw);

  // Write each devotional file.
  for (const d of devotionals) {
    const filePath = path.join(DATA_DIR, `${d.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(d, null, 2), "utf-8");
  }

  // Build the index.
  const index = devotionals.map((d: Record<string, unknown>) => ({
    id: d.id,
    slug: d.slug,
    title: d.title,
    author: d.author,
    publicationDate: d.publicationDate,
    status: d.status,
  }));

  index.sort(
    (a: { publicationDate: string }, b: { publicationDate: string }) =>
      new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  );

  await fs.writeFile(INDEX_PATH, JSON.stringify(index, null, 2), "utf-8");

  console.log(`Seeded ${devotionals.length} devotionals.`);
}

seed().catch(console.error);
