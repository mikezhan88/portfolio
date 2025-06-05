import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Skill {
  name: string;
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
      { name: "React JS" },
      { name: "React Native" },
      { name: "Expo Go" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "Swift" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node JS" },
      { name: "Express JS" },
      { name: "Flask" },
      { name: "FAST API" },
      { name: "Django" },
      { name: "REST API" },
      { name: "GoLang" },
      { name: "C" },
      { name: "C++" },
      { name: "Java" },
      { name: "C#" },
      { name: "Python" },
    ],
  },
  {
    name: "Database / Data",
    skills: [
      { name: "MongoDB" },
      { name: "Postgres" },
      { name: "SQL (Azure/Cloud)" },
      { name: "Supabase" },
      { name: "DBT" },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: [
      { name: "AWS (Lambda)" },
      { name: "Azure" },
      { name: "Cloud Computing" },
      { name: "Docker" },
      { name: "Kubernetes" },
      { name: "CI/CD" },
      { name: "Git" },
      { name: "Jest" },
    ],
  },
  {
    name: "Productivity & Design",
    skills: [
      { name: "Microsoft Office Suite" },
      { name: "Wordpress" },
      { name: "GCP" },
      { name: "Google Analytics" },
      { name: "Oracle" },
      { name: "Figma" },
      { name: "Canva" },
      { name: "Framer" },
      { name: "Capcut" },
    ],
  },
];

const SkillsSection: React.FC<SkillsSectionProps> = ({
  categories = defaultCategories,
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue={categories[0].name} className="w-full">
        <div className="flex justify-center w-full">
          <TabsList className="flex justify-center gap-2 bg-muted rounded-full px-4 py-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="rounded-2xl px-5 py-1.5 text-lg data-[state=active]:shadow-md data-[state=active]:z-10 data-[state=active]:-my-2 transition-all"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent
            key={category.name}
            value={category.name}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {category.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex justify-center"
                >
                  <Card className="max-w-sm w-full mx-auto">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-xl">{skill.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SkillsSection;
