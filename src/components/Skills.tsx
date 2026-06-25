"use client";

import { useState, type ReactElement } from "react";
import {
  Code,
  Layout,
  Palette,
  PenTool as Tool,
  CodeSquare,
} from "lucide-react";
import { skills } from "@/data/skills";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { dict: Dictionary; locale: Locale };

const Skills = ({ dict }: Props) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const cats = dict.skills.categories;

  const categories = [
    { id: "all", label: cats.all, icon: <CodeSquare size={20} /> },
    { id: "core", label: cats.core, icon: <Code size={20} /> },
    { id: "frameworks", label: cats.frameworks, icon: <Layout size={20} /> },
    { id: "styling", label: cats.styling, icon: <Palette size={20} /> },
    { id: "tools", label: cats.tools, icon: <Tool size={20} /> },
    { id: "design", label: cats.design, icon: <Palette size={20} /> },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal max-w-3xl mx-auto text-center mb-12" data-reveal>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {dict.skills.title}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
              className={`${
                activeCategory === category.id
                  ? "bg-primary-600 text-white dark:bg-primary-600"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              } px-4 py-2 rounded-full flex items-center gap-2 transition-all hover:scale-105 active:scale-95`}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 list-none p-0">
          {filteredSkills.map((skill, index) => (
            <li
              key={`${activeCategory}-${skill.name}-${index}`}
              className="animate-in bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-md transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col items-center justify-center"
              style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center text-primary-600 dark:text-primary-400">
                {getIconComponent(skill.icon)}
              </div>
              <h3 className="text-center text-gray-800 dark:text-gray-200 font-medium">
                {skill.name}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

function getIconComponent(iconName: string): ReactElement {
  const iconComponents: Record<string, ReactElement> = {
    html: <Code size={28} />,
    css: <Palette size={28} />,
    javascript: <CodeSquare size={28} />,
    typescript: <CodeSquare size={28} />,
    react: <Layout size={28} />,
    reactnative: <Layout size={28} />,
    Expo: <Layout size={28} />,
    nextjs: <Layout size={28} />,
    redux: <CodeSquare size={28} />,
    context: <Layout size={28} />,
    TanStack: <Layout size={28} />,
    router: <Layout size={28} />,
    tailwind: <Palette size={28} />,
    nativewind: <Palette size={28} />,
    bootstrap: <Palette size={28} />,
    material: <Palette size={28} />,
    materialUi: <Palette size={28} />,
    nativewindui: <Palette size={28} />,
    ReactNativePaper: <Palette size={28} />,
    git: <Tool size={28} />,
    github: <Tool size={28} />,
    vercel: <Tool size={28} />,
    postman: <Tool size={28} />,
    figma: <Palette size={28} />,
    uiux: <Palette size={28} />,
    responsive: <Layout size={28} />,
    seo: <Tool size={28} />,
    ssg: <CodeSquare size={28} />,
    browser: <Layout size={28} />,
  };

  return iconComponents[iconName] || <CodeSquare size={28} />;
}

export default Skills;
