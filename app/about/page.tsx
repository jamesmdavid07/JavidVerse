import Image from "next/image";
import {
  BookOpen,
  GraduationCap,
  HeartHandshake,
  Mic2,
  Users,
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata = {
  title: "About James M. David — Faith, Mission & Creativity",
  description:
    "James Maangi David is a theology student, digital missionary, educator, author, designer, and creative communicator.",
};

const introSnapshots = [
  {
    label: "Faith",
    src: "/james.jpg",
    alt: "Portrait of James Maangi David",
    position: "center",
  },
  {
    label: "Technology",
    src: "/diploma-in-IT.jpg",
    alt: "James studying information technology",
    position: "center 35%",
  },
  {
    label: "Teaching",
    src: "/kitui-teachers-college.jpg",
    alt: "James with students in a classroom",
    position: "center",
  },
  {
    label: "Ministry",
    src: "/me-preaching.png",
    alt: "James preaching during a ministry engagement",
    position: "center 22%",
  },
];

const faithJourney = [
  {
    year: "2015",
    title: "First Truth Encounter",
    image: "/following-truth.png",
    alt: "James at a Seventh-day Adventist church sign",
    position: "center",
    text: "After discovering the biblical Sabbath through Bible study, James embraced the truth despite significant opposition. Choosing the truth brought criticism from friends and classmates and rejection from family members, yet he remained committed, often walking nearly 20 kilometers every Sabbath to worship with a small Seventh-day Adventist congregation. This experience strengthened his conviction, perseverance, and commitment to biblical faith.",
  },
  {
    year: "February 2019",
    title: "Following the Truth",
    image: "/Baptism-and-new-life.jpg",
    alt: "Baptism service in a river",
    position: "center",
    text: "Following his baptism, James committed his life fully to Christ and sensed a clear calling to teach, preach, and prepare for gospel ministry. This decision became the foundation of his theological education, evangelistic work, youth leadership, and lifelong commitment to sharing God’s Word.",
  },
  {
    year: "2018",
    title: "A Church Begins Under a Tree",
    image: "/church-under-tree.jpg",
    alt: "Small Sabbath School gathering under a tree in Yongela",
    position: "center",
    text: "In Yongela, a small Sabbath School began under a tree at the village market. A few believers gathered to sing, study the Bible, pray, and encourage one another. What started humbly under a tree became a testimony of faith, sacrifice, and God’s leading.",
  },
  {
    year: "Yongela",
    title: "A Church Is Rising",
    image: "/new-church.jpg",
    alt: "Completed Seventh-day Adventist church building in Yongela",
    position: "center top",
    text: "Maranatha International has completed the church building in Yongela. What began under a tree now stands as a testimony of God’s faithfulness to the people of Yongela.",
  },
];

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
      <section className="relative overflow-hidden bg-primary px-6 py-20 text-light sm:px-8 lg:py-28">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-48 -left-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-accent">About James M. David</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">My Story: Faith, Mission &amp; Creativity</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-light/80">Faith, theology, education, technology, and creative communication united in Christ-centered service.</p>
        </div>
      </section>

      <SectionWrapper title="A life shaped for service" subtitle="Faith, theology, mission, teaching, technology, and creativity are not separate identities to me—they are tools placed in the same hands for one purpose.">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-primary shadow-premium">
            <Image src="/james.jpg" alt="James Maangi David" fill priority className="object-cover object-center" sizes="(min-width: 1024px) 42vw, 100vw" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/85 to-transparent p-8 pt-28 text-light">
              <h2 className="text-3xl font-bold">James Maangi David</h2>
              <p className="mt-2 text-sm text-light/80">Founder of JavidVerse · Theology student · Missionary · Author</p>
            </div>
          </div>
          <div className="space-y-5 text-base leading-8 text-primary/75">
            <p>I am James Maangi David, a theology student, digital missionary, educator, author, designer, and creative communicator committed to using faith, technology, and media to serve God and people with excellence. My passion is communicating truth through teaching, preaching, writing, design, and digital ministry—helping individuals understand God&apos;s Word with clarity and purpose. Currently pursuing a Bachelor of Arts in Theology at <strong className="text-primary">Mountain View College</strong> in the Philippines, I continue to combine ministry, education, and creative media through JavidVerse, a platform dedicated to meaningful communication, digital mission, and Christ-centered service.</p>
            <blockquote className="rounded-r-2xl border-l-4 border-accent bg-slate-50 p-6 text-xl font-bold leading-8 text-primary">Behind every design is a purpose. Behind every project is a story worth telling.</blockquote>
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

      <SectionWrapper title="My journey of faith" subtitle="One testimony, one conviction, and one long walk redirected my life." className="bg-slate-50">
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

      <SectionWrapper title="Education and preparation" subtitle="Technology formed my practical foundation; teaching sharpened my service; theology continues to form my calling.">
        <div className="grid gap-7 lg:grid-cols-3">
          <article className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
            <StoryImage src="/kitui-teachers-college.jpg" alt="James with students during classroom teaching experience" position="center" />
            <div className="p-8">
              <Users className="h-9 w-9 text-accent" />
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-accent">2019 · Kenya</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Teaching Course</h3>
              <p className="mt-1 font-semibold text-primary/60">Kitui Teachers&apos; Training College</p>
              <p className="mt-4 leading-8 text-primary/70">James pursued teacher education at Kitui Teachers&apos; Training College and gained practical classroom experience by teaching in several schools. This training strengthened his patience, communication, and ability to guide learners with care.</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-[2rem] bg-primary text-light shadow-premium">
            <StoryImage src="/diploma-in-IT.jpg" alt="James studying information technology" position="center 35%" />
            <div className="p-8">
              <GraduationCap className="h-9 w-9 text-accent" />
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-accent">2019–2021 · Kenya</p>
              <h3 className="mt-2 text-2xl font-bold">Diploma in Information Technology</h3>
              <p className="mt-4 leading-8 text-light/75">At Wote Technical Training Institute, I studied programming, object-oriented programming, web development, operating systems, databases, and systems analysis and design. The training built a foundation in technology and problem-solving.</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
            <StoryImage src="/theology-mvc.jpeg" alt="James at Mountain View College in the Philippines" position="center 30%" />
            <div className="p-8">
              <BookOpen className="h-9 w-9 text-accent" />
              <p className="mt-5 text-sm font-bold uppercase tracking-widest text-accent">2023–Present · Philippines</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Bachelor of Arts in Theology</h3>
              <p className="mt-1 font-semibold text-primary/60">Mountain View College</p>
              <p className="mt-4 leading-8 text-primary/70">A scholarship from the Southern Asia-Pacific Division opened the way to Mountain View College. Through study, preaching, evangelism, youth leadership, literature ministry, and church service, this chapter is shaping James as a pastor, missionary, and creative servant of God.</p>
            </div>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Missionary Experience" subtitle="Sharing Christ through digital ministry, evangelism, education, media, and global mission." className="bg-slate-50">
        <div className="mx-auto grid max-w-6xl gap-7 md:grid-cols-2 lg:grid-cols-6">
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-2">
            <StoryImage src="/online-ministry.jpg" alt="James creating gospel-centered online ministry content" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Online Ministry</h3>
              <p className="mt-4 leading-8 text-primary/70">James led online Bible studies, prayed with people from different countries, connected seekers to local churches, managed ministry social media pages, responded to comments and messages, and created gospel-centered content. Behind every message was a soul searching for Christ.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-2">
            <StoryImage src="/out-reach-evangelism.jpg" alt="James participating in church outreach and evangelism" className="aspect-[16/9]" position="center 35%" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Outreach &amp; Evangelism</h3>
              <p className="mt-4 leading-8 text-primary/70">James participated in evangelistic crusades, public evangelism programs, planning, preaching, community ministry, care groups, and church visitation. Through fellowship groups and church visits in barangays, he helped nurture spiritual growth, build friendships, and share the hope found in Jesus Christ.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-2">
            <div className="grid aspect-[16/9] grid-cols-2 overflow-hidden bg-primary">
              <div className="relative overflow-hidden">
                <Image src="/Davao.png" alt="James leading youth training in Davao" fill className="object-cover transition duration-700 hover:scale-105" style={{ objectPosition: "center 30%" }} sizes="(min-width: 1024px) 16vw, 50vw" />
              </div>
              <div className="relative overflow-hidden">
                <Image src="/Butuan.jpg" alt="James leading digital evangelism training in Butuan" fill className="object-cover transition duration-700 hover:scale-105" style={{ objectPosition: "center 30%" }} sizes="(min-width: 1024px) 16vw, 50vw" />
              </div>
            </div>
            <div className="flex-1 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Davao &amp; Butuan</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Youth Training</h3>
              <p className="mt-4 leading-8 text-primary/70">James participated in youth training programs in Davao and Butuan, helping equip young people for leadership, discipleship, service, and active involvement in ministry.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-3">
            <StoryImage src="/Takeo-school.jpg" alt="James with students at Takeo Adventist School in Cambodia" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">June 2025</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Mission Trip: Cambodia</h3>
              <p className="mt-4 leading-8 text-primary/70">During his mission trip to Cambodia, James taught English and Biblical Studies at Takeo Adventist School to Grades 4, 5, 6, and 11. Building relationships and nurturing faith in young minds was both humbling and impactful.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-premium lg:col-span-3">
            <StoryImage src="/online-ministry.jpg" alt="James editing content for digital ministry production" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">MVC Media Ministry</h3>
              <p className="mt-4 leading-8 text-primary/70">James serves with the MVC Media Center, editing videos, producing content for InVerse Philippines and the GluTeen Podcast, and helping with church livestreams and digital ministry production.</p>
            </div>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Ministry Leadership & Formation" subtitle="Prepared through leadership training, evangelistic field work, literature ministry, preaching, and campus service." className="bg-primary" titleClass="text-white" subtitleClass="text-white/70">
        <div className="mx-auto grid max-w-5xl gap-7 md:grid-cols-2">
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium">
            <StoryImage src="/youth-leadership.png" alt="James after Master Guide and Senior Youth Leader investiture" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Master Guide &amp; Senior Youth Leader</p>
              <h3 className="mt-2 text-2xl font-bold text-primary">Leadership</h3>
              <p className="mt-4 leading-8 text-primary/70">James completed his Master Guide and Senior Youth Leader training and was officially invested. These roles prepared him for mentoring, organizing programs, and guiding young people in spiritual growth.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium">
            <StoryImage src="/out-reach-evangelism.jpg" alt="James serving during an evangelistic ministry program" className="aspect-[16/9]" position="center 35%" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Evangelistic Ministry</h3>
              <p className="mt-4 leading-8 text-primary/70">As part of his theological field training, James served as an evangelist at Dologon SDA Church from 2023 to 2024, as a student church pastor at Cabanglasan SDA Church from 2024 to 2025, and in Field School training at Molave City from April to May 2026. He also participated in public crusades and campus worship programs.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium">
            <StoryImage src="/in the arms of faith book cover page.png" alt="A truth-filled book used to represent literature ministry" className="aspect-[16/9]" position="center" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Literature Evangelism</h3>
              <p className="mt-4 leading-8 text-primary/70">Alongside his studies, James engaged in literature evangelism, sharing truth-filled books with people and gaining valuable experience in mission work, personal witnessing, and soul-winning.</p>
            </div>
          </article>
          <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white shadow-premium">
            <StoryImage src="/me-preaching.png" alt="James preaching during a ministry engagement" className="aspect-[16/9]" position="center 22%" />
            <div className="flex-1 p-8">
              <h3 className="text-2xl font-bold text-primary">Preaching Engagements</h3>
              <p className="mt-4 leading-8 text-primary/70">James has been invited to preach in churches, youth fellowships, evangelistic events, and campus worship programs. He also receives online invitations to share devotions, sermons, Bible studies, and testimonies with youth groups and churches across regions. Digital platforms have expanded the reach of God’s Word beyond borders.</p>
            </div>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Books & Publications" subtitle="A testimony shaped into a book that invites readers to reflect, pray, and grow.">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium lg:grid-cols-[0.65fr_1.35fr]">
          <div className="relative min-h-80 overflow-hidden bg-primary">
            <Image src="/in the arms of faith book cover page.png" alt="In the Arms of Faith by James M. David" fill className="object-cover object-center transition duration-700 hover:scale-105" sizes="(min-width: 1024px) 35vw, 100vw" />
          </div>
          <div className="p-8 sm:p-10"><p className="text-xl font-bold text-primary">When faith becomes more than belief, it becomes a journey.</p><p className="mt-5 leading-8 text-primary/70">From a humble village in Eastern Kenya to classrooms, pulpits, and mission fields, the book traces a true story of discovery, rejection, redemption, and revival. Each chapter closes with reflection, personal questions, practical application, and prayer.</p><a href="https://www.amazon.com/Arms-Faith-James-Maangi-David/dp/B0FY5MRHF3" target="_blank" rel="noreferrer" className="btn-primary mt-7">View the Book on Amazon</a></div>
        </div>
      </SectionWrapper>

      <section className="bg-primary px-6 py-20 text-center text-light">
        <div className="mx-auto max-w-3xl">
          <HeartHandshake className="mx-auto h-11 w-11 text-accent" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.24em] text-accent">Speaking &amp; Ministry</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Invite James to serve your community.</h2>
          <p className="mt-5 leading-8 text-light/75">Beyond ministry and studies, I have worked as a freelancer in book services, web design, graphic design, and videography. I am committed to helping individuals, ministries, schools, and organizations communicate clearly, build meaningful projects, and attain their goals with excellence and purpose.</p>
          <p className="mt-5 text-lg font-bold text-accent">Using technology, creativity, and faith to serve God and people.</p>
          <a href="/contact" className="btn-primary mt-8">Connect with James</a>
        </div>
      </section>
    </>
  );
}
