export const profile = {
  name: "Michael Zhan",
  initials: "MZ",
  // eyebrow that runs above the hero headline
  roles: ["Software engineer", "GTM strategist", "Photographer"],
  // location: resume header says NYC; zip 90025 is LA — confirm.
  location: "New York City",
  currentCompany: "aimnow.ai",
  headline: ["I build products and bring them to", "market."],
  blurb:
    "I'm a full-stack engineer and go-to-market strategist who likes owning the whole path, from first commit to first customer. I build the product and the system that takes it to market. Off the clock, I'm usually behind a camera.",
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
      "Built and launched full-stack MVPs for live client and investor demos, then stood up the deployment and data pipelines behind them. Delivered 10+ authenticated API endpoints in the process.",
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
      "A platform for finding and posting local golf tournaments, built for a client. Players search by location and format, organizers post events, and the community connects through discussions.",
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
      "An AI-powered job board with semantic matching, automated applicant ranking, and a full suite of employer tooling.",
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
      "A social-impact app that connects volunteers with causes through event discovery, social networking, and gamified achievement tracking.",
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
      "A web app and marketing site turning brainwave data into actionable workplace productivity and well-being insights.",
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
