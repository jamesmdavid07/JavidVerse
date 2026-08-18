// One-time migration: creates the devotionals table and seeds data.
// Usage: npx tsx scripts/migrate-to-mysql.ts
// Run from the JavidVerse directory with .env.local configured.

import { config } from "dotenv";
import path from "path";
config({ path: path.join(process.cwd(), ".env.local") });
import getPool from "../lib/db";

const SEED_DATA = [
  {
    slug: "when-life-suddenly-changes",
    title: "When Life Suddenly Changes",
    author: "Written by Jhen Moreno",
    publication_date: "2026-08-18",
    main_bible_ref: "Psalm 34:18",
    bible_translation: "NIV",
    full_verse: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    content: '<p>Life has a way of shifting without warning. One moment everything seems steady, and the next, the ground beneath us feels uncertain. A sudden loss, an unexpected diagnosis, a relationship that ends without closure, a job that disappears overnight—these moments can leave us feeling disoriented, afraid, and unsure of what comes next.</p><p>In those moments, it can be hard to find the words to pray. It can be hard to see God in the middle of the storm. But even when life changes suddenly, God remains the same. He does not move. He does not leave. He draws near.</p><p>Psalm 34:18 reminds us of a beautiful truth: <em>"The Lord is close to the brokenhearted and saves those who are crushed in spirit."</em> God does not stand at a distance when we hurt. He comes close. He meets us in our pain, not after we have figured everything out, but right in the middle of it.</p><p>When life changes suddenly, we do not need to have all the answers. We need to lean into the One who does. Trusting God in uncertainty is not about pretending everything is fine. It is about choosing to believe that even when we cannot see the path ahead, He is already there.</p><p>Deuteronomy 31:6 tells us to be strong and courageous, not because the circumstances are easy, but because God goes with us. He will never leave us or forsake us. Jeremiah 29:11 reminds us that His plans for us are still good, even when they unfold in unexpected ways. Joshua 1:9 calls us to be strong and courageous, promising that the Lord our God will be with us wherever we go.</p><p>Change is never easy. But it does not have to shake us to our core when our foundation is built on Christ. He is our rock, our refuge, and our constant in a world that is always shifting.</p>',
    read_more_refs: JSON.stringify(["Deuteronomy 31:6", "Jeremiah 29:11", "Joshua 1:9", "Psalm 9:10", "Revelation 21:4"]),
    status: "published",
  },
  {
    slug: "the-peace-that-defies-understanding",
    title: "The Peace That Defies Understanding",
    author: "Written by Jhen Moreno",
    publication_date: "2026-08-17",
    main_bible_ref: "Philippians 4:6-7",
    bible_translation: "NIV",
    full_verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    content: '<p>Anxiety is something every person knows. It creeps in when we least expect it—in the quiet hours of the night, in the middle of a busy day, or when we receive news we never saw coming. It tells us to worry, to prepare for the worst, to carry what we were never meant to carry alone.</p><p>But Paul writes to the Philippians with a different instruction: <em>do not be anxious about anything.</em> This is not a dismissal of our feelings. It is an invitation to bring them to God. Every situation, every worry, every fear—He wants to hear about it.</p><p>The promise is remarkable. When we pray with thanksgiving, presenting our requests to God, something extraordinary happens: <em>the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.</em></p><p>This peace does not always make sense. The circumstances may not change immediately. The problem may still be there when we finish praying. But something shifts inside us. A calm settles in that we cannot explain. A quiet confidence replaces the panic.</p><p>That is what it means for peace to transcend understanding. It is not based on having all the answers. It is based on knowing the One who holds every answer.</p><p>Today, whatever is weighing on your heart, bring it to God. Do not carry it alone. He invites you to lay it down and receive the kind of peace the world cannot give and cannot explain. It is His gift to you.</p>',
    read_more_refs: JSON.stringify(["Isaiah 26:3", "1 Peter 5:7", "Matthew 6:34", "John 14:27", "Romans 8:28"]),
    status: "published",
  },
  {
    slug: "walking-by-faith-when-the-path-is-dark",
    title: "Walking by Faith When the Path Is Dark",
    author: "Written by Jhen Moreno",
    publication_date: "2026-08-16",
    main_bible_ref: "2 Corinthians 5:7",
    bible_translation: "NIV",
    full_verse: "For we live by faith, not by sight.",
    content: '<p>There are seasons in life when the path ahead is unclear. We pray, but the answer has not come. We trust, but the situation has not changed. We look for signs of progress, but everything seems still. These are the moments that test our faith in the most real and personal way.</p><p>Paul reminds the Corinthians that we walk by faith, not by sight. This means that our confidence is not rooted in what we can see, touch, or measure. It is rooted in the character of God—a God who has never failed, never lied, and never abandoned His people.</p><p>Walking by faith does not mean walking blindly. It means walking with a confidence that comes from knowing who leads us. Abraham left his homeland without knowing where he was going, yet he trusted that God would guide him. Moses stepped into the Red Sea before it parted. David faced Goliath with a sling and a prayer. None of them could see the outcome, but they could see the One who held the outcome.</p><p>When the path is dark, we do not need to see the entire road. We only need to see the next step. And God promises to be a lamp to our feet and a light to our path (Psalm 119:105). He does not always illuminate the whole journey, but He always gives enough light for the next step.</p><p>Today, if you are walking through a season of uncertainty, hold on to faith. Do not let the darkness convince you that God is not working. He is. He sees what you cannot see. He knows what you do not know. And He is leading you, even when you cannot feel it.</p>',
    read_more_refs: JSON.stringify(["Proverbs 3:5-6", "Hebrews 11:1", "Isaiah 41:10", "Psalm 119:105", "Romans 8:28"]),
    status: "published",
  },
];

async function migrate() {
  console.log("Creating devotionals table...");

  const pool = getPool();
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS devotionals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) DEFAULT 'Written by Jhen Moreno',
      publication_date DATE NOT NULL,
      main_bible_ref VARCHAR(100) NOT NULL,
      bible_translation VARCHAR(50) DEFAULT 'NIV',
      full_verse TEXT,
      content LONGTEXT NOT NULL,
      read_more_refs JSON,
      status ENUM('draft', 'published', 'scheduled') DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  console.log("Table created. Seeding data...");

  for (const d of SEED_DATA) {
    await pool.execute(
      `INSERT IGNORE INTO devotionals (slug, title, author, publication_date, main_bible_ref, bible_translation, full_verse, content, read_more_refs, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        d.slug, d.title, d.author, d.publication_date,
        d.main_bible_ref, d.bible_translation, d.full_verse,
        d.content, d.read_more_refs, d.status,
      ]
    );
    console.log(`  Seeded: ${d.title}`);
  }

  console.log("Migration complete.");
  await pool.end();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
