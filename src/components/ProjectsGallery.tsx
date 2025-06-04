import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectModal from "./ProjectModal";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  details?: string;
}

interface ProjectsGalleryProps {
  projects?: Project[];
}

const ProjectsGallery = ({
  projects = defaultProjects,
}: ProjectsGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my recent work across web development, design, and more.
          </p>
        </div>
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <Badge>{project.category}</Badge>
                </div>
                <p className="text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Project modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

// Default projects data for when no props are provided
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A full-featured online store with product listings, cart functionality, and secure checkout.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com/ecommerce",
    repoUrl: "https://github.com/username/ecommerce",
    details:
      "This project was built to demonstrate a complete e-commerce solution with modern technologies. Features include product search, filtering, user accounts, order history, and payment processing.",
  },
  {
    id: "2",
    title: "Weather Dashboard",
    description:
      "Interactive weather application showing forecasts and historical data with beautiful visualizations.",
    image:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    category: "web",
    technologies: ["JavaScript", "Chart.js", "Weather API", "CSS"],
    liveUrl: "https://example.com/weather",
    repoUrl: "https://github.com/username/weather-app",
  },
  {
    id: "3",
    title: "Task Management App",
    description:
      "A productivity tool for organizing tasks with drag-and-drop functionality and team collaboration features.",
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Redux"],
    liveUrl: "https://example.com/taskapp",
    repoUrl: "https://github.com/username/task-app",
  },
  {
    id: "4",
    title: "Fitness Tracker",
    description:
      "Mobile application for tracking workouts, nutrition, and progress with personalized recommendations.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    category: "mobile",
    technologies: ["Flutter", "Firebase", "Health API"],
    liveUrl: "https://example.com/fitness",
    repoUrl: "https://github.com/username/fitness-tracker",
  },
  {
    id: "5",
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboard for visualizing complex datasets with filtering and export capabilities.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "data",
    technologies: ["D3.js", "React", "Python", "CSV Processing"],
    liveUrl: "https://example.com/dataviz",
    repoUrl: "https://github.com/username/data-dashboard",
  },
  {
    id: "6",
    title: "Portfolio Website",
    description:
      "Personal portfolio website showcasing projects and skills with a modern, responsive design.",
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
    category: "web",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com/portfolio",
    repoUrl: "https://github.com/username/portfolio",
  },
];

export default ProjectsGallery;
