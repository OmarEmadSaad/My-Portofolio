import { FileDown } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { author } from "@/lib/site";

type Props = { dict: Dictionary; locale: Locale };

// Server Component — zero client JS. Scroll-reveal handled by the shared
// IntersectionObserver via the [data-reveal] attribute + CSS.
const About = ({ dict }: Props) => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal max-w-3xl mx-auto text-center mb-12" data-reveal>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {dict.about.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {dict.about.summary}
          </p>
          <a
            href={author.resume}
            download
            className="inline-flex items-center px-6 py-3 bg-secondary-700 hover:bg-secondary-800 dark:bg-secondary-700 dark:hover:bg-secondary-800 text-white rounded-lg shadow-md transition-transform duration-300 mx-auto hover:scale-105"
          >
            <FileDown size={18} className="mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
            {dict.about.downloadCV}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div
            className="reveal bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg"
            data-reveal
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {dict.education.title}
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-gray-900 dark:text-white">{dict.education.degree}</p>
              <p className="text-gray-700 dark:text-gray-300">{dict.education.school}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{dict.education.period}</p>
              <p className="text-gray-600 dark:text-gray-400">{dict.education.gpa}</p>
            </div>
          </div>

          <div
            className="reveal bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg"
            data-reveal
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {dict.languages.title}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2 rtl:ml-2 rtl:mr-0" />
                <p className="text-gray-700 dark:text-gray-300">{dict.languages.arabic}</p>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 mr-2 rtl:ml-2 rtl:mr-0" />
                <p className="text-gray-700 dark:text-gray-300">{dict.languages.english}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
