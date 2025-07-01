import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  ChevronDown,
  Calendar,
  MapPin,
  Heart,
  Code,
  Camera,
  Music,
  Plane,
  Mountain,
  Gamepad2,
  BookOpen,
  Crown,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ProjectsGallery from "./ProjectsGallery";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import BackgroundAnimation from "./bgAnimation/BackgroundAnimation";

const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    // Initialize theme on component mount
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Timeline data
  const timeline = [
    {
      title: "GTM Analyst",
      company: "Stacked",
      date: "January 2025 - June 2025",
      description:
        "Led go-to-market strategy by defining messaging, pricing, and campaign tactics that reduced churn by 20%. Built KPI dashboards, ran A/B tests, and scaled growth through data-driven marketing and strategic partnerships.",
    },
    {
      title: "Software Engineer",
      company: "Blue Modern Advisory",
      date: "June 2023 - January 2025",
      description:
        "Developed and launched a modern, responsive website for a career consulting firm, leveraging React, Tailwind, and WordPress. Managed the backend database and optimized international accessibility, helping attract global clients.",
    },
    {
      title: "Client Relationship Manager",
      company: "Omneky",
      date: "November 2020 - January 2021",
      description:
        "Managed B2B client relationships and led outbound prospecting efforts, leveraging CRM tools and marketing analytics to identify opportunities, personalize outreach, and drive customer engagement.",
    },
    {
      title: "Software Engineer Intern",
      company: "Eliqs",
      date: "June 2020 - September 2020",
      description:
        "Started my professional journey building a responsive website frmo scratch and learning modern development practices. Gained experience in React, JavaScript, GCP, and backend technologies.",
    },
    {
      title: "B.S. Computer Science",
      company: "University of California, Los Angeles (UCLA)",
      date: "September 2019 - June 2023",
      description:
        "Graduated with honors. Focused on software engineering, AI, Machine Learning, algorithms, and data structures. Joined ACM(CS org), DSP(Premier Business Fraternity), & Theta Chi(Social Fraternity), building a strong double foundation in computer science and business.",
    },
  ];

  const projects = [
    {
      id: "1",
      title: "Neuron",
      description: "A full-featured website and webapp for neurotech startup.",
      images: ["/n1.png", "/n2.png", "/n3.png"],
      category: "web",
      technologies: ["React", "Google Cloud", "Python", "HTML/CSS", "JavaScript", "TypeScript"],
      liveUrl: "https://www.neuroncognition.com",
      details: "Designed and built a web app and marketing site for a neurotech company that translates brainwave data into actionable insights on workplace productivity and employee well-being.",
    },
    {
      id: "2",
      title: "Blue Modern Advisory",
      description: "A full-featured website for career consulting and B2B GTM Strategy Startup",
      images: ["/bma1.png", "/bma2.png", "/bma3.png"],
      category: "web",
      technologies: ["React", "HTML/CSS", "Tailwind", "Framer", "TypeScript"],
      liveUrl: "https://bluemodernadvisory.com",
    },
    {
      id: "3",
      title: "LiftID",
      description: "Fitness App for helping users quickly understand different gym machine use using AI image recognition.",
      coverPhoto: "/lcp.jpg",
      images: ["/l1.PNG", "/l2.PNG", "/l3.PNG", "/l4.PNG", "/l5.PNG", "/l6.PNG"],
      category: "mobile",
      technologies: ["React Native", "Google Cloud", "Vertex AI", "Supabase", "Expo"],
      repoUrl: "https://github.com/mikezhan88/LiftID",
      demoUrl: "https://www.youtube.com/shorts/J6G87lAIevc",
    },
    {
      id: "4",
      title: "Rate-My-CLub",
      description: "Full-stack webapp that's a spoof off of rate my professor, but for clubs and events.",
      images: ["/club.png"],
      category: "web",
      technologies: ["MongoDB", "Fast API", "React", "Node JS", "HTML/CSS", "Python"],
      repoUrl: "https://github.com/mikezhan88/Rate-My-Club",
    },
    {
      id: "5",
      title: "Brewin-Language Interpreter",
      description: "Built a custom statically typed language interpreter in Python with support for expressions, lambdas, closures, parameter passing, and lexical scoping.",
      images: ["/brewin.jpeg"],
      category: "data",
      technologies: ["Python"],
      repoUrl: "https://github.com/mikezhan88/Brewin-Language-Interpreter",
    },
    {
      id: "6",
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with a modern, responsive design.",
      images: ["/port.png"],
      category: "web",
      technologies: ["React", "HTML/CSS", "Framer Motion", "Tailwind", "TypeScript"],
      liveUrl: "https://www.mike-zhan.com",
      repoUrl: "https://github.com/mikezhan88/portfolio",
    },
    {
      id: "7",
      title: "Voluntr",
      description: "full-stack social impact app that connects volunteers with meaningful opportunities, featuring event discovery, social networking, and achievement tracking to gamify and encourage community service participation.",
      coverPhoto: "/vcp.jpg",
      images: [ "/v1.jpg", "/v2.jpg", "/v3.jpg", "/v4.jpg", "/v5.jpg", "/v6.jpg", "/v7.jpg", "/v8.jpg", "/v9.jpg"], // You can replace this with actual project images
      category: "mobile",
      technologies: ["React Native", "TypeScript", "Supabase", "Expo", "Tailwind CSS", "Google Cloud"],
      details: "Full-stack e-commerce platform featuring product catalog, shopping cart, user authentication, payment processing with Stripe, and admin dashboard for inventory management.",
      demoUrl: "https://www.youtube.com/shorts/QcLcuYFXQx4",
    },
    {
      id: "8",
      title: "AI Job Board",
      description: "A modern, AI-powered job board web application built with Next.js 15, featuring intelligent job matching, automated applicant ranking, and comprehensive employer tools.",
      images: ["/a1.png", "a2.png", "a3.png", "a4.png", "a5.png", "a6.ong", "a7.png"], // You can replace this with actual project images
      category: "web",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Radix UI", "MDX Editor", "Drizzle ORM", "Inngest", "Clerk", "Uploadthing", "Anthropic Claude AI", "Google Gemini AI"],
      repoUrl: "http://github.com/mikezhan88/ai-job-board",
      demoUrl: "https://www.youtube.com/watch?v=Kq45KaiG-U0&t=2s&ab_channel=MichaelZhan",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-background ${theme === "dark" ? "dark" : ""}`}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Portfolio</div>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("journey")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Journey
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
              <Moon className="h-4 w-4" />
            </div>
            <Button variant="outline" className="md:hidden">
              Menu
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-32 pb-20 min-h-screen flex items-center bg-background relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <BackgroundAnimation />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20">
                <img
                  src="/pfp3.jpg"
                  alt="Profile Picture"
                  className="w-full h-full object-cover object-[center_top] scale-150 transition-transform duration-300"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Michael Zhan
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
              Software Engineer | GTM Strategist | Content Creator
            </h2>
            <p className="text-lg mb-10">
            Full-stack developer with a passion for building thoughtful, 
            user-focused digital products. With experience across startups and tech stacks, 
            I bring ideas to life through clean code, intuitive design, and practical 
            problem-solving.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={() => scrollToSection("projects")} size="lg">
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                size="lg"
              >
                Contact Me
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center mt-16"
          >
            <button
              onClick={() => scrollToSection("about")}
              className="animate-bounce p-3 rounded-full border-2 border-primary hover:border-primary/80 transition-colors"
            >
              <ChevronDown className="h-6 w-6 text-primary" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              About Me
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Profile Picture and Bio */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                  Hi! I'm Mike, a full-stack developer and GTM strategist passionate about building impactful digital products and bringing them to market. I earned my Computer Science degree from UCLA and have worked across roles in engineering and growth, from crafting AI-powered mobile apps like LiftID to leading data-driven go-to-market campaigns that reduced churn and grew engagement by over 150%. I've built everything from custom websites and internal tools to machine learning models and consumer-facing platforms.

I thrive at the intersection of tech and strategy — combining hands-on coding with user empathy, data analysis, and creative problem-solving. Outside of work, I enjoy bartending, day trading, and creating content — always looking for new ways to learn, connect, and build.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Personal Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Key className="h-5 w-5 mr-2" />
                    Personal Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          High School Valedictorian
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Contributed/Created 20+ projects
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Participated in 5+ hackathons
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Deans List Honors UCLA
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Ran a Marathon
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Bench Press PR of 225 lbs
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Hiked Mount Storm King in Washington
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Bartender and Barista on the side
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Blessed with great friends and family
                        </h4>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Interests & Hobbies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Heart className="h-5 w-5 mr-2" />
                  Interests & Hobbies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mountain className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Hiking</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Gamepad2 className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Gaming</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Reading</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Chess</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Photography</h4>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Plane className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Travel</h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* My Journey Section */}
      <section id="journey" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              My Journey
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Calendar className="h-5 w-5 mr-2" />
                  Professional Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[2.5rem_1fr] items-start">
                  {timeline.map((item, idx) => (
                    <>
                      <div className="flex flex-col items-center h-full relative" key={`dot-${item.title + item.company}`}> 
                        {/* Top line (not for first item) */}
                        {idx !== 0 && (
                          <div className="w-1 bg-primary/30 -mb-1" style={{ height: '1rem' }} />
                        )}
                        {/* Bullet */}
                        <div className={`w-3 h-3 bg-primary rounded-full z-10 ${idx === 0 ? 'mt-2' : ''}`} />
                        {/* Bottom line (not for last item) */}
                        {idx !== timeline.length - 1 && (
                          <div className="flex-1 w-1 bg-primary/30 -mt-1" />
                        )}
                      </div>
                      <div className={`pb-10 ${idx === 0 ? 'pt-0' : 'pt-1'}`} key={`content-${item.title + item.company}`}>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-foreground text-xl md:text-2xl">
                            {item.title}
                          </h4>
                          <span className="ml-4">
                            <span className="inline-block bg-muted text-muted-foreground px-3 py-1 rounded-lg text-xs font-semibold">
                              {item.date}
                            </span>
                          </span>
                        </div>
                        <p className="text-muted-foreground font-medium mb-1">{item.company}</p>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ProjectsGallery projects={projects} />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          </motion.div>
          <SkillsSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
          </motion.div>
          <ContactSection />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Michael Zhan. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/mikezhan88/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
