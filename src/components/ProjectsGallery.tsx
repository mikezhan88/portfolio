import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProjectModal from "./ProjectModal";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  details?: string;
  coverPhoto?: string;
}

interface ProjectsGalleryProps {
  projects: Project[];
}

const ProjectsGallery = ({ projects }: ProjectsGalleryProps) => {
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
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.coverPhoto ? project.coverPhoto : project.images[0]}
                    alt={project.title}
                    className={
                      "w-full h-full transition-transform duration-300 hover:scale-105 " +
                      (project.title === "Voluntr"
                        ? "object-contain bg-white"
                        : project.title === "LiftID"
                          ? "object-contain bg-[#f5f6fa]"
                          : "object-cover")
                    }
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
            </motion.div>
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
          project={{
            ...selectedProject,
            images: selectedProject.coverPhoto
              ? selectedProject.images.filter(img => img !== selectedProject.coverPhoto)
              : selectedProject.images,
          }}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsGallery;
