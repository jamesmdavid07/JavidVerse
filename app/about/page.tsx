import Link from "next/link";
import Image from "next/image";
import { BookOpen, Camera, Church, Code2, Globe2, HeartHandshake, Mic2, Radio, Users } from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

export const metadata = {
  title: "James M. David — Ministry Story & Creative Portfolio",
  description: "The faith, ministry, media, theology, and creative journey of James M. David, founder of Javid Verse."
};

const journey = [
  { year: "2015", title: "A conviction begins", text: "James first heard the Sabbath truth through an uncle whose own conversion began through Wikwatyo FM, an Adventist radio station. The testimony awakened questions and a conviction he could not ignore." },
  { year: "2018", title: "A church begins under a tree", text: "In Yongela, James helped begin a small Sabbath school. The first gathering was simply a few believers singing and studying the Bible beneath a tree at the village market. Brothers, cousins, neighbors, and friends gradually joined." },
  { year: "2019", title: "A public commitment of faith", text: "After walking about 20 kilometers on Sabbaths to worship and persevering through criticism and family rejection, James was baptized into the Seventh-day Adventist Church while in college." },
  { year: "2022–2023", title: "Digital missionary in the Philippines", text: "Through Adventist Volunteer Services and VividFaith, James left Kenya to serve with Adventist World Radio’s Center for Digital Evangelism in Silang, Cavite. He led online Bible studies, prayed with people across countries, managed gospel-centered social media, and connected seekers with local churches." },
  { year: "2023–Present", title: "Theology, leadership, and media ministry", text: "A scholarship from the Southern Asia-Pacific Division opened the way to study for a Bachelor of Arts in Theology at Mountain View College. Alongside his studies, James serves in preaching, youth leadership, media production, literature evangelism, and church ministry." },
  { year: "2025", title: "Mission across cultures", text: "During a mission trip to Cambodia, James taught English and Biblical Studies to students in Grades 4, 5, 6, and 11, and shared messages in school worships and community churches." }
];

const ministry = [
  { icon: Radio, title: "Digital Evangelism", text: "Online Bible studies, contact connection ministry, social media outreach, prayer, and digital follow-up through Adventist World Radio’s Center for Digital Evangelism." },
  { icon: Mic2, title: "Preaching & Outreach", text: "Public evangelism, church and campus worship, care groups, visitation, literature evangelism, and speaking appointments for churches and youth groups." },
  { icon: Users, title: "Youth Leadership", text: "Master Guide and Senior Youth Leader training, with experience mentoring, organizing programs, and guiding young people in spiritual growth." },
  { icon: Camera, title: "Media Ministry", text: "Service with the MVC Media Center, including editing for InVerse Philippines and the GluTeen Podcast and supporting church livestream productions." }
];

export default function AboutPage() {
  return <>
    <section className="bg-primary px-6 py-16 text-center text-light sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-accent">About James M. David</p>
        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">My Story: Faith, Mission &amp; Creativity</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-light/75 sm:text-lg">From a village in Kenya to ministry, theology, and digital media work in the Philippines.</p>
      </div>
    </section>

    <SectionWrapper title="I am James M. David" subtitle="Founder of Javid Verse · Theology student · Digital missionary · Creative media producer">
      <div className="grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-primary shadow-premium">
          <Image src="/james.jpg" alt="James M. David" fill priority className="object-cover object-center" sizes="(min-width: 1024px) 40vw, 100vw" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/80 to-transparent p-8 pt-24 text-light"><h2 className="text-3xl font-bold">James M. David</h2><p className="mt-3 text-sm leading-7 text-light/80">Kenyan theology student at Mountain View College in the Philippines</p></div>
        </div>
        <div className="flex flex-col justify-center space-y-5 text-base leading-8 text-primary/75">
          <p>I was born and raised in Yongela, a small village in Kitui County, Eastern Kenya, in a family of seven children. There were few Adventist churches around us, but God used one testimony, a long walk of faith, and a small worship group under a tree to redirect my life.</p>
          <p>Today, I am a fourth-year Bachelor of Arts in Theology student at Mountain View College in the Philippines. I am also a digital missionary, youth leader, evangelist, front-end developer, designer, and media producer. These are not separate identities to me. They are different tools placed in the same hands for the same purpose: serving God and people.</p>
          <p>Javid Verse grew from that conviction. It is where theology, technology, storytelling, and design meet—helping ministries, authors, organizations, businesses, and individuals communicate worthwhile ideas with clarity and excellence.</p>
          <blockquote className="border-l-4 border-accent pl-6 text-xl font-bold leading-8 text-primary">Behind every design is a purpose. Behind every project is a story worth telling.</blockquote>
        </div>
      </div>
    </SectionWrapper>

    <SectionWrapper title="The journey of faith" subtitle="A story of conviction, service, preparation, and learning to follow where God leads." className="bg-slate-50">
      <div className="relative mx-auto max-w-5xl space-y-6 before:absolute before:bottom-4 before:left-5 before:top-4 before:w-px before:bg-accent/50 md:before:left-1/2">
        {journey.map((item, index) => <article key={item.year} className={`relative grid md:grid-cols-2 ${index % 2 ? "md:[&>div]:col-start-2 md:[&>div]:ml-10" : "md:[&>div]:mr-10"}`}>
          <span className="absolute left-3 top-8 z-10 h-4 w-4 rounded-full bg-accent ring-4 ring-white md:left-1/2 md:-translate-x-1/2" />
          <div className="ml-12 overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-sm md:ml-0">
            <div className="p-7 pb-5"><p className="text-sm font-bold uppercase tracking-widest text-accent">{item.year}</p><h3 className="mt-2 text-xl font-bold text-primary">{item.title}</h3></div>
            {/* TODO: Replace with a photograph from this year or ministry milestone. */}
            <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary to-blue-800 p-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-light/80">Journey photo placeholder</div>
            <p className="p-7 text-sm leading-7 text-primary/70">{item.text}</p>
          </div>
        </article>)}
      </div>
    </SectionWrapper>

    <SectionWrapper title="Ministry in practice" subtitle="Faith expressed through relationships, communication, training, and service.">
      <div className="grid gap-6 md:grid-cols-2">{ministry.map(item => <article key={item.title} className="overflow-hidden rounded-[2rem] border border-primary/15 bg-white shadow-premium">
        {/* TODO: Replace with a real photograph showing this ministry area. */}
        <div className="flex aspect-[16/8] items-center justify-center bg-gradient-to-br from-primary to-blue-800 p-6"><div className="text-center"><item.icon className="mx-auto h-8 w-8 text-accent"/><p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-light/80">Ministry photo placeholder</p></div></div>
        <div className="p-8"><h3 className="text-xl font-bold text-primary">{item.title}</h3><p className="mt-3 text-sm leading-7 text-primary/70">{item.text}</p></div>
      </article>)}</div>
      <div className="mt-8 rounded-[2rem] bg-primary p-8 text-light sm:p-10"><h3 className="text-2xl font-bold">Digital evangelism training</h3><p className="mt-4 max-w-4xl leading-8 text-light/75">In Butuan City and Davao Mission, James helped train young people and church leaders to use social media as a tool for the gospel—not simply for consumption. Sessions focused on meaningful online conversations, gospel-centered content, connecting seekers to Bible studies, and responsible digital mission.</p></div>
    </SectionWrapper>

    <SectionWrapper title="The work I carry forward" subtitle="A combination of ministry formation and practical creative skill.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[{icon:Church,title:"Theology & Ministry",text:"Preaching, Biblical studies, evangelism, discipleship, and church service."},{icon:Code2,title:"Web Development",text:"HTML, CSS, Tailwind CSS, React-style projects, WordPress, and deployment."},{icon:BookOpen,title:"Publishing & Design",text:"Book formatting, covers, visual identity, print materials, and communication."},{icon:Globe2,title:"Digital Media",text:"Video editing, livestreams, podcasts, social media, and online mission."}].map(item => <article key={item.title} className="rounded-2xl border border-primary/15 p-6"><item.icon className="h-7 w-7 text-accent"/><h3 className="mt-4 font-bold text-primary">{item.title}</h3><p className="mt-3 text-sm leading-6 text-primary/70">{item.text}</p></article>)}
      </div>
    </SectionWrapper>

    <section className="bg-primary px-6 py-20 text-center text-light"><div className="mx-auto max-w-3xl"><HeartHandshake className="mx-auto h-10 w-10 text-accent"/><h2 className="mt-5 text-3xl font-bold sm:text-4xl">This story is still being written.</h2><p className="mt-5 leading-8 text-light/75">I hope to keep growing as a pastor, missionary, communicator, and creative professional—using every skill God provides to strengthen the church and serve people well.</p><div className="mt-8 flex flex-wrap justify-center gap-4"><a href="https://sites.google.com/view/jamesbyfaith/home" target="_blank" rel="noreferrer" className="btn-primary">Visit the Ministry Archive</a><a href="https://jamesmdavid.vercel.app/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-primary">View Personal Portfolio</a><Link href="/contact" className="inline-flex items-center justify-center rounded-lg border-2 border-accent px-8 py-3 font-semibold text-accent transition hover:bg-accent hover:text-primary">Work With Me</Link></div></div></section>
  </>;
}
