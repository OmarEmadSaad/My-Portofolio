import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FileDown } from "lucide-react";

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-900"
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
            {t("about.title")}
          </h2>
          <p
            className={`${isRTL ? "font-arabic" : ""} text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8`}
          >
            {t("about.summary")}
          </p>
          <motion.a
            href="/Resume_Omar_Emad.docx"
            download="Resume_Omar_Emad.docx"
            className={`${isRTL ? "font-arabic" : ""} inline-flex items-center px-6 py-3 bg-secondary-600 hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600 text-white rounded-lg shadow-md transition-all duration-300 mx-auto`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileDown size={18} className={`${isRTL ? "ml-2" : "mr-2"}`} />
            {t("about.downloadCV")}
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Education Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isRTL ? 50 : -50 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <h3
              className={`${isRTL ? "font-arabic" : ""} text-xl font-semibold text-gray-900 dark:text-white mb-4`}
            >
              {t("education.title")}
            </h3>
            <div className="space-y-2">
              <p
                className={`${isRTL ? "font-arabic" : ""} font-medium text-gray-900 dark:text-white`}
              >
                {t("education.degree")}
              </p>
              <p
                className={`${isRTL ? "font-arabic" : ""} text-gray-700 dark:text-gray-300`}
              >
                {t("education.school")}
              </p>
              <p
                className={`${isRTL ? "font-arabic" : ""} text-gray-600 dark:text-gray-400 text-sm`}
              >
                {t("education.period")}
              </p>
              <p
                className={`${isRTL ? "font-arabic" : ""} text-gray-600 dark:text-gray-400`}
              >
                {t("education.gpa")}
              </p>
            </div>
          </motion.div>

          {/* Languages Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={
              inView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: isRTL ? -50 : 50 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <h3
              className={`${isRTL ? "font-arabic" : ""} text-xl font-semibold text-gray-900 dark:text-white mb-4`}
            >
              {t("languages.title")}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2 rtl:ml-2 rtl:mr-0"></div>
                <p
                  className={`${isRTL ? "font-arabic" : ""} text-gray-700 dark:text-gray-300`}
                >
                  {t("languages.arabic")}
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2 rtl:ml-2 rtl:mr-0"></div>
                <p
                  className={`${isRTL ? "font-arabic" : ""} text-gray-700 dark:text-gray-300`}
                >
                  {t("languages.english")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
