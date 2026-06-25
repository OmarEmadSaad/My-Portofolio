"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = { dict: Dictionary; locale: Locale };

const Header = ({ dict, locale }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const closeMenu = () => setIsMenuOpen(false);

  const otherLocale: Locale = locale === "en" ? "ar" : "en";
  const switchHref =
    pathname.replace(/^\/(en|ar)/, `/${otherLocale}`) || `/${otherLocale}`;

  const navItems = [
    { id: "home", label: dict.header.home },
    { id: "about", label: dict.header.about },
    { id: "skills", label: dict.header.skills },
    { id: "projects", label: dict.header.projects },
    { id: "contact", label: dict.header.contact },
  ];

  const iconBtn =
    "p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all hover:scale-110 active:scale-95";

  return (
    <header
      className={`fixed w-full z-50 py-4 transition-all duration-300 motion-safe:animate-in ${
        scrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a
          href="#home"
          className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2 transition-transform hover:scale-105"
        >
          {dict.hero.name}
        </a>

        <nav
          className="hidden md:flex items-center space-x-1 rtl:space-x-reverse"
          aria-label="Primary"
        >
          <ul className="flex space-x-8 rtl:space-x-reverse items-center">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-block text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 px-1 py-2 transition-all hover:-translate-y-0.5"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center ml-6 rtl:ml-0 rtl:mr-6 space-x-3 rtl:space-x-reverse">
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              className={`${iconBtn} flex items-center gap-1`}
              aria-label={dict.header.toggleLanguage}
            >
              <Languages size={20} aria-hidden="true" />
              <span className="text-sm font-medium uppercase">{otherLocale}</span>
            </Link>

            <button onClick={toggleTheme} className={iconBtn} aria-label={dict.header.toggleTheme}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse mr-2 rtl:mr-0 rtl:ml-2">
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              className={iconBtn}
              aria-label={dict.header.toggleLanguage}
            >
              <Languages size={20} aria-hidden="true" />
            </Link>
            <button onClick={toggleTheme} className={iconBtn} aria-label={dict.header.toggleTheme}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all active:scale-95"
            aria-label={isMenuOpen ? dict.header.closeMenu : dict.header.openMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 pt-20 px-6 animate-in">
            <ul className="flex flex-col space-y-6 items-center">
              {navItems.map((item) => (
                <li key={item.id} className="w-full text-center">
                  <a
                    href={`#${item.id}`}
                    className="block text-xl font-medium py-2 text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={closeMenu}
              className="absolute top-6 right-6 rtl:right-auto rtl:left-6 p-2 rounded-full text-gray-700 dark:text-gray-300"
              aria-label={dict.header.closeMenu}
            >
              <X size={24} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
