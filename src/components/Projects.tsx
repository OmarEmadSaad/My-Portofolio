import Image from "next/image";
import { ExternalLink, Download } from "lucide-react";
import { projects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { dict: Dictionary; locale: Locale };

// Server Component — static project grid, scroll-reveal via [data-reveal] + CSS.
const Projects = ({ dict }: Props) => {
  const projectsDict = dict.projects as Record<string, string>;

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal max-w-3xl mx-auto text-center mb-12" data-reveal>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.projects.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{dict.projects.subtitle}</p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
          {projects.map((project) => (
            <li
              key={project.id}
              className="reveal bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl hover:-translate-y-2"
              data-reveal
            >
              <article>
                <div className="relative h-48 overflow-hidden group">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} — ${dict.projects.altSuffix}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 min-h-[80px]">
                    {projectsDict[project.description]}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs text-gray-800 dark:text-gray-200 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    {project.downloadNow ? (
                      <a
                        href={project.downloadNow}
                        download="GoodNews.apk"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-transform hover:scale-105"
                      >
                        <Download size={16} aria-hidden="true" />
                        {dict.projects.downloadNow}
                      </a>
                    ) : (
                      <a
                        href={project.liveUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg transition-transform hover:scale-105"
                        aria-label={`${dict.projects.viewLive}: ${project.title}`}
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                        {dict.projects.viewLive}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;
