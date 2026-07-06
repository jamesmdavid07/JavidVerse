// About Us Page and Ministry Timeline
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Mic2,
  Users,
} from "lucide-react";
import SectionWrapper from "@/components/sections/SectionWrapper";

export const metadata = {
  title: "About James M. David — Faith, Mission & Creativity",
  description:
    "James Maangi David is a theology student, digital missionary, educator, author, designer, and creative communicator.",
};

// Intro image tiles representing James's core areas of service.
const introSnapshots = [
  {
    label: "Faith",
    src: "/about/james.jpg",
    alt: "Portrait of James Maangi David",
    position: "center",
  },
  {
    label: "Technology",
    src: "/about/diploma-in-it.jpg",
    alt: "James studying information technology",
    position: "center 35%",
  },
  {
    label: "Teaching",
    src: "/about/kitui-teachers-college.jpg",
    alt: "James with students in a classroom",
    position: "center",
  },
  {
    label: "Ministry",
    src: "/about/me-preaching.jpg",
    alt: "James preaching during a ministry engagement",
    position: "center 22%",
  },
];

// Faith journey cards displayed in chronological story order.
const faithJourney = [
  {
    year: "2015",
    title: "First Truth Encounter",
    image: "/about/following-truth.jpg",
    alt: "James at a Seventh-day Adventist church sign",
    position: "center top",
    text: "I first discovered the biblical truth about the Sabbath through my uncle, whose life was transformed by an Adventist radio program on Wikwatyo FM. With no nearby Adventist church, we walked nearly 20 kilometers every Sabbath to worship, strengthening my faith and commitment to God's truth."
  },
  {
    year: "February 2019",
    title: "Following the Truth",
    image: "/about/baptism-service.jpg",
    alt: "Baptism service in a river",
    position: "center",
    text: "Following my baptism, I fully committed my life to Christ and sensed a clear calling to teach, preach, and prepare for gospel ministry. That decision became the foundation of my theological education, evangelistic work, youth leadership, and lifelong commitment to sharing God’s Word.",
  },
  {
    year: "2018",
    title: "A Church Begins Under a Tree",
    image: "/about/church-under-tree.jpg",
    alt: "Small Sabbath School gathering under a tree in Yongela",
    position: "center",
    text: "In Yongela, a small Sabbath School began under a tree at the village market. A few believers gathered each Sabbath to worship, study the Bible, pray together, and encourage one another. What started as a simple gathering became the beginning of a growing faith community.",
  },
  {
    year: "Yongela",
    title: "A Church Is Rising",
    image: "/about/new-church.jpg",
    alt: "Completed Seventh-day Adventist church building in Yongela",
    position: "center top",
    text: "Through the support of Maranatha International, our congregation now has a completed church building and a borehole on donated land. What began under a tree now stands as a testimony of God’s faithfulness and His continued work among the people of Yongela.",
  },
];

// Shared responsive image treatment for About-page story cards.
function StoryImage({
  src,
  alt,
  className = "aspect-[4/3]",
  position = "center",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-primary ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover transition duration-700 hover:scale-105"
        style={{ objectPosition: position }}
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
    </div>
  );
}
export default function AboutPage() {
  return (
    <>
      {/* About Hero Section */}
      <section className="bg-primary px-6 py-12 text-light sm:px-8 sm:py-14">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent sm:text-sm">A creative brand</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">About JavidVerse</h1>
          <p className="mx-auto mt-5 max-w-4xl text-lg leading-8 text-light/80 sm:text-xl sm:leading-9">Founded by James M. David to render creative solutions and Christ-centered services.</p>
        </div>
      </section>

      {/* Biography Section */}
      <SectionWrapper title="Meet James" subtitle="A young man committed in faith, technology, and creativity in service to God and people.">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-primary shadow-premium">
            <Image src="/about/james.jpg" alt="James M. David" fill priority className="object-cover object-center" sizes="(min-width: 1024px) 42vw, 100vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/85 to-transparent p-8 pt-28 text-light">
              <h2 className="text-3xl font-bold">James M. David</h2>
              <p className="mt-2 text-sm text-light/80">Founder of JavidVerse · Theology Student · Digital Missionary · Author</p>
            </div>
          </div>
          <div className="space-y-5 text-base leading-8 text-primary/75">
            <p>I am James M. David, founder of JavidVerse, a theology student, digital missionary, educator, author, designer, and creative communicator committed to using faith, technology, and media to serve God and people with excellence. My passion is communicating biblical truth through teaching, preaching, writing, design, and digital ministry—helping people understand God&apos;s Word with clarity, purpose, and hope. Currently pursuing a Bachelor of Arts in Theology at Mountain View College in the Philippines, I continue to integrate ministry, education, and creative media through JavidVerse, a platform dedicated to Christ-centered communication, digital mission, and meaningful service.</p>
            <blockquote className="rounded-r-2xl border border-primary/10 border-l-4 border-l-accent bg-white p-6 text-xl font-bold leading-8 text-primary">Every message carries purpose. Every creative work is an opportunity to serve.</blockquote>
            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {introSnapshots.map((item) => (
                <div key={item.label} className="group relative aspect-square overflow-hidden rounded-2xl bg-primary shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    style={{ objectPosition: item.position }}
                    sizes="(min-width: 1280px) 10vw, (min-width: 768px) 20vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Faith Journey Section */}
      <SectionWrapper
        title="My Journey of Faith"
        subtitle="A story of biblical discovery, courageous commitment, and God’s faithful leading."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
      >
        <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2">
          {faithJourney.map((item) => (
            <article key={item.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm">
              <StoryImage src={item.image} alt={item.alt} className="aspect-[16/9]" position={item.position} />
              <div className="flex-1 p-7 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">{item.year}</p>
                <h3 className="mt-2 text-xl font-bold text-primary">{item.title}</h3>
                <p className="mt-3 leading-7 text-primary/70">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {/* Education Section */}
      <SectionWrapper title="Education & Preparation" subtitle="Teaching shaped my communication, technology strengthened my skills, and theology continues to prepare me for ministry.">
        <div className="grid gap-7 lg:grid-cols-3">
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
            <StoryImage src="/about/kitui-teachers-college.jpg" alt="James with students during classroom teaching experience" position="center" />
            <div className="flex-1 p-8">
              <Users className="h-9 w-9 text-accent" />
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-accent">2019 · Kenya</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Teaching Course</h3>
              <p className="mt-1 font-semibold text-primary/60">Kitui Teachers&apos; Training College</p>
              <p className="mt-4 leading-8 text-primary/70">James pursued teacher education at Kitui Teachers&apos; Training College and gained practical classroom experience by teaching in several schools. This training strengthened his patience, communication, and ability to guide learners with care.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
            <StoryImage src="/about/diploma-in-it.jpg" alt="James studying information technology" position="center 35%" />
            <div className="flex-1 p-8">
              <GraduationCap className="h-9 w-9 text-accent" />
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-accent">2019–2021 · Kenya</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Diploma in Information Technology</h3>
              <p className="mt-1 font-semibold text-primary/60">Wote Technical Training College</p>
              <p className="mt-4 leading-8 text-primary/70">At Wote Technical Training Institute, James studied programming, object-oriented programming, web development, operating systems, databases, and systems analysis and design. This training established a practical foundation in technology, structured thinking, and problem-solving.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-primary text-light shadow-premium">
            <StoryImage src="/about/theology-mvc.jpeg" alt="James at Mountain View College in the Philippines" position="center 30%" />
            <div className="flex-1 p-8">
              <BookOpen className="h-9 w-9 text-accent" />
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-accent">2023–Present · Philippines</p>
              <h3 className="mt-2 text-2xl font-bold">Bachelor of Arts in Theology</h3>
              <p className="mt-1 font-semibold text-light/65">Mountain View College</p>
              <p className="mt-4 leading-8 text-light/75">A scholarship from the Southern Asia-Pacific Division opened the way to Mountain View College. Through theological study, preaching, evangelism, youth leadership, literature ministry, and church service, this season continues to prepare James for pastoral ministry and mission.</p>
            </div>
          </article>
        </div>
      </SectionWrapper>

      {/* Missionary Experience Section */}
      <SectionWrapper
        title="Missionary Experience"
        subtitle="Serving across communities and cultures through digital ministry, evangelism, education, media, and global mission."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
      >
        <div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-2 lg:grid-cols-6">
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-2">
            <StoryImage src="/about/online-ministry.jpg" alt="James creating gospel-centered online ministry content" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Online Ministry</h3>
              <p className="mt-4 leading-8 text-primary/70">James led online Bible studies, prayed with people from different countries, connected seekers with local churches, managed ministry social media pages, responded to messages, and created gospel-centered digital content. Behind every message was a person searching for hope in Christ.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-2">
            <StoryImage src="/about/outreach-evangelism.jpg" alt="James participating in church outreach and evangelism" className="aspect-[16/9]" position="center 35%" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Outreach &amp; Evangelism</h3>
              <p className="mt-4 leading-8 text-primary/70">James participated in evangelistic crusades, public evangelism, church visitation, care groups, Bible studies, and community outreach. Through these ministries, he shared the gospel while strengthening churches and encouraging spiritual growth within local communities.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-2">
            {/* Davao and Butuan training images */}
            <div className="grid aspect-[16/9] grid-cols-2 overflow-hidden bg-primary">
              <div className="relative overflow-hidden">
                <Image src="/about/davao-youth-training.jpg" alt="James leading youth training in Davao" fill className="object-cover transition duration-700 hover:scale-105" style={{ objectPosition: "center 30%" }} sizes="(min-width: 1024px) 16vw, 50vw" />
              </div>
              <div className="relative overflow-hidden">
                <Image src="/about/butuan-youth-training.jpg" alt="James leading digital evangelism training in Butuan" fill className="object-cover transition duration-700 hover:scale-105" style={{ objectPosition: "center 30%" }} sizes="(min-width: 1024px) 16vw, 50vw" />
              </div>
            </div>
            <div className="flex-1 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Davao &amp; Butuan</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Youth Training</h3>
              <p className="mt-4 leading-8 text-primary/70">James has participated in youth training programs helping young people discover how digital ministry can be used to spread the gospel. These programs also focused on leadership, discipleship, Christian service, and active involvement in ministry.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-3">
            <StoryImage src="/about/takeo-adventist-school.jpg" alt="James with students at Takeo Adventist School in Cambodia" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">June 2025</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Mission Trip — Cambodia</h3>
              <p className="mt-4 leading-8 text-primary/70">During a mission trip to Cambodia, James taught English and Biblical Studies at Takeo Adventist School for Grades 4, 5, 6, and 11. Building meaningful relationships while nurturing faith through education made this experience both humbling and impactful.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-3">
            <StoryImage src="/about/mvc-media-ministry.jpg" alt="James editing video content for MVC Media Ministry" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">MVC Media Ministry</h3>
              <p className="mt-4 leading-8 text-primary/70">James serves with the Mountain View College Media Center, editing videos, producing content for InVerse Philippines and the GluTeen Podcast, and supporting church livestreams and other digital ministry initiatives.</p>
            </div>
          </article>
        </div>
      </SectionWrapper>

      {/* Ministry Formation Section */}
      <SectionWrapper title="Ministry Leadership & Formation" subtitle="Developing Christ-centered leadership through service, evangelism, preaching, literature ministry, and pastoral training.">
        <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2">
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
            <StoryImage src="/about/youth-leadership.jpg" alt="James after Master Guide and Senior Youth Leader investiture" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Master Guide &amp; Senior Youth Leader</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Leadership</h3>
              <p className="mt-4 leading-8 text-primary/70">James completed Master Guide and Senior Youth Leader training and was officially invested. These experiences prepared him to mentor young people, organize ministry programs, and cultivate spiritual leadership within the church.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
            <StoryImage src="/about/field-ministry-training.jpg" alt="Certificate recognizing James M. David for field ministry service as an evangelist" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Field Ministry Training</h3>
              <p className="mt-4 leading-8 text-primary/70">As part of his ministerial preparation, James served as an evangelist at Dologon Seventh-day Adventist Church (2023–2024), as a student church pastor at Cabanglasan Seventh-day Adventist Church (2024–2025), and completed Field School training in Molave City (April–May 2026).</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
            <StoryImage src="/about/literature-evangelism.jpg" alt="James holding a book during literature evangelism" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Literature Evangelism</h3>
              <p className="mt-4 leading-8 text-primary/70">Alongside his theological studies, James engaged in literature evangelism, sharing Christ-centered books while gaining valuable experience in personal witnessing, mission work, and soul-winning. He is also the author of <em>In the Arms of Faith</em>, a personal testimony that recounts his journey of faith and God’s leading throughout his life.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
            <StoryImage src="/about/preaching-engagements.jpg" alt="James speaking during a preaching engagement" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Preaching Engagements</h3>
              <p className="mt-4 leading-8 text-primary/70">James has been invited to preach in churches, youth fellowships, evangelistic meetings, weeks of prayer, and other ministry events. He also receives online invitations to share sermons, Bible studies, devotionals, and personal testimonies with churches and youth groups across different regions, extending the reach of God’s Word beyond geographical boundaries.</p>
            </div>
          </article>
        </div>
      </SectionWrapper>

      {/* Author Section */}
      <SectionWrapper
        title="As an Author"
        subtitle="James M. David shares his journey of discovery, rejection, redemption, and revival, reminding every reader that God’s plans are never accidental."
        className="bg-primary"
        titleClass="text-white"
        subtitleClass="text-white/75"
        headerClassName="mx-auto mb-10 max-w-6xl"
      >
        <div className="mx-auto grid max-w-6xl gap-8">
          {/* Author card: edge-to-edge image with vertically centered copy */}
          <article className="grid overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium lg:grid-cols-[34%_66%]">
            <div className="relative aspect-square w-full lg:aspect-auto lg:min-h-[24rem]">
              <Image
                src="/about/Author.jpg"
                alt="James M. David as an author"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 392px, 100vw"
              />
            </div>
            <div className="flex items-center px-8 py-10 sm:px-12 sm:py-12 lg:px-14">
              <div className="text-left">
                <p className="text-2xl font-bold leading-tight text-primary sm:text-3xl">
                  May God bless you as you step into the arms of faith.
                </p>
                <p className="mt-6 max-w-3xl text-lg leading-[1.9] text-primary/70">
                  Growing up, I loved writing, and over the years, I&apos;ve kept journals of my answered prayers by God. These stories make up this book. They are simple, raw, and real. I believe they are stories worth reading, stories that can help someone trust in the Lord again.
                </p>
                <Link href="/books" className="btn-primary mt-8 w-full max-w-xs sm:text-lg">View More</Link>
              </div>
            </div>
          </article>

          {/* Book card: edge-to-edge book image with matching text layout */}
          <article className="grid overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium lg:grid-cols-[34%_66%]">
            <div className="relative aspect-square w-full lg:aspect-auto lg:min-h-[24rem]">
              <Image
                src="/books/in-the-arms-of-faith-book-cover.png"
                alt="In the Arms of Faith by James M. David"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 392px, 100vw"
              />
            </div>
            <div className="flex items-center px-8 py-10 sm:px-12 sm:py-12 lg:px-14">
              <div className="text-left">
                <p className="text-2xl font-bold leading-tight text-primary sm:text-3xl">
                  When faith becomes more than belief, it becomes a journey.
                </p>
                <p className="mt-6 max-w-3xl text-lg leading-[1.9] text-primary/70">
                  <em>In the Arms of Faith</em> traces James&apos;s journey of discovering biblical truth and following God&apos;s leading through education, ministry, and mission. Each chapter invites readers to reflect through personal questions, practical application, and prayer.
                </p>
                <a href="https://www.amazon.com/Arms-Faith-James-Maangi-David/dp/B0FY5MRHF3" target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full max-w-xs sm:text-lg">View the Book on Amazon</a>
              </div>
            </div>
          </article>
        </div>
      </SectionWrapper>

      {/* Speaking and Ministry CTA */}
      <section className="bg-light px-6 py-20 text-center text-primary">
        <div className="mx-auto max-w-3xl">
          <HeartHandshake className="mx-auto h-11 w-11 text-accent" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-accent">Speaking &amp; Ministry</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl"> You may invite James</h2>
          <p className="mt-5 leading-8 text-primary/75">James is available for sermons, weeks of prayer, youth programs, Bible teaching, digital-ministry training, and creative communication projects.</p>
          <p className="mt-5 text-lg font-bold text-accent">Faithfully sharing the truth | Creatively serving people.</p>
          <Link href="/contact" className="btn-primary mt-8">Invite James</Link>
        </div>
      </section>
    </>
  );
}
