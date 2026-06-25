import { Code2, Layers, Smartphone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { dict: Dictionary; locale: Locale };

// Server Component — scroll-reveal via [data-reveal] + CSS.
const Services = ({ dict }: Props) => {
  const { services } = dict;

  const items = [
    { key: "frontend", icon: <Code2 size={28} />, data: services.items.frontend },
    { key: "fullstack", icon: <Layers size={28} />, data: services.items.fullstack },
    { key: "mobile", icon: <Smartphone size={28} />, data: services.items.mobile },
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="reveal max-w-3xl mx-auto text-center mb-12" data-reveal>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {services.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <article
              key={item.key}
              className="reveal bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-md transition-shadow hover:shadow-lg"
              data-reveal
            >
              <div className="w-14 h-14 rounded-lg bg-primary-600/10 dark:bg-primary-400/10 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {item.data.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.data.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
