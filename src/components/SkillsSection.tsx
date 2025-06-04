import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Skill {
  name: string;
  level: number;
  description?: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  categories?: SkillCategory[];
}

const defaultCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      {
        name: "React",
        level: 90,
        description: "Building interactive UIs with React and its ecosystem",
      },
      {
        name: "TypeScript",
        level: 85,
        description: "Type-safe JavaScript development",
      },
      {
        name: "CSS/Tailwind",
        level: 80,
        description: "Modern responsive designs with Tailwind CSS",
      },
      {
        name: "Next.js",
        level: 75,
        description: "Server-side rendering and static site generation",
      },
    ],
  },
  {
    name: "Backend",
    skills: [
      {
        name: "Node.js",
        level: 85,
        description: "Building scalable server-side applications",
      },
      { name: "Express", level: 80, description: "RESTful API development" },
      {
        name: "PostgreSQL",
        level: 75,
        description: "Relational database design and optimization",
      },
      {
        name: "GraphQL",
        level: 70,
        description: "Efficient data querying and manipulation",
      },
    ],
  },
  {
    name: "Tools",
    skills: [
      {
        name: "Git",
        level: 90,
        description: "Version control and collaboration",
      },
      {
        name: "Docker",
        level: 75,
        description: "Containerization for consistent environments",
      },
      {
        name: "CI/CD",
        level: 80,
        description: "Automated testing and deployment pipelines",
      },
      {
        name: "AWS",
        level: 70,
        description: "Cloud infrastructure and services",
      },
    ],
  },
];

const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories = defaultCategories,
}) => {
  return (
    <section id="skills" className="py-16 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency
            levels across various technologies and tools.
          </p>
        </motion.div>

        <Tabs defaultValue={categories[0].name} className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mx-auto mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent
              key={category.name}
              value={category.name}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-lg">{skill.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2 mb-3" />
                        {skill.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {skill.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SkillsSection;
