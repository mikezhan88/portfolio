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
    "Full-stack engineer building voice-AI agents at aimnow.ai — working across C++, Python, JavaScript, and SQL. I've shipped products from MVP to go-to-market. Off the clock, I shoot photo and video.",
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
    period: "2025 — Present",
    current: true,
    blurb:
      "Building voice-AI agents end to end — integrating TTS, STT, and LLM providers and models, shipping dashboard UI/UX and new features, and handling backend work in Postgres.",
    stack: ["C++", "Python", "JavaScript", "SQL", "Postgres", "LLMs"],
  },
  {
    company: "Tide Rock",
    role: "Software Engineer",
    period: "2025",
    location: "San Diego, CA",
    blurb:
      "Built and deployed full-stack MVPs (AWS, Snowflake, TypeScript, Python) for live client and investor demos. Stood up CI/CD and scalable deploys, engineered data pipelines into Snowflake, and shipped 10+ authenticated REST endpoints.",
    stack: ["AWS", "Snowflake", "TypeScript", "Python", "CI/CD"],
  },
  {
    company: "Stacked",
    role: "GTM Engineer",
    period: "Jan — Jun 2025",
    location: "Los Angeles, CA",
    blurb:
      "Owned messaging, pricing, and positioning that cut churn 20%. Ran data-driven campaigns and A/B tests that grew social following 150%, and built a KPI dashboard for outreach performance.",
    stack: ["GTM", "A/B testing", "Analytics", "Dashboards"],
  },
  {
    company: "Blue Modern Advisory",
    role: "Software Engineer",
    period: "Jun 2023 — Jan 2025",
    location: "Los Angeles, CA",
    blurb:
      "Built the firm's site (React, Tailwind, Framer) and prototyped GTM AI automation with AWS Bedrock and Lambda. Designed a Supabase backend and AI-driven reporting that cut manual effort 50%.",
    stack: ["React", "Tailwind", "AWS Bedrock", "Lambda", "Supabase"],
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
      "A social-impact app connecting volunteers with opportunities — event discovery, social networking, and gamified achievement tracking.",
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
  { group: "Languages", items: ["Python", "C++", "C", "JavaScript", "TypeScript", "SQL", "Go", "Java"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native", "Tailwind", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Flask", "Django", "PostgreSQL", "MongoDB", "Supabase"] },
  { group: "AI / ML", items: ["LLMs", "TTS / STT", "Claude", "Gemini", "Vertex AI", "AI integration"] },
  { group: "Infra & Data", items: ["AWS Lambda", "GCP", "Docker", "Kubernetes", "CI/CD", "Snowflake", "dbt"] },
];

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/photography" },
  { label: "Contact", href: "/#contact" },
];
