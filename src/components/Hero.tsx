import Image from "next/image";
import { ArrowDown } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import Typewriter from "./Typewriter";

type Props = { dict: Dictionary; locale: Locale };

// Server Component: the above-the-fold hero ships almost zero JS. The H1/H2 are
// static (crawlable, instant LCP); entrance motion is CSS-only and the rotating
// role line is a tiny client island (<Typewriter />).
const Hero = ({ dict }: Props) => {
  const { hero } = dict;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-24 pb-10 overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10" />

      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        <div className="w-full md:w-1/2 flex flex-col">
          <p
            className="animate-in text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium mb-2"
            style={{ animationDelay: "0ms" }}
          >
            {hero.greeting}
          </p>

          <h1
            className="animate-in text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3"
            style={{ animationDelay: "80ms" }}
          >
            {hero.name}
          </h1>

          <h2
            className="animate-in text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-3"
            style={{ animationDelay: "160ms" }}
          >
            {hero.role}
          </h2>

          {/* Animated rotating specialties (typewriter). */}
          <p
            className="animate-in text-xl md:text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-3 min-h-[2rem]"
            style={{ animationDelay: "240ms" }}
          >
            <Typewriter phrases={hero.roles} />
          </p>

          <p
            className="animate-in text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl"
            style={{ animationDelay: "320ms" }}
          >
            {hero.tagline}
          </p>

          <div
            className="animate-in flex flex-wrap gap-4"
            style={{ animationDelay: "400ms" }}
          >
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 w-fit"
            >
              {hero.cta}
              <ArrowDown size={18} className="ml-2 rtl:mr-2 rtl:ml-0" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-300 w-fit"
            >
              {hero.contactCta}
            </a>
          </div>
        </div>

        {/* Portrait — the LCP element: server-rendered, priority, not animated. */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative flex items-center justify-center mb-8 sm:mb-0">
            <div className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-gradient-to-br from-white via-white/40 to-primary-500 blur-2xl opacity-30 -z-0 motion-safe:animate-pulse" />
            <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-xl z-10">
              <Image
                src="/profile.jpeg"
                alt={hero.imageAlt}
                width={320}
                height={320}
                priority
                fetchPriority="high"
                quality={60}
                sizes="(max-width: 768px) 256px, 320px"
                className="w-full h-full object-cover object-[center_-20px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center motion-safe:animate-bounce">
        <a
          href="#about"
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
          aria-label={dict.header.about}
        >
          <ArrowDown size={20} className="text-primary-600 dark:text-primary-400" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
