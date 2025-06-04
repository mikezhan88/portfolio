import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

interface ProjectsSectionProps {
  className?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and TypeScript",
    details: "Built using React, TypeScript, Tailwind CSS, and Framer Motion. Features a responsive design and smooth animations.",
    tags: ["web", "react", "typescript"],
    githubUrl: "https://github.com/mikezhan88/portfolio",
    demoUrl: "https://mikezhan.dev"
  },
  {
    id: "2",
    title: "AI Image Generator",
    description: "An AI-powered image generation application",
    details: "Utilizes OpenAI's DALL-E API to generate unique images based on text prompts. Built with React and Node.js.",
    tags: ["web", "ai", "react"],
    githubUrl: "https://github.com/mikezhan88/ai-image-generator",
    demoUrl: "https://ai-image-generator.mikezhan.dev"
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A full-stack task management application",
    details: "Features user authentication, real-time updates, and a clean, intuitive interface. Built with React, Node.js, and MongoDB.",
    tags: ["web", "react", "node"],
    githubUrl: "https://github.com/mikezhan88/task-manager",
    demoUrl: "https://task-manager.mikezhan.dev"
  }
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className = "" }) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.tags.includes(activeFilter);
  });

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">My Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Here are some of my recent projects. Each one represents a unique
          challenge and learning experience.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {["all", "web", "mobile", "ai"].map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className="capitalize"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.details}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
                {project.demoUrl && (
                  <Button asChild>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection; 