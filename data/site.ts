export const profile = {
  name: "Michael Zhan",
  initials: "MZ",
  // eyebrow that runs above the hero headline
  roles: ["Software engineer", "GTM strategist", "Photographer"],
  // location: resume header says NYC; zip 90025 is LA: confirm.
  location: "New York City",
  currentCompany: "aimnow.ai",
  headline: ["I build products and bring them to", "market."],
  blurb:
    "These days I build voice AI agents at aimnow.ai. Before that I shipped investor-ready MVPs for a private equity firm and built go-to-market systems for consulting clients. I do my best work owning a product from idea to real users. Off the clock, I'm usually behind a camera.",
  email: "mikezhan8@gmail.com",
  resume: "/Michael-Zhan-Resume.pdf",
  available: "Open to new opportunities & freelance",
  socials: {
    github: "https://github.com/mikezhan88",
    linkedin: "https://www.linkedin.com/in/michael-zhan-a437131b6/",
    instagram: "https://www.instagram.com/mikezhan88",
  },
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  blurb: string;
  stack: string[];
  current?: boolean;
};

export const experience: Experience[] = [
  {
    company: "aimnow.ai",
    role: "Software Engineer",
    period: "May 2026 - Present",
    current: true,
    blurb:
      "Building voice AI agents from the ground up. I integrate the speech and language models they run on, ship new capabilities into the product, and keep the backend fast and reliable as it scales.",
    stack: ["C++", "Python", "JavaScript", "SQL", "Postgres", "LLMs"],
  },
  {
    company: "Tide Rock",
    role: "Software Engineer",
    period: "Aug 2025 - May 2026",
    location: "San Diego, CA",
    blurb:
      "Built and launched full-stack MVPs that were demoed live to clients and investors, then kept iterating on the ones that showed promise. The best went on to produce real revenue and cost savings for the firm's portfolio companies.",
    stack: ["AWS", "Snowflake", "TypeScript", "Python", "CI/CD"],
  },
  {
    company: "Blue Modern Advisory",
    role: "GTM Engineer",
    period: "2023 - Aug 2025",
    location: "Los Angeles, CA",
    blurb:
      "Built automated go-to-market systems for clients, from lead signals and triggers to TAM mapping and personalized outreach campaigns. Added AI reporting that cut manual work in half, and shipped the firm's marketing site.",
    stack: ["Clay", "n8n", "Claude", "AWS Bedrock", "Supabase", "React"],
  },
];

export const education = {
  school: "University of California, Los Angeles",
  degree: "B.S. Computer Science",
  period: "2023",
  detail: "GPA 3.7 · Dean's List Honors",
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  image: string;
  demo?: string;
  repo?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "findgolfgames",
    title: "FindGolfGames",
    year: "2026",
    featured: true,
    summary:
      "A platform for finding and posting local golf tournaments, built for a client. Golfers search by location and format; organizers post events and build a community around them.",
    stack: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    image: "/findgolfgames.png",
    live: "https://www.findgolfgames.com",
  },
  {
    slug: "ai-job-board",
    title: "AI Job Board",
    year: "2025",
    featured: true,
    summary:
      "A job board that matches people to roles on meaning instead of keywords, with automated applicant ranking and a proper set of employer tools.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Claude", "Gemini", "Drizzle", "Clerk", "Inngest"],
    image: "/a1.png",
    demo: "https://www.youtube.com/watch?v=Kq45KaiG-U0",
    repo: "https://github.com/mikezhan88/ai-job-board",
  },
  {
    slug: "liftid",
    title: "LiftID",
    year: "2025",
    featured: true,
    summary:
      "Point your camera at any gym machine and get instant how-to guidance, powered by a custom image-recognition model.",
    stack: ["React Native", "Vertex AI", "Supabase", "Expo"],
    image: "/lcp.jpg",
    demo: "https://www.youtube.com/shorts/J6G87lAIevc",
    repo: "https://github.com/mikezhan88/LiftID",
  },
  {
    slug: "voluntr",
    title: "Voluntr",
    year: "2025",
    featured: true,
    summary:
      "An app for finding volunteer events and causes near you, with a social side that keeps people coming back.",
    stack: ["React Native", "Supabase", "Expo", "TypeScript"],
    image: "/vcp.jpg",
    demo: "https://www.youtube.com/shorts/QcLcuYFXQx4",
  },
  {
    slug: "neuron",
    title: "Neuron",
    year: "2023",
    featured: true,
    summary:
      "A web app and marketing site that turn raw brainwave data into plain-language reports on focus and well-being at work.",
    stack: ["React", "Python", "Google Cloud", "TypeScript"],
    image: "/n1.png",
    live: "https://www.neuroncognition.com",
  },
  {
    slug: "blue-modern-advisory",
    title: "Blue Modern Advisory",
    year: "2024",
    summary:
      "A site for a career & GTM consulting firm, backed by an AI-assisted reporting and forecasting workflow.",
    stack: ["React", "Tailwind", "Framer", "Supabase"],
    image: "/bma1.png",
    live: "https://bluemodernadvisory.com",
  },
  {
    slug: "rate-my-club",
    title: "Rate My Club",
    year: "2023",
    summary: 'A full-stack "Rate My Professor", but for campus clubs and events.',
    stack: ["React", "FastAPI", "MongoDB", "Node.js"],
    image: "/club.png",
    repo: "https://github.com/mikezhan88/Rate-My-Club",
  },
];

export type CaseStudy = {
  slug: string;
  // links back to the matching experience entry by company name
  company: string;
  role: string;
  period: string;
  // mono eyebrow tag, e.g. "Current role · Under NDA"
  tag: string;
  // display headline; accent is rendered in italic at the end
  title: string;
  accent: string;
  // lede paragraph
  summary: string;
  nda?: boolean;
  sections: { n: string; title: string; body: string }[];
  contributions: string[];
  stack: string[];
};

// Anonymized case studies for NDA work. No client names, no proprietary
// detail, no real screenshots. Metrics left as bracketed placeholders until
// cleared, since nothing here is invented.
export const caseStudies: CaseStudy[] = [
  {
    slug: "voice-ai-agents",
    company: "aimnow.ai",
    role: "Software Engineer",
    period: "May 2026 - Present",
    tag: "Current role · Under NDA",
    title: "Voice AI agents, built from the",
    accent: "ground up.",
    summary:
      "I work on voice AI agents that hold real, spoken conversations. The work runs from the models the agents are built on to the backend that keeps them responsive under load. Details here are kept general to respect an NDA.",
    nda: true,
    sections: [
      {
        n: "01",
        title: "The problem",
        body: "A voice agent has to listen, think, and reply fast enough that the conversation still feels natural. That means stitching speech recognition, a language model, and speech synthesis into one path without adding the kind of delay a caller would notice.",
      },
      {
        n: "02",
        title: "What I do",
        body: "I integrate the speech and language models the agents run on, then build product features on top of them. A lot of the day to day is keeping the path from audio in to audio out tight, and making the backend hold up as traffic grows.",
      },
      {
        n: "03",
        title: "The outcome",
        body: "The agents handle live conversations in production. The work has stayed focused on keeping responses quick enough that the conversation feels natural, and the backend steady as more people use it.",
      },
    ],
    contributions: [
      "Integrate speech-to-text, language, and text-to-speech models into one real-time pipeline",
      "Ship new agent capabilities into the product",
      "Keep the backend fast and reliable as usage scales",
    ],
    stack: ["C++", "Python", "JavaScript", "SQL", "Postgres", "LLMs"],
  },
  {
    slug: "portfolio-mvps",
    company: "Tide Rock",
    role: "Software Engineer",
    period: "Aug 2025 - May 2026",
    tag: "Under NDA",
    title: "Turning ideas into demo-ready",
    accent: "products.",
    summary:
      "I built and launched full-stack MVPs for a private-equity firm, the kind used to test an idea in front of clients and investors before committing to it. Company names and specifics are left out under NDA.",
    nda: true,
    sections: [
      {
        n: "01",
        title: "The problem",
        body: "The firm needed working products fast, not slide decks. Each one had to be solid enough to put in front of clients and investors on a fixed date, then ready to build on if the idea got traction.",
      },
      {
        n: "02",
        title: "What I built",
        body: "I built each MVP end to end, front end through API, then stood up the deployment and data pipelines behind it so it could run reliably for a live demo. Along the way I delivered more than ten authenticated API endpoints. The ones that showed promise I kept iterating on, taking a product from zero to one and then from one to a hundred.",
      },
      {
        n: "03",
        title: "The outcome",
        body: "Each build shipped in time for its demo and held up in front of a live audience. The ones that proved out went on to deliver real value to the portfolio companies, producing revenue or cutting costs, and several were solid enough to raise on.",
      },
    ],
    contributions: [
      "Built and launched full-stack MVPs for live client and investor demos",
      "Delivered 10+ authenticated API endpoints",
      "Stood up the deployment and data pipelines behind each build",
      "Iterated on the builds that proved out, taking products from zero to one and one to a hundred",
    ],
    stack: ["AWS", "Snowflake", "TypeScript", "Python", "CI/CD"],
  },
];

export type Capability = {
  tag: string;
  title: string;
  body: string;
  items: string[];
};

export const capabilities: Capability[] = [
  {
    tag: "01 · Engineering",
    title: "Build the product",
    body: "I take products from the data model up through the interface, then keep them fast as real users arrive.",
    items: ["Next.js", "TypeScript", "Python", "Postgres", "APIs"],
  },
  {
    tag: "02 · Go-to-market",
    title: "Take it to market",
    body: "I set up the systems that get a product in front of the right people. Lead signals, automation, and outreach that turn a launch into real conversations.",
    items: ["Clay", "n8n", "Automation", "Analytics"],
  },
  {
    tag: "03 · Design & content",
    title: "Make it feel real",
    body: "I handle the parts that make a product land. The site, the brand, and the photo and video around it.",
    items: ["Figma", "Photography", "Video", "Brand"],
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "C", "Go", "Java"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Flask", "Django"] },
  { group: "Databases & data", items: ["PostgreSQL", "Supabase", "MongoDB", "Drizzle ORM", "Snowflake", "dbt"] },
  { group: "AI", items: ["Claude", "Gemini", "Vertex AI"] },
  { group: "Cloud & DevOps", items: ["AWS", "GCP", "Vercel", "Docker", "Kubernetes", "Jest"] },
  { group: "GTM & automation", items: ["Clay", "n8n", "Google Analytics"] },
  { group: "Design & content", items: ["Figma", "Framer", "Canva", "CapCut"] },
];

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/photography" },
  { label: "Contact", href: "/#contact" },
];
