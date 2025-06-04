import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import ProjectsGallery from "./ProjectsGallery";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";

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
        className="pt-32 pb-20 min-h-screen flex items-center bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Hi, I'm John Doe
            </h1>
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8">
              Full Stack Developer
            </h2>
            <p className="text-lg mb-10">
              I build modern, responsive web applications with a focus on user
              experience and performance. Specializing in React, Node.js, and
              cloud technologies to create scalable solutions.
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
              onClick={() => scrollToSection("projects")}
              className="animate-bounce p-2 rounded-full border border-muted"
            >
              <ChevronDown className="h-6 w-6" />
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get to know more about my background and what drives me.
            </p>
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
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=john-doe&backgroundColor=b6e3f4,c0aede,d1d4f9"
                        alt="John Doe Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      John Doe
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Full Stack Developer
                    </p>
                    <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      San Francisco, CA
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Passionate developer with a love for creating innovative
                    solutions. I enjoy turning complex problems into simple,
                    beautiful designs and building applications that make a
                    difference.
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
                    <Heart className="h-5 w-5 mr-2" />
                    Personal Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Led team of 8 developers on enterprise project
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Successfully delivered a $2M project 3 months ahead of
                          schedule
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Open source contributor with 50+ repositories
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Maintained popular React libraries with 10k+ downloads
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Speaker at 5+ tech conferences
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Presented on modern web development and best practices
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Mentored 20+ junior developers
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Helped early-career developers advance to senior roles
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">
                          Graduated Summa Cum Laude from UCLA
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Top 5% of Computer Science graduating class
                        </p>
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
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">
                      Open Source
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Contributing to open source projects and building tools
                      for the developer community.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Camera className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">
                      Photography
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Capturing moments and exploring the world through the lens
                      of my camera.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Music className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Music</h4>
                    <p className="text-sm text-muted-foreground">
                      Playing guitar and discovering new artists across
                      different genres.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Plane className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Travel</h4>
                    <p className="text-sm text-muted-foreground">
                      Exploring new cultures and gaining inspiration from
                      different places around the world.
                    </p>
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A timeline of my professional and educational milestones.
            </p>
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
                <div className="space-y-6">
                  {/* Timeline Item 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">
                          Senior Full Stack Developer
                        </h4>
                        <Badge variant="secondary">2022 - Present</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Tech Innovations Inc.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Leading development of scalable web applications using
                        React, Node.js, and cloud technologies. Mentoring junior
                        developers and architecting solutions for enterprise
                        clients.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">
                          Full Stack Developer
                        </h4>
                        <Badge variant="secondary">2020 - 2022</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        StartupXYZ
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Developed and maintained multiple web applications from
                        concept to deployment. Collaborated with
                        cross-functional teams to deliver high-quality software
                        solutions.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">
                          Junior Developer
                        </h4>
                        <Badge variant="secondary">2019 - 2020</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        WebDev Solutions
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Started my professional journey building responsive
                        websites and learning modern development practices.
                        Gained experience in React, JavaScript, and backend
                        technologies.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 4 - Education */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground">
                          B.S. Computer Science
                        </h4>
                        <Badge variant="outline">2015 - 2019</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        University of California, Los Angeles (UCLA)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Graduated with honors. Focused on software engineering,
                        algorithms, and data structures. Participated in
                        hackathons and coding competitions, building a strong
                        foundation in computer science.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of my recent work across web development, design, and
              more.
            </p>
          </motion.div>
          <ProjectsGallery />
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life.
            </p>
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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach
              out.
            </p>
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
                © {new Date().getFullYear()} John Doe. All rights reserved.
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
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
