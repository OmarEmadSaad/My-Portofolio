import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20 pb-10 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10"></div>
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        <motion.div
          className="w-full md:w-1/2 flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className={`${isRTL ? "font-arabic" : ""} text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium mb-2`}
          >
            {t("hero.greeting")}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className={`${isRTL ? "font-arabic" : ""} text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4`}
          >
            Omar Emad
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className={`${isRTL ? "font-arabic" : ""} text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6`}
          >
            {t("hero.role")}
          </motion.h2>

          <motion.a
            variants={itemVariants}
            href="#projects"
            className={`${isRTL ? "font-arabic" : ""} inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-fit`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("hero.cta")}
            <ArrowDown size={18} className="ml-2 rtl:mr-2 rtl:ml-0" />
          </motion.a>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative flex items-center justify-center mb-8 sm:mb-0">
            <motion.div
              className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-gradient-to-br from-white via-white/40 to-blue-500 blur-2xl opacity-30 animate-pulse"
              initial={{ scale: 0.9, opacity: 0.3 }}
              animate={{ scale: 1.1, opacity: 0.5 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-xl z-10">
              <img
                src="/profile.jpeg"
                alt="Omar Emad"
                className="w-full h-full object-cover object-[center_-20px]" // ✅ حرك الصورة للأعلى
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a
          href="#about"
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          aria-label="Scroll Down"
        >
          <ArrowDown
            size={20}
            className="text-primary-600 dark:text-primary-400"
          />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
