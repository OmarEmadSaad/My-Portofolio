import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Layout,
  Palette,
  PenTool as Tool,
  CodeSquare,
} from "lucide-react";
import { skills } from "../data/skills";

const Skills = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = [
    { id: "all", label: "All", icon: <CodeSquare size={20} /> },
    {
      id: "core",
      label: t("skills.categories.core"),
      icon: <Code size={20} />,
    },
    {
      id: "frameworks",
      label: t("skills.categories.frameworks"),
      icon: <Layout size={20} />,
    },
    {
      id: "styling",
      label: t("skills.categories.styling"),
      icon: <Palette size={20} />,
    },
    {
      id: "tools",
      label: t("skills.categories.tools"),
      icon: <Tool size={20} />,
    },
    {
      id: "design",
      label: t("skills.categories.design"),
      icon: <Palette size={20} />,
    },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-800"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2
            className={`${isRTL ? "font-arabic" : ""} text-3xl font-bold text-gray-900 dark:text-white mb-6`}
          >
            {t("skills.title")}
          </h2>
        </motion.div>

        {/* Category Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? "bg-primary-600 text-white dark:bg-primary-500"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              } px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-200 ${isRTL ? "font-arabic" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span>{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
              variants={skillVariants}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 mb-3 flex items-center justify-center text-primary-600 dark:text-primary-400">
                {getIconComponent(skill.icon)}
              </div>
              <h3
                className={`${isRTL ? "font-arabic" : ""} text-center text-gray-800 dark:text-gray-200 font-medium`}
              >
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Helper function to render icons
function getIconComponent(iconName: string) {
  const iconComponents: Record<string, JSX.Element> = {
    html: <Code size={28} />,
    css: <Palette size={28} />,
    javascript: <CodeSquare size={28} />,
    typescript: <CodeSquare size={28} />,
    react: <Layout size={28} />,
    nextjs: <Layout size={28} />,
    redux: <CodeSquare size={28} />,
    context: <Layout size={28} />,
    router: <Layout size={28} />,
    tailwind: <Palette size={28} />,
    bootstrap: <Palette size={28} />,
    material: <Palette size={28} />,
    materialUi: <Palette size={28} />,
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
