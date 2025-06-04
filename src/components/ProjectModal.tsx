import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, X } from "lucide-react";

interface ProjectModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  project?: {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    images: string[];
    technologies: string[];
    liveUrl?: string;
    repoUrl?: string;
  };
}

const ProjectModal = ({
  isOpen = true,
  onClose = () => {},
  project,
}: ProjectModalProps) => {
  // Default project data if none is provided
  const defaultProject = {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Tailwind CSS",
    longDescription:
      "This is a fully responsive portfolio website that showcases my projects, skills, and experience. It features a clean design with smooth animations, dark/light mode toggle, and a contact form with validation.",
    images: [
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],
    liveUrl: "https://mike-zhan.com",
    repoUrl: "https://github.com/mikezhan88/portfolio",
  };

  const displayProject = project || defaultProject;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-background max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {displayProject.title}
          </DialogTitle>
          <DialogDescription className="text-lg">
            {displayProject.description}
          </DialogDescription>
        </DialogHeader>

        <div className="my-6">
          <Carousel className="w-full">
            <CarouselContent>
              {displayProject.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`${displayProject.title} screenshot ${index + 1}`}
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">About this project</h3>
            <p className="text-muted-foreground">
              {displayProject.longDescription}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {displayProject.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0 mt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          <div className="flex gap-2">
            {displayProject.repoUrl && (
              <Button variant="outline" asChild>
                <a
                  href={displayProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Repository
                </a>
              </Button>
            )}
            {displayProject.liveUrl && (
              <Button asChild>
                <a
                  href={displayProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Site
                </a>
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
